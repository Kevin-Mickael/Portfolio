import { Metadata } from 'next';
import { baseURL, person } from '@/resources';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/favicon.ico',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = person?.name || 'Développeur Web',
    section,
    tags = [],
  } = config;

  const fullUrl = url ? `${baseURL}${url}` : baseURL;
  const fullImageUrl = image.startsWith('http') ? image : `${baseURL}${image}`;

  // Mots-clés optimisés pour Maurice
  const mauriceKeywords = [
    'création site web Maurice',
    'création site internet Maurice',
    'concepteur site web Maurice',
    'développeur site web Maurice',
    'agence web Maurice',
    'site internet professionnel Maurice',
    'création de site vitrine Maurice',
    'création site e-commerce Maurice',
    'freelance site web Maurice',
    'prix création site web Maurice',
    'devis site web Maurice',
    'portfolio web designer Maurice',
    'web designer Maurice',
    'mini-apps maurice',
    'site web maurice',
    'portfolio Maurice',
    'développeur frontend Maurice',
    'développeur react Maurice',
    'développeur next.js Maurice',
    'webmaster Maurice',
    'développeur Port Louis',
    'intégration web Maurice',
    'responsive design Maurice',
    'SEO Maurice',
    'web development Maurice',
    'digital agency Maurice',
    person?.name || '',
  ].filter(Boolean);

  const allKeywords = [...new Set([...keywords, ...mauriceKeywords])];

  const openGraph = {
    title,
    description,
    url: fullUrl,
    siteName: `${person?.name || 'Développeur Web'} - Développeur Web Maurice`,
    images: [
      {
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/jpeg',
      },
    ],
    locale: 'fr_FR',
    type,
    ...(publishedTime && { publishedTime }),
    ...(modifiedTime && { modifiedTime }),
    ...(author && { authors: [author] }),
    ...(section && { section }),
    ...(tags.length > 0 && { tags }),
  };

  const twitter = {
    card: 'summary_large_image' as const,
    title,
    description,
    images: [fullImageUrl],
    creator: person?.name ? `@${person.name.replace(/\s+/g, '')}` : '@developer',
    site: '@kevinmickael',
  };

  return {
    title: {
      default: title,
      template: `%s | Kevin Mickael`,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: person?.name || 'Développeur Web', url: baseURL }],
    creator: person?.name || 'Développeur Web',
    publisher: person?.name || 'Développeur Web',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
        noimageindex: false,
      },
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'fr-FR': fullUrl,
        'x-default': fullUrl,
      },
    },
    openGraph,
    twitter,
    category: 'technology',
    other: {
      'geo.region': 'MU',
      'geo.placename': 'Maurice',
      'geo.position': '-20.348404;57.552152',
      'ICBM': '-20.348404, 57.552152',
    },
  };
}

// Fonction pour générer les schémas JSON-LD spécifiques aux pages
export function generatePageJsonLd(config: SEOConfig) {
  const { title, description, url, type, publishedTime, modifiedTime, author, tags } = config;
  const fullUrl = url ? `${baseURL}${url}` : baseURL;

  const baseSchema = {
    '@context': 'https://schema.org',
    name: title,
    description,
    url: fullUrl,
    author: {
      '@type': 'Person',
      name: author || person?.name || 'Développeur Web',
      url: baseURL,
      jobTitle: 'Développeur Web',
      worksFor: {
        '@type': 'Organization',
        name: `${person?.name || 'Développeur Web'} - Développeur Web Maurice`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: `${person?.name || 'Développeur Web'} - Développeur Web Maurice`,
      logo: {
        '@type': 'ImageObject',
        url: `${baseURL}/favicon.png`,
      },
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  };

  if (type === 'article') {
    return {
      ...baseSchema,
      '@type': 'Article',
      headline: title,
      image: `${baseURL}/favicon.ico`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    };
  }

  return {
    ...baseSchema,
    '@type': 'WebPage',
    spatialCoverage: {
      '@type': 'Place',
      name: 'Maurice',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -20.348404,
        longitude: 57.552152,
      },
    },
  };
}

// Schéma pour les services locaux Maurice
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${person?.name || 'Développeur Web'} - Développeur Web Maurice`,
    description: 'Services de développement web professionnel à Maurice. Création de sites internet, portfolios, mini-apps et applications web.',
    url: baseURL,
    telephone: '+230-5459-3145',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MU',
      addressLocality: 'Port Louis',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.348404,
      longitude: 57.552152,
    },
    areaServed: ['Maurice', 'Île Maurice', 'Mauritius', 'Port Louis'],
    serviceType: [
      'Développement Web',
      'Création Site Internet',
      'Portfolio Professionnel',
      'Applications Web',
      'Mini-Apps',
      'E-commerce',
      'Maintenance Web',
      'Optimisation SEO',
    ],
    priceRange: '$$',
  };
}

// Configuration SEO pour pages spécifiques
export const seoConfigs = {
  home: {
    title: 'Création site web Maurice | Développeur, Agence & Web Designer',
    description: 'Création site web Maurice : développeur freelance, agence web, web designer. Site internet professionnel, vitrine, e-commerce, mini-apps, devis & prix sur mesure à Maurice.',
    keywords: [
      'création site web Maurice',
      'création site internet Maurice',
      'concepteur site web Maurice',
      'développeur site web Maurice',
      'agence web Maurice',
      'site internet professionnel Maurice',
      'création de site vitrine Maurice',
      'création site e-commerce Maurice',
      'freelance site web Maurice',
      'prix création site web Maurice',
      'devis site web Maurice',
      'portfolio web designer Maurice',
      'web designer Maurice',
      'mini-apps maurice',
      'site web maurice',
      'portfolio Maurice',
    ],
  },
  portfolio: {
    title: 'Portfolio Maurice - Projets Web & Mini-Apps',
    description: 'Découvrez mon portfolio Maurice : projets de développement web, sites vitrine, e-commerce, mini-apps et applications web réalisés à Maurice.',
    keywords: ['portfolio Maurice', 'projets développement Maurice', 'réalisations web Maurice', 'mini-apps maurice'],
  },
  services: {
    title: 'Services Développement Web Maurice | Mini-Apps & Sites Internet',
    description: 'Services de développement web professionnel à Maurice : création sites internet, portfolios, mini-apps, e-commerce et applications web.',
    keywords: ['services web Maurice', 'développement professionnel Maurice', 'création site internet Maurice', 'mini-apps maurice'],
  },
  contact: {
    title: 'Contact Développeur Web Maurice | Devis Gratuit',
    description: 'Contactez-moi pour vos projets de développement web à Maurice. Devis gratuit pour sites internet, portfolios et mini-apps.',
    keywords: ['contact développeur Maurice', 'devis site web Maurice', 'développeur freelance Maurice'],
  },
} as const;