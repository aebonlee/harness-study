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
    descKo: '그룹 → 섹션 → 서브섹션으로 체계적인 학습 경로를 제공합니다.',
    descEn: 'Group → Section → Sub-section for a structured learning path.' },
  { icon: 'fa-circle-check', ko: '진행도 추적', en: 'Progress Tracking',
    descKo: '튜토리얼 체크리스트 완료 현황을 자동으로 저장합니다.',
    descEn: 'Automatically saves your tutorial checklist completion status.' },
  { icon: 'fa-language', ko: '한국어 / 영어', en: 'KO / EN Bilingual',
    descKo: '모든 콘텐츠를 한국어와 영어로 즉시 전환합니다.',
    descEn: 'Instantly switch all content between Korean and English.' },
  { icon: 'fa-palette', ko: '테마 커스터마이징', en: 'Theme Customization',
    descKo: '6가지 컬러 테마와 라이트/다크 모드를 지원합니다.',
    descEn: 'Supports 6 color themes with light and dark mode.' },
  { icon: 'fa-users', ko: '커뮤니티', en: 'Community',
    descKo: '자료실, Q&A, FAQ, 자유게시판으로 함께 성장합니다.',
    descEn: 'Grow together via Resources, Q&A, FAQ, and Free Board.' },
  { icon: 'fa-code', ko: '실전 코드 예제', en: 'Real Code Examples',
    descKo: '모든 개념에 실제 스킬 파일과 코드 블록을 제공합니다.',
    descEn: 'Every concept comes with real skill files and code examples.' },
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
