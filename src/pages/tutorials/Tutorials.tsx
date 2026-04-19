import { useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import SEOHead from '../../components/SEOHead';
import TipBox from '../../components/TipBox';
import { useTutorialProgress } from '../../hooks/useTutorialProgress';
import Breadcrumb from '../../components/Breadcrumb';
import RelatedGuides from '../../components/RelatedGuides';
import StarRating from '../../components/StarRating';
import type { ReactElement } from 'react';
import type { NavGroup } from '../../components/GuideSidebar3';

const RELATED = [
  { path: '/build', icon: 'fa-hammer', nameKo: '직접 구축', nameEn: 'Build', descKo: '처음부터 Harness를 직접 구축', descEn: 'Build your own Harness from scratch' },
  { path: '/practice', icon: 'fa-flask', nameKo: '실전 활용', nameEn: 'Practice', descKo: '실전 프로젝트에서 Harness 적용', descEn: 'Apply Harness in real projects' },
];

/* ------------------------------------------------------------------ */
/*  Data                                                                 */
/* ------------------------------------------------------------------ */

interface CheckItem { id: string; ko: string; en: string }
interface Step {
  id: string;
  ko: string; en: string;
  descKo: string; descEn: string;
  taskKo: string; taskEn: string;
  code?: string;
  checks: CheckItem[];
  tipKo?: string; tipEn?: string;
}
interface Tutorial {
  id: string;
  ko: string; en: string;
  descKo: string; descEn: string;
  level: 'beginner' | 'basic' | 'intermediate';
  levelKo: string; levelEn: string;
  steps: Step[];
}

const TUTORIALS: Tutorial[] = [
  {
    id: 'tut1',
    ko: '첫 번째 에이전트 만들기',
    en: 'Create Your First Agent',
    descKo: 'Claude Code에서 기본 에이전트를 만들고 실행하는 법을 배웁니다.',
    descEn: 'Learn to create and run a basic agent in Claude Code.',
    level: 'beginner', levelKo: '입문', levelEn: 'Beginner',
    steps: [
      {
        id: 'tut1-s1', ko: '환경 준비', en: 'Prepare Environment',
        descKo: 'Harness를 사용하기 위한 Claude Code 환경을 준비합니다.',
        descEn: 'Set up the Claude Code environment for using Harness.',
        taskKo: 'Claude Code가 설치되어 있고 최신 버전인지 확인합니다.',
        taskEn: 'Verify Claude Code is installed and up to date.',
        code: `# Claude Code 버전 확인\nclaude --version\n\n# .claude/skills/ 디렉토리 생성\nmkdir -p .claude/skills`,
        checks: [
          { id: 'c1', ko: 'Claude Code 설치 확인', en: 'Claude Code installed' },
          { id: 'c2', ko: '.claude/skills/ 폴더 생성', en: 'Created .claude/skills/' },
          { id: 'c3', ko: '환경 변수 확인 완료', en: 'Verified environment variables' },
        ],
        tipKo: 'Claude Code는 npm을 통해 설치할 수 있습니다: npm install -g @anthropic-ai/claude-code',
        tipEn: 'Claude Code can be installed via npm: npm install -g @anthropic-ai/claude-code',
      },
      {
        id: 'tut1-s2', ko: 'Harness 스킬 설치', en: 'Install Harness Skill',
        descKo: 'revfactory/harness 리포지토리에서 Harness 스킬 파일을 설치합니다.',
        descEn: 'Install the Harness skill file from the revfactory/harness repository.',
        taskKo: 'harness.md 스킬 파일을 .claude/skills/ 에 배치합니다.',
        taskEn: 'Place the harness.md skill file in .claude/skills/.',
        code: `# GitHub에서 Harness 스킬 다운로드\ngh repo clone revfactory/harness\ncp harness/skills/harness.md .claude/skills/`,
        checks: [
          { id: 'c1', ko: 'harness.md 파일 다운로드', en: 'Downloaded harness.md' },
          { id: 'c2', ko: '.claude/skills/ 에 배치', en: 'Placed in .claude/skills/' },
          { id: 'c3', ko: '파일 내용 확인', en: 'Verified file contents' },
        ],
        tipKo: '스킬 파일은 마크다운 형식입니다. 직접 열어서 구조를 확인해보세요.',
        tipEn: 'Skill files are in Markdown format. Open them to review the structure.',
      },
      {
        id: 'tut1-s3', ko: 'Agent Teams 활성화', en: 'Enable Agent Teams',
        descKo: 'Claude Code에서 Agent Teams 기능을 활성화합니다.',
        descEn: 'Enable the Agent Teams feature in Claude Code.',
        taskKo: 'CLAUDE_CODE_AGENT_TEAMS 환경 변수를 설정합니다.',
        taskEn: 'Set the CLAUDE_CODE_AGENT_TEAMS environment variable.',
        code: `# .env 파일 또는 shell 설정에 추가\nexport CLAUDE_CODE_AGENT_TEAMS=true\n\n# 또는 Claude Code 설정 파일에서 활성화`,
        checks: [
          { id: 'c1', ko: '환경 변수 설정 완료', en: 'Environment variable set' },
          { id: 'c2', ko: '설정 적용 확인', en: 'Verified settings applied' },
        ],
        tipKo: 'Agent Teams 없이도 Harness를 사용할 수 있지만 단일 에이전트 모드로만 작동합니다.',
        tipEn: 'Harness works without Agent Teams but only in single-agent mode.',
      },
      {
        id: 'tut1-s4', ko: '첫 번째 에이전트 실행', en: 'Run First Agent',
        descKo: '/harness 명령으로 첫 번째 에이전트를 실행합니다.',
        descEn: 'Run your first agent with the /harness command.',
        taskKo: 'Claude Code에서 /harness 명령을 입력하고 도메인을 설명합니다.',
        taskEn: 'Type /harness in Claude Code and describe your domain.',
        code: `/harness\n\n도메인: 간단한 Python 스크립트 작성 및 테스트\n요구사항: 코드 작성, 코드 리뷰, 단위 테스트 작성`,
        checks: [
          { id: 'c1', ko: '/harness 명령 실행', en: 'Executed /harness command' },
          { id: 'c2', ko: '에이전트 팀 생성 확인', en: 'Agent team generated' },
          { id: 'c3', ko: '스킬 파일 생성 확인', en: 'Skill files created' },
        ],
        tipKo: '도메인 설명이 구체적일수록 더 적합한 에이전트 팀이 생성됩니다.',
        tipEn: 'The more specific your domain description, the more appropriate the generated team.',
      },
      {
        id: 'tut1-s5', ko: '결과 검토 및 사용', en: 'Review & Use Results',
        descKo: '생성된 에이전트 팀과 스킬 파일을 검토하고 실제로 활용합니다.',
        descEn: 'Review the generated agent team and skill files, then put them to use.',
        taskKo: '생성된 파일들을 확인하고 에이전트에게 작업을 할당합니다.',
        taskEn: 'Review the generated files and assign tasks to the agents.',
        code: `# 생성된 스킬 파일 확인\nls .claude/skills/\n\n# 오케스트레이터 에이전트 실행\n/run-orchestrator "Python 팩토리얼 함수를 작성하고 테스트하세요"`,
        checks: [
          { id: 'c1', ko: '생성된 스킬 파일 검토', en: 'Reviewed generated skill files' },
          { id: 'c2', ko: '오케스트레이터 실행', en: 'Ran orchestrator' },
          { id: 'c3', ko: '최종 결과물 확인', en: 'Verified final output' },
          { id: 'c4', ko: '튜토리얼 완료!', en: 'Tutorial completed!' },
        ],
        tipKo: '첫 실행 후 생성된 스킬 파일을 직접 수정해 자신만의 에이전트를 만들어보세요.',
        tipEn: 'After the first run, modify the generated skill files to create your own agents.',
      },
    ],
  },
  {
    id: 'tut2',
    ko: '파이프라인 패턴 구현',
    en: 'Implement Pipeline Pattern',
    descKo: '순차적 처리 파이프라인을 에이전트로 구현합니다.',
    descEn: 'Implement a sequential processing pipeline with agents.',
    level: 'basic', levelKo: '기초', levelEn: 'Basic',
    steps: [
      {
        id: 'tut2-s1', ko: '파이프라인 설계', en: 'Design the Pipeline',
        descKo: '파이프라인 패턴의 구조를 이해하고 구현할 파이프라인을 설계합니다.',
        descEn: 'Understand the pipeline pattern and design the pipeline to implement.',
        taskKo: '4단계 콘텐츠 파이프라인: 연구 → 아웃라인 → 작성 → 편집',
        taskEn: '4-stage content pipeline: Research → Outline → Write → Edit',
        code: `# 파이프라인 구조\nResearch Agent\n  ↓ (research_output.md)\nOutline Agent\n  ↓ (outline.md)\nWriting Agent\n  ↓ (draft.md)\nEditing Agent\n  ↓ (final.md)`,
        checks: [
          { id: 'c1', ko: '파이프라인 단계 정의', en: 'Defined pipeline stages' },
          { id: 'c2', ko: '각 단계 입출력 명세', en: 'Specified I/O for each stage' },
          { id: 'c3', ko: '의존성 흐름 확인', en: 'Confirmed dependency flow' },
        ],
        tipKo: '파이프라인 패턴은 각 단계의 출력이 다음 단계의 입력이 됩니다. 인터페이스를 명확히 정의하세요.',
        tipEn: 'In pipeline pattern, each stage\'s output becomes the next stage\'s input. Define interfaces clearly.',
      },
      {
        id: 'tut2-s2', ko: '에이전트 스킬 작성', en: 'Write Agent Skills',
        descKo: '파이프라인의 각 단계를 담당할 에이전트 스킬 파일을 작성합니다.',
        descEn: 'Write skill files for agents handling each pipeline stage.',
        taskKo: '연구 에이전트 스킬 파일을 작성합니다.',
        taskEn: 'Write the research agent skill file.',
        code: `# .claude/skills/research-agent.md\n## Role\nContent Research Specialist\n\n## Responsibility\n- Web research on given topic\n- Summarize key findings\n- Output: research_output.md\n\n## Tools\n- WebSearch\n- WebFetch\n- Write`,
        checks: [
          { id: 'c1', ko: 'research-agent.md 작성', en: 'Wrote research-agent.md' },
          { id: 'c2', ko: 'outline-agent.md 작성', en: 'Wrote outline-agent.md' },
          { id: 'c3', ko: 'writing-agent.md 작성', en: 'Wrote writing-agent.md' },
          { id: 'c4', ko: 'editing-agent.md 작성', en: 'Wrote editing-agent.md' },
        ],
      },
      {
        id: 'tut2-s3', ko: '오케스트레이터 설정', en: 'Configure Orchestrator',
        descKo: '파이프라인을 조율하는 오케스트레이터 스킬을 작성합니다.',
        descEn: 'Write the orchestrator skill for coordinating the pipeline.',
        taskKo: '파이프라인 오케스트레이터 스킬을 작성합니다.',
        taskEn: 'Write the pipeline orchestrator skill.',
        code: `# .claude/skills/pipeline-orchestrator.md\n## Pipeline Order\n1. Launch research-agent → research_output.md\n2. Launch outline-agent (input: research_output.md)\n3. Launch writing-agent (input: outline.md)\n4. Launch editing-agent (input: draft.md)\n5. Deliver final.md`,
        checks: [
          { id: 'c1', ko: '오케스트레이터 스킬 작성', en: 'Wrote orchestrator skill' },
          { id: 'c2', ko: '파이프라인 순서 정의', en: 'Defined pipeline order' },
        ],
        tipKo: '오케스트레이터는 각 에이전트 완료를 확인한 후 다음 단계를 시작해야 합니다.',
        tipEn: 'The orchestrator must confirm each agent\'s completion before starting the next stage.',
      },
      {
        id: 'tut2-s4', ko: '파이프라인 실행', en: 'Execute Pipeline',
        descKo: '완성된 파이프라인을 실행하고 각 단계의 출력을 확인합니다.',
        descEn: 'Execute the completed pipeline and verify each stage\'s output.',
        taskKo: '파이프라인을 실행하고 출력 파일을 확인합니다.',
        taskEn: 'Execute the pipeline and verify output files.',
        code: `/run-pipeline "React 컴포넌트 라이브러리 도입 가이드 작성"\n\n# 각 단계 완료 후 파일 확인\nls -la *.md`,
        checks: [
          { id: 'c1', ko: '파이프라인 실행 성공', en: 'Pipeline executed successfully' },
          { id: 'c2', ko: 'research_output.md 생성 확인', en: 'Verified research_output.md' },
          { id: 'c3', ko: 'final.md 최종 결과 확인', en: 'Verified final.md output' },
        ],
      },
      {
        id: 'tut2-s5', ko: '파이프라인 개선', en: 'Improve the Pipeline',
        descKo: '실행 결과를 바탕으로 파이프라인을 개선합니다.',
        descEn: 'Improve the pipeline based on execution results.',
        taskKo: '병목이 발생한 단계를 파악하고 스킬 파일을 개선합니다.',
        taskEn: 'Identify bottlenecks and improve skill files.',
        checks: [
          { id: 'c1', ko: '각 단계 출력 품질 평가', en: 'Evaluated output quality per stage' },
          { id: 'c2', ko: '스킬 파일 개선 사항 적용', en: 'Applied skill file improvements' },
          { id: 'c3', ko: '개선된 파이프라인 재실행', en: 'Re-ran improved pipeline' },
          { id: 'c4', ko: '튜토리얼 완료!', en: 'Tutorial completed!' },
        ],
        tipKo: '파이프라인은 반복 개선을 통해 완성됩니다. 각 단계의 품질을 점진적으로 높여가세요.',
        tipEn: 'Pipelines are perfected through iterative improvement. Gradually improve each stage\'s quality.',
      },
    ],
  },
  {
    id: 'tut3',
    ko: '팬아웃 패턴 구현',
    en: 'Implement Fan-out Pattern',
    descKo: '병렬 처리 팬아웃·팬인 패턴을 에이전트로 구현합니다.',
    descEn: 'Implement parallel fan-out/fan-in pattern with agents.',
    level: 'basic', levelKo: '기초', levelEn: 'Basic',
    steps: [
      {
        id: 'tut3-s1', ko: '팬아웃 패턴 이해', en: 'Understand Fan-out Pattern',
        descKo: '팬아웃·팬인 패턴의 구조와 적합한 사용 사례를 이해합니다.',
        descEn: 'Understand the structure and suitable use cases of fan-out/fan-in.',
        taskKo: '팬아웃 패턴을 적용할 병렬 작업을 식별합니다.',
        taskEn: 'Identify parallel tasks suitable for fan-out pattern.',
        code: `# 팬아웃 패턴 구조\nOrchestrator\n  ├─ Agent A (독립 작업 1)\n  ├─ Agent B (독립 작업 2)\n  └─ Agent C (독립 작업 3)\n      ↓\n  Integrator Agent (결과 통합)`,
        checks: [
          { id: 'c1', ko: '독립 병렬 작업 목록 작성', en: 'Listed independent parallel tasks' },
          { id: 'c2', ko: '통합 방법 설계', en: 'Designed integration method' },
        ],
        tipKo: '팬아웃 패턴은 서로 독립적인 작업에만 적합합니다. 의존성이 있는 작업은 파이프라인을 사용하세요.',
        tipEn: 'Fan-out pattern is only suitable for independent tasks. Use pipeline for dependent tasks.',
      },
      {
        id: 'tut3-s2', ko: '병렬 에이전트 스킬 작성', en: 'Write Parallel Agent Skills',
        descKo: '병렬로 실행될 전문가 에이전트들의 스킬 파일을 작성합니다.',
        descEn: 'Write skill files for specialist agents to run in parallel.',
        taskKo: '3개의 병렬 분석 에이전트 스킬을 작성합니다.',
        taskEn: 'Write 3 parallel analysis agent skills.',
        code: `# 병렬 에이전트 예시: 코드 리뷰\n.claude/skills/\n  ├─ security-reviewer.md  (보안 분석)\n  ├─ perf-reviewer.md      (성능 분석)\n  └─ style-reviewer.md     (코드 스타일)`,
        checks: [
          { id: 'c1', ko: 'security-reviewer.md 작성', en: 'Wrote security-reviewer.md' },
          { id: 'c2', ko: 'perf-reviewer.md 작성', en: 'Wrote perf-reviewer.md' },
          { id: 'c3', ko: 'style-reviewer.md 작성', en: 'Wrote style-reviewer.md' },
        ],
      },
      {
        id: 'tut3-s3', ko: '통합 에이전트 작성', en: 'Write Integrator Agent',
        descKo: '병렬 에이전트들의 결과를 통합하는 팬인 에이전트를 작성합니다.',
        descEn: 'Write the fan-in integrator agent that consolidates parallel results.',
        taskKo: '3개 리뷰 결과를 통합하는 integrator 스킬을 작성합니다.',
        taskEn: 'Write an integrator skill that consolidates 3 review results.',
        code: `# .claude/skills/review-integrator.md\n## Role\nCode Review Integrator\n\n## Input\n- security-review.md\n- perf-review.md  \n- style-review.md\n\n## Output\n- consolidated-review.md (priority-sorted)`,
        checks: [
          { id: 'c1', ko: '통합 에이전트 스킬 작성', en: 'Wrote integrator skill' },
          { id: 'c2', ko: '우선순위 정렬 로직 정의', en: 'Defined priority sorting logic' },
        ],
        tipKo: '통합 에이전트는 각 결과의 중요도를 판단하고 충돌하는 의견을 조율해야 합니다.',
        tipEn: 'The integrator must assess importance of each result and reconcile conflicting opinions.',
      },
      {
        id: 'tut3-s4', ko: '병렬 실행 및 확인', en: 'Execute in Parallel',
        descKo: '오케스트레이터를 통해 에이전트들을 병렬로 실행합니다.',
        descEn: 'Execute agents in parallel via the orchestrator.',
        taskKo: 'Task 도구를 사용해 3개 에이전트를 동시 실행합니다.',
        taskEn: 'Use Task tool to run 3 agents simultaneously.',
        code: `# 오케스트레이터가 병렬 실행\nTask(security-reviewer, "code.py 분석")\nTask(perf-reviewer, "code.py 분석")    # 동시 실행\nTask(style-reviewer, "code.py 분석")   # 동시 실행\n\n# 모든 완료 후 통합\nTask(review-integrator, "통합 리뷰 생성")`,
        checks: [
          { id: 'c1', ko: '병렬 실행 확인', en: 'Confirmed parallel execution' },
          { id: 'c2', ko: '각 에이전트 출력 확인', en: 'Verified each agent output' },
          { id: 'c3', ko: '통합 결과 확인', en: 'Verified integrated result' },
        ],
      },
      {
        id: 'tut3-s5', ko: '성능 비교', en: 'Compare Performance',
        descKo: '순차 실행 대비 병렬 실행의 성능 향상을 측정합니다.',
        descEn: 'Measure performance improvement of parallel vs sequential execution.',
        taskKo: '동일 작업을 순차·병렬로 각각 실행하여 시간을 비교합니다.',
        taskEn: 'Run the same task sequentially and in parallel to compare times.',
        checks: [
          { id: 'c1', ko: '순차 실행 시간 측정', en: 'Measured sequential execution time' },
          { id: 'c2', ko: '병렬 실행 시간 측정', en: 'Measured parallel execution time' },
          { id: 'c3', ko: '결과 품질 비교', en: 'Compared result quality' },
          { id: 'c4', ko: '튜토리얼 완료!', en: 'Tutorial completed!' },
        ],
        tipKo: '팬아웃 패턴은 일반적으로 순차 실행보다 2-3배 빠릅니다. 단, 의존성 없는 작업에서만 유효합니다.',
        tipEn: 'Fan-out pattern is typically 2-3x faster than sequential. Only valid for independent tasks.',
      },
    ],
  },
  {
    id: 'tut4',
    ko: '스킬 라이브러리 구축',
    en: 'Build a Skill Library',
    descKo: '재사용 가능한 스킬 파일 라이브러리를 체계적으로 구축합니다.',
    descEn: 'Systematically build a reusable skill file library.',
    level: 'intermediate', levelKo: '중급', levelEn: 'Intermediate',
    steps: [
      {
        id: 'tut4-s1', ko: '스킬 분류 체계 설계', en: 'Design Skill Taxonomy',
        descKo: '스킬 라이브러리의 분류 체계와 네이밍 컨벤션을 설계합니다.',
        descEn: 'Design the taxonomy and naming conventions for your skill library.',
        taskKo: '스킬 카테고리와 네이밍 규칙을 정의합니다.',
        taskEn: 'Define skill categories and naming rules.',
        code: `.claude/skills/\n  agents/          # 에이전트 정의\n    orchestrators/ # 오케스트레이터\n    specialists/   # 전문가 에이전트\n  templates/       # 재사용 템플릿\n  workflows/       # 워크플로우 정의`,
        checks: [
          { id: 'c1', ko: '디렉토리 구조 설계', en: 'Designed directory structure' },
          { id: 'c2', ko: '네이밍 컨벤션 문서화', en: 'Documented naming conventions' },
          { id: 'c3', ko: '폴더 생성 완료', en: 'Created folders' },
        ],
        tipKo: '일관된 네이밍 컨벤션은 스킬 재사용성과 팀 협업을 크게 향상시킵니다.',
        tipEn: 'Consistent naming conventions greatly improve skill reusability and team collaboration.',
      },
      {
        id: 'tut4-s2', ko: '기본 스킬 템플릿 작성', en: 'Write Base Skill Template',
        descKo: '모든 스킬의 기본이 되는 표준 템플릿을 작성합니다.',
        descEn: 'Write a standard template that serves as the base for all skills.',
        taskKo: '프로그레시브 디스클로저 구조의 템플릿을 작성합니다.',
        taskEn: 'Write a template with progressive disclosure structure.',
        code: `# skill-template.md\n\n## Summary (1줄)\n{역할과 핵심 목적}\n\n## Overview (3-5줄)\n{주요 책임과 산출물}\n\n## Detailed Instructions\n{상세 지침 - 필요시 로드}`,
        checks: [
          { id: 'c1', ko: '기본 템플릿 작성', en: 'Wrote base template' },
          { id: 'c2', ko: '프로그레시브 디스클로저 구조 적용', en: 'Applied progressive disclosure' },
          { id: 'c3', ko: '템플릿 테스트', en: 'Tested template' },
        ],
      },
      {
        id: 'tut4-s3', ko: '전문가 스킬 5개 작성', en: 'Write 5 Specialist Skills',
        descKo: '자주 사용하는 전문가 에이전트 스킬 5개를 작성합니다.',
        descEn: 'Write 5 frequently used specialist agent skills.',
        taskKo: '각 전문가 스킬을 템플릿 기반으로 작성합니다.',
        taskEn: 'Write each specialist skill based on the template.',
        code: `specialists/\n  code-reviewer.md      # 코드 리뷰\n  test-writer.md        # 테스트 작성\n  doc-writer.md         # 문서 작성\n  security-auditor.md   # 보안 감사\n  perf-optimizer.md     # 성능 최적화`,
        checks: [
          { id: 'c1', ko: 'code-reviewer.md 작성', en: 'Wrote code-reviewer.md' },
          { id: 'c2', ko: 'test-writer.md 작성', en: 'Wrote test-writer.md' },
          { id: 'c3', ko: 'doc-writer.md 작성', en: 'Wrote doc-writer.md' },
          { id: 'c4', ko: 'security-auditor.md 작성', en: 'Wrote security-auditor.md' },
          { id: 'c5', ko: 'perf-optimizer.md 작성', en: 'Wrote perf-optimizer.md' },
        ],
      },
      {
        id: 'tut4-s4', ko: '스킬 테스트 및 개선', en: 'Test & Improve Skills',
        descKo: '작성된 스킬 파일들을 테스트하고 품질을 개선합니다.',
        descEn: 'Test the written skill files and improve quality.',
        taskKo: '각 스킬을 실제 작업에 적용하여 트리거와 출력을 검증합니다.',
        taskEn: 'Apply each skill to real tasks to validate triggers and outputs.',
        checks: [
          { id: 'c1', ko: '각 스킬 트리거 테스트', en: 'Tested each skill trigger' },
          { id: 'c2', ko: '출력 품질 평가', en: 'Evaluated output quality' },
          { id: 'c3', ko: '스킬 개선 사항 반영', en: 'Applied skill improvements' },
        ],
        tipKo: '스킬 테스트는 동일한 프롬프트로 A/B 테스트를 수행하는 것이 효과적입니다.',
        tipEn: 'Skill testing is most effective with A/B tests using the same prompt.',
      },
      {
        id: 'tut4-s5', ko: '라이브러리 문서화', en: 'Document the Library',
        descKo: '스킬 라이브러리의 사용 가이드와 인덱스를 작성합니다.',
        descEn: 'Write the usage guide and index for the skill library.',
        taskKo: 'README.md와 스킬 인덱스 파일을 작성합니다.',
        taskEn: 'Write README.md and skill index files.',
        code: `# .claude/skills/README.md\n## 스킬 라이브러리 인덱스\n\n| 스킬 | 역할 | 트리거 |\n|------|------|--------|\n| code-reviewer | 코드 리뷰 | "리뷰해줘" |\n| test-writer   | 테스트 작성 | "테스트 작성" |`,
        checks: [
          { id: 'c1', ko: 'README.md 작성', en: 'Wrote README.md' },
          { id: 'c2', ko: '스킬 인덱스 완성', en: 'Completed skill index' },
          { id: 'c3', ko: '사용 예시 추가', en: 'Added usage examples' },
          { id: 'c4', ko: '튜토리얼 완료!', en: 'Tutorial completed!' },
        ],
        tipKo: '잘 문서화된 스킬 라이브러리는 팀 전체가 활용할 수 있는 자산이 됩니다.',
        tipEn: 'A well-documented skill library becomes an asset the entire team can leverage.',
      },
    ],
  },
  {
    id: 'tut5',
    ko: '실전 풀스택 프로젝트',
    en: 'Full-stack Real-world Project',
    descKo: 'Harness를 활용하여 실제 풀스택 웹 프로젝트를 처음부터 끝까지 완성합니다.',
    descEn: 'Use Harness to complete a real full-stack web project from start to finish.',
    level: 'intermediate', levelKo: '중급', levelEn: 'Intermediate',
    steps: [
      {
        id: 'tut5-s1', ko: '프로젝트 요구사항 분석', en: 'Analyze Project Requirements',
        descKo: '풀스택 프로젝트의 요구사항을 분석하고 에이전트 팀 구성을 설계합니다.',
        descEn: 'Analyze full-stack project requirements and design the agent team.',
        taskKo: 'Todo 앱 프로젝트의 에이전트 팀을 설계합니다.',
        taskEn: 'Design the agent team for a Todo app project.',
        code: `# 프로젝트: React + FastAPI Todo App\n\n# 에이전트 팀 구성\nOrchestrator (프로젝트 관리자)\n  ├─ Architect (아키텍처 설계)\n  ├─ Frontend Dev (React 개발)\n  ├─ Backend Dev (FastAPI 개발)\n  ├─ Code Reviewer (코드 리뷰)\n  └─ Tester (테스트 작성)`,
        checks: [
          { id: 'c1', ko: '프로젝트 요구사항 문서화', en: 'Documented project requirements' },
          { id: 'c2', ko: '에이전트 팀 구성 설계', en: 'Designed agent team composition' },
          { id: 'c3', ko: '각 에이전트 책임 정의', en: 'Defined each agent\'s responsibilities' },
        ],
        tipKo: '실전 프로젝트에서는 역할 중복을 최소화하고 각 에이전트의 책임을 명확히 분리하세요.',
        tipEn: 'In real projects, minimize role overlap and clearly separate each agent\'s responsibilities.',
      },
      {
        id: 'tut5-s2', ko: 'Harness로 팀 생성', en: 'Generate Team with Harness',
        descKo: '/harness 명령으로 프로젝트 에이전트 팀을 자동 생성합니다.',
        descEn: 'Auto-generate the project agent team with /harness command.',
        taskKo: '/harness로 풀스택 개발팀을 생성합니다.',
        taskEn: 'Generate a full-stack dev team with /harness.',
        code: `/harness\n\n도메인: React + FastAPI 기반 Todo 웹 앱\n팀 구성: 아키텍트 1명, 프론트엔드 개발자 1명,\n         백엔드 개발자 1명, 코드 리뷰어 1명, 테스터 1명\n패턴: 파이프라인 + 생산자-리뷰어 조합`,
        checks: [
          { id: 'c1', ko: '/harness 실행 성공', en: 'Executed /harness successfully' },
          { id: 'c2', ko: '5개 에이전트 스킬 생성 확인', en: 'Confirmed 5 agent skills generated' },
          { id: 'c3', ko: '오케스트레이터 스킬 확인', en: 'Verified orchestrator skill' },
        ],
      },
      {
        id: 'tut5-s3', ko: '아키텍처 설계 단계', en: 'Architecture Design Phase',
        descKo: '아키텍트 에이전트가 프로젝트 구조를 설계하도록 합니다.',
        descEn: 'Have the architect agent design the project structure.',
        taskKo: '아키텍트 에이전트를 실행하여 설계 문서를 생성합니다.',
        taskEn: 'Run the architect agent to generate design documents.',
        code: `# 아키텍트 에이전트 실행\n/run architect\n"React + FastAPI Todo 앱의 전체 아키텍처를 설계하세요.\n API 엔드포인트, DB 스키마, 컴포넌트 구조를 포함해주세요."`,
        checks: [
          { id: 'c1', ko: 'architecture.md 생성 확인', en: 'Confirmed architecture.md created' },
          { id: 'c2', ko: 'API 설계 문서 검토', en: 'Reviewed API design document' },
          { id: 'c3', ko: 'DB 스키마 확인', en: 'Verified DB schema' },
        ],
        tipKo: '아키텍처 문서가 명확할수록 개발 에이전트들의 작업 품질이 높아집니다.',
        tipEn: 'The clearer the architecture document, the higher quality the dev agents\' work.',
      },
      {
        id: 'tut5-s4', ko: '개발 및 리뷰 사이클', en: 'Development & Review Cycle',
        descKo: '프론트/백엔드 개발 후 코드 리뷰 사이클을 실행합니다.',
        descEn: 'Execute front/backend development followed by code review cycle.',
        taskKo: '개발 에이전트들을 실행하고 리뷰어로 검증합니다.',
        taskEn: 'Run dev agents and validate with reviewer.',
        code: `# 1. 백엔드 개발\n/run backend-dev "FastAPI Todo CRUD API 구현"\n\n# 2. 프론트엔드 개발 (병렬 가능)\n/run frontend-dev "React Todo 컴포넌트 구현"\n\n# 3. 코드 리뷰\n/run code-reviewer "backend/ 와 frontend/ 코드 리뷰"`,
        checks: [
          { id: 'c1', ko: 'FastAPI 백엔드 구현', en: 'Implemented FastAPI backend' },
          { id: 'c2', ko: 'React 프론트엔드 구현', en: 'Implemented React frontend' },
          { id: 'c3', ko: '코드 리뷰 완료', en: 'Completed code review' },
          { id: 'c4', ko: '리뷰 피드백 반영', en: 'Applied review feedback' },
        ],
      },
      {
        id: 'tut5-s5', ko: '테스트 및 최종 배포', en: 'Test & Final Deploy',
        descKo: '테스터 에이전트로 검증 후 프로젝트를 완성합니다.',
        descEn: 'Verify with tester agent and finalize the project.',
        taskKo: '테스터 에이전트를 실행하고 최종 결과를 검토합니다.',
        taskEn: 'Run tester agent and review final results.',
        code: `# 테스트 에이전트 실행\n/run tester "모든 API 엔드포인트와 UI 컴포넌트 테스트"\n\n# 최종 결과 확인\nls -R tests/\ncat test-report.md`,
        checks: [
          { id: 'c1', ko: '단위 테스트 통과', en: 'Unit tests passed' },
          { id: 'c2', ko: '통합 테스트 통과', en: 'Integration tests passed' },
          { id: 'c3', ko: '전체 프로젝트 완성', en: 'Complete project finished' },
          { id: 'c4', ko: '튜토리얼 완료!', en: 'Tutorial completed!' },
        ],
        tipKo: '축하합니다! Harness를 활용한 실전 풀스택 프로젝트를 완성했습니다.',
        tipEn: 'Congratulations! You\'ve completed a real full-stack project using Harness.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                              */
/* ------------------------------------------------------------------ */

function totalChecks(tut: Tutorial): number {
  return tut.steps.reduce((acc, s) => acc + s.checks.length, 0);
}

function buildSidebarGroups(tutorials: Tutorial[]): NavGroup[] {
  return [
    {
      label: '튜토리얼 목록',
      labelEn: 'Tutorials',
      items: tutorials.map(t => ({
        id: t.id,
        icon: 'fa-book-open',
        ko: `${t.ko}`,
        en: `${t.en}`,
        subs: t.steps.map((s, i) => ({
          id: s.id,
          ko: `Step ${i + 1}: ${s.ko}`,
          en: `Step ${i + 1}: ${s.en}`,
        })),
      })),
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                       */
/* ------------------------------------------------------------------ */

export default function Tutorials(): ReactElement {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isKo = language === 'ko';

  const [activeTutId, setActiveTutId] = useState<string | null>(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const { toggleCheck, isChecked, tutorialProgress } = useTutorialProgress(user?.id);

  const activeTut = TUTORIALS.find(t => t.id === activeTutId) ?? null;
  const activeStep = activeTut ? activeTut.steps[activeStepIdx] : null;

  const sidebarGroups = buildSidebarGroups(TUTORIALS);

  function handleTutSelect(id: string) {
    if (id !== activeTutId) {
      setActiveTutId(id);
      setActiveStepIdx(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <SEOHead
        title={isKo ? '튜토리얼 | Harness Master' : 'Tutorials | Harness Master'}
        description={isKo ? 'Harness 실습 튜토리얼 — 직접 따라하며 배우는 5개 프로젝트' : 'Harness hands-on tutorials — 5 projects to learn by doing'}
        path="/tutorials"
      />
      <div className="guide-page">
        <Breadcrumb items={[{ label: '튜토리얼', labelEn: 'Tutorials' }]} />
        <div className="tutorial-layout">
          {/* Sidebar */}
          <aside className="guide-sidebar">
            <div className="guide-sidebar-title">{isKo ? '목차' : 'Contents'}</div>

            {/* Overall progress */}
            <div className="tutorial-overall-progress">
              <div className="tutorial-overall-progress-label">
                {isKo ? '전체 진행률' : 'Overall Progress'}
              </div>
              <div className="tutorial-overall-progress-bar">
                <div
                  className="tutorial-overall-progress-fill"
                  style={{
                    width: `${Math.round(
                      TUTORIALS.reduce((acc, t) => acc + tutorialProgress(t.id, totalChecks(t)), 0) /
                      TUTORIALS.length
                    )}%`,
                  }}
                />
              </div>
            </div>

            {sidebarGroups.map((group, gi) => (
              <div key={gi} className="guide-nav-group">
                <div className="guide-group-label">
                  {isKo ? group.label : group.labelEn}
                </div>
                <ul className="guide-nav">
                  {TUTORIALS.map(tut => {
                    const prog = tutorialProgress(tut.id, totalChecks(tut));
                    const isActive = activeTutId === tut.id;
                    return (
                      <li key={tut.id} className="guide-nav-item">
                        <button
                          className={`guide-nav-link ${isActive ? 'active' : ''}`}
                          onClick={() => handleTutSelect(tut.id)}
                        >
                          <i className="fa-solid fa-book-open" />
                          <span style={{ flex: 1, textAlign: 'left' }}>
                            {isKo ? tut.ko : tut.en}
                          </span>
                          {prog > 0 && (
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                              {prog}%
                            </span>
                          )}
                        </button>
                        {isActive && (
                          <div className="guide-nav-subs">
                            {tut.steps.map((s, i) => {
                              const stepDone =
                                s.checks.length > 0 &&
                                s.checks.every(c => isChecked(tut.id, s.id, c.id));
                              return (
                                <button
                                  key={s.id}
                                  className={`guide-nav-sub-btn ${activeStepIdx === i ? 'active' : ''}`}
                                  onClick={() => { setActiveStepIdx(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                  {stepDone ? '✅' : '•'} Step {i + 1}{isKo ? `: ${s.ko}` : `: ${s.en}`}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </aside>

          {/* Main Content */}
          <main className="guide-content">
            <div className="guide-pdf-btn-wrapper">
              <button className="guide-pdf-btn" onClick={() => window.print()} title={isKo ? 'PDF로 저장' : 'Save as PDF'}>
                <i className="fa-solid fa-file-pdf" />
                {isKo ? 'PDF 저장' : 'Save PDF'}
              </button>
            </div>
            {!activeTut && (
              <TutorialOverview
                tutorials={TUTORIALS}
                isKo={isKo}
                onSelect={handleTutSelect}
                tutorialProgress={tutorialProgress}
                totalChecks={totalChecks}
              />
            )}
            {activeTut && activeStep && (
              <StepView
                tutorial={activeTut}
                step={activeStep}
                stepIdx={activeStepIdx}
                isKo={isKo}
                toggleCheck={toggleCheck}
                isChecked={isChecked}
                onPrev={() => { setActiveStepIdx(i => Math.max(0, i - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onNext={() => { setActiveStepIdx(i => Math.min(activeTut.steps.length - 1, i + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
            )}
            <StarRating pageId="tutorials" />
            <RelatedGuides guides={RELATED} />
          </main>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                       */
/* ------------------------------------------------------------------ */

function TutorialOverview({
  tutorials, isKo, onSelect, tutorialProgress, totalChecks,
}: {
  tutorials: Tutorial[];
  isKo: boolean;
  onSelect: (id: string) => void;
  tutorialProgress: (id: string, total: number) => number;
  totalChecks: (t: Tutorial) => number;
}): ReactElement {
  return (
    <div className="tutorial-overview">
      <div className="guide-content-header">
        <h1>{isKo ? '실습 튜토리얼' : 'Hands-on Tutorials'}</h1>
        <p>
          {isKo
            ? '직접 따라하며 배우는 5개의 Harness 실습 프로젝트입니다. 각 튜토리얼은 5단계로 구성되며 체크리스트로 진행도를 추적합니다.'
            : '5 Harness hands-on projects to learn by doing. Each tutorial has 5 steps with a checklist to track progress.'}
        </p>
      </div>

      <div className="tutorial-cards-grid">
        {tutorials.map(tut => {
          const prog = tutorialProgress(tut.id, totalChecks(tut));
          return (
            <div
              key={tut.id}
              className="tutorial-card"
              onClick={() => onSelect(tut.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelect(tut.id)}
            >
              <div className="tutorial-card-header">
                <div className="tutorial-card-num">{tut.id.replace('tut', '')}</div>
                <div className="tutorial-card-meta">
                  <div className="tutorial-card-title">{isKo ? tut.ko : tut.en}</div>
                  <div className="tutorial-card-desc">{isKo ? tut.descKo : tut.descEn}</div>
                </div>
              </div>
              <div className="tutorial-card-footer">
                <span className={`level-badge ${tut.level}`}>
                  {isKo ? tut.levelKo : tut.levelEn}
                </span>
                <div className="tutorial-card-progress">
                  <div className="tutorial-progress-bar">
                    <div className="tutorial-progress-fill" style={{ width: `${prog}%` }} />
                  </div>
                  <span>{prog}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <TipBox type="tip">
        {isKo
          ? '튜토리얼을 클릭하면 단계별 실습을 시작할 수 있습니다. 체크리스트를 완료하면 진행도가 자동으로 저장됩니다.'
          : 'Click a tutorial to start step-by-step practice. Progress is automatically saved as you complete checklists.'}
      </TipBox>
    </div>
  );
}

function CodeBlockWithCopy({ code, lang }: { code: string; lang: string }): ReactElement {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard denied */ }
  }, [code]);

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-lang">{lang}</span>
        <button className={`code-block-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
          <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'} />
          <span>{copied ? '완료' : '복사'}</span>
        </button>
      </div>
      <div className="code-block-body">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

function StepView({
  tutorial, step, stepIdx, isKo, toggleCheck, isChecked, onPrev, onNext,
}: {
  tutorial: Tutorial;
  step: Step;
  stepIdx: number;
  isKo: boolean;
  toggleCheck: (tutId: string, stepId: string, checkId: string) => void;
  isChecked: (tutId: string, stepId: string, checkId: string) => boolean;
  onPrev: () => void;
  onNext: () => void;
}): ReactElement {
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === tutorial.steps.length - 1;
  const allDone = step.checks.every(c => isChecked(tutorial.id, step.id, c.id));

  return (
    <div className="step-content">
      {/* Step header */}
      <div className="step-header">
        <div className={`step-number ${allDone ? 'completed' : ''}`}>
          {allDone ? <i className="fa-solid fa-check" /> : stepIdx + 1}
        </div>
        <div className="step-meta">
          <div className="step-label">
            {isKo ? tutorial.ko : tutorial.en} — Step {stepIdx + 1} / {tutorial.steps.length}
          </div>
          <div className="step-title">{isKo ? step.ko : step.en}</div>
        </div>
      </div>

      {/* Description */}
      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
        {isKo ? step.descKo : step.descEn}
      </p>

      {/* Task box */}
      <div className="task-box">
        <div className="task-box-label">
          <i className="fa-solid fa-clipboard-list" />
          {isKo ? '이 단계에서 할 일' : 'What to do in this step'}
        </div>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          {isKo ? step.taskKo : step.taskEn}
        </p>
        {step.code && <CodeBlockWithCopy code={step.code} lang="bash" />}
      </div>

      {/* Checklist */}
      <div className="checklist-label">
        <i className="fa-solid fa-list-check" style={{ color: 'var(--color-primary)' }} />
        {isKo ? '체크리스트' : 'Checklist'}
      </div>
      <ul className="checklist">
        {step.checks.map(check => {
          const done = isChecked(tutorial.id, step.id, check.id);
          return (
            <li key={check.id} className={`checklist-item ${done ? 'done' : ''}`}>
              <input
                type="checkbox"
                id={`${step.id}-${check.id}`}
                checked={done}
                onChange={() => toggleCheck(tutorial.id, step.id, check.id)}
              />
              <label htmlFor={`${step.id}-${check.id}`}>
                {isKo ? check.ko : check.en}
              </label>
            </li>
          );
        })}
      </ul>

      {/* Tip */}
      {(step.tipKo || step.tipEn) && (
        <TipBox type="tip">
          {isKo ? step.tipKo : step.tipEn}
        </TipBox>
      )}

      {/* Navigation */}
      <div className="step-nav">
        <button className="step-nav-btn prev" onClick={onPrev} disabled={isFirst}>
          <i className="fa-solid fa-arrow-left" />
          <span>
            {isFirst
              ? (isKo ? '이전' : 'Previous')
              : `Step ${stepIdx}: ${isKo ? tutorial.steps[stepIdx - 1].ko : tutorial.steps[stepIdx - 1].en}`}
          </span>
        </button>
        <button className="step-nav-btn next" onClick={onNext} disabled={isLast}>
          <span>
            {isLast
              ? (isKo ? '다음' : 'Next')
              : `Step ${stepIdx + 2}: ${isKo ? tutorial.steps[stepIdx + 1].ko : tutorial.steps[stepIdx + 1].en}`}
          </span>
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}
