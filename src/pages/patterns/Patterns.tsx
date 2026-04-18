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

  return (
    <>
      <SEOHead title={isKo ? '6가지 아키텍처 패턴 | Harness Master' : '6 Architectural Patterns | Harness Master'} path="/patterns" />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
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
                <i className="fa-solid fa-arrow-left" /><span>{currentIndex>0?(isKo?SECTIONS[currentIndex-1].ko:SECTIONS[currentIndex-1].en):(isKo?'이전':'Prev')}</span>
              </button>
              <button className="guide-nav-btn next" onClick={() => handleNav(SECTIONS[currentIndex+1].id)} disabled={currentIndex===SECTIONS.length-1}>
                <span>{currentIndex<SECTIONS.length-1?(isKo?SECTIONS[currentIndex+1].ko:SECTIONS[currentIndex+1].en):(isKo?'다음':'Next')}</span><i className="fa-solid fa-arrow-right" />
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
      <h2>{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '파이프라인 패턴에서는 에이전트 A의 출력이 에이전트 B의 입력이 되고, 에이전트 B의 출력이 에이전트 C의 입력이 되는 방식으로 연속적으로 처리됩니다. 제조 공장의 조립 라인과 같습니다.' : 'In the pipeline pattern, Agent A\'s output becomes Agent B\'s input, Agent B\'s output becomes Agent C\'s input, and so on. Like an assembly line in a factory.'}</p>
      <p className="flow-diagram">
        {isKo ? '연구 에이전트 → 작성 에이전트 → 검토 에이전트 → 편집 에이전트' : 'Research Agent → Writing Agent → Review Agent → Editing Agent'}
      </p>
      <h3>{isKo ? '적용 시나리오' : 'Application Scenarios'}</h3>
      <ul>
        <li>{isKo ? '콘텐츠 제작 (연구 → 초안 → 검토 → 최종본)' : 'Content creation (Research → Draft → Review → Final)'}</li>
        <li>{isKo ? '데이터 처리 파이프라인 (수집 → 정제 → 분석 → 보고)' : 'Data processing pipeline (Collect → Clean → Analyze → Report)'}</li>
        <li>{isKo ? '소프트웨어 개발 (설계 → 구현 → 테스트 → 배포)' : 'Software development (Design → Implement → Test → Deploy)'}</li>
      </ul>
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
      <h2>{isKo ? '패턴 구조' : 'Pattern Structure'}</h2>
      <p>{isKo ? '팬아웃 단계에서 오케스트레이터가 작업을 여러 병렬 에이전트에게 분배합니다. 각 에이전트는 독립적으로 작업을 처리하고, 팬인 단계에서 오케스트레이터가 모든 결과를 수집하여 통합합니다.' : 'In the fan-out phase, the orchestrator distributes tasks to multiple parallel agents. Each agent processes independently, and in the fan-in phase, the orchestrator collects and integrates all results.'}</p>
      <h3>{isKo ? '적용 시나리오' : 'Application Scenarios'}</h3>
      <ul>
        <li>{isKo ? '다국어 번역 (동시에 여러 언어로 번역)' : 'Multi-language translation (simultaneously translate to multiple languages)'}</li>
        <li>{isKo ? '여러 소스에서 정보 수집 후 통합' : 'Information gathering from multiple sources then integration'}</li>
        <li>{isKo ? '코드베이스의 여러 모듈 동시 분석' : 'Simultaneous analysis of multiple codebase modules'}</li>
      </ul>
      <TipBox type="important">{isKo ? '팬아웃 단계에서 분배되는 작업은 서로 독립적이어야 합니다. 작업 간 의존성이 있다면 파이프라인 패턴이 더 적합합니다.' : 'Tasks distributed in the fan-out phase should be independent of each other. If there are dependencies, the pipeline pattern is more appropriate.'}</TipBox>
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
      <ul>
        <li>{isKo ? '다양한 기술 스택을 다루는 코드 리뷰 시스템' : 'Code review system handling diverse tech stacks'}</li>
        <li>{isKo ? '고객 문의를 담당 부서에 라우팅하는 지원 시스템' : 'Support system routing customer queries to responsible departments'}</li>
        <li>{isKo ? '문서 유형에 따른 전문 처리 (법률/기술/마케팅 문서)' : 'Specialized processing by document type (legal/technical/marketing)'}</li>
      </ul>
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
      <ul>
        <li><strong>{isKo ? '명확성' : 'Clarity'}</strong> — {isKo ? '검토자가 무엇을 평가해야 하는지 명확히 정의' : 'Clearly define what the reviewer should evaluate'}</li>
        <li><strong>{isKo ? '구체성' : 'Specificity'}</strong> — {isKo ? '추상적인 "좋음/나쁨" 대신 구체적인 기준 제시' : 'Specific criteria instead of abstract "good/bad"'}</li>
        <li><strong>{isKo ? '실행 가능성' : 'Actionability'}</strong> — {isKo ? '피드백이 구체적인 개선 행동으로 이어질 수 있어야 함' : 'Feedback should lead to concrete improvement actions'}</li>
      </ul>
      <TipBox type="important">{isKo ? '생산자-검토자 패턴은 Harness A/B 테스트에서 가장 큰 품질 개선을 보인 패턴입니다. 특히 코드 품질과 문서 완성도 측면에서 탁월한 효과를 발휘합니다.' : 'The Producer-Reviewer pattern showed the largest quality improvement in Harness A/B tests, especially in code quality and documentation completeness.'}</TipBox>
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
      <ul>
        <li>{isKo ? '장시간 실행되는 복잡한 작업의 모니터링' : 'Monitoring long-running complex tasks'}</li>
        <li>{isKo ? '오류 복구가 중요한 미션 크리티컬 워크플로우' : 'Mission-critical workflows where error recovery is important'}</li>
        <li>{isKo ? '동적으로 우선순위가 변경되는 작업 환경' : 'Task environments where priorities change dynamically'}</li>
      </ul>
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
      <ul>
        <li><strong>{isKo ? '적절한 깊이' : 'Appropriate Depth'}</strong> — {isKo ? '3계층 이상은 관리 복잡도가 급격히 증가합니다. 대부분의 경우 2계층으로 충분합니다.' : 'More than 3 levels dramatically increases management complexity. 2 levels are sufficient for most cases.'}</li>
        <li><strong>{isKo ? '명확한 위임 경계' : 'Clear Delegation Boundaries'}</strong> — {isKo ? '각 계층이 무엇을 담당하는지 명확히 정의합니다.' : 'Clearly define what each layer is responsible for.'}</li>
        <li><strong>{isKo ? '결과 집계 전략' : 'Result Aggregation Strategy'}</strong> — {isKo ? '하위 계층의 결과를 어떻게 상위 계층으로 집계할지 사전 정의합니다.' : 'Pre-define how to aggregate lower-layer results to upper layers.'}</li>
      </ul>
      <TipBox type="tip">{isKo ? '계층적 위임 패턴은 팬아웃 패턴과 결합하면 매우 강력합니다. 중간 관리자 계층에서 팬아웃을 사용하여 병렬 처리를 극대화할 수 있습니다.' : 'Hierarchical delegation combined with the fan-out pattern is very powerful. Using fan-out at the middle manager layer maximizes parallel processing.'}</TipBox>
    </div>
  );
}
