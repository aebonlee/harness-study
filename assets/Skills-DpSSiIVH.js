import{u as m,r as x,j as e}from"./index-DqqS9gW9.js";import{S as j}from"./SEOHead-B1uL5G2f.js";import{T as r}from"./TipBox-DHD9YOBP.js";import{G as u}from"./GuideSidebar3-B-SkHvm1.js";const n=[{id:"concept",ko:"스킬이란?",en:"What are Skills?"},{id:"disclosure",ko:"프로그레시브 디스클로저",en:"Progressive Disclosure"},{id:"structure",ko:"스킬 파일 구조",en:"Skill File Structure"},{id:"triggers",ko:"트리거 설계",en:"Trigger Design"},{id:"optimize",ko:"스킬 최적화",en:"Skill Optimization"},{id:"test",ko:"스킬 테스트",en:"Skill Testing"}],g=[{label:"스킬 기초",labelEn:"Skill Basics",items:[{id:"concept",icon:"fa-code",ko:"스킬이란?",en:"What are Skills?"},{id:"disclosure",icon:"fa-layer-group",ko:"프로그레시브 디스클로저",en:"Progressive Disclosure"}]},{label:"스킬 설계",labelEn:"Skill Design",items:[{id:"structure",icon:"fa-folder-tree",ko:"스킬 파일 구조",en:"Skill File Structure",subs:[{id:"sub-struct-method",ko:"설계 방법",en:"Design Method"},{id:"sub-struct-ex",ko:"실습 작성",en:"Practice Writing"}]},{id:"triggers",icon:"fa-bolt",ko:"트리거 설계",en:"Trigger Design",subs:[{id:"sub-trigger-method",ko:"설계 방법",en:"Design Method"},{id:"sub-trigger-ex",ko:"실습 작성",en:"Practice Writing"}]}]},{label:"최적화 & 테스트",labelEn:"Optimize & Test",items:[{id:"optimize",icon:"fa-gauge-high",ko:"스킬 최적화",en:"Skill Optimization"},{id:"test",icon:"fa-vial",ko:"스킬 테스트",en:"Skill Testing"}]}];function P(){const{language:s}=m(),[c,o]=x.useState("concept"),i=s==="ko",l=n.findIndex(a=>a.id===c),d=a=>{o(a),window.scrollTo({top:0,behavior:"smooth"})},h=a=>{setTimeout(()=>{const t=document.getElementById(a);t&&t.scrollIntoView({behavior:"smooth",block:"start"})},50)};return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:i?"스킬 설계 | Harness Master":"Skill Design | Harness Master",path:"/skills"}),e.jsx("div",{className:"guide-page",children:e.jsxs("div",{className:"guide-layout",children:[e.jsx(u,{groups:g,activeSection:c,onNavigate:d,onSubNavigate:h,isKo:i}),e.jsxs("main",{className:"guide-content",children:[c==="concept"&&e.jsx(p,{isKo:i}),c==="disclosure"&&e.jsx(v,{isKo:i}),c==="structure"&&e.jsx(k,{isKo:i}),c==="triggers"&&e.jsx(f,{isKo:i}),c==="optimize"&&e.jsx(b,{isKo:i}),c==="test"&&e.jsx(N,{isKo:i}),e.jsxs("div",{className:"guide-section-nav",children:[e.jsxs("button",{className:"guide-nav-btn prev",onClick:()=>d(n[l-1].id),disabled:l===0,children:[e.jsx("i",{className:"fa-solid fa-arrow-left"}),e.jsxs("span",{children:[e.jsx("small",{children:i?"이전":"Prev"}),e.jsx("strong",{children:l>0?i?n[l-1].ko:n[l-1].en:""})]})]}),e.jsxs("button",{className:"guide-nav-btn next",onClick:()=>d(n[l+1].id),disabled:l===n.length-1,children:[e.jsxs("span",{children:[e.jsx("small",{children:i?"다음":"Next"}),e.jsx("strong",{children:l<n.length-1?i?n[l+1].ko:n[l+1].en:""})]}),e.jsx("i",{className:"fa-solid fa-arrow-right"})]})]})]})]})})]})}function p({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"스킬이란?":"What are Skills?"}),e.jsx("p",{children:s?"Harness 스킬의 개념과 에이전트 효율화에서의 역할을 이해합니다.":"Understand the concept of Harness skills and their role in agent efficiency."})]}),e.jsx("h2",{children:s?"스킬의 정의":"Definition of Skills"}),e.jsx("p",{children:s?"스킬(Skill)은 에이전트가 특정 작업을 수행하기 위한 상세한 지침과 컨텍스트를 담은 파일입니다. 요리 레시피에 비유할 수 있습니다. 레시피가 요리사에게 단계별 지침을 제공하듯, 스킬은 에이전트에게 작업 수행 방법을 알려줍니다.":"A Skill is a file containing detailed instructions and context for an agent to perform a specific task. It can be compared to a cooking recipe. Just as a recipe provides step-by-step instructions to a chef, a skill tells an agent how to perform a task."}),e.jsx("h3",{children:s?"스킬의 핵심 가치":"Core Value of Skills"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📦"}),e.jsx("h4",{children:s?"지식 캡슐화":"Knowledge Encapsulation"}),e.jsx("p",{children:s?"전문 지식을 재사용 가능한 형태로 패키징합니다.":"Packages expertise into reusable form."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"💾"}),e.jsx("h4",{children:s?"컨텍스트 절약":"Context Conservation"}),e.jsx("p",{children:s?"필요할 때만 로드되는 프로그레시브 디스클로저로 컨텍스트 창을 효율적으로 사용합니다.":"Progressive disclosure loads only when needed."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔒"}),e.jsx("h4",{children:s?"일관성 보장":"Consistency Guarantee"}),e.jsx("p",{children:s?"동일한 스킬을 사용하면 일관된 방식으로 작업이 수행됩니다.":"Same skill ensures tasks are performed consistently."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"👥"}),e.jsx("h4",{children:s?"팀 공유 가능":"Team Shareable"}),e.jsx("p",{children:s?"잘 설계된 스킬은 팀 전체에서 공유하고 재사용할 수 있습니다.":"Well-designed skills can be shared across the entire team."})]})]}),e.jsx("h3",{children:s?"스킬 파일 최소 예시 (hello-world)":"Minimal Skill File Example (hello-world)"}),e.jsx("p",{children:s?"가장 단순한 형태의 스킬 파일입니다. 5줄로도 완전한 스킬을 만들 수 있습니다. 이 구조를 출발점으로 필요에 따라 확장하세요.":"The simplest form of a skill file. Even 5 lines can create a complete skill. Use this structure as your starting point and expand as needed."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/commands/hello-world.md"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# hello-world

## 트리거
"hello", "안녕", "hi" 입력 시

## 목적
인사말에 친절하고 일관되게 답변하는 가장 간단한 스킬 예시

## 단계
1. 입력 언어 감지 (한국어 / 영어 / 기타)
2. 언어에 맞는 인사말 반환

## 출력
한국어: "안녕하세요! 무엇을 도와드릴까요?"
영어:   "Hello! How can I help you today?"`})})})]}),e.jsx("h3",{children:s?"스킬 관리 방식 비교":"Skill Management Comparison"}),e.jsx("div",{className:"comparison-table-wrapper",children:e.jsxs("table",{className:"comparison-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:s?"구분":"Aspect"}),e.jsx("th",{children:s?"인라인 프롬프트":"Inline Prompt"}),e.jsx("th",{children:s?"스킬 파일":"Skill File"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:s?"재사용성":"Reusability"}),e.jsx("td",{children:s?"매번 다시 작성":"Rewrite every time"}),e.jsx("td",{children:s?"한 번 작성, 반복 사용":"Write once, reuse"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"일관성":"Consistency"}),e.jsx("td",{children:s?"작성자마다 다름":"Varies by author"}),e.jsx("td",{children:s?"항상 동일한 동작":"Always consistent"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"컨텍스트":"Context"}),e.jsx("td",{children:s?"매번 전체 로드":"Full load every time"}),e.jsx("td",{children:s?"프로그레시브 디스클로저":"Progressive disclosure"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"버전 관리":"Version Control"}),e.jsx("td",{children:s?"추적 불가":"Not trackable"}),e.jsx("td",{children:s?"Git으로 이력 관리":"Git-managed history"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"팀 공유":"Team Sharing"}),e.jsx("td",{children:s?"개인 지식에 의존":"Individual knowledge"}),e.jsx("td",{children:s?"리포지토리로 공유":"Share via repository"})]})]})]})}),e.jsx(r,{type:"important",children:s?'스킬은 에이전트의 "장기 기억" 역할을 합니다. 에이전트의 컨텍스트 창이 제한적이라도, 스킬 파일을 통해 방대한 전문 지식에 접근할 수 있습니다.':'Skills serve as the "long-term memory" of agents. Even with limited context windows, agents can access vast expertise through skill files.'})]})}function v({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"프로그레시브 디스클로저":"Progressive Disclosure"}),e.jsx("p",{children:s?"컨텍스트 창을 효율적으로 사용하는 핵심 스킬 설계 기법을 마스터합니다.":"Master the key skill design technique for efficiently using the context window."})]}),e.jsx("h2",{children:s?"프로그레시브 디스클로저란?":"What is Progressive Disclosure?"}),e.jsx("p",{children:s?"프로그레시브 디스클로저(Progressive Disclosure)는 모든 정보를 한 번에 제공하는 대신, 필요한 시점에 필요한 정보만 단계적으로 공개하는 설계 원칙입니다. 이를 통해 에이전트의 컨텍스트 창을 낭비 없이 사용할 수 있습니다.":"Progressive Disclosure is a design principle that provides only the necessary information at the right time, rather than providing all information at once. This allows efficient use of the agent's context window without waste."}),e.jsx("h3",{children:s?"3단계 디스클로저 구조":"3-Level Disclosure Structure"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:s?"레벨 1: 요약 (Summary)":"Level 1: Summary"}),e.jsx("p",{children:s?"스킬의 핵심 목적과 트리거만 포함. 항상 로드됩니다 (1-3줄). 에이전트가 이 스킬이 필요한지 판단하는 데 사용합니다.":"Contains only the skill's core purpose and trigger. Always loaded (1-3 lines). Used by the agent to determine if this skill is needed."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:s?"레벨 2: 개요 (Overview)":"Level 2: Overview"}),e.jsx("p",{children:s?"스킬 활성화 시 로드. 주요 단계와 중요 지침 포함 (10-30줄). 대부분의 작업에 충분한 정보를 제공합니다.":"Loaded when the skill is activated. Contains major steps and important guidelines (10-30 lines). Provides sufficient information for most tasks."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:s?"레벨 3: 상세 (Details)":"Level 3: Details"}),e.jsx("p",{children:s?"복잡한 케이스나 특수 상황에서만 로드. 예외 처리, 엣지 케이스, 상세 예시 포함. 필요할 때만 가져옵니다.":"Only loaded for complex cases or special situations. Includes exception handling, edge cases, and detailed examples. Only fetched when needed."})]})]}),e.jsx("h3",{children:s?"3단계 디스클로저 구체 예시 — code-review 스킬":"3-Level Disclosure Concrete Example — code-review skill"}),e.jsx("p",{children:s?"동일한 code-review 스킬을 3단계로 나누면 어떻게 되는지 비교합니다. 각 레벨에서 로드되는 토큰 양과 내용을 확인하세요.":"See how the same code-review skill is divided into 3 levels. Check the token count and content loaded at each level."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"Level 1 — 요약 (항상 로드, ~3줄, ~20토큰)":"Level 1 — Summary (always loaded, ~3 lines, ~20 tokens)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# code-review
## 트리거
PR 리뷰, 코드 검토, /review 명령어 실행 시`})})})]}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"Level 2 — 개요 (스킬 활성화 시 로드, ~20줄, ~150토큰)":"Level 2 — Overview (loaded on activation, ~20 lines, ~150 tokens)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`## 목적
코드 품질·보안·성능을 검토하고 JSON으로 결과 반환

## 단계
1. 보안 취약점 스캔 (OWASP Top 10 기준)
2. 성능 이슈 검토 (N+1, 메모리 누수)
3. 코드 컨벤션 확인

## 출력 형식
{ "score": 0-100, "issues": [], "pass": boolean }`})})})]}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"Level 3 — 상세 (복잡한 케이스 시만 로드, ~60줄, ~500토큰)":"Level 3 — Details (only for complex cases, ~60 lines, ~500 tokens)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`## 심각도 판단 기준
- high:   즉시 수정 (보안, 데이터 손실 가능)
- medium: 다음 PR 권장 (성능, 유지보수)
- low:    선택 개선 (스타일, 가독성)

## 보안 체크리스트
- SQL Injection: parameterized query 사용 여부
- XSS: dangerouslySetInnerHTML 사용 여부
- 인증/인가: JWT 만료 설정, 권한 검증 여부
- 환경변수: .env 파일의 민감 정보 노출 여부

## 성능 체크리스트
- N+1 쿼리: 반복문 내 DB 호출 여부
- 불필요한 리렌더링: useCallback/useMemo 활용
- 메모리 누수: cleanup 함수, removeEventListener 여부`})})})]}),e.jsx(r,{type:"tip",children:s?'레벨 1 요약은 단 한 줄로도 충분합니다. "코드 리뷰 시 사용: 보안, 성능, 가독성을 평가합니다"처럼 명확하게 작성하세요. 에이전트가 빠르게 관련성을 판단할 수 있습니다.':'Level 1 summary can be just one line. Write clearly like "Use for code review: evaluates security, performance, readability." The agent can quickly determine relevance.'})]})}function k({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"스킬 파일 구조":"Skill File Structure"}),e.jsx("p",{children:s?"효과적인 스킬 파일을 작성하기 위한 표준 구조와 모범 사례를 알아봅니다.":"Learn the standard structure and best practices for writing effective skill files."})]}),e.jsx("h2",{id:"sub-struct-method",children:s?"표준 스킬 파일 구조":"Standard Skill File Structure"}),e.jsx("p",{children:s?"스킬 파일은 6개 섹션으로 구성됩니다. 각 섹션의 역할을 이해하고 일관된 구조로 작성하세요.":"Skill files consist of 6 sections. Understand each section's role and write with a consistent structure."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/commands/[skill-name].md"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# [스킬 이름]
## 트리거 (Trigger)
[언제 이 스킬을 사용하는지 - 1줄]

## 목적 (Purpose)
[이 스킬이 달성하는 것 - 2-3줄]

## 핵심 지침 (Core Guidelines)
1. [가장 중요한 지침]
2. [두 번째로 중요한 지침]
3. [세 번째로 중요한 지침]

## 단계 (Steps)
1. [첫 번째 단계]
2. [두 번째 단계]
...

## 산출물 (Output)
[예상 산출물 형식 및 기준]

## 상세 참고 (Details - 필요시만 로드)
[엣지 케이스, 예외 처리, 예시]`})})})]}),e.jsx("h3",{id:"sub-struct-ex",children:s?"실습 예제 — 코드 리뷰 스킬 파일":"Practice Example — Code Review Skill File"}),e.jsx("p",{children:s?"아래는 실제 사용 가능한 코드 리뷰 스킬 파일 전체입니다. 위의 템플릿에 실제 내용을 채운 예시로 참고하세요.":"Below is a complete, usable code review skill file. Use it as a reference for filling in the template above with actual content."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/commands/code-review.md"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# code-review

## 트리거 (Trigger)
코드 리뷰, PR 검토, 품질 점검 요청 시 사용

## 목적 (Purpose)
변경된 코드의 보안·성능·가독성을 체계적으로 검토하여
구체적인 개선 제안을 JSON 형식으로 반환합니다.

## 핵심 지침 (Core Guidelines)
1. OWASP Top 10 기준으로 보안 취약점을 반드시 확인할 것
2. 피드백은 "문제 + 근거 + 개선 방법" 3요소를 포함할 것
3. 칭찬과 개선점을 균형 있게 제시할 것

## 단계 (Steps)
1. 변경된 파일 목록을 파악하고 중요도 순으로 정렬
2. 각 파일에서 보안 취약점 스캔 (SQL Injection, XSS, 인증 등)
3. 성능 이슈 검토 (N+1 쿼리, 불필요한 렌더링, 메모리 누수)
4. 코드 컨벤션 및 가독성 평가
5. 종합 점수 및 개선 제안 목록 작성

## 산출물 (Output)
{
  "score": 0-100,
  "summary": "한 줄 요약",
  "issues": [{"severity": "high|medium|low", "file": "", "line": 0, "message": ""}],
  "suggestions": ["개선 제안 1", "개선 제안 2"]
}

## 상세 참고 (Details - 필요시만 로드)
### 심각도 기준
- high: 즉시 수정 필요 (보안, 크래시 유발)
- medium: 다음 PR에서 수정 권장
- low: 선택적 개선`})})})]}),e.jsx(r,{type:"important",children:s?"스킬 파일은 마크다운 형식을 사용합니다. 명확한 헤딩 구조가 에이전트의 파싱을 돕고, 필요한 섹션만 선택적으로 로드할 수 있게 합니다.":"Skill files use markdown format. Clear heading structure helps agent parsing and allows selective loading of only needed sections."})]})}function f({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"트리거 설계":"Trigger Design"}),e.jsx("p",{children:s?"에이전트가 올바른 스킬을 올바른 시점에 사용하도록 트리거를 설계하는 방법을 배웁니다.":"Learn how to design triggers so agents use the right skill at the right time."})]}),e.jsx("h2",{id:"sub-trigger-method",children:s?"트리거의 역할":"Role of Triggers"}),e.jsx("p",{children:s?"트리거는 스킬이 언제 활성화되어야 하는지를 정의합니다. 잘 설계된 트리거는 에이전트가 상황에 맞는 스킬을 자동으로 선택하게 합니다.":"Triggers define when a skill should be activated. Well-designed triggers allow agents to automatically select the right skill for the situation."}),e.jsx("h3",{children:s?"트리거 유형":"Trigger Types"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔑"}),e.jsx("h4",{children:s?"키워드 트리거":"Keyword Trigger"}),e.jsx("p",{children:s?'특정 키워드나 구문이 포함될 때 활성화. 예: "코드 리뷰", "PR 검토"':'Activates on specific keywords. E.g., "code review", "PR review"'})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔍"}),e.jsx("h4",{children:s?"컨텍스트 트리거":"Context Trigger"}),e.jsx("p",{children:s?'특정 상황이나 파일 유형을 감지. 예: ".ts 파일 편집 시"':'Detects situations or file types. E.g., "when editing .ts files"'})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"⌨️"}),e.jsx("h4",{children:s?"명시적 트리거":"Explicit Trigger"}),e.jsx("p",{children:s?"사용자나 오케스트레이터가 명시적으로 호출. 예: /skill-name 명령어":"Explicit call via /skill-name command"})]})]}),e.jsx(r,{type:"warning",children:s?"트리거가 너무 광범위하면 불필요한 스킬 로드가 발생합니다. 반대로 너무 좁으면 스킬이 필요한 상황에서도 활성화되지 않습니다. 정확한 트리거 문구를 테스트를 통해 검증하세요.":"Too broad triggers cause unnecessary skill loading. Too narrow triggers may not activate even when the skill is needed. Validate accurate trigger phrases through testing."}),e.jsx("h3",{id:"sub-trigger-ex",children:s?"실습 예제 — 트리거 비교":"Practice Example — Trigger Comparison"}),e.jsx("p",{children:s?"같은 스킬에 대해 나쁜 트리거와 좋은 트리거를 비교합니다. 트리거 문구의 구체성이 스킬 발동 정확도를 결정합니다.":"Compare bad vs. good triggers for the same skill. The specificity of trigger phrases determines skill activation accuracy."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"트리거 비교 예시":"Trigger Comparison"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# ❌ 나쁜 트리거 (너무 광범위)
## 트리거
코드 관련 작업

# ✅ 좋은 트리거 (구체적)
## 트리거
PR 코드 리뷰, /review 명령어 호출,
"코드 리뷰해줘" / "review this code" 요청 시

---

# ❌ 나쁜 트리거 (너무 좁음)
## 트리거
React useState 관련 버그가 있는 TypeScript 파일

# ✅ 좋은 트리거 (적절한 범위)
## 트리거
TypeScript/JavaScript 버그 수정, 에러 디버깅,
"고쳐줘" / "fix this" / "버그가 있어" 요청 시`})})})]})]})}function b({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"스킬 최적화":"Skill Optimization"}),e.jsx("p",{children:s?"스킬 성능을 극대화하고 컨텍스트 사용을 최소화하는 최적화 기법을 배웁니다.":"Learn optimization techniques to maximize skill performance and minimize context usage."})]}),e.jsx("h2",{children:s?"최적화 원칙":"Optimization Principles"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"✂️"}),e.jsx("h4",{children:s?"간결성":"Conciseness"}),e.jsx("p",{children:s?"같은 내용을 더 적은 단어로 표현. 불필요한 수식어와 중복 제거.":"Express the same content with fewer words. Remove redundancy."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📋"}),e.jsx("h4",{children:s?"구조화":"Structure"}),e.jsx("p",{children:s?"번호 목록, 불릿 포인트, 표를 활용하여 정보를 구조화합니다.":"Use lists, bullet points, and tables to structure information."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📝"}),e.jsx("h4",{children:s?"예시 최소화":"Minimal Examples"}),e.jsx("p",{children:s?"예시는 레벨 3(상세)에만 포함. 핵심 지침에는 최소 예시만 사용.":"Examples only in Level 3. Minimal examples in core guidelines."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🚫"}),e.jsx("h4",{children:s?"중복 제거":"No Duplication"}),e.jsx("p",{children:s?"여러 스킬에 중복되는 내용은 공통 스킬로 분리합니다.":"Separate duplicated content into a shared skill."})]})]}),e.jsx("h3",{children:s?"최적화 전/후 비교 예시":"Before/After Optimization Example"}),e.jsx("p",{children:s?"동일한 코드 리뷰 스킬을 최적화 전과 후로 비교합니다. 토큰 수를 절반으로 줄이면서 동일한 품질을 유지하는 것이 목표입니다.":"Compare the same code review skill before and after optimization. The goal is to halve the token count while maintaining the same quality."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"❌ 최적화 전 (비효율, ~60줄)":"❌ Before optimization (~60 lines)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# 코드 리뷰 스킬

## 이 스킬에 대한 설명
이 스킬은 코드 리뷰를 수행하기 위한 스킬입니다.
코드 리뷰는 소프트웨어 개발에서 매우 중요한 과정입니다.
코드 리뷰를 통해 버그를 조기에 발견하고, 코드 품질을 향상시킬 수 있습니다.
또한 팀원 간의 지식 공유에도 도움이 됩니다.

## 언제 사용하는가?
코드 리뷰가 필요할 때 이 스킬을 사용합니다.
예를 들어 PR 리뷰, 코드 검토, 품질 점검 등의 상황에서 사용합니다.

## 수행 방법
1. 먼저 코드를 읽습니다
2. 그 다음 문제를 찾습니다
3. 문제를 찾으면 기록합니다
4. 마지막으로 결과를 보고합니다`})})})]}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"✅ 최적화 후 (효율, ~20줄)":"✅ After optimization (~20 lines)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# code-review
## 트리거
PR 리뷰, 코드 검토, 품질 점검 요청 시

## 단계
1. 보안(OWASP Top 10) → 성능(N+1, 누수) → 가독성 순으로 검토
2. 각 이슈: 심각도[high/medium/low] + 파일 + 수정 제안
3. JSON 형식으로 반환: { score, issues[], suggestions[] }`})})})]}),e.jsx(r,{type:"tip",children:s?"스킬 파일 크기를 정기적으로 측정하세요. 레벨 1이 3줄 이내, 레벨 2가 30줄 이내, 레벨 3이 100줄 이내를 유지하는 것이 이상적입니다.":"Regularly measure skill file size. Ideally maintain Level 1 under 3 lines, Level 2 under 30 lines, Level 3 under 100 lines."})]})}function N({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"스킬 테스트":"Skill Testing"}),e.jsx("p",{children:s?"스킬이 올바르게 동작하는지 검증하는 테스트 방법론을 알아봅니다.":"Learn the testing methodology for verifying skills work correctly."})]}),e.jsx("h2",{children:s?"스킬 테스트 접근법":"Skill Testing Approach"}),e.jsx("h3",{children:s?"1. 트리거 검증":"1. Trigger Verification"}),e.jsx("p",{children:s?"스킬이 의도한 상황에서 올바르게 트리거되는지, 그리고 의도하지 않은 상황에서는 트리거되지 않는지 테스트합니다.":"Test that the skill triggers correctly in intended situations and does not trigger in unintended situations."}),e.jsx("h3",{children:s?"2. A/B 테스트":"2. A/B Testing"}),e.jsx("p",{children:s?"동일한 작업을 스킬 사용 시와 미사용 시로 비교합니다. 품질, 일관성, 실행 시간을 측정합니다.":"Compare the same task with and without skill use. Measure quality, consistency, and execution time."}),e.jsx("h3",{children:s?"3. 엣지 케이스 테스트":"3. Edge Case Testing"}),e.jsx("p",{children:s?"예외 상황, 모호한 입력, 경계값에서의 스킬 동작을 검증합니다.":"Verify skill behavior in exceptional situations, ambiguous inputs, and boundary values."}),e.jsx("h3",{children:s?"code-review 스킬 테스트 케이스 예시":"code-review Skill Test Cases Example"}),e.jsx("p",{children:s?"스킬 배포 전 아래 3가지 테스트를 순서대로 실행합니다. 모두 통과해야 프로덕션 적용이 가능합니다.":"Run the following 3 tests in order before deploying a skill. All must pass before applying to production."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:s?"code-review 스킬 테스트 케이스":"code-review Skill Test Cases"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# code-review 스킬 테스트 케이스

## 테스트 1 — 트리거 검증 (정상 발동)
입력:   "PR #42 코드 리뷰해줘"
기대:   code-review 스킬 활성화 → JSON 반환
결과:   ✅ PASS  (score:82, issues:[...], pass:true)

## 테스트 2 — 트리거 검증 (비발동)
입력:   "함수 하나만 짜줘"
기대:   code-review 스킬 미활성화
결과:   ✅ PASS  (일반 응답, 스킬 미사용)

## 테스트 3 — 엣지 케이스 (빈 파일)
입력:   "이 파일 리뷰해줘" + 빈 index.ts 첨부
기대:   score:100, issues:[], pass:true
결과:   ✅ PASS

## 테스트 4 — 품질 기준 (심각도 분류)
입력:   SQL Injection 취약점이 있는 코드
기대:   issues[0].severity === "high"
결과:   ✅ PASS

## 테스트 5 — A/B 비교 (스킬 유무)
Control:   스킬 없이 "코드 리뷰해줘" → 점수 없음, 형식 불일치
Treatment: code-review 스킬 사용 → 표준 JSON, 일관된 점수
결과:   ✅ Treatment 품질 우수, 분산 낮음`})})})]}),e.jsx(r,{type:"important",children:s?"harness-abtest 리포지토리를 활용하면 체계적인 A/B 테스트를 자동화할 수 있습니다. 새 스킬을 배포하기 전 최소 5회 이상의 비교 테스트를 권장합니다.":"Using the harness-abtest repository enables systematic A/B test automation. We recommend at least 5 comparative tests before deploying new skills."}),e.jsx(r,{type:"danger",children:s?"스킬 파일에 실제 API 키, 데이터베이스 연결 문자열, 인증 토큰 등을 하드코딩하지 마세요. 스킬 파일은 Git에 커밋되므로 환경 변수($ENV_VAR)를 참조하는 방식으로 작성해야 합니다.":"Never hardcode API keys, database connection strings, or auth tokens in skill files. Since skill files are committed to Git, always reference environment variables ($ENV_VAR) instead."})]})}export{P as default};
