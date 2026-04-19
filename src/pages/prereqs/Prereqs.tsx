import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'claudecode', icon: 'fa-terminal',       ko: 'Claude Code란?',     en: 'What is Claude Code?' },
  { id: 'prompt',     icon: 'fa-comment-dots',   ko: '프롬프트 엔지니어링', en: 'Prompt Engineering' },
  { id: 'agent',      icon: 'fa-robot',          ko: 'AI 에이전트 개념',    en: 'AI Agent Concepts' },
  { id: 'env',        icon: 'fa-laptop-code',    ko: '개발 환경 설정',      en: 'Dev Environment' },
  { id: 'tools',      icon: 'fa-wrench',         ko: '핵심 도구',           en: 'Core Tools' },
  { id: 'yaml',       icon: 'fa-file-code',      ko: 'YAML & 파일 구조',    en: 'YAML & File Structure' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '사전 지식',
    labelEn: 'Prerequisites',
    items: [
      { id: 'claudecode', icon: 'fa-terminal',     ko: 'Claude Code란?',     en: 'What is Claude Code?' },
      { id: 'prompt',     icon: 'fa-comment-dots', ko: '프롬프트 엔지니어링', en: 'Prompt Engineering' },
      { id: 'agent',      icon: 'fa-robot',        ko: 'AI 에이전트 개념',    en: 'AI Agent Concepts' },
    ],
  },
  {
    label: '환경 & 도구',
    labelEn: 'Env & Tools',
    items: [
      {
        id: 'env', icon: 'fa-laptop-code', ko: '개발 환경 설정', en: 'Dev Environment',
        subs: [
          { id: 'sub-claudecode-install', ko: 'Claude Code 설치', en: 'Install Claude Code' },
          { id: 'sub-vscode',             ko: 'VS Code 설정',     en: 'VS Code Setup' },
          { id: 'sub-terminal',           ko: '터미널 기초',       en: 'Terminal Basics' },
        ],
      },
      {
        id: 'tools', icon: 'fa-wrench', ko: '핵심 도구', en: 'Core Tools',
        subs: [
          { id: 'sub-api',  ko: 'Anthropic API', en: 'Anthropic API' },
          { id: 'sub-git',  ko: 'Git / GitHub',  en: 'Git / GitHub' },
          { id: 'sub-mcp',  ko: 'MCP 서버',      en: 'MCP Servers' },
        ],
      },
    ],
  },
  {
    label: '파일 형식',
    labelEn: 'File Formats',
    items: [
      { id: 'yaml', icon: 'fa-file-code', ko: 'YAML & 파일 구조', en: 'YAML & File Structure' },
    ],
  },
];

export default function Prereqs(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('claudecode');
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
        title={isKo ? '사전지식 & 도구 | Harness Master' : 'Prerequisites & Tools | Harness Master'}
        description={isKo ? 'Harness 구축에 필요한 사전 지식과 핵심 도구를 학습합니다.' : 'Learn the prerequisite knowledge and core tools needed to build with Harness.'}
        path="/prereqs"
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
            {activeSection === 'claudecode' && <ClaudeCodeSection isKo={isKo} />}
            {activeSection === 'prompt'     && <PromptSection isKo={isKo} />}
            {activeSection === 'agent'      && <AgentConceptSection isKo={isKo} />}
            {activeSection === 'env'        && <EnvSection isKo={isKo} />}
            {activeSection === 'tools'      && <ToolsSection isKo={isKo} />}
            {activeSection === 'yaml'       && <YamlSection isKo={isKo} />}
            <div className="guide-section-nav">
              <button
                className="guide-nav-btn prev"
                onClick={() => handleNav(SECTIONS[currentIndex - 1].id)}
                disabled={currentIndex === 0}
              >
                <i className="fa-solid fa-arrow-left" />
                <span><small>{isKo ? '이전' : 'Prev'}</small><strong>{currentIndex > 0 ? (isKo ? SECTIONS[currentIndex-1].ko : SECTIONS[currentIndex-1].en) : ''}</strong></span>
              </button>
              <button
                className="guide-nav-btn next"
                onClick={() => handleNav(SECTIONS[currentIndex + 1].id)}
                disabled={currentIndex === SECTIONS.length - 1}
              >
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

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

function ClaudeCodeSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? 'Claude Code란?' : 'What is Claude Code?'}</h1>
        <p>{isKo ? 'Harness의 기반이 되는 Claude Code의 개념과 동작 원리를 이해합니다.' : 'Understand Claude Code — the foundation that Harness is built on.'}</p>
      </div>

      <h2>{isKo ? 'Claude Code 개요' : 'Claude Code Overview'}</h2>
      <p>{isKo
        ? 'Claude Code는 Anthropic이 개발한 AI 코딩 어시스턴트로, 터미널에서 직접 실행되는 CLI 도구입니다. 단순한 코드 자동완성을 넘어, 프로젝트 전체를 이해하고 복잡한 작업을 자율적으로 수행할 수 있는 에이전트입니다.'
        : 'Claude Code is an AI coding assistant developed by Anthropic — a CLI tool that runs directly in your terminal. Beyond simple code completion, it\'s an agent capable of understanding entire projects and performing complex tasks autonomously.'}</p>

      <h3>{isKo ? '핵심 특징' : 'Key Features'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">📂</div>
          <div className="info-card-title">{isKo ? '파일 시스템 접근' : 'File System Access'}</div>
          <div className="info-card-desc">{isKo ? '프로젝트 파일을 직접 읽고, 수정하고, 생성합니다.' : 'Directly reads, modifies, and creates project files.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">⚡</div>
          <div className="info-card-title">{isKo ? '터미널 명령 실행' : 'Terminal Execution'}</div>
          <div className="info-card-desc">{isKo ? 'bash 명령, 빌드 스크립트, 테스트를 직접 실행합니다.' : 'Executes bash commands, build scripts, and tests directly.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔍</div>
          <div className="info-card-title">{isKo ? '웹 검색' : 'Web Search'}</div>
          <div className="info-card-desc">{isKo ? '최신 정보를 검색하여 응답에 반영합니다.' : 'Searches for up-to-date information and incorporates it into responses.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📝</div>
          <div className="info-card-title">{isKo ? '스킬(CLAUDE.md)' : 'Skills (CLAUDE.md)'}</div>
          <div className="info-card-desc">{isKo ? 'CLAUDE.md 파일로 작업 방식과 컨텍스트를 정의합니다.' : 'Defines working methods and context through CLAUDE.md files.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔌</div>
          <div className="info-card-title">{isKo ? 'MCP 서버 연동' : 'MCP Integration'}</div>
          <div className="info-card-desc">{isKo ? 'Model Context Protocol로 외부 도구와 데이터를 연결합니다.' : 'Connects external tools and data via Model Context Protocol.'}</div>
        </div>
      </div>

      <TipBox type="important">
        {isKo
          ? 'Harness는 Claude Code 위에서 동작합니다. Claude Code가 없으면 Harness를 사용할 수 없습니다. Claude Code CLI 설치가 모든 것의 출발점입니다.'
          : 'Harness runs on top of Claude Code. Without Claude Code, you cannot use Harness. Installing the Claude Code CLI is the starting point for everything.'}
      </TipBox>

      <h3>{isKo ? 'Claude Code vs 일반 AI 챗봇' : 'Claude Code vs General AI Chatbot'}</h3>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>{isKo ? '구분' : 'Aspect'}</th>
              <th>{isKo ? '일반 AI 챗봇' : 'General AI Chatbot'}</th>
              <th>Claude Code</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>{isKo ? '파일 접근' : 'File Access'}</td><td>{isKo ? '불가' : 'No'}</td><td>{isKo ? '직접 읽기/쓰기' : 'Direct read/write'}</td></tr>
            <tr><td>{isKo ? '명령 실행' : 'Command Execution'}</td><td>{isKo ? '불가' : 'No'}</td><td>{isKo ? 'bash 직접 실행' : 'Direct bash execution'}</td></tr>
            <tr><td>{isKo ? '프로젝트 컨텍스트' : 'Project Context'}</td><td>{isKo ? '복붙 필요' : 'Manual paste'}</td><td>{isKo ? '자동 파악' : 'Auto-detected'}</td></tr>
            <tr><td>{isKo ? '에이전트 협업' : 'Agent Collaboration'}</td><td>{isKo ? '불가' : 'No'}</td><td>{isKo ? 'Harness로 가능' : 'Possible with Harness'}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PromptSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '프롬프트 엔지니어링 기초' : 'Prompt Engineering Basics'}</h1>
        <p>{isKo ? 'Harness 스킬과 에이전트 지시문 작성에 필요한 프롬프트 작성 원칙을 학습합니다.' : 'Learn prompt writing principles needed for crafting Harness skills and agent instructions.'}</p>
      </div>

      <h2>{isKo ? '왜 프롬프트 엔지니어링이 중요한가?' : 'Why Prompt Engineering Matters'}</h2>
      <p>{isKo
        ? 'Harness의 스킬 파일과 에이전트 지시문은 모두 프롬프트로 구성됩니다. 잘 작성된 프롬프트는 에이전트가 원하는 방식으로 작동하게 하고, 나쁜 프롬프트는 예측 불가능한 결과를 낳습니다.'
        : 'Harness skill files and agent instructions are all composed of prompts. Well-written prompts make agents behave as intended; poor prompts lead to unpredictable results.'}</p>

      <h3>{isKo ? '핵심 원칙 5가지' : '5 Core Principles'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🎭</div>
          <div className="info-card-title">{isKo ? '역할 정의 (Role)' : 'Role Definition'}</div>
          <div className="info-card-desc">{isKo ? '"시니어 TypeScript 개발자"처럼 에이전트의 역할을 명확하게 정의합니다. 역할이 구체적일수록 응답 품질이 높아집니다.' : 'Define agent roles clearly, e.g., "Senior TypeScript Developer." More specific roles yield higher quality responses.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📋</div>
          <div className="info-card-title">{isKo ? '구체적 지시 (Instruction)' : 'Specific Instructions'}</div>
          <div className="info-card-desc">{isKo ? '무엇을 해야 하는지, 어떤 형식으로 출력해야 하는지 명시합니다. 모호한 표현은 피합니다.' : 'Specify what to do and output format. Avoid vague expressions and describe specific actions.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📄</div>
          <div className="info-card-title">{isKo ? '출력 형식 (Format)' : 'Output Format'}</div>
          <div className="info-card-desc">{isKo ? 'JSON, Markdown, 코드 블록 등 원하는 형식을 명시합니다. 에이전트 간 데이터 교환 시 특히 중요합니다.' : 'Specify JSON, Markdown, code blocks, etc. Especially important when passing data between agents.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">💡</div>
          <div className="info-card-title">{isKo ? '예시 제공 (Example)' : 'Provide Examples'}</div>
          <div className="info-card-desc">{isKo ? 'Few-shot 예시를 제공하면 에이전트가 원하는 패턴을 정확히 이해합니다. 입력/출력 쌍을 2~3개 제시합니다.' : 'Few-shot examples help the agent understand the desired pattern. Provide 2-3 input/output pairs.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🚫</div>
          <div className="info-card-title">{isKo ? '제약 조건 (Constraint)' : 'State Constraints'}</div>
          <div className="info-card-desc">{isKo ? '하지 말아야 할 것, 지켜야 할 규칙을 명시합니다. Harness 에이전트의 범위를 설정합니다.' : 'Specify what not to do and rules. Set boundaries so agents stay within scope.'}</div>
        </div>
      </div>

      <TipBox type="tip">
        {isKo
          ? 'CLAUDE.md 스킬 파일을 작성할 때는 "역할 → 목표 → 지시 → 제약 → 출력 형식" 순서로 구조화하면 일관성 있는 결과를 얻을 수 있습니다.'
          : 'When writing CLAUDE.md skill files, structuring them as "Role → Goal → Instructions → Constraints → Output Format" produces consistent results.'}
      </TipBox>

      <h3>{isKo ? '프롬프트 작성 예시' : 'Prompt Writing Example'}</h3>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">CLAUDE.md 예시</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 역할
당신은 TypeScript 코드 리뷰 전문가입니다.

# 목표
제출된 코드에서 버그, 성능 문제, 보안 취약점을 찾아냅니다.

# 지시
1. 코드를 전체적으로 읽은 후 문제를 분류합니다
2. 심각도를 [CRITICAL/WARNING/INFO]로 표시합니다
3. 각 문제에 대해 수정 방법을 제안합니다

# 출력 형식
## 리뷰 결과
- [CRITICAL] 문제설명 → 수정방법
- [WARNING] 문제설명 → 수정방법`}</code></pre>
        </div>
      </div>
    </div>
  );
}

function AgentConceptSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? 'AI 에이전트 개념' : 'AI Agent Concepts'}</h1>
        <p>{isKo ? 'Harness를 이해하기 위한 AI 에이전트의 기본 개념과 동작 방식을 학습합니다.' : 'Learn the fundamental concepts and mechanics of AI agents needed to understand Harness.'}</p>
      </div>

      <h2>{isKo ? 'AI 에이전트란?' : 'What is an AI Agent?'}</h2>
      <p>{isKo
        ? 'AI 에이전트는 목표를 달성하기 위해 스스로 계획을 세우고, 도구를 사용하며, 환경과 상호작용하는 AI 시스템입니다. 단순히 질문에 답하는 것을 넘어, 여러 단계의 작업을 자율적으로 수행합니다.'
        : 'An AI agent is an AI system that plans, uses tools, and interacts with its environment to achieve goals. Beyond simply answering questions, it autonomously executes multi-step tasks.'}</p>

      <h3>{isKo ? '에이전트의 핵심 구성 요소' : 'Core Components of an Agent'}</h3>
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon"><i className="fa-solid fa-brain" /></div>
          <h4>{isKo ? '언어 모델 (LLM)' : 'Language Model (LLM)'}</h4>
          <p>{isKo ? '추론하고 결정을 내리는 에이전트의 두뇌. Claude Sonnet/Opus 등이 해당합니다.' : 'The agent\'s brain for reasoning and decision-making. Claude Sonnet/Opus etc.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon"><i className="fa-solid fa-toolbox" /></div>
          <h4>{isKo ? '도구 (Tools)' : 'Tools'}</h4>
          <p>{isKo ? '에이전트가 사용할 수 있는 기능들. 파일 읽기, 코드 실행, 웹 검색, API 호출 등.' : 'Functions the agent can use: file reading, code execution, web search, API calls, etc.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon"><i className="fa-solid fa-memory" /></div>
          <h4>{isKo ? '메모리 (Memory)' : 'Memory'}</h4>
          <p>{isKo ? '작업 컨텍스트를 유지하는 메커니즘. 단기(컨텍스트 창)와 장기(파일/DB) 메모리로 구분됩니다.' : 'Mechanism for maintaining task context. Divided into short-term (context window) and long-term (file/DB) memory.'}</p>
        </div>
        <div className="info-card">
          <div className="info-card-icon"><i className="fa-solid fa-arrows-spin" /></div>
          <h4>{isKo ? '실행 루프 (Loop)' : 'Execution Loop'}</h4>
          <p>{isKo ? '목표 달성까지 생각 → 행동 → 관찰을 반복하는 ReAct 패턴.' : 'ReAct pattern that repeats Think → Act → Observe until the goal is achieved.'}</p>
        </div>
      </div>

      <h3>{isKo ? '에이전트의 ReAct 실행 루프' : 'Agent ReAct Execution Loop'}</h3>
      <p>{isKo ? 'AI 에이전트는 Reasoning + Acting의 ReAct 패턴으로 동작합니다. 목표가 달성될 때까지 "생각 → 행동 → 관찰"을 반복합니다.' : 'AI agents operate with the ReAct pattern (Reasoning + Acting). They repeat "Think → Act → Observe" until the goal is achieved.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? 'ReAct 루프 — "src/auth.ts 보안 취약점 수정" 예시' : 'ReAct Loop — "Fix security vulnerability in src/auth.ts" example'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`목표: src/auth.ts 보안 취약점 수정

[Iteration 1]
🧠 Think: "어떤 파일을 수정해야 하는지 먼저 확인해야 한다"
⚡ Act:   Read("src/auth.ts")
👁 Observe: JWT 토큰 만료 시간이 설정되지 않음 발견

[Iteration 2]
🧠 Think: "expiresIn 옵션을 추가하고 테스트해야 한다"
⚡ Act:   Edit("src/auth.ts", old="sign(payload)", new="sign(payload, {expiresIn:'1h'})")
👁 Observe: 파일 수정 성공

[Iteration 3]
🧠 Think: "변경이 올바른지 테스트를 실행해야 한다"
⚡ Act:   Bash("npm test src/auth.test.ts")
👁 Observe: 모든 테스트 통과 ✅

[완료]
🧠 Think: "목표 달성. 보안 취약점 수정 완료"
Result: "JWT expiresIn:'1h' 추가 완료, 테스트 통과"

──────────────────────────────────────────
단일 에이전트: 위 루프 1개
Harness(멀티):  오케스트레이터가 위 루프를 가진 에이전트를 여러 개 동시 실행`}</code></pre>
        </div>
      </div>
      <h3>{isKo ? '단일 에이전트 vs 멀티 에이전트' : 'Single Agent vs Multi-Agent'}</h3>
      <p>{isKo
        ? 'Harness는 멀티 에이전트 시스템입니다. 하나의 오케스트레이터가 여러 서브에이전트를 조율하여 복잡한 작업을 병렬로 처리합니다.'
        : 'Harness is a multi-agent system. A single orchestrator coordinates multiple subagents to process complex tasks in parallel.'}</p>

      <TipBox type="tip">
        {isKo
          ? '에이전트 개념이 생소하다면 먼저 Claude Code를 단일 에이전트로 사용해보세요. 파일 수정, 빌드, 테스트 등의 작업을 자율적으로 수행하는 것을 경험한 후 Harness의 멀티 에이전트 구조를 학습하면 이해가 빠릅니다.'
          : 'If the agent concept is new to you, first try using Claude Code as a single agent. After experiencing it autonomously performing tasks like file modification, building, and testing, learning Harness\'s multi-agent structure will be much faster.'}
      </TipBox>
    </div>
  );
}

function EnvSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '개발 환경 설정' : 'Development Environment Setup'}</h1>
        <p>{isKo ? 'Harness를 실행하기 위한 개발 환경을 단계별로 구성합니다.' : 'Set up your development environment step by step to run Harness.'}</p>
      </div>

      <h2 id="sub-claudecode-install">{isKo ? '1. Claude Code 설치' : '1. Install Claude Code'}</h2>
      <p>{isKo ? 'Claude Code는 npm으로 설치하는 CLI 도구입니다. Node.js 18 이상이 필요합니다.' : 'Claude Code is a CLI tool installed via npm. Requires Node.js 18 or higher.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">Terminal</span>
        </div>
        <div className="code-block-body">
          <pre>{`# Node.js 18+ 설치 확인
node --version

# Claude Code 전역 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version

# 첫 실행 (API 키 설정)
claude`}</pre>
        </div>
      </div>

      <TipBox type="important">
        {isKo
          ? 'Claude Code 실행 시 Anthropic API 키가 필요합니다. console.anthropic.com에서 API 키를 발급받고 ANTHROPIC_API_KEY 환경 변수로 설정하거나 claude 명령어 실행 시 입력합니다.'
          : 'Claude Code requires an Anthropic API key. Get your key from console.anthropic.com and set it as the ANTHROPIC_API_KEY environment variable, or enter it when running the claude command.'}
      </TipBox>

      <h2 id="sub-vscode">{isKo ? '2. VS Code 설정' : '2. VS Code Setup'}</h2>
      <p>{isKo ? 'Harness 개발에 유용한 VS Code 확장 프로그램을 설치합니다.' : 'Install VS Code extensions useful for Harness development.'}</p>
      <ul>
        <li><strong>YAML</strong> — {isKo ? 'YAML 파일 문법 강조 및 유효성 검사' : 'YAML syntax highlighting and validation'}</li>
        <li><strong>Markdown All in One</strong> — {isKo ? 'CLAUDE.md 파일 편집 지원' : 'Support for editing CLAUDE.md files'}</li>
        <li><strong>GitLens</strong> — {isKo ? 'Git 히스토리 시각화' : 'Git history visualization'}</li>
        <li><strong>GitHub Copilot</strong> — {isKo ? '(선택) 코드 자동완성 보조' : '(Optional) Code completion assistance'}</li>
      </ul>

      <h2 id="sub-terminal">{isKo ? '3. 터미널 기초' : '3. Terminal Basics'}</h2>
      <p>{isKo ? 'Claude Code는 터미널에서 실행됩니다. 기본 명령어를 숙지해야 합니다.' : 'Claude Code runs in the terminal. You need to be familiar with basic commands.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">Terminal — 필수 명령어</span>
        </div>
        <div className="code-block-body">
          <pre>{`ls / dir        # 디렉토리 목록
cd <경로>        # 디렉토리 이동
pwd             # 현재 경로 확인
mkdir <폴더명>   # 폴더 생성
cat <파일>       # 파일 내용 출력
cp / mv / rm    # 복사 / 이동 / 삭제
npm install     # 패키지 설치
git status      # Git 상태 확인`}</pre>
        </div>
      </div>
    </div>
  );
}

function ToolsSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '핵심 도구' : 'Core Tools'}</h1>
        <p>{isKo ? 'Harness 구축에 활용하는 핵심 도구들의 역할과 사용법을 알아봅니다.' : 'Learn the roles and usage of core tools used in building with Harness.'}</p>
      </div>

      <h2 id="sub-api">{isKo ? 'Anthropic API' : 'Anthropic API'}</h2>
      <p>{isKo
        ? 'Claude Code와 Harness의 모든 AI 기능은 Anthropic API를 통해 동작합니다. API 사용량에 따라 비용이 발생하므로 사용량을 모니터링하는 것이 중요합니다.'
        : 'All AI capabilities of Claude Code and Harness operate through the Anthropic API. Since costs are incurred based on usage, monitoring your usage is important.'}</p>
      <ul>
        <li><strong>{isKo ? 'API 콘솔' : 'API Console'}</strong>: console.anthropic.com — {isKo ? 'API 키 발급, 사용량 조회, 결제 관리' : 'API key issuance, usage monitoring, billing management'}</li>
        <li><strong>{isKo ? '권장 모델' : 'Recommended Models'}</strong>: claude-sonnet-4-5 ({isKo ? '균형' : 'balanced'}), claude-opus-4-5 ({isKo ? '고성능' : 'high-performance'})</li>
        <li><strong>{isKo ? '환경 변수' : 'Environment Variable'}</strong>: <code>ANTHROPIC_API_KEY=sk-ant-...</code></li>
      </ul>

      <TipBox type="warning">
        {isKo
          ? 'API 키는 절대 코드에 직접 입력하지 마세요. .env 파일에 저장하고 .gitignore에 추가하여 GitHub에 노출되지 않도록 합니다.'
          : 'Never enter API keys directly in code. Save them in a .env file and add it to .gitignore to prevent exposure on GitHub.'}
      </TipBox>

      <h2 id="sub-git">{isKo ? 'Git / GitHub' : 'Git / GitHub'}</h2>
      <p>{isKo
        ? 'Harness 스킬 파일과 프로젝트를 버전 관리하고 팀과 공유하기 위해 Git이 필수입니다.'
        : 'Git is essential for version-controlling Harness skill files and projects, and sharing them with your team.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">Git — 기본 워크플로우</span>
        </div>
        <div className="code-block-body">
          <pre>{`git init                    # 저장소 초기화
git add .claude/            # 스킬 파일 스테이징
git commit -m "add skills"  # 커밋
git push origin main        # 푸시

# .gitignore에 추가할 항목
.env
node_modules/
.anthropic/`}</pre>
        </div>
      </div>

      <h2 id="sub-mcp">{isKo ? 'MCP (Model Context Protocol) 서버' : 'MCP (Model Context Protocol) Servers'}</h2>
      <p>{isKo
        ? 'MCP는 Claude Code가 외부 도구 및 데이터 소스와 연결하는 표준 프로토콜입니다. Harness 에이전트가 데이터베이스, API, 파일 시스템 등에 접근할 수 있게 합니다.'
        : 'MCP is the standard protocol that allows Claude Code to connect with external tools and data sources. It enables Harness agents to access databases, APIs, file systems, and more.'}</p>
      <ul>
        <li><strong>filesystem</strong> — {isKo ? '특정 디렉토리 파일 접근' : 'Access files in specific directories'}</li>
        <li><strong>github</strong> — {isKo ? 'GitHub 저장소와 직접 상호작용' : 'Direct interaction with GitHub repositories'}</li>
        <li><strong>postgresql / sqlite</strong> — {isKo ? '데이터베이스 쿼리 실행' : 'Execute database queries'}</li>
        <li><strong>brave-search</strong> — {isKo ? '웹 검색 기능 강화' : 'Enhanced web search capability'}</li>
        <li><strong>fetch</strong> — {isKo ? 'HTTP 요청 수행' : 'Perform HTTP requests'}</li>
      </ul>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">.claude/settings.json — MCP 설정 예시</span>
        </div>
        <div className="code-block-body">
          <pre>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    }
  }
}`}</pre>
        </div>
      </div>
    </div>
  );
}

function YamlSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? 'YAML & 파일 구조' : 'YAML & File Structure'}</h1>
        <p>{isKo ? 'Harness 스킬 파일과 설정 파일에 사용되는 YAML 형식과 디렉토리 구조를 이해합니다.' : 'Understand the YAML format and directory structure used in Harness skill files and config files.'}</p>
      </div>

      <h2>{isKo ? 'YAML 기초' : 'YAML Basics'}</h2>
      <p>{isKo
        ? 'YAML(YAML Ain\'t Markup Language)은 사람이 읽기 쉬운 데이터 직렬화 형식입니다. Harness의 설정 파일과 일부 스킬 파일에서 사용됩니다.'
        : 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format used in Harness configuration files and some skill files.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">YAML 문법 핵심</span>
        </div>
        <div className="code-block-body">
          <pre>{`# 주석
name: harness-project          # 문자열
version: 1.0                   # 숫자
active: true                   # 불리언

# 리스트
agents:
  - name: researcher
  - name: writer
  - name: reviewer

# 중첩 객체
config:
  model: claude-sonnet-4-5
  max_tokens: 8192
  tools:
    - read_file
    - write_file`}</pre>
        </div>
      </div>

      <h2>{isKo ? 'Harness 프로젝트 파일 구조' : 'Harness Project File Structure'}</h2>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">디렉토리 구조</span>
        </div>
        <div className="code-block-body">
          <pre>{`my-project/
├── CLAUDE.md                  # 메인 스킬 파일 (프로젝트 루트)
├── .claude/
│   ├── settings.json          # Claude Code 설정 (MCP 등)
│   └── skills/                # 개별 스킬 파일 모음
│       ├── researcher.md      # 리서처 에이전트 스킬
│       ├── writer.md          # 작성자 에이전트 스킬
│       └── reviewer.md        # 검토자 에이전트 스킬
├── .env                       # API 키 (gitignore)
└── .gitignore`}</pre>
        </div>
      </div>

      <h2>{isKo ? 'CLAUDE.md 파일의 역할' : 'Role of the CLAUDE.md File'}</h2>
      <p>{isKo
        ? 'CLAUDE.md는 Claude Code가 프로젝트를 시작할 때 자동으로 읽는 스킬 파일입니다. 프로젝트의 맥락, 에이전트 역할, 작업 지시문을 포함합니다.'
        : 'CLAUDE.md is the skill file that Claude Code automatically reads when starting a project. It contains project context, agent roles, and task instructions.'}</p>
      <ul>
        <li><strong>{isKo ? '프로젝트 루트 CLAUDE.md' : 'Root CLAUDE.md'}</strong> — {isKo ? '전체 프로젝트 컨텍스트, 오케스트레이터 지시문' : 'Entire project context, orchestrator instructions'}</li>
        <li><strong>{isKo ? '하위 디렉토리 CLAUDE.md' : 'Subdirectory CLAUDE.md'}</strong> — {isKo ? '해당 폴더에 특화된 스킬 (프로그레시브 디스클로저)' : 'Skills specific to that folder (progressive disclosure)'}</li>
        <li><strong>{isKo ? '.claude/skills/*.md' : '.claude/skills/*.md'}</strong> — {isKo ? '개별 에이전트 스킬 파일' : 'Individual agent skill files'}</li>
      </ul>

      <TipBox type="tip">
        {isKo
          ? 'CLAUDE.md 파일은 Markdown 형식으로 작성합니다. 헤딩(#, ##)으로 섹션을 구분하고, 코드 블록(```)으로 예시를 제공하면 Claude Code가 더 정확하게 이해합니다.'
          : 'CLAUDE.md files are written in Markdown format. Using headings (#, ##) to separate sections and code blocks (```) to provide examples helps Claude Code understand more accurately.'}
      </TipBox>
    </div>
  );
}
