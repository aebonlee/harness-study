import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LEARNING_PATHS } from '../config/site';
import SEOHead from '../components/SEOHead';
import HeroBackground from '../components/HeroBackground';
import HeroCarousel from '../components/HeroCarousel';
import FeatureCard from '../components/FeatureCard';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  const { language, t } = useLanguage();
  const isKo = language === 'ko';

  const carouselSlides = [
    {
      title: isKo ? '에이전트 팀부터 실전 활용까지' : 'From Agent Teams to Real-world Use',
      description: isKo
        ? '6가지 아키텍처 패턴, 스킬 설계, 메모리 관리까지 — Harness의 모든 것을 체계적으로 마스터합니다.'
        : 'From 6 architectural patterns to skill design and memory management — master everything about Harness systematically.',
    },
    {
      title: isKo ? '실전 검증된 패턴으로 빠르게 구축' : 'Build Fast with Battle-tested Patterns',
      description: isKo
        ? '파이프라인, 팬아웃/팬인, 전문가 풀 등 6가지 패턴으로 어떤 워크플로우도 설계할 수 있습니다.'
        : 'Design any workflow with 6 patterns: Pipeline, Fan-out/Fan-in, Expert Pool, and more.',
    },
    {
      title: isKo ? 'A/B 테스트로 품질 검증' : 'Verify Quality with A/B Testing',
      description: isKo
        ? '스킬 유무 비교 테스트로 하네스의 효과를 객관적으로 측정하고 지속 개선합니다.'
        : 'Objectively measure Harness effectiveness with skill vs no-skill comparison tests.',
    },
  ];

  return (
    <>
      <SEOHead path="/" />

      {/* Hero */}
      <section className="hero">
        <HeroBackground />
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fa-solid fa-network-wired" />
            {t('hero.badge')}
          </div>
          <h1 className="hero-title">
            {t('hero.title')}
            <span className="hero-title-highlight">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-actions">
            <Link to="/intro" className="btn btn-primary-large">{t('hero.cta')}</Link>
            <Link to="/patterns" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
              {t('hero.ctaSecondary')}
            </Link>
          </div>
          <HeroCarousel slides={carouselSlides} />
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('features.title')}</h2>
            <p className="section-subtitle">{t('features.subtitle')}</p>
          </div>
          <div className="features-grid">
            <FeatureCard icon="fa-diagram-project" title={t('features.patterns.title')} description={t('features.patterns.desc')} />
            <FeatureCard icon="fa-code"            title={t('features.skills.title')}   description={t('features.skills.desc')} />
            <FeatureCard icon="fa-users-gear"      title={t('features.teams.title')}    description={t('features.teams.desc')} />
            <FeatureCard icon="fa-flask"           title={t('features.practice.title')} description={t('features.practice.desc')} />
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="section" style={{ padding: '5rem 0', background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{isKo ? '코드로 바로 확인하세요' : 'See It in Code'}</h2>
            <p className="section-subtitle">
              {isKo
                ? '개념 설명이 아닌 실제 동작하는 코드 예제로 바로 배웁니다.'
                : 'Learn directly from working code examples, not abstract descriptions.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isKo ? '① 스킬 파일 구조' : '① Skill File Structure'}
              </h3>
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-block-lang">markdown</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>.claude/commands/review.md</span>
                </div>
                <div className="code-block-body">
                  <pre><code>{`## 트리거
/review 또는 "코드 리뷰해줘"

## 단계
1. Read로 변경 파일 전체 확인
2. TypeScript 오류 및 보안 이슈 분석
3. Critical > Major > Minor 순 리포트`}</code></pre>
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isKo ? '② 팬아웃 패턴' : '② Fan-out Pattern'}
              </h3>
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-block-lang">yaml</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>CLAUDE.md 오케스트레이터</span>
                </div>
                <div className="code-block-body">
                  <pre><code>{`# 동시 실행 (병렬)
Task 1: research → 섹션 A 조사
Task 2: writing  → 섹션 B 작성
Task 3: seo      → 메타 최적화

# 결과 취합 (순차)
모든 Task 완료 → 통합 → 검토`}</code></pre>
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isKo ? '③ 팀 에이전트 설정' : '③ Team Agent Config'}
              </h3>
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-block-lang">yaml</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>.claude/team-config.yaml</span>
                </div>
                <div className="code-block-body">
                  <pre><code>{`agents:
  - name: architect
    model: claude-opus-4
    role: 시스템 설계
  - name: frontend
    model: claude-sonnet-4
    role: UI 구현
  - name: reviewer
    model: claude-haiku-4
    role: 코드 검토`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="paths-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.pathsTitle')}</h2>
            <p className="section-subtitle">{t('home.pathsSubtitle')}</p>
          </div>
          <div className="paths-grid">
            {LEARNING_PATHS.map((path, i) => (
              <Link key={path.id} to={path.path} className="path-card">
                <div className="path-card-badge" style={{ background: `${path.color}20`, color: path.color }}>
                  <i className={`fa-solid ${path.icon}`} />
                </div>
                <div className="path-card-content">
                  <div className="path-card-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="path-card-title">{isKo ? path.nameKo : path.nameEn}</h3>
                  <p className="path-card-desc">{isKo ? path.descKo : path.descEn}</p>
                </div>
                <i className="fa-solid fa-arrow-right path-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">{t('stats.guides')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">48+</div>
              <div className="stat-label">{t('stats.topics')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">{t('stats.patterns')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">{isKo ? '코드 예제' : 'Code Examples'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.workflowTitle')}</h2>
            <p className="section-subtitle">{t('home.workflowSubtitle')}</p>
          </div>
          <div className="workflow-grid">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="workflow-step">
                <div className="workflow-number">{n}</div>
                <h3 className="workflow-title">{t(`home.step${n}`)}</h3>
                <p className="workflow-desc">{t(`home.step${n}desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">{t('cta.title')}</h2>
          <p className="cta-description">{t('cta.description')}</p>
          <Link to="/intro" className="btn btn-primary-large">{t('cta.button')}</Link>
        </div>
      </section>
    </>
  );
}
