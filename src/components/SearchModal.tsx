import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SEARCH_DATA } from '../config/searchData';
import type { ReactElement } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps): ReactElement | null {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isKo = language === 'ko';

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const results = q.length < 1
    ? []
    : SEARCH_DATA.filter(
        (entry) =>
          entry.title.toLowerCase().includes(q) ||
          entry.titleEn.toLowerCase().includes(q) ||
          entry.keywords.toLowerCase().includes(q)
      );

  // Group by category
  const grouped = results.reduce<Record<string, typeof results>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <i className="fa-solid fa-magnifying-glass search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={isKo ? '검색어를 입력하세요... (ESC로 닫기)' : 'Search... (ESC to close)'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="search-kbd">ESC</kbd>
        </div>

        <div className="search-results">
          {q.length > 0 && results.length === 0 && (
            <div className="search-empty">
              <i className="fa-solid fa-face-meh" />
              <p>{isKo ? '검색 결과가 없습니다.' : 'No results found.'}</p>
            </div>
          )}
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="search-group">
              <div className="search-group-label">{category}</div>
              {items.map((item, i) => (
                <button
                  key={i}
                  className="search-result-item"
                  onClick={() => handleSelect(item.path)}
                >
                  <i className="fa-solid fa-file-lines search-result-icon" />
                  <div className="search-result-text">
                    <div className="search-result-title">{isKo ? item.title : item.titleEn}</div>
                    <div className="search-result-path">{item.path}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right search-result-arrow" />
                </button>
              ))}
            </div>
          ))}
          {q.length === 0 && (
            <div className="search-hint">
              <i className="fa-solid fa-lightbulb" />
              <p>{isKo ? '가이드, 토픽, FAQ 등을 검색할 수 있습니다.' : 'Search guides, topics, FAQ, and more.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
