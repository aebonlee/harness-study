import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactElement } from 'react';

/* ── Nav data types ── */
type NavChild = { path: string; ko: string; en: string; icon: string };
type NavLink  = { type: 'link';     path: string; ko: string; en: string };
type NavDrop  = { type: 'dropdown'; ko: string;   en: string; children: NavChild[] };
type NavItem  = NavLink | NavDrop;

const NAV_ITEMS: NavItem[] = [
  { type: 'link', path: '/about', ko: 'About', en: 'About' },
  {
    type: 'dropdown', ko: '기본학습', en: 'Basics',
    children: [
      { path: '/intro',  icon: 'fa-rocket', ko: '기초 개념', en: 'Concepts' },
      { path: '/agents', icon: 'fa-robot',  ko: '에이전트',  en: 'Agents'   },
      { path: '/memory', icon: 'fa-brain',  ko: '메모리',    en: 'Memory'   },
    ],
  },
  {
    type: 'dropdown', ko: '따라하기', en: 'How-to',
    children: [
      { path: '/patterns', icon: 'fa-diagram-project', ko: '패턴',      en: 'Patterns' },
      { path: '/skills',   icon: 'fa-code',            ko: '스킬 설계', en: 'Skills'   },
      { path: '/teams',    icon: 'fa-users-gear',      ko: '팀 구성',   en: 'Teams'    },
    ],
  },
  { type: 'link', path: '/practice',  ko: '실전활용', en: 'Practice'  },
  { type: 'link', path: '/tutorials', ko: '튜토리얼', en: 'Tutorials' },
  { type: 'link', path: '/build',     ko: '구축하기', en: 'Build'     },
  {
    type: 'dropdown', ko: '커뮤니티', en: 'Community',
    children: [
      { path: '/community/resources', icon: 'fa-folder-open',     ko: '자료실',     en: 'Resources' },
      { path: '/community/qna',       icon: 'fa-comments',        ko: 'Q&A',        en: 'Q&A'       },
      { path: '/community/faq',       icon: 'fa-circle-question', ko: 'F&A',        en: 'FAQ'       },
      { path: '/community/board',     icon: 'fa-chalkboard',      ko: '자유게시판', en: 'Board'     },
    ],
  },
];

export default function Navbar(): ReactElement {
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { isLoggedIn, user, signOut } = useAuth();
  const location = useLocation();

  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showColorPicker,  setShowColorPicker]  = useState(false);
  const [openDropdown,     setOpenDropdown]     = useState<number | null>(null);
  const [openMobileDrop,   setOpenMobileDrop]   = useState<number | null>(null);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const navRef         = useRef<HTMLUListElement>(null);
  const isKo = language === 'ko';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileDrop(null);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeIcon  = mode === 'auto' ? 'fa-circle-half-stroke' : mode === 'light' ? 'fa-sun' : 'fa-moon';
  const themeTitle = mode === 'auto' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark';
  const avatarLetter  = (user?.email?.[0] ?? 'U').toUpperCase();
  const currentColor  = COLOR_OPTIONS.find(c => c.name === colorTheme);

  /** Check if any child of a dropdown is currently active */
  const isDropdownActive = (item: NavDrop) =>
    item.children.some(c => location.pathname.startsWith(c.path));

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
          <ul className="navbar-nav" ref={navRef}>
            {NAV_ITEMS.map((item, idx) => {
              if (item.type === 'link') {
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`navbar-nav-link ${location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? 'active' : ''}`}
                    >
                      {isKo ? item.ko : item.en}
                    </Link>
                  </li>
                );
              }
              /* Dropdown */
              const isOpen   = openDropdown === idx;
              const isActive = isDropdownActive(item);
              return (
                <li
                  key={idx}
                  className={`nav-dropdown ${isOpen ? 'open' : ''}`}
                  onMouseEnter={() => setOpenDropdown(idx)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`nav-dropdown-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    {isKo ? item.ko : item.en}
                    <i className="fa-solid fa-chevron-down nav-dropdown-chevron" />
                  </button>
                  <div className="nav-dropdown-menu">
                    {item.children.map(child => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`nav-dropdown-item ${location.pathname.startsWith(child.path) ? 'active' : ''}`}
                      >
                        <span className="nav-dropdown-item-icon">
                          <i className={`fa-solid ${child.icon}`} />
                        </span>
                        {isKo ? child.ko : child.en}
                      </Link>
                    ))}
                  </div>
                </li>
              );
            })}
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
              <button className={`lang-btn ${language === 'ko' ? 'active' : ''}`} onClick={() => language !== 'ko' && toggleLanguage()}>KO</button>
              <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => language !== 'en' && toggleLanguage()}>EN</button>
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
        {NAV_ITEMS.map((item, idx) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-menu-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {isKo ? item.ko : item.en}
              </Link>
            );
          }
          /* Mobile Dropdown Accordion */
          const isOpen   = openMobileDrop === idx;
          const isActive = isDropdownActive(item);
          return (
            <div key={idx} className={`mobile-dropdown-section ${isOpen ? 'open' : ''}`}>
              <button
                className={`mobile-dropdown-btn ${isActive ? 'active' : ''}`}
                onClick={() => setOpenMobileDrop(isOpen ? null : idx)}
              >
                <span className="mobile-dropdown-btn-left">
                  {isKo ? item.ko : item.en}
                </span>
                <i className="fa-solid fa-chevron-down mobile-dropdown-chevron" />
              </button>
              <div className="mobile-dropdown-children">
                {item.children.map(child => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`mobile-dropdown-child ${location.pathname.startsWith(child.path) ? 'active' : ''}`}
                  >
                    <i className={`fa-solid ${child.icon}`} />
                    {isKo ? child.ko : child.en}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
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
