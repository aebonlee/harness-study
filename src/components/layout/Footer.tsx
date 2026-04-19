import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../utils/supabase';
import type { ReactElement } from 'react';

export default function Footer(): ReactElement {
  const { language, t } = useLanguage();
  const isKo = language === 'ko';
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus('loading');
    try {
      const { error } = await supabase
        .from('hs_subscribers')
        .insert({ email: email.trim().toLowerCase() });
      if (error) {
        if (error.code === '23505') {
          setSubStatus('duplicate');
        } else {
          setSubStatus('error');
        }
      } else {
        setSubStatus('success');
        setEmail('');
      }
    } catch {
      setSubStatus('error');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="brand-harness">Harness</span>
              <span className="brand-master"> Master</span>
            </div>
            <p className="footer-description">{t('footer.description')}</p>
            <p className="footer-description" style={{ marginTop: 8, fontSize: 13 }}>{t('footer.descriptionDetail')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-link-list">
              <li><Link to="/intro">{isKo ? '하네스 기초' : 'Harness Basics'}</Link></li>
              <li><Link to="/agents">{isKo ? '에이전트 이해' : 'Agents'}</Link></li>
              <li><Link to="/patterns">{isKo ? '아키텍처 패턴' : 'Patterns'}</Link></li>
              <li><Link to="/skills">{isKo ? '스킬 설계' : 'Skill Design'}</Link></li>
              <li><Link to="/teams">{isKo ? '팀 구성' : 'Team Building'}</Link></li>
              <li><Link to="/memory">{isKo ? '메모리 관리' : 'Memory'}</Link></li>
              <li><Link to="/practice">{isKo ? '실전 활용' : 'Practice'}</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{isKo ? '연락처' : 'Contact'}</h4>
            <p className="footer-email">
              <span className="footer-email-icon"><i className="fa-solid fa-envelope" /></span>
              <a href="mailto:aebon@dreamitbiz.com">aebon@dreamitbiz.com</a>
            </p>
            <p>010-3700-0629</p>
            <p>{isKo ? '카카오톡' : 'KakaoTalk'}: aebon</p>
            <p className="business-hours">{isKo ? '평일 09:00 ~ 18:00' : 'Weekdays 09:00 ~ 18:00'}</p>

            <div className="footer-family">
              <select
                defaultValue=""
                onChange={e => {
                  if (e.target.value) window.open(e.target.value, '_blank');
                  e.target.value = '';
                }}
              >
                <option value="" disabled>Family Site</option>
                <option value="https://www.dreamitbiz.com">DreamIT Biz</option>
                <option value="https://claude.dreamitbiz.com">Claude Master</option>
                <option value="https://chatgpt.dreamitbiz.com">ChatGPT Master</option>
                <option value="https://ai-agents.dreamitbiz.com">AI Agents</option>
                <option value="https://study.dreamitbiz.com">Study Master</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer-newsletter">
          <div className="footer-newsletter-content">
            <h4 className="footer-newsletter-title">
              <i className="fa-solid fa-envelope" />
              {isKo ? '뉴스레터 구독' : 'Subscribe to Newsletter'}
            </h4>
            <p className="footer-newsletter-desc">
              {isKo
                ? '최신 하네스 활용 팁과 업데이트를 이메일로 받아보세요.'
                : 'Get the latest harness tips and updates delivered to your inbox.'}
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer-newsletter-input"
                placeholder={isKo ? '이메일 주소 입력' : 'Enter your email'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={subStatus === 'loading'}
              />
              <button
                type="submit"
                className="footer-newsletter-btn"
                disabled={subStatus === 'loading'}
              >
                {subStatus === 'loading'
                  ? (isKo ? '전송 중...' : 'Sending...')
                  : (isKo ? '구독하기' : 'Subscribe')}
              </button>
            </form>
            {subStatus === 'success' && (
              <p className="footer-newsletter-msg success">
                <i className="fa-solid fa-circle-check" />
                {isKo ? '구독이 완료되었습니다!' : 'Successfully subscribed!'}
              </p>
            )}
            {subStatus === 'duplicate' && (
              <p className="footer-newsletter-msg success">
                <i className="fa-solid fa-circle-check" />
                {isKo ? '이미 구독 중인 이메일입니다.' : 'This email is already subscribed.'}
              </p>
            )}
            {subStatus === 'error' && (
              <p className="footer-newsletter-msg error">
                <i className="fa-solid fa-circle-xmark" />
                {isKo ? '오류가 발생했습니다. 다시 시도해주세요.' : 'An error occurred. Please try again.'}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 DreamIT Biz. All rights reserved.</p>
          <p className="footer-bottom-info">
            Designed by Ph.D Aebon Lee | {isKo ? '대표이사' : 'CEO'}: {isKo ? '이애본' : 'Aebon Lee'}
          </p>
        </div>
      </div>
    </footer>
  );
}
