import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

const LEARNING_PATH = [
  {
    step: '01', icon: 'fa-rocket', path: '/intro',
    ko: '기본학습', en: 'Basics',
    descKo: '하네스의 기초 개념, 에이전트, 메모리를 순서대로 학습합니다.',
    descEn: 'Learn the fundamentals: concepts, agents, and memory in order.',
    color: 'var(--color-primary)',
  },
  {
    step: '02', icon: 'fa-hands-holding', path: '/patterns',
    ko: '따라하기', en: 'How-to',
    descKo: '패턴, 스킬 설계, 팀 구성을 직접 따라하며 익힙니다.',
    descEn: 'Follow along with patterns, skill design, and team building.',
    color: '#10b981',
  },
  {
    step: '03', icon: 'fa-flask', path: '/practice',
    ko: '실전활용', en: 'Practice',
    descKo: '실제 프로젝트에 하네스를 적용하는 실전 사례를 배웁니다.',
    descEn: 'Apply Harness to real projects with hands-on use cases.',
    color: '#f59e0b',
  },
  {
    step: '04', icon: 'fa-graduation-cap', path: '/tutorials',
    ko: '튜토리얼', en: 'Tutorials',
    descKo: '5개 튜토리얼을 단계별 체크리스트로 완성합니다.',
    descEn: 'Complete 5 guided tutorials with step-by-step checklists.',
    color: '#8b5cf6',
  },
  {
    step: '05', icon: 'fa-hammer', path: '/build',
    ko: '구축하기', en: 'Build',
    descKo: '나만의 하네스 스킬 라이브러리를 실전으로 구축합니다.',
    descEn: 'Build your personal Harness skill library from scratch.',
    color: '#ef4444',
  },
];

const FEATURES = [
  { icon: 'fa-layer-group', ko: '3단계 사이드바', en: '3-Level Sidebar',
    descKo: '그룹 헤더 → 섹션 → 서브섹션 3단계로 구조화된 학습 경로를 제공합니다. 현재 위치를 한눈에 확인하고 원하는 섹션으로 즉시 이동할 수 있습니다. 서브섹션은 활성 섹션에서만 펼쳐져 집중 학습을 돕습니다.',
    descEn: 'Structured 3-level navigation: Group → Section → Sub-section. See your current position at a glance and jump to any section instantly. Sub-sections only expand for the active item, keeping focus clear.' },
  { icon: 'fa-circle-check', ko: '진행도 추적', en: 'Progress Tracking',
    descKo: '5개 튜토리얼의 체크리스트 완료 상태를 localStorage에 자동 저장합니다. 브라우저를 닫아도 진행 현황이 유지되며 언제든 이어서 학습할 수 있습니다. 전체 진행률을 퍼센트와 시각적 진행 바로 확인하세요.',
    descEn: 'Auto-saves checklist completion for all 5 tutorials to localStorage. Progress persists after closing the browser so you can continue anytime. View overall progress as a percentage and visual progress bar.' },
  { icon: 'fa-language', ko: '한국어 / 영어', en: 'KO / EN Bilingual',
    descKo: '모든 페이지의 텍스트, 코드 주석, 예제까지 한국어와 영어를 즉시 전환합니다. 상단 언어 토글 하나로 전체 사이트 언어가 동시에 변경됩니다. 기술 용어의 원어와 번역어를 비교하며 학습하세요.',
    descEn: 'Instantly switch all text, code comments, and examples between Korean and English. One toggle at the top changes the entire site at once. Compare technical terms in both languages for deeper learning.' },
  { icon: 'fa-palette', ko: '테마 커스터마이징', en: 'Theme Customization',
    descKo: '파랑·초록·보라 등 6가지 컬러 테마와 라이트/다크 모드를 지원합니다. 테마 변경은 즉시 전체 사이트에 적용되고 선택이 자동 저장됩니다. 긴 학습 세션에서도 눈의 피로를 줄이는 최적 테마를 선택하세요.',
    descEn: 'Choose from 6 color themes (blue, green, purple, etc.) with light and dark mode. Changes apply instantly site-wide and your preference is saved automatically. Pick the best theme to reduce eye strain in long sessions.' },
  { icon: 'fa-users', ko: '커뮤니티', en: 'Community',
    descKo: '자료실(공식 문서·GitHub·영상), Q&A, FAQ, 자유게시판 4개 섹션을 운영합니다. 공식 Anthropic 리소스부터 커뮤니티 팁까지 한 곳에서 찾을 수 있습니다. Supabase 기반 실시간 Q&A로 궁금한 점을 빠르게 해결하세요.',
    descEn: 'Four community sections: Resources (official docs, GitHub, videos), Q&A, FAQ, and Free Board. Find everything from official Anthropic resources to community tips in one place. Resolve questions quickly via Supabase-powered real-time Q&A.' },
  { icon: 'fa-code', ko: '실전 코드 예제', en: 'Real Code Examples',
    descKo: '가이드의 모든 개념에 실제 동작하는 스킬 파일과 YAML/JSON 코드 블록을 제공합니다. 50개 이상의 코드 예제에 복사 버튼이 있어 즉시 프로젝트에 적용할 수 있습니다. 단순 설명이 아닌 바로 쓸 수 있는 코드를 목표로 작성되었습니다.',
    descEn: 'Every guide concept includes working skill files and YAML/JSON code blocks. 50+ code examples come with copy buttons for instant use in your project. Written with the goal of providing immediately usable code, not just abstract explanations.' },
];

export default function About(): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  return (
    <>
      <SEOHead
        title={isKo ? 'About | Harness Master' : 'About | Harness Master'}
        description={isKo
          ? 'Harness Master는 Claude Code 하네스를 체계적으로 학습하고 나만의 스킬 라이브러리를 구축하는 전문 학습 플랫폼입니다.'
          : 'Harness Master is a professional learning platform for mastering Claude Code Harness and building your personal skill library.'}
        path="/about"
      />

      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="guide-hero-badge" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <i className="fa-solid fa-circle-info" />
            {isKo ? 'Harness Master 소개' : 'About Harness Master'}
          </div>
          <h1 className="about-hero-title">
            {isKo
              ? 'Claude Code 하네스를 마스터하는\n가장 체계적인 방법'
              : 'The Most Systematic Way\nto Master Claude Code Harness'}
          </h1>
          <p className="about-hero-desc">
            {isKo
              ? 'Harness Master는 스킬 파일 작성부터 멀티 에이전트 팀 구성, 실전 라이브러리 구축까지 단계별로 안내하는 전문 학습 플랫폼입니다.'
              : 'Harness Master guides you step by step — from writing skill files to building multi-agent teams and constructing your own real-world library.'}
          </p>
          <div className="about-actions">
            <Link to="/intro" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-rocket" />
              {isKo ? '학습 시작하기' : 'Start Learning'}
            </Link>
            <Link to="/tutorials" className="btn btn-outline btn-lg">
              <i className="fa-solid fa-graduation-cap" />
              {isKo ? '튜토리얼 보기' : 'View Tutorials'}
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">{isKo ? '5단계 학습 경로' : '5-Step Learning Path'}</h2>
            <p className="section-subtitle">
              {isKo
                ? '기초 개념부터 나만의 하네스 구축까지 순서대로 따라가세요.'
                : 'Follow the path from basic concepts to building your own Harness.'}
            </p>
          </div>
          <div className="about-path-list">
            {LEARNING_PATH.map((item) => (
              <Link key={item.step} to={item.path} className="about-path-card">
                <div className="about-path-step" style={{ color: item.color }}>{item.step}</div>
                <div className="about-path-icon" style={{ background: `${item.color}18`, color: item.color }}>
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <div className="about-path-body">
                  <h3 className="about-path-name">{isKo ? item.ko : item.en}</h3>
                  <p className="about-path-desc">{isKo ? item.descKo : item.descEn}</p>
                </div>
                <i className="fa-solid fa-arrow-right about-path-arrow" style={{ color: item.color }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">{isKo ? '플랫폼 특징' : 'Platform Features'}</h2>
            <p className="section-subtitle">
              {isKo ? '학습 효율을 높이는 다양한 기능을 제공합니다.' : 'A range of features to maximize your learning efficiency.'}
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <i className={`fa-solid ${f.icon}`} />
                </div>
                <h3 className="feature-title">{isKo ? f.ko : f.en}</h3>
                <p className="feature-desc">{isKo ? f.descKo : f.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="cta-title">{isKo ? '지금 바로 시작하세요' : 'Start Right Now'}</h2>
          <p className="cta-subtitle" style={{ marginBottom: '2rem' }}>
            {isKo
              ? '기초 개념부터 실전 구축까지, Harness Master와 함께합니다.'
              : 'From basics to real-world implementation — Harness Master is with you.'}
          </p>
          <div className="cta-actions">
            <Link to="/intro" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-rocket" />
              {isKo ? '기본학습 시작' : 'Start Basics'}
            </Link>
            <Link to="/build" className="btn btn-outline btn-lg">
              <i className="fa-solid fa-hammer" />
              {isKo ? '구축 가이드' : 'Build Guide'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
