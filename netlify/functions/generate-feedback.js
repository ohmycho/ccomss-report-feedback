// netlify/functions/generate-feedback.js
//
// '부모님 피드백' 도구용 — 수업 관찰 기록을 학부모용 카카오톡 메시지 초안으로 바꿔주는 함수.
// generate-report.js와 배포 방법 동일 (같은 netlify/functions 폴더, 같은 ANTHROPIC_API_KEY 사용,
// 같은 APP_SHARED_SECRET 환경변수를 선택적으로 사용).
//
// 중요: 선생님의 해석·가설(feedbackInterpretation)은 이 함수에 아예 전달하지 않습니다.
// 프론트에서도 보내지 않고, 혹시 보내오더라도 이 함수는 그 값을 무시합니다 —
// "관찰과 해석을 구분한다"는 원칙을 프롬프트 지시가 아니라 코드 단에서 강제하기 위함입니다.
//
// b07: learningPoint(관련 학습 포인트, 선택) 추가 — 실제 현장에서는 수업 피드백에 학습 지표를
// 같이 언급하는 경우가 많아, 있으면 자연스럽게 한 문장으로 엮이도록 프롬프트에 포함합니다.
// (학습 리포트 도구와 입력은 분리돼 있고, 이 필드는 선생님이 직접 적은 값만 사용합니다.)

// b18: 서버 입력 검증 — 프론트(index.html)의 maxlength와 같은 기준으로 글자 수 상한을 서버에서도
// 강제합니다. (프론트 검증은 우회될 수 있으므로, 실제 보호는 항상 서버 쪽 검증입니다.)
const FIELD_LIMITS = {
  student: 40,
  session: 60,
  start: 300,
  action: 300,
  learningPoint: 200,
  quote: 200,
  next: 300,
  home: 300,
};
const MAX_BRAND_NAME_LENGTH = 60;

function safeLog(label, info) {
  console.log(`[generate-feedback] ${label}`, JSON.stringify(info));
}

function badRequest(error) {
  return { statusCode: 400, body: JSON.stringify({ error }) };
}

// ---------------------------------------------------------------
// 아주 가벼운 인메모리 요청 제한 (IP당 분당 호출 수 제한)
// ⚠️ 한계: generate-report.js와 동일 — 함수 인스턴스 메모리 기반이라 콜드 스타트/다중 인스턴스에서는
// 정확하지 않습니다. 공개 서비스 전에는 Netlify 공식 Rate Limiting이나 별도 저장소 기반으로 교체 권장.
// ---------------------------------------------------------------
const RATE_LIMIT_MAX = 20;
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

  // 허용된 필드만 꺼내 씁니다 — feedbackInterpretation 등 목록에 없는 키는 애초에 읽지 않습니다.
  const { brandName, student, session, start, action, learningPoint, quote, next, home } = payload;

  if (!student || typeof student !== "string" || !student.trim()) {
    return badRequest("student는 필수입니다");
  }
  if (!action || typeof action !== "string" || !action.trim()) {
    return badRequest("action은 필수입니다");
  }
  if (brandName !== undefined && (typeof brandName !== "string" || brandName.length > MAX_BRAND_NAME_LENGTH)) {
    return badRequest("brandName 형식이 올바르지 않습니다");
  }

  const fields = { student, session, start, action, learningPoint, quote, next, home };
  for (const [key, limit] of Object.entries(FIELD_LIMITS)) {
    const v = fields[key];
    if (v === undefined || v === null || v === "") continue;
    if (typeof v !== "string") return badRequest(`${key} 형식이 올바르지 않습니다`);
    if (v.length > limit) return badRequest(`${key}는 ${limit}자 이하여야 합니다`);
  }

  const factLines = [
    session && `- 수업 회차/주제: ${session}`,
    start && `- 처음 보인 반응: ${start}`,
    `- 수업 중 확인된 행동/성과: ${action}`,
    learningPoint && `- 관련 학습 포인트(최근 진단/성적 지표): ${learningPoint}`,
    quote && `- 학생이 직접 한 말: "${quote}"`,
    next && `- 다음 수업 방향: ${next}`,
    home && `- 가정에 전할 실천 제안: ${home}`,
  ].filter(Boolean).join("\n");

  const systemPrompt = `당신은 학원(${brandName || "학습 프랜차이즈"})에서 학부모에게 보내는 카카오톡 피드백 메시지를 작성하는 카피라이터입니다.
반드시 지켜야 할 원칙:
1. 아래에 주어진 관찰된 사실만 사용합니다. 주어지지 않은 내용을 추측하거나 지어내지 않습니다.
2. 관찰된 행동과 그로부터의 해석을 구분합니다. 특히:
   - 학생이 집중하거나 잘 참여했다는 관찰만으로 "개념을 탄탄히 이해했다"처럼 더 큰 결론으로 비약하지 마세요. 관찰된 그대로만 전달하세요.
   - 학생의 말이나 행동을 근거로 아이의 내면 심리 상태를 단정적으로 진단하거나 원인을 추측하지 마세요 (예: "부끄러워요"라는 말을 근거로 성향을 단정하지 않기).
   - "다음 수업 방향"과 "가정에 전할 실천 제안"이 주어진 경우에만 그 내용을 언급하고, 주어지지 않은 구체적인 지도 계획이나 일정을 임의로 지어내 확정적으로 약속하지 마세요.
3. 학원 철학에 맞게 다정하고 전문가다운 톤으로, 학부모가 안심하고 신뢰할 수 있게 씁니다.
4. 인사말로 시작해서, 수업 중 있었던 일을 자연스럽게 전하고, 다음 계획이나 격려로 마무리합니다.
5. "관련 학습 포인트"가 주어졌다면, 별도 문단으로 딱 떼어 나열하지 말고 수업 관찰 내용과
   한 흐름으로 자연스럽게 엮어서 언급합니다 (실제 선생님들이 카톡 보낼 때 하는 방식).
6. 전체 3~5문장, 카카오톡으로 바로 보낼 수 있는 완성된 메시지 형태로 씁니다.
7. 이모지나 별표 같은 장식은 쓰지 않습니다.
8. 형식: 인사말 / 수업 중 있었던 일(핵심 내용) / 다음 계획·격려, 이렇게 자연스러운 단위로
   2~3개 문단으로 나누고, 문단과 문단 사이에는 반드시 빈 줄(줄바꿈 문자 2개, \\n\\n)을 넣어주세요.
   실제 카카오톡 메시지처럼 한 문단이 너무 길어지지 않게, 읽기 편한 호흡으로 끊어주세요.`;

  const userPrompt = `학생 표시 이름: ${student}
관찰된 사실:
${factLines}

위 사실만 바탕으로 학부모에게 보낼 카카오톡 피드백 메시지를 작성해주세요. 주어지지 않은 내용은 추측하거나 지어내지 마세요.`;

  try {
    const { text: feedback, usage, stopReason } = await callClaudeAutoExtend({
      model: "claude-sonnet-5",
      max_tokens: 700,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    safeLog("success", { stopReason, usage });

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ feedback }),
    };
  } catch (err) {
    safeLog("error", {
      statusCode: err.statusCode || 500,
      reason: err.reason || "unknown",
      usage: err.usage || null,
    });
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
  return "초안을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요";
}

// Claude 응답이 max_tokens 제한에 걸려 문장 중간에 잘리면(stop_reason: "max_tokens"),
// max_tokens를 자동으로 늘려서 최대 3번까지 재시도합니다 — 매번 숫자를 손으로 맞출 필요 없게 하기 위함.
// b18: 재시도 후에도 여전히 잘려있거나, 응답이 비어있거나, 모델이 응답을 거부(stop_reason: "refusal")한
// 경우를 "정상 완료"로 취급하지 않고 에러로 던집니다.
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
