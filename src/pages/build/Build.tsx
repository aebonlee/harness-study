import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'setup',   icon: 'fa-wrench',          ko: '환경 구성',      en: 'Environment Setup' },
  { id: 'skill',   icon: 'fa-file-code',       ko: '첫 스킬 작성',   en: 'Write First Skill' },
  { id: 'team',    icon: 'fa-users',           ko: '팀 아키텍처',    en: 'Team Architecture' },
  { id: 'pattern', icon: 'fa-diagram-project', ko: '패턴 선택',      en: 'Pattern Selection' },
  { id: 'iterate', icon: 'fa-arrows-rotate',   ko: '반복 개선',      en: 'Iterate & Improve' },
  { id: 'library', icon: 'fa-book',            ko: '스킬 라이브러리', en: 'Skill Library' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '준비 & 스킬',
    labelEn: 'Prep & Skills',
    items: [
      {
        id: 'setup', icon: 'fa-wrench', ko: '환경 구성', en: 'Environment Setup',
        subs: [
          { id: 'sub-prereq',  ko: '사전 요구사항', en: 'Prerequisites' },
          { id: 'sub-dir',     ko: '디렉토리 구조', en: 'Directory Layout' },
          { id: 'sub-init',    ko: '초기 설정',     en: 'Initial Setup' },
        ],
      },
      {
        id: 'skill', icon: 'fa-file-code', ko: '첫 스킬 작성', en: 'Write First Skill',
        subs: [
          { id: 'sub-domain',   ko: '도메인 분석', en: 'Domain Analysis' },
          { id: 'sub-template', ko: '스킬 템플릿', en: 'Skill Template' },
          { id: 'sub-example',  ko: '실전 예제',   en: 'Real Example' },
        ],
      },
    ],
  },
  {
    label: '팀 & 패턴',
    labelEn: 'Team & Patterns',
    items: [
      {
        id: 'team', icon: 'fa-users', ko: '팀 아키텍처', en: 'Team Architecture',
        subs: [
          { id: 'sub-worksheet',    ko: '팀 설계 워크시트', en: 'Design Worksheet' },
          { id: 'sub-orchestrator', ko: '오케스트레이터',   en: 'Orchestrator' },
          { id: 'sub-roles',        ko: '에이전트 역할',    en: 'Agent Roles' },
        ],
      },
      {
        id: 'pattern', icon: 'fa-diagram-project', ko: '패턴 선택', en: 'Pattern Selection',
        subs: [
          { id: 'sub-decision', ko: '결정 트리',  en: 'Decision Tree' },
          { id: 'sub-combos',   ko: '패턴 조합',  en: 'Pattern Combos' },
          { id: 'sub-real',     ko: '실전 예제',  en: 'Real Example' },
        ],
      },
    ],
  },
  {
    label: '최적화 & 관리',
    labelEn: 'Optimize & Manage',
    items: [
      {
        id: 'iterate', icon: 'fa-arrows-rotate', ko: '반복 개선', en: 'Iterate & Improve',
        subs: [
          { id: 'sub-metrics', ko: '성능 지표',   en: 'Metrics' },
          { id: 'sub-abtest',  ko: 'A/B 테스트',  en: 'A/B Test' },
          { id: 'sub-cycle',   ko: '개선 사이클', en: 'Improve Cycle' },
        ],
      },
      {
        id: 'library', icon: 'fa-book', ko: '스킬 라이브러리', en: 'Skill Library',
        subs: [
          { id: 'sub-structure', ko: '라이브러리 구조', en: 'Library Structure' },
          { id: 'sub-readme',    ko: 'README 인덱스',   en: 'README Index' },
          { id: 'sub-sharing',   ko: '공유 & 배포',     en: 'Sharing & Deploy' },
        ],
      },
    ],
  },
];

/* ─── Section Components ─── */

function SetupSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <article>
      <header className="guide-hero">
        <div className="guide-hero-badge">
          <i className="fa-solid fa-wrench" />
          {isKo ? '1단계' : 'Step 1'}
        </div>
        <h1 className="guide-hero-title">{isKo ? '환경 구성' : 'Environment Setup'}</h1>
        <p className="guide-hero-desc">
          {isKo
            ? '나만의 하네스를 구축하기 위한 기본 디렉토리 구조와 도구를 설정합니다.'
            : 'Configure the foundational directory structure and tools for your personal Harness.'}
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-list-check" /></span>
          <h2 className="guide-section-title">{isKo ? '사전 요구사항' : 'Prerequisites'}</h2>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-terminal" /></div>
            <h3>Claude Code</h3>
            <p>{isKo ? 'Anthropic Claude Code CLI 설치 및 API 키 설정' : 'Anthropic Claude Code CLI installed with API key configured'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-pen-to-square" /></div>
            <h3>{isKo ? '텍스트 에디터' : 'Text Editor'}</h3>
            <p>{isKo ? 'VS Code, Neovim 등 .md 파일을 편집할 수 있는 에디터' : 'VS Code, Neovim, or any editor capable of editing .md files'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-folder-tree" /></div>
            <h3>{isKo ? '작업 디렉토리' : 'Working Directory'}</h3>
            <p>{isKo ? '하네스를 적용할 실제 프로젝트 폴더 또는 전용 연습 폴더' : 'A real project folder or dedicated practice folder where Harness will be applied'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-brain" /></div>
            <h3>{isKo ? '도메인 지식' : 'Domain Knowledge'}</h3>
            <p>{isKo ? '어떤 작업을 자동화할지에 대한 명확한 아이디어' : 'A clear idea of which tasks you want to automate'}</p>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-folder-tree" /></span>
          <h2 className="guide-section-title">{isKo ? '권장 디렉토리 구조' : 'Recommended Directory Layout'}</h2>
        </div>
        <p className="guide-section-desc">
          {isKo
            ? '스킬 파일은 .claude/commands/ 에, 팀 구성은 .claude/ 루트에 놓습니다.'
            : 'Skill files go in .claude/commands/ and team configs live in the .claude/ root.'}
        </p>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">shell</span>
            <span className="code-block-file">{isKo ? '프로젝트 구조' : 'Project Structure'}</span>
          </div>
          <div className="code-block-body">
            <pre>{`your-project/
├── .claude/
│   ├── CLAUDE.md              # 프로젝트 전역 지침
│   ├── commands/              # 스킬 파일 폴더
│   │   ├── code-review.md     # 코드 리뷰 스킬
│   │   ├── refactor.md        # 리팩터링 스킬
│   │   ├── test-gen.md        # 테스트 생성 스킬
│   │   └── doc-gen.md         # 문서 생성 스킬
│   └── skills/                # 팀 구성 스킬 (선택)
│       └── dev-team.md        # 개발팀 오케스트레이터
├── src/
└── ...`}</pre>
          </div>
        </div>
        <TipBox type="tip" title={isKo ? '팁: CLAUDE.md 활용' : 'Tip: Leverage CLAUDE.md'}>
          {isKo
            ? 'CLAUDE.md는 Claude가 프로젝트를 열 때 자동으로 읽는 파일입니다. 코딩 컨벤션, 아키텍처 결정, 자주 쓰는 명령어를 여기에 정리해두면 매번 설명할 필요가 없습니다.'
            : 'CLAUDE.md is read automatically when Claude opens your project. Document coding conventions, architecture decisions, and common commands here to avoid re-explaining every session.'}
        </TipBox>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-play" /></span>
          <h2 className="guide-section-title">{isKo ? '초기 설정 명령어' : 'Initial Setup Commands'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">bash</span>
          </div>
          <div className="code-block-body">
            <pre>{`# 1. .claude 디렉토리 생성
mkdir -p .claude/commands

# 2. 기본 CLAUDE.md 생성
cat > .claude/CLAUDE.md << 'EOF'
# Project: [프로젝트명]

## 기술 스택
- Language: TypeScript
- Framework: React + Vite
- Test: Vitest

## 코딩 컨벤션
- 함수는 화살표 함수 사용
- 컴포넌트는 PascalCase
- 파일명은 kebab-case

## 주요 명령어
- npm run dev   # 개발 서버
- npm run build # 빌드
- npm test      # 테스트
EOF

# 3. 첫 스킬 파일 생성 (다음 섹션에서 내용 작성)
touch .claude/commands/code-review.md

echo "✅ 하네스 구조 생성 완료"`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-circle-check" /></span>
          <h2 className="guide-section-title">{isKo ? '설정 확인' : 'Verification'}</h2>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{isKo ? '확인 항목' : 'Check Item'}</th>
                <th>{isKo ? '확인 방법' : 'How to Verify'}</th>
                <th>{isKo ? '예상 결과' : 'Expected Result'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Claude Code {isKo ? '설치' : 'installed'}</td>
                <td><code>claude --version</code></td>
                <td>{isKo ? '버전 번호 출력' : 'Version number printed'}</td>
              </tr>
              <tr>
                <td>{isKo ? '디렉토리 생성' : 'Directory created'}</td>
                <td><code>ls .claude/commands</code></td>
                <td>{isKo ? '폴더 목록 표시' : 'Folder contents shown'}</td>
              </tr>
              <tr>
                <td>CLAUDE.md {isKo ? '인식' : 'recognized'}</td>
                <td>{isKo ? 'Claude Code 실행 후 /status' : 'Run Claude Code then /status'}</td>
                <td>{isKo ? 'CLAUDE.md 로드됨 표시' : 'Shows CLAUDE.md loaded'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

function SkillSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <article>
      <header className="guide-hero">
        <div className="guide-hero-badge">
          <i className="fa-solid fa-file-code" />
          {isKo ? '2단계' : 'Step 2'}
        </div>
        <h1 className="guide-hero-title">{isKo ? '첫 스킬 작성' : 'Write Your First Skill'}</h1>
        <p className="guide-hero-desc">
          {isKo
            ? '도메인을 분석하고 재사용 가능한 스킬 파일을 작성하는 방법을 배웁니다.'
            : 'Learn to analyze your domain and write reusable skill files.'}
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-magnifying-glass" /></span>
          <h2 className="guide-section-title">{isKo ? '도메인 분석' : 'Domain Analysis'}</h2>
        </div>
        <p className="guide-section-desc">
          {isKo
            ? '스킬을 작성하기 전에 "무엇을 반복하고 있는가?"를 파악합니다.'
            : 'Before writing a skill, identify "what am I repeating?"'}
        </p>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-repeat" /></div>
            <h3>{isKo ? '반복 작업 목록화' : 'List Repetitive Tasks'}</h3>
            <p>{isKo ? '코드 리뷰, 테스트 작성, PR 설명 작성 등 매번 같은 패턴으로 하는 작업을 나열합니다.' : 'List tasks you do repeatedly with the same pattern: code review, writing tests, PR descriptions, etc.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-trophy" /></div>
            <h3>{isKo ? '높은 가치 작업 선택' : 'Pick High-Value Tasks'}</h3>
            <p>{isKo ? '시간이 많이 걸리고, 자주 하고, 실수가 잦은 작업을 우선 선택합니다.' : 'Prioritize tasks that are time-consuming, frequent, and error-prone.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-ruler" /></div>
            <h3>{isKo ? '명확한 기준 정의' : 'Define Clear Criteria'}</h3>
            <p>{isKo ? '"좋은 코드 리뷰란 무엇인가?"처럼 품질 기준을 언어로 표현할 수 있어야 스킬화할 수 있습니다.' : 'You can only skill-ify something if you can articulate quality criteria like "what makes a good code review?"'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check-double" /></div>
            <h3>{isKo ? '검증 가능성 확인' : 'Check Verifiability'}</h3>
            <p>{isKo ? '결과가 올바른지 당신이 빠르게 확인할 수 있어야 합니다.' : 'You must be able to quickly verify the output is correct.'}</p>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-file-lines" /></span>
          <h2 className="guide-section-title">{isKo ? '스킬 파일 템플릿' : 'Skill File Template'}</h2>
        </div>
        <p className="guide-section-desc">
          {isKo
            ? '모든 스킬 파일은 아래 7가지 섹션을 포함합니다. 각 섹션이 Claude의 행동을 구체적으로 안내합니다.'
            : 'Every skill file includes these 7 sections. Each guides Claude\'s behavior specifically.'}
        </p>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
            <span className="code-block-file">.claude/commands/[skill-name].md</span>
          </div>
          <div className="code-block-body">
            <pre>{`# [스킬명] — [한 줄 요약]

## Trigger
[이 스킬을 언제 호출하는지 정의]
- 명시적 호출: /[skill-name] 또는 @[skill-name]
- 자동 감지: [특정 패턴이나 요청 시 자동 활성화]

## Purpose
[이 스킬이 무엇을 달성하는지 1-3문장으로]

## Core Principles
1. [가장 중요한 원칙]
2. [두 번째 원칙]
3. [세 번째 원칙]

## Steps
1. **[1단계명]**: [상세 설명]
   - [세부 지침 1]
   - [세부 지침 2]

2. **[2단계명]**: [상세 설명]

3. **[3단계명]**: [상세 설명]

## Output Format
[결과물의 구조와 형식을 명시]
- 섹션 1: [내용]
- 섹션 2: [내용]
- 길이: [예상 길이 또는 범위]

## Quality Criteria
- [ ] [품질 기준 1]
- [ ] [품질 기준 2]
- [ ] [품질 기준 3]

## Edge Cases
- **[예외 상황 1]**: [처리 방법]
- **[예외 상황 2]**: [처리 방법]`}</pre>
          </div>
        </div>
        <TipBox type="important" title={isKo ? '핵심: Steps의 세분화 수준' : 'Key: Granularity of Steps'}>
          {isKo
            ? 'Steps는 Claude가 건너뛸 수 없을 만큼 구체적이어야 하지만, 창의성을 억누를 만큼 지나치게 상세하면 안 됩니다. "파일을 분석하라"보다 "함수별 복잡도, 중복 로직, 네이밍 일관성을 순서대로 분석하라"가 좋습니다.'
            : "Steps should be specific enough that Claude can't skip them, but not so detailed they stifle creativity. 'Analyze per-function complexity, then duplicate logic, then naming consistency in that order' beats 'analyze the code'."}
        </TipBox>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-code" /></span>
          <h2 className="guide-section-title">{isKo ? '실전 예제: code-reviewer.md' : 'Real Example: code-reviewer.md'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
            <span className="code-block-file">.claude/commands/code-reviewer.md</span>
          </div>
          <div className="code-block-body">
            <pre>{`# Code Reviewer — 체계적 코드 리뷰

## Trigger
/review 또는 "이 파일 리뷰해줘"

## Purpose
변경된 코드를 4가지 관점(버그, 성능, 보안, 가독성)으로
체계적으로 분석하고 구체적인 개선 제안을 제공합니다.

## Core Principles
1. 칭찬할 점을 먼저 언급한 후 개선점을 제시합니다
2. "나쁘다"가 아닌 "이렇게 하면 더 좋아지는 이유"를 설명합니다
3. 심각도(Critical/Major/Minor)를 명시합니다

## Steps
1. **전체 구조 파악**: 파일/PR의 목적과 변경 범위를 파악합니다
2. **버그 및 로직 검토**: null/undefined 처리, 배열 경계, 비동기 패턴
3. **성능 검토**: 불필요한 렌더링, 메모리 누수, O(n²) 로직
4. **보안 검토**: XSS, SQL 인젝션, 권한 검증 누락
5. **가독성 검토**: 네이밍, 주석, 복잡도
6. **종합 평가**: 심각도별 정리 및 우선순위 제안

## Output Format
### ✅ 잘된 점
### 🔴 Critical (즉시 수정)
### 🟡 Major (이번 PR에 수정 권장)
### 🟢 Minor (선택적 개선)
### 📊 종합 점수: [1-10] / 10

## Quality Criteria
- [ ] 모든 공개 함수에 대한 의견 포함
- [ ] 심각도 레벨 명시
- [ ] 구체적 코드 예시 제공

## Edge Cases
- **테스트 파일**: 테스트 커버리지와 테스트 품질에 집중
- **설정 파일**: 보안 취약점과 하드코딩 값에 집중
- **마이그레이션**: 데이터 무결성과 롤백 전략에 집중`}</pre>
          </div>
        </div>
      </section>
    </article>
  );
}

function TeamSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <article>
      <header className="guide-hero">
        <div className="guide-hero-badge">
          <i className="fa-solid fa-users" />
          {isKo ? '3단계' : 'Step 3'}
        </div>
        <h1 className="guide-hero-title">{isKo ? '팀 아키텍처 설계' : 'Team Architecture Design'}</h1>
        <p className="guide-hero-desc">
          {isKo
            ? '복잡한 작업을 위한 멀티 에이전트 팀을 설계합니다. 오케스트레이터가 전체 흐름을 지휘하고 전문 에이전트들이 각 단계를 수행합니다.'
            : 'Design multi-agent teams for complex tasks. An orchestrator directs the flow while specialist agents handle each step.'}
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-clipboard-list" /></span>
          <h2 className="guide-section-title">{isKo ? '팀 설계 워크시트' : 'Team Design Worksheet'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
            <span className="code-block-file">{isKo ? '팀 설계 워크시트' : 'Team Design Worksheet'}</span>
          </div>
          <div className="code-block-body">
            <pre>{`## 팀 설계 워크시트

### 1. 목표 작업 정의
- 이 팀이 수행할 작업: _______________
- 최종 결과물: _______________

### 2. 병렬화 분석
- 독립적으로 실행 가능한 하위 작업:
  □ _______________
  □ _______________
- 순차적으로 실행해야 하는 하위 작업:
  1. ─── → 2. ─── → 3. ───

### 3. 에이전트 목록
| 이름 | 역할 | 입력 | 출력 |
|------|------|------|------|
|      |      |      |      |

### 4. 오케스트레이터 역할
- 전체 흐름 관리: 예 / 아니오
- 결과 통합 방법: _______________
- 실패 시 대응: _______________`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-sitemap" /></span>
          <h2 className="guide-section-title">{isKo ? '오케스트레이터 스킬 예제' : 'Orchestrator Skill Example'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
            <span className="code-block-file">.claude/skills/dev-team.md</span>
          </div>
          <div className="code-block-body">
            <pre>{`# Dev Team Orchestrator — 개발 작업 풀스택 자동화

## Trigger
/dev-team [작업 설명] 또는 복잡한 기능 구현 요청 시

## Purpose
새로운 기능 구현을 4단계 파이프라인으로 자동화합니다.

## Steps

### Phase 1: 설계 (Architect Agent)
- 요구사항 분석 및 기술 설계
- 데이터 구조와 API 인터페이스 정의
Output: design.md

### Phase 2: 구현 (Developer Agent) — Phase 1 완료 후
- design.md 기반으로 실제 코드 작성
- TypeScript 타입 먼저 정의 후 로직 구현
Output: 소스 파일들

### Phase 3: 테스트 (QA Agent) — Phase 2와 병렬 가능
- 단위 테스트 및 엣지 케이스 작성
Output: *.test.ts 파일들

### Phase 4: 문서화 (Docs Agent) — Phase 2 완료 후
- JSDoc 주석 및 README 업데이트
Output: 업데이트된 문서

## Quality Criteria
- [ ] 모든 Phase 완료 확인
- [ ] 타입 에러 없음
- [ ] 테스트 통과율 80% 이상`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-id-card" /></span>
          <h2 className="guide-section-title">{isKo ? '에이전트 역할 유형' : 'Agent Role Types'}</h2>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{isKo ? '역할' : 'Role'}</th>
                <th>{isKo ? '주요 책임' : 'Responsibility'}</th>
                <th>{isKo ? '이상적인 작업' : 'Ideal For'}</th>
                <th>{isKo ? '피해야 할 것' : 'Avoid'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{isKo ? '오케스트레이터' : 'Orchestrator'}</strong></td>
                <td>{isKo ? '흐름 제어, 에이전트 조율' : 'Flow control, coordination'}</td>
                <td>{isKo ? '복잡한 다단계 작업' : 'Complex multi-step tasks'}</td>
                <td>{isKo ? '직접 구현 작업' : 'Direct implementation'}</td>
              </tr>
              <tr>
                <td><strong>{isKo ? '전문가' : 'Specialist'}</strong></td>
                <td>{isKo ? '특정 도메인 작업' : 'Domain-specific work'}</td>
                <td>{isKo ? '깊은 전문성 필요 작업' : 'Tasks needing deep expertise'}</td>
                <td>{isKo ? '전체 흐름 관리' : 'Managing overall flow'}</td>
              </tr>
              <tr>
                <td><strong>{isKo ? '리뷰어' : 'Reviewer'}</strong></td>
                <td>{isKo ? '품질 검증, 피드백' : 'Quality verification'}</td>
                <td>{isKo ? '결과물 검증' : 'Output validation'}</td>
                <td>{isKo ? '새로운 내용 생성' : 'Generating new content'}</td>
              </tr>
              <tr>
                <td><strong>{isKo ? '통합자' : 'Integrator'}</strong></td>
                <td>{isKo ? '여러 결과 병합' : 'Merging multiple results'}</td>
                <td>{isKo ? '팬아웃 결과 통합' : 'Combining fan-out results'}</td>
                <td>{isKo ? '독립적 생성 작업' : 'Independent generation'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <TipBox type="warning" title={isKo ? '팀 크기 경고' : 'Team Size Warning'}>
          {isKo
            ? '3명 이상의 에이전트가 필요하다고 느껴질 때는 먼저 작업이 정말 복잡한지 재확인하세요. 단일 에이전트로 처리 가능한 작업에 팀을 구성하면 오버헤드만 늘어납니다.'
            : "When you feel like you need 3+ agents, first reconsider whether the task is truly complex. Building a team for tasks a single agent can handle only adds overhead."}
        </TipBox>
      </section>
    </article>
  );
}

function PatternSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <article>
      <header className="guide-hero">
        <div className="guide-hero-badge">
          <i className="fa-solid fa-diagram-project" />
          {isKo ? '4단계' : 'Step 4'}
        </div>
        <h1 className="guide-hero-title">{isKo ? '패턴 선택' : 'Pattern Selection'}</h1>
        <p className="guide-hero-desc">
          {isKo
            ? '작업 특성에 맞는 패턴을 선택하고 조합합니다. 올바른 패턴 선택이 효율성의 핵심입니다.'
            : 'Select and combine patterns that match your task characteristics. The right pattern is the key to efficiency.'}
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-tree" /></span>
          <h2 className="guide-section-title">{isKo ? '패턴 결정 트리' : 'Pattern Decision Tree'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">text</span>
            <span className="code-block-file">{isKo ? '패턴 선택 가이드' : 'Pattern Selection Guide'}</span>
          </div>
          <div className="code-block-body">
            <pre>{`작업이 있다
│
├─ 단일 작업? ──────────────────────► 단일 에이전트 (스킬만 사용)
│
├─ 순차적 단계로 나눌 수 있다?
│   ├─ 각 단계가 이전 단계 결과 필요? ─► 파이프라인 패턴
│   └─ 단계가 독립적? ───────────────► 팬아웃 패턴 (병렬)
│
├─ 여러 전문가의 의견이 필요?
│   ├─ 각자 독립적으로 작업? ────────► 전문가 풀 패턴
│   └─ 한 명이 만들고 다른 이가 검토? ─► 프로듀서-리뷰어 패턴
│
└─ 복잡하고 계층적?
    ├─ 상위 목표 → 하위 작업 분해 ───► 수퍼바이저 패턴
    └─ 재귀적 분해 필요? ─────────────► 계층적 위임 패턴`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-layer-group" /></span>
          <h2 className="guide-section-title">{isKo ? '패턴 조합 전략' : 'Pattern Combination Strategy'}</h2>
        </div>
        <div className="pattern-grid">
          <div className="pattern-card">
            <div className="pattern-card-header">
              <span className="pattern-card-icon"><i className="fa-solid fa-arrows-split-up-and-left" /></span>
              <h3 className="pattern-card-title">{isKo ? '팬아웃 + 리뷰어' : 'Fan-out + Reviewer'}</h3>
            </div>
            <p>{isKo ? '여러 에이전트가 병렬로 생성하고, 리뷰어가 최선을 선택합니다.' : 'Multiple agents generate in parallel; a reviewer picks the best.'}</p>
            <div className="pattern-card-example">
              <strong>{isKo ? '예시:' : 'Example:'}</strong>
              {isKo ? ' 3가지 UI 시안 생성 → 디자인 리뷰어가 선택' : ' Generate 3 UI mockups → design reviewer selects'}
            </div>
          </div>
          <div className="pattern-card">
            <div className="pattern-card-header">
              <span className="pattern-card-icon"><i className="fa-solid fa-pipe-section" /></span>
              <h3 className="pattern-card-title">{isKo ? '파이프라인 + 팬아웃' : 'Pipeline + Fan-out'}</h3>
            </div>
            <p>{isKo ? '파이프라인의 특정 단계에서 팬아웃으로 병렬 처리 후 다시 합칩니다.' : 'At a pipeline stage, fan out for parallel processing then merge.'}</p>
            <div className="pattern-card-example">
              <strong>{isKo ? '예시:' : 'Example:'}</strong>
              {isKo ? ' 설계 → [병렬 구현] → 통합 → 테스트' : ' Design → [parallel impl] → integrate → test'}
            </div>
          </div>
          <div className="pattern-card">
            <div className="pattern-card-header">
              <span className="pattern-card-icon"><i className="fa-solid fa-user-gear" /></span>
              <h3 className="pattern-card-title">{isKo ? '수퍼바이저 + 전문가 풀' : 'Supervisor + Expert Pool'}</h3>
            </div>
            <p>{isKo ? '수퍼바이저가 작업을 분해하고 필요한 전문가에게 동적으로 할당합니다.' : 'Supervisor decomposes tasks and dynamically assigns to experts.'}</p>
            <div className="pattern-card-example">
              <strong>{isKo ? '예시:' : 'Example:'}</strong>
              {isKo ? ' 대형 리팩터링 → 각 모듈 전문가에게 분배' : ' Large refactor → distribute to module experts'}
            </div>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-pen-to-square" /></span>
          <h2 className="guide-section-title">{isKo ? '실전 예제: 블로그 오케스트레이터' : 'Real Example: Blog Orchestrator'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
            <span className="code-block-file">.claude/commands/blog-orchestrator.md</span>
          </div>
          <div className="code-block-body">
            <pre>{`# Blog Orchestrator — 블로그 포스트 완전 자동화

## Pattern: 파이프라인 (4단계) + 팬아웃 (섹션 작성)

## Steps

### Phase 1: 기획 (단일 에이전트)
- 주제 리서치 및 핵심 포인트 5개 추출
- 목표 독자 분석 및 섹션 구조 확정
Output: outline.md

### Phase 2: 병렬 집필 (팬아웃 패턴)
각 섹션을 동시에 작성:
- 에이전트 A: 서론 + 결론
- 에이전트 B: 기술 섹션 1, 2
- 에이전트 C: 기술 섹션 3, 4
Output: section-[name].md 파일들

### Phase 3: 통합 편집 (단일 에이전트)
- 섹션 병합 및 흐름 확인
- 일관된 어조로 통일, 내부 링크 추가
Output: draft.md

### Phase 4: 최종 검토 (리뷰어 에이전트)
- SEO 최적화 (키워드, 메타 설명)
- 문법/맞춤법 확인
Output: final-post.md + seo-checklist.md`}</pre>
          </div>
        </div>
      </section>
    </article>
  );
}

function IterateSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <article>
      <header className="guide-hero">
        <div className="guide-hero-badge">
          <i className="fa-solid fa-arrows-rotate" />
          {isKo ? '5단계' : 'Step 5'}
        </div>
        <h1 className="guide-hero-title">{isKo ? '반복 개선' : 'Iterate & Improve'}</h1>
        <p className="guide-hero-desc">
          {isKo
            ? '스킬을 측정하고, 비교하고, 개선합니다. 좋은 하네스는 처음부터 완벽하지 않습니다. 반복을 통해 진화합니다.'
            : "A great Harness isn't perfect from day one — it evolves through iteration. Measure, compare, and improve."}
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-chart-line" /></span>
          <h2 className="guide-section-title">{isKo ? '성능 지표' : 'Performance Metrics'}</h2>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{isKo ? '지표' : 'Metric'}</th>
                <th>{isKo ? '측정 방법' : 'How to Measure'}</th>
                <th>{isKo ? '목표값' : 'Target'}</th>
                <th>{isKo ? '개선 방법' : 'Improvement'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{isKo ? '출력 품질' : 'Output Quality'}</strong></td>
                <td>{isKo ? '5점 척도 주관 평가 (10회 사용 후)' : '5-point subjective rating (after 10 uses)'}</td>
                <td>4.0+/5.0</td>
                <td>{isKo ? 'Quality Criteria 강화' : 'Strengthen quality criteria'}</td>
              </tr>
              <tr>
                <td><strong>{isKo ? '일관성' : 'Consistency'}</strong></td>
                <td>{isKo ? '같은 입력에 대한 출력 변동 정도' : 'Output variance for same input'}</td>
                <td>{isKo ? '낮은 변동' : 'Low variance'}</td>
                <td>{isKo ? 'Steps를 더 구체적으로' : 'Make Steps more specific'}</td>
              </tr>
              <tr>
                <td><strong>{isKo ? '컨텍스트 효율' : 'Context Efficiency'}</strong></td>
                <td>{isKo ? '토큰 사용량 vs 출력 가치' : 'Token usage vs output value'}</td>
                <td>{isKo ? '높은 가치/토큰 비율' : 'High value/token ratio'}</td>
                <td>{isKo ? '불필요한 Steps 제거' : 'Remove unnecessary steps'}</td>
              </tr>
              <tr>
                <td><strong>{isKo ? '트리거 정확도' : 'Trigger Accuracy'}</strong></td>
                <td>{isKo ? '의도한 상황에서만 활성화되는가' : 'Activates only when intended?'}</td>
                <td>95%+</td>
                <td>{isKo ? 'Trigger 조건 명확화' : 'Clarify trigger conditions'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-vials" /></span>
          <h2 className="guide-section-title">{isKo ? 'A/B 테스트 프로세스' : 'A/B Test Process'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
          </div>
          <div className="code-block-body">
            <pre>{`## A/B 테스트: 스킬 버전 비교

### 준비
1. 현재 버전을 code-reviewer-v1.md 로 복사
2. 개선 가설 작성: "Steps에 우선순위를 추가하면 더 유용한 리뷰가 나올 것"
3. code-reviewer-v2.md 에 변경사항 적용

### 실행
- 같은 코드 파일을 두 버전에 각각 적용
- 5회 이상 실행하여 결과 수집

### 평가
| 기준           | v1 평균 | v2 평균 | 승자 |
|----------------|---------|---------|------|
| 품질 (1-5)     |         |         |      |
| 구체성 (1-5)   |         |         |      |
| 실행 가능성    |         |         |      |

### 결정
- v2가 2개 이상 지표에서 우위: v2 채택
- 결과 혼재: 추가 가설 수립 후 재실험
- v1 우위: 가설 폐기, 다른 방향 탐색`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-calendar-check" /></span>
          <h2 className="guide-section-title">{isKo ? '월간 개선 사이클' : 'Monthly Improvement Cycle'}</h2>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-1" /></div>
            <h3>{isKo ? '1주차: 수집' : 'Week 1: Collect'}</h3>
            <p>{isKo ? '매 사용 후 짧은 메모 작성: "이번 출력에서 불만족스러운 점은?"' : 'After each use, write a brief note: "What was unsatisfying about this output?"'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-2" /></div>
            <h3>{isKo ? '2주차: 분석' : 'Week 2: Analyze'}</h3>
            <p>{isKo ? '수집된 피드백에서 패턴 찾기. 가장 자주 나타나는 문제 3가지 선택.' : 'Find patterns in collected feedback. Select the top 3 recurring issues.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-3" /></div>
            <h3>{isKo ? '3주차: 실험' : 'Week 3: Experiment'}</h3>
            <p>{isKo ? '각 문제에 대한 개선 가설을 세우고 A/B 테스트 실시.' : 'Form improvement hypotheses for each issue and run A/B tests.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-4" /></div>
            <h3>{isKo ? '4주차: 적용' : 'Week 4: Apply'}</h3>
            <p>{isKo ? '효과 있는 변경사항을 스킬에 반영하고 라이브러리를 업데이트.' : 'Apply effective changes to skills and update your library.'}</p>
          </div>
        </div>
        <TipBox type="tip" title={isKo ? '개선 팁: 작은 변화 하나씩' : 'Tip: One Change at a Time'}>
          {isKo
            ? '스킬을 개선할 때 여러 가지를 한 번에 바꾸지 마세요. 무엇이 효과를 냈는지 알 수 없게 됩니다. 한 번에 한 가지만 변경하고, 5회 이상 테스트한 후 다음 변경으로 넘어가세요.'
            : "Don't change multiple things at once when improving a skill — you won't know what worked. Change one thing, test at least 5 times, then move to the next."}
        </TipBox>
      </section>
    </article>
  );
}

function LibrarySection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <article>
      <header className="guide-hero">
        <div className="guide-hero-badge">
          <i className="fa-solid fa-book" />
          {isKo ? '6단계' : 'Step 6'}
        </div>
        <h1 className="guide-hero-title">{isKo ? '스킬 라이브러리 구축' : 'Build Your Skill Library'}</h1>
        <p className="guide-hero-desc">
          {isKo
            ? '개인 하네스를 체계적으로 관리하고 팀과 공유하기 위한 스킬 라이브러리를 구축합니다.'
            : 'Build a systematically managed skill library to share your personal Harness with your team.'}
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-folder-open" /></span>
          <h2 className="guide-section-title">{isKo ? '라이브러리 디렉토리 구조' : 'Library Directory Structure'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">shell</span>
          </div>
          <div className="code-block-body">
            <pre>{`.claude/
├── CLAUDE.md
├── commands/
│   ├── dev/
│   │   ├── code-review.md
│   │   ├── refactor.md
│   │   ├── test-gen.md
│   │   └── debug.md
│   ├── content/
│   │   ├── blog-post.md
│   │   └── doc-gen.md
│   └── analysis/
│       ├── data-analysis.md
│       └── perf-review.md
├── teams/
│   ├── dev-team.md
│   └── content-team.md
└── archive/
    └── old-review-v1.md`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-list" /></span>
          <h2 className="guide-section-title">{isKo ? 'README 인덱스 작성' : 'Writing a README Index'}</h2>
        </div>
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">markdown</span>
            <span className="code-block-file">.claude/README.md</span>
          </div>
          <div className="code-block-body">
            <pre>{`# [프로젝트명] 하네스 라이브러리

## 빠른 시작
\`/code-review\`  — 코드 리뷰
\`/refactor\`     — 리팩터링 제안
\`/test-gen\`     — 테스트 자동 생성
\`/dev-team\`     — 전체 기능 구현 팀

## 스킬 목록

### 개발 스킬
| 스킬 | 파일 | 설명 | 상태 |
|------|------|------|------|
| /code-review | dev/code-review.md | 4관점 코드 리뷰 | ✅ 안정 |
| /refactor | dev/refactor.md | 리팩터링 제안 | ✅ 안정 |
| /test-gen | dev/test-gen.md | 단위 테스트 생성 | 🔧 개선 중 |

### 콘텐츠 스킬
| 스킬 | 파일 | 설명 | 상태 |
|------|------|------|------|
| /blog-post | content/blog-post.md | 블로그 포스트 | ✅ 안정 |

## 팀 오케스트레이터
| 팀 | 패턴 | 사용 시나리오 |
|----|------|---------------|
| dev-team | 파이프라인 | 새 기능 구현 |
| content-team | 팬아웃 | 대규모 문서 작성 |`}</pre>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-brands fa-git-alt" /></span>
          <h2 className="guide-section-title">{isKo ? '버전 관리 및 공유' : 'Version Control & Sharing'}</h2>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{isKo ? '공유 범위' : 'Sharing Scope'}</th>
                <th>{isKo ? '방법' : 'Method'}</th>
                <th>{isKo ? '적합한 경우' : 'Best For'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{isKo ? '개인' : 'Personal'}</td>
                <td>{isKo ? '로컬 .claude/ 폴더' : 'Local .claude/ folder'}</td>
                <td>{isKo ? '개인 프로젝트, 실험' : 'Personal projects, experiments'}</td>
              </tr>
              <tr>
                <td>{isKo ? '프로젝트 팀' : 'Project Team'}</td>
                <td>{isKo ? 'Git 저장소에 .claude/ 커밋' : 'Commit .claude/ to Git repo'}</td>
                <td>{isKo ? '팀 공유, 버전 관리' : 'Team sharing, version control'}</td>
              </tr>
              <tr>
                <td>{isKo ? '조직 전체' : 'Organization'}</td>
                <td>{isKo ? '전용 스킬 저장소 + 서브모듈' : 'Dedicated skill repo + submodule'}</td>
                <td>{isKo ? '대규모 조직, 표준화' : 'Large orgs, standardization'}</td>
              </tr>
              <tr>
                <td>{isKo ? '커뮤니티' : 'Community'}</td>
                <td>{isKo ? '공개 GitHub 저장소' : 'Public GitHub repository'}</td>
                <td>{isKo ? '오픈소스, 생태계 기여' : 'Open source, ecosystem contribution'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-header">
          <span className="guide-section-icon"><i className="fa-solid fa-flag-checkered" /></span>
          <h2 className="guide-section-title">{isKo ? '완성 체크리스트' : 'Completion Checklist'}</h2>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check" /></div>
            <h3>{isKo ? '기반 구조' : 'Foundation'}</h3>
            <p>{isKo ? '.claude/ 디렉토리 + CLAUDE.md + commands/ 폴더 존재' : '.claude/ directory + CLAUDE.md + commands/ folder exist.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check" /></div>
            <h3>{isKo ? '핵심 스킬' : 'Core Skills'}</h3>
            <p>{isKo ? '도메인의 반복 작업 상위 3가지가 스킬 파일로 존재' : 'Top 3 repetitive domain tasks exist as skill files.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check" /></div>
            <h3>{isKo ? '팀 구성' : 'Team Setup'}</h3>
            <p>{isKo ? '복잡한 작업을 위한 팀 오케스트레이터가 최소 1개 존재' : 'At least one team orchestrator exists for complex tasks.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check" /></div>
            <h3>{isKo ? '문서화' : 'Documentation'}</h3>
            <p>{isKo ? 'README.md에 모든 스킬 목록과 사용법 정리' : 'README.md contains all skill listings and usage instructions.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check" /></div>
            <h3>{isKo ? '버전 관리' : 'Version Control'}</h3>
            <p>{isKo ? 'CHANGELOG.md가 있고 스킬 변경 이력 기록됨' : 'CHANGELOG.md exists and skill change history is recorded.'}</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon"><i className="fa-solid fa-check" /></div>
            <h3>{isKo ? '개선 루프' : 'Improvement Loop'}</h3>
            <p>{isKo ? '월 1회 이상 스킬 성능 평가 및 개선 루틴 존재' : 'A routine to evaluate and improve skills at least monthly.'}</p>
          </div>
        </div>
        <TipBox type="important" title={isKo ? '하네스는 도구가 아닌 습관입니다' : 'Harness Is a Habit, Not a Tool'}>
          {isKo
            ? '하네스의 가치는 스킬 파일의 수가 아니라 사용 빈도에서 나옵니다. 매일 쓰는 스킬 3개가 한 달에 한 번 쓰는 스킬 30개보다 훨씬 가치 있습니다. 작게 시작하고, 자주 사용하고, 꾸준히 개선하세요.'
            : "Harness value comes from usage frequency, not skill count. 3 skills used daily are far more valuable than 30 used once a month. Start small, use often, improve consistently."}
        </TipBox>
      </section>
    </article>
  );
}

/* ─── Main Component ─── */

export default function Build(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('setup');
  const isKo = language === 'ko';
  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);

  const handleNav = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title={isKo ? '나만의 하네스 구축하기 | Harness Master' : 'Build Your Harness | Harness Master'}
        description={isKo
          ? '실전 단계별 가이드로 나만의 하네스를 구축합니다. 환경 설정부터 스킬 라이브러리 완성까지.'
          : 'Build your personal Harness with a step-by-step practical guide. From environment setup to a complete skill library.'}
        path="/build"
      />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
            isKo={isKo}
          />
          <main className="guide-content">
            {activeSection === 'setup'   && <SetupSection isKo={isKo} />}
            {activeSection === 'skill'   && <SkillSection isKo={isKo} />}
            {activeSection === 'team'    && <TeamSection isKo={isKo} />}
            {activeSection === 'pattern' && <PatternSection isKo={isKo} />}
            {activeSection === 'iterate' && <IterateSection isKo={isKo} />}
            {activeSection === 'library' && <LibrarySection isKo={isKo} />}

            {/* Bottom Navigation */}
            <nav className="guide-nav">
              {currentIndex > 0 ? (
                <button
                  className="guide-nav-btn prev"
                  onClick={() => handleNav(SECTIONS[currentIndex - 1].id)}
                >
                  <i className="fa-solid fa-arrow-left" />
                  <span>
                    <small>{isKo ? '이전' : 'Previous'}</small>
                    <strong>{isKo ? SECTIONS[currentIndex - 1].ko : SECTIONS[currentIndex - 1].en}</strong>
                  </span>
                </button>
              ) : <div />}
              {currentIndex < SECTIONS.length - 1 && (
                <button
                  className="guide-nav-btn next"
                  onClick={() => handleNav(SECTIONS[currentIndex + 1].id)}
                >
                  <span>
                    <small>{isKo ? '다음' : 'Next'}</small>
                    <strong>{isKo ? SECTIONS[currentIndex + 1].ko : SECTIONS[currentIndex + 1].en}</strong>
                  </span>
                  <i className="fa-solid fa-arrow-right" />
                </button>
              )}
            </nav>
          </main>
        </div>
      </div>
    </>
  );
}
