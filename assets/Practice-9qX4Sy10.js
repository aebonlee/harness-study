import{u as o,r as h,j as e}from"./index-kHmb9TRR.js";import{S as m}from"./SEOHead-CyjcIpua.js";import{T as c}from"./TipBox-e5C4aiyP.js";import{G as x}from"./GuideSidebar3-0cxK9ojO.js";const n=[{id:"webdev",ko:"웹 개발 팀",en:"Web Dev Team"},{id:"content",ko:"콘텐츠 제작",en:"Content Creation"},{id:"review",ko:"코드 리뷰",en:"Code Review"},{id:"abtest",ko:"A/B 테스트",en:"A/B Testing"},{id:"strategy",ko:"도입 전략",en:"Adoption Strategy"},{id:"measure",ko:"성과 측정",en:"Performance Measurement"}],j=[{label:"팀 구성 사례",labelEn:"Team Examples",items:[{id:"webdev",icon:"fa-globe",ko:"웹 개발 팀",en:"Web Dev Team"},{id:"content",icon:"fa-pen-nib",ko:"콘텐츠 제작",en:"Content Creation"}]},{label:"품질 & 측정",labelEn:"Quality & Metrics",items:[{id:"review",icon:"fa-code-compare",ko:"코드 리뷰",en:"Code Review"},{id:"abtest",icon:"fa-chart-bar",ko:"A/B 테스트",en:"A/B Testing"}]},{label:"도입 전략",labelEn:"Adoption",items:[{id:"strategy",icon:"fa-chess-king",ko:"도입 전략",en:"Adoption Strategy"},{id:"measure",icon:"fa-chart-line",ko:"성과 측정",en:"Performance Measurement"}]}];function S(){const{language:s}=o(),[r,l]=h.useState("webdev"),a=s==="ko",i=n.findIndex(d=>d.id===r),t=d=>{l(d),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[e.jsx(m,{title:a?"실전 활용 | Harness Master":"Real-world Practice | Harness Master",path:"/practice"}),e.jsx("div",{className:"guide-page",children:e.jsxs("div",{className:"guide-layout",children:[e.jsx(x,{groups:j,activeSection:r,onNavigate:t,isKo:a}),e.jsxs("main",{className:"guide-content",children:[r==="webdev"&&e.jsx(u,{isKo:a}),r==="content"&&e.jsx(v,{isKo:a}),r==="review"&&e.jsx(p,{isKo:a}),r==="abtest"&&e.jsx(f,{isKo:a}),r==="strategy"&&e.jsx(g,{isKo:a}),r==="measure"&&e.jsx(N,{isKo:a}),e.jsxs("div",{className:"guide-section-nav",children:[e.jsxs("button",{className:"guide-nav-btn prev",onClick:()=>t(n[i-1].id),disabled:i===0,children:[e.jsx("i",{className:"fa-solid fa-arrow-left"}),e.jsxs("span",{children:[e.jsx("small",{children:a?"이전":"Prev"}),e.jsx("strong",{children:i>0?a?n[i-1].ko:n[i-1].en:""})]})]}),e.jsxs("button",{className:"guide-nav-btn next",onClick:()=>t(n[i+1].id),disabled:i===n.length-1,children:[e.jsxs("span",{children:[e.jsx("small",{children:a?"다음":"Next"}),e.jsx("strong",{children:i<n.length-1?a?n[i+1].ko:n[i+1].en:""})]}),e.jsx("i",{className:"fa-solid fa-arrow-right"})]})]})]})]})})]})}function u({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"웹 개발 팀 구성":"Web Development Team"}),e.jsx("p",{children:s?"Harness로 완전한 웹 개발 에이전트 팀을 구성하고 운영하는 방법을 실전 예시로 배웁니다.":"Learn through real examples how to build and operate a complete web development agent team with Harness."})]}),e.jsx("h2",{children:s?"추천 팀 구성":"Recommended Team Composition"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🏗️"}),e.jsx("div",{className:"info-card-title",children:s?"아키텍트 에이전트 (Opus)":"Architect Agent (Opus)"}),e.jsx("div",{className:"info-card-desc",children:s?"전체 시스템 설계, 기술 스택 결정, 아키텍처 문서 작성. 고비용이지만 핵심 결정에만 사용.":"Full system design, tech stack decisions, architecture documentation. Expensive but used only for key decisions."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🎨"}),e.jsx("div",{className:"info-card-title",children:s?"개발 에이전트 (Sonnet) ×2":"Dev Agent (Sonnet) ×2"}),e.jsx("div",{className:"info-card-desc",children:s?"실제 코드 구현. 두 개를 병렬로 실행하여 프론트/백엔드를 동시에 개발.":"Actual code implementation. Run two in parallel for simultaneous front/backend development."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔍"}),e.jsx("div",{className:"info-card-title",children:s?"리뷰어 에이전트 (Sonnet)":"Reviewer Agent (Sonnet)"}),e.jsx("div",{className:"info-card-desc",children:s?"코드 품질, 보안 취약점, 성능 이슈 검토. 모든 PR에 의무 적용.":"Code quality, security vulnerability, performance issue review. Mandatory for all PRs."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🧪"}),e.jsx("div",{className:"info-card-title",children:s?"테스터 에이전트 (Haiku)":"Tester Agent (Haiku)"}),e.jsx("div",{className:"info-card-desc",children:s?"단위/통합 테스트 자동 생성 및 실행. 저비용 모델로도 충분.":"Automatic unit/integration test generation and execution. Low-cost model sufficient."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🚀"}),e.jsx("div",{className:"info-card-title",children:s?"배포 에이전트 (Haiku)":"Deploy Agent (Haiku)"}),e.jsx("div",{className:"info-card-desc",children:s?"CI/CD 파이프라인 관리, 배포 스크립트 실행.":"CI/CD pipeline management, deployment script execution."})]})]}),e.jsx("h2",{children:s?"워크플로우":"Workflow"}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"text"}),e.jsx("span",{className:"code-block-filename",children:s?"웹 개발팀 워크플로우":"Web Dev Team Workflow"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`요구사항(Input)
       │
       ▼
┌──────────────────┐
│  아키텍트 에이전트 │  시스템 설계, 기술 스택 결정
│  (Opus)          │  → architecture.md 출력
└────────┬─────────┘
         │ 설계 완료 → 팬아웃(Fan-out)
    ┌────┴─────┐
    ▼           ▼
┌────────┐  ┌─────────┐
│프론트   │  │백엔드    │  병렬 구현 (Sonnet x2)
│에이전트 │  │에이전트  │
└───┬────┘  └────┬────┘
    │             │
    └──────┬──────┘
           │ 팬인(Fan-in)
           ▼
┌──────────────────┐
│  리뷰어 에이전트  │  코드 품질·보안·성능 검토 (Sonnet)
└────────┬─────────┘
         │ score ≥ 70 → 통과
         ▼
┌──────────────────┐
│  테스터 에이전트  │  단위·통합 테스트 (Haiku)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  배포 에이전트   │  CI/CD 파이프라인 실행 (Haiku)
└────────┬─────────┘
         │
         ▼
    최종 배포(Output)`})})})]}),e.jsx(c,{type:"tip",children:s?"비용 최적화: 아키텍트에는 Opus, 개발/리뷰에는 Sonnet, 테스트/배포에는 Haiku를 사용하면 성능과 비용의 균형을 맞출 수 있습니다.":"Cost optimization: Use Opus for architect, Sonnet for dev/review, Haiku for test/deploy to balance performance and cost."})]})}function v({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"콘텐츠 제작 팀":"Content Creation Team"}),e.jsx("p",{children:s?"Harness로 고품질 콘텐츠를 대규모로 제작하는 팀을 구성합니다.":"Build a team with Harness for large-scale high-quality content creation."})]}),e.jsx("h2",{children:s?"콘텐츠 제작 팀 구성":"Content Creation Team Composition"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔬"}),e.jsx("div",{className:"info-card-title",children:s?"리서치 에이전트":"Research Agent"}),e.jsx("div",{className:"info-card-desc",children:s?"주제 조사, 데이터 수집, 경쟁 분석, 키워드 발굴":"Topic research, data collection, competitive analysis, keyword discovery"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📐"}),e.jsx("div",{className:"info-card-title",children:s?"아웃라인 에이전트":"Outline Agent"}),e.jsx("div",{className:"info-card-desc",children:s?"콘텐츠 구조 설계, 목차 작성, 스토리라인 구성":"Content structure design, TOC writing, storyline composition"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"✍️"}),e.jsx("div",{className:"info-card-title",children:s?"작성 에이전트 ×2":"Writing Agent ×2"}),e.jsx("div",{className:"info-card-desc",children:s?"본문 작성, 팬아웃 패턴으로 섹션별 병렬 작성":"Body writing, parallel writing by section using fan-out pattern"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"✏️"}),e.jsx("div",{className:"info-card-title",children:s?"편집 에이전트":"Editing Agent"}),e.jsx("div",{className:"info-card-desc",children:s?"문체 통일, 가독성 개선, 오류 교정":"Style unification, readability improvement, error correction"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔎"}),e.jsx("div",{className:"info-card-title",children:s?"SEO 에이전트":"SEO Agent"}),e.jsx("div",{className:"info-card-desc",children:s?"키워드 최적화, 메타 태그 작성, 내부 링크 구성":"Keyword optimization, meta tag writing, internal link structure"})]})]}),e.jsx("h2",{children:s?"CLAUDE.md — 콘텐츠 제작 오케스트레이터":"CLAUDE.md — Content Creation Orchestrator"}),e.jsx("p",{children:s?"아래는 5개 에이전트로 구성된 콘텐츠 제작팀의 오케스트레이터 파일입니다. 팬아웃 패턴으로 섹션별 병렬 작성을 수행합니다.":"Below is the orchestrator file for a 5-agent content creation team. Performs parallel section writing with a fan-out pattern."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/CLAUDE.md (콘텐츠 제작 오케스트레이터)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`# 콘텐츠 제작 오케스트레이터

## Role
5개 에이전트로 구성된 콘텐츠 제작팀을 조율합니다.
리서치 → 아웃라인 → 병렬 작성 → 편집 → SEO 파이프라인을 관리합니다.

## Team Members
- research-agent  : 주제 조사, 키워드 발굴, 경쟁 분석 (Sonnet)
- outline-agent   : 콘텐츠 구조 설계, 목차 작성 (Sonnet)
- writing-agent-1 : 도입/본문 섹션 1~3 작성 (Sonnet)
- writing-agent-2 : 본문 섹션 4~6/결론 작성 (Sonnet)
- seo-agent       : 키워드 최적화, 메타 태그 작성 (Haiku)

## Workflow
1. research-agent에게 주제 조사 위임 → research-report.md 출력
2. outline-agent에게 목차 설계 위임 → outline.md 출력
3. writing-agent-1, writing-agent-2 동시 실행 (팬아웃)
   - writing-agent-1: 섹션 1~3 작성
   - writing-agent-2: 섹션 4~6 + 결론 작성
4. 두 에이전트 결과 취합 (팬인) → draft.md 통합
5. seo-agent에게 최적화 위임 → final.md 출력

## Rules
- 각 에이전트에게 이전 단계 결과 파일을 반드시 전달
- 작성 에이전트 결과 취합 시 문체/용어 일관성 유지
- SEO 점수 80 미만이면 seo-agent에게 재작업 요청`})})})]}),e.jsx(c,{type:"important",children:s?"harness-for-everyone 프로젝트 자체가 Harness로 제작되었습니다. 8개의 에이전트가 개념 설계팀과 시각 제작팀으로 나뉘어 KO/EN/JP 3개 언어 자료를 동시에 제작했습니다.":"The harness-for-everyone project itself was created with Harness. 8 agents divided into a conceptual design team and visual production team simultaneously created materials in 3 languages: KO/EN/JP."})]})}function p({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"코드 리뷰 시스템":"Code Review System"}),e.jsx("p",{children:s?"Harness로 자동화된 코드 리뷰 시스템을 구축하는 방법을 알아봅니다.":"Learn how to build an automated code review system with Harness."})]}),e.jsx("h2",{children:s?"다층 리뷰 아키텍처":"Multi-layer Review Architecture"}),e.jsx("p",{children:s?"전문가 풀 패턴을 활용하여 코드 유형에 따라 전문 리뷰어를 배정합니다.":"Using the expert pool pattern, assign specialist reviewers based on code type."}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🔒"}),e.jsx("div",{className:"info-card-title",children:s?"보안 리뷰어":"Security Reviewer"}),e.jsx("div",{className:"info-card-desc",children:s?"OWASP Top 10, SQL Injection, XSS, 인증/인가 취약점 검토":"OWASP Top 10, SQL Injection, XSS, auth/authorization vulnerability review"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"⚡"}),e.jsx("div",{className:"info-card-title",children:s?"성능 리뷰어":"Performance Reviewer"}),e.jsx("div",{className:"info-card-desc",children:s?"N+1 쿼리, 불필요한 렌더링, 메모리 누수 검토":"N+1 queries, unnecessary rendering, memory leak review"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🏛️"}),e.jsx("div",{className:"info-card-title",children:s?"아키텍처 리뷰어":"Architecture Reviewer"}),e.jsx("div",{className:"info-card-desc",children:s?"SOLID 원칙, 디자인 패턴 준수, 결합도/응집도 검토":"SOLID principles, design pattern compliance, coupling/cohesion review"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🧪"}),e.jsx("div",{className:"info-card-title",children:s?"테스트 리뷰어":"Test Reviewer"}),e.jsx("div",{className:"info-card-desc",children:s?"테스트 커버리지, 엣지 케이스, 테스트 품질 검토":"Test coverage, edge cases, test quality review"})]})]}),e.jsx("h3",{children:s?"표준화된 리뷰 결과 JSON 예시":"Standardized Review Result JSON Example"}),e.jsx("p",{children:s?"4개 리뷰어 에이전트가 동일한 JSON 형식으로 결과를 반환하면, 오케스트레이터가 결과를 취합하여 종합 리뷰 보고서를 생성합니다.":"When 4 reviewer agents return results in the same JSON format, the orchestrator aggregates them into a comprehensive review report."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"json"}),e.jsx("span",{className:"code-block-filename",children:"tmp/review-result.json"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`{
  "pr_id": "PR-142",
  "total_score": 76,
  "reviews": [
    {
      "reviewer": "security-reviewer",
      "score": 85,
      "issues": [
        {
          "severity": "high",
          "file": "src/api/auth.ts",
          "line": 34,
          "message": "JWT 토큰 만료 시간 미설정",
          "suggestion": "expiresIn: '1h' 옵션 추가"
        }
      ]
    },
    {
      "reviewer": "performance-reviewer",
      "score": 70,
      "issues": [
        {
          "severity": "medium",
          "file": "src/hooks/useUsers.ts",
          "line": 12,
          "message": "N+1 쿼리 발생 가능성",
          "suggestion": "useQuery의 select 옵션으로 필요한 필드만 선택"
        }
      ]
    }
  ],
  "pass": true,
  "summary": "보안 이슈 1개 즉시 수정 필요, 성능 개선 권장"
}`})})})]}),e.jsx(c,{type:"tip",children:s?"리뷰 결과를 표준화된 형식(JSON)으로 출력하도록 스킬을 설계하면, 리뷰 통계를 쉽게 집계하고 코드베이스의 취약 영역을 식별할 수 있습니다.":"Design skills to output review results in standardized format (JSON) to easily aggregate review statistics and identify weak areas in the codebase."}),e.jsx(c,{type:"danger",children:s?"자동 코드 리뷰 결과만 믿고 수동 검토를 생략하지 마세요. AI 리뷰어는 비즈니스 로직 오류, 요구사항 불일치 등 맥락적 문제를 놓칠 수 있습니다.":"Do not skip manual review based solely on automated results. AI reviewers can miss contextual issues like business logic errors and requirement mismatches."})]})}function f({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsxs("h1",{children:["A/B ",s?"테스트":"Testing"]}),e.jsx("p",{children:s?"Harness 도입 효과를 객관적으로 검증하는 A/B 테스트 방법론을 배웁니다.":"Learn the A/B testing methodology to objectively verify the effectiveness of Harness adoption."})]}),e.jsx("h2",{children:s?"A/B 테스트 설계":"A/B Test Design"}),e.jsx("p",{children:s?"harness-abtest 프레임워크를 사용하여 스킬 유무에 따른 성능 차이를 측정합니다.":"Use the harness-abtest framework to measure performance differences with and without skills."}),e.jsx("h3",{children:s?"측정 항목":"Metrics to Measure"}),e.jsx("div",{className:"comparison-table-wrapper",children:e.jsxs("table",{className:"comparison-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:s?"측정 항목":"Metric"}),e.jsx("th",{children:s?"스킬 없음 (Control)":"Without Skill (Control)"}),e.jsx("th",{children:s?"스킬 있음 (Treatment)":"With Skill (Treatment)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:s?"코드 품질 점수":"Code Quality Score"}),e.jsx("td",{children:s?"기준값":"Baseline"}),e.jsx("td",{children:s?"+15~30% 향상 (기대)":"Expected +15~30% improvement"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"출력 일관성":"Output Consistency"}),e.jsx("td",{children:s?"높은 분산":"High variance"}),e.jsx("td",{children:s?"낮은 분산 (기대)":"Expected lower variance"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"실행 시간":"Execution Time"}),e.jsx("td",{children:s?"기준값":"Baseline"}),e.jsx("td",{children:s?"+10~20% (오버헤드)":"Expected +10~20% (overhead)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:s?"오류율":"Error Rate"}),e.jsx("td",{children:s?"기준값":"Baseline"}),e.jsx("td",{children:s?"-30~50% (기대)":"Expected -30~50%"})]})]})]})}),e.jsx("h3",{children:s?"A/B 테스트 설정 + 결과 JSON 예시":"A/B Test Config + Result JSON Example"}),e.jsx("p",{children:s?"하네스-abtest 프레임워크의 실제 설정 파일과 n=5 실행 결과입니다. 이 구조를 복사하여 자신의 스킬 A/B 테스트에 활용하세요.":"Actual config file and n=5 run results from the harness-abtest framework. Copy this structure for your own skill A/B tests."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"json"}),e.jsx("span",{className:"code-block-filename",children:"harness-abtest/config.json"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`{
  "experiment": "code-review-skill-v2",
  "task": "PR #88 코드 리뷰 수행",
  "runs": 5,
  "groups": {
    "control":   { "skill": null,            "model": "claude-sonnet-4-5" },
    "treatment": { "skill": "code-review.md", "model": "claude-sonnet-4-5" }
  },
  "metrics": ["quality_score", "consistency", "execution_time_sec"]
}`})})})]}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"json"}),e.jsx("span",{className:"code-block-filename",children:"harness-abtest/results.json (n=5 결과)"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`{
  "experiment": "code-review-skill-v2",
  "summary": {
    "control": {
      "quality_score_avg": 64.2,
      "quality_score_std": 18.7,
      "output_format_match": 0.4,
      "avg_time_sec": 28
    },
    "treatment": {
      "quality_score_avg": 83.6,
      "quality_score_std": 4.2,
      "output_format_match": 1.0,
      "avg_time_sec": 31
    }
  },
  "verdict": {
    "quality_improvement": "+30.2%",
    "variance_reduction": "-77.5%",
    "time_overhead": "+10.7%",
    "recommendation": "ADOPT — 품질 향상이 시간 오버헤드를 상회함"
  }
}`})})})]}),e.jsx(c,{type:"important",children:s?"최소 5~10회 반복 테스트를 권장합니다. 단일 테스트 결과는 통계적으로 신뢰하기 어렵습니다. revfactory의 공식 A/B 테스트는 n=15로 진행되었습니다.":"We recommend a minimum of 5-10 repetitions. Single test results are statistically unreliable. revfactory's official A/B test was conducted with n=15."})]})}function g({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"Harness 도입 전략":"Harness Adoption Strategy"}),e.jsx("p",{children:s?"조직이나 프로젝트에 Harness를 성공적으로 도입하는 단계별 전략을 배웁니다.":"Learn step-by-step strategies for successfully adopting Harness in an organization or project."})]}),e.jsx("h2",{children:s?"4단계 도입 로드맵":"4-Phase Adoption Roadmap"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🌱"}),e.jsx("div",{className:"info-card-title",children:s?"1단계: 파일럿 (1-2주)":"Phase 1: Pilot (1-2 weeks)"}),e.jsx("div",{className:"info-card-desc",children:s?"작은 규모의 실제 프로젝트에 Harness를 적용합니다. 간단한 2-에이전트 팀부터 시작하여 팀원들이 개념을 이해합니다.":"Apply Harness to a small real project. Start with a simple 2-agent team for team members to understand the concept."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📚"}),e.jsx("div",{className:"info-card-title",children:s?"2단계: 학습 (2-4주)":"Phase 2: Learning (2-4 weeks)"}),e.jsx("div",{className:"info-card-desc",children:s?"파일럿에서 얻은 교훈을 바탕으로 스킬을 개선하고 팀 구성을 최적화합니다. A/B 테스트로 효과를 검증합니다.":"Based on lessons from the pilot, improve skills and optimize team composition. Verify effectiveness with A/B tests."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📈"}),e.jsx("div",{className:"info-card-title",children:s?"3단계: 확장 (1-2개월)":"Phase 3: Scaling (1-2 months)"}),e.jsx("div",{className:"info-card-desc",children:s?"검증된 팀 구성을 다른 프로젝트에 적용합니다. 스킬 라이브러리를 구축하고 팀 전체에 공유합니다.":"Apply validated team compositions to other projects. Build a skill library and share it with the entire team."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🏆"}),e.jsx("div",{className:"info-card-title",children:s?"4단계: 정착 (지속적)":"Phase 4: Establishment (Ongoing)"}),e.jsx("div",{className:"info-card-desc",children:s?"Harness를 표준 개발 워크플로우에 통합합니다. 새 팀원 온보딩에 Harness 교육을 포함합니다.":"Integrate Harness into the standard development workflow. Include Harness training in new team member onboarding."})]})]}),e.jsx("h3",{children:s?"도입 단계별 마일스톤 추적 JSON":"Phase-by-Phase Milestone Tracker JSON"}),e.jsx("p",{children:s?"오케스트레이터 또는 팀 리드가 Harness 도입 진행 상황을 추적하는 파일입니다. 각 단계의 목표, 성공 기준, 완료 여부를 기록합니다.":"File for the orchestrator or team lead to track Harness adoption progress. Records each phase's goals, success criteria, and completion."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"json"}),e.jsx("span",{className:"code-block-filename",children:"tmp/adoption-roadmap.json"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`{
  "project": "my-team-harness-adoption",
  "started": "2026-04-01",
  "phases": [
    {
      "phase": 1,
      "name": "pilot",
      "duration": "1-2주",
      "goal": "2-에이전트 팀으로 실제 작업 1개 완료",
      "success_criteria": "수동 대비 오류 수 감소",
      "status": "completed",
      "actual_result": "리뷰 오류 40% 감소, 팀원 이해도 양호"
    },
    {
      "phase": 2,
      "name": "learning",
      "duration": "2-4주",
      "goal": "파일럿 교훈으로 스킬 3개 개선",
      "success_criteria": "스킬 재사용률 > 60%",
      "status": "in_progress",
      "current_reuse_rate": 0.52
    },
    {
      "phase": 3,
      "name": "scaling",
      "duration": "1-2개월",
      "goal": "3개 이상 프로젝트에 적용",
      "success_criteria": "수동 대비 시간 절약 > 20%",
      "status": "pending"
    },
    {
      "phase": 4,
      "name": "establishment",
      "duration": "지속",
      "goal": "표준 워크플로우 통합 + 온보딩 포함",
      "success_criteria": "신규 팀원 1주 이내 독립 사용",
      "status": "pending"
    }
  ]
}`})})})]}),e.jsx(c,{type:"warning",children:s?"한 번에 모든 것을 바꾸려 하지 마세요. 점진적 도입이 성공률이 높습니다. 첫 번째 프로젝트에서 완벽한 Harness 활용을 목표로 삼지 말고, 배우고 개선하는 과정으로 여기세요.":"Don't try to change everything at once. Gradual adoption has a higher success rate. Don't aim for perfect Harness usage on the first project; treat it as a learning and improvement process."})]})}function N({isKo:s}){return e.jsxs("div",{className:"guide-section",children:[e.jsxs("div",{className:"guide-content-header",children:[e.jsx("h1",{children:s?"성과 측정":"Performance Measurement"}),e.jsx("p",{children:s?"Harness 도입의 성과를 객관적으로 측정하고 지속 개선하는 방법을 배웁니다.":"Learn how to objectively measure the results of Harness adoption and continuously improve."})]}),e.jsx("h2",{children:s?"핵심 성과 지표(KPI)":"Key Performance Indicators (KPIs)"}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"⚡"}),e.jsx("div",{className:"info-card-title",children:s?"생산성 지표":"Productivity Metrics"}),e.jsx("div",{className:"info-card-desc",children:s?"작업당 평균 처리 시간, 일일 완료 작업 수, 반복 작업 자동화율":"Average processing time per task, daily completed tasks, repetitive task automation rate"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"✅"}),e.jsx("div",{className:"info-card-title",children:s?"품질 지표":"Quality Metrics"}),e.jsx("div",{className:"info-card-desc",children:s?"코드 리뷰 통과율, 버그 발생률, 고객 만족도":"Code review pass rate, bug occurrence rate, customer satisfaction"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"💰"}),e.jsx("div",{className:"info-card-title",children:s?"비용 지표":"Cost Metrics"}),e.jsx("div",{className:"info-card-desc",children:s?"API 호출 비용, 모델별 비용 배분, ROI":"API call cost, cost distribution by model, ROI"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📖"}),e.jsx("div",{className:"info-card-title",children:s?"학습 지표":"Learning Metrics"}),e.jsx("div",{className:"info-card-desc",children:s?"스킬 재사용률, 팀 만족도, 온보딩 시간":"Skill reuse rate, team satisfaction, onboarding time"})]})]}),e.jsx("h3",{children:s?"KPI 추적 파일 예시":"KPI Tracking File Example"}),e.jsx("p",{children:s?"오케스트레이터가 매 스프린트 종료 후 자동으로 업데이트하는 KPI 추적 파일입니다.":"A KPI tracking file the orchestrator automatically updates after each sprint."}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"json"}),e.jsx("span",{className:"code-block-filename",children:"tmp/kpi-report.json"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`{
  "period": "2026-04 Sprint 3",
  "productivity": {
    "tasks_completed": 47,
    "avg_time_per_task_min": 8.3,
    "parallel_ratio": 0.72,
    "automation_rate": 0.85
  },
  "quality": {
    "review_pass_rate": 0.91,
    "bug_rate_per_100_lines": 0.4,
    "avg_review_score": 82
  },
  "cost": {
    "total_api_cost_usd": 12.40,
    "cost_per_task_usd": 0.26,
    "model_distribution": {
      "opus": 0.15,
      "sonnet": 0.65,
      "haiku": 0.20
    }
  },
  "top_skills_used": ["code-review", "test-writer", "doc-generator"],
  "improvement_notes": "리뷰어 재작업률 9% → 다음 스프린트 트리거 정밀화 필요"
}`})})})]}),e.jsx("h3",{children:s?"월간 리뷰 체크리스트":"Monthly Review Checklist"}),e.jsxs("ul",{children:[e.jsx("li",{children:s?"가장 자주 사용된 스킬 TOP 3 확인":"Check TOP 3 most frequently used skills"}),e.jsx("li",{children:s?"가장 많은 오류가 발생한 에이전트 역할 분석":"Analyze agent roles with most errors"}),e.jsx("li",{children:s?"A/B 테스트 결과 기반 스킬 개선":"Improve skills based on A/B test results"}),e.jsx("li",{children:s?"새로운 도메인에 적용 가능한 패턴 식별":"Identify patterns applicable to new domains"}),e.jsx("li",{children:s?"팀원 피드백 수집 및 반영":"Collect and incorporate team member feedback"})]}),e.jsx(c,{type:"tip",children:s?'처음부터 완벽한 측정 시스템을 구축하려 하지 마세요. "측정하고 싶은 것 2-3가지"부터 시작하여 점진적으로 대시보드를 확장하세요.':`Don't try to build a perfect measurement system from the start. Start with "2-3 things you want to measure" and gradually expand the dashboard.`})]})}export{S as default};
