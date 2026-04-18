import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactElement } from 'react';

const NAV_ITEMS = [
  { path: '/intro',    icon: 'fa-rocket',         ko: '기초 개념', en: 'Basics' },
  { path: '/agents',   icon: 'fa-robot',           ko: '에이전트',  en: 'Agents' },
  { path: '/patterns', icon: 'fa-diagram-project', ko: '패턴',      en: 'Patterns' },
  { path: '/skills',   icon: 'fa-code',            ko: '스킬 설계', en: 'Skills' },
  { path: '/teams',    icon: 'fa-users-gear',      ko: '팀 구성',   en: 'Teams' },
  { path: '/memory',   icon: 'fa-brain',           ko: '메모리',    en: 'Memory' },
  { path: '/practice',  icon: 'fa-flask',           ko: '실전 활용',  en: 'Practice' },
  { path: '/tutorials', icon: 'fa-graduation-cap',  ko: '튜토리얼',   en: 'Tutorials' },
  { path: '/build',     icon: 'fa-hammer',           ko: '구축하기',   en: 'Build' },
];

export default function Navbar(): ReactElement {
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { isLoggedIn, user, signOut } = useAuth();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const isKo = language === 'ko';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeIcon = mode === 'auto' ? 'fa-circle-half-stroke' : mode === 'light' ? 'fa-sun' : 'fa-moon';
  const themeTitle = mode === 'auto' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark';
  const avatarLetter = (user?.email?.[0] ?? 'U').toUpperCase();
  const currentColor = COLOR_OPTIONS.find(c => c.name === colorTheme);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">H</div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-main">Harness</span>
              <span className="navbar-logo-sub">Master</span>
            </div>
          </Link>

          {/* Nav Links */}
          <ul className="navbar-nav">
            {NAV_ITEMS.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`navbar-nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                >
                  {isKo ? item.ko : item.en}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">

            {/* Color Picker */}
            <div className="color-picker" ref={colorPickerRef}>
              <button
                className="color-picker-btn"
                style={{ background: currentColor?.color ?? 'var(--color-primary)' }}
                onClick={() => setShowColorPicker(!showColorPicker)}
                title="Color Theme"
              />
              <div className={`color-picker-dropdown ${showColorPicker ? 'open' : ''}`}>
                <div className="color-picker-title">{isKo ? '테마 색상' : 'Color Theme'}</div>
                {COLOR_OPTIONS.map(opt => (
                  <button
                    key={opt.name}
                    className={`color-option ${colorTheme === opt.name ? 'active' : ''}`}
                    onClick={() => { setColorTheme(opt.name); setShowColorPicker(false); }}
                  >
                    <span className="color-option-dot" style={{ background: opt.color }} />
                    <span className="color-option-label">{opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button className="icon-btn" onClick={toggleTheme} title={themeTitle}>
              <i className={`fa-solid ${themeIcon}`} />
            </button>

            {/* Language Toggle */}
            <div className="lang-toggle">
              <button
                className={`lang-btn ${language === 'ko' ? 'active' : ''}`}
                onClick={() => language !== 'ko' && toggleLanguage()}
              >KO</button>
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => language !== 'en' && toggleLanguage()}
              >EN</button>
            </div>

            {/* Auth */}
            <div className="navbar-auth">
              {isLoggedIn ? (
                <button className="navbar-user" onClick={signOut} title={isKo ? '로그아웃' : 'Sign Out'}>
                  <div className="navbar-user-avatar">{avatarLetter}</div>
                  <span className="navbar-user-name">{user?.email?.split('@')[0]}</span>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }} />
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary btn-sm">
                  {isKo ? '로그인' : 'Login'}
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-menu-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
          >
            {isKo ? item.ko : item.en}
          </Link>
        ))}
        <div className="mobile-menu-divider" />
        <div className="mobile-actions">
          <div className="lang-toggle">
            <button className={`lang-btn ${language === 'ko' ? 'active' : ''}`} onClick={() => language !== 'ko' && toggleLanguage()}>KO</button>
            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => language !== 'en' && toggleLanguage()}>EN</button>
          </div>
          <button className="icon-btn" onClick={toggleTheme} title={themeTitle}>
            <i className={`fa-solid ${themeIcon}`} />
          </button>
          {isLoggedIn ? (
            <button className="btn btn-ghost btn-sm" onClick={signOut}>
              <i className="fa-solid fa-right-from-bracket" />
              {isKo ? '로그아웃' : 'Sign Out'}
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              {isKo ? '로그인' : 'Login'}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
