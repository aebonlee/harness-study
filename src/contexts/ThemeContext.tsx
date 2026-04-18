import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactElement, ReactNode } from 'react';

interface ThemeContextValue {
  mode: string;
  resolvedTheme: string;
  toggleTheme: () => void;
  colorTheme: string;
  setColorTheme: (color: string) => void;
  COLOR_OPTIONS: { name: string; color: string }[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COLOR_OPTIONS = [
  { name: 'harness', color: '#1D4ED8' },
  { name: 'tech',    color: '#6366F1' },
  { name: 'ocean',   color: '#0891B2' },
  { name: 'forge',   color: '#EA580C' },
  { name: 'night',   color: '#7C3AED' },
];

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days = 365): void {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getAutoTheme(): string {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  const [mode, setMode] = useState(() => getCookie('hs_theme_mode') || 'auto');
  const [colorTheme, setColorThemeState] = useState(() => getCookie('hs_color_theme') || 'harness');

  const resolvedTheme = mode === 'auto' ? getAutoTheme() : mode;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (colorTheme === 'harness') {
      document.documentElement.removeAttribute('data-color');
    } else {
      document.documentElement.setAttribute('data-color', colorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    if (mode !== 'auto') return;
    const interval = setInterval(() => {
      document.documentElement.setAttribute('data-theme', getAutoTheme());
    }, 60000);
    return () => clearInterval(interval);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode(prev => {
      const next = prev === 'auto' ? 'light' : prev === 'light' ? 'dark' : 'auto';
      setCookie('hs_theme_mode', next);
      return next;
    });
  }, []);

  const setColorTheme = useCallback((color: string) => {
    setColorThemeState(color);
    setCookie('hs_color_theme', color);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, resolvedTheme, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
