import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'pipeline',     ko: '파이프라인 패턴',    en: 'Pipeline' },
  { id: 'fanout',       ko: '팬아웃/팬인',        en: 'Fan-out/Fan-in' },
  { id: 'expert',       ko: '전문가 풀',          en: 'Expert Pool' },
  { id: 'producer',     ko: '생산자-검토자',      en: 'Producer-Reviewer' },
  { id: 'supervisor',   ko: '감독자 패턴',        en: 'Supervisor' },
  { id: 'hierarchical', ko: '계층적 위임',        en: 'Hierarchical Delegation' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '기본 패턴',
    labelEn: 'Basic Patterns',
    items: [
      {
        id: 'pipeline', icon: 'fa-arrow-right-long', ko: '파이프라인 패턴', en: 'Pipeline',
        subs: [
          { id: 'sub-pipeline-struct', ko: '패턴 구조', en: 'Structure' },
          { id: 'sub-pipeline-cases',  ko: '적용 시나리오', en: 'Scenarios' },
          { id: 'sub-pipeline-ex',     ko: '실습 예제', en: 'Practice' },
        ],
      },
      {
        id: 'fanout', icon: 'fa-code-fork', ko: '팬아웃/팬인', en: 'Fan-out/Fan-in',
        subs: [
          { id: 'sub-fanout-struct', ko: '패턴 구조', en: 'Structure' },
          { id: 'sub-fanout-cases',  ko: '적용 시나리오', en: 'Scenarios' },
          { id: 'sub-fanout-ex',     ko: '실습 예제', en: 'Practice' },
        ],
      },
    ],
  },
  {
    label: '전문가 패턴',
    labelEn: 'Advanced Patterns',
    items: [
      { id: 'expert',   icon: 'fa-user-tie',      ko: '전문가 풀',      en: 'Expert Pool' },
      { id: 'producer', icon: 'fa-pen-to-square',  ko: '생산자-검토자',  en: 'Producer-Reviewer' },
    ],
  },
  {
    label: '계층 패턴',
    labelEn: 'Hierarchical',
    items: [
      { id: 'supervisor',   icon: 'fa-eye',     ko: '감독자 패턴', en: 'Supervisor' },
      { id: 'hierarchical', icon: 'fa-sitemap', ko: '계층적 위임', en: 'Hierarchical Delegation' },
    ],
  },
];

export default function Patterns(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('pipeline');
  const isKo = language === 'ko';
  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const handleNav = (id: string) => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSubNav = (subId: string) => {
    setTimeout(() => {
      const el = document.getElementById(subId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      <SEOHead title={isKo ? '6가지 아키텍처 패턴 | Harness Master' : '6 Architectural Patterns | Harness Master'} path="/patterns" />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
            onSubNavigate={handleSubNav}
            isKo={isKo}
          />
          <main className="guide-content">
            {activeSection === 'pipeline'     && <PipelineSection isKo={isKo} />}
            {activeSection === 'fanout'       && <FanoutSection isKo={isKo} />}
            {activeSection === 'expert'       && <ExpertSection isKo={isKo} />}
            {activeSection === 'producer'     && <ProducerSection isKo={isKo} />}
            {activeSection === 'supervisor'   && <SupervisorSection isKo={isKo} />}
            {activeSection === 'hierarchical' && <HierarchicalSection isKo={isKo} />}
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

function PipelineSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '파이프라인 패턴' : 'Pipeline Pattern'}</h1>
        <p>{isKo ? '에이전트들이 순차적으로 작업을 처리하는 가장 기본적인 패턴입니다.' : 'The most fundamental pattern where agents process tasks sequentially.'}</p>
      </div>
      <h2 id="sub-pipeline-struct">{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '파이프라인 패턴에서는 에이전트 A의 출력이 에이전트 B의 입력이 되고, 에이전트 B의 출력이 에이전트 C의 입력이 되는 방식으로 연속적으로 처리됩니다. 제조 공장의 조립 라인과 같습니다.' : 'In the pipeline pattern, Agent A\'s output becomes Agent B\'s input, Agent B\'s output becomes Agent C\'s input, and so on. Like an assembly line in a factory.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? '파이프라인 흐름도' : 'Pipeline Flow'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`입력(Input)
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
    최종 산출물(Output)`}</code></pre>
        </div>
      </div>

      {/* SVG Pipeline Diagram */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <svg viewBox="0 0 520 300" style={{ maxWidth: 520, width: '100%' }} role="img" aria-label={isKo ? '파이프라인 패턴 다이어그램' : 'Pipeline Pattern Diagram'}>
          <defs>
            <marker id="arrow-pat" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto"><polygon points="0 0,10 3.5,0 7" fill="var(--color-primary)" /></marker>
          </defs>
          {/* Stage 1 */}
          <rect x="10" y="10" width="120" height="55" rx="8" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" strokeWidth="2" />
          <text x="70" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-primary)">🔬 Research</text>
          <text x="70" y="52" textAnchor="middle" fontSize="10" fill="var(--color-text-primary)">{isKo ? '조사 에이전트' : 'Research Agent'}</text>
          {/* Arrow 1→2 */}
          <line x1="130" y1="37" x2="190" y2="37" stroke="var(--color-primary)" strokeWidth="2" markerEnd="url(#arrow-pat)" />
          <text x="160" y="28" textAnchor="middle" fontSize="10" fill="var(--color-text-primary)" fontFamily="monospace">research.md</text>
          {/* Stage 2 */}
          <rect x="195" y="10" width="120" height="55" rx="8" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" strokeWidth="2" />
          <text x="255" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-primary)">✍️ Write</text>
          <text x="255" y="52" textAnchor="middle" fontSize="10" fill="var(--color-text-primary)">{isKo ? '작성 에이전트' : 'Writing Agent'}</text>
          {/* Arrow 2→3 */}
          <line x1="315" y1="37" x2="385" y2="37" stroke="var(--color-primary)" strokeWidth="2" markerEnd="url(#arrow-pat)" />
          <text x="350" y="28" textAnchor="middle" fontSize="10" fill="var(--color-text-primary)" fontFamily="monospace">draft.md</text>
          {/* Stage 3 */}
          <rect x="390" y="10" width="120" height="55" rx="8" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" strokeWidth="2" />
          <text x="450" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-primary)">🔍 Review</text>
          <text x="450" y="52" textAnchor="middle" fontSize="10" fill="var(--color-text-primary)">{isKo ? '검토 에이전트' : 'Review Agent'}</text>
          {/* Arrow down from 3 */}
          <line x1="450" y1="65" x2="450" y2="110" stroke="var(--color-primary)" strokeWidth="2" markerEnd="url(#arrow-pat)" />
          <text x="470" y="92" textAnchor="start" fontSize="10" fill="var(--color-text-primary)" fontFamily="monospace">review.json</text>
          {/* Stage 4 */}
          <rect x="390" y="115" width="120" height="55" rx="8" fill="#10b981" opacity="0.35" stroke="#10b981" strokeWidth="2" />
          <text x="450" y="137" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">📝 Edit</text>
          <text x="450" y="157" textAnchor="middle" fontSize="10" fill="var(--color-text-primary)">{isKo ? '편집 에이전트' : 'Editing Agent'}</text>
          {/* Arrow to Output */}
          <line x1="450" y1="170" x2="450" y2="215" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-pat)" />
          {/* Output */}
          <rect x="390" y="220" width="120" height="40" rx="20" fill="#10b981" opacity="0.3" stroke="#10b981" strokeWidth="2" />
          <text x="450" y="245" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">{isKo ? '최종 산출물' : 'Final Output'}</text>
          {/* Side label */}
          <text x="20" y="285" fontSize="10" fill="var(--color-text-primary)">{isKo ? '※ 각 단계의 출력이 다음 단계의 입력이 됩니다' : '※ Each stage output becomes the next stage input'}</text>
        </svg>
      </div>

      <h3 id="sub-pipeline-cases">{isKo ? '적용 시나리오' : 'Application Scenarios'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">📝</div>
          <h4>{isKo ? '콘텐츠 제작' : 'Content Creation'}</h4>
          <p>{isKo ? '연구 → 초안 → 검토 → 최종본' : 'Research → Draft → Review → Final'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📊</div>
          <h4>{isKo ? '데이터 처리' : 'Data Processing'}</h4>
          <p>{isKo ? '수집 → 정제 → 분석 → 보고' : 'Collect → Clean → Analyze → Report'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">💻</div>
          <h4>{isKo ? '소프트웨어 개발' : 'Software Dev'}</h4>
          <p>{isKo ? '설계 → 구현 → 테스트 → 배포' : 'Design → Implement → Test → Deploy'}</p>
        </div>
      </div>
      <h3>{isKo ? '장단점' : 'Pros & Cons'}</h3>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo?'장점':'Pros'}</th><th>{isKo?'단점':'Cons'}</th></tr></thead>
          <tbody>
            <tr><td>{isKo?'구조 단순, 이해하기 쉬움':'Simple structure, easy to understand'}</td><td>{isKo?'병렬 처리 불가':'No parallel processing'}</td></tr>
            <tr><td>{isKo?'각 단계 독립적 최적화 가능':'Each stage independently optimizable'}</td><td>{isKo?'앞 단계 실패 시 전체 중단':'Full stop if earlier stage fails'}</td></tr>
            <tr><td>{isKo?'디버깅 용이':'Easy debugging'}</td><td>{isKo?'순서 의존성':'Order dependency'}</td></tr>
          </tbody>
        </table>
      </div>
      <TipBox type="tip">{isKo ? '파이프라인의 각 단계 사이에 검증 단계를 추가하세요. 앞 단계의 오류가 뒤로 전파되는 것을 방지합니다.' : 'Add a validation step between each pipeline stage. Prevents errors from earlier stages propagating downstream.'}</TipBox>
      <h3 id="sub-pipeline-ex">{isKo ? '실습 예제 — 블로그 포스트 생성 파이프라인' : 'Practice Example — Blog Post Generation Pipeline'}</h3>
      <p>{isKo ? '아래는 CLAUDE.md에 파이프라인 오케스트레이터를 정의하는 예시입니다. 연구 → 초안 → 검토 3단계 파이프라인을 구성합니다.' : 'Below defines a pipeline orchestrator in CLAUDE.md. Sets up a 3-stage pipeline: Research → Draft → Review.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/CLAUDE.md (파이프라인 오케스트레이터)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 블로그 포스트 생성 오케스트레이터

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
- Task (서브에이전트 실행)`}</code></pre>
        </div>
      </div>
    </div>
  );
}

function FanoutSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '팬아웃/팬인 패턴' : 'Fan-out/Fan-in Pattern'}</h1>
        <p>{isKo ? '하나의 작업을 여러 에이전트에게 분배하고 결과를 통합하는 병렬 처리 패턴입니다.' : 'A parallel processing pattern that distributes one task to multiple agents and integrates results.'}</p>
      </div>
      <h2 id="sub-fanout-struct">{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '팬아웃 단계에서 오케스트레이터가 작업을 여러 병렬 에이전트에게 분배합니다. 각 에이전트는 독립적으로 작업을 처리하고, 팬인 단계에서 오케스트레이터가 모든 결과를 수집하여 통합합니다.' : 'In the fan-out phase, the orchestrator distributes tasks to multiple parallel agents. Each agent processes independently, and in the fan-in phase, the orchestrator collects and integrates all results.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? '팬아웃/팬인 흐름도' : 'Fan-out/Fan-in Flow'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`               입력(Input)
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
               최종 산출물`}</code></pre>
        </div>
      </div>
      <h3 id="sub-fanout-cases">{isKo ? '적용 시나리오' : 'Application Scenarios'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🌐</div>
          <h4>{isKo ? '다국어 번역' : 'Multi-language'}</h4>
          <p>{isKo ? '동시에 여러 언어로 번역' : 'Simultaneously translate to multiple languages'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📥</div>
          <h4>{isKo ? '정보 수집 통합' : 'Info Gathering'}</h4>
          <p>{isKo ? '여러 소스에서 정보 수집 후 통합' : 'Gather from multiple sources then integrate'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔎</div>
          <h4>{isKo ? '코드 분석' : 'Code Analysis'}</h4>
          <p>{isKo ? '코드베이스의 여러 모듈 동시 분석' : 'Simultaneous analysis of multiple modules'}</p>
        </div>
      </div>
      <TipBox type="important">{isKo ? '팬아웃 단계에서 분배되는 작업은 서로 독립적이어야 합니다. 작업 간 의존성이 있다면 파이프라인 패턴이 더 적합합니다.' : 'Tasks distributed in the fan-out phase should be independent of each other. If there are dependencies, the pipeline pattern is more appropriate.'}</TipBox>
      <TipBox type="danger">{isKo ? '팬아웃 에이전트 수를 5개 이상으로 늘리면 API 동시 요청 한도에 도달할 수 있습니다. 또한 결과 통합 시 충돌이 발생하므로 동일 파일을 여러 에이전트가 동시에 수정하게 설계하지 마세요.' : 'Scaling to 5+ fan-out agents may hit API concurrency limits. Also avoid designing multiple agents to modify the same file simultaneously, as this causes merge conflicts.'}</TipBox>
      <h3 id="sub-fanout-ex">{isKo ? '실습 예제 — 다국어 문서 생성' : 'Practice Example — Multi-language Document Generation'}</h3>
      <p>{isKo ? '3개 언어(한국어·영어·일본어)로 동시 번역하는 팬아웃 패턴 예시입니다. 각 번역 에이전트가 병렬로 실행됩니다.' : 'A fan-out example that translates to 3 languages (Korean, English, Japanese) simultaneously. Each translation agent runs in parallel.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/commands/translate-all.md</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# translate-all (팬아웃 패턴)
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
- Read / Write`}</code></pre>
        </div>
      </div>
    </div>
  );
}

function ExpertSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '전문가 풀 패턴' : 'Expert Pool Pattern'}</h1>
        <p>{isKo ? '다양한 전문가 에이전트 풀에서 작업에 맞는 전문가를 동적으로 선택하는 패턴입니다.' : 'A pattern that dynamically selects the right specialist from a pool of diverse expert agents.'}</p>
      </div>
      <h2>{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '오케스트레이터는 다양한 전문 에이전트(파이썬 전문가, 보안 전문가, DB 전문가 등)를 풀로 유지합니다. 작업이 들어오면 해당 작업에 가장 적합한 전문가를 선택하여 처리를 위임합니다.' : 'The orchestrator maintains a pool of diverse specialist agents (Python specialist, Security specialist, DB specialist, etc.). When a task arrives, it selects the most appropriate specialist and delegates the processing.'}</p>
      <h3>{isKo ? '적용 시나리오' : 'Application Scenarios'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🔧</div>
          <h4>{isKo ? '코드 리뷰' : 'Code Review'}</h4>
          <p>{isKo ? '다양한 기술 스택을 다루는 코드 리뷰 시스템' : 'Code review system handling diverse tech stacks'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🎧</div>
          <h4>{isKo ? '고객 지원' : 'Customer Support'}</h4>
          <p>{isKo ? '고객 문의를 담당 부서에 라우팅하는 지원 시스템' : 'Route customer queries to responsible departments'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📄</div>
          <h4>{isKo ? '문서 처리' : 'Doc Processing'}</h4>
          <p>{isKo ? '문서 유형에 따른 전문 처리 (법률/기술/마케팅)' : 'Specialized processing by document type'}</p>
        </div>
      </div>
      <h3>{isKo ? '전문가 풀 라우팅 예시' : 'Expert Pool Routing Example'}</h3>
      <p>{isKo ? '코드 리뷰 요청이 들어오면 오케스트레이터가 파일 확장자를 보고 적합한 전문가에게 자동 라우팅합니다.' : 'When a code review request comes in, the orchestrator reads the file extension and auto-routes to the appropriate specialist.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/CLAUDE.md (전문가 풀 오케스트레이터)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 코드 리뷰 전문가 풀 오케스트레이터

## Role
파일 유형을 분석하여 적합한 전문가 에이전트에게 코드 리뷰를 위임합니다.

## Expert Pool
- ts-expert    : TypeScript/React 전문가 (*.ts, *.tsx)
- python-expert: Python/Django 전문가 (*.py)
- sql-expert   : SQL/DB 스키마 전문가 (*.sql, migrations/)
- infra-expert : Docker/CI/CD 전문가 (Dockerfile, *.yml)
- security-expert: 보안 취약점 전문가 (모든 파일)

## Routing Logic
1. 변경된 파일 목록을 확인한다
2. 파일 확장자 및 경로를 기반으로 전문가를 선택한다:
   - *.ts / *.tsx  → ts-expert
   - *.py          → python-expert
   - *.sql         → sql-expert
   - Dockerfile    → infra-expert
3. 선택된 전문가에게 Task 도구로 리뷰를 위임한다
4. 모든 리뷰어 결과를 취합하여 종합 점수를 산출한다
5. security-expert는 항상 실행한다 (모든 변경사항 대상)`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '전문가 풀의 각 에이전트는 자신의 전문 영역을 명확히 정의한 프로필을 가져야 합니다. 오케스트레이터가 이 프로필을 기반으로 최적의 에이전트를 선택합니다.' : 'Each agent in the expert pool should have a clearly defined profile of their specialty. The orchestrator selects the optimal agent based on this profile.'}</TipBox>
    </div>
  );
}

function ProducerSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '생산자-검토자 패턴' : 'Producer-Reviewer Pattern'}</h1>
        <p>{isKo ? '생산 에이전트가 산출물을 만들고, 검토 에이전트가 품질을 보장하는 패턴입니다.' : 'A pattern where a producer agent creates outputs and a reviewer agent ensures quality.'}</p>
      </div>
      <h2>{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '생산자(Producer) 에이전트가 초안이나 코드를 작성합니다. 검토자(Reviewer) 에이전트가 이를 평가하고 피드백을 제공합니다. 필요한 경우 생산자가 수정하고 재검토를 요청합니다. 이 사이클이 반복되어 최종 고품질 산출물이 만들어집니다.' : 'The Producer agent writes drafts or code. The Reviewer agent evaluates and provides feedback. The producer revises and requests re-review if needed. This cycle repeats until a final high-quality output is produced.'}</p>
      <h3>{isKo ? '효과적인 검토 기준 설정' : 'Setting Effective Review Criteria'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🎯</div>
          <h4>{isKo ? '명확성' : 'Clarity'}</h4>
          <p>{isKo ? '검토자가 무엇을 평가해야 하는지 명확히 정의' : 'Clearly define what the reviewer should evaluate'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔬</div>
          <h4>{isKo ? '구체성' : 'Specificity'}</h4>
          <p>{isKo ? '추상적인 "좋음/나쁨" 대신 구체적인 기준 제시' : 'Specific criteria instead of abstract "good/bad"'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">⚡</div>
          <h4>{isKo ? '실행 가능성' : 'Actionability'}</h4>
          <p>{isKo ? '피드백이 구체적인 개선 행동으로 이어질 수 있어야 함' : 'Feedback should lead to concrete improvement actions'}</p>
        </div>
      </div>
      <h3>{isKo ? '생산자-검토자 재시도 사이클 예시' : 'Producer-Reviewer Retry Cycle Example'}</h3>
      <p>{isKo ? '검토자가 점수를 낮게 주면 생산자에게 재작업을 요청하는 사이클 구조입니다. 최대 3회 반복 후 최종 결과를 반환합니다.' : 'A cycle where the reviewer requests rework from the producer for low scores. Returns final result after max 3 iterations.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/CLAUDE.md (생산자-검토자 오케스트레이터)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 생산자-검토자 오케스트레이터

## Role
생산자 에이전트와 검토자 에이전트를 조율하여
고품질 산출물이 나올 때까지 반복 사이클을 관리합니다.

## Agents
- producer-agent : 코드/문서 초안 생성 (Sonnet)
- reviewer-agent : 품질·정확도 검토 후 score 반환 (Sonnet)

## Cycle (최대 3회 반복)

### Round 1
1. producer-agent에게 초안 작성 요청 → tmp/draft.md 저장
2. reviewer-agent에게 검토 요청 → { score, feedback } 반환
3. score ≥ 80이면 → 완료, output/final.md로 이동
4. score < 80이면 → feedback을 producer-agent에게 전달, Round 2

### Round 2
1. producer-agent에게 feedback 기반 개선 요청
2. reviewer-agent 재검토
3. score ≥ 70이면 → 완료 (기준 완화)
4. score < 70이면 → Round 3

### Round 3 (최종)
1. 마지막 개선 시도
2. 점수와 관계없이 현재 결과를 최종 산출물로 사용
3. output/final.md 저장 + 리뷰 이력 output/review-log.json에 기록`}</code></pre>
        </div>
      </div>
      <TipBox type="important">{isKo ? '생산자-검토자 패턴은 Harness A/B 테스트에서 가장 큰 품질 개선을 보인 패턴입니다. 특히 코드 품질과 문서 완성도 측면에서 탁월한 효과를 발휘합니다.' : 'The Producer-Reviewer pattern showed the largest quality improvement in Harness A/B tests, especially in code quality and documentation completeness.'}</TipBox>

      <h3>{isKo ? 'Context Reset — 교대 근무 방식' : 'Context Reset — Shift Work Approach'}</h3>
      <p>{isKo ? 'Anthropic이 공개한 핵심 기법입니다. AI가 긴 작업을 하면 "컨텍스트 불안"으로 품질이 떨어집니다. 해결책: AI 1번이 작업 → 진행 메모 작성 → AI 2번이 메모를 읽고 이어서 작업. 각 AI가 항상 "맑은 머리"로 시작하므로 대충하는 일이 없습니다.' : 'A key technique revealed by Anthropic. Long tasks cause "Context Anxiety" that degrades quality. Solution: AI 1 works → writes progress notes → AI 2 reads notes and continues. Each AI starts with a "fresh mind," preventing quality drops.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">Context Reset Flow</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`Context Reset (교대 근무 방식)
─────────────────────────────────────
AI-1  ▶ 작업 전반부 완료
      ▶ progress.md 작성 (진행 상황 메모)
      ▶ 컨텍스트 종료 ✂️

AI-2  ◀ progress.md 읽기 (맑은 머리로 시작)
      ▶ 작업 후반부 완료
      ▶ 최종 산출물 작성

핵심: 각 AI는 항상 fresh context로 시작
      → 컨텍스트 불안 없이 고품질 유지`}</code></pre>
        </div>
      </div>

      <h3>{isKo ? 'Evaluator 채점 기준표 설계' : 'Evaluator Scoring Rubric Design'}</h3>
      <p>{isKo ? 'Anthropic의 프론트엔드 디자인 실험에서 검증된 채점 기준입니다. AI가 약한 영역에 높은 비중을, AI가 이미 잘하는 영역에 낮은 비중을 배치하는 것이 핵심입니다.' : 'Scoring rubric validated in Anthropic\'s frontend design experiments. The key is assigning high weight to areas where AI is weak, and low weight to areas AI already handles well.'}</p>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo ? '비중' : 'Weight'}</th><th>{isKo ? '기준' : 'Criteria'}</th><th>{isKo ? '설명' : 'Description'}</th></tr></thead>
          <tbody>
            <tr><td><strong>{isKo ? '높음' : 'High'}</strong></td><td>{isKo ? '디자인 품질' : 'Design Quality'}</td><td>{isKo ? '색상·글꼴·레이아웃이 통일된 분위기를 만드는가?' : 'Do colors, fonts, and layout create a unified atmosphere?'}</td></tr>
            <tr><td><strong>{isKo ? '높음' : 'High'}</strong></td><td>{isKo ? '독창성' : 'Originality'}</td><td>{isKo ? 'AI 특유의 "뻔한 패턴"(흰 카드+보라색 그라데이션 등)을 피했는가?' : 'Does it avoid typical AI patterns (white cards + purple gradients)?'}</td></tr>
            <tr><td>{isKo ? '낮음' : 'Low'}</td><td>{isKo ? '완성도' : 'Craft'}</td><td>{isKo ? '글자 크기, 간격 등 기술적 완성도 (AI가 이미 잘함)' : 'Font sizes, spacing — technical polish (AI already does well)'}</td></tr>
            <tr><td>{isKo ? '낮음' : 'Low'}</td><td>{isKo ? '기능성' : 'Functionality'}</td><td>{isKo ? '버튼 찾기, 직관성 등 (AI가 이미 잘함)' : 'Button findability, intuitiveness (AI already does well)'}</td></tr>
          </tbody>
        </table>
      </div>

      <h3>{isKo ? '반복 개선 루프 (5~15회)' : 'Iterative Improvement Loop (5-15 rounds)'}</h3>
      <p>{isKo ? 'Anthropic 실험에서 Generator가 생성 → Evaluator가 Playwright로 실제 페이지를 열어 스크린샷·클릭·스크롤 확인 → 구체적 피드백 → Generator가 개선하는 루프를 5~15회 반복했습니다. 10회차에서 AI가 완전히 새로운 발상으로 전환하는 "창의적 도약"이 관찰되었습니다.' : 'In Anthropic\'s experiments, the loop of Generator creating → Evaluator opening actual pages via Playwright for screenshots/clicks/scrolls → specific feedback → Generator improving was repeated 5-15 times. At round 10, a "creative leap" was observed where AI switched to an entirely new approach.'}</p>
      <TipBox type="tip">{isKo ? '네덜란드 미술관 프로젝트: 9회까지는 깔끔한 다크 테마로 다듬어졌으나, 10회차에서 AI가 CSS로 3D 공간감 있는 "방 탐험형" 미술관을 구현했습니다. 반복되는 "부족하다"는 신호가 창의적 도약을 유도한 것입니다.' : 'Dutch museum project: 9 rounds refined a clean dark theme, but at round 10, the AI implemented a "room exploration" museum with CSS 3D spatial effects. Repeated "not enough" signals triggered a creative leap.'}</TipBox>
    </div>
  );
}

function SupervisorSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '감독자 패턴' : 'Supervisor Pattern'}</h1>
        <p>{isKo ? '상위 감독자 에이전트가 여러 작업자 에이전트를 실시간으로 모니터링하고 개입하는 패턴입니다.' : 'A pattern where a supervisor agent monitors and intervenes with multiple worker agents in real-time.'}</p>
      </div>
      <h2>{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '감독자(Supervisor) 에이전트는 여러 작업자(Worker) 에이전트를 모니터링합니다. 작업자가 오류를 만나거나 도움이 필요할 때 감독자가 개입합니다. 감독자는 또한 작업의 우선순위를 동적으로 조정할 수 있습니다.' : 'The Supervisor agent monitors multiple Worker agents. When workers encounter errors or need help, the supervisor intervenes. The supervisor can also dynamically adjust task priorities.'}</p>
      <h3>{isKo ? '적용 시나리오' : 'Application Scenarios'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">⏱️</div>
          <h4>{isKo ? '장시간 작업' : 'Long-running Tasks'}</h4>
          <p>{isKo ? '장시간 실행되는 복잡한 작업의 모니터링' : 'Monitoring long-running complex tasks'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🚨</div>
          <h4>{isKo ? '미션 크리티컬' : 'Mission Critical'}</h4>
          <p>{isKo ? '오류 복구가 중요한 미션 크리티컬 워크플로우' : 'Error recovery for mission-critical workflows'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔀</div>
          <h4>{isKo ? '동적 우선순위' : 'Dynamic Priority'}</h4>
          <p>{isKo ? '동적으로 우선순위가 변경되는 작업 환경' : 'Environments where priorities change dynamically'}</p>
        </div>
      </div>
      <h3>{isKo ? '감독자 모니터링 상태 파일 예시' : 'Supervisor Monitoring State File Example'}</h3>
      <p>{isKo ? '감독자 에이전트가 작업자들의 상태를 주기적으로 기록하는 파일입니다. 이상 감지 시 자동 개입 트리거로 활용합니다.' : 'A file where the supervisor agent periodically records worker status. Used as an auto-intervention trigger on anomaly detection.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">tmp/supervisor-state.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "supervisor": "build-supervisor",
  "last_check": "2026-04-19T15:10:00Z",
  "workers": [
    {
      "id": "frontend-agent",
      "status": "running",
      "task": "Dashboard 컴포넌트 구현",
      "progress_pct": 60,
      "elapsed_min": 12,
      "timeout_min": 30,
      "errors": 0
    },
    {
      "id": "backend-agent",
      "status": "stuck",
      "task": "Auth API 구현",
      "progress_pct": 40,
      "elapsed_min": 28,
      "timeout_min": 30,
      "errors": 2,
      "last_error": "TypeScript strict mode 타입 오류"
    }
  ],
  "interventions": [
    {
      "time": "2026-04-19T15:08:00Z",
      "target": "backend-agent",
      "action": "TypeScript 오류 힌트 제공",
      "result": "진행 재개"
    }
  ]
}`}</code></pre>
        </div>
      </div>
      <TipBox type="warning">{isKo ? '감독자 패턴은 시스템 복잡도를 높입니다. 단순한 작업에는 오버엔지니어링이 될 수 있으므로, 정말 감독이 필요한 복잡한 시나리오에서만 사용하세요.' : 'The supervisor pattern increases system complexity. It can be over-engineering for simple tasks, so only use it for complex scenarios that truly need supervision.'}</TipBox>
    </div>
  );
}

function HierarchicalSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '계층적 위임 패턴' : 'Hierarchical Delegation Pattern'}</h1>
        <p>{isKo ? '상위 에이전트가 하위 에이전트에게 작업을 위임하는 트리 구조 패턴입니다.' : 'A tree-structure pattern where higher-level agents delegate tasks to lower-level agents.'}</p>
      </div>
      <h2>{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '최상위 오케스트레이터가 중간 관리자 에이전트들에게 큰 작업을 위임합니다. 중간 관리자들은 다시 실무 에이전트들에게 세부 작업을 위임합니다. 이 계층 구조는 매우 복잡한 대규모 프로젝트에 적합합니다.' : 'The top-level orchestrator delegates large tasks to middle-manager agents. Middle managers further delegate detailed tasks to worker agents. This hierarchy is suitable for very complex large-scale projects.'}</p>
      <h3>{isKo ? '계층 설계 원칙' : 'Hierarchy Design Principles'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">📐</div>
          <h4>{isKo ? '적절한 깊이' : 'Appropriate Depth'}</h4>
          <p>{isKo ? '3계층 이상은 복잡도 급증. 대부분 2계층으로 충분합니다.' : 'Over 3 levels increases complexity. 2 levels suffice for most cases.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🏷️</div>
          <h4>{isKo ? '명확한 위임 경계' : 'Clear Boundaries'}</h4>
          <p>{isKo ? '각 계층이 무엇을 담당하는지 명확히 정의합니다.' : 'Clearly define each layer\'s responsibilities.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📈</div>
          <h4>{isKo ? '결과 집계 전략' : 'Aggregation Strategy'}</h4>
          <p>{isKo ? '하위 계층 결과를 상위 계층으로 집계하는 방법을 사전 정의합니다.' : 'Pre-define how to aggregate lower-layer results upward.'}</p>
        </div>
      </div>
      <h3>{isKo ? '계층적 위임 구조 예시 — 대규모 웹앱 개발' : 'Hierarchical Delegation Structure — Large-scale Web App'}</h3>
      <p>{isKo ? '최상위 오케스트레이터가 두 중간 관리자에게 위임하고, 각 관리자가 다시 작업자들에게 위임하는 2계층 구조입니다.' : 'A 2-level structure where the top orchestrator delegates to two managers, each of whom delegates to workers.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? '2계층 위임 구조도' : '2-Level Delegation Diagram'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`                  ┌────────────────────┐
                  │  최상위 오케스트레이터  │  (Opus)
                  │  Top Orchestrator   │  전체 목표 관리
                  └────────┬───────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
  ┌───────────────────┐     ┌───────────────────┐
  │  프론트엔드 관리자  │     │  백엔드 관리자      │  (Sonnet)
  │  Frontend Manager │     │  Backend Manager  │
  └──┬────────────────┘     └──┬────────────────┘
     │                         │
  ┌──┴──────┐           ┌──────┴─────┐
  │         │           │            │
  ▼         ▼           ▼            ▼
┌──────┐ ┌──────┐  ┌──────┐    ┌──────┐
│UI    │ │State │  │API   │    │DB    │  (Haiku)
│Agent │ │Agent │  │Agent │    │Agent │
└──────┘ └──────┘  └──────┘    └──────┘

※ 각 관리자는 자신의 팀에 팬아웃 패턴을 적용하여 병렬 처리`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '계층적 위임 패턴은 팬아웃 패턴과 결합하면 매우 강력합니다. 중간 관리자 계층에서 팬아웃을 사용하여 병렬 처리를 극대화할 수 있습니다.' : 'Hierarchical delegation combined with the fan-out pattern is very powerful. Using fan-out at the middle manager layer maximizes parallel processing.'}</TipBox>
    </div>
  );
}
