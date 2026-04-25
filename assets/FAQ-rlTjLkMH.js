import{u as h,r as l,j as e,L as p}from"./index-CXYl5i0r.js";import{S as g}from"./SEOHead-Cb_iRtxw.js";import{T as c}from"./TipBox--_yLXGX4.js";const i=[{category:"basic",q:"Harness(하네스)란 정확히 무엇인가요?",qEn:"What exactly is Harness?",a:'Harness는 Claude Code에서 .claude/CLAUDE.md와 .claude/commands/ 폴더에 저장된 마크다운 파일들의 집합을 의미합니다. 이 파일들이 Claude의 행동 방식, 사용 가능한 명령어, 작업 처리 방법을 정의합니다. 쉽게 말해 "나만의 AI 작업 매뉴얼"입니다.',aEn:"Harness refers to the collection of markdown files stored in .claude/CLAUDE.md and the .claude/commands/ folder in Claude Code. These files define how Claude behaves, what commands are available, and how to handle tasks — essentially your personal AI work manual.",link:"/intro",codeKo:`.claude/
├── CLAUDE.md          ← 오케스트레이터 지침 & 전역 규칙
│                         (기술 스택, 코딩 컨벤션, 에이전트 역할)
├── commands/
│   ├── review.md      ← /review 슬래시 커맨드
│   ├── refactor.md    ← /refactor 슬래시 커맨드
│   └── deploy.md      ← /deploy 슬래시 커맨드
└── tmp/               ← 임시 작업 파일
    └── research-result.md`,codeEn:`.claude/
├── CLAUDE.md          ← Orchestrator rules & global guidelines
│                         (tech stack, conventions, agent roles)
├── commands/
│   ├── review.md      ← /review slash command
│   ├── refactor.md    ← /refactor slash command
│   └── deploy.md      ← /deploy slash command
└── tmp/               ← temporary work files
    └── research-result.md`,codeLang:"text"},{category:"basic",q:"Harness를 사용하면 무엇이 좋아지나요?",qEn:"What improves when I use Harness?",a:'매번 같은 지시를 반복하지 않아도 됩니다. 스킬 파일 한 번 잘 작성해두면, 이후에는 /review 한 단어로 체계적인 코드 리뷰를 받을 수 있습니다. 팀과 공유하면 일관된 품질의 작업이 가능하고, 나만의 "AI 어시스턴트 성격"을 만들 수 있습니다.',aEn:"You won't need to repeat the same instructions every time. Write a skill file once, and from then on '/review' gives you a systematic code review. Sharing with your team enables consistent quality, and you can create your own AI assistant personality."},{category:"basic",q:"CLAUDE.md와 commands/ 폴더의 차이는 무엇인가요?",qEn:"What is the difference between CLAUDE.md and commands/?",a:"CLAUDE.md는 프로젝트 전체에 항상 적용되는 전역 지침입니다. 기술 스택, 코딩 컨벤션, 아키텍처 결정 등을 적습니다. commands/ 폴더는 특정 작업을 위해 명시적으로 호출하는 스킬 파일들을 저장합니다. /review, /refactor 같은 명령어가 여기서 나옵니다.",aEn:"CLAUDE.md contains global guidelines always applied to the entire project — tech stack, coding conventions, architecture decisions. The commands/ folder stores skill files explicitly called for specific tasks. Commands like /review and /refactor come from here.",link:"/intro",codeKo:`# CLAUDE.md — 전역 지침 (항상 적용)
## 프로젝트 기술 스택
- React 19 + TypeScript + Vite
## 코딩 규칙
- 커밋 전 반드시 tsc --noEmit 실행
- 함수명은 camelCase 사용

---

# commands/review.md — 특정 작업 스킬 (명시적 호출)
## 트리거
/review 커맨드 또는 "코드 리뷰해줘" 입력 시
## 단계
1. 변경 파일 목록 확인 (git diff HEAD)
2. TypeScript 타입 오류 검사
3. 보안 취약점 및 성능 이슈 식별
4. 우선순위별 개선 제안 정리`,codeEn:`# CLAUDE.md — Global guidelines (always applied)
## Tech Stack
- React 19 + TypeScript + Vite
## Coding Rules
- Run tsc --noEmit before every commit
- Use camelCase for function names

---

# commands/review.md — Task skill (explicitly invoked)
## Trigger
When /review is called or "please review this code" is typed
## Steps
1. Check changed files (git diff HEAD)
2. TypeScript type error check
3. Identify security vulnerabilities & performance issues
4. Compile prioritized improvement suggestions`,codeLang:"markdown"},{category:"skill",q:"스킬 파일은 얼마나 상세하게 작성해야 하나요?",qEn:"How detailed should a skill file be?",a:"Steps 섹션은 Claude가 각 단계를 건너뛸 수 없을 만큼 구체적이어야 합니다. 하지만 지나치게 상세하면 창의성이 억제됩니다. 경험상 각 Step에 2-4개의 세부 지침을 두는 것이 적당합니다. 처음에는 짧게 시작하고, 사용하면서 부족한 부분을 채워나가세요.",aEn:"Steps should be specific enough that Claude cannot skip any step. But overly detailed instructions stifle creativity. Based on experience, 2-4 sub-guidelines per Step is appropriate. Start short and fill in gaps as you use it.",link:"/skills",codeKo:`# ✅ 권장: 단계당 2-3개 세부 지침

## 단계
1. 파일 읽기
   - 변경된 파일 전체 내용 확인 (Read 도구)
   - 관련 타입 파일과 인터페이스 함께 확인
2. 품질 분석
   - TypeScript 오류 및 any 타입 위치 나열
   - 중복 코드 및 복잡도 높은 함수 식별
3. 리포트 작성
   - 심각도 순: Critical > Major > Minor
   - 각 항목에 구체적인 수정 방법 포함

# ❌ 지양: 너무 짧음 (Claude가 자의적으로 해석)

## 단계
1. 코드 확인
2. 리뷰 작성`,codeEn:`# ✅ Recommended: 2-3 sub-guidelines per step

## Steps
1. Read files
   - Read full content of changed files (Read tool)
   - Also check related type files and interfaces
2. Quality analysis
   - List TypeScript errors and any-type locations
   - Identify code duplication and high-complexity functions
3. Write report
   - Severity order: Critical > Major > Minor
   - Include specific fix for each item

# ❌ Avoid: Too short (Claude interprets arbitrarily)

## Steps
1. Check code
2. Write review`,codeLang:"markdown"},{category:"skill",q:"스킬 파일 하나가 너무 길어지면 어떻게 하나요?",qEn:"What if a skill file gets too long?",a:"스킬 파일이 150줄을 넘어가면 분리를 고려하세요. 예를 들어 code-review.md가 너무 길면 review-security.md, review-performance.md로 나누거나, 공통 원칙은 CLAUDE.md에 이동하고 스킬 파일에는 고유한 단계만 남깁니다.",aEn:"Consider splitting if a skill file exceeds 150 lines. For example, if code-review.md gets too long, split into review-security.md and review-performance.md, or move common principles to CLAUDE.md and keep only unique steps in skill files."},{category:"skill",q:"스킬을 호출하는 방법이 여러 가지인가요?",qEn:"Are there multiple ways to invoke a skill?",a:'네. 가장 일반적인 방법은 /skill-name 슬래시 커맨드입니다. 또한 CLAUDE.md나 스킬 파일의 Trigger 섹션에 자동 활성화 조건을 정의할 수 있습니다. "코드 리뷰해줘" 같은 자연어 요청에도 Claude가 적절한 스킬을 선택할 수 있습니다.',aEn:'Yes. The most common is the /skill-name slash command. You can also define auto-activation conditions in the Trigger section of CLAUDE.md or skill files. Claude can also select appropriate skills from natural language requests like "please review this code".',link:"/skills",codeKo:`# commands/review.md

## 트리거 (3가지 호출 방법)

### 방법 1: 슬래시 커맨드 (가장 명확)
/review src/auth.ts

### 방법 2: 자연어 (Claude가 스킬 선택)
"이 파일 코드 리뷰해줘"
"auth.ts에 보안 문제 없는지 확인해줘"

### 방법 3: 자동 트리거 (CLAUDE.md 전역 규칙에 추가)
## 자동화 규칙
- PR 생성 요청 시 /review 자동 실행
- TypeScript 파일 10줄 이상 수정 시 /review 권장`,codeEn:`# commands/review.md

## Trigger (3 invocation methods)

### Method 1: Slash command (most explicit)
/review src/auth.ts

### Method 2: Natural language (Claude selects skill)
"Please review this file's code"
"Check if auth.ts has any security issues"

### Method 3: Auto-trigger (add to CLAUDE.md global rules)
## Automation Rules
- Auto-run /review when creating a PR
- Suggest /review when 10+ TypeScript file lines are changed`,codeLang:"markdown"},{category:"team",q:"어떤 상황에서 멀티 에이전트 팀을 써야 하나요?",qEn:"When should I use a multi-agent team?",a:"단일 에이전트로 30분 이상 걸리는 작업, 서로 다른 전문 지식이 필요한 작업, 병렬 처리로 속도를 높일 수 있는 작업에 팀을 씁니다. 단순한 작업에 팀을 쓰면 오버헤드만 늘어납니다. 먼저 단일 에이전트로 시도하고, 한계에 부딪힐 때 팀으로 확장하세요.",aEn:"Use teams for tasks taking 30+ minutes with a single agent, tasks requiring different expertise, or tasks where parallel processing improves speed. Teams add overhead for simple tasks. Try single agent first, then scale to a team when you hit limits.",link:"/teams",codeKo:`# 팬아웃 패턴 — 병렬 처리로 시간 단축

# 상황: 블로그 포스트 3개 섹션 작성 (단일 45분 → 팀 20분)

# Step 1: 동시 실행 (독립적 작업)
Task 1: research 에이전트 → 섹션 A 조사 및 초안
Task 2: writing 에이전트  → 섹션 B 조사 및 초안
Task 3: seo 에이전트     → 섹션 C 조사 및 초안

# Step 2: 결과 취합 (순차 실행)
모든 Task 완료 → 결과 통합 → 품질 검토 → 최종본`,codeEn:`# Fan-out pattern — reduce time via parallel processing

# Situation: Write 3 blog post sections (single 45min → team 20min)

# Step 1: Run simultaneously (independent tasks)
Task 1: research agent → research & draft section A
Task 2: writing agent  → research & draft section B
Task 3: seo agent      → research & draft section C

# Step 2: Aggregate results (sequential)
All Tasks complete → merge results → quality review → final`,codeLang:"yaml"},{category:"team",q:"패턴 선택이 어렵습니다. 가장 중요한 기준은 무엇인가요?",qEn:"Pattern selection is difficult. What is the most important criterion?",a:'가장 중요한 질문은 "하위 작업들이 서로 독립적인가, 아니면 이전 결과가 필요한가?"입니다. 독립적이면 팬아웃(병렬), 이전 결과가 필요하면 파이프라인(순차)을 씁니다. 대부분의 복잡한 작업은 이 두 패턴의 조합으로 해결됩니다.',aEn:'The most important question: "Are subtasks independent of each other, or does each need the previous result?" Independent → fan-out (parallel). Needs previous result → pipeline (sequential). Most complex tasks are solved by combining these two.',link:"/patterns",codeKo:`패턴 선택 결정 트리
────────────────────────────────────────────
하위 작업이 서로 독립적인가?
  │
  YES ──→ 팬아웃/팬인 (병렬 처리)
  │        예: 3개 섹션 동시 작성
  │             research + writing + seo 동시 실행
  │
  NO  ──→ 파이프라인 (순차 처리)
           예: 조사 → 개요 → 집필
                이전 결과가 다음 단계 입력이 됨

독립 + 순차 혼재?
  └─→ 두 패턴 조합
       팬아웃(병렬 조사) → 취합 → 파이프라인(순차 집필)`,codeEn:`Pattern Selection Decision Tree
────────────────────────────────────────────
Are subtasks independent of each other?
  │
  YES ──→ Fan-out/Fan-in (parallel)
  │        e.g., write 3 sections simultaneously
  │             research + writing + seo run in parallel
  │
  NO  ──→ Pipeline (sequential)
           e.g., research → outline → writing
                each step needs the previous result

Mixed independent + sequential?
  └─→ Combine both patterns
       fan-out (parallel research) → merge → pipeline (sequential writing)`,codeLang:"text"},{category:"etc",q:"하네스를 팀과 공유하는 가장 좋은 방법은?",qEn:"What is the best way to share Harness with a team?",a:".claude/ 디렉토리를 Git 저장소에 커밋하면 팀 전체가 같은 스킬 세트를 사용할 수 있습니다. 조직 공통 스킬은 별도 저장소로 관리하고 서브모듈로 연결하는 방법도 있습니다. README.md와 CHANGELOG.md를 함께 관리하면 스킬 변경 이력을 추적할 수 있습니다.",aEn:"Committing the .claude/ directory to Git lets the whole team share the same skill set. Organization-wide skills can be in a separate repo connected as a submodule. Maintaining README.md and CHANGELOG.md together lets you track skill change history."},{category:"etc",q:"하네스 구축에 얼마나 시간이 걸리나요?",qEn:"How much time does it take to build a Harness?",a:"첫 스킬 파일 하나를 작성하는 데 30분 정도 걸립니다. 초기에 3-5개 핵심 스킬을 구축하는 데 1주일 정도 투자하면, 이후 매주 수 시간의 작업 시간을 절약할 수 있습니다. 중요한 것은 완벽한 시작이 아니라 꾸준한 개선입니다.",aEn:"Writing your first skill file takes about 30 minutes. Investing 1 week to build 3-5 core skills can save you several hours of work each week afterward. What matters is consistent improvement, not a perfect start."},{category:"basic",q:"오케스트레이터는 별도의 프로그램인가요?",qEn:"Is the orchestrator a separate program?",a:'아닙니다. 오케스트레이터는 Claude Code 세션 자체입니다. CLAUDE.md에 "너는 오케스트레이터 역할을 한다"고 정의하고 Task 도구 사용 권한을 부여하면, 그 세션이 오케스트레이터로 동작합니다. 별도 서버나 소프트웨어 없이 마크다운 파일만으로 구현됩니다.',aEn:'No. The orchestrator is the Claude Code session itself. Define "you are the orchestrator" in CLAUDE.md and grant Task tool permissions — that session acts as the orchestrator. No separate server or software needed, just markdown files.'},{category:"basic",q:"Harness와 LangChain, AutoGPT 같은 도구의 차이점은?",qEn:"How is Harness different from LangChain or AutoGPT?",a:"LangChain, AutoGPT는 코드로 에이전트를 구성하는 프레임워크입니다. Harness는 마크다운 파일(스킬)로 에이전트를 정의합니다. 코딩 없이 구현 가능하고 버전 관리가 쉽습니다. 반면 복잡한 분기·루프 로직은 코드 기반 프레임워크가 더 유연합니다.",aEn:"LangChain and AutoGPT are code-based agent frameworks. Harness defines agents through markdown skill files — no coding required and easy to version-control. However, code-based frameworks are more flexible for complex branching and loop logic."},{category:"skill",q:"스킬 트리거가 원하는 상황에서 발동되지 않으면?",qEn:"What if a skill trigger doesn't fire when expected?",a:'트리거 문구가 너무 좁거나 Claude가 다른 스킬을 선택했을 수 있습니다. 해결 방법: ① 트리거에 동의어/유사 표현 추가, ② /skill-name으로 명시적 호출, ③ CLAUDE.md 전역 규칙에 "코드 리뷰 요청 시 반드시 /review 사용"처럼 명시. 가장 확실한 방법은 명시적 슬래시 커맨드입니다.',aEn:'The trigger phrase may be too narrow, or Claude may have selected a different skill. Solutions: ① Add synonyms to the trigger, ② Use an explicit /skill-name call, ③ Add to CLAUDE.md: "Always use /review for code review requests." Explicit slash commands are the most reliable approach.'},{category:"skill",q:"여러 프로젝트에서 같은 스킬을 공유하려면?",qEn:"How do I share the same skill across multiple projects?",a:"두 가지 방법이 있습니다. ① 전역 설정: ~/.claude/commands/에 스킬을 저장하면 모든 프로젝트에서 사용 가능합니다. ② Git 서브모듈: 공통 스킬만 별도 저장소로 분리하고 각 프로젝트에서 서브모듈로 연결합니다. 조직 전체 공유에는 서브모듈 방식이 적합합니다.",aEn:"Two approaches: ① Global config: Save skills in ~/.claude/commands/ to use across all projects. ② Git submodule: Separate common skills into a dedicated repo and link each project via submodule. The submodule approach is better for organization-wide sharing."},{category:"skill",q:"스킬 파일에 조건 분기 로직을 넣을 수 있나요?",qEn:"Can I add conditional branching logic to skill files?",a:'마크다운은 프로그래밍 언어가 아니어서 if/else 구문은 없습니다. 하지만 "입력이 TypeScript이면 A를 하고, Python이면 B를 하라"처럼 자연어로 조건을 기술할 수 있습니다. Claude가 이를 이해하고 상황에 맞게 행동합니다. 복잡한 분기가 많다면 스킬을 여러 개로 나누는 것이 더 명확합니다.',aEn:`Markdown isn't a programming language, so there's no if/else syntax. But you can describe conditions naturally: "if TypeScript, do A; if Python, do B." Claude understands this and acts accordingly. For many complex branches, splitting into multiple skill files is clearer.`},{category:"team",q:"에이전트 팀의 적정 규모는 몇 명인가요?",qEn:"What is the right size for an agent team?",a:'"2-Pizza Rule"을 적용하세요. 에이전트가 2-6개일 때 가장 효율적입니다. 2개 미만은 팀의 의미가 없고, 7개 이상이면 조율 비용이 급격히 올라갑니다. 처음에는 오케스트레이터 + 2-3개 서브에이전트로 시작하고 필요에 따라 늘리세요.',aEn:'Apply the "2-Pizza Rule." Teams of 2-6 agents are most efficient. Fewer than 2 has no team benefit; 7+ makes coordination costs skyrocket. Start with orchestrator + 2-3 subagents and scale as needed.'},{category:"team",q:"오케스트레이터에는 어떤 모델을 써야 하나요?",qEn:"What model should I use for the orchestrator?",a:"오케스트레이터는 복잡한 판단(작업 분해, 에이전트 선택, 결과 평가)을 담당하므로 가장 강력한 모델(Claude Opus)을 권장합니다. 서브에이전트는 작업 복잡도에 따라 Sonnet(중간 작업), Haiku(단순 작업)를 사용해 비용을 최적화하세요.",aEn:"The orchestrator handles complex judgments (task decomposition, agent selection, result evaluation), so the most capable model (Claude Opus) is recommended. Use Sonnet for medium-complexity tasks and Haiku for simple tasks in subagents to optimize costs."},{category:"team",q:"팬아웃 후 여러 에이전트의 결과를 어떻게 취합하나요?",qEn:"How do I aggregate results from multiple agents after fan-out?",a:"세 가지 패턴이 있습니다. ① 파일 기반: 각 에이전트가 결과를 파일에 저장하고 오케스트레이터가 읽어 통합합니다. ② 직접 반환: 오케스트레이터가 각 Task의 반환값을 수집합니다. ③ 중간 요약: 각 에이전트가 긴 결과를 요약해서 반환합니다. 결과 크기가 크면 파일 기반이 컨텍스트 절약에 유리합니다.",aEn:"Three patterns: ① File-based: Each agent saves results to files; orchestrator reads and integrates. ② Direct return: Orchestrator collects each Task's return value. ③ Intermediate summary: Each agent returns a summarized result. File-based is better for context conservation with large results.",codeKo:`# ① 파일 기반 취합 (권장 — 컨텍스트 절약)

각 서브에이전트:
  Write('tmp/result-1.md', 섹션1 결과)
  Write('tmp/result-2.md', 섹션2 결과)
  Write('tmp/result-3.md', 섹션3 결과)

오케스트레이터:
  r1 = Read('tmp/result-1.md')
  r2 = Read('tmp/result-2.md')
  r3 = Read('tmp/result-3.md')
  Write('final.md', r1 + r2 + r3 통합)

# ② 직접 반환 (소규모 결과)
results = [Task1 반환값, Task2 반환값, Task3 반환값]
final = combine(results)

# ③ 중간 요약 (대용량 처리 시)
각 에이전트가 결과를 3줄 핵심 요약으로 압축 반환`,codeEn:`# ① File-based aggregation (recommended — saves context)

Each subagent:
  Write('tmp/result-1.md', section1 result)
  Write('tmp/result-2.md', section2 result)
  Write('tmp/result-3.md', section3 result)

Orchestrator:
  r1 = Read('tmp/result-1.md')
  r2 = Read('tmp/result-2.md')
  r3 = Read('tmp/result-3.md')
  Write('final.md', merge r1 + r2 + r3)

# ② Direct return (small results)
results = [Task1 return, Task2 return, Task3 return]
final = combine(results)

# ③ Intermediate summary (large outputs)
Each agent returns a 3-line compressed key summary`,codeLang:"text"},{category:"etc",q:"Harness 사용 시 API 비용을 줄이는 방법은?",qEn:"How can I reduce API costs when using Harness?",a:"① 모델 계층화: 오케스트레이터 Opus, 작업 에이전트 Sonnet, 단순 작업 Haiku. ② 컨텍스트 압축: 중간 요약으로 불필요한 이력 제거. ③ 스킬 최적화: 프로그레시브 디스클로저로 스킬 파일 크기 최소화. ④ 결과 캐싱: 반복적인 연구·분석 결과를 파일에 저장해 재사용. 이 방법들을 조합하면 비용을 30-50% 절감할 수 있습니다.",aEn:"① Model tiering: Opus for orchestrator, Sonnet for task agents, Haiku for simple tasks. ② Context compression: Remove unnecessary history with intermediate summaries. ③ Skill optimization: Minimize skill file sizes via progressive disclosure. ④ Result caching: Store repetitive research results in files for reuse. Combining these can reduce costs by 30-50%."},{category:"etc",q:"에이전트가 같은 실수를 반복하면 어떻게 하나요?",qEn:"What do I do if an agent repeatedly makes the same mistake?",a:'반복 실수는 스킬 파일 지침이 불명확하다는 신호입니다. ① 해당 단계에 "절대로 ~하지 말 것" 형태의 명시적 금지사항 추가. ② 올바른 예시와 잘못된 예시를 함께 포함. ③ CLAUDE.md 전역 규칙에 반복 실수 패턴 추가. 그래도 지속되면 그 작업 단계를 더 작은 단위로 분해하세요.',aEn:'Repeated mistakes signal unclear skill file instructions. ① Add explicit prohibitions: "Never do X." ② Include both correct and incorrect examples. ③ Add the mistake pattern to CLAUDE.md global rules. If it persists, break down that task step into smaller units.'},{category:"etc",q:"CLAUDE.md가 너무 길어지면 어떻게 관리하나요?",qEn:"How do I manage CLAUDE.md when it gets too long?",a:"CLAUDE.md가 200줄을 넘으면 분리를 고려하세요. 기본 원칙(프로젝트 목적, 기술 스택, 코딩 컨벤션)만 CLAUDE.md에 유지하고, 특정 작업 지침은 commands/ 폴더의 스킬 파일로 이동합니다. docs/ 폴더에 상세 문서를 만들고 CLAUDE.md에서 @docs/guide.md 형태로 참조하는 방법도 효과적입니다.",aEn:"Consider splitting when CLAUDE.md exceeds 200 lines. Keep only fundamentals (project purpose, tech stack, conventions) in CLAUDE.md; move specific task instructions to skill files in commands/. Creating detailed docs in a docs/ folder and referencing them as @docs/guide.md in CLAUDE.md is also effective."}],f=[{id:"all",ko:"전체",en:"All",icon:"fa-border-all"},{id:"basic",ko:"기초",en:"Basics",icon:"fa-rocket"},{id:"skill",ko:"스킬",en:"Skills",icon:"fa-file-code"},{id:"team",ko:"팀 & 패턴",en:"Team & Patterns",icon:"fa-users"},{id:"etc",ko:"기타",en:"Other",icon:"fa-ellipsis"}];function w(){const{language:d}=h(),[r,m]=l.useState("all"),[n,o]=l.useState(null),s=d==="ko",u=r==="all"?i:i.filter(a=>a.category===r);return e.jsxs(e.Fragment,{children:[e.jsx(g,{title:s?"F&A | Harness Master":"FAQ | Harness Master",description:s?"Harness 학습 중 자주 묻는 질문과 답변을 모아뒀습니다.":"Frequently asked questions and answers collected from Harness learners.",path:"/community/faq"}),e.jsxs("div",{className:"community-page",children:[e.jsxs("div",{className:"community-header",children:[e.jsxs("div",{className:"guide-hero-badge",style:{display:"inline-flex",marginBottom:"1rem"},children:[e.jsx("i",{className:"fa-solid fa-circle-question"}),s?"F&A":"FAQ"]}),e.jsx("h1",{className:"community-title",children:s?"자주 묻는 질문":"Frequently Asked Questions"}),e.jsx("p",{className:"community-desc",children:s?"Harness 학습 중 자주 묻는 질문과 상세한 답변을 모아뒀습니다.":"Collected frequently asked questions with detailed answers from Harness learners."})]}),e.jsx("div",{className:"community-filter",children:f.map(a=>e.jsxs("button",{className:`community-filter-btn ${r===a.id?"active":""}`,onClick:()=>{m(a.id),o(null)},children:[e.jsx("i",{className:`fa-solid ${a.icon}`}),s?a.ko:a.en,e.jsx("span",{className:"community-filter-count",children:a.id==="all"?i.length:i.filter(t=>t.category===a.id).length})]},a.id))}),e.jsxs("div",{className:"info-grid",style:{marginBottom:"2rem"},children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"🚀"}),e.jsx("div",{className:"info-card-title",children:s?"기초 질문":"Basics"}),e.jsx("div",{className:"info-card-desc",children:s?"Harness의 개념, CLAUDE.md와 commands/ 차이, 오케스트레이터 역할 등 핵심 개념 질문":"Core concept questions about Harness, CLAUDE.md vs commands/, orchestrator roles"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"📝"}),e.jsx("div",{className:"info-card-title",children:s?"스킬 설계":"Skill Design"}),e.jsx("div",{className:"info-card-desc",children:s?"스킬 파일 작성 방법, 트리거 설정, 조건 분기, 프로젝트 간 공유 등 실전 질문":"Practical questions about writing skill files, triggers, branching, and cross-project sharing"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"👥"}),e.jsx("div",{className:"info-card-title",children:s?"팀 & 패턴":"Team & Patterns"}),e.jsx("div",{className:"info-card-desc",children:s?"멀티 에이전트 팀 구성, 패턴 선택 기준, 팬아웃 결과 취합 등 아키텍처 질문":"Architecture questions about multi-agent teams, pattern selection, and fan-out result aggregation"})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:"💡"}),e.jsx("div",{className:"info-card-title",children:s?"기타 & 운영":"Other & Ops"}),e.jsx("div",{className:"info-card-desc",children:s?"팀 공유 방법, 구축 소요 시간, API 비용 절감, 반복 실수 해결 등 운영 질문":"Operational questions about team sharing, build time, API cost reduction, and fixing repeated mistakes"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1rem",marginBottom:"2rem"},children:[e.jsx(c,{type:"tip",children:s?"카테고리 필터를 사용하면 관심 분야의 질문만 빠르게 찾을 수 있습니다.":"Use category filters to quickly find questions in your area of interest."}),e.jsx(c,{type:"important",children:s?"코드 예제가 포함된 답변은 실제 프로젝트에 바로 적용할 수 있도록 작성되었습니다.":"Answers with code examples are written to be directly applicable to real projects."})]}),e.jsx("div",{className:"faq-list",children:u.map((a,t)=>e.jsxs("div",{className:`faq-item ${n===t?"open":""}`,children:[e.jsxs("button",{className:"faq-question",onClick:()=>o(n===t?null:t),children:[e.jsx("span",{className:"faq-q-text",children:s?a.q:a.qEn}),e.jsx("i",{className:"fa-solid fa-chevron-down faq-chevron"})]}),n===t&&e.jsxs("div",{className:"faq-answer",children:[e.jsx("p",{children:s?a.a:a.aEn}),a.codeKo&&e.jsxs("div",{className:"code-block",style:{marginTop:"1rem"},children:[e.jsx("div",{className:"code-block-header",children:e.jsx("span",{className:"code-block-lang",children:a.codeLang??"text"})}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:s?a.codeKo:a.codeEn??a.codeKo})})})]}),a.link&&e.jsxs(p,{to:a.link,className:"faq-guide-link",children:[e.jsx("i",{className:"fa-solid fa-book-open"}),s?"관련 가이드 보기":"View related guide",e.jsx("i",{className:"fa-solid fa-arrow-right"})]})]})]},t))}),e.jsxs("div",{className:"faq-cta",children:[e.jsx("i",{className:"fa-solid fa-comments faq-cta-icon"}),e.jsx("h3",{className:"faq-cta-title",children:s?"찾는 질문이 없나요?":"Can't find your question?"}),e.jsx("p",{className:"faq-cta-desc",children:s?"커뮤니티 GitHub Discussions에서 질문하시면 빠르게 답변을 받을 수 있습니다.":"Ask on our GitHub Discussions and get a quick answer from the community."}),e.jsxs("a",{href:"https://github.com/anthropics/claude-code/discussions",target:"_blank",rel:"noopener noreferrer",className:"faq-cta-btn",children:[e.jsx("i",{className:"fa-brands fa-github"}),s?"GitHub Discussions 바로가기":"Go to GitHub Discussions",e.jsx("i",{className:"fa-solid fa-arrow-up-right-from-square"})]})]})]})]})}export{w as default};
