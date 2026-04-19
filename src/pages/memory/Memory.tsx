import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'context',  ko: '컨텍스트 창 이해',   en: 'Context Window' },
  { id: 'strategy', ko: '메모리 관리 전략',   en: 'Memory Strategies' },
  { id: 'agent',    ko: '에이전트 메모리',    en: 'Agent Memory' },
  { id: 'optimize', ko: '컨텍스트 최적화',    en: 'Context Optimization' },
  { id: 'tools',    ko: '메모리 도구',        en: 'Memory Tools' },
  { id: 'longterm', ko: '장기 메모리',        en: 'Long-term Memory' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '컨텍스트 이해',
    labelEn: 'Context',
    items: [
      { id: 'context',  icon: 'fa-window-maximize', ko: '컨텍스트 창 이해',  en: 'Context Window' },
      { id: 'strategy', icon: 'fa-chess',           ko: '메모리 관리 전략',  en: 'Memory Strategies' },
    ],
  },
  {
    label: '에이전트 메모리',
    labelEn: 'Agent Memory',
    items: [
      { id: 'agent',    icon: 'fa-robot',    ko: '에이전트 메모리',  en: 'Agent Memory' },
      { id: 'optimize', icon: 'fa-compress', ko: '컨텍스트 최적화',  en: 'Context Optimization' },
    ],
  },
  {
    label: '도구 & 장기',
    labelEn: 'Tools & Long-term',
    items: [
      { id: 'tools',    icon: 'fa-toolbox', ko: '메모리 도구', en: 'Memory Tools' },
      { id: 'longterm', icon: 'fa-infinity', ko: '장기 메모리', en: 'Long-term Memory' },
    ],
  },
];

export default function Memory(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('context');
  const isKo = language === 'ko';
  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const handleNav = (id: string) => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <SEOHead title={isKo ? '메모리와 컨텍스트 | Harness Master' : 'Memory & Context | Harness Master'} path="/memory" />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
            isKo={isKo}
          />
          <main className="guide-content">
            {activeSection === 'context'  && <ContextSection isKo={isKo} />}
            {activeSection === 'strategy' && <StrategySection isKo={isKo} />}
            {activeSection === 'agent'    && <AgentSection isKo={isKo} />}
            {activeSection === 'optimize' && <OptimizeSection isKo={isKo} />}
            {activeSection === 'tools'    && <ToolsSection isKo={isKo} />}
            {activeSection === 'longterm' && <LongtermSection isKo={isKo} />}
            <div className="guide-section-nav">
              <button className="guide-nav-btn prev" onClick={() => handleNav(SECTIONS[currentIndex-1].id)} disabled={currentIndex===0}>
                <i className="fa-solid fa-arrow-left" />
                <span><small>{isKo ? '이전' : 'Prev'}</small><strong>{currentIndex > 0 ? (isKo ? SECTIONS[currentIndex-1].ko : SECTIONS[currentIndex-1].en) : ''}</strong></span>
              </button>
              <button className="guide-nav-btn next" onClick={() => handleNav(SECTIONS[currentIndex+1].id)} disabled={currentIndex===SECTIONS.length-1}>
                <span><small>{isKo ? '다음' : 'Next'}</small><strong>{currentIndex < SECTIONS.length-1 ? (isKo ? SECTIONS[currentIndex+1].ko : SECTIONS[currentIndex+1].en) : ''}</strong></span>
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function ContextSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '컨텍스트 창 이해' : 'Understanding Context Window'}</h1>
        <p>{isKo ? 'AI 에이전트의 핵심 제약인 컨텍스트 창의 개념과 한계를 이해합니다.' : 'Understand the concept and limitations of the context window, a core constraint of AI agents.'}</p>
      </div>
      <h2>{isKo ? '컨텍스트 창이란?' : 'What is a Context Window?'}</h2>
      <p>{isKo ? '컨텍스트 창(Context Window)은 AI 에이전트가 한 번의 처리에서 고려할 수 있는 정보의 총량입니다. 주방의 작업대에 비유됩니다 — 작업대가 클수록 더 많은 재료를 한 번에 올려놓고 작업할 수 있습니다. 현재 고급 AI 모델의 컨텍스트 창은 수십만 토큰에 달하지만, 이는 여전히 제한적입니다.' : 'The context window is the total amount of information an AI agent can consider in one processing session. Analogous to a kitchen counter — the larger the counter, the more ingredients you can place at once. Current advanced AI models have context windows of hundreds of thousands of tokens, but this is still limited.'}</p>
      <h3>{isKo ? '컨텍스트 창의 구성요소' : 'Context Window Components'}</h3>
      <ul>
        <li><strong>{isKo ? '시스템 프롬프트' : 'System Prompt'}</strong> — {isKo ? '에이전트의 역할과 지침 정의. 항상 컨텍스트를 차지합니다.' : 'Defines agent role and instructions. Always occupies context.'}</li>
        <li><strong>{isKo ? '대화 이력' : 'Conversation History'}</strong> — {isKo ? '이전 메시지들의 누적. 대화가 길어질수록 증가합니다.' : 'Accumulated previous messages. Grows as conversation extends.'}</li>
        <li><strong>{isKo ? '도구 결과' : 'Tool Results'}</strong> — {isKo ? '파일 읽기, 웹 검색 등의 결과. 크기가 예측하기 어렵습니다.' : 'Results of file reads, web searches, etc. Size is unpredictable.'}</li>
        <li><strong>{isKo ? '스킬 파일' : 'Skill Files'}</strong> — {isKo ? '로드된 스킬의 내용. 프로그레시브 디스클로저로 최소화합니다.' : 'Content of loaded skills. Minimized with progressive disclosure.'}</li>
      </ul>
      <TipBox type="important">{isKo ? '컨텍스트 창이 가득 차면 에이전트는 초기 내용을 "망각"하기 시작합니다. 이는 작업 품질 저하로 이어집니다. Harness의 스킬 시스템은 이 문제를 해결하기 위해 설계되었습니다.' : 'When the context window fills up, the agent starts "forgetting" early content, leading to quality degradation. Harness\'s skill system is designed to solve this problem.'}</TipBox>
    </div>
  );
}

function StrategySection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '메모리 관리 전략' : 'Memory Management Strategies'}</h1>
        <p>{isKo ? '컨텍스트 창을 효율적으로 관리하는 핵심 전략들을 배웁니다.' : 'Learn key strategies for efficiently managing the context window.'}</p>
      </div>
      <h2>{isKo ? '4가지 핵심 전략' : '4 Key Strategies'}</h2>
      <ol>
        <li>
          <strong>{isKo ? '압축(Compression)' : 'Compression'}</strong>
          <p>{isKo ? '불필요한 대화 이력을 요약하여 컨텍스트를 줄입니다. 오케스트레이터가 주기적으로 "지금까지의 진행 상황 요약"을 생성하고 세부 이력을 제거합니다.' : 'Reduce context by summarizing unnecessary conversation history. The orchestrator periodically generates a "progress summary" and removes detailed history.'}</p>
        </li>
        <li>
          <strong>{isKo ? '외부화(Externalization)' : 'Externalization'}</strong>
          <p>{isKo ? '중요하지만 자주 참조하지 않는 정보를 파일로 저장합니다. 필요할 때만 파일을 읽어 컨텍스트에 로드합니다.' : 'Store important but infrequently referenced information in files. Load files into context only when needed.'}</p>
        </li>
        <li>
          <strong>{isKo ? '체인지오버(Changeover)' : 'Changeover'}</strong>
          <p>{isKo ? '컨텍스트가 가득 찰 때 새 에이전트 인스턴스를 시작하고 요약본만 전달합니다. 이전 에이전트는 종료됩니다.' : 'Start a new agent instance when context fills up, passing only the summary. The previous agent terminates.'}</p>
        </li>
        <li>
          <strong>{isKo ? '선택적 로딩(Selective Loading)' : 'Selective Loading'}</strong>
          <p>{isKo ? '필요한 정보만 필요한 시점에 컨텍스트에 로드합니다. 프로그레시브 디스클로저가 이 전략을 구현합니다.' : 'Load only necessary information into context at the right time. Progressive disclosure implements this strategy.'}</p>
        </li>
      </ol>
      <h3>{isKo ? '체크포인트 시스템 구현 예시' : 'Checkpoint System Implementation Example'}</h3>
      <p>{isKo ? '아래는 오케스트레이터가 매 10개 작업마다 자동으로 저장하는 체크포인트 파일 구조입니다.' : 'Below is the checkpoint file structure the orchestrator automatically saves every 10 tasks.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">tmp/checkpoint.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "checkpoint_id": "cp-003",
  "timestamp": "2026-04-19T14:22:00Z",
  "tasks_completed": 30,
  "tasks_remaining": 12,
  "context_usage_pct": 68,
  "summary": "인증 모듈 완료, 현재 대시보드 컴포넌트 작업 중",
  "completed_outputs": [
    "src/api/auth.ts",
    "src/api/users.ts",
    "src/components/Login.tsx"
  ],
  "next_task": "src/components/Dashboard.tsx 구현",
  "blockers": []
}`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '긴 작업에서는 중간 점검 시스템을 구축하세요. 예를 들어 매 10개 작업마다 오케스트레이터가 진행 상황을 파일에 저장하고 컨텍스트를 정리합니다.' : 'Build a checkpoint system for long tasks. For example, every 10 tasks the orchestrator saves progress to a file and cleans up context.'}</TipBox>
    </div>
  );
}

function AgentSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '에이전트 메모리' : 'Agent Memory'}</h1>
        <p>{isKo ? '에이전트가 세션 간 정보를 유지하는 메모리 메커니즘을 이해합니다.' : 'Understand the memory mechanisms agents use to maintain information across sessions.'}</p>
      </div>
      <h2>{isKo ? '메모리 유형' : 'Memory Types'}</h2>
      <ul>
        <li><strong>{isKo ? '휘발성 메모리(Volatile Memory)' : 'Volatile Memory'}</strong> — {isKo ? '현재 세션 컨텍스트 창. 세션 종료 시 사라집니다.' : 'Current session context window. Disappears when session ends.'}</li>
        <li><strong>{isKo ? '파일 기반 메모리(File-based Memory)' : 'File-based Memory'}</strong> — {isKo ? 'MEMORY.md, state.json 등 파일로 영구 저장. 세션 간 유지됩니다.' : 'Permanently stored in files like MEMORY.md, state.json. Maintained across sessions.'}</li>
        <li><strong>{isKo ? '데이터베이스 메모리(DB Memory)' : 'Database Memory'}</strong> — {isKo ? 'Supabase, Redis 등 외부 DB 활용. 팀 전체가 공유 가능합니다.' : 'Uses external DBs like Supabase, Redis. Shareable across the entire team.'}</li>
      </ul>
      <h3>{isKo ? 'MEMORY.md 구조' : 'MEMORY.md Structure'}</h3>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">MEMORY.md</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# Agent Memory File

## 프로젝트 상태 (Project Status)
- 현재 단계: [단계명]
- 완료된 작업: [목록]
- 진행 중: [목록]

## 핵심 결정사항 (Key Decisions)
- [결정 1]: [근거]
- [결정 2]: [근거]

## 다음 실행 시 참고 (Notes for Next Run)
- [중요 사항]`}</code></pre>
        </div>
      </div>
      <TipBox type="important">{isKo ? 'MEMORY.md는 간결하게 유지하세요. 너무 많은 내용을 저장하면 메모리 파일 자체가 컨텍스트 부담이 됩니다. 핵심 상태와 결정사항만 기록합니다.' : 'Keep MEMORY.md concise. Storing too much makes the memory file itself a context burden. Only record key state and decisions.'}</TipBox>
    </div>
  );
}

function OptimizeSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '컨텍스트 최적화' : 'Context Optimization'}</h1>
        <p>{isKo ? '컨텍스트 창 사용을 최소화하면서 최대 성능을 내는 기법을 배웁니다.' : 'Learn techniques for maximizing performance while minimizing context window usage.'}</p>
      </div>
      <h2>{isKo ? '컨텍스트 절약 기법' : 'Context Conservation Techniques'}</h2>
      <ul>
        <li><strong>{isKo ? '구조화된 출력' : 'Structured Output'}</strong> — {isKo ? 'JSON, YAML 형식으로 정보를 구조화하면 같은 내용을 더 적은 토큰으로 표현할 수 있습니다.' : 'Structuring information in JSON or YAML format allows the same content to be expressed with fewer tokens.'}</li>
        <li><strong>{isKo ? '참조 기반 방식' : 'Reference-based Approach'}</strong> — {isKo ? '긴 내용을 반복하지 않고 파일 경로나 ID로 참조합니다.' : 'Reference long content by file path or ID instead of repeating it.'}</li>
        <li><strong>{isKo ? '이진 검색 디버깅' : 'Binary Search Debugging'}</strong> — {isKo ? '오류 진단 시 전체 코드 대신 문제 섹션만 점진적으로 좁혀가며 로드합니다.' : 'When debugging errors, progressively narrow down and load only the problematic section instead of the entire code.'}</li>
        <li><strong>{isKo ? '결과 우선 로드' : 'Result-first Loading'}</strong> — {isKo ? '원본 데이터 전체 대신 처리된 결과만 컨텍스트에 유지합니다.' : 'Keep only processed results in context instead of all original data.'}</li>
      </ul>
      <h3>{isKo ? '최적화 전/후 비교 — 에이전트 출력 구조' : 'Before/After Comparison — Agent Output Structure'}</h3>
      <p>{isKo ? '동일한 정보를 전달하는 두 가지 출력 방식을 비교합니다. 구조화된 형식이 컨텍스트를 절반 이하로 줄입니다.' : 'Compare two output methods conveying the same information. Structured format cuts context to less than half.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? '❌ 최적화 전 — 비구조화 출력 (~200 토큰)' : '❌ Before — Unstructured output (~200 tokens)'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`리뷰를 완료했습니다. 파일을 검토한 결과 src/api/auth.ts 파일의
34번째 줄에서 JWT 토큰의 만료 시간이 설정되지 않은 보안 취약점을
발견했습니다. 이것은 높은 심각도의 문제로 즉시 수정이 필요합니다.
수정 방법은 expiresIn 옵션에 '1h'를 추가하는 것입니다. 또한
src/hooks/useUsers.ts의 12번째 줄에서 N+1 쿼리가 발생할 수 있는
중간 심각도의 성능 문제도 발견되었습니다...`}</code></pre>
        </div>
      </div>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">{isKo ? '✅ 최적화 후 — 구조화 JSON 출력 (~80 토큰)' : '✅ After — Structured JSON output (~80 tokens)'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "score": 76,
  "issues": [
    {"severity":"high","file":"src/api/auth.ts","line":34,"fix":"expiresIn:'1h'"},
    {"severity":"medium","file":"src/hooks/useUsers.ts","line":12,"fix":"select 최적화"}
  ]
}`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '컨텍스트 사용량을 모니터링하세요. Claude Code에서 현재 컨텍스트 사용 비율을 확인하고, 80% 이상 시 압축이나 체인지오버를 수행합니다.' : 'Monitor context usage. Check the current context usage ratio in Claude Code and perform compression or changeover when above 80%.'}</TipBox>
    </div>
  );
}

function ToolsSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '메모리 도구' : 'Memory Tools'}</h1>
        <p>{isKo ? 'Harness 메모리 관리에 활용할 수 있는 도구와 서비스를 살펴봅니다.' : 'Explore tools and services available for Harness memory management.'}</p>
      </div>
      <h2>{isKo ? '주요 메모리 도구' : 'Key Memory Tools'}</h2>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo?'도구':'Tool'}</th><th>{isKo?'유형':'Type'}</th><th>{isKo?'적합한 용도':'Best For'}</th></tr></thead>
          <tbody>
            <tr><td>MEMORY.md</td><td>{isKo?'파일 기반':'File-based'}</td><td>{isKo?'프로젝트 상태, 결정사항':'Project state, decisions'}</td></tr>
            <tr><td>state.json</td><td>{isKo?'파일 기반':'File-based'}</td><td>{isKo?'구조화된 상태 데이터':'Structured state data'}</td></tr>
            <tr><td>Supabase</td><td>{isKo?'클라우드 DB':'Cloud DB'}</td><td>{isKo?'팀 공유 메모리, 영구 저장':'Team shared memory, persistent'}</td></tr>
            <tr><td>Redis</td><td>{isKo?'인메모리 DB':'In-memory DB'}</td><td>{isKo?'빠른 캐싱, 임시 상태':'Fast caching, temp state'}</td></tr>
            <tr><td>Vector DB</td><td>{isKo?'벡터 DB':'Vector DB'}</td><td>{isKo?'의미 기반 검색, 장기 메모리':'Semantic search, long-term memory'}</td></tr>
          </tbody>
        </table>
      </div>
      <TipBox type="important">{isKo ? '이 프로젝트(harness-study)는 Supabase를 메모리 백엔드로 사용합니다. hs_ 테이블 접두사로 사용자 프로필과 학습 진행 상황을 저장합니다.' : 'This project (harness-study) uses Supabase as its memory backend. User profiles and learning progress are stored with the hs_ table prefix.'}</TipBox>
    </div>
  );
}

function LongtermSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '장기 메모리' : 'Long-term Memory'}</h1>
        <p>{isKo ? '에이전트가 장기적으로 학습하고 성장하는 장기 메모리 전략을 배웁니다.' : 'Learn long-term memory strategies for agents to learn and grow over time.'}</p>
      </div>
      <h2>{isKo ? '장기 메모리의 중요성' : 'Importance of Long-term Memory'}</h2>
      <p>{isKo ? '단기 메모리(컨텍스트 창)만 사용하는 에이전트는 매 세션마다 처음부터 시작합니다. 장기 메모리를 활용하면 에이전트가 이전 작업에서 학습하고, 반복적인 실수를 피하며, 도메인 특화 지식을 축적할 수 있습니다.' : 'Agents using only short-term memory (context window) start from scratch each session. Long-term memory allows agents to learn from previous work, avoid repetitive mistakes, and accumulate domain-specific knowledge.'}</p>
      <h3>{isKo ? '장기 메모리 구현 패턴' : 'Long-term Memory Implementation Patterns'}</h3>
      <ol>
        <li><strong>{isKo ? '학습 로그(Learning Log)' : 'Learning Log'}</strong> — {isKo ? '각 작업 완료 후 배운 것, 실수한 것을 파일에 기록합니다.' : 'After each task completion, record learnings and mistakes in a file.'}</li>
        <li><strong>{isKo ? '패턴 라이브러리(Pattern Library)' : 'Pattern Library'}</strong> — {isKo ? '반복적으로 유용한 코드 패턴, 해결책을 라이브러리로 구축합니다.' : 'Build a library of repeatedly useful code patterns and solutions.'}</li>
        <li><strong>{isKo ? '벡터 임베딩(Vector Embedding)' : 'Vector Embedding'}</strong> — {isKo ? '과거 작업을 벡터로 변환하여 유사한 새 작업에서 관련 경험을 검색합니다.' : 'Convert past work to vectors to retrieve relevant experience for similar new tasks.'}</li>
      </ol>
      <h3>{isKo ? '학습 로그 파일 예시' : 'Learning Log File Example'}</h3>
      <p>{isKo ? '아래는 에이전트가 매 세션 후 자동으로 업데이트하는 학습 로그 파일입니다. 이 파일이 누적될수록 에이전트는 같은 실수를 반복하지 않게 됩니다.' : 'Below is a learning log file that the agent automatically updates after each session. As this file accumulates, the agent avoids repeating the same mistakes.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/learning-log.md</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# Agent Learning Log

## 2026-04-19 — API 연동 작업
### 배운 것
- Supabase RLS 정책이 없으면 익명 사용자 접근 불가
- TypeScript strict 모드에서 null 체크 필수

### 실수한 것
- .env 파일 없이 빌드 시도 → 환경변수 오류 발생
- 해결: .env.example 파일 먼저 확인 후 복사

### 재사용할 패턴
- Supabase 클라이언트 초기화: createClient() + 타입 제네릭 적용

---

## 2026-04-18 — 컴포넌트 리팩토링
### 배운 것
- React 19에서 use() 훅 활용 시 Suspense 필수
- CSS 변수로 테마 관리하면 다크모드 전환 용이

### 실수한 것
- 컴포넌트 key prop 누락 → 리스트 렌더링 경고
- 해결: map() 시 항상 고유한 key 사용`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '하네스 자체도 진화 메커니즘을 가지고 있습니다. 실제 배포에서 얻은 피드백이 다시 팩토리로 돌아와 다음 세대 하네스를 개선합니다. 이것이 "Self-improving Harness"의 비전입니다.' : 'Harness itself has an evolution mechanism. Feedback from real deployments feeds back into the factory to improve the next generation of Harness. This is the vision of "Self-improving Harness."'}</TipBox>
    </div>
  );
}
