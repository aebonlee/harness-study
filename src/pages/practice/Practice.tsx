import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import GuideSidebar3 from '../../components/GuideSidebar3';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const SECTIONS = [
  { id: 'webdev',   ko: '웹 개발 팀',      en: 'Web Dev Team' },
  { id: 'content',  ko: '콘텐츠 제작',     en: 'Content Creation' },
  { id: 'review',   ko: '코드 리뷰',       en: 'Code Review' },
  { id: 'abtest',   ko: 'A/B 테스트',      en: 'A/B Testing' },
  { id: 'strategy', ko: '도입 전략',       en: 'Adoption Strategy' },
  { id: 'measure',  ko: '성과 측정',       en: 'Performance Measurement' },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: '팀 구성 사례',
    labelEn: 'Team Examples',
    items: [
      { id: 'webdev',  icon: 'fa-globe',    ko: '웹 개발 팀',  en: 'Web Dev Team' },
      { id: 'content', icon: 'fa-pen-nib',  ko: '콘텐츠 제작', en: 'Content Creation' },
    ],
  },
  {
    label: '품질 & 측정',
    labelEn: 'Quality & Metrics',
    items: [
      { id: 'review', icon: 'fa-code-compare', ko: '코드 리뷰',  en: 'Code Review' },
      { id: 'abtest', icon: 'fa-chart-bar',    ko: 'A/B 테스트', en: 'A/B Testing' },
    ],
  },
  {
    label: '도입 전략',
    labelEn: 'Adoption',
    items: [
      { id: 'strategy', icon: 'fa-chess-king', ko: '도입 전략', en: 'Adoption Strategy' },
      { id: 'measure',  icon: 'fa-chart-line', ko: '성과 측정', en: 'Performance Measurement' },
    ],
  },
];

export default function Practice(): ReactElement {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('webdev');
  const isKo = language === 'ko';
  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const handleNav = (id: string) => { setActiveSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <SEOHead title={isKo ? '실전 활용 | Harness Master' : 'Real-world Practice | Harness Master'} path="/practice" />
      <div className="guide-page">
        <div className="guide-layout">
          <GuideSidebar3
            groups={NAV_GROUPS}
            activeSection={activeSection}
            onNavigate={handleNav}
            isKo={isKo}
          />
          <main className="guide-content">
            {activeSection === 'webdev'   && <WebdevSection isKo={isKo} />}
            {activeSection === 'content'  && <ContentSection isKo={isKo} />}
            {activeSection === 'review'   && <ReviewSection isKo={isKo} />}
            {activeSection === 'abtest'   && <AbtestSection isKo={isKo} />}
            {activeSection === 'strategy' && <StrategySection isKo={isKo} />}
            {activeSection === 'measure'  && <MeasureSection isKo={isKo} />}
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

function WebdevSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '웹 개발 팀 구성' : 'Web Development Team'}</h1>
        <p>{isKo ? 'Harness로 완전한 웹 개발 에이전트 팀을 구성하고 운영하는 방법을 실전 예시로 배웁니다.' : 'Learn through real examples how to build and operate a complete web development agent team with Harness.'}</p>
      </div>
      <h2>{isKo ? '추천 팀 구성' : 'Recommended Team Composition'}</h2>
      <ul>
        <li><strong>{isKo ? '아키텍트 에이전트 (Opus)' : 'Architect Agent (Opus)'}</strong> — {isKo ? '전체 시스템 설계, 기술 스택 결정, 아키텍처 문서 작성. 고비용이지만 핵심 결정에만 사용.' : 'Full system design, tech stack decisions, architecture documentation. Expensive but used only for key decisions.'}</li>
        <li><strong>{isKo ? '개발 에이전트 (Sonnet) x2' : 'Dev Agent (Sonnet) x2'}</strong> — {isKo ? '실제 코드 구현. 두 개를 병렬로 실행하여 프론트/백엔드를 동시에 개발.' : 'Actual code implementation. Run two in parallel for simultaneous front/backend development.'}</li>
        <li><strong>{isKo ? '리뷰어 에이전트 (Sonnet)' : 'Reviewer Agent (Sonnet)'}</strong> — {isKo ? '코드 품질, 보안 취약점, 성능 이슈 검토. 모든 PR에 의무 적용.' : 'Code quality, security vulnerability, performance issue review. Mandatory for all PRs.'}</li>
        <li><strong>{isKo ? '테스터 에이전트 (Haiku)' : 'Tester Agent (Haiku)'}</strong> — {isKo ? '단위/통합 테스트 자동 생성 및 실행. 저비용 모델로도 충분.' : 'Automatic unit/integration test generation and execution. Low-cost model sufficient.'}</li>
        <li><strong>{isKo ? '배포 에이전트 (Haiku)' : 'Deploy Agent (Haiku)'}</strong> — {isKo ? 'CI/CD 파이프라인 관리, 배포 스크립트 실행.' : 'CI/CD pipeline management, deployment script execution.'}</li>
      </ul>
      <h2>{isKo ? '워크플로우' : 'Workflow'}</h2>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">text</span>
          <span className="code-block-filename">{isKo ? '웹 개발팀 워크플로우' : 'Web Dev Team Workflow'}</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`요구사항(Input)
       │
       ▼
┌──────────────────┐
│  아키텍트 에이전트 │  시스템 설계, 기술 스택 결정
│  (Opus)          │  → architecture.md 출력
└────────┬─────────┘
         │ 설계 완료 → 팬아웃(Fan-out)
    ┌────┴─────┐
    ▼           ▼
┌────────┐  ┌─────────┐
│프론트   │  │백엔드    │  병렬 구현 (Sonnet x2)
│에이전트 │  │에이전트  │
└───┬────┘  └────┬────┘
    │             │
    └──────┬──────┘
           │ 팬인(Fan-in)
           ▼
┌──────────────────┐
│  리뷰어 에이전트  │  코드 품질·보안·성능 검토 (Sonnet)
└────────┬─────────┘
         │ score ≥ 70 → 통과
         ▼
┌──────────────────┐
│  테스터 에이전트  │  단위·통합 테스트 (Haiku)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  배포 에이전트   │  CI/CD 파이프라인 실행 (Haiku)
└────────┬─────────┘
         │
         ▼
    최종 배포(Output)`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '비용 최적화: 아키텍트에는 Opus, 개발/리뷰에는 Sonnet, 테스트/배포에는 Haiku를 사용하면 성능과 비용의 균형을 맞출 수 있습니다.' : 'Cost optimization: Use Opus for architect, Sonnet for dev/review, Haiku for test/deploy to balance performance and cost.'}</TipBox>
    </div>
  );
}

function ContentSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '콘텐츠 제작 팀' : 'Content Creation Team'}</h1>
        <p>{isKo ? 'Harness로 고품질 콘텐츠를 대규모로 제작하는 팀을 구성합니다.' : 'Build a team with Harness for large-scale high-quality content creation.'}</p>
      </div>
      <h2>{isKo ? '콘텐츠 제작 팀 구성' : 'Content Creation Team Composition'}</h2>
      <ul>
        <li><strong>{isKo ? '리서치 에이전트' : 'Research Agent'}</strong> — {isKo ? '주제 조사, 데이터 수집, 경쟁 분석, 키워드 발굴' : 'Topic research, data collection, competitive analysis, keyword discovery'}</li>
        <li><strong>{isKo ? '아웃라인 에이전트' : 'Outline Agent'}</strong> — {isKo ? '콘텐츠 구조 설계, 목차 작성, 스토리라인 구성' : 'Content structure design, TOC writing, storyline composition'}</li>
        <li><strong>{isKo ? '작성 에이전트 x2' : 'Writing Agent x2'}</strong> — {isKo ? '본문 작성, 팬아웃 패턴으로 섹션별 병렬 작성' : 'Body writing, parallel writing by section using fan-out pattern'}</li>
        <li><strong>{isKo ? '편집 에이전트' : 'Editing Agent'}</strong> — {isKo ? '문체 통일, 가독성 개선, 오류 교정' : 'Style unification, readability improvement, error correction'}</li>
        <li><strong>{isKo ? 'SEO 에이전트' : 'SEO Agent'}</strong> — {isKo ? '키워드 최적화, 메타 태그 작성, 내부 링크 구성' : 'Keyword optimization, meta tag writing, internal link structure'}</li>
      </ul>
      <TipBox type="important">{isKo ? 'harness-for-everyone 프로젝트 자체가 Harness로 제작되었습니다. 8개의 에이전트가 개념 설계팀과 시각 제작팀으로 나뉘어 KO/EN/JP 3개 언어 자료를 동시에 제작했습니다.' : 'The harness-for-everyone project itself was created with Harness. 8 agents divided into a conceptual design team and visual production team simultaneously created materials in 3 languages: KO/EN/JP.'}</TipBox>
    </div>
  );
}

function ReviewSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '코드 리뷰 시스템' : 'Code Review System'}</h1>
        <p>{isKo ? 'Harness로 자동화된 코드 리뷰 시스템을 구축하는 방법을 알아봅니다.' : 'Learn how to build an automated code review system with Harness.'}</p>
      </div>
      <h2>{isKo ? '다층 리뷰 아키텍처' : 'Multi-layer Review Architecture'}</h2>
      <p>{isKo ? '전문가 풀 패턴을 활용하여 코드 유형에 따라 전문 리뷰어를 배정합니다.' : 'Using the expert pool pattern, assign specialist reviewers based on code type.'}</p>
      <ul>
        <li><strong>{isKo ? '보안 리뷰어' : 'Security Reviewer'}</strong> — {isKo ? 'OWASP Top 10, SQL Injection, XSS, 인증/인가 취약점 검토' : 'OWASP Top 10, SQL Injection, XSS, auth/authorization vulnerability review'}</li>
        <li><strong>{isKo ? '성능 리뷰어' : 'Performance Reviewer'}</strong> — {isKo ? 'N+1 쿼리, 불필요한 렌더링, 메모리 누수 검토' : 'N+1 queries, unnecessary rendering, memory leak review'}</li>
        <li><strong>{isKo ? '아키텍처 리뷰어' : 'Architecture Reviewer'}</strong> — {isKo ? 'SOLID 원칙, 디자인 패턴 준수, 결합도/응집도 검토' : 'SOLID principles, design pattern compliance, coupling/cohesion review'}</li>
        <li><strong>{isKo ? '테스트 리뷰어' : 'Test Reviewer'}</strong> — {isKo ? '테스트 커버리지, 엣지 케이스, 테스트 품질 검토' : 'Test coverage, edge cases, test quality review'}</li>
      </ul>
      <TipBox type="tip">{isKo ? '리뷰 결과를 표준화된 형식(JSON)으로 출력하도록 스킬을 설계하면, 리뷰 통계를 쉽게 집계하고 코드베이스의 취약 영역을 식별할 수 있습니다.' : 'Design skills to output review results in standardized format (JSON) to easily aggregate review statistics and identify weak areas in the codebase.'}</TipBox>
    </div>
  );
}

function AbtestSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>A/B {isKo ? '테스트' : 'Testing'}</h1>
        <p>{isKo ? 'Harness 도입 효과를 객관적으로 검증하는 A/B 테스트 방법론을 배웁니다.' : 'Learn the A/B testing methodology to objectively verify the effectiveness of Harness adoption.'}</p>
      </div>
      <h2>{isKo ? 'A/B 테스트 설계' : 'A/B Test Design'}</h2>
      <p>{isKo ? 'harness-abtest 프레임워크를 사용하여 스킬 유무에 따른 성능 차이를 측정합니다.' : 'Use the harness-abtest framework to measure performance differences with and without skills.'}</p>
      <h3>{isKo ? '측정 항목' : 'Metrics to Measure'}</h3>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>{isKo?'측정 항목':'Metric'}</th><th>{isKo?'스킬 없음 (Control)':'Without Skill (Control)'}</th><th>{isKo?'스킬 있음 (Treatment)':'With Skill (Treatment)'}</th></tr></thead>
          <tbody>
            <tr><td>{isKo?'코드 품질 점수':'Code Quality Score'}</td><td>{isKo?'기준값':'Baseline'}</td><td>{isKo?'+15~30% 향상 (기대)':'Expected +15~30% improvement'}</td></tr>
            <tr><td>{isKo?'출력 일관성':'Output Consistency'}</td><td>{isKo?'높은 분산':'High variance'}</td><td>{isKo?'낮은 분산 (기대)':'Expected lower variance'}</td></tr>
            <tr><td>{isKo?'실행 시간':'Execution Time'}</td><td>{isKo?'기준값':'Baseline'}</td><td>{isKo?'+10~20% (오버헤드)':'Expected +10~20% (overhead)'}</td></tr>
            <tr><td>{isKo?'오류율':'Error Rate'}</td><td>{isKo?'기준값':'Baseline'}</td><td>{isKo?'-30~50% (기대)':'Expected -30~50%'}</td></tr>
          </tbody>
        </table>
      </div>
      <TipBox type="important">{isKo ? '최소 5~10회 반복 테스트를 권장합니다. 단일 테스트 결과는 통계적으로 신뢰하기 어렵습니다. revfactory의 공식 A/B 테스트는 n=15로 진행되었습니다.' : 'We recommend a minimum of 5-10 repetitions. Single test results are statistically unreliable. revfactory\'s official A/B test was conducted with n=15.'}</TipBox>
    </div>
  );
}

function StrategySection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? 'Harness 도입 전략' : 'Harness Adoption Strategy'}</h1>
        <p>{isKo ? '조직이나 프로젝트에 Harness를 성공적으로 도입하는 단계별 전략을 배웁니다.' : 'Learn step-by-step strategies for successfully adopting Harness in an organization or project.'}</p>
      </div>
      <h2>{isKo ? '4단계 도입 로드맵' : '4-Phase Adoption Roadmap'}</h2>
      <ol>
        <li>
          <strong>{isKo ? '1단계: 파일럿 (1-2주)' : 'Phase 1: Pilot (1-2 weeks)'}</strong>
          <p>{isKo ? '작은 규모의 실제 프로젝트에 Harness를 적용합니다. 간단한 2-에이전트 팀부터 시작하여 팀원들이 개념을 이해합니다.' : 'Apply Harness to a small real project. Start with a simple 2-agent team for team members to understand the concept.'}</p>
        </li>
        <li>
          <strong>{isKo ? '2단계: 학습 (2-4주)' : 'Phase 2: Learning (2-4 weeks)'}</strong>
          <p>{isKo ? '파일럿에서 얻은 교훈을 바탕으로 스킬을 개선하고 팀 구성을 최적화합니다. A/B 테스트로 효과를 검증합니다.' : 'Based on lessons from the pilot, improve skills and optimize team composition. Verify effectiveness with A/B tests.'}</p>
        </li>
        <li>
          <strong>{isKo ? '3단계: 확장 (1-2개월)' : 'Phase 3: Scaling (1-2 months)'}</strong>
          <p>{isKo ? '검증된 팀 구성을 다른 프로젝트에 적용합니다. 스킬 라이브러리를 구축하고 팀 전체에 공유합니다.' : 'Apply validated team compositions to other projects. Build a skill library and share it with the entire team.'}</p>
        </li>
        <li>
          <strong>{isKo ? '4단계: 정착 (지속적)' : 'Phase 4: Establishment (Ongoing)'}</strong>
          <p>{isKo ? 'Harness를 표준 개발 워크플로우에 통합합니다. 새 팀원 온보딩에 Harness 교육을 포함합니다.' : 'Integrate Harness into the standard development workflow. Include Harness training in new team member onboarding.'}</p>
        </li>
      </ol>
      <TipBox type="warning">{isKo ? '한 번에 모든 것을 바꾸려 하지 마세요. 점진적 도입이 성공률이 높습니다. 첫 번째 프로젝트에서 완벽한 Harness 활용을 목표로 삼지 말고, 배우고 개선하는 과정으로 여기세요.' : 'Don\'t try to change everything at once. Gradual adoption has a higher success rate. Don\'t aim for perfect Harness usage on the first project; treat it as a learning and improvement process.'}</TipBox>
    </div>
  );
}

function MeasureSection({ isKo }: { isKo: boolean }): ReactElement {
  return (
    <div className="guide-section">
      <div className="guide-content-header">
        <h1>{isKo ? '성과 측정' : 'Performance Measurement'}</h1>
        <p>{isKo ? 'Harness 도입의 성과를 객관적으로 측정하고 지속 개선하는 방법을 배웁니다.' : 'Learn how to objectively measure the results of Harness adoption and continuously improve.'}</p>
      </div>
      <h2>{isKo ? '핵심 성과 지표(KPI)' : 'Key Performance Indicators (KPIs)'}</h2>
      <ul>
        <li><strong>{isKo ? '생산성 지표' : 'Productivity Metrics'}</strong> — {isKo ? '작업당 평균 처리 시간, 일일 완료 작업 수, 반복 작업 자동화율' : 'Average processing time per task, daily completed tasks, repetitive task automation rate'}</li>
        <li><strong>{isKo ? '품질 지표' : 'Quality Metrics'}</strong> — {isKo ? '코드 리뷰 통과율, 버그 발생률, 고객 만족도' : 'Code review pass rate, bug occurrence rate, customer satisfaction'}</li>
        <li><strong>{isKo ? '비용 지표' : 'Cost Metrics'}</strong> — {isKo ? 'API 호출 비용, 모델별 비용 배분, ROI' : 'API call cost, cost distribution by model, ROI'}</li>
        <li><strong>{isKo ? '학습 지표' : 'Learning Metrics'}</strong> — {isKo ? '스킬 재사용률, 팀 만족도, 온보딩 시간' : 'Skill reuse rate, team satisfaction, onboarding time'}</li>
      </ul>
      <h3>{isKo ? '월간 리뷰 체크리스트' : 'Monthly Review Checklist'}</h3>
      <ul>
        <li>{isKo ? '가장 자주 사용된 스킬 TOP 3 확인' : 'Check TOP 3 most frequently used skills'}</li>
        <li>{isKo ? '가장 많은 오류가 발생한 에이전트 역할 분석' : 'Analyze agent roles with most errors'}</li>
        <li>{isKo ? 'A/B 테스트 결과 기반 스킬 개선' : 'Improve skills based on A/B test results'}</li>
        <li>{isKo ? '새로운 도메인에 적용 가능한 패턴 식별' : 'Identify patterns applicable to new domains'}</li>
        <li>{isKo ? '팀원 피드백 수집 및 반영' : 'Collect and incorporate team member feedback'}</li>
      </ul>
      <TipBox type="tip">{isKo ? '처음부터 완벽한 측정 시스템을 구축하려 하지 마세요. "측정하고 싶은 것 2-3가지"부터 시작하여 점진적으로 대시보드를 확장하세요.' : 'Don\'t try to build a perfect measurement system from the start. Start with "2-3 things you want to measure" and gradually expand the dashboard.'}</TipBox>
    </div>
  );
}
