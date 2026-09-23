// netlify/functions/generate-report.js
//
// 배포 방법:
// 1. 이 파일을 프로젝트 루트의 netlify/functions/generate-report.js 위치에 둡니다.
//    (netlify.toml에 functions = "netlify/functions" 설정 필요 — 기존 꼼즈광교 프로젝트와 동일 구조)
// 2. Netlify 사이트 설정 > Environment variables 에 ANTHROPIC_API_KEY 를 등록합니다.
// 3. (선택) 최소한의 오남용 방지 장치로 APP_SHARED_SECRET 환경변수를 등록하면, 프론트(index.html의
//    APP_SHARED_KEY)와 동일한 값을 보내는 요청만 받습니다. 설정하지 않으면 기존처럼 검사를 건너뜁니다.
//    ⚠️ 이건 "진짜 인증"이 아니라 URL을 모르는 봇의 무작위 호출을 막는 최소 장치입니다.
//    선생님별 로그인 등 실제 인증/과금 보호가 필요하면 별도 작업으로 준비해야 합니다(이 파일 범위 밖).
// 4. 프론트에서 POST https://<사이트주소>/.netlify/functions/generate-report 로 호출합니다.

const FIELD_LABELS = {
  unitScore: "단원별 점수",
  wrongType: "오답 유형",
  attendance: "출석/과제 이행률",
  teacherNote: "원장님 주관 평가",
  studyTime: "주간 학습시간/진도율",
  trend: "최근 성적 추이",
  peerRank: "또래 대비 백분위",
  focus: "집중도/행동 관찰",
  consultNote: "최근 상담 이력 요약",
  diaryEmotion: "코칭 다이어리 감정 태그",
};

// b18: 서버 입력 검증 — 프론트(index.html)의 CORE_FIELDS/OPTIONAL_FIELDS와 같은 기준으로
// 허용된 필드/자료형/글자수/점수범위/선택지를 서버에서도 그대로 강제합니다.
// (프론트 검증은 우회될 수 있으므로, 실제 보호는 항상 서버 쪽 검증입니다.)
const FIELD_RULES = {
  unitScore: { type: "number", min: 0, max: 100 },
  wrongType: { type: "enum", options: ["연산 실수", "개념 미이해", "시간 부족", "문제 해석 오류"] },
  attendance: { type: "number", min: 0, max: 100 },
  teacherNote: { type: "text", maxLength: 200 },
  studyTime: { type: "text", maxLength: 60 },
  trend: { type: "enum", options: ["상승", "유지", "하락", "변동 큼"] },
  peerRank: { type: "number", min: 0, max: 100 },
  focus: { type: "enum", options: ["매우 좋음", "양호", "보통", "개선 필요"] },
  consultNote: { type: "text", maxLength: 200 },
  diaryEmotion: { type: "enum", options: ["의욕적", "안정적", "불안", "무기력", "혼합"] },
};

const MAX_STUDENT_NAME_LENGTH = 40;
const MAX_BRAND_NAME_LENGTH = 60;

// 학생 개인정보(이름/입력값)나 API 키는 절대 로그에 남기지 않고, 상태코드/오류 성격/토큰 사용량만 남깁니다.
function safeLog(label, info) {
  console.log(`[generate-report] ${label}`, JSON.stringify(info));
}

function badRequest(error) {
  return { statusCode: 400, body: JSON.stringify({ error }) };
}

// values 객체를 허용된 필드/자료형/범위/글자수 기준으로 검증하고, 통과한 값만 정리해서 돌려줍니다.
// 문제가 있으면 { error: "설명" }을 돌려주고, 호출부에서 400으로 응답합니다.
function validateValues(values) {
  const cleaned = {};
  for (const [key, rawValue] of Object.entries(values)) {
    if (rawValue === undefined || rawValue === null || String(rawValue).trim() === "") continue;

    const rule = FIELD_RULES[key];
    if (!rule) {
      return { error: `허용되지 않은 항목입니다: ${key}` };
    }
    const strValue = String(rawValue).trim();

    if (rule.type === "number") {
      const num = Number(strValue);
      if (!Number.isFinite(num)) return { error: `${FIELD_LABELS[key] || key}는 숫자여야 합니다` };
      if (num < rule.min || num > rule.max) {
        return { error: `${FIELD_LABELS[key] || key}는 ${rule.min}~${rule.max} 범위여야 합니다` };
      }
      cleaned[key] = num;
    } else if (rule.type === "enum") {
      if (!rule.options.includes(strValue)) {
        return { error: `${FIELD_LABELS[key] || key}의 값이 올바르지 않습니다` };
      }
      cleaned[key] = strValue;
    } else if (rule.type === "text") {
      if (strValue.length > rule.maxLength) {
        return { error: `${FIELD_LABELS[key] || key}는 ${rule.maxLength}자 이하여야 합니다` };
      }
      cleaned[key] = strValue;
    }
  }
  return { cleaned };
}

// ---------------------------------------------------------------
// 아주 가벼운 인메모리 요청 제한 (IP당 분당 호출 수 제한)
// ⚠️ 한계: 이 카운터는 함수 인스턴스 메모리에만 있어서, 콜드 스타트나 여러 인스턴스가 동시에
// 뜨는 트래픽 상황에서는 정확히 지켜지지 않습니다. 진짜 공개 서비스 전에는 Netlify의 공식 Rate
// Limiting 기능이나 별도 저장소(예: Redis) 기반의 제한으로 교체하는 것을 권장합니다.
// ---------------------------------------------------------------
const RATE_LIMIT_MAX = 20; // 분당 최대 호출 수 (IP 기준)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const rateLimitState = new Map();

function isRateLimited(clientIp) {
  const now = Date.now();
  const entry = rateLimitState.get(clientIp);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitState.set(clientIp, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // (선택) 최소 오남용 방지 — 환경변수를 설정한 경우에만 검사
  const sharedSecret = process.env.APP_SHARED_SECRET;
  if (sharedSecret) {
    const provided = event.headers["x-app-key"] || event.headers["X-App-Key"];
    if (provided !== sharedSecret) {
      safeLog("rejected", { reason: "invalid_app_key" });
      return { statusCode: 401, body: JSON.stringify({ error: "인증되지 않은 요청입니다" }) };
    }
  }

  const clientIp = event.headers["x-nf-client-connection-ip"] || "unknown";
  if (isRateLimited(clientIp)) {
    safeLog("rejected", { reason: "rate_limited" });
    return { statusCode: 429, body: JSON.stringify({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return badRequest("Invalid JSON body");
  }

  const { studentName, brandName, values } = payload;
  if (!studentName || typeof studentName !== "string" || !studentName.trim()) {
    return badRequest("studentName은 필수입니다");
  }
  if (studentName.length > MAX_STUDENT_NAME_LENGTH) {
    return badRequest(`studentName은 ${MAX_STUDENT_NAME_LENGTH}자 이하여야 합니다`);
  }
  if (brandName !== undefined && (typeof brandName !== "string" || brandName.length > MAX_BRAND_NAME_LENGTH)) {
    return badRequest("brandName 형식이 올바르지 않습니다");
  }
  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return badRequest("values는 필수입니다");
  }

  const { cleaned, error: validationError } = validateValues(values);
  if (validationError) return badRequest(validationError);

  // 활성화된 필드만 골라서 라벨과 함께 정리 (프롬프트에 노이즈를 넣지 않기 위함)
  const dataLines = Object.entries(cleaned)
    .map(([key, v]) => `- ${FIELD_LABELS[key] || key}: ${v}`)
    .join("\n");

  if (!dataLines) {
    return badRequest("입력된 진단 데이터가 없습니다");
  }

  const systemPrompt = `당신은 학원(${brandName || "학습 프랜차이즈"})에서 학부모에게 보내는 성장 리포트를 작성하는 전문 카피라이터입니다.
아래 원칙을 반드시 지켜주세요.
1. 딱딱한 성적표식 데이터 나열이 아니라, 학부모가 읽었을 때 "우리 아이를 정말 잘 봐주고 있구나"라고 느끼는 따뜻하고 구체적인 톤으로 씁니다.
2. 데이터를 하나의 자연스러운 이야기로 엮되, 숫자나 사실을 지어내지 말고 주어진 데이터만 사용합니다.
3. 관찰된 사실(점수, 출석률 등)과 그로부터의 해석을 구분해서 씁니다. 특히:
   - "집중도가 좋다"는 관찰만으로 "개념을 탄탄히 이해했다"처럼 더 큰 결론으로 비약하지 마세요. 관찰된 행동은 관찰된 그대로만 전달하세요.
   - 감정 태그(예: 불안, 무기력)가 있어도 그것으로 아이의 내면 심리 상태를 단정적으로 진단하거나 원인을 추측하지 마세요. "이런 정서가 기록되었다"는 사실로만 전달하세요.
   - 이번 데이터에 없는 구체적인 지도 계획(예: "매주 몇 회 보충 예정입니다" 같은 확정된 약속)을 지어내지 마세요. 실제로 데이터에 계획이 주어지지 않았다면, "다음 지도 방향은 선생님과 상의해 확인해달라"는 식으로 열어두고 마무리하세요.
4. 약점을 지적할 때도 "부족하다"보다는 "이런 관찰이 있다 → 이런 부분에서 보완이 도움이 될 수 있다"의 구조로, 단정적이지 않게 씁니다.
5. 전체 400~600자, 3개 문단, 학부모 대상 존댓말. 이모지나 별표 같은 장식은 쓰지 않습니다.
6. 형식: 반드시 문단과 문단 사이에 빈 줄(줄바꿈 문자 2개, \\n\\n)을 넣어 구분해주세요. 문단을 나눈다는
   의미로만 쓰지 말고, 실제 출력 텍스트 안에 빈 줄을 넣어야 합니다. 한 문단 안에서는 줄바꿈 없이 이어서 씁니다.
7. 마지막 문단의 끝에는 "아이를 믿고 맡겨주신 데 대한 감사"와 "궁금한 점이 있으면 언제든 편하게
   문의해 달라"는 두 가지 뜻을 담은 짧은 마무리 인사를 자연스럽게 붙여주세요. 매번 똑같은 문장을
   반복하지 말고 표현을 조금씩 다르게 바꿔 쓰되(예: "오늘도 아이를 믿고 맡겨주셔서 감사합니다",
   "늘 아이를 믿고 지켜봐 주셔서 감사드립니다" 등), 형식적이거나 과장된 티가 나지 않게 담백하게 씁니다.`;

  const userPrompt = `학생 이름: ${studentName}
이번 진단 데이터:
${dataLines}

위 데이터를 바탕으로 학부모에게 보낼 성장 리포트 본문을 작성해주세요. 데이터에 없는 내용은 추측하거나 지어내지 마세요.`;

  try {
    const { text: narrative, usage, stopReason } = await callClaudeAutoExtend({
      model: "claude-sonnet-5",
      max_tokens: 1200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    safeLog("success", { stopReason, usage });

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ narrative }),
    };
  } catch (err) {
    // 학생 개인정보나 API 키는 절대 로그에 남기지 않습니다 — 상태코드/원인 구분/토큰 사용량만 남깁니다.
    safeLog("error", {
      statusCode: err.statusCode || 500,
      reason: err.reason || "unknown",
      usage: err.usage || null,
    });
    // 클라이언트에는 원인 카테고리 정도만 안내하고, API 원문 오류(detail)는 내려보내지 않습니다.
    return {
      statusCode: err.statusCode || 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: publicErrorMessage(err) }),
    };
  }
};

function publicErrorMessage(err) {
  if (err.reason === "refusal") return "AI가 이 요청에 대한 답변을 생성하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해주세요";
  if (err.reason === "truncated") return "생성된 내용이 너무 길어 완성되지 못했습니다. 다시 시도해주세요";
  if (err.reason === "empty") return "AI가 빈 응답을 반환했습니다. 다시 시도해주세요";
  if (err.statusCode === 429) return "AI 서비스 요청이 많아 잠시 지연되고 있습니다. 잠시 후 다시 시도해주세요";
  return "리포트를 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요";
}

// Claude 응답이 max_tokens 제한에 걸려 문장 중간에 잘리면(stop_reason: "max_tokens"),
// max_tokens를 자동으로 늘려서 최대 3번까지 재시도합니다 — 매번 숫자를 손으로 맞출 필요 없게 하기 위함.
// b18: 재시도 후에도 여전히 잘려있거나, 응답이 비어있거나, 모델이 응답을 거부(stop_reason: "refusal")한
// 경우를 "정상 완료"로 취급하지 않고 에러로 던집니다 — 예전에는 이 경우도 그대로 narrative로 반환했습니다.
async function callClaudeAutoExtend(body, attempt = 1) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    const err = new Error("Claude API 오류");
    err.statusCode = res.status;
    err.reason = "api_error";
    err.detail = errText; // 서버 로그로만 쓰고 클라이언트로는 내려보내지 않음(publicErrorMessage 사용)
    throw err;
  }

  const data = await res.json();
  const stopReason = data?.stop_reason;
  const usage = data?.usage || null;

  // b18: content 배열에서 type이 "text"인 블록만 골라 순서대로 이어붙입니다.
  // (이전에는 content[0].text만 읽어서, 첫 블록이 text가 아닌 경우 등을 놓칠 수 있었습니다.)
  const text = Array.isArray(data?.content)
    ? data.content.filter((block) => block?.type === "text").map((block) => block.text || "").join("").trim()
    : "";

  const truncated = stopReason === "max_tokens";

  if (truncated && attempt < 3 && body.max_tokens < 4000) {
    return callClaudeAutoExtend({ ...body, max_tokens: Math.min(body.max_tokens * 2, 4000) }, attempt + 1);
  }

  if (stopReason === "refusal") {
    const err = new Error("Claude가 응답을 거부했습니다");
    err.statusCode = 502;
    err.reason = "refusal";
    err.usage = usage;
    throw err;
  }
  if (truncated) {
    // 재시도(최대 4000 토큰)까지 했는데도 여전히 잘림 → 정상 완료로 처리하지 않음
    const err = new Error("응답이 max_tokens 제한으로 계속 잘립니다");
    err.statusCode = 502;
    err.reason = "truncated";
    err.usage = usage;
    throw err;
  }
  if (!text) {
    const err = new Error("Claude 응답이 비어있습니다");
    err.statusCode = 502;
    err.reason = "empty";
    err.usage = usage;
    throw err;
  }

  return { text, truncated: false, usage, stopReason };
}
