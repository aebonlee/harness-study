import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import type { ReactElement } from 'react';

interface BreadcrumbItem {
  label: string;
  labelEn: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            <i className="fa-solid fa-house" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="breadcrumb-item">
            <i className="fa-solid fa-chevron-right breadcrumb-separator" />
            {item.path ? (
              <Link to={item.path} className="breadcrumb-link">
                {isKo ? item.label : item.labelEn}
              </Link>
            ) : (
              <span className="breadcrumb-current">
                {isKo ? item.label : item.labelEn}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
