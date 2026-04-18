import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const { language } = useLanguage();
  const { signInWithGoogle, signInWithKakao, isLoading } = useAuth();
  const isKo = language === 'ko';

  return (
    <>
      <SEOHead
        title={isKo ? '로그인 | Harness Master' : 'Login | Harness Master'}
        description={isKo ? 'Google 또는 카카오로 간편하게 로그인하세요.' : 'Sign in easily with Google or Kakao.'}
      />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="logo-harness">Harness</span>
            <span className="logo-master">Master</span>
          </div>
          <h1 className="auth-title">{isKo ? '로그인' : 'Sign In'}</h1>
          <p className="auth-desc">
            {isKo ? '소셜 계정으로 간편하게 시작하세요' : 'Sign in quickly with your social account'}
          </p>

          <div className="social-login-group">
            <button
              className="social-btn google-btn"
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              <i className="fa-brands fa-google" />
              <span>{isKo ? 'Google로 계속하기' : 'Continue with Google'}</span>
            </button>

            <button
              className="social-btn kakao-btn"
              onClick={signInWithKakao}
              disabled={isLoading}
            >
              <i className="fa-solid fa-comment-dots" />
              <span>{isKo ? '카카오로 계속하기' : 'Continue with Kakao'}</span>
            </button>
          </div>

          <p className="auth-terms">
            {isKo
              ? '로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.'
              : 'By signing in, you agree to our Terms of Service and Privacy Policy.'}
          </p>
        </div>
      </div>
    </>
  );
}
