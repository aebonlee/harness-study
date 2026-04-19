export interface SearchEntry {
  title: string;
  titleEn: string;
  category: string;
  path: string;
  keywords: string;
}

export const SEARCH_DATA: SearchEntry[] = [
  // Learning Paths
  { title: '하네스 기초', titleEn: 'Harness Basics', category: '가이드', path: '/intro', keywords: 'harness 하네스 기초 개요 시작 소개 what overview introduction' },
  { title: '에이전트 이해', titleEn: 'Understanding Agents', category: '가이드', path: '/agents', keywords: 'agent 에이전트 오케스트레이터 서브에이전트 orchestrator subagent role' },
  { title: '아키텍처 패턴', titleEn: 'Architectural Patterns', category: '가이드', path: '/patterns', keywords: 'pattern 패턴 파이프라인 팬아웃 전문가풀 pipeline fanout expert pool architecture' },
  { title: '스킬 설계', titleEn: 'Skill Design', category: '가이드', path: '/skills', keywords: 'skill 스킬 설계 디스클로저 트리거 파일 disclosure trigger design' },
  { title: '팀 구성', titleEn: 'Team Building', category: '가이드', path: '/teams', keywords: 'team 팀 구성 조정 프로토콜 coordination protocol building' },
  { title: '메모리와 컨텍스트', titleEn: 'Memory & Context', category: '가이드', path: '/memory', keywords: 'memory 메모리 컨텍스트 context window management' },
  { title: '실전 활용', titleEn: 'Practice', category: '가이드', path: '/practice', keywords: 'practice 실전 활용 사례 case study real-world ab test' },
  { title: '사전지식 & 도구', titleEn: 'Prerequisites', category: '가이드', path: '/prereqs', keywords: 'prereqs 사전지식 도구 설치 install setup' },

  // Tutorials & Build
  { title: '튜토리얼', titleEn: 'Tutorials', category: '튜토리얼', path: '/tutorials', keywords: 'tutorial 튜토리얼 체크리스트 실습 hands-on checklist step' },
  { title: '구축하기', titleEn: 'Build', category: '구축', path: '/build', keywords: 'build 구축 라이브러리 library my harness' },

  // Pages
  { title: 'About', titleEn: 'About', category: '페이지', path: '/about', keywords: 'about 소개 정보 소개 학습경로 learning path' },
  { title: 'FAQ', titleEn: 'FAQ', category: '커뮤니티', path: '/community/faq', keywords: 'faq 질문 답변 question answer 자주묻는' },
  { title: '자료실', titleEn: 'Resources', category: '커뮤니티', path: '/community/resources', keywords: 'resource 자료 문서 github youtube video 영상' },
  { title: 'Q&A', titleEn: 'Q&A', category: '커뮤니티', path: '/community/qna', keywords: 'qna 질문 답변 게시판 board' },
  { title: '자유게시판', titleEn: 'Board', category: '커뮤니티', path: '/community/board', keywords: 'board 게시판 자유 free discussion' },

  // Key Topics
  { title: 'CLAUDE.md 작성법', titleEn: 'How to write CLAUDE.md', category: '토픽', path: '/intro', keywords: 'claude.md 작성 전역 지침 global guideline rules' },
  { title: '슬래시 커맨드', titleEn: 'Slash Commands', category: '토픽', path: '/skills', keywords: 'slash command 슬래시 커맨드 /review /refactor commands' },
  { title: '파이프라인 패턴', titleEn: 'Pipeline Pattern', category: '토픽', path: '/patterns', keywords: 'pipeline 파이프라인 순차 sequential chain' },
  { title: '팬아웃/팬인 패턴', titleEn: 'Fan-out/Fan-in Pattern', category: '토픽', path: '/patterns', keywords: 'fanout fan-out fan-in 팬아웃 팬인 병렬 parallel' },
  { title: '전문가 풀 패턴', titleEn: 'Expert Pool Pattern', category: '토픽', path: '/patterns', keywords: 'expert pool 전문가 풀 routing 라우팅' },
  { title: '프로그레시브 디스클로저', titleEn: 'Progressive Disclosure', category: '토픽', path: '/skills', keywords: 'progressive disclosure 프로그레시브 디스클로저 점진적 공개' },
  { title: '컨텍스트 창 관리', titleEn: 'Context Window', category: '토픽', path: '/memory', keywords: 'context window 컨텍스트 창 관리 토큰 token limit' },
  { title: '에이전트 통신', titleEn: 'Agent Communication', category: '토픽', path: '/agents', keywords: 'communication 통신 메시지 message protocol 프로토콜' },
  { title: 'A/B 테스트', titleEn: 'A/B Testing', category: '토픽', path: '/practice', keywords: 'ab test 테스트 비교 comparison quality 품질' },
  { title: '코드 리뷰 스킬', titleEn: 'Code Review Skill', category: '토픽', path: '/skills', keywords: 'code review 코드 리뷰 /review skill' },

  // FAQ topics
  { title: 'Harness란 무엇인가요?', titleEn: 'What is Harness?', category: 'FAQ', path: '/community/faq', keywords: 'harness 하네스 정의 definition 개념 concept 무엇' },
  { title: 'API 비용 절감 방법', titleEn: 'How to reduce API costs', category: 'FAQ', path: '/community/faq', keywords: 'api cost 비용 절감 reduce 절약 모델 model tiering' },
  { title: '멀티 에이전트 팀 사용 시기', titleEn: 'When to use multi-agent teams', category: 'FAQ', path: '/community/faq', keywords: 'multi agent team 멀티 에이전트 팀 언제 when' },
];
