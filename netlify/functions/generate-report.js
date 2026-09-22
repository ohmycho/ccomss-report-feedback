// netlify/functions/generate-report.js
//
// 배포 방법:
// 1. 이 파일을 프로젝트 루트의 netlify/functions/generate-report.js 위치에 둡니다.
//    (netlify.toml에 functions = "netlify/functions" 설정 필요 — 기존 꼼즈광교 프로젝트와 동일 구조)
// 2. Netlify 사이트 설정 > Environment variables 에 ANTHROPIC_API_KEY 를 등록합니다.
// 3. 프론트에서 POST https://<사이트주소>/.netlify/functions/generate-report 로 호출합니다.

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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { studentName, brandName, values } = payload;
  if (!studentName || !values || typeof values !== "object") {
    return { statusCode: 400, body: JSON.stringify({ error: "studentName, values는 필수입니다" }) };
  }

  // 활성화된 필드만 골라서 라벨과 함께 정리 (프롬프트에 노이즈를 넣지 않기 위함)
  const dataLines = Object.entries(values)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([key, v]) => `- ${FIELD_LABELS[key] || key}: ${v}`)
    .join("\n");

  if (!dataLines) {
    return { statusCode: 400, body: JSON.stringify({ error: "입력된 진단 데이터가 없습니다" }) };
  }

  const systemPrompt = `당신은 학원(${brandName || "학습 프랜차이즈"})에서 학부모에게 보내는 성장 리포트를 작성하는 전문 카피라이터입니다.
아래 원칙을 반드시 지켜주세요.
1. 딱딱한 성적표식 데이터 나열이 아니라, 학부모가 읽었을 때 "우리 아이를 정말 잘 봐주고 있구나"라고 느끼는 따뜻하고 구체적인 톤으로 씁니다.
2. 데이터를 하나의 자연스러운 이야기로 엮되, 숫자나 사실을 지어내지 말고 주어진 데이터만 사용합니다.
3. 약점을 지적할 때도 "부족하다"보다는 "이런 이유로 이런 모습이 보인다 → 이렇게 도와줄 계획이다"의 구조로 씁니다.
4. 마지막 문단에는 다음 학습 계획이나 학부모가 안심할 수 있는 구체적 방향을 제시합니다.
5. 전체 400~600자, 3개 문단, 학부모 대상 존댓말. 이모지나 별표 같은 장식은 쓰지 않습니다.`;

  const userPrompt = `학생 이름: ${studentName}
이번 진단 데이터:
${dataLines}

위 데이터를 바탕으로 학부모에게 보낼 성장 리포트 본문을 작성해주세요.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 700,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: "Claude API 오류", detail: errText }) };
    }

    const data = await res.json();
    const narrative = data?.content?.[0]?.text?.trim() || "";

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ narrative }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
