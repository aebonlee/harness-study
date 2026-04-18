import{u as p,r as u,j as e}from"./index-Dt-r-Z-o.js";import{S as x}from"./SEOHead-4fBNXSK-.js";import{T as i}from"./TipBox-CS1u2cAx.js";import{G as m}from"./GuideSidebar3-DSqvEqR9.js";const t=[{id:"pipeline",ko:"파이프라인 패턴",en:"Pipeline"},{id:"fanout",ko:"팬아웃/팬인",en:"Fan-out/Fan-in"},{id:"expert",ko:"전문가 풀",en:"Expert Pool"},{id:"producer",ko:"생산자-검토자",en:"Producer-Reviewer"},{id:"supervisor",ko:"감독자 패턴",en:"Supervisor"},{id:"hierarchical",ko:"계층적 위임",en:"Hierarchical Delegation"}],g=[{label:"기본 패턴",labelEn:"Basic Patterns",items:[{id:"pipeline",icon:"fa-arrow-right-long",ko:"파이프라인 패턴",en:"Pipeline",subs:[{id:"sub-pipeline-struct",ko:"패턴 구조",en:"Structure"},{id:"sub-pipeline-cases",ko:"적용 시나리오",en:"Scenarios"},{id:"sub-pipeline-ex",ko:"실습 예제",en:"Practice"}]},{id:"fanout",icon:"fa-code-fork",ko:"팬아웃/팬인",en:"Fan-out/Fan-in",subs:[{id:"sub-fanout-struct",ko:"패턴 구조",en:"Structure"},{id:"sub-fanout-cases",ko:"적용 시나리오",en:"Scenarios"},{id:"sub-fanout-ex",ko:"실습 예제",en:"Practice"}]}]},{label:"전문가 패턴",labelEn:"Advanced Patterns",items:[{id:"expert",icon:"fa-user-tie",ko:"전문가 풀",en:"Expert Pool"},{id:"producer",icon:"fa-pen-to-square",ko:"생산자-검토자",en:"Producer-Reviewer"}]},{label:"계층 패턴",labelEn:"Hierarchical",items:[{id:"supervisor",icon:"fa-eye",ko:"감독자 패턴",en:"Supervisor"},{id:"hierarchical",icon:"fa-sitemap",ko:"계층적 위임",en:"Hierarchical Delegation"}]}];function A(){const{language:n}=p(),[a,o]=u.useState("pipeline"),r=n==="ko",s=t.findIndex(l=>l.id===a),c=l=>{o(l),window.scrollTo({top:0,behavior:"smooth"})},h=l=>{setTimeout(()=>{const d=document.getElementById(l);d&&d.scrollIntoView({behavior:"smooth",block:"start"})},50)};return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:r?"6가지 아키텍처 패턴 | Harness Master":"6 Architectural Patterns | Harness Master",path:"/patterns"}),e.jsx("div",{className:"guide-page",children:e.jsxs("div",{className:"guide-layout",children:[e.jsx(m,{groups:g,activeSection:a,onNavigate:c,onSubNavigate:h,isKo:r}),e.jsxs("main",{className:"guide-content",children:[a==="pipeline"&&e.jsx(j,{isKo:r}),a==="fanout"&&e.jsx(v,{isKo:r}),a==="expert"&&e.jsx(f,{isKo:r}),a==="producer"&&e.jsx(b,{isKo:r}),a==="supervisor"&&e.jsx(k,{isKo:r}),a==="hierarchical"&&e.jsx(y,{isKo:r}),e.jsxs("div",{className:"guide-section-nav",children:[e.jsxs("button",{className:"guide-nav-btn prev",onClick:()=>c(t[s-1].id),disabled:s===0,children:[e.jsx("i",{className:"fa-solid fa-arrow-left"}),e.jsxs("span",{children:[e.jsx("small",{children:r?"이전":"Prev"}),e.jsx("strong",{children:s>0?r?t[s-1].ko:t[s-1].en:""})]})]}),e.jsxs("button",{className:"guide-nav-btn next",onClick:()=>c(t[s+1].id),disabled:s===t.length-1,children:[e.jsxs("span",{children:[e.jsx("small",{children:r?"다음":"Next"}),e.jsx("strong",{children:s<t.length-1?r?t[s+1].ko:t[s+1].en:""})]}),e.jsx("i",{className:"fa-solid fa-arrow-right"})]})]})]})]})})]})}function j({isKo:n}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:n?"파이프라인 패턴":"Pipeline Pattern"}),e.jsx("p",{children:n?"에이전트들이 순차적으로 작업을 처리하는 가장 기본적인 패턴입니다.":"The most fundamental pattern where agents process tasks sequentially."})]}),e.jsx("h2",{id:"sub-pipeline-struct",children:n?"패턴 구조":"Pattern Structure"}),e.jsx("p",{children:n?"파이프라인 패턴에서는 에이전트 A의 출력이 에이전트 B의 입력이 되고, 에이전트 B의 출력이 에이전트 C의 입력이 되는 방식으로 연속적으로 처리됩니다. 제조 공장의 조립 라인과 같습니다.":"In the pipeline pattern, Agent A's output becomes Agent B's input, Agent B's output becomes Agent C's input, and so on. Like an assembly line in a factory."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"text"}),e.jsx("span",{className:"code-block-filename",children:n?"파이프라인 흐름도":"Pipeline Flow"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`입력(Input)
   │
   ▼
┌─────────────────┐
│  연구 에이전트   │  웹 검색, 문서 분석
│  Research Agent │
└────────┬────────┘
         │  research.md (결과 파일)
         ▼
┌─────────────────┐
│  작성 에이전트   │  초안 작성
│  Writing Agent  │
└────────┬────────┘
         │  draft.md
         ▼
┌─────────────────┐
│  검토 에이전트   │  품질·사실 검증
│  Review Agent   │
└────────┬────────┘
         │  review.json
         ▼
┌─────────────────┐
│  편집 에이전트   │  최종 교정
│  Editing Agent  │
└────────┬────────┘
         │
         ▼
    최종 산출물(Output)`})})})]}),e.jsx("h3",{id:"sub-pipeline-cases",children:n?"적용 시나리오":"Application Scenarios"}),e.jsxs("ul",{children:[e.jsx("li",{children:n?"콘텐츠 제작 (연구 → 초안 → 검토 → 최종본)":"Content creation (Research → Draft → Review → Final)"}),e.jsx("li",{children:n?"데이터 처리 파이프라인 (수집 → 정제 → 분석 → 보고)":"Data processing pipeline (Collect → Clean → Analyze → Report)"}),e.jsx("li",{children:n?"소프트웨어 개발 (설계 → 구현 → 테스트 → 배포)":"Software development (Design → Implement → Test → Deploy)"})]}),e.jsx("h3",{children:n?"장단점":"Pros & Cons"}),e.jsx("div",{className:"comparison-table-wrapper",children:e.jsxs("table",{className:"comparison-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:n?"장점":"Pros"}),e.jsx("th",{children:n?"단점":"Cons"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:n?"구조 단순, 이해하기 쉬움":"Simple structure, easy to understand"}),e.jsx("td",{children:n?"병렬 처리 불가":"No parallel processing"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:n?"각 단계 독립적 최적화 가능":"Each stage independently optimizable"}),e.jsx("td",{children:n?"앞 단계 실패 시 전체 중단":"Full stop if earlier stage fails"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:n?"디버깅 용이":"Easy debugging"}),e.jsx("td",{children:n?"순서 의존성":"Order dependency"})]})]})]})}),e.jsx(i,{type:"tip",children:n?"파이프라인의 각 단계 사이에 검증 단계를 추가하세요. 앞 단계의 오류가 뒤로 전파되는 것을 방지합니다.":"Add a validation step between each pipeline stage. Prevents errors from earlier stages propagating downstream."}),e.jsx("h3",{id:"sub-pipeline-ex",children:n?"실습 예제 — 블로그 포스트 생성 파이프라인":"Practice Example — Blog Post Generation Pipeline"}),e.jsx("p",{children:n?"아래는 CLAUDE.md에 파이프라인 오케스트레이터를 정의하는 예시입니다. 연구 → 초안 → 검토 3단계 파이프라인을 구성합니다.":"Below defines a pipeline orchestrator in CLAUDE.md. Sets up a 3-stage pipeline: Research → Draft → Review."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/CLAUDE.md (파이프라인 오케스트레이터)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# 블로그 포스트 생성 오케스트레이터

## Role
파이프라인 패턴으로 고품질 블로그 포스트를 생성하는 오케스트레이터

## Pipeline Steps

### Step 1: Research
Task 도구로 research-agent를 실행한다:
- 주제 관련 최신 정보 3-5개 수집
- 결과를 tmp/research.md에 저장

### Step 2: Writing
tmp/research.md를 읽어 writing-agent를 실행한다:
- 1500-2000자 초안 작성
- SEO 최적화 H2/H3 구조 사용
- 결과를 tmp/draft.md에 저장

### Step 3: Review
tmp/draft.md를 읽어 review-agent를 실행한다:
- 사실 정확성, 가독성, SEO 검토
- 수정사항을 draft.md에 직접 반영
- 최종본을 output/post.md에 저장

## Tools
- Task (서브에이전트 실행)`})})})]})]})}function v({isKo:n}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:n?"팬아웃/팬인 패턴":"Fan-out/Fan-in Pattern"}),e.jsx("p",{children:n?"하나의 작업을 여러 에이전트에게 분배하고 결과를 통합하는 병렬 처리 패턴입니다.":"A parallel processing pattern that distributes one task to multiple agents and integrates results."})]}),e.jsx("h2",{id:"sub-fanout-struct",children:n?"패턴 구조":"Pattern Structure"}),e.jsx("p",{children:n?"팬아웃 단계에서 오케스트레이터가 작업을 여러 병렬 에이전트에게 분배합니다. 각 에이전트는 독립적으로 작업을 처리하고, 팬인 단계에서 오케스트레이터가 모든 결과를 수집하여 통합합니다.":"In the fan-out phase, the orchestrator distributes tasks to multiple parallel agents. Each agent processes independently, and in the fan-in phase, the orchestrator collects and integrates all results."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"text"}),e.jsx("span",{className:"code-block-filename",children:n?"팬아웃/팬인 흐름도":"Fan-out/Fan-in Flow"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`               입력(Input)
                    │
                    ▼
          ┌─────────────────┐
          │   오케스트레이터  │  작업 분배(Fan-out)
          └──┬──────┬──────┬┘
             │      │      │
             ▼      ▼      ▼
         ┌──────┐┌──────┐┌──────┐
         │Agent ││Agent ││Agent │  병렬 실행
         │  A   ││  B   ││  C   │
         └──┬───┘└──┬───┘└──┬───┘
             │      │      │
             ▼      ▼      ▼
          결과A   결과B   결과C
             │      │      │
             └──────┴──────┘
                    │  결과 수집(Fan-in)
                    ▼
          ┌─────────────────┐
          │   오케스트레이터  │  통합·집계
          └─────────────────┘
                    │
                    ▼
               최종 산출물`})})})]}),e.jsx("h3",{id:"sub-fanout-cases",children:n?"적용 시나리오":"Application Scenarios"}),e.jsxs("ul",{children:[e.jsx("li",{children:n?"다국어 번역 (동시에 여러 언어로 번역)":"Multi-language translation (simultaneously translate to multiple languages)"}),e.jsx("li",{children:n?"여러 소스에서 정보 수집 후 통합":"Information gathering from multiple sources then integration"}),e.jsx("li",{children:n?"코드베이스의 여러 모듈 동시 분석":"Simultaneous analysis of multiple codebase modules"})]}),e.jsx(i,{type:"important",children:n?"팬아웃 단계에서 분배되는 작업은 서로 독립적이어야 합니다. 작업 간 의존성이 있다면 파이프라인 패턴이 더 적합합니다.":"Tasks distributed in the fan-out phase should be independent of each other. If there are dependencies, the pipeline pattern is more appropriate."}),e.jsx("h3",{id:"sub-fanout-ex",children:n?"실습 예제 — 다국어 문서 생성":"Practice Example — Multi-language Document Generation"}),e.jsx("p",{children:n?"3개 언어(한국어·영어·일본어)로 동시 번역하는 팬아웃 패턴 예시입니다. 각 번역 에이전트가 병렬로 실행됩니다.":"A fan-out example that translates to 3 languages (Korean, English, Japanese) simultaneously. Each translation agent runs in parallel."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/commands/translate-all.md"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# translate-all (팬아웃 패턴)
## Trigger
다국어 번역 요청, 여러 언어로 동시 번역이 필요할 때

## Role
팬아웃 패턴으로 여러 언어를 병렬 번역하는 오케스트레이터

## Fan-out Steps

### 1. 원본 로드
$ARGUMENTS로 받은 파일을 읽어 번역 대상을 확인한다.

### 2. 병렬 번역 실행 (Fan-out)
아래 3개 Task를 동시에 실행한다:

Task A: 한국어 번역
- 역할: 전문 한국어 번역가
- 결과: output/ko.md에 저장

Task B: 영어 번역
- 역할: 전문 영어 번역가
- 결과: output/en.md에 저장

Task C: 일본어 번역
- 역할: 전문 일본어 번역가
- 결과: output/ja.md에 저장

### 3. 결과 취합 (Fan-in)
3개 번역 완료 후 품질을 확인하고
output/translation-report.md에 비교 요약을 작성한다.

## Tools
- Task (서브에이전트 실행)
- Read / Write`})})})]})]})}function f({isKo:n}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:n?"전문가 풀 패턴":"Expert Pool Pattern"}),e.jsx("p",{children:n?"다양한 전문가 에이전트 풀에서 작업에 맞는 전문가를 동적으로 선택하는 패턴입니다.":"A pattern that dynamically selects the right specialist from a pool of diverse expert agents."})]}),e.jsx("h2",{children:n?"패턴 구조":"Pattern Structure"}),e.jsx("p",{children:n?"오케스트레이터는 다양한 전문 에이전트(파이썬 전문가, 보안 전문가, DB 전문가 등)를 풀로 유지합니다. 작업이 들어오면 해당 작업에 가장 적합한 전문가를 선택하여 처리를 위임합니다.":"The orchestrator maintains a pool of diverse specialist agents (Python specialist, Security specialist, DB specialist, etc.). When a task arrives, it selects the most appropriate specialist and delegates the processing."}),e.jsx("h3",{children:n?"적용 시나리오":"Application Scenarios"}),e.jsxs("ul",{children:[e.jsx("li",{children:n?"다양한 기술 스택을 다루는 코드 리뷰 시스템":"Code review system handling diverse tech stacks"}),e.jsx("li",{children:n?"고객 문의를 담당 부서에 라우팅하는 지원 시스템":"Support system routing customer queries to responsible departments"}),e.jsx("li",{children:n?"문서 유형에 따른 전문 처리 (법률/기술/마케팅 문서)":"Specialized processing by document type (legal/technical/marketing)"})]}),e.jsx(i,{type:"tip",children:n?"전문가 풀의 각 에이전트는 자신의 전문 영역을 명확히 정의한 프로필을 가져야 합니다. 오케스트레이터가 이 프로필을 기반으로 최적의 에이전트를 선택합니다.":"Each agent in the expert pool should have a clearly defined profile of their specialty. The orchestrator selects the optimal agent based on this profile."})]})}function b({isKo:n}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:n?"생산자-검토자 패턴":"Producer-Reviewer Pattern"}),e.jsx("p",{children:n?"생산 에이전트가 산출물을 만들고, 검토 에이전트가 품질을 보장하는 패턴입니다.":"A pattern where a producer agent creates outputs and a reviewer agent ensures quality."})]}),e.jsx("h2",{children:n?"패턴 구조":"Pattern Structure"}),e.jsx("p",{children:n?"생산자(Producer) 에이전트가 초안이나 코드를 작성합니다. 검토자(Reviewer) 에이전트가 이를 평가하고 피드백을 제공합니다. 필요한 경우 생산자가 수정하고 재검토를 요청합니다. 이 사이클이 반복되어 최종 고품질 산출물이 만들어집니다.":"The Producer agent writes drafts or code. The Reviewer agent evaluates and provides feedback. The producer revises and requests re-review if needed. This cycle repeats until a final high-quality output is produced."}),e.jsx("h3",{children:n?"효과적인 검토 기준 설정":"Setting Effective Review Criteria"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:n?"명확성":"Clarity"})," — ",n?"검토자가 무엇을 평가해야 하는지 명확히 정의":"Clearly define what the reviewer should evaluate"]}),e.jsxs("li",{children:[e.jsx("strong",{children:n?"구체성":"Specificity"})," — ",n?'추상적인 "좋음/나쁨" 대신 구체적인 기준 제시':'Specific criteria instead of abstract "good/bad"']}),e.jsxs("li",{children:[e.jsx("strong",{children:n?"실행 가능성":"Actionability"})," — ",n?"피드백이 구체적인 개선 행동으로 이어질 수 있어야 함":"Feedback should lead to concrete improvement actions"]})]}),e.jsx(i,{type:"important",children:n?"생산자-검토자 패턴은 Harness A/B 테스트에서 가장 큰 품질 개선을 보인 패턴입니다. 특히 코드 품질과 문서 완성도 측면에서 탁월한 효과를 발휘합니다.":"The Producer-Reviewer pattern showed the largest quality improvement in Harness A/B tests, especially in code quality and documentation completeness."})]})}function k({isKo:n}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:n?"감독자 패턴":"Supervisor Pattern"}),e.jsx("p",{children:n?"상위 감독자 에이전트가 여러 작업자 에이전트를 실시간으로 모니터링하고 개입하는 패턴입니다.":"A pattern where a supervisor agent monitors and intervenes with multiple worker agents in real-time."})]}),e.jsx("h2",{children:n?"패턴 구조":"Pattern Structure"}),e.jsx("p",{children:n?"감독자(Supervisor) 에이전트는 여러 작업자(Worker) 에이전트를 모니터링합니다. 작업자가 오류를 만나거나 도움이 필요할 때 감독자가 개입합니다. 감독자는 또한 작업의 우선순위를 동적으로 조정할 수 있습니다.":"The Supervisor agent monitors multiple Worker agents. When workers encounter errors or need help, the supervisor intervenes. The supervisor can also dynamically adjust task priorities."}),e.jsx("h3",{children:n?"적용 시나리오":"Application Scenarios"}),e.jsxs("ul",{children:[e.jsx("li",{children:n?"장시간 실행되는 복잡한 작업의 모니터링":"Monitoring long-running complex tasks"}),e.jsx("li",{children:n?"오류 복구가 중요한 미션 크리티컬 워크플로우":"Mission-critical workflows where error recovery is important"}),e.jsx("li",{children:n?"동적으로 우선순위가 변경되는 작업 환경":"Task environments where priorities change dynamically"})]}),e.jsx(i,{type:"warning",children:n?"감독자 패턴은 시스템 복잡도를 높입니다. 단순한 작업에는 오버엔지니어링이 될 수 있으므로, 정말 감독이 필요한 복잡한 시나리오에서만 사용하세요.":"The supervisor pattern increases system complexity. It can be over-engineering for simple tasks, so only use it for complex scenarios that truly need supervision."})]})}function y({isKo:n}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:n?"계층적 위임 패턴":"Hierarchical Delegation Pattern"}),e.jsx("p",{children:n?"상위 에이전트가 하위 에이전트에게 작업을 위임하는 트리 구조 패턴입니다.":"A tree-structure pattern where higher-level agents delegate tasks to lower-level agents."})]}),e.jsx("h2",{children:n?"패턴 구조":"Pattern Structure"}),e.jsx("p",{children:n?"최상위 오케스트레이터가 중간 관리자 에이전트들에게 큰 작업을 위임합니다. 중간 관리자들은 다시 실무 에이전트들에게 세부 작업을 위임합니다. 이 계층 구조는 매우 복잡한 대규모 프로젝트에 적합합니다.":"The top-level orchestrator delegates large tasks to middle-manager agents. Middle managers further delegate detailed tasks to worker agents. This hierarchy is suitable for very complex large-scale projects."}),e.jsx("h3",{children:n?"계층 설계 원칙":"Hierarchy Design Principles"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:n?"적절한 깊이":"Appropriate Depth"})," — ",n?"3계층 이상은 관리 복잡도가 급격히 증가합니다. 대부분의 경우 2계층으로 충분합니다.":"More than 3 levels dramatically increases management complexity. 2 levels are sufficient for most cases."]}),e.jsxs("li",{children:[e.jsx("strong",{children:n?"명확한 위임 경계":"Clear Delegation Boundaries"})," — ",n?"각 계층이 무엇을 담당하는지 명확히 정의합니다.":"Clearly define what each layer is responsible for."]}),e.jsxs("li",{children:[e.jsx("strong",{children:n?"결과 집계 전략":"Result Aggregation Strategy"})," — ",n?"하위 계층의 결과를 어떻게 상위 계층으로 집계할지 사전 정의합니다.":"Pre-define how to aggregate lower-layer results to upper layers."]})]}),e.jsx(i,{type:"tip",children:n?"계층적 위임 패턴은 팬아웃 패턴과 결합하면 매우 강력합니다. 중간 관리자 계층에서 팬아웃을 사용하여 병렬 처리를 극대화할 수 있습니다.":"Hierarchical delegation combined with the fan-out pattern is very powerful. Using fan-out at the middle manager layer maximizes parallel processing."})]})}export{A as default};
