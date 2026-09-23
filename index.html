<!--
  진단·리포트 API 목업 — 기능 버전 v2.0
  v1.0 (archive/diagnosis-report-api-mockup-v1.html): 두뇌로리포트(진단 입력 4단계 위저드) 단일 도구
  v2.0: 두뇌로리포트 + 꼼즈 피드백(수업 관찰 → 학부모 피드백 초안) 2개 도구를 모드 선택으로 분리, escapeHtml 적용
  v2.1: 꼼즈 피드백에 Claude API(Netlify Function: functions/generate-feedback.js) 연동 —
    배포 안 됐거나 호출 실패 시 자동으로 규칙 기반 문안으로 대체(fallback). 선생님의 해석·가설(feedbackInterpretation)은
    프론트/함수 어디에서도 전송하지 않아 학부모용 초안에 절대 섞이지 않음.

  ----------------------------------------------------------------------------
  인덱스 빌드(index.html 배포본) 버전 — 기능 버전과 별도로, 디자인/배포 수정할 때마다 올림.
  화면 우상단 브랜드바에 "idx bNN"으로도 표시됨 (재배포 후 실제 반영됐는지 눈으로 바로 확인용).
    b01: select 드롭다운 커스텀 화살표(appearance:none) 적용
    b02: 입력/버튼 폰트 14→16px, 패딩 확대 (Toss TDS 기준, iOS 자동확대 방지)
    b03: 위저드 이전/다음 버튼을 화면 하단 고정(sticky bottom bar)으로 변경
    b04: 1단계에서 "이전" 버튼을 visibility:hidden → display:none으로 바꿔
      "다음" 버튼이 오른쪽으로 치우쳐 보이던 문제 수정
    b05: 위저드 스텝 전환에 방향성 슬라이드+페이드 애니메이션 추가(다음=오른쪽에서, 이전=왼쪽에서),
      버튼 클릭 시 눌리는 느낌(scale down) 추가
    b06: 도구 이름을 브랜드 종속적("두뇌로리포트"/"꼼즈 피드백")에서 범용 기능명
      ("학습 리포트"/"부모님 피드백")으로 변경 — 다른 방문학습 브랜드에 판매할 때 혼동 방지.
      브랜드명은 상단 브랜드바에서 별도 표시
    b07 (이 파일): 부모님 피드백 입력에 "관련 학습 포인트(선택)" 필드 추가 — 실제 현장에서는
      수업 관찰 피드백에 학습 지표(오답률 개선 등)를 같이 언급하는 경우가 많아, 두 도구의
      입력/생성 로직은 분리하되 피드백 문안에 학습 포인트를 자연스럽게 엮을 수 있도록 함.
      generate-feedback.js도 같이 업데이트 필요 (functions 폴더 파일도 재배포할 것)
    b08 (이 파일): 부모님 피드백 결과 화면에 "최근 리포트와 합쳐서 보내기" 버튼 추가 —
      생성 로직/데이터는 여전히 완전히 분리, 이미 만들어진 두 결과물(피드백 초안 + 같은 학생 이름의
      가장 최근 학습 리포트)을 화면/복사 단계에서만 이어붙임. 학생 이름이 양쪽에 동일하게 입력돼
      있어야 매칭됨 (localStorage 이력 기준, 현재는 브랜드별로만 구분되고 학생 고유 ID는 없음)
    b09: 리포트 문단 간격이 두 배로 벌어지던 버그 수정 — \n 하나마다 무조건 <br><br>로
      바꾸던 걸, 문단 구분(\n\n 이상)만 <br><br>로/문단 내 줄바꿈은 <br> 하나로 바꾸게 수정
    b10: 상단 브랜드 영역을 누르면 홈(① 학습 리포트 · 진단 입력 1단계)으로
      돌아가도록 버튼화. 우측 브랜드 드롭다운 스위처는 지금 단일 브랜드로만 데모하므로 제거
      (BRANDS 객체·멀티브랜드 로직 자체는 남겨둠 — 나중에 브랜드 늘어나면 스위처 UI만 다시 추가하면 됨)
    b11: 카카오톡 공유하기 연동 — Kakao JS SDK(developers.kakao.com/sdk/js/kakao.min.js)
      추가, Kakao.init(JS 키)로 초기화. shareTextViaKakao() 공용 함수: 기본 텍스트 템플릿(최대 200자)
      범위 안이면 카카오톡 공유 시트를 바로 열고, 넘으면(리포트는 대부분 여기 해당) 자동으로
      클립보드 복사로 대체 + 안내 토스트. 학습 리포트 결과 화면과 부모님 피드백 결과 화면 각각에
      "카카오톡으로 공유하기" 버튼 추가(합쳐진 피드백을 공유할 때는 합쳐진 텍스트 기준).
      JS 키는 카카오 개발자센터에서 발급받은 공개용 키로, 코드에 노출돼도 안전함
      (플랫폼/도메인 등록은 카카오 개발자센터 콘솔에서 별도로 해야 실제 공유가 동작함).
    b12 (이 파일): 1) 부모님 피드백 "가상 사례 불러오기" 버튼 아래에 안내 문구(hint) 추가 —
      테스트용 예시 데이터이며, 불러온 뒤 "학부모용 초안 만들기"를 눌러 결과를 바로 확인해볼 수
      있다는 사용법 설명. 2) "카카오톡으로 공유하기" 버튼을 카카오 브랜드 가이드에 맞춰
      배경 #FEE500(카카오 옐로) · 텍스트 #191919로 스타일링 (.btn.kakao 클래스 추가).
    b13 (이 파일): 특정 학원명 노출 제거 — 다른 학원 원장님들께 범용 데모로 보여줄 수 있도록,
      브랜드 id를 gwanggyo→demo로, 브랜드명을 "꼼즈광교"→"OO학원"(플레이스홀더)로 변경.
      상단 브랜드 버튼은 이제 "학습진단리포트·부모님피드백"이라는 고정 문구를 표시(브랜드명과 분리).
      BRANDS 설정에 있던 담당 원장 이름(director 필드) 삭제. 코드 주석에 남아있던 학원명도 제거.
    b14 (이 파일): 상단 영역 순서를 앱 이름(큰 글씨, 클릭 시 홈) → 한 줄 소개(작은 글씨) 순으로 재배치,
      한 줄 소개 문구를 "학습리포트와 부모님피드백을 동시에"로 변경. 앱 이름은 정식 명칭이 정해지면
      #brandNameTop 텍스트만 바꾸면 됨(로직 변경 불필요).
    b15 (이 파일): 앱 이름 확정 — "피드톡"으로 상단 브랜드 영역/<title> 태그 변경.
      한 줄 소개에 "AI" 명시: "학습리포트와 부모님피드백을 동시에" → "AI가 학습리포트와 부모님피드백을 동시에".
    b16 (이 파일): 상단바를 제품처럼 보이게 정리 — 브랜드명 앞 주황 점(brand-dot) 제거,
      한 줄 슬로건은 더 얇고 작게(font-weight 600→400, 15px→13px), 버전/빌드 표시(v2.1·idx)는
      우측 상단 구석에 더 작게 분리 배치. 로고 이미지는 별도로 시안만 만들어 검토 후 적용 예정
      (아직 이 파일에는 반영 안 함).
    b17 (이 파일): 로고 컨셉 2(말풍선 아이콘 + 워드마크) 선택 반영 — 상단 브랜드 영역에
      .brand-mark(CSS 도형으로 만든 임시 말풍선 아이콘) 추가. 지금은 코드로 그린 임시 도형이며,
      나중에 정식 SVG/이미지 로고로 교체할 예정(그때 .brand-mark 자리만 바꾸면 됨).
    b18 (이 파일 + functions/generate-report.js + functions/generate-feedback.js): 코드 리뷰 기반
      로직/보안 수정 7건.
      1) 학생별 결과 혼합 방지 — 피드백 초안을 생성한 시점의 입력값을 feedbackDraftMeta로 스냅샷
         저장하고, 이후 입력(이름 포함)이 하나라도 바뀌면 재생성 전까지 합치기/복사/카카오공유 버튼을
         막고 경고 문구(#feedbackStaleWarning)를 표시. "최근 리포트와 합치기"는 이름이 같은 이력이
         여러 건이면(동명이인 가능성) 가장 최근 것을 쓰되 날짜를 반드시 보여주고 토스트로 안내.
      2) Claude 응답 처리 — 서버에서 content 배열의 type:"text" 블록을 모두 골라 이어붙이도록 수정
         (기존 content[0].text만 읽던 버그). 재시도 후에도 잘린 응답(stop_reason:"max_tokens"),
         빈 응답, refusal을 정상 완료로 취급하지 않고 에러로 처리. Sonnet 5 공식 문서 기준으로
         effort(기본값 high)는 출력을 자르지 않으며 max_tokens 1200/700은 이 용도(400~600자)에
         적절함을 확인 — 토큰 값은 변경하지 않음.
      3) 오류 표시 — 함수가 아예 연결되지 않는 경우(404/네트워크 오류=미배포)만 데모로 조용히 대체하고,
         함수가 응답했지만 실패한 경우는 #reportGenError/#feedbackGenError에 실패 안내를 띄우고
         버튼을 다시 눌러 재시도할 수 있게 함(자동으로 데모 문안으로 숨기지 않음). 서버는 상태코드·
         오류 원인 분류(stop_reason 등)·토큰 사용량만 콘솔에 로그하고, 학생 이름/입력값/API 키는
         절대 로그에 남기지 않음.
      4) 근거 없는 해석 방지 — 두 함수의 system prompt와 프론트 데모 문안(buildNarrative) 모두에
         "관찰(집중도 등)만으로 더 큰 결론(개념 이해도)으로 비약 금지", "감정 태그로 내면 심리 단정
         금지", "입력되지 않은 구체적 지도 계획을 확정적으로 약속 금지" 원칙을 명시. 생성 결과는
         #reportNarrativeText/#feedbackText/#mergedReportText를 contenteditable로 만들어 선생님이
         복사·공유 전에 직접 수정 가능.
      5) 서버 입력 검증/호출 보호 — 두 함수 모두 허용된 필드만 읽고, 자료형·점수범위(0~100)·선택지
         (enum)·글자수 상한을 서버에서 검증(FIELD_RULES/FIELD_LIMITS). 기존에는 인증/호출 제한이
         전혀 없었음 — 이번에 (a) 선택적 APP_SHARED_SECRET 헤더 검사(설정 안 하면 기존처럼 동작,
         진짜 인증 아님) (b) IP 기준 인메모리 분당 호출 제한(콜드스타트/다중 인스턴스에서는 부정확,
         공개 운영 전 Netlify 공식 Rate Limiting 등으로 교체 권장)을 추가. 로그인·결제 시스템은
         이번 작업 범위에 포함하지 않음 — 공개 운영 전 별도 작업으로 필요.
      6) 사용 중 오류 — 복사는 navigator.clipboard.writeText가 실제로 성공했을 때만 성공 토스트를
         표시(실패 시 실패 안내). localStorage 읽기/쓰기 전체에 safeGetItem/safeSetItem 안전판 적용
         (private 모드/저장공간 초과 시에도 안내와 함께 정상 동작). Config 탭에서 선택 항목 토글을
         바꿔도 Input 탭에 이미 입력한 값이 사라지지 않도록 renderFieldGroup에 preserveValues 옵션
         추가. "상위 N%"/"N%ile" 표시를 "상위 N%"로 통일. 이력 패널에 "최근 20건까지만, 이 브라우저
         에만 저장됨" 안내 문구 추가.
      7) 원본 파일 확인 — 실제 파일에 마크다운 링크 변환이나 밑줄/백틱 앞 역슬래시 오염이 있는지
         grep으로 확인한 결과, 오염 없음(수정 불필요).
    b19 (이 파일): 파비콘/앱 아이콘 추가 — 상단바 .brand-mark(말풍선 아이콘, 컨셉2)와 동일한
      모양을 정식 아이콘 파일(PNG)로 만들어 <head>에 삽입. 네이비(#0D1B3E) 배경에 오렌지
      (#FF6B2C) 말풍선을 얹은 형태로, 32×32(브라우저 탭)·192×192(안드로이드 홈화면 추가)·
      180×180(iOS 홈화면 추가/apple-touch-icon) 3개 크기를 base64로 인코딩해 파일을 별도로
      추가하지 않고 이 HTML 한 파일 안에 그대로 포함(단일 파일 배포 원칙 유지).
    b20 (이 파일): 1) b19 아이콘이 말풍선 꼬리(tail)의 시각적 무게를 고려하지 않고 사각형만
      중앙정렬해서, 실제로는 오른쪽·아래로 치우쳐 보이던 문제 수정 — 말풍선+꼬리를 합친 전체
      bounding box 기준으로 다시 중앙정렬. 2) 홈화면에 추가할 때 표시되는 앱 이름이 "피드톡 —
      학습리포트·부모님피드백 데모"로 길어서 "피드톡—학습…"처럼 잘리던 문제 — <title>을 "피드톡"만
      남기고, iOS 홈화면 이름을 명시적으로 고정하는 apple-mobile-web-app-title 메타 태그도 "피드톡"으로 추가.
    b21 (이 파일): 1) 도구 선택 버튼("학습 리포트"/"부모님 피드백")에 붙어있던 ①/② 번호 제거 —
      두 도구는 순서가 있는 단계가 아니라 서로 독립된 도구라서 번호가 오히려 "1번부터 순서대로"라는
      오해를 줄 수 있어 삭제. 2) 상단 슬로건 "AI가 학습리포트와 부모님피드백을 동시에"에 띄어쓰기
      추가 → "AI가 학습 리포트와 부모님 피드백을 동시에".
  현재 빌드: b21 · 2026-09-23
  ----------------------------------------------------------------------------
-->
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>피드톡</title>
<meta name="apple-mobile-web-app-title" content="피드톡">
<link rel="icon" type="image/png" sizes="32x32" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACNUlEQVRYhe2XvWtTURiHn3Nyk4Z4bxsQWjSgiBYRjVgcxCLq4qQIQl3EDxAEJ5f+DSJddXAITuLQxaVCwcVYKujQUmohQVMRbGIrDZKvamNzX4c0pQi59+Z78Tfe95z3+d3z9Z6j2CVzaHRQG8YD4LLAMLCH9igHJJTIi3zIjJGa3qwF1A48cuG6Qp4BVpug9ZRE9LVCJp7cMbANn9xtqMPKKsXZ/MrMZ2UOjQ4qw0jR+T//V4uFtD6tt+e823CAk9Z+uaUFdaUH8KqUfVuDHO6ZAdQpDZi9M0DY8NLq0tAf7h36zbBp49Pi2j5VNHiYCDL30z29siLnHTPeObjJ45FSw/uzbMONDxav1/yO7bRTsE8Lj6IbTR0OAQ1PRkoYjgQXA0f7K5iG+5DX076gzTGr0ryBgRbgNYX9dvMGuqH/BhwN2NJ6cXTL4WggWdC0ugyXi86D7BjNljWT3/qahr/54Wd1swUDAOOLIaa+BxqGv88a3J93v9G5HsVQvSZNRDc4MbBFqaKYXg0gdXqVbcVS3sfHnA/bw/x5KkYCHB+ocGbvFldn+3mX9dTNkxrahuMLobbCweMIADz9EuRVxrmyNSNPa6CT0lQfDb2RIq+BhV7xRVjWCM97ZUArmVJw0bAi9jwQ7TI/h+gjGuJbYI8B2S7CRRR3C5n4ugYopGc/IfockOgCPCeKseLKzEsAX+1rufB1vXzAjAV+hdaUIkz1uRZsE7QosKSVxBDfzWL67Vwt8BcXcqtGYtgBIgAAAABJRU5ErkJggg==">
<link rel="icon" type="image/png" sizes="192x192" href="data:image/png;base64,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">
<link rel="apple-touch-icon" sizes="180x180" href="data:image/png;base64,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">
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css">
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<style>
  :root{
    --brand-primary:#0D1B3E;
    --brand-accent:#FF6B2C;
    --brand-sub:#4FB3E8;
    --bg:#F4F5F7;
    --card:#FFFFFF;
    --text:#1A1A1A;
    --text-sub:#767676;
    --border:#E5E7EB;
    --radius:16px;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    font-family:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif;
    background:var(--bg);
    color:var(--text);
  }
  .app{max-width:420px;margin:0 auto;min-height:100vh;background:var(--bg);padding-bottom:40px;}
  .topbar{
    background:var(--brand-primary);
    color:#fff;
    padding:20px 20px 16px;
    position:sticky;top:0;z-index:10;
  }
  .topbar-version{
    position:absolute;top:10px;right:16px;
    font-size:10px;font-weight:500;opacity:0.38;letter-spacing:0.01em;
  }
  .topbar-title{font-size:13px;font-weight:400;opacity:0.7;margin-top:4px;}
  .topbar-brand{
    font-size:22px;font-weight:700;display:flex;align-items:center;gap:8px;
    border:none;background:transparent;color:#fff;font-family:inherit;padding:2px 0;
    letter-spacing:-0.01em;
    cursor:pointer;transition:opacity .12s ease, transform .12s ease;
  }
  .topbar-brand span:not(.brand-mark){overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .topbar-brand:active{opacity:0.7;transform:scale(0.98);}
  /* 로고 컨셉 2 — 말풍선 아이콘 (2026-09-22 확정, 임시 CSS 도형. 실제 SVG/이미지 로고로 추후 교체 예정) */
  .brand-mark{position:relative;width:26px;height:22px;border-radius:8px;background:var(--brand-accent);flex-shrink:0;}
  .brand-mark::after{content:"";position:absolute;left:6px;bottom:-5px;width:8px;height:8px;background:var(--brand-accent);clip-path:polygon(0 0, 100% 0, 0 100%);border-bottom-left-radius:2px;}

  .tabs{display:flex;background:#fff;border-bottom:1px solid var(--border);position:sticky;top:76px;z-index:9;}
  .tab{flex:1;text-align:center;padding:13px 0;font-size:14px;font-weight:600;color:var(--text-sub);cursor:pointer;border-bottom:2px solid transparent;}
  .tab.active{color:var(--brand-primary);border-bottom-color:var(--brand-accent);}

  .panel{display:none;padding:18px 16px;}
  .panel.active{display:block;}

  .card{background:var(--card);border-radius:var(--radius);padding:18px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,0.04);}
  .card-title{font-size:16px;font-weight:700;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;}
  .card-title small{font-size:12.5px;font-weight:500;color:var(--text-sub);}

  label.field-label{display:block;font-size:14px;font-weight:600;color:var(--text-sub);margin:12px 0 7px;}
  input[type=text], input[type=number], input[type=tel], select, textarea{
    width:100%;padding:14px 14px;border:1.5px solid var(--border);border-radius:12px;
    font-size:16px;font-family:inherit;background:#fafafa;min-height:52px;
    transition:border-color .15s ease, box-shadow .15s ease, background .15s ease;
  }
  select{
    appearance:none;-webkit-appearance:none;-moz-appearance:none;
    padding-right:38px;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23767676' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat;
    background-position:right 14px center;
  }
  select:invalid, select option[value=""]{color:#B6BAC2;}
  textarea{resize:vertical;min-height:76px;line-height:1.5;}
  input:focus, select:focus, textarea:focus{
    outline:none;background:#fff;border-color:var(--brand-sub);
    box-shadow:0 0 0 3px color-mix(in srgb, var(--brand-sub) 18%, transparent);
  }
  input::placeholder, textarea::placeholder{color:#B6BAC2;opacity:1;}

  .input-suffix-wrap{position:relative;}
  .input-suffix-wrap input{padding-right:40px;}
  .input-suffix{
    position:absolute;right:16px;top:50%;transform:translateY(-50%);
    color:var(--text-sub);font-size:15px;font-weight:600;pointer-events:none;
    opacity:0;transition:opacity .15s ease;
  }
  .input-suffix.show{opacity:1;}

  .char-counter{text-align:right;font-size:12px;color:var(--text-sub);margin-top:4px;}

  .toggle-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #F0F0F0;}
  .toggle-row:last-child{border-bottom:none;}
  .toggle-row .label{font-size:14.5px;font-weight:500;}
  .toggle-row .tag{font-size:11px;color:#fff;background:var(--brand-sub);padding:2px 7px;border-radius:20px;margin-left:6px;}
  .toggle-row .tag.core{background:var(--brand-primary);}
  .switch{position:relative;width:44px;height:26px;flex-shrink:0;}
  .switch input{opacity:0;width:0;height:0;}
  .slider{position:absolute;cursor:pointer;inset:0;background:#D7D9DE;border-radius:26px;transition:.2s;}
  .slider:before{content:"";position:absolute;height:20px;width:20px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s;}
  .switch input:checked + .slider{background:var(--brand-accent);}
  .switch input:checked + .slider:before{transform:translateX(18px);}
  .switch input:disabled + .slider{opacity:0.5;cursor:not-allowed;}

  .btn{
    width:100%;padding:16px;border:none;border-radius:12px;font-size:16px;font-weight:700;
    background:var(--brand-accent);color:#fff;cursor:pointer;margin-top:6px;min-height:52px;
    transition:transform .12s ease, opacity .12s ease;
  }
  .btn:active{opacity:0.85;transform:scale(0.97);}
  .btn:disabled{opacity:0.45;cursor:not-allowed;transform:none;}
  .btn.secondary{background:#fff;border:1.5px solid var(--brand-primary);color:var(--brand-primary);}
  .btn.small{width:auto;padding:10px 16px;font-size:13.5px;font-weight:600;min-height:auto;}
  /* 카카오 브랜드 가이드: 배경 #FEE500(카카오 옐로), 텍스트/아이콘 #191919 */
  .btn.kakao{
    background:#FEE500;color:#191919;
    display:flex;align-items:center;justify-content:center;gap:6px;
  }
  .btn.kakao svg{flex-shrink:0;}

  .hint{font-size:13px;color:var(--text-sub);line-height:1.5;margin-top:6px;}
  /* b18: 실패 안내 + 재시도, 입력 변경으로 인한 재생성 필요 안내 */
  .gen-error{
    font-size:13px;line-height:1.6;color:#B3261E;background:#FDECEA;border:1px solid #F5C2BE;
    border-radius:10px;padding:10px 12px;margin-top:10px;
  }
  .stale-warning{
    font-size:12.5px;line-height:1.6;color:#9A5B12;background:#FFF7ED;border:1px solid #FFDCB8;
    border-radius:10px;padding:10px 12px;margin-bottom:12px;
  }

  /* Report */
  .report-card{
    background:var(--brand-primary);
    color:#fff;border-radius:16px;padding:24px 20px;margin-bottom:16px;
  }
  .report-card .rc-brand{font-size:12px;opacity:0.7;font-weight:600;letter-spacing:0.5px;}
  .report-card .rc-name{font-size:22px;font-weight:700;margin:6px 0 2px;}
  .report-card .rc-date{font-size:12px;opacity:0.6;}
  .score-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:16px;}
  .score-box{background:rgba(255,255,255,0.08);border-radius:12px;padding:12px;}
  .score-box .sb-label{font-size:11px;opacity:0.7;margin-bottom:4px;}
  .score-box .sb-value{font-size:18px;font-weight:700;color:var(--brand-accent);}

  .narrative{background:#fff;border-radius:16px;padding:18px;line-height:1.75;font-size:15px;white-space:pre-wrap;}
  .narrative-label{font-size:12px;font-weight:700;color:var(--brand-sub);margin-bottom:8px;display:flex;align-items:center;gap:6px;}
  /* b18: AI 생성 결과를 선생님이 직접 수정할 수 있도록 contenteditable 영역 스타일 */
  .narrative-editable, .feedback-text{
    outline:none;border-radius:10px;margin:-6px;padding:6px;
    transition:background .15s ease, box-shadow .15s ease;
  }
  .narrative-editable:focus, .feedback-text:focus{
    background:#FFFBF3;box-shadow:0 0 0 2px rgba(255,107,44,.25);
  }
  .ai-badge{background:var(--brand-sub);color:#fff;font-size:10px;padding:2px 7px;border-radius:20px;font-weight:700;}

  .history-item{background:#fff;border-radius:14px;padding:14px 16px;margin-bottom:10px;border:1px solid var(--border);cursor:pointer;}
  .history-item .hi-top{display:flex;justify-content:space-between;font-size:13px;font-weight:700;}
  .history-item .hi-sub{font-size:12px;color:var(--text-sub);margin-top:4px;}

  .empty{text-align:center;padding:40px 20px;color:var(--text-sub);font-size:13.5px;}

  .toast{
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#1A1A1A;color:#fff;padding:11px 20px;border-radius:30px;
    font-size:13px;opacity:0;pointer-events:none;transition:.25s;z-index:100;
  }
  .toast.show{opacity:1;bottom:34px;}

  .field-config-note{
    background:#FFF7ED;border:1px solid #FFDCB8;border-radius:10px;padding:10px 12px;
    font-size:12px;color:#9A5B12;margin-bottom:14px;line-height:1.5;
  }
  .setup-notice{
    background:#EAF2FF;border:1px solid #C9DFFF;border-radius:12px;padding:14px;margin-bottom:14px;
  }
  .setup-notice .sn-title{font-size:13.5px;font-weight:700;color:var(--brand-primary);margin-bottom:4px;display:flex;align-items:center;gap:6px;}
  .setup-notice .sn-body{font-size:12.5px;color:#3A4A63;line-height:1.6;margin-bottom:10px;}
  .setup-notice .sn-actions{display:flex;gap:8px;}
  .setup-notice .sn-btn{
    flex:1;padding:9px 0;border-radius:9px;font-size:12.5px;font-weight:700;text-align:center;cursor:pointer;border:none;
  }
  .setup-notice .sn-btn.primary{background:var(--brand-primary);color:#fff;}
  .setup-notice .sn-btn.ghost{background:transparent;color:#3A4A63;text-decoration:underline;}

  /* Wizard */
  .wizard-progress{margin-bottom:14px;text-align:center;}
  .step-dots{display:flex;justify-content:center;align-items:center;gap:7px;margin-bottom:10px;}
  .step-dot{width:7px;height:7px;border-radius:50%;background:#E5E7EB;transition:.2s;}
  .step-dot.done{background:var(--brand-accent);opacity:0.45;}
  .step-dot.active{background:var(--brand-accent);width:18px;border-radius:4px;}
  .wp-label{font-size:12px;color:var(--text-sub);font-weight:600;}
  .wizard-step{display:none;}
  .wizard-step.active{display:block;}
  .wizard-step.enter-fwd{animation:stepInFwd .32s cubic-bezier(.22,1,.36,1);}
  .wizard-step.enter-back{animation:stepInBack .32s cubic-bezier(.22,1,.36,1);}
  @keyframes stepInFwd{
    from{opacity:0;transform:translateX(24px);}
    to{opacity:1;transform:translateX(0);}
  }
  @keyframes stepInBack{
    from{opacity:0;transform:translateX(-24px);}
    to{opacity:1;transform:translateX(0);}
  }
  @media (prefers-reduced-motion: reduce){
    .wizard-step.enter-fwd, .wizard-step.enter-back{animation:none;}
  }
  #panel-input{padding-bottom:96px;}
  .wizard-nav{
    display:flex;gap:8px;
    position:fixed;left:50%;bottom:0;transform:translateX(-50%);
    width:100%;max-width:420px;
    background:var(--bg);
    padding:12px 16px calc(12px + env(safe-area-inset-bottom));
    box-shadow:0 -6px 16px rgba(0,0,0,0.06);
    z-index:20;
  }
  .wizard-nav .btn{margin-top:0;}
  .review-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F0F0F0;font-size:14px;gap:12px;}
  .review-row:last-child{border-bottom:none;}
  .review-row .rr-label{color:var(--text-sub);flex-shrink:0;}
  .review-row .rr-value{font-weight:600;text-align:right;word-break:break-all;}
  .mode-picker{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px 16px 8px;}
  .mode-btn{background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:13px 10px;text-align:left;cursor:pointer;font-family:inherit;}
  .mode-btn strong{display:block;font-size:15px;color:var(--brand-primary);margin-bottom:4px;}
  .mode-btn span{font-size:11px;color:var(--text-sub);line-height:1.35;}
  .mode-btn.active{border-color:var(--brand-accent);box-shadow:0 0 0 2px rgba(255,107,44,.12);}
  .demo-notice{font-size:12px;line-height:1.5;color:#675a41;background:#fff7e7;border:1px solid #f2e4c4;border-radius:10px;margin:8px 16px 0;padding:10px 12px;}
  .feedback-panel{display:none;padding:18px 16px;}
  body.mode-feedback .tabs,body.mode-feedback .panel{display:none!important;}
  body.mode-feedback .feedback-panel{display:block;}
  .feedback-panel textarea{min-height:88px;line-height:1.5;}
  .feedback-result{display:none;}
  .feedback-result.visible{display:block;}
  .feedback-text{white-space:pre-wrap;line-height:1.75;font-size:15px;}
  .review-note{font-size:13px;line-height:1.6;color:#805c25;background:#fff7e7;border-radius:9px;padding:10px 12px;margin-top:14px;}
  .merge-section{margin-top:14px;padding-top:14px;border-top:1.5px dashed var(--border);}
  .merge-divider{font-size:12px;font-weight:700;color:var(--brand-sub);margin-bottom:8px;}
  .field-help{font-size:13px;color:var(--text-sub);line-height:1.5;margin:-2px 0 10px;}
</style>
</head>
<body>
<div class="app" id="app">

  <div class="topbar">
    <div class="topbar-version">v2.1 · idx b21</div>
    <button class="topbar-brand" id="homeBtn" type="button" aria-label="홈으로">
      <span class="brand-mark" aria-hidden="true"></span>
      <span id="brandNameTop">피드톡</span>
    </button>
    <div class="topbar-title">AI가 학습 리포트와 부모님 피드백을 동시에</div>
  </div>

  <div class="mode-picker" aria-label="도구 선택">
    <button class="mode-btn active" id="reportModeBtn" type="button"><strong>학습 리포트</strong><span>평가 항목 입력 → 학습 리포트</span></button>
    <button class="mode-btn" id="feedbackModeBtn" type="button"><strong>부모님 피드백</strong><span>수업 관찰 입력 → 학부모 피드백</span></button>
  </div>
  <div class="demo-notice">시연용 화면입니다. 실제 학생 이름·상담 내용·연락처를 입력하지 마세요.</div>

  <div class="tabs">
    <div class="tab active" data-tab="input">진단 입력</div>
    <div class="tab" data-tab="config">필드 설정</div>
    <div class="tab" data-tab="report">리포트</div>
    <div class="tab" data-tab="history">이력</div>
  </div>

  <!-- INPUT PANEL (4-step wizard) -->
  <div class="panel active" id="panel-input">
    <div class="wizard-progress">
      <div class="step-dots" id="stepDots"></div>
      <div class="wp-label" id="wizardLabel">1 / 4 · 학생 정보</div>
    </div>

    <!-- STEP 1: 학생 정보 -->
    <div class="wizard-step active" data-step="1">
      <div class="card">
        <div class="card-title">학생 정보</div>
        <label class="field-label">학생 이름</label>
        <input type="text" id="studentName" placeholder="예: 김민준" maxlength="40">
        <label class="field-label">학부모 연락처 (선택)</label>
        <input type="tel" inputmode="numeric" id="parentContact" placeholder="010-1234-5678" maxlength="13">
      </div>
    </div>

    <!-- STEP 2: 코어 진단 항목 (안내 배너는 여기, 항목 입력 직전에) -->
    <div class="wizard-step" data-step="2">
      <div class="setup-notice" id="setupNotice">
        <div class="sn-title">📋 진단 항목 입력 전에 먼저 확인해주세요</div>
        <div class="sn-body">
          학원마다 쓰는 진단 항목이 달라서, 입력 전에 <b>'필드 설정'</b> 탭에서 우리 학원에 맞는 항목이 켜져 있는지 확인해주세요.
          혹시 필요한 항목이 안 보이면 대표님께 알려주세요 — 검토 후 추가해드립니다.
        </div>
        <div class="sn-actions">
          <button class="sn-btn primary" id="goToConfigBtn">필드 설정 확인하러 가기</button>
          <button class="sn-btn ghost" id="dismissNoticeBtn">확인했어요, 그만 보기</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">핵심 진단 항목 <small>모든 학원 공통</small></div>
        <div id="coreFieldsInput"></div>
      </div>
    </div>

    <!-- STEP 3: 확장 진단 항목 -->
    <div class="wizard-step" data-step="3">
      <div class="card">
        <div class="card-title">확장 진단 항목 <small>학원 설정에서 켠 항목만 표시됩니다</small></div>
        <div id="optionalFieldsInput"></div>
      </div>
    </div>

    <!-- STEP 4: 확인 및 생성 -->
    <div class="wizard-step" data-step="4">
      <div class="card">
        <div class="card-title">입력 내용 확인</div>
        <div id="reviewSummary"></div>
      </div>
      <div class="hint">배포된 서버(Netlify Function)가 연결되면 Claude API로 리포트를 생성합니다. 서버에 연결할 수 없는 경우(예: 로컬에서 파일을 직접 열었을 때)에만 확인용 데모 문안으로 대체됩니다.</div>
      <div class="gen-error" id="reportGenError" style="display:none;"></div>
    </div>

    <div class="wizard-nav">
      <button class="btn secondary small" id="wizardBackBtn">이전</button>
      <button class="btn" id="wizardNextBtn" style="flex:1;width:auto;">다음</button>
      <button class="btn" id="generateBtn" style="display:none;flex:1;width:auto;">AI 리포트 생성하기</button>
    </div>
  </div>

  <!-- CONFIG PANEL -->
  <div class="panel" id="panel-config">
    <div class="field-config-note">
      학원(브랜드)마다 진단에 쓰는 항목이 다를 수 있어요. 코어 항목은 항상 켜져 있고, 확장 모듈은 원장님이 선택적으로 켜고 끌 수 있습니다. 설정은 브랜드별로 저장됩니다.
      <br><br><b>원하는 항목이 목록에 없나요?</b> 대표님께 알려주시면 검토 후 새 항목으로 추가해드립니다.
    </div>
    <div class="card">
      <div class="card-title">코어 항목 <small>항상 사용</small></div>
      <div id="coreToggleList"></div>
    </div>
    <div class="card">
      <div class="card-title">확장 모듈 <small>선택 사용</small></div>
      <div id="optionalToggleList"></div>
    </div>
  </div>

  <!-- REPORT PANEL -->
  <div class="panel" id="panel-report">
    <div id="reportContent">
      <div class="empty">아직 생성된 리포트가 없어요.<br>진단 입력 탭에서 리포트를 생성해보세요.</div>
    </div>
  </div>

  <!-- HISTORY PANEL -->
  <div class="panel" id="panel-history">
    <div class="hint" style="margin:0 0 14px;">이 이력은 <b>이 브라우저(기기)에만</b> 최근 20건까지 저장돼요. 브라우저 데이터를 지우거나 다른 기기·브라우저로 접속하면 보이지 않아요.</div>
    <div id="historyList"><div class="empty">저장된 리포트 이력이 없어요.</div></div>
  </div>

  <div class="feedback-panel" id="feedbackWorkspace">
    <div class="card">
      <div class="card-title">부모님 피드백 입력 <small>입력은 학습 리포트와 별도</small></div>
      <p class="field-help">실제로 본 행동과 들은 말을 먼저 적고, 선생님의 해석은 구분해 적습니다.</p>
      <label class="field-label" for="feedbackStudent">학생 표시 이름</label>
      <input id="feedbackStudent" type="text" placeholder="예: 학생 A (가명)" maxlength="40">
      <label class="field-label" for="feedbackSession">수업 회차·주제</label>
      <input id="feedbackSession" type="text" placeholder="예: 7회차 · 소수의 덧셈과 뺄셈" maxlength="60">
      <label class="field-label" for="feedbackStart">처음 보인 반응</label>
      <textarea id="feedbackStart" placeholder="예: 시작 전 어렵다고 말하며 뺄셈을 피하려 함" maxlength="300"></textarea>
      <label class="field-label" for="feedbackAction">수업에서 확인된 행동·성과</label>
      <textarea id="feedbackAction" placeholder="예: 소수점 위치를 맞추는 방법을 익히고 뺄셈 문제를 스스로 해결함" maxlength="300"></textarea>
      <label class="field-label" for="feedbackLearningPoint">관련 학습 포인트 (선택)</label>
      <textarea id="feedbackLearningPoint" placeholder="예: 이번 단원 오답률 20%→10%로 개선, 소수 연산 84점" maxlength="200"></textarea>
      <p class="field-help">최근 진단/성적 관련 수치가 있으면 적어주세요 — 수업 관찰 내용과 자연스럽게 엮어서 문안에 반영됩니다.</p>
      <label class="field-label" for="feedbackQuote">학생이 직접 한 말 (선택)</label>
      <textarea id="feedbackQuote" placeholder="예: 발표하는 건 부끄러워요" maxlength="200"></textarea>
      <label class="field-label" for="feedbackInterpretation">선생님의 해석·가설 (선택)</label>
      <textarea id="feedbackInterpretation" placeholder="관찰과 구분해서 기록합니다. 학부모용 초안에는 자동으로 포함되지 않습니다." maxlength="300"></textarea>
      <label class="field-label" for="feedbackNext">다음 수업 방향</label>
      <textarea id="feedbackNext" placeholder="예: 학생이 쉬운 문제를 직접 고르고 혼자 시도할 시간을 줌" maxlength="300"></textarea>
      <label class="field-label" for="feedbackHome">가정에 전할 실천 제안 (선택)</label>
      <textarea id="feedbackHome" placeholder="예: 정답보다 스스로 시도한 과정을 구체적으로 칭찬해 주세요" maxlength="300"></textarea>
      <button class="btn secondary" id="feedbackExampleBtn" type="button">가상 사례 불러오기</button>
      <div class="hint">테스트용 예시 데이터예요. 눌러서 입력칸을 채운 뒤 "학부모용 초안 만들기"를 눌러보면 실제로 어떤 결과가 나오는지 바로 확인할 수 있어요.</div>
      <button class="btn" id="feedbackGenerateBtn" type="button">학부모용 초안 만들기</button>
      <div class="gen-error" id="feedbackGenError" style="display:none;"></div>
    </div>
    <div class="card feedback-result" id="feedbackResult">
      <div class="card-title">학부모용 피드백 초안 <span class="ai-badge" id="feedbackBadge">AI (데모 문안)</span></div>
      <div class="stale-warning" id="feedbackStaleWarning" style="display:none;">
        입력 내용이 바뀌었어요 — 아래 버튼은 "학부모용 초안 만들기"로 다시 생성해야 눌러져요. (서로 다른 학생 정보가 섞이는 걸 막기 위해서예요)
      </div>
      <div class="feedback-text" id="feedbackText" contenteditable="true"></div>
      <div class="merge-section" id="mergeSection" style="display:none;">
        <div class="merge-divider">＋ 최근 학습 리포트 (<span id="mergeReportDate"></span>)</div>
        <div class="feedback-text" id="mergedReportText" contenteditable="true"></div>
      </div>
      <div class="hint">✏️ 클릭해서 내용을 직접 수정한 뒤 복사·공유할 수 있어요. 수정한 내용이 그대로 전달됩니다.</div>
      <div class="review-note">이 초안은 관찰 기록만으로 작성했습니다. 선생님의 해석·가설과 민감한 대화는 선생님이 검토한 뒤 필요한 범위에서 직접 반영하세요.</div>
      <button class="btn secondary" id="feedbackMergeBtn" type="button">최근 리포트와 합쳐서 보내기</button>
      <button class="btn kakao" id="kakaoShareFeedbackBtn" type="button" style="margin-top:8px;">카카오톡으로 공유하기</button>
      <button class="btn secondary" id="feedbackCopyBtn" type="button">초안 복사</button>
    </div>
  </div>

</div>

<div class="toast" id="toast"></div>

<script>
/* ---------------------------------------------------------
   b18: 서버 함수 호출 시 함께 보내는 앱 공유 키 — Netlify 환경변수 APP_SHARED_SECRET을
   설정해두면 서버(generate-report.js/generate-feedback.js)가 이 값과 일치하는 요청만 받습니다.
   주의: 이 값은 배포된 JS 파일 안에 그대로 노출되므로 "진짜 인증"이 아니라, 주소를 모르는
   봇/스크래퍼가 함수를 무작위로 호출하는 것을 막는 최소한의 장치입니다. 실제 서비스 오픈 전에는
   선생님별 로그인(Supabase Auth 등) 기반 인증으로 교체해야 합니다 — 이번 수정 범위에는 포함하지 않았습니다.
   서버에 APP_SHARED_SECRET을 설정하지 않았다면 서버 쪽에서 이 헤더 검증을 건너뛰므로 지금 당장
   바꾸지 않아도 기존처럼 동작합니다.
--------------------------------------------------------- */
const APP_SHARED_KEY = ""; // 예: "여기에-넷리파이-APP_SHARED_SECRET과-동일한-값을-입력" (선택 사항)
function apiHeaders(){
  const headers = { "content-type": "application/json" };
  if(APP_SHARED_KEY) headers["x-app-key"] = APP_SHARED_KEY;
  return headers;
}

/* ---------------------------------------------------------
   카카오톡 공유 — Kakao Developers에서 발급받은 JavaScript 키 (공개용 키, 노출돼도 안전)
   b11: 카카오 SDK 연결 + shareTextViaKakao() 공용 함수. 기본 텍스트 템플릿은 200자 제한이 있어서,
   넘으면 자동으로 클립보드 복사로 대체(fallback)함 — 리포트(400~600자)는 대부분 이 경로를 탐.
--------------------------------------------------------- */
const KAKAO_JS_KEY = "c7ce77f9fdaea3cca7662384eb7a3c54";
if(window.Kakao && !Kakao.isInitialized()){
  Kakao.init(KAKAO_JS_KEY);
}
const KAKAO_TEXT_LIMIT = 200; // 카카오 기본 텍스트 템플릿 제한

function shareTextViaKakao(text, buttonTitle){
  // b18: 복사가 실제로 성공했을 때만 성공 안내를 보여줍니다 (예전에는 항상 성공 메시지가 떴음)
  const copyFallback = async (reason)=>{
    try{
      if(!navigator.clipboard) throw new Error("clipboard API 없음");
      await navigator.clipboard.writeText(text);
      showToast(reason);
    }catch(e){
      showToast("복사에 실패했어요 — 내용을 직접 선택해 복사해주세요");
    }
  };
  if(!window.Kakao || !Kakao.isInitialized()){
    copyFallback("카카오톡 공유를 불러오지 못해 대신 복사했어요 — 카카오톡에 붙여넣어 주세요");
    return;
  }
  if(text.length > KAKAO_TEXT_LIMIT){
    copyFallback(`내용이 ${KAKAO_TEXT_LIMIT}자를 넘어 카카오톡 공유 대신 복사했어요 — 카카오톡에 직접 붙여넣어 주세요`);
    return;
  }
  try{
    Kakao.Share.sendDefault({
      objectType: "text",
      text,
      link: { mobileWebUrl: location.href, webUrl: location.href },
      buttonTitle: buttonTitle || "자세히 보기",
    });
  }catch(e){
    copyFallback("카카오톡 공유에 실패해 대신 복사했어요 — 카카오톡에 직접 붙여넣어 주세요");
  }
}

/* ---------------------------------------------------------
   브랜드 / 필드 설정 — 실제 서비스에서는 Supabase academy_config 테이블
--------------------------------------------------------- */
const BRANDS = {
  demo: {
    id: "demo",
    name: "OO학원",
    colors: { primary:"#0D1B3E", accent:"#FF6B2C", sub:"#4FB3E8" },
    enabledCore: ["unitScore","wrongType","attendance","teacherNote"],
    enabledOptional: ["diaryEmotion"]
  }
  // 다른 학원/브랜드를 붙일 때는 이 자리에 같은 형식으로 추가 (id, name, colors만 바꾸면 됨)
};

const CORE_FIELDS = [
  { id:"unitScore", label:"단원별 점수", type:"number", placeholder:"예: 82", suffix:"점", min:0, max:100 },
  { id:"wrongType", label:"오답 유형", type:"select", options:["연산 실수","개념 미이해","시간 부족","문제 해석 오류"] },
  { id:"attendance", label:"출석/과제 이행률", type:"number", placeholder:"예: 90", suffix:"%", step:5, min:0, max:100 },
  { id:"teacherNote", label:"원장님 주관 평가 (태도/이해도)", type:"textarea", placeholder:"예: 수업 집중도는 좋으나 응용문제에서 자신감이 떨어짐", maxlength:200 }
];

const OPTIONAL_FIELDS = [
  { id:"studyTime", label:"주간 학습시간 / 진도율", type:"text", placeholder:"예: 주 5시간, 진도 92%" },
  { id:"trend", label:"최근 성적 추이", type:"select", options:["상승","유지","하락","변동 큼"] },
  { id:"peerRank", label:"또래 대비 백분위", type:"number", placeholder:"예: 상위 20% → 20 입력" },
  { id:"focus", label:"집중도/행동 관찰", type:"select", options:["매우 좋음","양호","보통","개선 필요"] },
  { id:"consultNote", label:"최근 상담 이력 요약", type:"textarea", placeholder:"예: 지난달 상담에서 서술형 문제 보완 요청", maxlength:200 },
  { id:"diaryEmotion", label:"코칭 다이어리 감정 태그", type:"select", options:["의욕적","안정적","불안","무기력","혼합"] }
];

const ALL_FIELDS = [...CORE_FIELDS, ...OPTIONAL_FIELDS];
function fieldById(id){ return ALL_FIELDS.find(f=>f.id===id); }
function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]);
}

/* ---------------------------------------------------------
   상태 (localStorage로 데모 영속화 — 실서비스는 Supabase)
--------------------------------------------------------- */
let currentBrandId = safeGetItem("demo_currentBrand") || "demo";
if(!BRANDS[currentBrandId]){
  // 예전 테스트에서 저장된 브랜드가 더 이상 존재하지 않을 때(예: 강동송파 제거) 첫 번째 브랜드로 안전하게 대체
  currentBrandId = Object.keys(BRANDS)[0];
  safeSetItem("demo_currentBrand", currentBrandId);
}
let lastReport = null;

// b18: localStorage 접근을 모두 try/catch로 감쌉니다 — 시크릿 모드, 저장공간 초과,
// 브라우저 설정으로 localStorage가 막힌 경우 등에서 예외가 나면 화면 전체가 멈추는 대신
// 안내 토스트를 보여주고 계속 진행하도록 합니다.
function safeGetItem(key){
  try{ return localStorage.getItem(key); }catch(e){ return null; }
}
function safeSetItem(key, value){
  try{ localStorage.setItem(key, value); return true; }
  catch(e){
    showToast("저장에 실패했어요 (브라우저 저장공간 문제일 수 있어요) — 화면 내용은 그대로 유지됩니다");
    return false;
  }
}
function getConfig(brandId){
  const saved = safeGetItem("demo_config_"+brandId);
  if(saved){
    try{ return JSON.parse(saved); }catch(e){ /* 저장된 값이 손상된 경우 기본값으로 복구 */ }
  }
  const b = BRANDS[brandId];
  return { enabledOptional: [...b.enabledOptional] };
}
function saveConfig(brandId, cfg){
  safeSetItem("demo_config_"+brandId, JSON.stringify(cfg));
}
function getHistory(brandId){
  const saved = safeGetItem("demo_history_"+brandId);
  if(!saved) return [];
  try{ return JSON.parse(saved); }catch(e){ return []; }
}
// 주의: 최근 20건까지만 이 브라우저에 저장됩니다(slice(0,20)) — 이력 탭에 안내 문구로도 표시됩니다.
function saveHistoryItem(brandId, item){
  const list = getHistory(brandId);
  list.unshift(item);
  return safeSetItem("demo_history_"+brandId, JSON.stringify(list.slice(0,20)));
}

/* ---------------------------------------------------------
   테마 적용
--------------------------------------------------------- */
function applyTheme(brandId){
  const b = BRANDS[brandId];
  document.documentElement.style.setProperty("--brand-primary", b.colors.primary);
  document.documentElement.style.setProperty("--brand-accent", b.colors.accent);
  document.documentElement.style.setProperty("--brand-sub", b.colors.sub);
}

/* ---------------------------------------------------------
   입력 폼 동적 렌더링 (코어 / 확장 분리 — 위저드 스텝별로 표시)
--------------------------------------------------------- */
function renderFieldGroup(fieldList, containerId, emptyMsg, preserveValues){
  const container = document.getElementById(containerId);
  // b18: 필드 설정(확장 항목 on/off)을 바꾸면 이 함수가 다시 호출되면서 입력칸을 통째로 새로
  // 그리는데, 예전에는 이때 이미 입력해둔 값이 그대로 사라졌음. preserveValues가 true일 때는
  // 다시 그리기 전에 값을 저장해뒀다가, 같은 필드가 그대로 남아있으면 복원합니다.
  // (다음 학생 입력을 위해 일부러 폼을 비우는 경우에는 preserveValues를 넘기지 않습니다.)
  const previousValues = {};
  if(preserveValues){
    container.querySelectorAll("[data-field]").forEach(el=>{ previousValues[el.dataset.field] = el.value; });
  }
  container.innerHTML = "";
  if(!fieldList.length){
    container.innerHTML = `<div class="hint">${emptyMsg || "표시할 항목이 없습니다."}</div>`;
    return;
  }
  fieldList.forEach(f=>{
    const wrap = document.createElement("div");
    let inputHtml = "";
    if(f.type === "select"){
      inputHtml = `<select data-field="${f.id}"><option value="">선택</option>${f.options.map(o=>`<option value="${o}">${o}</option>`).join("")}</select>`;
    } else if(f.type === "textarea"){
      const maxAttr = f.maxlength!=null ? ` maxlength="${f.maxlength}"` : "";
      inputHtml = `<textarea data-field="${f.id}" placeholder="${f.placeholder||""}"${maxAttr}></textarea>`;
      if(f.maxlength!=null) inputHtml += `<div class="char-counter" data-counter-for="${f.id}">0/${f.maxlength}자</div>`;
    } else {
      const stepAttr = f.step!=null ? ` step="${f.step}"` : "";
      const minAttr = f.min!=null ? ` min="${f.min}"` : "";
      const maxAttr = f.max!=null ? ` max="${f.max}"` : "";
      const rawInput = `<input type="${f.type}" data-field="${f.id}" placeholder="${f.placeholder||""}"${stepAttr}${minAttr}${maxAttr}>`;
      if(f.suffix){
        inputHtml = `<div class="input-suffix-wrap">${rawInput}<span class="input-suffix" data-suffix-for="${f.id}">${f.suffix}</span></div>`;
      } else {
        inputHtml = rawInput;
      }
    }
    wrap.innerHTML = `<label class="field-label">${f.label}</label>${inputHtml}`;
    container.appendChild(wrap);
  });

  // b18: 다시 그리기 전 값이 있던 필드는 복원 (같은 id로 여전히 존재하는 경우에만)
  if(preserveValues){
    container.querySelectorAll("[data-field]").forEach(el=>{
      if(Object.prototype.hasOwnProperty.call(previousValues, el.dataset.field)){
        el.value = previousValues[el.dataset.field];
      }
    });
  }

  // 숫자 필드 단위(suffix) 표시 + textarea 글자수 카운터, 입력할 때마다 실시간 반영
  container.querySelectorAll("[data-field]").forEach(el=>{
    const suffixEl = container.querySelector(`[data-suffix-for="${el.dataset.field}"]`);
    const counterEl = container.querySelector(`[data-counter-for="${el.dataset.field}"]`);
    const update = ()=>{
      if(suffixEl) suffixEl.classList.toggle("show", el.value.trim() !== "");
      if(counterEl) counterEl.textContent = `${el.value.length}/${el.maxLength}자`;
    };
    el.addEventListener("input", update);
    update();
  });
}

function renderCoreFieldsInput(){
  const ids = BRANDS[currentBrandId].enabledCore;
  renderFieldGroup(ids.map(fieldById).filter(Boolean), "coreFieldsInput");
}
function renderOptionalFieldsInput(preserveValues){
  const cfg = getConfig(currentBrandId);
  renderFieldGroup(
    cfg.enabledOptional.map(fieldById).filter(Boolean),
    "optionalFieldsInput",
    "이 학원에는 켜진 확장 항목이 없어요. '필드 설정' 탭에서 추가할 수 있습니다.",
    preserveValues
  );
}
function renderAllInputFields(){
  renderCoreFieldsInput();
  renderOptionalFieldsInput();
}

/* ---------------------------------------------------------
   필드 설정(on/off) 렌더링
--------------------------------------------------------- */
function renderConfigToggles(){
  const cfg = getConfig(currentBrandId);
  const coreList = document.getElementById("coreToggleList");
  coreList.innerHTML = BRANDS[currentBrandId].enabledCore.map(id=>{
    const f = fieldById(id);
    return `<div class="toggle-row">
      <div class="label">${f.label}<span class="tag core">코어</span></div>
      <label class="switch"><input type="checkbox" checked disabled><span class="slider"></span></label>
    </div>`;
  }).join("");

  const optList = document.getElementById("optionalToggleList");
  optList.innerHTML = OPTIONAL_FIELDS.map(f=>{
    const checked = cfg.enabledOptional.includes(f.id) ? "checked" : "";
    return `<div class="toggle-row">
      <div class="label">${f.label}<span class="tag">확장</span></div>
      <label class="switch"><input type="checkbox" data-toggle="${f.id}" ${checked}><span class="slider"></span></label>
    </div>`;
  }).join("");

  optList.querySelectorAll("input[data-toggle]").forEach(el=>{
    el.addEventListener("change", ()=>{
      const cfg = getConfig(currentBrandId);
      const id = el.dataset.toggle;
      if(el.checked){ if(!cfg.enabledOptional.includes(id)) cfg.enabledOptional.push(id); }
      else { cfg.enabledOptional = cfg.enabledOptional.filter(x=>x!==id); }
      saveConfig(currentBrandId, cfg);
      renderOptionalFieldsInput(true); // b18: 설정 변경으로 다시 그릴 때는 이미 입력한 값을 유지
      showToast(el.checked ? "항목이 켜졌습니다" : "항목이 꺼졌습니다");
    });
  });
}

/* ---------------------------------------------------------
   리포트 생성 (데모용 규칙 기반 — 실서비스는 Claude API로 교체)
--------------------------------------------------------- */
function collectInputValues(){
  const values = {};
  document.querySelectorAll("#coreFieldsInput [data-field], #optionalFieldsInput [data-field]").forEach(el=>{
    values[el.dataset.field] = el.value;
  });
  return values;
}

// b18: 데모 문안에도 "근거 없는 해석 방지" 원칙을 적용합니다 —
// (1) 집중도·출석 같은 관찰 사실만으로 "개념을 잘 이해했다"는 식의 결론으로 비약하지 않고,
// (2) 정서 기록(diaryEmotion)은 아이의 내면 상태를 확정 진단하듯 쓰지 않고 "기록된 내용"으로만 전달하며,
// (3) 선생님이 실제로 입력하지 않은 구체적 지도 계획을 확정적으로 약속하지 않습니다.
function buildNarrative(studentName, values){
  const parts = [];
  parts.push(`${studentName} 학생은 이번 진단에서 `);
  if(values.unitScore) parts.push(`단원 점수 ${values.unitScore}점을 기록했습니다. `);
  if(values.wrongType) parts.push(`주요 오답 유형은 '${values.wrongType}'로 확인되며, 이 부분에 대한 추가 연습이 도움이 될 수 있습니다. `);
  if(values.attendance) parts.push(`출석 및 과제 이행률은 ${values.attendance}%로 확인됩니다. `);
  if(values.teacherNote) parts.push(`\n\n담당 선생님 코멘트: "${values.teacherNote}" `);
  if(values.studyTime) parts.push(`\n\n주간 학습 패턴은 ${values.studyTime} 수준으로 관찰됩니다. `);
  if(values.trend) parts.push(`최근 성적 추이는 '${values.trend}' 흐름을 보이고 있습니다. `);
  if(values.peerRank) parts.push(`또래 대비 상위 ${values.peerRank}% 수준입니다. `);
  if(values.focus) parts.push(`수업 집중도는 '${values.focus}'로 관찰되었습니다. `);
  if(values.consultNote) parts.push(`\n\n최근 상담 이력: ${values.consultNote} `);
  // 정서 기록은 "그렇게 느낀다/그런 상태다"로 단정하지 않고, 기록된 사실로만 전달합니다.
  if(values.diaryEmotion) parts.push(`\n\n최근 학습 일지에는 '${values.diaryEmotion}' 정서가 기록되어 있습니다 (아이의 말이나 표정 등 관찰에 근거한 기록이며, 원인에 대한 확정적 판단은 아닙니다). `);
  // 선생님이 실제로 입력하지 않은 구체적 지도 계획을 임의로 확정해 약속하지 않습니다.
  parts.push(`\n\n위 내용은 관찰된 사실과 선생님이 입력한 항목을 바탕으로 정리한 것입니다. 다음 수업의 구체적인 지도 방향은 담당 선생님과의 상담을 통해 확인해 주세요.`);
  return parts.join("");
}

function renderReport(studentName, values, dateStr, narrativeText, sourceTag){
  const b = BRANDS[currentBrandId];
  const scoreEntries = Object.entries(values).filter(([k,v])=>v && (k==="unitScore"||k==="attendance"||k==="peerRank"));
  const scoreGrid = scoreEntries.map(([k,v])=>{
    const f = fieldById(k);
    // b18: peerRank는 "상위 N%"로 입력받는 값이라 리포트 본문도 "상위 N%"라고 쓰는데,
    // 여기 점수 카드만 "N%ile"로 표시돼 의미가 어긋나 있었음(퍼센타일은 보통 하위 기준이라 반대 의미로 읽힘).
    // 본문과 동일하게 "상위 N%"로 통일.
    const valueText = k==="unitScore" ? `${escapeHtml(v)}점`
      : k==="peerRank" ? `상위 ${escapeHtml(v)}%`
      : `${escapeHtml(v)}%`;
    return `<div class="score-box"><div class="sb-label">${f.label}</div><div class="sb-value">${valueText}</div></div>`;
  }).join("");

  const badgeLabel = sourceTag === "api" ? "AI (Claude 실연동)" : "AI (데모 문안)";

  const html = `
    <div class="report-card">
      <div class="rc-brand">${b.name} · 학습 리포트</div>
      <div class="rc-name">${escapeHtml(studentName)} 학생</div>
      <div class="rc-date">${dateStr}</div>
      ${scoreEntries.length ? `<div class="score-grid">${scoreGrid}</div>` : ""}
    </div>
    <div class="narrative">
      <div class="narrative-label">AI 생성 리포트 <span class="ai-badge">${badgeLabel}</span></div>
      <div class="narrative-editable" id="reportNarrativeText" contenteditable="true">${narrativeText}</div>
    </div>
    <div class="hint">✏️ 클릭해서 내용을 직접 수정한 뒤 복사·공유할 수 있어요. 수정한 내용이 그대로 전달됩니다.</div>
    <button class="btn kakao" id="kakaoShareReportBtn" style="margin-top:8px;">카카오톡으로 공유하기</button>
    <button class="btn secondary" id="copyLinkBtn" style="margin-top:8px;">텍스트 복사</button>
  `;
  document.getElementById("reportContent").innerHTML = html;
  // b18: 클릭하는 시점에 화면(직접 수정했을 수도 있는 내용)을 다시 읽어서 그 내용을 공유/복사합니다 —
  // 렌더링 시점에 고정해둔 문자열을 쓰지 않도록 함수로 만듦.
  const buildReportPlainText = ()=>{
    const currentNarrative = document.getElementById("reportNarrativeText").innerText.trim();
    return `[${b.name} 학습 리포트]\n${studentName} 학생 · ${dateStr}\n\n${currentNarrative}`;
  };
  document.getElementById("kakaoShareReportBtn").addEventListener("click", ()=>{
    shareTextViaKakao(buildReportPlainText(), "학습 리포트 보기");
  });
  document.getElementById("copyLinkBtn").addEventListener("click", async ()=>{
    try{
      if(!navigator.clipboard) throw new Error("clipboard API 없음");
      await navigator.clipboard.writeText(buildReportPlainText());
      showToast("리포트 내용이 복사되었습니다");
    }catch(e){
      showToast("복사에 실패했어요 — 내용을 직접 선택해 복사해주세요");
    }
  });
}

/* ---------------------------------------------------------
   실제 Claude API(Netlify Function) 호출 — 배포 후에만 동작
   로컬 파일 실행이나 함수 미배포 상태에서는 자동으로 규칙 기반 문안으로 대체됩니다.
--------------------------------------------------------- */
// b18: "서버 함수에 아예 연결할 수 없는 경우"(로컬 파일 직접 열기, 함수 미배포 — 404)만 데모 문안으로
// 조용히 대체합니다. 함수가 응답은 했지만 실패한 경우(5xx, 빈 응답, 잘린 응답 등)는 데모로 숨기지 않고
// 에러를 던져서 화면에 실패 안내 + 재시도를 보여줍니다.
async function generateNarrative(studentName, values){
  const b = BRANDS[currentBrandId];
  let res;
  try{
    res = await fetch("/.netlify/functions/generate-report", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ studentName, brandName: b.name, values })
    });
  }catch(networkErr){
    // 함수 자체에 연결이 안 됨 (예: 로컬에서 index.html을 직접 열었을 때) → 데모로 대체
    return { text: formatNarrativeHtml(buildNarrative(studentName, values)), source: "demo" };
  }
  if(res.status === 404){
    // 함수가 아직 배포되지 않음 → 데모로 대체
    return { text: formatNarrativeHtml(buildNarrative(studentName, values)), source: "demo" };
  }
  let data = null;
  try{ data = await res.json(); }catch(parseErr){ data = null; }
  if(!res.ok || !data || !data.narrative){
    const serverMsg = data && data.error ? data.error : null;
    throw new Error(serverMsg || `서버에서 리포트를 만들지 못했어요 (상태 코드 ${res.status})`);
  }
  return { text: formatNarrativeHtml(data.narrative), source: "api" };
}

// 문단 사이 줄바꿈(\n\n 이상)은 <br><br>로, 문단 안 줄바꿈(\n 하나)은 <br> 하나로 —
// 전에는 \n 하나마다 무조건 <br><br>로 바꿔서 문단 사이 간격이 두 배로 벌어지는 버그가 있었음.
function formatNarrativeHtml(rawText){
  return escapeHtml(rawText).replace(/\n{2,}/g, "<br><br>").replace(/\n/g, "<br>");
}

/* ---------------------------------------------------------
   이력
--------------------------------------------------------- */
function renderHistory(){
  const list = getHistory(currentBrandId);
  const el = document.getElementById("historyList");
  if(!list.length){ el.innerHTML = `<div class="empty">저장된 리포트 이력이 없어요.</div>`; return; }
  el.innerHTML = list.map((item,idx)=>`
    <div class="history-item" data-idx="${idx}">
      <div class="hi-top"><span>${escapeHtml(item.studentName)}</span><span>${escapeHtml(item.date)}</span></div>
      <div class="hi-sub">${Object.keys(item.values).length}개 항목 기록됨</div>
    </div>
  `).join("");
  el.querySelectorAll(".history-item").forEach(elm=>{
    elm.addEventListener("click", ()=>{
      const item = list[elm.dataset.idx];
      const text = item.narrative ? item.narrative : formatNarrativeHtml(buildNarrative(item.studentName, item.values));
      renderReport(item.studentName, item.values, item.date, text, item.source);
      switchTab("report");
      showToast("이력에서 리포트를 불러왔습니다");
    });
  });
}

/* ---------------------------------------------------------
   탭 전환
--------------------------------------------------------- */
function switchTab(name){
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active", t.dataset.tab===name));
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active", p.id==="panel-"+name));
  if(name==="config") renderConfigToggles();
  if(name==="history") renderHistory();
}
document.querySelectorAll(".tab").forEach(t=>{
  t.addEventListener("click", ()=>switchTab(t.dataset.tab));
});

/* ---------------------------------------------------------
   브랜드명 클릭 → 홈으로 (토스 방식: 상단 브랜드 영역이 홈 버튼 역할)
   브랜드가 하나뿐인 데모에서는 드롭다운 스위처 없이, 브랜드명을 누르면
   그냥 처음 화면(① 학습 리포트 모드 · 진단 입력 1단계)으로 돌아갑니다.
--------------------------------------------------------- */
document.getElementById("homeBtn").addEventListener("click", ()=>{
  selectMode("report");
  switchTab("input");
  goToStep(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ---------------------------------------------------------
   위저드 (4단계: 학생정보 → 코어항목 → 확장항목 → 확인/생성)
--------------------------------------------------------- */
const WIZARD_LABELS = { 1:"학생 정보", 2:"핵심 진단 항목", 3:"확장 진단 항목", 4:"입력 내용 확인" };
let wizardStep = 1;

function renderReviewSummary(){
  const studentName = document.getElementById("studentName").value.trim();
  const values = collectInputValues();
  const rows = [`<div class="review-row"><span class="rr-label">학생 이름</span><span class="rr-value">${escapeHtml(studentName || "-")}</span></div>`];
  Object.entries(values).forEach(([k,v])=>{
    if(!v) return;
    const f = fieldById(k);
    rows.push(`<div class="review-row"><span class="rr-label">${escapeHtml(f ? f.label : k)}</span><span class="rr-value">${escapeHtml(v)}</span></div>`);
  });
  document.getElementById("reviewSummary").innerHTML = rows.join("");
}

function goToStep(step){
  const direction = step > wizardStep ? "fwd" : step < wizardStep ? "back" : null;
  wizardStep = step;
  document.querySelectorAll(".wizard-step").forEach(el=>{
    const isActive = Number(el.dataset.step) === step;
    el.classList.toggle("active", isActive);
    el.classList.remove("enter-fwd", "enter-back");
    if(isActive && direction){
      // 강제 리플로우 후 클래스 추가 — 같은 클래스 재적용 시 애니메이션이 재생되도록
      void el.offsetWidth;
      el.classList.add(direction === "fwd" ? "enter-fwd" : "enter-back");
    }
  });
  document.getElementById("stepDots").innerHTML = [1,2,3,4].map(n=>{
    let cls = "step-dot";
    if(n < step) cls += " done";
    else if(n === step) cls += " active";
    return `<div class="${cls}"></div>`;
  }).join("");
  document.getElementById("wizardLabel").textContent = `${step} / 4 · ${WIZARD_LABELS[step]}`;
  document.getElementById("wizardBackBtn").style.display = step === 1 ? "none" : "";
  document.getElementById("wizardNextBtn").style.display = step === 4 ? "none" : "block";
  document.getElementById("generateBtn").style.display = step === 4 ? "block" : "none";
  if(step === 4) renderReviewSummary();
}

document.getElementById("wizardNextBtn").addEventListener("click", ()=>{
  if(wizardStep === 1){
    const studentName = document.getElementById("studentName").value.trim();
    if(!studentName){ showToast("학생 이름을 입력해주세요"); return; }
  }
  goToStep(Math.min(wizardStep+1, 4));
});
document.getElementById("wizardBackBtn").addEventListener("click", ()=>{
  goToStep(Math.max(wizardStep-1, 1));
});

/* ---------------------------------------------------------
   리포트 생성 버튼
--------------------------------------------------------- */
document.getElementById("generateBtn").addEventListener("click", async ()=>{
  const studentName = document.getElementById("studentName").value.trim();
  if(!studentName){ showToast("학생 이름을 입력해주세요"); return; }
  const values = collectInputValues();
  if(!Object.values(values).some(v=>String(v).trim())){
    showToast("평가 항목을 하나 이상 입력해주세요");
    return;
  }
  const dateStr = new Date().toLocaleDateString("ko-KR", { year:"numeric", month:"long", day:"numeric" });

  const btn = document.getElementById("generateBtn");
  const errBox = document.getElementById("reportGenError");
  errBox.style.display = "none"; errBox.textContent = "";
  btn.disabled = true; btn.textContent = "AI가 리포트를 작성하고 있어요...";
  showToast("리포트 생성 중...");

  let text, source;
  try{
    ({ text, source } = await generateNarrative(studentName, values));
  }catch(e){
    btn.disabled = false; btn.textContent = "AI 리포트 생성하기";
    errBox.textContent = `⚠️ 리포트를 생성하지 못했어요: ${e.message} — 다시 시도해주세요.`;
    errBox.style.display = "block";
    showToast("리포트 생성에 실패했어요");
    return;
  }

  btn.disabled = false; btn.textContent = "AI 리포트 생성하기";
  renderReport(studentName, values, dateStr, text, source);
  saveHistoryItem(currentBrandId, { studentName, values, date: dateStr, narrative: text, source });
  switchTab("report");
  showToast(source === "api" ? "Claude API로 리포트가 생성되었습니다" : "리포트가 생성되었습니다 (데모 문안 — 배포 시 Claude API로 자동 전환)");

  // 다음 학생 입력을 위해 위저드를 처음으로 리셋
  document.getElementById("studentName").value = "";
  document.getElementById("parentContact").value = "";
  renderAllInputFields();
  goToStep(1);
});

/* ---------------------------------------------------------
   전화번호 자동 하이픈
--------------------------------------------------------- */
function formatPhoneNumber(value){
  const digits = value.replace(/[^0-9]/g, "").slice(0, 11);
  if(digits.length < 4) return digits;
  if(digits.length < 7) return `${digits.slice(0,3)}-${digits.slice(3)}`;
  if(digits.length < 11) return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
  return `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7,11)}`;
}
document.getElementById("parentContact").addEventListener("input", (e)=>{
  e.target.value = formatPhoneNumber(e.target.value);
});

/* ---------------------------------------------------------
   토스트
--------------------------------------------------------- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove("show"), 1800);
}

/* ---------------------------------------------------------
   진단 입력 전 "필드 설정 먼저 확인" 안내
--------------------------------------------------------- */
function noticeKey(){ return "demo_hideSetupNotice_"+currentBrandId; }
function renderSetupNotice(){
  const notice = document.getElementById("setupNotice");
  notice.style.display = safeGetItem(noticeKey()) === "1" ? "none" : "block";
}
document.getElementById("goToConfigBtn").addEventListener("click", ()=>{
  switchTab("config");
});
document.getElementById("dismissNoticeBtn").addEventListener("click", ()=>{
  safeSetItem(noticeKey(), "1");
  renderSetupNotice();
  showToast("다음부터는 안내가 표시되지 않아요");
});

/* ---------------------------------------------------------
   학습 리포트 / 부모님 피드백 — 두 가지 독립된 도구
--------------------------------------------------------- */
function selectMode(mode){
  const feedback = mode === "feedback";
  document.body.classList.toggle("mode-feedback", feedback);
  document.getElementById("reportModeBtn").classList.toggle("active", !feedback);
  document.getElementById("feedbackModeBtn").classList.toggle("active", feedback);
}
document.getElementById("reportModeBtn").addEventListener("click", ()=>selectMode("report"));
document.getElementById("feedbackModeBtn").addEventListener("click", ()=>selectMode("feedback"));

const feedbackIds = ["feedbackStudent","feedbackSession","feedbackStart","feedbackAction","feedbackLearningPoint","feedbackQuote","feedbackInterpretation","feedbackNext","feedbackHome"];
function feedbackValue(id){ return document.getElementById(id).value.trim(); }
let feedbackDraft = "";

document.getElementById("feedbackExampleBtn").addEventListener("click", ()=>{
  const example = {
    feedbackStudent:"학생 A (가명)",
    feedbackSession:"7회차 · 소수의 덧셈과 뺄셈",
    feedbackStart:"처음에는 아직 배우지 않았다며 뺄셈 문제를 피하려 했습니다.",
    feedbackAction:"소수점 위치를 맞추는 방법을 설명한 뒤, 소수의 뺄셈 문제를 스스로 해결했습니다.",
    feedbackLearningPoint:"이번 단원(소수의 덧셈과 뺄셈) 오답률 20% → 10%로 개선",
    feedbackQuote:"발표하는 건 부끄러워요.",
    feedbackInterpretation:"정답을 말하는 상황을 부담스러워할 가능성이 있습니다. 다음 시간에도 관찰이 필요합니다.",
    feedbackNext:"스스로 고른 쉬운 문제부터 풀고, 답을 말할지는 학생이 선택하게 합니다.",
    feedbackHome:"정답 여부와 함께 스스로 시도한 과정을 구체적으로 칭찬해 주세요."
  };
  feedbackIds.forEach(id=>{ document.getElementById(id).value = example[id]; });
  document.getElementById("feedbackResult").classList.remove("visible");
  showToast("가상 사례를 불러왔습니다");
});

// 규칙 기반 문단 조립 (데모/오프라인 대체용) — 선생님의 해석·가설(feedbackInterpretation)은
// 여기서도 절대 사용하지 않습니다. 관찰과 해석을 분리하는 원칙은 코드 단에서 지킵니다.
function buildFeedbackDraftLocal(student, session, start, action, learningPoint, quote, next, home){
  const paragraphs = [
    `안녕하세요. ${BRANDS[currentBrandId].name}입니다.${session ? ` 이번 ${session} 수업에서 ${student}의 모습을 전해드립니다.` : ` ${student}의 이번 수업 모습을 전해드립니다.`}`,
    [start ? `수업을 시작할 때는 ${start}` : "", `수업 중에는 ${action}`, quote ? `${student}는 “${quote.replace(/[“”]/g, "")}”라고 말하기도 했습니다.` : ""].filter(Boolean).join(" "),
    learningPoint ? `최근 학습 현황으로는 ${learningPoint}.` : "",
    next ? `다음 시간에는 ${next}` : "",
    home ? `가정에서는 ${home}` : "",
    "다음 수업에서도 직접 시도한 과정과 변화를 살펴보고 전해드리겠습니다."
  ].filter(Boolean);
  return paragraphs.join("\n\n");
}

// b18: generateNarrative와 동일한 원칙 — 함수 미배포/연결 불가(404, 네트워크 오류)일 때만 데모로 조용히
// 대체하고, 함수가 응답했지만 실패한 경우는 에러를 던져 화면에 실패 안내를 보여줍니다.
async function generateFeedbackDraft(student, session, start, action, learningPoint, quote, next, home){
  let res;
  try{
    res = await fetch("/.netlify/functions/generate-feedback", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ brandName: BRANDS[currentBrandId].name, student, session, start, action, learningPoint, quote, next, home })
    });
  }catch(networkErr){
    return { text: buildFeedbackDraftLocal(student, session, start, action, learningPoint, quote, next, home), source: "demo" };
  }
  if(res.status === 404){
    return { text: buildFeedbackDraftLocal(student, session, start, action, learningPoint, quote, next, home), source: "demo" };
  }
  let data = null;
  try{ data = await res.json(); }catch(parseErr){ data = null; }
  if(!res.ok || !data || !data.feedback){
    const serverMsg = data && data.error ? data.error : null;
    throw new Error(serverMsg || `서버에서 초안을 만들지 못했어요 (상태 코드 ${res.status})`);
  }
  return { text: data.feedback, source: "api" };
}

// b18: 학생별 결과 혼합 방지 — 초안을 생성한 "그 순간"의 입력값 스냅샷을 저장해두고,
// 이후 입력 필드가 하나라도 바뀌면(이름을 포함해) 합치기/복사/공유를 막습니다.
// 다시 생성해야만 스냅샷이 갱신되어 버튼이 풀립니다 — 다른 학생의 결과가 섞이는 걸 막기 위함입니다.
function currentFeedbackInputs(){
  const inputs = {};
  feedbackIds.forEach(id=>{ inputs[id] = feedbackValue(id); });
  return inputs;
}
function feedbackInputsEqual(a, b){
  if(!a || !b) return false;
  return feedbackIds.every(id => a[id] === b[id]);
}
function isFeedbackDraftStale(){
  return !!feedbackDraftMeta && !feedbackInputsEqual(feedbackDraftMeta.inputs, currentFeedbackInputs());
}
function updateFeedbackStaleUI(){
  const stale = isFeedbackDraftStale();
  const hasDraft = !!feedbackDraft;
  const warning = document.getElementById("feedbackStaleWarning");
  const mergeBtn = document.getElementById("feedbackMergeBtn");
  const kakaoBtn = document.getElementById("kakaoShareFeedbackBtn");
  const copyBtn = document.getElementById("feedbackCopyBtn");
  warning.style.display = (hasDraft && stale) ? "block" : "none";
  const shouldBlock = !hasDraft || stale;
  [mergeBtn, kakaoBtn, copyBtn].forEach(b=>{ b.disabled = shouldBlock; });
}
feedbackIds.forEach(id=>{
  document.getElementById(id).addEventListener("input", updateFeedbackStaleUI);
});

document.getElementById("feedbackGenerateBtn").addEventListener("click", async ()=>{
  const student = feedbackValue("feedbackStudent");
  const action = feedbackValue("feedbackAction");
  if(!student || !action){
    showToast("학생 표시 이름과 확인된 행동·성과를 입력해주세요");
    return;
  }
  const session = feedbackValue("feedbackSession");
  const start = feedbackValue("feedbackStart");
  const learningPoint = feedbackValue("feedbackLearningPoint");
  const quote = feedbackValue("feedbackQuote");
  const next = feedbackValue("feedbackNext");
  const home = feedbackValue("feedbackHome");

  const btn = document.getElementById("feedbackGenerateBtn");
  const errBox = document.getElementById("feedbackGenError");
  errBox.style.display = "none"; errBox.textContent = "";
  btn.disabled = true; btn.textContent = "AI가 초안을 작성하고 있어요...";
  showToast("초안 생성 중...");

  let text, source;
  try{
    ({ text, source } = await generateFeedbackDraft(student, session, start, action, learningPoint, quote, next, home));
  }catch(e){
    btn.disabled = false; btn.textContent = "학부모용 초안 만들기";
    errBox.textContent = `⚠️ 초안을 생성하지 못했어요: ${e.message} — 다시 시도해주세요.`;
    errBox.style.display = "block";
    showToast("초안 생성에 실패했어요");
    return;
  }

  btn.disabled = false; btn.textContent = "학부모용 초안 만들기";
  feedbackDraft = text;
  // 생성 당시의 입력값을 스냅샷으로 묶어 저장 — 이후 입력이 바뀌면 이 스냅샷과 비교해 감지합니다.
  feedbackDraftMeta = { inputs: currentFeedbackInputs(), generatedAt: Date.now() };
  feedbackMerged = false;
  mergedNarrativePlain = "";
  document.getElementById("mergeSection").style.display = "none";
  document.getElementById("feedbackMergeBtn").textContent = "최근 리포트와 합쳐서 보내기";
  document.getElementById("feedbackText").textContent = feedbackDraft;
  document.getElementById("feedbackBadge").textContent = source === "api" ? "AI (Claude 실연동)" : "AI (데모 문안)";
  const result = document.getElementById("feedbackResult");
  result.classList.add("visible");
  result.scrollIntoView({behavior:"smooth", block:"start"});
  updateFeedbackStaleUI();
  showToast(source === "api" ? "Claude API로 초안이 만들어졌습니다" : "피드백 초안이 만들어졌습니다 (데모 문안 — 배포 시 Claude API로 자동 전환)");
});

// HTML로 저장된 리포트 문안(escapeHtml + <br>)을 카톡에 붙여넣을 평문으로 되돌립니다.
function htmlNarrativeToPlainText(html){
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

let feedbackMerged = false;
let feedbackDraftMeta = null; // b18: { inputs, generatedAt } — 생성 시점 입력값 스냅샷
let mergedNarrativePlain = ""; // 합친 리포트의 원문(평문) — 화면 표시용, 실제 복사/공유는 contenteditable의 최신 내용을 읽음

// b18: 화면(직접 수정했을 수도 있는 내용)을 클릭 시점에 다시 읽어 사용 — 렌더 시점 문자열에 고정하지 않음
function currentFeedbackDraftText(){ return document.getElementById("feedbackText").innerText.trim(); }
function currentMergedReportText(){ return document.getElementById("mergedReportText").innerText.trim(); }
function buildFeedbackShareText(){
  const draftText = currentFeedbackDraftText();
  if(!feedbackMerged) return draftText;
  const date = document.getElementById("mergeReportDate").textContent;
  return `${draftText}\n\n— — —\n[최근 학습 리포트 · ${date}]\n${currentMergedReportText()}`;
}

document.getElementById("feedbackMergeBtn").addEventListener("click", ()=>{
  if(!feedbackDraft){ showToast("먼저 학부모용 초안을 만들어주세요"); return; }
  if(isFeedbackDraftStale()){
    showToast("입력 내용이 바뀌었어요 — 다시 생성한 뒤 합쳐주세요");
    updateFeedbackStaleUI();
    return;
  }
  const studentName = feedbackValue("feedbackStudent");
  if(!studentName){ showToast("학생 표시 이름을 먼저 입력해주세요"); return; }
  const history = getHistory(currentBrandId);
  // 피드백에 적은 학생 표시 이름과 정확히 일치하는 이력을 모두 찾습니다 (이력은 최신순 정렬).
  // b18: 동명이인 문제 — 이름만으로 매칭하므로, 일치하는 이력이 여러 건이면 가장 최근 것을 쓰되
  // 반드시 어떤 날짜의 기록을 합쳤는지 화면에 표시하고, 다른 학생일 수 있다는 점을 안내합니다.
  const matches = history.filter(item => item.studentName.trim() === studentName);
  if(!matches.length){
    showToast(`"${studentName}" 이름으로 저장된 학습 리포트를 찾지 못했어요`);
    return;
  }
  const match = matches[0];
  const plainNarrative = htmlNarrativeToPlainText(match.narrative || "");
  mergedNarrativePlain = plainNarrative;
  feedbackMerged = true;

  document.getElementById("mergeReportDate").textContent = match.date;
  document.getElementById("mergedReportText").textContent = plainNarrative;
  document.getElementById("mergeSection").style.display = "block";
  document.getElementById("feedbackMergeBtn").textContent = "합쳐짐 ✓ (다시 누르면 갱신)";
  if(matches.length > 1){
    showToast(`"${studentName}" 이름의 리포트가 ${matches.length}건 있어 가장 최근(${match.date}) 것을 합쳤어요 — 동명이인이면 확인해주세요`);
  }else{
    showToast(`최근 리포트(${match.date})를 합쳤습니다 — 초안 복사 시 함께 복사됩니다`);
  }
});

document.getElementById("feedbackCopyBtn").addEventListener("click", async ()=>{
  if(isFeedbackDraftStale()){ showToast("입력 내용이 바뀌었어요 — 다시 생성한 뒤 복사해주세요"); updateFeedbackStaleUI(); return; }
  const textToCopy = buildFeedbackShareText();
  if(!textToCopy) return;
  try{
    if(!navigator.clipboard) throw new Error("clipboard API 없음");
    await navigator.clipboard.writeText(textToCopy);
    showToast(feedbackMerged ? "리포트가 합쳐진 초안을 복사했습니다" : "초안을 복사했습니다");
  }catch(e){ showToast("복사에 실패했어요 — 내용을 직접 선택해 복사해주세요"); }
});

document.getElementById("kakaoShareFeedbackBtn").addEventListener("click", ()=>{
  if(isFeedbackDraftStale()){ showToast("입력 내용이 바뀌었어요 — 다시 생성한 뒤 공유해주세요"); updateFeedbackStaleUI(); return; }
  const textToShare = buildFeedbackShareText();
  if(!textToShare){ showToast("먼저 학부모용 초안을 만들어주세요"); return; }
  shareTextViaKakao(textToShare, "피드백 자세히 보기");
});

/* ---------------------------------------------------------
   초기화
--------------------------------------------------------- */
applyTheme(currentBrandId);
renderAllInputFields();
renderHistory();
renderSetupNotice();
updateFeedbackStaleUI();
goToStep(1);
</script>
</body>
</html>
