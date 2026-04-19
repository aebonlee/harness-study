import{u as c,j as e,L as o}from"./index-DDKaTnuX.js";import{S as r}from"./SEOHead-vUpK3pzQ.js";import{T as t}from"./TipBox-LHRk00Ml.js";const l=[{step:"01",icon:"fa-rocket",path:"/intro",ko:"기본학습",en:"Basics",descKo:"하네스의 기초 개념, 에이전트, 메모리를 순서대로 학습합니다.",descEn:"Learn the fundamentals: concepts, agents, and memory in order.",color:"var(--color-primary)"},{step:"02",icon:"fa-hands-holding",path:"/patterns",ko:"따라하기",en:"How-to",descKo:"패턴, 스킬 설계, 팀 구성을 직접 따라하며 익힙니다.",descEn:"Follow along with patterns, skill design, and team building.",color:"#10b981"},{step:"03",icon:"fa-flask",path:"/practice",ko:"실전활용",en:"Practice",descKo:"실제 프로젝트에 하네스를 적용하는 실전 사례를 배웁니다.",descEn:"Apply Harness to real projects with hands-on use cases.",color:"#f59e0b"},{step:"04",icon:"fa-graduation-cap",path:"/tutorials",ko:"튜토리얼",en:"Tutorials",descKo:"5개 튜토리얼을 단계별 체크리스트로 완성합니다.",descEn:"Complete 5 guided tutorials with step-by-step checklists.",color:"#8b5cf6"},{step:"05",icon:"fa-hammer",path:"/build",ko:"구축하기",en:"Build",descKo:"나만의 하네스 스킬 라이브러리를 실전으로 구축합니다.",descEn:"Build your personal Harness skill library from scratch.",color:"#ef4444"}],d=[{icon:"fa-layer-group",ko:"3단계 사이드바",en:"3-Level Sidebar",descKo:"그룹 헤더 → 섹션 → 서브섹션 3단계로 구조화된 학습 경로를 제공합니다. 현재 위치를 한눈에 확인하고 원하는 섹션으로 즉시 이동할 수 있습니다. 서브섹션은 활성 섹션에서만 펼쳐져 집중 학습을 돕습니다.",descEn:"Structured 3-level navigation: Group → Section → Sub-section. See your current position at a glance and jump to any section instantly. Sub-sections only expand for the active item, keeping focus clear."},{icon:"fa-circle-check",ko:"진행도 추적",en:"Progress Tracking",descKo:"5개 튜토리얼의 체크리스트 완료 상태를 localStorage에 자동 저장합니다. 브라우저를 닫아도 진행 현황이 유지되며 언제든 이어서 학습할 수 있습니다. 전체 진행률을 퍼센트와 시각적 진행 바로 확인하세요.",descEn:"Auto-saves checklist completion for all 5 tutorials to localStorage. Progress persists after closing the browser so you can continue anytime. View overall progress as a percentage and visual progress bar."},{icon:"fa-language",ko:"한국어 / 영어",en:"KO / EN Bilingual",descKo:"모든 페이지의 텍스트, 코드 주석, 예제까지 한국어와 영어를 즉시 전환합니다. 상단 언어 토글 하나로 전체 사이트 언어가 동시에 변경됩니다. 기술 용어의 원어와 번역어를 비교하며 학습하세요.",descEn:"Instantly switch all text, code comments, and examples between Korean and English. One toggle at the top changes the entire site at once. Compare technical terms in both languages for deeper learning."},{icon:"fa-palette",ko:"테마 커스터마이징",en:"Theme Customization",descKo:"파랑·초록·보라 등 6가지 컬러 테마와 라이트/다크 모드를 지원합니다. 테마 변경은 즉시 전체 사이트에 적용되고 선택이 자동 저장됩니다. 긴 학습 세션에서도 눈의 피로를 줄이는 최적 테마를 선택하세요.",descEn:"Choose from 6 color themes (blue, green, purple, etc.) with light and dark mode. Changes apply instantly site-wide and your preference is saved automatically. Pick the best theme to reduce eye strain in long sessions."},{icon:"fa-users",ko:"커뮤니티",en:"Community",descKo:"자료실(공식 문서·GitHub·영상), Q&A, FAQ, 자유게시판 4개 섹션을 운영합니다. 공식 Anthropic 리소스부터 커뮤니티 팁까지 한 곳에서 찾을 수 있습니다. Supabase 기반 실시간 Q&A로 궁금한 점을 빠르게 해결하세요.",descEn:"Four community sections: Resources (official docs, GitHub, videos), Q&A, FAQ, and Free Board. Find everything from official Anthropic resources to community tips in one place. Resolve questions quickly via Supabase-powered real-time Q&A."},{icon:"fa-code",ko:"실전 코드 예제",en:"Real Code Examples",descKo:"가이드의 모든 개념에 실제 동작하는 스킬 파일과 YAML/JSON 코드 블록을 제공합니다. 50개 이상의 코드 예제에 복사 버튼이 있어 즉시 프로젝트에 적용할 수 있습니다. 단순 설명이 아닌 바로 쓸 수 있는 코드를 목표로 작성되었습니다.",descEn:"Every guide concept includes working skill files and YAML/JSON code blocks. 50+ code examples come with copy buttons for instant use in your project. Written with the goal of providing immediately usable code, not just abstract explanations."}];function p(){const{language:n}=c(),s=n==="ko";return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"About | Harness Master",description:s?"Harness Master는 Claude Code 하네스를 체계적으로 학습하고 나만의 스킬 라이브러리를 구축하는 전문 학습 플랫폼입니다.":"Harness Master is a professional learning platform for mastering Claude Code Harness and building your personal skill library.",path:"/about"}),e.jsx("section",{className:"about-hero",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"guide-hero-badge",style:{display:"inline-flex",marginBottom:"1.5rem"},children:[e.jsx("i",{className:"fa-solid fa-circle-info"}),s?"Harness Master 소개":"About Harness Master"]}),e.jsx("h1",{className:"about-hero-title",children:s?`Claude Code 하네스를 마스터하는
가장 체계적인 방법`:`The Most Systematic Way
to Master Claude Code Harness`}),e.jsx("p",{className:"about-hero-desc",children:s?"Harness Master는 스킬 파일 작성부터 멀티 에이전트 팀 구성, 실전 라이브러리 구축까지 단계별로 안내하는 전문 학습 플랫폼입니다.":"Harness Master guides you step by step — from writing skill files to building multi-agent teams and constructing your own real-world library."}),e.jsxs("div",{className:"about-actions",children:[e.jsxs(o,{to:"/intro",className:"btn btn-primary btn-lg",children:[e.jsx("i",{className:"fa-solid fa-rocket"}),s?"학습 시작하기":"Start Learning"]}),e.jsxs(o,{to:"/tutorials",className:"btn btn-outline btn-lg",children:[e.jsx("i",{className:"fa-solid fa-graduation-cap"}),s?"튜토리얼 보기":"View Tutorials"]})]})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",style:{textAlign:"center",marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-title",children:s?"5단계 학습 경로":"5-Step Learning Path"}),e.jsx("p",{className:"section-subtitle",children:s?"기초 개념부터 나만의 하네스 구축까지 순서대로 따라가세요.":"Follow the path from basic concepts to building your own Harness."})]}),e.jsx("div",{className:"about-path-list",children:l.map(a=>e.jsxs(o,{to:a.path,className:"about-path-card",children:[e.jsx("div",{className:"about-path-step",style:{color:a.color},children:a.step}),e.jsx("div",{className:"about-path-icon",style:{background:`${a.color}18`,color:a.color},children:e.jsx("i",{className:`fa-solid ${a.icon}`})}),e.jsxs("div",{className:"about-path-body",children:[e.jsx("h3",{className:"about-path-name",children:s?a.ko:a.en}),e.jsx("p",{className:"about-path-desc",children:s?a.descKo:a.descEn})]}),e.jsx("i",{className:"fa-solid fa-arrow-right about-path-arrow",style:{color:a.color}})]},a.step))})]})}),e.jsx("section",{className:"section",style:{background:"var(--color-bg-secondary)"},children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",style:{textAlign:"center",marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-title",children:s?"플랫폼 특징":"Platform Features"}),e.jsx("p",{className:"section-subtitle",children:s?"학습 효율을 높이는 다양한 기능을 제공합니다.":"A range of features to maximize your learning efficiency."})]}),e.jsx("div",{className:"info-grid",children:d.map((a,i)=>e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"info-card-icon",children:e.jsx("i",{className:`fa-solid ${a.icon}`})}),e.jsx("div",{className:"info-card-title",children:s?a.ko:a.en}),e.jsx("div",{className:"info-card-desc",children:s?a.descKo:a.descEn})]},i))})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",style:{textAlign:"center",marginBottom:"3rem"},children:[e.jsx("h2",{className:"section-title",children:s?"실전 코드로 바로 확인하세요":"See It in Real Code"}),e.jsx("p",{className:"section-subtitle",children:s?"복사해서 바로 쓸 수 있는 스킬 파일과 팀 설정 예시입니다.":"Skill files and team configs ready to copy and use immediately."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.25rem"},children:[e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:"commands/review.md"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:s?`# 코드 리뷰 스킬

## 역할
제출된 코드를 품질·보안·성능 기준으로 검토합니다.

## 출력 형식
JSON 형식으로 결과 반환:
{ "score": 0-100, "issues": [...] }

## 검토 기준
- 보안: SQL Injection, XSS 취약점
- 성능: N+1 쿼리, 불필요한 렌더링
- 품질: SOLID 원칙, 가독성`:`# Code Review Skill

## Role
Review submitted code for quality, security, and performance.

## Output Format
Return results as JSON:
{ "score": 0-100, "issues": [...] }

## Criteria
- Security: SQL Injection, XSS vulnerabilities
- Performance: N+1 queries, unnecessary renders
- Quality: SOLID principles, readability`})})})]}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"yaml"}),e.jsx("span",{className:"code-block-filename",children:".claude/team-config.yaml"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:`team:
  name: web-dev-team
  purpose: "React + TypeScript 풀스택 개발"

  agents:
    - name: architect-agent
      model: claude-opus-4-6
      role: "시스템 설계 및 기술 결정"
      output: "architecture.md"

    - name: frontend-agent
      model: claude-sonnet-4-6
      role: "React/TypeScript UI 구현"
      input: "architecture.md"

    - name: reviewer-agent
      model: claude-sonnet-4-6
      role: "코드 품질·보안 검토"
      skill: "commands/review.md"`})})})]}),e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-block-header",children:[e.jsx("span",{className:"code-block-lang",children:"markdown"}),e.jsx("span",{className:"code-block-filename",children:".claude/CLAUDE.md"})]}),e.jsx("div",{className:"code-block-body",children:e.jsx("pre",{children:e.jsx("code",{children:s?`# 팬아웃 오케스트레이터

## Role
멀티 에이전트 팀을 조율하는 오케스트레이터.

## Workflow
1. architect-agent에게 설계 위임
2. frontend/backend 동시 실행 (팬아웃)
3. reviewer-agent에게 검토 위임
4. score < 70이면 재작업 요청
5. 모든 결과 tmp/progress.json 기록

## Rules
- 각 에이전트에 이전 단계 결과 전달
- 오류 시 3회 재시도 후 사용자 보고`:`# Fan-out Orchestrator

## Role
Orchestrator coordinating a multi-agent team.

## Workflow
1. Delegate design to architect-agent
2. Run frontend/backend in parallel (fan-out)
3. Delegate review to reviewer-agent
4. If score < 70, request rework
5. Record all results to tmp/progress.json

## Rules
- Pass previous step results to each agent
- Retry 3 times on error, then report to user`})})})]})]})]})}),e.jsx("section",{className:"section",style:{padding:"3rem 0"},children:e.jsx("div",{className:"container",children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1rem"},children:[e.jsx(t,{type:"tip",children:s?"처음이라면 기초 개념 → 에이전트 → 패턴 순서로 학습하세요. 각 가이드는 이전 단계의 지식을 기반으로 구성되어 있습니다.":"If you're new, follow: Basics → Agents → Patterns. Each guide builds upon knowledge from the previous step."}),e.jsx(t,{type:"important",children:s?"모든 가이드와 튜토리얼은 한국어/영어 동시 지원됩니다. 상단의 언어 토글로 전환하세요.":"All guides and tutorials support both Korean and English. Use the language toggle at the top to switch."}),e.jsx(t,{type:"warning",children:s?"Harness 실습을 위해 Claude Code(npm install -g @anthropic-ai/claude-code)가 사전 설치되어 있어야 합니다.":"Claude Code must be pre-installed (npm install -g @anthropic-ai/claude-code) for Harness practice."})]})})}),e.jsx("section",{className:"section cta-section",children:e.jsxs("div",{className:"container",style:{textAlign:"center"},children:[e.jsx("h2",{className:"cta-title",children:s?"지금 바로 시작하세요":"Start Right Now"}),e.jsx("p",{className:"cta-subtitle",style:{marginBottom:"2rem"},children:s?"기초 개념부터 실전 구축까지, Harness Master와 함께합니다.":"From basics to real-world implementation — Harness Master is with you."}),e.jsxs("div",{className:"cta-actions",children:[e.jsxs(o,{to:"/intro",className:"btn btn-primary btn-lg",children:[e.jsx("i",{className:"fa-solid fa-rocket"}),s?"기본학습 시작":"Start Basics"]}),e.jsxs(o,{to:"/build",className:"btn btn-outline btn-lg",children:[e.jsx("i",{className:"fa-solid fa-hammer"}),s?"구축 가이드":"Build Guide"]})]})]})})]})}export{p as default};
