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
              <div className="stat-number">7+</div>
              <div className="stat-label">{t('stats.guides')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">42+</div>
              <div className="stat-label">{t('stats.topics')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">{t('stats.patterns')}</div>
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
