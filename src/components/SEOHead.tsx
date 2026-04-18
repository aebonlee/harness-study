import { SITE_CONFIG as site } from '../config/site';
import type { ReactElement } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SEOHead({ title, description, path = '' }: SEOHeadProps): ReactElement {
  const SITE = `${site.name} | ${site.nameKo}`;
  const BASE = site.url;
  const fullTitle = title ? `${title} | ${SITE}` : SITE;
  const desc = description || site.description;
  const image = `${BASE}/og-image.png`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${BASE}${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`${BASE}${path}`} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
