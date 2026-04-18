import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

interface FaqItem {
  q: string; qEn: string;
  a: string; aEn: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  /* 기초 */
  { category: 'basic',
    q: 'Harness(하네스)란 정확히 무엇인가요?',
    qEn: 'What exactly is Harness?',
    a: 'Harness는 Claude Code에서 .claude/CLAUDE.md와 .claude/commands/ 폴더에 저장된 마크다운 파일들의 집합을 의미합니다. 이 파일들이 Claude의 행동 방식, 사용 가능한 명령어, 작업 처리 방법을 정의합니다. 쉽게 말해 "나만의 AI 작업 매뉴얼"입니다.',
    aEn: 'Harness refers to the collection of markdown files stored in .claude/CLAUDE.md and the .claude/commands/ folder in Claude Code. These files define how Claude behaves, what commands are available, and how to handle tasks — essentially your personal AI work manual.' },
  { category: 'basic',
    q: 'Harness를 사용하면 무엇이 좋아지나요?',
    qEn: 'What improves when I use Harness?',
    a: '매번 같은 지시를 반복하지 않아도 됩니다. 스킬 파일 한 번 잘 작성해두면, 이후에는 /review 한 단어로 체계적인 코드 리뷰를 받을 수 있습니다. 팀과 공유하면 일관된 품질의 작업이 가능하고, 나만의 "AI 어시스턴트 성격"을 만들 수 있습니다.',
    aEn: "You won't need to repeat the same instructions every time. Write a skill file once, and from then on '/review' gives you a systematic code review. Sharing with your team enables consistent quality, and you can create your own AI assistant personality." },
  { category: 'basic',
    q: 'CLAUDE.md와 commands/ 폴더의 차이는 무엇인가요?',
    qEn: 'What is the difference between CLAUDE.md and commands/?',
    a: 'CLAUDE.md는 프로젝트 전체에 항상 적용되는 전역 지침입니다. 기술 스택, 코딩 컨벤션, 아키텍처 결정 등을 적습니다. commands/ 폴더는 특정 작업을 위해 명시적으로 호출하는 스킬 파일들을 저장합니다. /review, /refactor 같은 명령어가 여기서 나옵니다.',
    aEn: 'CLAUDE.md contains global guidelines always applied to the entire project — tech stack, coding conventions, architecture decisions. The commands/ folder stores skill files explicitly called for specific tasks. Commands like /review and /refactor come from here.' },
  /* 스킬 */
  { category: 'skill',
    q: '스킬 파일은 얼마나 상세하게 작성해야 하나요?',
    qEn: 'How detailed should a skill file be?',
    a: 'Steps 섹션은 Claude가 각 단계를 건너뛸 수 없을 만큼 구체적이어야 합니다. 하지만 지나치게 상세하면 창의성이 억제됩니다. 경험상 각 Step에 2-4개의 세부 지침을 두는 것이 적당합니다. 처음에는 짧게 시작하고, 사용하면서 부족한 부분을 채워나가세요.',
    aEn: 'Steps should be specific enough that Claude cannot skip any step. But overly detailed instructions stifle creativity. Based on experience, 2-4 sub-guidelines per Step is appropriate. Start short and fill in gaps as you use it.' },
  { category: 'skill',
    q: '스킬 파일 하나가 너무 길어지면 어떻게 하나요?',
    qEn: 'What if a skill file gets too long?',
    a: '스킬 파일이 150줄을 넘어가면 분리를 고려하세요. 예를 들어 code-review.md가 너무 길면 review-security.md, review-performance.md로 나누거나, 공통 원칙은 CLAUDE.md에 이동하고 스킬 파일에는 고유한 단계만 남깁니다.',
    aEn: 'Consider splitting if a skill file exceeds 150 lines. For example, if code-review.md gets too long, split into review-security.md and review-performance.md, or move common principles to CLAUDE.md and keep only unique steps in skill files.' },
  { category: 'skill',
    q: '스킬을 호출하는 방법이 여러 가지인가요?',
    qEn: 'Are there multiple ways to invoke a skill?',
    a: '네. 가장 일반적인 방법은 /skill-name 슬래시 커맨드입니다. 또한 CLAUDE.md나 스킬 파일의 Trigger 섹션에 자동 활성화 조건을 정의할 수 있습니다. "코드 리뷰해줘" 같은 자연어 요청에도 Claude가 적절한 스킬을 선택할 수 있습니다.',
    aEn: 'Yes. The most common is the /skill-name slash command. You can also define auto-activation conditions in the Trigger section of CLAUDE.md or skill files. Claude can also select appropriate skills from natural language requests like "please review this code".' },
  /* 팀 & 패턴 */
  { category: 'team',
    q: '어떤 상황에서 멀티 에이전트 팀을 써야 하나요?',
    qEn: 'When should I use a multi-agent team?',
    a: '단일 에이전트로 30분 이상 걸리는 작업, 서로 다른 전문 지식이 필요한 작업, 병렬 처리로 속도를 높일 수 있는 작업에 팀을 씁니다. 단순한 작업에 팀을 쓰면 오버헤드만 늘어납니다. 먼저 단일 에이전트로 시도하고, 한계에 부딪힐 때 팀으로 확장하세요.',
    aEn: 'Use teams for tasks taking 30+ minutes with a single agent, tasks requiring different expertise, or tasks where parallel processing improves speed. Teams add overhead for simple tasks. Try single agent first, then scale to a team when you hit limits.' },
  { category: 'team',
    q: '패턴 선택이 어렵습니다. 가장 중요한 기준은 무엇인가요?',
    qEn: 'Pattern selection is difficult. What is the most important criterion?',
    a: '가장 중요한 질문은 "하위 작업들이 서로 독립적인가, 아니면 이전 결과가 필요한가?"입니다. 독립적이면 팬아웃(병렬), 이전 결과가 필요하면 파이프라인(순차)을 씁니다. 대부분의 복잡한 작업은 이 두 패턴의 조합으로 해결됩니다.',
    aEn: 'The most important question: "Are subtasks independent of each other, or does each need the previous result?" Independent → fan-out (parallel). Needs previous result → pipeline (sequential). Most complex tasks are solved by combining these two.' },
  /* 기타 */
  { category: 'etc',
    q: '하네스를 팀과 공유하는 가장 좋은 방법은?',
    qEn: 'What is the best way to share Harness with a team?',
    a: '.claude/ 디렉토리를 Git 저장소에 커밋하면 팀 전체가 같은 스킬 세트를 사용할 수 있습니다. 조직 공통 스킬은 별도 저장소로 관리하고 서브모듈로 연결하는 방법도 있습니다. README.md와 CHANGELOG.md를 함께 관리하면 스킬 변경 이력을 추적할 수 있습니다.',
    aEn: 'Committing the .claude/ directory to Git lets the whole team share the same skill set. Organization-wide skills can be in a separate repo connected as a submodule. Maintaining README.md and CHANGELOG.md together lets you track skill change history.' },
  { category: 'etc',
    q: '하네스 구축에 얼마나 시간이 걸리나요?',
    qEn: 'How much time does it take to build a Harness?',
    a: '첫 스킬 파일 하나를 작성하는 데 30분 정도 걸립니다. 초기에 3-5개 핵심 스킬을 구축하는 데 1주일 정도 투자하면, 이후 매주 수 시간의 작업 시간을 절약할 수 있습니다. 중요한 것은 완벽한 시작이 아니라 꾸준한 개선입니다.',
    aEn: 'Writing your first skill file takes about 30 minutes. Investing 1 week to build 3-5 core skills can save you several hours of work each week afterward. What matters is consistent improvement, not a perfect start.' },
];

const CATEGORIES = [
  { id: 'all',   ko: '전체',    en: 'All',          icon: 'fa-border-all' },
  { id: 'basic', ko: '기초',    en: 'Basics',       icon: 'fa-rocket' },
  { id: 'skill', ko: '스킬',    en: 'Skills',       icon: 'fa-file-code' },
  { id: 'team',  ko: '팀 & 패턴', en: 'Team & Patterns', icon: 'fa-users' },
  { id: 'etc',   ko: '기타',    en: 'Other',        icon: 'fa-ellipsis' },
];

export default function FAQ(): ReactElement {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isKo = language === 'ko';

  const filtered = activeCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(f => f.category === activeCategory);

  return (
    <>
      <SEOHead
        title={isKo ? 'F&A | Harness Master' : 'FAQ | Harness Master'}
        description={isKo ? 'Harness 학습 중 자주 묻는 질문과 답변을 모아뒀습니다.' : 'Frequently asked questions and answers collected from Harness learners.'}
        path="/community/faq"
      />
      <div className="community-page">
        <div className="community-header">
          <div className="guide-hero-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <i className="fa-solid fa-circle-question" />
            {isKo ? 'F&A' : 'FAQ'}
          </div>
          <h1 className="community-title">{isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h1>
          <p className="community-desc">
            {isKo
              ? 'Harness 학습 중 자주 묻는 질문과 상세한 답변을 모아뒀습니다.'
              : 'Collected frequently asked questions with detailed answers from Harness learners.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="community-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`community-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
            >
              <i className={`fa-solid ${cat.icon}`} />
              {isKo ? cat.ko : cat.en}
              <span className="community-filter-count">
                {cat.id === 'all' ? FAQ_ITEMS.length : FAQ_ITEMS.filter(f => f.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="faq-list">
          {filtered.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="faq-q-text">{isKo ? item.q : item.qEn}</span>
                <i className="fa-solid fa-chevron-down faq-chevron" />
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{isKo ? item.a : item.aEn}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
