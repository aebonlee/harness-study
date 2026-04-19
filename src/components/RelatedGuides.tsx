import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import type { ReactElement } from 'react';

interface RelatedGuide {
  path: string;
  icon: string;
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
}

interface RelatedGuidesProps {
  guides: RelatedGuide[];
}

export default function RelatedGuides({ guides }: RelatedGuidesProps): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  return (
    <div className="related-guides">
      <h3 className="related-guides-title">
        <i className="fa-solid fa-link" />
        {isKo ? '관련 가이드' : 'Related Guides'}
      </h3>
      <div className="related-guides-grid">
        {guides.map((g) => (
          <Link key={g.path} to={g.path} className="related-guide-card">
            <div className="related-guide-icon">
              <i className={`fa-solid ${g.icon}`} />
            </div>
            <div className="related-guide-body">
              <div className="related-guide-name">{isKo ? g.nameKo : g.nameEn}</div>
              <div className="related-guide-desc">{isKo ? g.descKo : g.descEn}</div>
            </div>
            <i className="fa-solid fa-arrow-right related-guide-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}
