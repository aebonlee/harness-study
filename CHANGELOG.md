# Changelog

## [2026-04-25] ProfileCompleteModal, useIdleTimeout 신규 구현 및 PaymentNudgePopup 연동

### 수정 내용

#### 1. ProfileCompleteModal 신규 생성
- 회원가입 후 이름/전화번호 입력 모달 구현
- 이름(필수) + 전화번호(선택) 입력 폼
- 전화번호 자동 포맷팅 (010-xxxx-xxxx)
- Supabase `user_profiles` 테이블 직접 업데이트
- "나중에 입력하기" 스킵 기능 제공

#### 2. useIdleTimeout 훅 신규 생성
- 10분 무동작 시 자동 로그아웃 처리
- 1분 전 경고 토스트 표시 (DOM 직접 삽입)
- 마우스/키보드/터치/스크롤 이벤트 감지
- `enabled` 옵션으로 로그인 상태에서만 동작

#### 3. AuthContext 프로필 완료 로직 추가
- `_userProfile` 상태 + `_loadUserProfile` 로딩 함수 추가
- `needsProfileCompletion` 조건: 로그인 + 프로필 존재 + 이름 미입력
- `useIdleTimeout` 훅 연동 (로그인 시 활성화)
- ProfileCompleteModal + PaymentNudgePopup JSX 렌더 추가

#### 4. PaymentNudgePopup 조건 개선
- 프로필 입력 완료 후에만 결제 팝업 표시

### 수정 파일
| 파일 | 변경 |
|------|------|
| `src/components/ProfileCompleteModal.tsx` | 신규 — 프로필 완료 모달 컴포넌트 |
| `src/hooks/useIdleTimeout.ts` | 신규 — 10분 무동작 자동 로그아웃 훅 |
| `src/contexts/AuthContext.tsx` | import 추가, 프로필 로딩/완료 로직, idle timeout, JSX 렌더 추가 |

### 빌드 확인
- `npm run build` 성공
- GitHub Pages 배포 완료 (commit: `99fce22`)
