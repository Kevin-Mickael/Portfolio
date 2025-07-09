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
  location?: 'maurice' | 'madagascar' | 'both';
}

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/images/og/home.jpg',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = person.name,
    section,
    tags = [],
    location = 'both',
  } = config;

  const fullUrl = url ? `${baseURL}${url}` : baseURL;
  const fullImageUrl = image.startsWith('http') ? image : `${baseURL}${image}`;

  // Mots-clés spécifiques par localisation
  const locationKeywords = {
    maurice: [
      'développeur web Maurice',
      'création site internet Maurice',
      'portfolio développeur Maurice',
      'développeur frontend Maurice',
      'développeur react Maurice',
      'développeur next.js Maurice',
      'webmaster Maurice',
      'développeur Port Louis',
      'développeur Rose Hill',
      'développeur Quatre Bornes',
      'site web professionnel Maurice',
      'développeur freelance Maurice',
      'agence web Maurice',
      'Maurice developer',
      'Mauritius web developer',
      'site vitrine Maurice',
      'e-commerce Maurice',
      'développeur mobile Maurice',
      'intégration web Maurice',
      'responsive design Maurice',
      'SEO Maurice',
      'Maurice IT services',
      'développeur Île Maurice',
      'web development Mauritius',
      'digital agency Maurice',
      'création portfolio Maurice'
    ],
    madagascar: [
      'développeur web Madagascar',
      'création site internet Madagascar',
      'portfolio développeur Madagascar',
      'développeur frontend Madagascar',
      'développeur react Madagascar',
      'développeur next.js Madagascar',
      'webmaster Madagascar',
      'développeur Antananarivo',
      'développeur Toamasina',
      'développeur Antsirabe',
      'site web professionnel Madagascar',
      'développeur freelance Madagascar',
      'agence web Madagascar',
      'Madagascar developer',
      'site vitrine Madagascar',
      'e-commerce Madagascar',
      'développeur mobile Madagascar',
      'intégration web Madagascar',
      'responsive design Madagascar',
      'SEO Madagascar',
      'Madagascar IT services',
      'web development Madagascar',
      'digital agency Madagascar',
      'création portfolio Madagascar',
      'développeur Fianarantsoa'
    ]
  };

  const baseKeywords = [
    'développeur web',
    'création site web',
    'portfolio développeur',
    'développeur frontend',
    'développeur fullstack',
    'react developer',
    'next.js developer',
    'typescript developer',
    'javascript developer',
    'développeur react native',
    'développeur node.js',
    'UI/UX developer',
    'responsive web design',
    'développeur e-commerce',
    'site vitrine',
    'site internet professionnel',
    'développeur freelance',
    'agence web',
    'développeur mobile',
    'application web',
    'progressive web app',
    'optimisation SEO',
    'développeur WordPress',
    'intégration web',
    'maintenance site web',
    'hébergement web',
    'nom de domaine',
    'certificat SSL',
    'océan indien développeur',
    'développeur îles',
    person.name,
  ];

  let allKeywords = [...keywords, ...baseKeywords];

  // Ajouter les mots-clés selon la localisation
  if (location === 'maurice') {
    allKeywords = [...allKeywords, ...locationKeywords.maurice];
  } else if (location === 'madagascar') {
    allKeywords = [...allKeywords, ...locationKeywords.madagascar];
  } else {
    allKeywords = [...allKeywords, ...locationKeywords.maurice, ...locationKeywords.madagascar];
  }

  const openGraph = {
    title,
    description,
    url: fullUrl,
    siteName: `${person.name} - Développeur Web Maurice & Madagascar`,
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
    card: 'summary_large_image',
    title,
    description,
    images: [fullImageUrl],
    creator: `@${person.name.replace(/\s+/g, '')}`,
    site: '@kevinmickael',
  };

  return {
    title: {
      default: title,
      template: `%s | ${person.name} - Développeur Web Maurice & Madagascar`,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: person.name, url: baseURL }],
    creator: person.name,
    publisher: person.name,
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
        'en-US': fullUrl,
      },
    },
    openGraph,
    twitter,
    category: 'technology',
    other: {
      'geo.region': location === 'maurice' ? 'MU' : location === 'madagascar' ? 'MG' : 'MU,MG',
      'geo.placename': location === 'maurice' ? 'Maurice' : location === 'madagascar' ? 'Madagascar' : 'Maurice, Madagascar',
      'geo.position': location === 'maurice' ? '-20.348404;57.552152' : location === 'madagascar' ? '-18.766947;46.869107' : '-20.348404;57.552152',
      'ICBM': location === 'maurice' ? '-20.348404, 57.552152' : location === 'madagascar' ? '-18.766947, 46.869107' : '-20.348404, 57.552152',
    },
  };
}

// Fonction pour générer les schémas JSON-LD spécifiques aux pages
export function generatePageJsonLd(config: SEOConfig) {
  const { title, description, url, type, publishedTime, modifiedTime, author, tags, location } = config;
  const fullUrl = url ? `${baseURL}${url}` : baseURL;

  const baseSchema = {
    '@context': 'https://schema.org',
    name: title,
    description,
    url: fullUrl,
    author: {
      '@type': 'Person',
      name: author || person.name,
      url: baseURL,
      jobTitle: 'Développeur Web',
      worksFor: {
        '@type': 'Organization',
        name: `${person.name} - Développeur Web`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: `${person.name} - Développeur Web Maurice & Madagascar`,
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
      image: `${baseURL}/images/og/home.jpg`,
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
    ...(location && {
      spatialCoverage: {
        '@type': 'Place',
        name: location === 'maurice' ? 'Maurice' : location === 'madagascar' ? 'Madagascar' : 'Maurice, Madagascar',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: location === 'maurice' ? -20.348404 : location === 'madagascar' ? -18.766947 : -20.348404,
          longitude: location === 'maurice' ? 57.552152 : location === 'madagascar' ? 46.869107 : 57.552152,
        },
      },
    }),
  };
}

// Schéma pour les services locaux
export function generateLocalBusinessSchema(location: 'maurice' | 'madagascar' | 'both') {
  const locations = {
    maurice: {
      name: 'Maurice',
      addressCountry: 'MU',
      addressLocality: 'Port Louis',
      latitude: -20.348404,
      longitude: 57.552152,
      telephone: '+230-XXXX-XXXX',
      areaServed: ['Maurice', 'Île Maurice', 'Mauritius'],
    },
    madagascar: {
      name: 'Madagascar',
      addressCountry: 'MG',
      addressLocality: 'Antananarivo',
      latitude: -18.766947,
      longitude: 46.869107,
      telephone: '+261-XX-XX-XXX-XX',
      areaServed: ['Madagascar', 'Antananarivo', 'Toamasina', 'Antsirabe'],
    },
  };

  if (location === 'both') {
    return [
      generateSingleLocationSchema(locations.maurice),
      generateSingleLocationSchema(locations.madagascar),
    ];
  }

  return generateSingleLocationSchema(locations[location]);
}

function generateSingleLocationSchema(locationData: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${person.name} - Développeur Web ${locationData.name}`,
    description: `Services de développement web professionnel à ${locationData.name}. Création de sites internet, portfolios et applications web.`,
    url: baseURL,
    telephone: locationData.telephone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: locationData.addressCountry,
      addressLocality: locationData.addressLocality,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    },
    areaServed: locationData.areaServed,
    serviceType: [
      'Développement Web',
      'Création Site Internet',
      'Portfolio Professionnel',
      'Applications Web',
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
    title: 'Développeur Web Maurice & Madagascar | Portfolio Professionnel',
    description: 'Développeur web freelance spécialisé en React, Next.js et TypeScript. Création de sites internet et portfolios professionnels à Maurice et Madagascar.',
    keywords: ['développeur web', 'création site web', 'portfolio développeur'],
    location: 'both' as const,
  },
  portfolio: {
    title: 'Portfolio - Projets Web Maurice & Madagascar',
    description: 'Découvrez mes réalisations en développement web : sites vitrine, e-commerce et applications web pour clients à Maurice et Madagascar.',
    keywords: ['portfolio web', 'projets développement', 'réalisations web'],
    location: 'both' as const,
  },
  services: {
    title: 'Services Développement Web Maurice & Madagascar',
    description: 'Services de développement web professionnel : création sites internet, portfolios, e-commerce et applications web à Maurice et Madagascar.',
    keywords: ['services web', 'développement professionnel', 'création site internet'],
    location: 'both' as const,
  },
  contact: {
    title: 'Contact Développeur Web Maurice & Madagascar',
    description: 'Contactez-moi pour vos projets de développement web à Maurice et Madagascar. Devis gratuit et conseils personnalisés.',
    keywords: ['contact développeur', 'devis site web', 'développeur freelance'],
    location: 'both' as const,
  },
};