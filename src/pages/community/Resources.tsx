import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

interface Resource {
  title: string; titleEn: string;
  desc: string;  descEn: string;
  url: string;   tag: string; tagEn: string;
  icon: string;  category: string;
}

const RESOURCES: Resource[] = [
  /* 공식 문서 */
  { category: 'official', icon: 'fa-book-open',
    title: 'Claude Code 공식 문서', titleEn: 'Claude Code Official Docs',
    desc: 'Anthropic이 제공하는 Claude Code 완전 가이드', descEn: 'Complete Claude Code guide by Anthropic',
    url: 'https://docs.anthropic.com/ko/docs/claude-code/overview', tag: '공식', tagEn: 'Official' },
  { category: 'official', icon: 'fa-file-lines',
    title: 'Harness(CLAUDE.md) 개요', titleEn: 'Harness (CLAUDE.md) Overview',
    desc: 'CLAUDE.md와 커스텀 슬래시 커맨드 공식 설명', descEn: 'Official guide to CLAUDE.md and custom slash commands',
    url: 'https://docs.anthropic.com/ko/docs/claude-code/memory', tag: '공식', tagEn: 'Official' },
  { category: 'official', icon: 'fa-terminal',
    title: 'Claude API Reference', titleEn: 'Claude API Reference',
    desc: 'Anthropic API 공식 레퍼런스 문서', descEn: 'Official Anthropic API reference documentation',
    url: 'https://docs.anthropic.com/ko/api/getting-started', tag: '공식', tagEn: 'Official' },
  /* 튜토리얼 */
  { category: 'tutorial', icon: 'fa-graduation-cap',
    title: 'Claude Code 시작하기', titleEn: 'Getting Started with Claude Code',
    desc: 'Claude Code 설치부터 첫 번째 하네스 구성까지', descEn: 'From installation to your first Harness setup',
    url: 'https://docs.anthropic.com/ko/docs/claude-code/quickstart', tag: '튜토리얼', tagEn: 'Tutorial' },
  { category: 'tutorial', icon: 'fa-code',
    title: '커스텀 커맨드 만들기', titleEn: 'Creating Custom Commands',
    desc: '.claude/commands/에 나만의 슬래시 커맨드 작성', descEn: 'Write your own slash commands in .claude/commands/',
    url: 'https://docs.anthropic.com/ko/docs/claude-code/slash-commands', tag: '튜토리얼', tagEn: 'Tutorial' },
  { category: 'tutorial', icon: 'fa-robot',
    title: '멀티 에이전트 사용하기', titleEn: 'Using Multi-Agent Features',
    desc: 'Claude Code의 멀티 에이전트 워크플로우 가이드', descEn: 'Guide to multi-agent workflows in Claude Code',
    url: 'https://docs.anthropic.com/ko/docs/claude-code/sub-agents', tag: '튜토리얼', tagEn: 'Tutorial' },
  /* GitHub */
  { category: 'github', icon: 'fa-brands fa-github',
    title: 'anthropics/claude-code', titleEn: 'anthropics/claude-code',
    desc: 'Claude Code 공식 GitHub 저장소', descEn: 'Official Claude Code GitHub repository',
    url: 'https://github.com/anthropics/claude-code', tag: 'GitHub', tagEn: 'GitHub' },
  { category: 'github', icon: 'fa-brands fa-github',
    title: 'Awesome Claude Code', titleEn: 'Awesome Claude Code',
    desc: '커뮤니티가 curate한 Claude Code 리소스 목록', descEn: 'Community-curated list of Claude Code resources',
    url: 'https://github.com/anthropics/awesome-claude-code', tag: 'GitHub', tagEn: 'GitHub' },
  /* 커뮤니티 */
  { category: 'community', icon: 'fa-comments',
    title: 'Anthropic Discord', titleEn: 'Anthropic Discord',
    desc: 'Claude 개발자 공식 디스코드 서버', descEn: 'Official Anthropic developer Discord server',
    url: 'https://discord.gg/anthropic', tag: '커뮤니티', tagEn: 'Community' },
  { category: 'community', icon: 'fa-reddit',
    title: 'r/ClaudeAI', titleEn: 'r/ClaudeAI',
    desc: 'Claude 관련 Reddit 커뮤니티', descEn: 'Claude-related Reddit community',
    url: 'https://reddit.com/r/ClaudeAI', tag: '커뮤니티', tagEn: 'Community' },
];

const CATEGORIES = [
  { id: 'all',       ko: '전체',    en: 'All',       icon: 'fa-border-all' },
  { id: 'official',  ko: '공식 문서', en: 'Official',  icon: 'fa-book-open' },
  { id: 'tutorial',  ko: '튜토리얼', en: 'Tutorials', icon: 'fa-graduation-cap' },
  { id: 'github',    ko: 'GitHub',  en: 'GitHub',    icon: 'fa-brands fa-github' },
  { id: 'community', ko: '커뮤니티', en: 'Community', icon: 'fa-comments' },
];

export default function Resources(): ReactElement {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const isKo = language === 'ko';

  const filtered = activeCategory === 'all'
    ? RESOURCES
    : RESOURCES.filter(r => r.category === activeCategory);

  return (
    <>
      <SEOHead
        title={isKo ? '자료실 | Harness Master' : 'Resources | Harness Master'}
        description={isKo ? 'Harness 학습에 유용한 공식 문서, 튜토리얼, GitHub 저장소, 커뮤니티 링크를 모아뒀습니다.' : 'Curated collection of official docs, tutorials, GitHub repos, and community links for Harness learning.'}
        path="/community/resources"
      />
      <div className="community-page">
        <div className="community-header">
          <div className="guide-hero-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <i className="fa-solid fa-folder-open" />
            {isKo ? '자료실' : 'Resources'}
          </div>
          <h1 className="community-title">{isKo ? '학습 자료실' : 'Learning Resources'}</h1>
          <p className="community-desc">
            {isKo
              ? 'Harness 학습에 유용한 공식 문서, 튜토리얼, 외부 리소스를 모아뒀습니다.'
              : 'Curated official docs, tutorials, and external resources for Harness learning.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="community-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`community-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <i className={`fa-solid ${cat.icon}`} />
              {isKo ? cat.ko : cat.en}
              <span className="community-filter-count">
                {cat.id === 'all' ? RESOURCES.length : RESOURCES.filter(r => r.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="resource-grid">
          {filtered.map((res, i) => (
            <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="resource-card-header">
                <div className="resource-icon">
                  <i className={`fa-solid ${res.icon}`} />
                </div>
                <span className="resource-tag">{isKo ? res.tag : res.tagEn}</span>
              </div>
              <h3 className="resource-title">{isKo ? res.title : res.titleEn}</h3>
              <p className="resource-desc">{isKo ? res.desc : res.descEn}</p>
              <div className="resource-link">
                <span>{new URL(res.url).hostname}</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
