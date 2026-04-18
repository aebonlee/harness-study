import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'concept',        ko: '에이전트 개념',   en: 'Agent Concepts' },
  { id: 'orchestrator',   ko: '오케스트레이터',  en: 'Orchestrator' },
  { id: 'subagents',      ko: '서브에이전트',    en: 'Subagents' },
  { id: 'roles',          ko: '역할 설계',       en: 'Role Design' },
  { id: 'communication',  ko: '에이전트 통신',   en: 'Communication' },
  { id: 'tools',          ko: '도구 활용',       en: 'Tool Use' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '에이전트 기초',
    labelEn: 'Agent Basics',
    items: [
      { id: 'concept',      icon: 'fa-robot',   ko: '에이전트 개념',  en: 'Agent Concepts' },
      { id: 'orchestrator', icon: 'fa-crown',   ko: '오케스트레이터', en: 'Orchestrator' },
    ],
  },
  {
    label: '팀 구성',
    labelEn: 'Team Building',
    items: [
      { id: 'subagents', icon: 'fa-people-group', ko: '서브에이전트', en: 'Subagents' },
      { id: 'roles',     icon: 'fa-id-card',      ko: '역할 설계',    en: 'Role Design' },
    ],
  },
  {
    label: '고급 주제',
    labelEn: 'Advanced Topics',
    items: [
      { id: 'communication', icon: 'fa-comments', ko: '에이전트 통신', en: 'Communication' },
      { id: 'tools',         icon: 'fa-wrench',   ko: '도구 활용',    en: 'Tool Use' },
    ],
  },
];

export default function Agents(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('concept');
  const isKo = language === 'ko';
  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const handleNav = (id: string) => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <SEOHead title={isKo ? '에이전트 이해 | Harness Master' : 'Understanding Agents | Harness Master'} path="/agents" />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
            isKo={isKo}
          />
          <main className="guide-content">
            {activeSection === 'concept'       && <ConceptSection isKo={isKo} />}
            {activeSection === 'orchestrator'  && <OrchestratorSection isKo={isKo} />}
            {activeSection === 'subagents'     && <SubagentsSection isKo={isKo} />}
            {activeSection === 'roles'         && <RolesSection isKo={isKo} />}
            {activeSection === 'communication' && <CommunicationSection isKo={isKo} />}
            {activeSection === 'tools'         && <ToolsSection isKo={isKo} />}
            <div className="guide-section-nav">
              <button className="guide-nav-btn prev" onClick={() => handleNav(SECTIONS[currentIndex - 1].id)} disabled={currentIndex === 0}>
                <i className="fa-solid fa-arrow-left" /><span>{currentIndex > 0 ? (isKo ? SECTIONS[currentIndex-1].ko : SECTIONS[currentIndex-1].en) : (isKo?'이전':'Previous')}</span>
              </button>
              <button className="guide-nav-btn next" onClick={() => handleNav(SECTIONS[currentIndex + 1].id)} disabled={currentIndex === SECTIONS.length - 1}>
                <span>{currentIndex < SECTIONS.length-1 ? (isKo ? SECTIONS[currentIndex+1].ko : SECTIONS[currentIndex+1].en) : (isKo?'다음':'Next')}</span><i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function ConceptSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '에이전트 개념' : 'Agent Concepts'}</h1>
        <p>{isKo ? 'Harness에서 에이전트가 무엇이며 어떻게 동작하는지 이해합니다.' : 'Understand what agents are in Harness and how they operate.'}</p>
      </div>
      <h2>{isKo ? '에이전트란?' : 'What is an Agent?'}</h2>
      <p>{isKo ? 'Harness에서 에이전트는 특정 역할과 책임을 가진 AI 인스턴스입니다. 각 에이전트는 독립적으로 실행되며, 자신의 컨텍스트 창, 도구 세트, 전문 지식을 가집니다. 에이전트는 오케스트레이터로부터 지시를 받거나 다른 에이전트와 협력하여 작업을 완료합니다.' : 'In Harness, an agent is an AI instance with a specific role and responsibility. Each agent runs independently with its own context window, toolset, and expertise. Agents receive instructions from the orchestrator or collaborate with other agents to complete tasks.'}</p>
      <h3>{isKo ? '에이전트의 3가지 핵심 속성' : '3 Core Agent Attributes'}</h3>
      <ul>
        <li><strong>{isKo ? '역할(Role)' : 'Role'}</strong> — {isKo ? '에이전트가 무엇을 하는지 정의. 예: "코드 리뷰어", "테스트 작성자", "문서 작가"' : 'Defines what the agent does. E.g., "Code Reviewer", "Test Writer", "Documentation Writer"'}</li>
        <li><strong>{isKo ? '책임(Responsibility)' : 'Responsibility'}</strong> — {isKo ? '에이전트가 담당하는 작업의 범위와 산출물' : 'The scope of tasks and outputs the agent is responsible for'}</li>
        <li><strong>{isKo ? '도구(Tools)' : 'Tools'}</strong> — {isKo ? '에이전트가 사용할 수 있는 도구 목록. 예: Bash, Read, Write, WebFetch 등' : 'List of tools the agent can use. E.g., Bash, Read, Write, WebFetch, etc.'}</li>
      </ul>
      <TipBox type="important">
        {isKo ? '에이전트는 "최소 권한 원칙(Principle of Least Privilege)"을 따릅니다. 각 에이전트에게는 역할 수행에 필요한 최소한의 도구만 부여하는 것이 보안과 효율 측면에서 바람직합니다.' : 'Agents follow the "Principle of Least Privilege." Granting each agent only the minimum tools needed for their role is best for security and efficiency.'}
      </TipBox>
    </div>
  );
}

function OrchestratorSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '오케스트레이터' : 'Orchestrator'}</h1>
        <p>{isKo ? '에이전트 팀의 조율자인 오케스트레이터의 역할과 동작 방식을 배웁니다.' : 'Learn about the role and operation of the orchestrator, the coordinator of the agent team.'}</p>
      </div>
      <h2>{isKo ? '오케스트레이터의 역할' : "Orchestrator's Role"}</h2>
      <p>{isKo ? '오케스트레이터는 전체 워크플로우를 관리하는 중앙 조율자입니다. 주방의 수석 셰프에 비유할 수 있습니다 — 각 요리사(에이전트)에게 레시피(스킬)와 재료를 배분하고, 모든 요리가 제시간에 완성되도록 조율합니다. 오케스트레이터 자체도 AI 에이전트이며, 보통 가장 높은 수준의 추론 능력을 가진 모델을 사용합니다.' : "The orchestrator is the central coordinator managing the entire workflow. Think of the head chef in a kitchen — distributing recipes (skills) and ingredients to each cook (agent), coordinating so everything is ready on time. The orchestrator itself is an AI agent, typically using the highest reasoning capability model."}</p>
      <h3>{isKo ? '오케스트레이터의 핵심 책임' : "Orchestrator's Core Responsibilities"}</h3>
      <ol>
        <li><strong>{isKo ? '작업 분해(Task Decomposition)' : 'Task Decomposition'}</strong> — {isKo ? '복잡한 작업을 에이전트가 처리할 수 있는 단위로 분해합니다.' : 'Breaks complex tasks into units agents can handle.'}</li>
        <li><strong>{isKo ? '에이전트 선택(Agent Selection)' : 'Agent Selection'}</strong> — {isKo ? '각 서브태스크에 가장 적합한 에이전트를 선택합니다.' : 'Selects the most appropriate agent for each subtask.'}</li>
        <li><strong>{isKo ? '실행 순서 관리(Execution Order)' : 'Execution Order Management'}</strong> — {isKo ? '의존성을 고려한 최적의 실행 순서를 결정합니다.' : 'Determines the optimal execution order considering dependencies.'}</li>
        <li><strong>{isKo ? '결과 통합(Result Integration)' : 'Result Integration'}</strong> — {isKo ? '각 에이전트의 결과를 수집하고 통합하여 최종 산출물을 생성합니다.' : "Collects and integrates each agent's results to produce the final output."}</li>
      </ol>
      <TipBox type="tip">
        {isKo ? '오케스트레이터는 "독재자"가 아닌 "조율자"입니다. 각 에이전트의 전문성을 존중하고, 불필요하게 개입하지 않습니다. 이 원칙이 팀의 효율성을 높입니다.' : 'The orchestrator is a "coordinator," not a "dictator." It respects each agent\'s expertise and avoids unnecessary intervention. This principle enhances team efficiency.'}
      </TipBox>
    </div>
  );
}

function SubagentsSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '서브에이전트' : 'Subagents'}</h1>
        <p>{isKo ? '오케스트레이터의 지시를 받아 실제 작업을 수행하는 서브에이전트를 이해합니다.' : 'Understand subagents that perform actual tasks under orchestrator direction.'}</p>
      </div>
      <h2>{isKo ? '서브에이전트의 특징' : 'Subagent Characteristics'}</h2>
      <p>{isKo ? '서브에이전트는 특정 도메인이나 작업 유형에 전문화된 에이전트입니다. 오케스트레이터로부터 명확한 지시와 필요한 컨텍스트를 받아 작업을 수행하고, 구조화된 결과를 반환합니다.' : 'Subagents are agents specialized in specific domains or task types. They receive clear instructions and necessary context from the orchestrator, perform the task, and return structured results.'}</p>
      <h3>{isKo ? '일반적인 서브에이전트 유형' : 'Common Subagent Types'}</h3>
      <ul>
        <li><strong>{isKo ? '연구 에이전트(Research Agent)' : 'Research Agent'}</strong> — {isKo ? '정보 수집, 웹 검색, 문서 분석을 담당합니다.' : 'Handles information gathering, web search, and document analysis.'}</li>
        <li><strong>{isKo ? '작성 에이전트(Writing Agent)' : 'Writing Agent'}</strong> — {isKo ? '코드, 문서, 콘텐츠 작성을 담당합니다.' : 'Handles writing code, documentation, and content.'}</li>
        <li><strong>{isKo ? '검토 에이전트(Review Agent)' : 'Review Agent'}</strong> — {isKo ? '다른 에이전트의 산출물을 검토하고 피드백을 제공합니다.' : "Reviews other agents' outputs and provides feedback."}</li>
        <li><strong>{isKo ? '테스트 에이전트(Test Agent)' : 'Test Agent'}</strong> — {isKo ? '코드 테스트 작성 및 실행을 담당합니다.' : 'Handles test writing and execution.'}</li>
        <li><strong>{isKo ? '배포 에이전트(Deploy Agent)' : 'Deploy Agent'}</strong> — {isKo ? 'CI/CD 파이프라인 관리와 배포를 담당합니다.' : 'Manages CI/CD pipelines and deployments.'}</li>
      </ul>
      <TipBox type="important">
        {isKo ? '서브에이전트는 독립적으로 실행되므로 자신만의 컨텍스트 창을 가집니다. 이는 전체 팀이 매우 큰 작업도 처리할 수 있게 해주는 핵심 기능입니다.' : 'Subagents run independently with their own context windows. This is a key feature allowing the entire team to handle very large tasks.'}
      </TipBox>
    </div>
  );
}

function RolesSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '역할 설계' : 'Role Design'}</h1>
        <p>{isKo ? '효과적인 에이전트 역할을 설계하는 원칙과 방법을 알아봅니다.' : 'Learn principles and methods for designing effective agent roles.'}</p>
      </div>
      <h2>{isKo ? '좋은 역할 설계의 원칙' : 'Principles of Good Role Design'}</h2>
      <ol>
        <li><strong>{isKo ? '단일 책임 원칙(Single Responsibility)' : 'Single Responsibility Principle'}</strong> — {isKo ? '각 에이전트는 하나의 명확한 주요 책임을 가집니다.' : 'Each agent has one clear primary responsibility.'}</li>
        <li><strong>{isKo ? '명확한 입출력 정의' : 'Clear Input/Output Definition'}</strong> — {isKo ? '에이전트가 받는 입력과 반환하는 출력의 형식을 명확히 정의합니다.' : 'Clearly define the format of inputs the agent receives and outputs it returns.'}</li>
        <li><strong>{isKo ? '측정 가능한 성공 기준' : 'Measurable Success Criteria'}</strong> — {isKo ? '에이전트의 작업 완료 기준을 객관적으로 정의합니다.' : 'Objectively define the criteria for task completion.'}</li>
        <li><strong>{isKo ? '적절한 도구 부여' : 'Appropriate Tool Assignment'}</strong> — {isKo ? '역할 수행에 필요한 도구만 부여합니다.' : 'Assign only tools needed for the role.'}</li>
      </ol>
      <TipBox type="tip">
        {isKo ? '역할 이름은 직관적으로 지정하세요. "agent-1"보다 "code-reviewer" 또는 "documentation-writer"가 훨씬 명확합니다. 좋은 이름은 오케스트레이터가 올바른 에이전트를 선택하는 데 도움을 줍니다.' : 'Name roles intuitively. "code-reviewer" or "documentation-writer" is much clearer than "agent-1". Good names help the orchestrator select the right agent.'}
      </TipBox>
    </div>
  );
}

function CommunicationSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '에이전트 통신' : 'Agent Communication'}</h1>
        <p>{isKo ? '에이전트 간 정보 교환 방식과 효과적인 통신 패턴을 이해합니다.' : 'Understand how agents exchange information and effective communication patterns.'}</p>
      </div>
      <h2>{isKo ? '통신 방식' : 'Communication Methods'}</h2>
      <h3>{isKo ? '1. 오케스트레이터를 통한 통신' : '1. Communication via Orchestrator'}</h3>
      <p>{isKo ? '가장 일반적인 패턴입니다. 에이전트 A의 결과가 오케스트레이터로 전달되고, 오케스트레이터가 이를 처리하여 에이전트 B에게 전달합니다. 명확한 책임 분리와 감독이 가능합니다.' : "The most common pattern. Agent A's result is passed to the orchestrator, which processes it and delivers it to Agent B. Enables clear separation of responsibilities and oversight."}</p>
      <h3>{isKo ? '2. 공유 파일을 통한 통신' : '2. Communication via Shared Files'}</h3>
      <p>{isKo ? '에이전트들이 공유 파일(예: output.md, review.json)을 통해 결과를 교환합니다. 비동기 통신에 적합하며 감사 추적이 용이합니다.' : 'Agents exchange results through shared files (e.g., output.md, review.json). Suitable for asynchronous communication with easy audit trails.'}</p>
      <TipBox type="warning">
        {isKo ? '에이전트 간 직접 통신은 가능하지만 권장되지 않습니다. 직접 통신은 디버깅을 어렵게 만들고 오케스트레이터의 전체 상황 파악 능력을 저하시킵니다.' : "Direct agent-to-agent communication is possible but not recommended. It makes debugging difficult and reduces the orchestrator's ability to understand the full situation."}
      </TipBox>
    </div>
  );
}

function ToolsSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '도구 활용' : 'Tool Use'}</h1>
        <p>{isKo ? '에이전트가 사용할 수 있는 도구 유형과 효과적인 도구 할당 전략을 배웁니다.' : 'Learn about tool types agents can use and effective tool assignment strategies.'}</p>
      </div>
      <h2>{isKo ? '주요 도구 유형' : 'Key Tool Types'}</h2>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo?'도구':'Tool'}</th><th>{isKo?'용도':'Purpose'}</th><th>{isKo?'권장 에이전트':'Recommended For'}</th></tr></thead>
          <tbody>
            <tr><td>Bash</td><td>{isKo?'셸 명령 실행':'Shell command execution'}</td><td>{isKo?'개발, 배포 에이전트':'Dev, Deploy Agents'}</td></tr>
            <tr><td>Read/Write</td><td>{isKo?'파일 읽기/쓰기':'File read/write'}</td><td>{isKo?'모든 에이전트':'All Agents'}</td></tr>
            <tr><td>WebFetch</td><td>{isKo?'웹 콘텐츠 가져오기':'Fetch web content'}</td><td>{isKo?'연구 에이전트':'Research Agent'}</td></tr>
            <tr><td>WebSearch</td><td>{isKo?'웹 검색':'Web search'}</td><td>{isKo?'연구 에이전트':'Research Agent'}</td></tr>
            <tr><td>Task</td><td>{isKo?'서브에이전트 실행':'Run subagents'}</td><td>{isKo?'오케스트레이터':'Orchestrator'}</td></tr>
          </tbody>
        </table>
      </div>
      <TipBox type="important">
        {isKo ? 'Task 도구는 오케스트레이터 에이전트에게만 부여하는 것이 원칙입니다. 서브에이전트가 Task 도구를 사용하면 예상치 못한 중첩 실행이 발생할 수 있습니다.' : 'The Task tool should only be granted to the orchestrator agent. Subagents using the Task tool can cause unexpected nested executions.'}
      </TipBox>
    </div>
  );
}
