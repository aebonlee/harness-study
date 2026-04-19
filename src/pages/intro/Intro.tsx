import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'overview',   icon: 'fa-rocket',        ko: '하네스란?',       en: 'What is Harness?' },
  { id: 'why',        icon: 'fa-circle-question',ko: '왜 필요한가?',    en: 'Why Harness?' },
  { id: 'components', icon: 'fa-puzzle-piece',   ko: '핵심 구성요소',   en: 'Core Components' },
  { id: 'ecosystem',  icon: 'fa-globe',          ko: '하네스 생태계',   en: 'Ecosystem' },
  { id: 'install',    icon: 'fa-download',       ko: '설치 및 설정',    en: 'Installation' },
  { id: 'first',      icon: 'fa-play',           ko: '첫 번째 하네스',  en: 'First Harness' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '기초 이해',
    labelEn: 'Basics',
    items: [
      { id: 'overview',   icon: 'fa-rocket',         ko: '하네스란?',     en: 'What is Harness?' },
      { id: 'why',        icon: 'fa-circle-question', ko: '왜 필요한가?',  en: 'Why Harness?' },
    ],
  },
  {
    label: '핵심 구성요소',
    labelEn: 'Core Components',
    items: [
      {
        id: 'components', icon: 'fa-puzzle-piece', ko: '구성요소', en: 'Components',
        subs: [
          { id: 'sub-agents',    ko: '에이전트',      en: 'Agents' },
          { id: 'sub-skills',    ko: '스킬',          en: 'Skills' },
          { id: 'sub-memory',    ko: '메모리',        en: 'Memory' },
        ],
      },
      { id: 'ecosystem', icon: 'fa-globe', ko: '생태계', en: 'Ecosystem' },
    ],
  },
  {
    label: '시작하기',
    labelEn: 'Getting Started',
    items: [
      { id: 'install', icon: 'fa-download', ko: '설치 및 설정',    en: 'Installation' },
      { id: 'first',   icon: 'fa-play',     ko: '첫 번째 하네스',  en: 'First Harness' },
    ],
  },
];

export default function Intro(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
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
      <SEOHead
        title={isKo ? '하네스 기초 | Harness Master' : 'Harness Basics | Harness Master'}
        description={isKo ? 'Harness가 무엇인지, 왜 필요한지, 핵심 구성요소를 이해합니다.' : 'Understand what Harness is, why it matters, and its core components.'}
        path="/intro"
      />
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
            {activeSection === 'overview'   && <OverviewSection isKo={isKo} />}
            {activeSection === 'why'        && <WhySection isKo={isKo} />}
            {activeSection === 'components' && <ComponentsSection isKo={isKo} />}
            {activeSection === 'ecosystem'  && <EcosystemSection isKo={isKo} />}
            {activeSection === 'install'    && <InstallSection isKo={isKo} />}
            {activeSection === 'first'      && <FirstSection isKo={isKo} />}
            <div className="guide-section-nav">
              <button className="guide-nav-btn prev" onClick={() => handleNav(SECTIONS[currentIndex - 1].id)} disabled={currentIndex === 0}>
                <i className="fa-solid fa-arrow-left" />
                <span><small>{isKo ? '이전' : 'Prev'}</small><strong>{currentIndex > 0 ? (isKo ? SECTIONS[currentIndex-1].ko : SECTIONS[currentIndex-1].en) : ''}</strong></span>
              </button>
              <button className="guide-nav-btn next" onClick={() => handleNav(SECTIONS[currentIndex + 1].id)} disabled={currentIndex === SECTIONS.length - 1}>
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

function OverviewSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? 'Harness란 무엇인가?' : 'What is Harness?'}</h1>
        <p>{isKo ? 'Harness는 Claude Code를 위한 팀 아키텍처 팩토리입니다. 도메인 설명을 조율된 에이전트 팀으로 변환합니다.' : 'Harness is a team-architecture factory for Claude Code that transforms domain descriptions into coordinated agent teams.'}</p>
      </div>

      <h2>{isKo ? 'Harness의 핵심 정의' : 'Core Definition of Harness'}</h2>
      <p>{isKo ? 'Harness는 메타-스킬(Meta-Skill)입니다. 즉, 다른 스킬을 만들어내는 스킬입니다. Claude Code에게 어떤 도메인을 설명하면, Harness는 6가지 사전 정의된 아키텍처 패턴을 사용하여 해당 도메인에 최적화된 에이전트 팀과 스킬 파일을 자동으로 생성합니다.' : 'Harness is a meta-skill — a skill that creates other skills. You describe a domain to Claude Code, and Harness automatically generates an optimized agent team and skill files for that domain using 6 predefined architectural patterns.'}</p>

      <h3>{isKo ? 'Harness가 해결하는 문제' : 'Problems Harness Solves'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🧩</div>
          <h4>{isKo ? '복잡성 관리' : 'Complexity Management'}</h4>
          <p>{isKo ? '복잡한 작업을 전문화된 에이전트들이 나누어 처리합니다.' : 'Complex tasks are divided among specialized agents.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">✅</div>
          <h4>{isKo ? '품질 일관성' : 'Quality Consistency'}</h4>
          <p>{isKo ? '검토자 에이전트가 산출물의 품질을 일관되게 유지합니다.' : 'Reviewer agents maintain consistent output quality.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">💾</div>
          <h4>{isKo ? '컨텍스트 효율성' : 'Context Efficiency'}</h4>
          <p>{isKo ? '스킬 파일로 프로그레시브 디스클로저를 구현해 컨텍스트 창을 절약합니다.' : 'Skill files implement progressive disclosure to conserve context window.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">♻️</div>
          <h4>{isKo ? '재사용성' : 'Reusability'}</h4>
          <p>{isKo ? '생성된 스킬과 팀 구성은 유사한 프로젝트에 재사용 가능합니다.' : 'Generated skills and team configurations can be reused for similar projects.'}</p>
        </div>
      </div>

      <TipBox type="important">
        {isKo
          ? 'Harness는 "L3 메타팩토리/팀 아키텍처 팩토리" 레이어에 위치합니다. Archon(런타임 설정), meta-harness(Codex 포트), ECC(표준화 레이어)와 공존합니다.'
          : 'Harness occupies the "L3 Meta-Factory / Team-Architecture Factory" layer, coexisting with Archon (runtime configurations), meta-harness (Codex port), and ECC (standardization layer).'}
      </TipBox>

      <h3>{isKo ? 'Harness vs 단일 에이전트' : 'Harness vs Single Agent'}</h3>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo ? '구분' : 'Aspect'}</th><th>{isKo ? '단일 에이전트' : 'Single Agent'}</th><th>Harness</th></tr></thead>
          <tbody>
            <tr><td>{isKo ? '작업 복잡도' : 'Task Complexity'}</td><td>{isKo ? '단순~중간' : 'Simple~Medium'}</td><td>{isKo ? '중간~복잡' : 'Medium~Complex'}</td></tr>
            <tr><td>{isKo ? '품질 검증' : 'Quality Check'}</td><td>{isKo ? '셀프 검토' : 'Self-review'}</td><td>{isKo ? '전문 검토자' : 'Dedicated Reviewer'}</td></tr>
            <tr><td>{isKo ? '병렬 처리' : 'Parallel Processing'}</td><td>{isKo ? '순차적' : 'Sequential'}</td><td>{isKo ? '병렬 가능' : 'Parallel Capable'}</td></tr>
            <tr><td>{isKo ? '전문화' : 'Specialization'}</td><td>{isKo ? '범용' : 'General-purpose'}</td><td>{isKo ? '역할별 전문화' : 'Role-specialized'}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WhySection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '왜 Harness인가?' : 'Why Harness?'}</h1>
        <p>{isKo ? 'AI 에이전트 오케스트레이션이 필요한 이유와 Harness가 제공하는 차별화된 가치를 알아봅니다.' : 'Understand why AI agent orchestration matters and the unique value Harness provides.'}</p>
      </div>

      <h2>{isKo ? 'AI 에이전트의 한계' : 'Limitations of Single AI Agents'}</h2>
      <p>{isKo ? '단일 AI 에이전트는 강력하지만 한계가 있습니다. 복잡한 작업을 수행할 때 컨텍스트 창의 한계에 부딪히고, 다양한 전문 지식이 필요한 작업에서 품질이 저하될 수 있습니다. 또한 검토 없이 생성된 결과물은 오류를 포함할 가능성이 높습니다.' : 'Single AI agents are powerful but have limitations. When performing complex tasks, they hit context window limits and quality may degrade on tasks requiring diverse expertise. Outputs generated without review are more likely to contain errors.'}</p>

      <h3>{isKo ? 'Harness가 제공하는 가치' : 'Value Harness Provides'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">👥</div>
          <h4>{isKo ? '분업과 전문화' : 'Division & Specialization'}</h4>
          <p>{isKo ? '각 에이전트가 자신의 전문 영역에만 집중하여 더 높은 품질의 결과를 만들어냅니다.' : 'Each agent focuses only on its area of expertise, producing higher quality results.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">⚡</div>
          <h4>{isKo ? '병렬 처리로 속도 향상' : 'Speed Through Parallel Processing'}</h4>
          <p>{isKo ? '독립적인 작업은 여러 에이전트가 동시에 처리하여 전체 처리 시간을 단축합니다.' : 'Independent tasks are processed simultaneously by multiple agents, reducing total time.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🛡️</div>
          <h4>{isKo ? '내장된 품질 검증' : 'Built-in Quality Validation'}</h4>
          <p>{isKo ? '생산자-검토자 패턴으로 모든 산출물이 검증을 거칩니다.' : 'The Producer-Reviewer pattern ensures all outputs go through validation.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔄</div>
          <h4>{isKo ? '재현 가능한 워크플로우' : 'Reproducible Workflows'}</h4>
          <p>{isKo ? '스킬 파일로 정의된 워크플로우는 언제든지 동일한 방식으로 실행됩니다.' : 'Workflows defined in skill files execute consistently every time.'}</p>
        </div>
      </div>

      <h3>{isKo ? '단일 에이전트 vs Harness 처리 흐름 비교' : 'Single Agent vs Harness Processing Flow'}</h3>
      <p>{isKo ? '동일한 "블로그 포스트 작성" 작업을 두 방식으로 처리할 때의 차이입니다. Harness는 전문화와 병렬화로 품질과 속도를 동시에 높입니다.' : 'The difference when processing the same "write a blog post" task with two approaches. Harness improves both quality and speed through specialization and parallelization.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? '단일 에이전트 vs Harness 비교' : 'Single Agent vs Harness'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`❌ 단일 에이전트 (Sequential, 45분)
─────────────────────────────────────────
Input ──▶ [범용 AI]  ──▶ Output
           (조사+작성+리뷰+SEO를 혼자 처리)
           • 컨텍스트 창 빠르게 소모
           • 전문성 부족 → 평균 품질
           • 하나가 막히면 전체 중단

✅ Harness (Parallel + Specialized, 20분)
─────────────────────────────────────────
            ┌─ [research-agent] ──▶ research.md
Input ──▶  │                              │
[Orch]     └─ [outline-agent]  ──▶ outline.md
            ↓ (팬아웃)
           [writing-agent-1]  ──▶ section1-3.md ─┐
           [writing-agent-2]  ──▶ section4-6.md ─┤ (팬인)
            ↓                                     │
           [seo-agent] ◀── draft.md ◀─────────────┘
            ↓
           final.md (Output)

• 병렬 처리: 45분 → 20분 (55% 단축)
• 전문화: 각 에이전트가 자신의 영역만 담당
• 품질 검증: reviewer가 자동으로 재작업 요청`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">
        {isKo
          ? 'revfactory의 A/B 테스트 결과(n=15)에 따르면, Harness를 사용한 작업은 품질이 향상되고 출력 분산이 줄어들었습니다. 특히 소프트웨어 엔지니어링 작업에서 효과가 두드러졌습니다.'
          : 'According to revfactory\'s A/B test results (n=15), tasks using Harness showed improved quality and reduced output variance, especially in software engineering tasks.'}
      </TipBox>
    </div>
  );
}

function ComponentsSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '핵심 구성요소' : 'Core Components'}</h1>
        <p>{isKo ? 'Harness를 구성하는 핵심 요소들과 그 역할을 이해합니다.' : 'Understand the key elements of Harness and their roles.'}</p>
      </div>

      <h2>{isKo ? '5가지 핵심 구성요소' : '5 Core Components'}</h2>

      <h3 id="sub-agents">1. {isKo ? '에이전트 (Agents)' : 'Agents'}</h3>
      <p>{isKo ? '특정 역할을 수행하도록 정의된 AI 인스턴스입니다. 각 에이전트는 명확한 목적, 책임 범위, 사용 가능한 도구가 지정됩니다. 에이전트는 오케스트레이터의 지시를 받아 작업을 수행하고 결과를 반환합니다.' : 'AI instances defined to perform specific roles. Each agent has a clear purpose, scope of responsibility, and available tools. Agents receive instructions from the orchestrator, perform tasks, and return results.'}</p>

      <h3>2. {isKo ? '오케스트레이터 (Orchestrator)' : 'Orchestrator'}</h3>
      <p>{isKo ? '에이전트 팀의 조율자입니다. 독재자가 아닌 조율자(coordinator)로서 각 에이전트에게 작업을 할당하고, 결과를 수집하며, 전체 워크플로우를 관리합니다. 오케스트레이터 자체도 AI 에이전트입니다.' : 'The coordinator of the agent team. As a coordinator (not a dictator), it assigns tasks to agents, collects results, and manages the overall workflow. The orchestrator itself is also an AI agent.'}</p>

      <h3 id="sub-skills">3. {isKo ? '스킬 (Skills)' : 'Skills'}</h3>
      <p>{isKo ? '에이전트가 수행할 작업의 상세 지침을 담은 파일입니다. 레시피 카드에 비유할 수 있습니다. 스킬은 프로그레시브 디스클로저 방식으로 설계되어 필요할 때만 상세 정보가 로드됩니다.' : 'Files containing detailed instructions for tasks agents perform. Think of them as recipe cards. Skills are designed with progressive disclosure so detailed information is only loaded when needed.'}</p>

      <h3>4. {isKo ? '컨텍스트 창 (Context Window)' : 'Context Window'}</h3>
      <p>{isKo ? '에이전트가 한 번에 처리할 수 있는 정보의 양입니다. 주방 작업대에 비유됩니다. Harness는 스킬 파일의 지능적 관리로 컨텍스트 창을 효율적으로 사용합니다.' : 'The amount of information an agent can process at once. Analogous to a kitchen counter. Harness efficiently uses the context window through intelligent skill file management.'}</p>

      <h3 id="sub-memory">5. {isKo ? '메모리 (Memory)' : 'Memory'}</h3>
      <p>{isKo ? '에이전트가 다음 세션에도 사용할 수 있도록 보존하는 정보입니다. 내일 교대 근무자를 위한 메모에 비유됩니다. MEMORY.md 파일이나 외부 저장소를 통해 구현됩니다.' : 'Information preserved for agents to use in future sessions. Analogous to notes for tomorrow\'s staff. Implemented through MEMORY.md files or external storage.'}</p>

      <h3>{isKo ? '5가지 구성요소가 모인 .claude/ 디렉토리' : 'All 5 Components in the .claude/ Directory'}</h3>
      <p>{isKo ? '실제 프로젝트에서 5가지 구성요소가 어떻게 파일로 구현되는지 확인합니다. 이 구조가 Harness의 실체입니다.' : 'See how the 5 components are implemented as files in a real project. This structure is the essence of Harness.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? 'Harness 프로젝트 디렉토리 구조' : 'Harness Project Directory Structure'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`my-project/
├── .claude/
│   ├── CLAUDE.md          ← ① 오케스트레이터 지침
│   │                         (팀 역할 정의 + 워크플로우)
│   ├── MEMORY.md          ← ⑤ 에이전트 장기 메모리
│   │                         (프로젝트 상태, 결정사항)
│   └── commands/          ← ③ 스킬 라이브러리
│       ├── research.md       (연구 에이전트 스킬)
│       ├── writing.md        (작성 에이전트 스킬)
│       ├── code-review.md    (리뷰 에이전트 스킬)
│       └── deploy.md         (배포 에이전트 스킬)
│
└── tmp/                   ← ④ 컨텍스트 창 관리용
    ├── checkpoint.json       (에이전트 진행 상태)
    ├── research-result.md    (에이전트 간 통신 파일)
    └── kpi-report.json       (성과 측정)

─────────────────────────────────────────
① CLAUDE.md = 오케스트레이터  ② 각 에이전트 = CLAUDE.md + skill 조합
③ commands/*.md = 스킬       ④ tmp/*.json = 컨텍스트 관리
⑤ MEMORY.md = 장기 메모리`}</code></pre>
        </div>
      </div>
      <TipBox type="important">
        {isKo
          ? 'Harness의 모든 구성요소는 상호 연결되어 있습니다. 스킬이 에이전트를 정의하고, 에이전트가 팀을 구성하며, 오케스트레이터가 팀을 조율합니다. 이 순환 구조가 Harness의 강력함의 원천입니다.'
          : 'All components of Harness are interconnected. Skills define agents, agents form teams, and the orchestrator coordinates the team. This circular structure is the source of Harness\'s power.'}
      </TipBox>
    </div>
  );
}

function EcosystemSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? 'Harness 생태계' : 'Harness Ecosystem'}</h1>
        <p>{isKo ? 'Harness가 위치하는 AI 에이전트 생태계의 전체 구조를 이해합니다.' : 'Understand the complete structure of the AI agent ecosystem where Harness is positioned.'}</p>
      </div>

      <h2>{isKo ? '레이어 아키텍처' : 'Layer Architecture'}</h2>

      {/* SVG Layer Architecture Diagram */}
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <svg viewBox="0 0 500 280" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
          {/* L4 */}
          <rect x="50" y="10" width="400" height="50" rx="8" fill="rgba(139,92,246,0.25)" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5"/>
          <text x="250" y="30" textAnchor="middle" fontSize="12" fill="#8b5cf6" fontWeight="700">L4</text>
          <text x="250" y="46" textAnchor="middle" fontSize="13" fill="var(--color-text)" fontWeight="700">Archon — {isKo ? '런타임 설정 관리' : 'Runtime Config'}</text>
          {/* L3 */}
          <rect x="50" y="70" width="400" height="50" rx="8" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.8)" strokeWidth="2"/>
          <text x="250" y="90" textAnchor="middle" fontSize="12" fill="var(--color-primary)" fontWeight="700">L3</text>
          <text x="250" y="106" textAnchor="middle" fontSize="14" fill="var(--color-primary)" fontWeight="800">Harness — {isKo ? '팀 아키텍처 팩토리' : 'Team Architecture Factory'}</text>
          {/* L2 */}
          <rect x="50" y="130" width="400" height="50" rx="8" fill="rgba(16,185,129,0.25)" stroke="rgba(16,185,129,0.8)" strokeWidth="1.5"/>
          <text x="250" y="150" textAnchor="middle" fontSize="12" fill="#10b981" fontWeight="700">L2</text>
          <text x="250" y="166" textAnchor="middle" fontSize="13" fill="var(--color-text)" fontWeight="700">{isKo ? '복합 스킬 — 여러 L1 조합' : 'Composite Skills — Multi-L1'}</text>
          {/* L1 */}
          <rect x="50" y="190" width="400" height="50" rx="8" fill="rgba(245,158,11,0.25)" stroke="rgba(245,158,11,0.8)" strokeWidth="1.5"/>
          <text x="250" y="210" textAnchor="middle" fontSize="12" fill="#f59e0b" fontWeight="700">L1</text>
          <text x="250" y="226" textAnchor="middle" fontSize="13" fill="var(--color-text)" fontWeight="700">{isKo ? '기본 스킬 — 단일 작업 지침' : 'Basic Skills — Single Task'}</text>
          {/* Arrows */}
          <line x1="250" y1="60" x2="250" y2="70" stroke="var(--color-text)" strokeWidth="1.5" markerEnd="url(#arrowDown)"/>
          <line x1="250" y1="120" x2="250" y2="130" stroke="var(--color-text)" strokeWidth="1.5" markerEnd="url(#arrowDown)"/>
          <line x1="250" y1="180" x2="250" y2="190" stroke="var(--color-text)" strokeWidth="1.5" markerEnd="url(#arrowDown)"/>
          <defs>
            <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="var(--color-text)"/>
            </marker>
          </defs>
          {/* Caption */}
          <text x="250" y="268" textAnchor="middle" fontSize="11" fill="var(--color-text)" fontStyle="italic">
            {isKo ? 'Harness 에코시스템 레이어 아키텍처' : 'Harness Ecosystem Layer Architecture'}
          </text>
        </svg>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo ? '레이어' : 'Layer'}</th><th>{isKo ? '이름' : 'Name'}</th><th>{isKo ? '역할' : 'Role'}</th></tr></thead>
          <tbody>
            <tr><td>L1</td><td>{isKo ? '기본 스킬' : 'Basic Skills'}</td><td>{isKo ? '단일 작업 수행 지침' : 'Single-task execution instructions'}</td></tr>
            <tr><td>L2</td><td>{isKo ? '복합 스킬' : 'Composite Skills'}</td><td>{isKo ? '여러 L1 스킬 조합' : 'Combination of multiple L1 skills'}</td></tr>
            <tr><td><strong>L3</strong></td><td><strong>Harness</strong></td><td>{isKo ? '팀 아키텍처 자동 생성' : 'Auto-generate team architectures'}</td></tr>
            <tr><td>L4</td><td>Archon</td><td>{isKo ? '런타임 설정 관리' : 'Runtime configuration management'}</td></tr>
          </tbody>
        </table>
      </div>

      <h3>{isKo ? '주요 관련 프로젝트' : 'Key Related Projects'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🏗️</div>
          <h4>revfactory/harness</h4>
          <p>{isKo ? '원본 Harness 메타-스킬 구현체' : 'Original Harness meta-skill implementation'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📚</div>
          <h4>harness-for-everyone</h4>
          <p>{isKo ? '비기술자를 위한 Harness 교육 자료 (KO/EN/JP)' : 'Harness educational materials for non-technical users (KO/EN/JP)'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🧪</div>
          <h4>harness-abtest</h4>
          <p>{isKo ? 'A/B 테스트 프레임워크' : 'A/B testing framework'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon">⚙️</div>
          <h4>Harness-Engineering</h4>
          <p>{isKo ? 'Harness 엔지니어링 템플릿 (tigerjk9)' : 'Harness engineering templates (tigerjk9)'}</p>
        </div>
      </div>

      <TipBox type="tip">
        {isKo
          ? 'Harness 생태계는 오픈소스 커뮤니티 중심으로 발전하고 있습니다. GitHub에서 관련 리포지토리를 탐색하고 커뮤니티에 기여할 수 있습니다.'
          : 'The Harness ecosystem is evolving around an open-source community. You can explore related repositories on GitHub and contribute to the community.'}
      </TipBox>
    </div>
  );
}

function InstallSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '설치 및 설정' : 'Installation & Setup'}</h1>
        <p>{isKo ? 'Claude Code에서 Harness를 사용하기 위한 설치 및 설정 방법을 알아봅니다.' : 'Learn how to install and configure Harness for use with Claude Code.'}</p>
      </div>

      <h2>{isKo ? '사전 요구사항' : 'Prerequisites'}</h2>
      <ul>
        <li>Claude Code (최신 버전)</li>
        <li>{isKo ? 'Agent Teams 환경 변수 활성화' : 'Agent Teams environment variable enabled'}</li>
        <li>GitHub 계정 ({isKo ? '리포지토리 접근용' : 'for repository access'})</li>
      </ul>

      <h2>{isKo ? '설치 방법' : 'Installation Steps'}</h2>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">bash</span>
          <span className="code-block-filename">{isKo ? '1단계: Claude Code 설치' : 'Step 1: Install Claude Code'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# npm으로 Claude Code 설치 (전역)
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version`}</code></pre>
        </div>
      </div>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">bash</span>
          <span className="code-block-filename">{isKo ? '2단계: 프로젝트 초기화 + 디렉토리 구성' : 'Step 2: Initialize project + directory setup'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 프로젝트 디렉토리로 이동
cd my-project

# Harness 디렉토리 구조 생성
mkdir -p .claude/commands

# CLAUDE.md 생성 (전역 지침 파일)
touch .claude/CLAUDE.md`}</code></pre>
        </div>
      </div>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/CLAUDE.md (기본 템플릿)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 프로젝트 개요
이 프로젝트는 [기술 스택]을 사용하는 [프로젝트 설명]입니다.

# 코딩 컨벤션
- 언어: TypeScript (strict mode)
- 포매터: Prettier (탭 2칸)
- 테스트: Jest + React Testing Library

# 아키텍처 결정
- 상태 관리: Zustand
- API 통신: React Query

# 주의사항
- 직접 DOM 조작 금지, React 방식 사용
- console.log 대신 logger 유틸리티 사용`}</code></pre>
        </div>
      </div>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">bash</span>
          <span className="code-block-filename">{isKo ? '3단계: Claude Code 시작 + 동작 확인' : 'Step 3: Start Claude Code + verify'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# Claude Code 시작 (프로젝트 루트에서)
claude

# Claude Code 내에서 CLAUDE.md 로드 확인
# → Claude가 프로젝트 컨텍스트를 인식하면 성공`}</code></pre>
        </div>
      </div>

      <TipBox type="warning">
        {isKo
          ? 'Agent Teams 기능은 환경 변수 설정이 필요합니다. 설정 없이 하네스를 실행하면 단일 에이전트 모드로 동작하여 팀 기반 기능이 제한됩니다.'
          : 'The Agent Teams feature requires environment variable configuration. Running Harness without the setting will operate in single-agent mode with limited team-based features.'}
      </TipBox>
      <TipBox type="danger">
        {isKo
          ? 'CLAUDE.md에 API 키, 비밀번호, 토큰 등 민감한 정보를 절대 포함하지 마세요. 이 파일은 Git에 커밋되므로 .env 파일을 사용하고 .gitignore에 추가해야 합니다.'
          : 'Never include sensitive information like API keys, passwords, or tokens in CLAUDE.md. This file is committed to Git — use .env files and add them to .gitignore instead.'}
      </TipBox>
    </div>
  );
}

function FirstSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '첫 번째 Harness 실행' : 'Your First Harness Run'}</h1>
        <p>{isKo ? '간단한 예제로 Harness를 처음 실행해봅니다.' : 'Run Harness for the first time with a simple example.'}</p>
      </div>

      <h2>{isKo ? '기본 실행 방법' : 'Basic Execution'}</h2>
      <p>{isKo ? 'Harness는 두 가지 모드로 실행할 수 있습니다.' : 'Harness can run in two modes.'}</p>

      <h3>{isKo ? '모드 1: 에이전트 팀 (Agent Teams)' : 'Mode 1: Agent Teams'}</h3>
      <p>{isKo ? '2개 이상의 에이전트가 협력하는 팀 모드입니다. 복잡한 작업이나 품질 검증이 필요한 작업에 적합합니다.' : 'Team mode where 2 or more agents collaborate. Suitable for complex tasks or tasks requiring quality validation.'}</p>

      <h3>{isKo ? '모드 2: 서브에이전트 (Subagents)' : 'Mode 2: Subagents'}</h3>
      <p>{isKo ? '일회성 독립 작업에 최적화된 모드입니다. 팀 조율 없이 단일 전문 에이전트가 특정 작업을 수행합니다.' : 'Mode optimized for one-off independent tasks. A single specialized agent performs a specific task without team coordination.'}</p>

      <h3>{isKo ? '예제: 웹 개발 팀 생성' : 'Example: Creating a Web Dev Team'}</h3>
      <p>{isKo ? 'Claude Code에서 다음과 같이 입력합니다:' : 'Enter the following in Claude Code:'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? 'Claude Code 입력 예시' : 'Claude Code input example'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`/harness

도메인: React + TypeScript 웹 애플리케이션 개발
요구사항: 컴포넌트 설계, 코드 리뷰, 테스트 작성`}</code></pre>
        </div>
      </div>
      <p>{isKo ? 'Harness는 도메인을 분석하여 적합한 에이전트 팀(아키텍트, 개발자, 리뷰어, 테스터)과 각 에이전트의 스킬 파일을 자동 생성합니다.' : 'Harness analyzes the domain and automatically generates an appropriate agent team (architect, developer, reviewer, tester) and skill files for each agent.'}</p>

      <TipBox type="tip">
        {isKo
          ? '첫 실행 시 도메인 설명을 구체적으로 작성할수록 더 적합한 팀이 생성됩니다. 기술 스택, 팀의 주요 목표, 예상 산출물을 포함하면 좋습니다.'
          : 'The more specific your domain description on the first run, the more appropriate the generated team. Include tech stack, main team objectives, and expected outputs.'}
      </TipBox>
    </div>
  );
}
