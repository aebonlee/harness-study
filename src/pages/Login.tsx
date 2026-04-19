import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const { language } = useLanguage();
  const { signInWithGoogle, signInWithKakao, isLoading, authError, clearAuthError } = useAuth();
  const isKo = language === 'ko';

  return (
    <>
      <SEOHead
        title={isKo ? '로그인 | Harness Master' : 'Login | Harness Master'}
        description={isKo ? 'Google 또는 카카오로 간편하게 로그인하세요.' : 'Sign in easily with Google or Kakao.'}
      />
      <div className="auth-page">
        <div className="auth-card">

          {/* Logo */}
          <div className="auth-header">
            <div className="auth-logo">H</div>
            <h1 className="auth-title">{isKo ? '로그인' : 'Sign In'}</h1>
            <p className="auth-subtitle">
              {isKo ? '소셜 계정으로 간편하게 시작하세요' : 'Sign in quickly with your social account'}
            </p>
          </div>

          {/* Info */}
          <div className="auth-info">
            <div className="auth-info-title">
              <i className="fa-solid fa-shield-halved" />
              {isKo ? '로그인 혜택' : 'Member Benefits'}
            </div>
            <ul className="auth-info-list">
              <li className="auth-info-item">
                <i className="fa-solid fa-check" />
                {isKo ? '학습 진도 자동 저장' : 'Auto-save learning progress'}
              </li>
              <li className="auth-info-item">
                <i className="fa-solid fa-check" />
                {isKo ? '즐겨찾기 및 메모 기능' : 'Bookmarks and notes'}
              </li>
              <li className="auth-info-item">
                <i className="fa-solid fa-check" />
                {isKo ? '퀴즈 결과 기록 보관' : 'Quiz result history'}
              </li>
            </ul>
          </div>

          {/* Error */}
          {authError && (
            <div className="auth-error" role="alert">
              <i className="fa-solid fa-circle-exclamation" />
              <span>{authError}</span>
              <button className="auth-error-close" onClick={clearAuthError} aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          )}

          {/* Social Buttons */}
          <div className="auth-social">
            <button
              className={`auth-social-btn google ${isLoading ? 'loading' : ''}`}
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              {isLoading
                ? <span className="auth-spinner dark" />
                : <i className="fa-brands fa-google" />
              }
              <span>{isKo ? 'Google로 계속하기' : 'Continue with Google'}</span>
            </button>

            <button
              className={`auth-social-btn kakao ${isLoading ? 'loading' : ''}`}
              onClick={signInWithKakao}
              disabled={isLoading}
            >
              {isLoading
                ? <span className="auth-spinner dark" />
                : <i className="fa-solid fa-comment-dots" />
              }
              <span>{isKo ? '카카오로 계속하기' : 'Continue with Kakao'}</span>
            </button>
          </div>

          {/* Footer */}
          <p className="auth-footer">
            {isKo
              ? '로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.'
              : 'By signing in, you agree to our Terms of Service and Privacy Policy.'}
          </p>
        </div>
      </div>
    </>
  );
}
