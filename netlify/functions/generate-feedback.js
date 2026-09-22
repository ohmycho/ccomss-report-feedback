// netlify/functions/generate-feedback.js
//
// '부모님 피드백' 도구용 — 수업 관찰 기록을 학부모용 카카오톡 메시지 초안으로 바꿔주는 함수.
// generate-report.js와 배포 방법 동일 (같은 netlify/functions 폴더, 같은 ANTHROPIC_API_KEY 사용).
//
// 중요: 선생님의 해석·가설(feedbackInterpretation)은 이 함수에 아예 전달하지 않습니다.
// 프론트에서도 보내지 않고, 혹시 보내오더라도 이 함수는 그 값을 무시합니다 —
// "관찰과 해석을 구분한다"는 원칙을 프롬프트 지시가 아니라 코드 단에서 강제하기 위함입니다.
//
// b07: learningPoint(관련 학습 포인트, 선택) 추가 — 실제 현장에서는 수업 피드백에 학습 지표를
// 같이 언급하는 경우가 많아, 있으면 자연스럽게 한 문장으로 엮이도록 프롬프트에 포함합니다.
// (학습 리포트 도구와 입력은 분리돼 있고, 이 필드는 선생님이 직접 적은 값만 사용합니다.)

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

  const { brandName, student, session, start, action, learningPoint, quote, next, home } = payload;

  if (!student || !action) {
    return { statusCode: 400, body: JSON.stringify({ error: "student, action은 필수입니다" }) };
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
2. 학원 철학에 맞게 다정하고 전문가다운 톤으로, 학부모가 안심하고 신뢰할 수 있게 씁니다.
3. 인사말로 시작해서, 수업 중 있었던 일을 자연스럽게 전하고, 다음 계획이나 격려로 마무리합니다.
4. "관련 학습 포인트"가 주어졌다면, 별도 문단으로 딱 떼어 나열하지 말고 수업 관찰 내용과
   한 흐름으로 자연스럽게 엮어서 언급합니다 (실제 선생님들이 카톡 보낼 때 하는 방식).
5. 전체 3~5문장, 카카오톡으로 바로 보낼 수 있는 완성된 메시지 형태로 씁니다.
6. 이모지나 별표 같은 장식은 쓰지 않습니다.`;

  const userPrompt = `학생 표시 이름: ${student}
관찰된 사실:
${factLines}

위 사실만 바탕으로 학부모에게 보낼 카카오톡 피드백 메시지를 작성해주세요.`;

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
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: "Claude API 오류", detail: errText }) };
    }

    const data = await res.json();
    const feedback = data?.content?.[0]?.text?.trim() || "";

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ feedback }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
