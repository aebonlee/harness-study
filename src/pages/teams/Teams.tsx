import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'design',    ko: '팀 설계 원칙',      en: 'Team Design Principles' },
  { id: 'protocol',  ko: '조정 프로토콜',     en: 'Coordination Protocol' },
  { id: 'error',     ko: '오류 처리',         en: 'Error Handling' },
  { id: 'testing',   ko: '팀 테스트',         en: 'Team Testing' },
  { id: 'examples',  ko: '팀 예시',           en: 'Team Examples' },
  { id: 'perf',      ko: '성능 최적화',       en: 'Performance Optimization' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '팀 설계',
    labelEn: 'Team Design',
    items: [
      { id: 'design',   icon: 'fa-pencil-ruler', ko: '팀 설계 원칙',  en: 'Team Design Principles' },
      { id: 'protocol', icon: 'fa-handshake',    ko: '조정 프로토콜', en: 'Coordination Protocol' },
    ],
  },
  {
    label: '안정성',
    labelEn: 'Reliability',
    items: [
      { id: 'error',   icon: 'fa-bug',        ko: '오류 처리', en: 'Error Handling' },
      { id: 'testing', icon: 'fa-flask-vial', ko: '팀 테스트', en: 'Team Testing' },
    ],
  },
  {
    label: '실전',
    labelEn: 'Practice',
    items: [
      { id: 'examples', icon: 'fa-lightbulb',  ko: '팀 예시',    en: 'Team Examples' },
      { id: 'perf',     icon: 'fa-gauge-high', ko: '성능 최적화', en: 'Performance Optimization' },
    ],
  },
];

export default function Teams(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('design');
  const isKo = language === 'ko';
  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const handleNav = (id: string) => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <SEOHead title={isKo ? '팀 구성 | Harness Master' : 'Team Building | Harness Master'} path="/teams" />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
            isKo={isKo}
          />
          <main className="guide-content">
            {activeSection === 'design'   && <DesignSection isKo={isKo} />}
            {activeSection === 'protocol' && <ProtocolSection isKo={isKo} />}
            {activeSection === 'error'    && <ErrorSection isKo={isKo} />}
            {activeSection === 'testing'  && <TestingSection isKo={isKo} />}
            {activeSection === 'examples' && <ExamplesSection isKo={isKo} />}
            {activeSection === 'perf'     && <PerfSection isKo={isKo} />}
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

function DesignSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '팀 설계 원칙' : 'Team Design Principles'}</h1>
        <p>{isKo ? '효과적인 에이전트 팀을 구성하기 위한 핵심 설계 원칙을 알아봅니다.' : 'Learn core design principles for building effective agent teams.'}</p>
      </div>
      <h2>{isKo ? '팀 구성의 5가지 원칙' : '5 Principles of Team Composition'}</h2>
      <ol>
        <li><strong>{isKo ? '목적 명확성' : 'Purpose Clarity'}</strong> — {isKo ? '팀이 달성해야 할 목표를 명확하게 정의합니다. 모호한 목표는 에이전트 역할 충돌을 일으킵니다.' : 'Clearly define the goals the team must achieve. Ambiguous goals cause agent role conflicts.'}</li>
        <li><strong>{isKo ? '최소 규모 원칙' : 'Minimum Size Principle'}</strong> — {isKo ? '목표 달성에 필요한 최소한의 에이전트로 팀을 구성합니다. 불필요한 에이전트는 오버헤드를 증가시킵니다.' : 'Compose the team with the minimum agents needed to achieve goals. Unnecessary agents increase overhead.'}</li>
        <li><strong>{isKo ? '역할 비중복성' : 'Role Non-overlap'}</strong> — {isKo ? '두 에이전트가 동일한 역할을 가지면 안 됩니다. 역할 중복은 혼란과 비효율을 야기합니다.' : 'No two agents should have the same role. Role overlap causes confusion and inefficiency.'}</li>
        <li><strong>{isKo ? '인터페이스 명확성' : 'Interface Clarity'}</strong> — {isKo ? '각 에이전트의 입력/출력 인터페이스를 명확히 정의합니다.' : 'Clearly define the input/output interface for each agent.'}</li>
        <li><strong>{isKo ? '확장성 고려' : 'Scalability Consideration'}</strong> — {isKo ? '향후 에이전트 추가나 역할 변경이 용이한 구조로 설계합니다.' : 'Design a structure that facilitates future agent addition or role changes.'}</li>
      </ol>
      <TipBox type="tip">{isKo ? '"2-Pizza Rule"을 적용하세요. 팀의 모든 에이전트가 피자 2판으로 먹을 수 있는 규모(2-6개)를 초과하면 팀 분할을 고려하세요.' : 'Apply the "2-Pizza Rule." Consider splitting the team if the number of all agents exceeds what can be fed by 2 pizzas (2-6 agents).'}</TipBox>
    </div>
  );
}

function ProtocolSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '조정 프로토콜' : 'Coordination Protocol'}</h1>
        <p>{isKo ? '에이전트 팀의 원활한 협업을 위한 조정 프로토콜 설계 방법을 배웁니다.' : 'Learn how to design coordination protocols for smooth agent team collaboration.'}</p>
      </div>
      <h2>{isKo ? '핵심 조정 메커니즘' : 'Core Coordination Mechanisms'}</h2>
      <h3>{isKo ? '1. 작업 큐(Task Queue)' : '1. Task Queue'}</h3>
      <p>{isKo ? '오케스트레이터가 관리하는 작업 목록입니다. 에이전트들은 완료한 작업을 표시하고 다음 작업을 가져갑니다. 구현 방법: 공유 파일(tasks.json) 또는 오케스트레이터의 내부 상태.' : 'Task list managed by the orchestrator. Agents mark completed tasks and pick up the next one. Implementation: shared file (tasks.json) or orchestrator\'s internal state.'}</p>
      <h3>{isKo ? '2. 체크포인트(Checkpoint)' : '2. Checkpoint'}</h3>
      <p>{isKo ? '중요한 단계 완료 시 오케스트레이터에게 보고합니다. 체크포인트는 팀 전체의 진행 상황을 추적하고 병목을 식별하는 데 도움됩니다.' : 'Report to the orchestrator upon completing important stages. Checkpoints help track overall team progress and identify bottlenecks.'}</p>
      <h3>{isKo ? '3. 핸드오프(Handoff)' : '3. Handoff'}</h3>
      <p>{isKo ? '한 에이전트에서 다른 에이전트로 작업을 전달하는 표준화된 절차입니다. 핸드오프 문서에는 완료된 작업, 남은 작업, 특이사항이 포함됩니다.' : 'A standardized procedure for passing tasks from one agent to another. Handoff documents include completed work, remaining tasks, and notable items.'}</p>
      <h3>{isKo ? '작업 큐 파일 예시' : 'Task Queue File Example'}</h3>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">tmp/tasks.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "project": "my-web-app",
  "updated": "2026-04-19T10:30:00Z",
  "tasks": [
    {
      "id": "t001",
      "title": "인증 API 구현",
      "assignee": "backend-agent",
      "status": "completed",
      "output": "src/api/auth.ts"
    },
    {
      "id": "t002",
      "title": "로그인 컴포넌트 구현",
      "assignee": "frontend-agent",
      "status": "in_progress",
      "depends_on": []
    },
    {
      "id": "t003",
      "title": "인증 코드 리뷰",
      "assignee": "reviewer-agent",
      "status": "pending",
      "depends_on": ["t001", "t002"]
    }
  ]
}`}</code></pre>
        </div>
      </div>
      <TipBox type="important">{isKo ? '조정 프로토콜은 팀 설정 초기에 문서화하세요. 런타임에 프로토콜을 변경하면 에이전트 간 혼란이 발생합니다.' : 'Document coordination protocols at the beginning of team setup. Changing protocols at runtime causes confusion among agents.'}</TipBox>
    </div>
  );
}

function ErrorSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '오류 처리' : 'Error Handling'}</h1>
        <p>{isKo ? '에이전트 팀에서 발생하는 오류를 효과적으로 감지하고 복구하는 전략을 배웁니다.' : 'Learn strategies for effectively detecting and recovering from errors in agent teams.'}</p>
      </div>
      <h2>{isKo ? '오류 유형과 대응 전략' : 'Error Types and Response Strategies'}</h2>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo?'오류 유형':'Error Type'}</th><th>{isKo?'원인':'Cause'}</th><th>{isKo?'대응 전략':'Response Strategy'}</th></tr></thead>
          <tbody>
            <tr><td>{isKo?'도구 실패':'Tool Failure'}</td><td>{isKo?'API 오류, 타임아웃':'API errors, timeouts'}</td><td>{isKo?'재시도 + 폴백':'Retry + Fallback'}</td></tr>
            <tr><td>{isKo?'품질 미달':'Quality Below Threshold'}</td><td>{isKo?'에이전트 지침 오해':'Agent misunderstands instructions'}</td><td>{isKo?'재작업 요청':'Request rework'}</td></tr>
            <tr><td>{isKo?'교착 상태':'Deadlock'}</td><td>{isKo?'순환 의존성':'Circular dependency'}</td><td>{isKo?'오케스트레이터 개입':'Orchestrator intervention'}</td></tr>
            <tr><td>{isKo?'컨텍스트 초과':'Context Overflow'}</td><td>{isKo?'과도한 컨텍스트 누적':'Excessive context accumulation'}</td><td>{isKo?'컨텍스트 압축':'Context compression'}</td></tr>
          </tbody>
        </table>
      </div>
      <TipBox type="warning">{isKo ? '오류 발생 시 에이전트가 무한 재시도하지 않도록 재시도 횟수 제한을 설정하세요. 3회 실패 후 오케스트레이터에게 오류를 보고하고 대안을 요청하는 것이 좋습니다.' : 'Set retry count limits to prevent agents from infinitely retrying on error. It\'s good practice to report the error to the orchestrator and request alternatives after 3 failures.'}</TipBox>
    </div>
  );
}

function TestingSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '팀 테스트' : 'Team Testing'}</h1>
        <p>{isKo ? '에이전트 팀이 올바르게 협력하는지 검증하는 테스트 전략을 알아봅니다.' : 'Learn testing strategies to verify agent teams collaborate correctly.'}</p>
      </div>
      <h2>{isKo ? '팀 테스트 레벨' : 'Team Testing Levels'}</h2>
      <ol>
        <li><strong>{isKo ? '단위 테스트(Unit Test)' : 'Unit Test'}</strong> — {isKo ? '개별 에이전트가 자신의 역할을 올바르게 수행하는지 검증.' : 'Verify each individual agent performs their role correctly.'}</li>
        <li><strong>{isKo ? '통합 테스트(Integration Test)' : 'Integration Test'}</strong> — {isKo ? '두 에이전트 간의 인터페이스와 핸드오프가 올바르게 동작하는지 검증.' : 'Verify interfaces and handoffs between two agents work correctly.'}</li>
        <li><strong>{isKo ? '엔드투엔드 테스트(E2E Test)' : 'End-to-End Test'}</strong> — {isKo ? '전체 팀이 실제 작업을 처음부터 끝까지 올바르게 수행하는지 검증.' : 'Verify the entire team correctly performs real tasks from start to finish.'}</li>
        <li><strong>{isKo ? '스트레스 테스트(Stress Test)' : 'Stress Test'}</strong> — {isKo ? '팀이 높은 부하나 복잡한 시나리오에서도 안정적으로 동작하는지 검증.' : 'Verify the team operates stably under high load or complex scenarios.'}</li>
      </ol>
      <TipBox type="tip">{isKo ? '팀 테스트는 실제 작업과 유사한 시나리오를 사용하세요. 인위적인 테스트 케이스보다 실전 시나리오가 더 의미 있는 결과를 제공합니다.' : 'Use scenarios similar to real tasks for team testing. Real-world scenarios provide more meaningful results than artificial test cases.'}</TipBox>
    </div>
  );
}

function ExamplesSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '실전 팀 예시' : 'Real-world Team Examples'}</h1>
        <p>{isKo ? '다양한 도메인에서 성공적으로 적용된 에이전트 팀 구성 예시를 살펴봅니다.' : 'Explore agent team composition examples successfully applied in various domains.'}</p>
      </div>
      <h2>{isKo ? '예시 1: 풀스택 개발 팀' : 'Example 1: Full-stack Development Team'}</h2>
      <ul>
        <li><strong>{isKo ? '아키텍트 에이전트' : 'Architect Agent'}</strong> — {isKo ? '시스템 설계, 기술 선택, API 스펙 정의' : 'System design, tech selection, API spec definition'}</li>
        <li><strong>{isKo ? '프론트엔드 에이전트' : 'Frontend Agent'}</strong> — {isKo ? 'React/TypeScript 컴포넌트 구현' : 'React/TypeScript component implementation'}</li>
        <li><strong>{isKo ? '백엔드 에이전트' : 'Backend Agent'}</strong> — {isKo ? 'API 엔드포인트, DB 스키마 구현' : 'API endpoints, DB schema implementation'}</li>
        <li><strong>{isKo ? '리뷰어 에이전트' : 'Reviewer Agent'}</strong> — {isKo ? '코드 품질, 보안, 성능 검토' : 'Code quality, security, performance review'}</li>
        <li><strong>{isKo ? '테스터 에이전트' : 'Tester Agent'}</strong> — {isKo ? '단위/통합 테스트 작성 및 실행' : 'Unit/integration test writing and execution'}</li>
      </ul>
      <h2>{isKo ? '예시 2: 콘텐츠 제작 팀' : 'Example 2: Content Creation Team'}</h2>
      <ul>
        <li><strong>{isKo ? '연구 에이전트' : 'Research Agent'}</strong> — {isKo ? '주제 조사, 데이터 수집, 트렌드 분석' : 'Topic research, data collection, trend analysis'}</li>
        <li><strong>{isKo ? '작성 에이전트' : 'Writing Agent'}</strong> — {isKo ? '초안 작성, 스토리라인 구성' : 'Draft writing, storyline composition'}</li>
        <li><strong>{isKo ? '편집 에이전트' : 'Editing Agent'}</strong> — {isKo ? '문체 교정, 가독성 개선' : 'Style correction, readability improvement'}</li>
        <li><strong>{isKo ? 'SEO 에이전트' : 'SEO Agent'}</strong> — {isKo ? '키워드 최적화, 메타데이터 작성' : 'Keyword optimization, metadata writing'}</li>
      </ul>
      <h2>{isKo ? 'CLAUDE.md — 풀스택 개발 오케스트레이터 예시' : 'CLAUDE.md — Full-stack Orchestrator Example'}</h2>
      <p>{isKo ? '아래는 실제로 사용할 수 있는 풀스택 개발팀 오케스트레이터 CLAUDE.md입니다. 이 파일 하나로 5개 에이전트 팀의 동작이 정의됩니다.' : 'Below is a real-world full-stack dev team orchestrator CLAUDE.md. This single file defines the behavior of a 5-agent team.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/CLAUDE.md (풀스택 개발팀 오케스트레이터)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 풀스택 개발팀 오케스트레이터

## Role
5개 에이전트로 구성된 풀스택 개발팀을 조율하는 오케스트레이터.
작업을 분해하고 적절한 에이전트에게 위임하며 품질을 보장한다.

## Team Members
- architect-agent  : 시스템 설계, 기술 결정 (Opus)
- frontend-agent   : React/TypeScript UI 구현 (Sonnet)
- backend-agent    : API, DB, 비즈니스 로직 구현 (Sonnet)
- reviewer-agent   : 코드 품질·보안·성능 검토 (Sonnet)
- tester-agent     : 단위·통합 테스트 작성 및 실행 (Haiku)

## Workflow
1. 요구사항을 받으면 architect-agent에게 설계 위임
2. 설계 완료 후 frontend-agent와 backend-agent를 동시에 실행 (팬아웃)
3. 구현 완료 후 reviewer-agent에게 코드 리뷰 위임
4. 리뷰 통과 후 tester-agent에게 테스트 작성 위임
5. 모든 단계 결과를 tmp/progress.json에 기록

## Rules
- 각 에이전트에게 작업 위임 시 반드시 이전 단계 결과 파일을 전달
- reviewer-agent가 score < 70이면 해당 에이전트에게 재작업 요청
- 오류 발생 시 3회까지 재시도, 그 이후에는 사용자에게 보고

## Tools
- Task (에이전트 실행)
- Read / Write (파일 관리)`}</code></pre>
        </div>
      </div>
      <TipBox type="important">{isKo ? '이 예시들은 참고용입니다. 실제 팀 구성은 도메인의 특성, 작업 규모, 품질 요구사항에 따라 조정하세요.' : 'These examples are for reference. Actual team composition should be adjusted based on domain characteristics, task scale, and quality requirements.'}</TipBox>
    </div>
  );
}

function PerfSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '성능 최적화' : 'Performance Optimization'}</h1>
        <p>{isKo ? '에이전트 팀의 처리 속도와 효율성을 극대화하는 최적화 전략을 배웁니다.' : 'Learn optimization strategies to maximize agent team processing speed and efficiency.'}</p>
      </div>
      <h2>{isKo ? '핵심 최적화 전략' : 'Key Optimization Strategies'}</h2>
      <ol>
        <li><strong>{isKo ? '병렬화 최대화' : 'Maximize Parallelization'}</strong> — {isKo ? '의존성 없는 작업은 항상 병렬로 실행합니다. 의존성 그래프를 사전에 분석하여 최대 병렬화 기회를 찾습니다.' : 'Always run independent tasks in parallel. Pre-analyze dependency graphs to find maximum parallelization opportunities.'}</li>
        <li><strong>{isKo ? '컨텍스트 사전 로드' : 'Context Pre-loading'}</strong> — {isKo ? '에이전트가 필요로 할 정보를 미리 준비하여 대기 시간을 줄입니다.' : 'Pre-prepare information agents will need to reduce wait times.'}</li>
        <li><strong>{isKo ? '결과 캐싱' : 'Result Caching'}</strong> — {isKo ? '자주 사용되는 에이전트 결과를 캐시하여 중복 작업을 방지합니다.' : 'Cache frequently used agent results to prevent duplicate work.'}</li>
        <li><strong>{isKo ? '모델 선택 최적화' : 'Model Selection Optimization'}</strong> — {isKo ? '단순한 작업에는 빠르고 저렴한 모델을, 복잡한 작업에는 강력한 모델을 사용합니다.' : 'Use fast, economical models for simple tasks and powerful models for complex tasks.'}</li>
      </ol>
      <TipBox type="tip">{isKo ? '팀 성능을 정기적으로 측정하세요. 총 실행 시간, 각 에이전트별 소요 시간, 오류율을 추적하면 병목 지점을 쉽게 발견할 수 있습니다.' : 'Regularly measure team performance. Tracking total execution time, time per agent, and error rates makes it easy to identify bottlenecks.'}</TipBox>
    </div>
  );
}
