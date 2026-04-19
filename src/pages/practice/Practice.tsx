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
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🏗️</div>
          <div className="info-card-title">{isKo ? '아키텍트 에이전트 (Opus)' : 'Architect Agent (Opus)'}</div>
          <div className="info-card-desc">{isKo ? '전체 시스템 설계, 기술 스택 결정, 아키텍처 문서 작성. 고비용이지만 핵심 결정에만 사용.' : 'Full system design, tech stack decisions, architecture documentation. Expensive but used only for key decisions.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🎨</div>
          <div className="info-card-title">{isKo ? '개발 에이전트 (Sonnet) ×2' : 'Dev Agent (Sonnet) ×2'}</div>
          <div className="info-card-desc">{isKo ? '실제 코드 구현. 두 개를 병렬로 실행하여 프론트/백엔드를 동시에 개발.' : 'Actual code implementation. Run two in parallel for simultaneous front/backend development.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔍</div>
          <div className="info-card-title">{isKo ? '리뷰어 에이전트 (Sonnet)' : 'Reviewer Agent (Sonnet)'}</div>
          <div className="info-card-desc">{isKo ? '코드 품질, 보안 취약점, 성능 이슈 검토. 모든 PR에 의무 적용.' : 'Code quality, security vulnerability, performance issue review. Mandatory for all PRs.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🧪</div>
          <div className="info-card-title">{isKo ? '테스터 에이전트 (Haiku)' : 'Tester Agent (Haiku)'}</div>
          <div className="info-card-desc">{isKo ? '단위/통합 테스트 자동 생성 및 실행. 저비용 모델로도 충분.' : 'Automatic unit/integration test generation and execution. Low-cost model sufficient.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🚀</div>
          <div className="info-card-title">{isKo ? '배포 에이전트 (Haiku)' : 'Deploy Agent (Haiku)'}</div>
          <div className="info-card-desc">{isKo ? 'CI/CD 파이프라인 관리, 배포 스크립트 실행.' : 'CI/CD pipeline management, deployment script execution.'}</div>
        </div>
      </div>
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
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🔬</div>
          <div className="info-card-title">{isKo ? '리서치 에이전트' : 'Research Agent'}</div>
          <div className="info-card-desc">{isKo ? '주제 조사, 데이터 수집, 경쟁 분석, 키워드 발굴' : 'Topic research, data collection, competitive analysis, keyword discovery'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📐</div>
          <div className="info-card-title">{isKo ? '아웃라인 에이전트' : 'Outline Agent'}</div>
          <div className="info-card-desc">{isKo ? '콘텐츠 구조 설계, 목차 작성, 스토리라인 구성' : 'Content structure design, TOC writing, storyline composition'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">✍️</div>
          <div className="info-card-title">{isKo ? '작성 에이전트 ×2' : 'Writing Agent ×2'}</div>
          <div className="info-card-desc">{isKo ? '본문 작성, 팬아웃 패턴으로 섹션별 병렬 작성' : 'Body writing, parallel writing by section using fan-out pattern'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">✏️</div>
          <div className="info-card-title">{isKo ? '편집 에이전트' : 'Editing Agent'}</div>
          <div className="info-card-desc">{isKo ? '문체 통일, 가독성 개선, 오류 교정' : 'Style unification, readability improvement, error correction'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🔎</div>
          <div className="info-card-title">{isKo ? 'SEO 에이전트' : 'SEO Agent'}</div>
          <div className="info-card-desc">{isKo ? '키워드 최적화, 메타 태그 작성, 내부 링크 구성' : 'Keyword optimization, meta tag writing, internal link structure'}</div>
        </div>
      </div>
      <h2>{isKo ? 'CLAUDE.md — 콘텐츠 제작 오케스트레이터' : 'CLAUDE.md — Content Creation Orchestrator'}</h2>
      <p>{isKo ? '아래는 5개 에이전트로 구성된 콘텐츠 제작팀의 오케스트레이터 파일입니다. 팬아웃 패턴으로 섹션별 병렬 작성을 수행합니다.' : 'Below is the orchestrator file for a 5-agent content creation team. Performs parallel section writing with a fan-out pattern.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">markdown</span>
          <span className="code-block-filename">.claude/CLAUDE.md (콘텐츠 제작 오케스트레이터)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`# 콘텐츠 제작 오케스트레이터

## Role
5개 에이전트로 구성된 콘텐츠 제작팀을 조율합니다.
리서치 → 아웃라인 → 병렬 작성 → 편집 → SEO 파이프라인을 관리합니다.

## Team Members
- research-agent  : 주제 조사, 키워드 발굴, 경쟁 분석 (Sonnet)
- outline-agent   : 콘텐츠 구조 설계, 목차 작성 (Sonnet)
- writing-agent-1 : 도입/본문 섹션 1~3 작성 (Sonnet)
- writing-agent-2 : 본문 섹션 4~6/결론 작성 (Sonnet)
- seo-agent       : 키워드 최적화, 메타 태그 작성 (Haiku)

## Workflow
1. research-agent에게 주제 조사 위임 → research-report.md 출력
2. outline-agent에게 목차 설계 위임 → outline.md 출력
3. writing-agent-1, writing-agent-2 동시 실행 (팬아웃)
   - writing-agent-1: 섹션 1~3 작성
   - writing-agent-2: 섹션 4~6 + 결론 작성
4. 두 에이전트 결과 취합 (팬인) → draft.md 통합
5. seo-agent에게 최적화 위임 → final.md 출력

## Rules
- 각 에이전트에게 이전 단계 결과 파일을 반드시 전달
- 작성 에이전트 결과 취합 시 문체/용어 일관성 유지
- SEO 점수 80 미만이면 seo-agent에게 재작업 요청`}</code></pre>
        </div>
      </div>
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
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🔒</div>
          <div className="info-card-title">{isKo ? '보안 리뷰어' : 'Security Reviewer'}</div>
          <div className="info-card-desc">{isKo ? 'OWASP Top 10, SQL Injection, XSS, 인증/인가 취약점 검토' : 'OWASP Top 10, SQL Injection, XSS, auth/authorization vulnerability review'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">⚡</div>
          <div className="info-card-title">{isKo ? '성능 리뷰어' : 'Performance Reviewer'}</div>
          <div className="info-card-desc">{isKo ? 'N+1 쿼리, 불필요한 렌더링, 메모리 누수 검토' : 'N+1 queries, unnecessary rendering, memory leak review'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🏛️</div>
          <div className="info-card-title">{isKo ? '아키텍처 리뷰어' : 'Architecture Reviewer'}</div>
          <div className="info-card-desc">{isKo ? 'SOLID 원칙, 디자인 패턴 준수, 결합도/응집도 검토' : 'SOLID principles, design pattern compliance, coupling/cohesion review'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🧪</div>
          <div className="info-card-title">{isKo ? '테스트 리뷰어' : 'Test Reviewer'}</div>
          <div className="info-card-desc">{isKo ? '테스트 커버리지, 엣지 케이스, 테스트 품질 검토' : 'Test coverage, edge cases, test quality review'}</div>
        </div>
      </div>
      <h3>{isKo ? '표준화된 리뷰 결과 JSON 예시' : 'Standardized Review Result JSON Example'}</h3>
      <p>{isKo ? '4개 리뷰어 에이전트가 동일한 JSON 형식으로 결과를 반환하면, 오케스트레이터가 결과를 취합하여 종합 리뷰 보고서를 생성합니다.' : 'When 4 reviewer agents return results in the same JSON format, the orchestrator aggregates them into a comprehensive review report.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">tmp/review-result.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "pr_id": "PR-142",
  "total_score": 76,
  "reviews": [
    {
      "reviewer": "security-reviewer",
      "score": 85,
      "issues": [
        {
          "severity": "high",
          "file": "src/api/auth.ts",
          "line": 34,
          "message": "JWT 토큰 만료 시간 미설정",
          "suggestion": "expiresIn: '1h' 옵션 추가"
        }
      ]
    },
    {
      "reviewer": "performance-reviewer",
      "score": 70,
      "issues": [
        {
          "severity": "medium",
          "file": "src/hooks/useUsers.ts",
          "line": 12,
          "message": "N+1 쿼리 발생 가능성",
          "suggestion": "useQuery의 select 옵션으로 필요한 필드만 선택"
        }
      ]
    }
  ],
  "pass": true,
  "summary": "보안 이슈 1개 즉시 수정 필요, 성능 개선 권장"
}`}</code></pre>
        </div>
      </div>
      <TipBox type="tip">{isKo ? '리뷰 결과를 표준화된 형식(JSON)으로 출력하도록 스킬을 설계하면, 리뷰 통계를 쉽게 집계하고 코드베이스의 취약 영역을 식별할 수 있습니다.' : 'Design skills to output review results in standardized format (JSON) to easily aggregate review statistics and identify weak areas in the codebase.'}</TipBox>
      <TipBox type="danger">{isKo ? '자동 코드 리뷰 결과만 믿고 수동 검토를 생략하지 마세요. AI 리뷰어는 비즈니스 로직 오류, 요구사항 불일치 등 맥락적 문제를 놓칠 수 있습니다.' : 'Do not skip manual review based solely on automated results. AI reviewers can miss contextual issues like business logic errors and requirement mismatches.'}</TipBox>
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
      <h3>{isKo ? 'A/B 테스트 설정 + 결과 JSON 예시' : 'A/B Test Config + Result JSON Example'}</h3>
      <p>{isKo ? '하네스-abtest 프레임워크의 실제 설정 파일과 n=5 실행 결과입니다. 이 구조를 복사하여 자신의 스킬 A/B 테스트에 활용하세요.' : 'Actual config file and n=5 run results from the harness-abtest framework. Copy this structure for your own skill A/B tests.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">harness-abtest/config.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "experiment": "code-review-skill-v2",
  "task": "PR #88 코드 리뷰 수행",
  "runs": 5,
  "groups": {
    "control":   { "skill": null,            "model": "claude-sonnet-4-5" },
    "treatment": { "skill": "code-review.md", "model": "claude-sonnet-4-5" }
  },
  "metrics": ["quality_score", "consistency", "execution_time_sec"]
}`}</code></pre>
        </div>
      </div>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">harness-abtest/results.json (n=5 결과)</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "experiment": "code-review-skill-v2",
  "summary": {
    "control": {
      "quality_score_avg": 64.2,
      "quality_score_std": 18.7,
      "output_format_match": 0.4,
      "avg_time_sec": 28
    },
    "treatment": {
      "quality_score_avg": 83.6,
      "quality_score_std": 4.2,
      "output_format_match": 1.0,
      "avg_time_sec": 31
    }
  },
  "verdict": {
    "quality_improvement": "+30.2%",
    "variance_reduction": "-77.5%",
    "time_overhead": "+10.7%",
    "recommendation": "ADOPT — 품질 향상이 시간 오버헤드를 상회함"
  }
}`}</code></pre>
        </div>
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
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">🌱</div>
          <div className="info-card-title">{isKo ? '1단계: 파일럿 (1-2주)' : 'Phase 1: Pilot (1-2 weeks)'}</div>
          <div className="info-card-desc">{isKo ? '작은 규모의 실제 프로젝트에 Harness를 적용합니다. 간단한 2-에이전트 팀부터 시작하여 팀원들이 개념을 이해합니다.' : 'Apply Harness to a small real project. Start with a simple 2-agent team for team members to understand the concept.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📚</div>
          <div className="info-card-title">{isKo ? '2단계: 학습 (2-4주)' : 'Phase 2: Learning (2-4 weeks)'}</div>
          <div className="info-card-desc">{isKo ? '파일럿에서 얻은 교훈을 바탕으로 스킬을 개선하고 팀 구성을 최적화합니다. A/B 테스트로 효과를 검증합니다.' : 'Based on lessons from the pilot, improve skills and optimize team composition. Verify effectiveness with A/B tests.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📈</div>
          <div className="info-card-title">{isKo ? '3단계: 확장 (1-2개월)' : 'Phase 3: Scaling (1-2 months)'}</div>
          <div className="info-card-desc">{isKo ? '검증된 팀 구성을 다른 프로젝트에 적용합니다. 스킬 라이브러리를 구축하고 팀 전체에 공유합니다.' : 'Apply validated team compositions to other projects. Build a skill library and share it with the entire team.'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">🏆</div>
          <div className="info-card-title">{isKo ? '4단계: 정착 (지속적)' : 'Phase 4: Establishment (Ongoing)'}</div>
          <div className="info-card-desc">{isKo ? 'Harness를 표준 개발 워크플로우에 통합합니다. 새 팀원 온보딩에 Harness 교육을 포함합니다.' : 'Integrate Harness into the standard development workflow. Include Harness training in new team member onboarding.'}</div>
        </div>
      </div>
      <h3>{isKo ? '도입 단계별 마일스톤 추적 JSON' : 'Phase-by-Phase Milestone Tracker JSON'}</h3>
      <p>{isKo ? '오케스트레이터 또는 팀 리드가 Harness 도입 진행 상황을 추적하는 파일입니다. 각 단계의 목표, 성공 기준, 완료 여부를 기록합니다.' : 'File for the orchestrator or team lead to track Harness adoption progress. Records each phase\'s goals, success criteria, and completion.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">tmp/adoption-roadmap.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "project": "my-team-harness-adoption",
  "started": "2026-04-01",
  "phases": [
    {
      "phase": 1,
      "name": "pilot",
      "duration": "1-2주",
      "goal": "2-에이전트 팀으로 실제 작업 1개 완료",
      "success_criteria": "수동 대비 오류 수 감소",
      "status": "completed",
      "actual_result": "리뷰 오류 40% 감소, 팀원 이해도 양호"
    },
    {
      "phase": 2,
      "name": "learning",
      "duration": "2-4주",
      "goal": "파일럿 교훈으로 스킬 3개 개선",
      "success_criteria": "스킬 재사용률 > 60%",
      "status": "in_progress",
      "current_reuse_rate": 0.52
    },
    {
      "phase": 3,
      "name": "scaling",
      "duration": "1-2개월",
      "goal": "3개 이상 프로젝트에 적용",
      "success_criteria": "수동 대비 시간 절약 > 20%",
      "status": "pending"
    },
    {
      "phase": 4,
      "name": "establishment",
      "duration": "지속",
      "goal": "표준 워크플로우 통합 + 온보딩 포함",
      "success_criteria": "신규 팀원 1주 이내 독립 사용",
      "status": "pending"
    }
  ]
}`}</code></pre>
        </div>
      </div>
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
      <div className="info-grid">
        <div className="info-card">
          <div className="info-card-icon">⚡</div>
          <div className="info-card-title">{isKo ? '생산성 지표' : 'Productivity Metrics'}</div>
          <div className="info-card-desc">{isKo ? '작업당 평균 처리 시간, 일일 완료 작업 수, 반복 작업 자동화율' : 'Average processing time per task, daily completed tasks, repetitive task automation rate'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">✅</div>
          <div className="info-card-title">{isKo ? '품질 지표' : 'Quality Metrics'}</div>
          <div className="info-card-desc">{isKo ? '코드 리뷰 통과율, 버그 발생률, 고객 만족도' : 'Code review pass rate, bug occurrence rate, customer satisfaction'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">💰</div>
          <div className="info-card-title">{isKo ? '비용 지표' : 'Cost Metrics'}</div>
          <div className="info-card-desc">{isKo ? 'API 호출 비용, 모델별 비용 배분, ROI' : 'API call cost, cost distribution by model, ROI'}</div>
        </div>
        <div className="info-card">
          <div className="info-card-icon">📖</div>
          <div className="info-card-title">{isKo ? '학습 지표' : 'Learning Metrics'}</div>
          <div className="info-card-desc">{isKo ? '스킬 재사용률, 팀 만족도, 온보딩 시간' : 'Skill reuse rate, team satisfaction, onboarding time'}</div>
        </div>
      </div>
      <h3>{isKo ? 'KPI 추적 파일 예시' : 'KPI Tracking File Example'}</h3>
      <p>{isKo ? '오케스트레이터가 매 스프린트 종료 후 자동으로 업데이트하는 KPI 추적 파일입니다.' : 'A KPI tracking file the orchestrator automatically updates after each sprint.'}</p>
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-lang">json</span>
          <span className="code-block-filename">tmp/kpi-report.json</span>
        </div>
        <div className="code-block-body">
          <pre><code>{`{
  "period": "2026-04 Sprint 3",
  "productivity": {
    "tasks_completed": 47,
    "avg_time_per_task_min": 8.3,
    "parallel_ratio": 0.72,
    "automation_rate": 0.85
  },
  "quality": {
    "review_pass_rate": 0.91,
    "bug_rate_per_100_lines": 0.4,
    "avg_review_score": 82
  },
  "cost": {
    "total_api_cost_usd": 12.40,
    "cost_per_task_usd": 0.26,
    "model_distribution": {
      "opus": 0.15,
      "sonnet": 0.65,
      "haiku": 0.20
    }
  },
  "top_skills_used": ["code-review", "test-writer", "doc-generator"],
  "improvement_notes": "리뷰어 재작업률 9% → 다음 스프린트 트리거 정밀화 필요"
}`}</code></pre>
        </div>
      </div>
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
