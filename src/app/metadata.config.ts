import { Metadata } from 'next';
import { baseURL, person, home } from '@/resources';

// Validation des données importées avec fallbacks
const validatePerson = () => {
  if (!person?.name) {
    console.warn('Person data not found, using fallback');
    return {
      name: 'Création de mini-apps, site web et portfolio web à Maurice',
      email: 'contact@creativfolio.com'
    };
  }
  return person;
};

const validateHome = () => {
  if (!home?.title || !home?.description) {
    console.warn('Home data not found, using fallback');
    return {
      title: 'Création site web Maurice | Développeur Web & Mini-Apps',
      description: 'Développeur web professionnel à Maurice spécialisé en création de sites internet, portfolios et mini-apps. Services de développement web sur mesure.'
    };
  }
  return home;
};

const validatedPerson = validatePerson();
const validatedHome = validateHome();

const defaultOpenGraph = {
  type: 'website' as const,
  locale: 'fr_FR',
  url: baseURL,
  siteName: `${validatedPerson.name} - Création de mini-apps, site web et portfolio web à Maurice`,
  images: [{
    url: `${baseURL}/favicon.png`,
    width: 512,
    height: 512,
    alt: validatedHome.title,
    type: 'image/png',
  }],
};

const defaultTwitter = {
  card: 'summary_large_image' as const,
  creator: validatedPerson.name ? `@${validatedPerson.name.replace(/\s+/g, '')}` : '@developer',
  site: '@kevinmickael',
  images: [`${baseURL}/favicon.png`],
};

// Mots-clés optimisés pour Maurice avec les nouveaux termes
const keywords = [
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
  'développeur Quatre bornes',
  'intégration web Maurice',
  'responsive design Maurice',
  'SEO Maurice',
  'web development Maurice',
  'digital agency Maurice',
  validatedPerson.name,
].filter(Boolean);

// Schéma JSON-LD enrichi focalisé sur Maurice
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': baseURL,
  name: validatedPerson.name,
  url: baseURL,
  jobTitle: 'Développeur Web Full Stack Maurice',
  description: validatedHome.description,
  image: `${baseURL}/favicon.png`,
  sameAs: [
    'https://github.com/Kevin-Mickael',
    'https://www.linkedin.com/in/andriatsilavokevin/',
  ].filter(Boolean),
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance Maurice',
  },
  knowsAbout: [
    'Développement Web Maurice',
    'React Maurice',
    'Next.js Maurice',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Mini-Apps',
    'Portfolio Web',
    'Sites Internet Maurice',
    'UI/UX Design',
    'Responsive Design',
    'Web Performance',
    'SEO Maurice',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Database Design',
    'API Development',
    'Web Security',
    'Progressive Web Apps',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MU',
    addressRegion: 'Maurice',
    addressLocality: 'Port Louis',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Développeur Web Full Stack Maurice',
    description: 'Développement de sites web, portfolios et mini-apps à Maurice',
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Développement Web Maurice',
      description: 'Création de sites web professionnels, portfolios et mini-apps à Maurice',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mauritius',
    },
  },
  additionalName: validatedPerson.name,
  nationality: {
    '@type': 'Country',
    name: 'Mauritius',
  },
  skill: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'HTML5',
    'CSS3',
    'SASS/SCSS',
    'Git',
    'PostgreSQL',
    'MongoDB',
    'REST APIs',
    'GraphQL',
    'Webpack',
    'Vite',
    'Figma',
    'Adobe XD',
    'Mini-Apps Development',
    'Portfolio Design',
    'Responsive Design',
    'SEO Optimization',
  ],
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'French',
      proficiencyLevel: 'Native',
    },
    {
      '@type': 'Language',
      name: 'English',
      proficiencyLevel: 'Fluent',
    },
  ],
};

// Schéma pour l'organisation focalisé sur Maurice
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `${validatedPerson.name} - Création de mini-apps, site web et portfolio web à Maurice`,
  url: baseURL,
  logo: `${baseURL}/favicon.png`,
  description: validatedHome.description,
  founder: {
    '@type': 'Person',
    name: validatedPerson.name,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: validatedPerson.email,
    availableLanguage: ['French'],
    areaServed: {
      '@type': 'Country',
      name: 'Mauritius',
    },
  },
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
  foundingDate: '2021-01-01',
  numberOfEmployees: '1',
  industry: 'Technology',
  serviceType: [
    'Développement Web Maurice',
    'Création Site Internet Maurice',
    'Portfolio Maurice',
    'Mini-Apps Maurice',
  ],
  areaServed: [
    {
      '@type': 'Country',
      name: 'Mauritius',
    },
  ],
};

// Schéma pour le site web
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: validatedHome.title,
  url: baseURL,
  description: validatedHome.description,
  author: {
    '@type': 'Person',
    name: validatedPerson.name,
  },
  publisher: {
    '@type': 'Organization',
    name: `${validatedPerson.name} - Création de mini-apps, site web et portfolio web à Maurice`,
  },
  inLanguage: ['fr-FR'],
  isAccessibleForFree: true,
  dateCreated: '2021-01-01',
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@type': 'Person',
    name: validatedPerson.name,
  },
  about: {
    '@type': 'Thing',
    name: 'Développement Web Maurice',
  },
};

// Schéma pour les services offerts à Maurice
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Développement Web Maurice',
  description: 'Services de développement web professionnel à Maurice : création de sites internet, portfolios et mini-apps',
  provider: {
    '@type': 'Person',
    name: validatedPerson.name,
    url: baseURL,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Mauritius',
  },
  serviceType: [
    'Création Site Web Maurice',
    'Portfolio Maurice',
    'Mini-Apps Maurice',
    'Développement Frontend Maurice',
    'IT Support Maurice',
    'UI/UX Design Maurice',
    'SEO Maurice',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Création Sites Web Maurice',
      description: 'Sites web professionnels et responsives à Maurice',
      availableAtOrFrom: {
        '@type': 'Place',
        name: 'Maurice',
      },
    },
    {
      '@type': 'Offer',
      name: 'Création Portfolio Maurice',
      description: 'Création de portfolios professionnels à Maurice',
      availableAtOrFrom: {
        '@type': 'Place',
        name: 'Maurice',
      },
    },
    {
      '@type': 'Offer',
      name: 'Création Mini-Apps Maurice',
      description: 'Développement de mini-applications à Maurice',
      availableAtOrFrom: {
        '@type': 'Place',
        name: 'Maurice',
      },
    },
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: validatedHome.title,
    template: `%s | ${validatedPerson.name} - Développeur Web Maurice`,
  },
  description: validatedHome.description,
  keywords: keywords,
  authors: [{ name: validatedPerson.name, url: baseURL }],
  creator: validatedPerson.name,
  publisher: validatedPerson.name,
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
    canonical: baseURL,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: validatedHome.title,
    description: validatedHome.description,
  },
  twitter: {
    ...defaultTwitter,
    title: validatedHome.title,
    description: validatedHome.description,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'MmHJO51HH3FEXTU938nPgFyQZ_MtrDPnpSyLT-XgiTU',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '3cb6fb33f8583b06',
  },
  category: 'technology',
  icons: {
    icon: '/favicon.ico?v=4',
    shortcut: '/favicon.ico?v=4',
    apple: '/apple-touch-icon.png?v=4',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png?v=4',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png?v=4',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '48x48',
        url: '/favicon-48x48.png?v=4',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png?v=4',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png?v=4',
      },
    ],
  },
  manifest: '/manifest.json?v=4',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': validatedHome.title,
    'application-name': validatedHome.title,
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
    'referrer': 'origin-when-cross-origin',
    'color-scheme': 'light dark',
    'geo.region': 'MU',
    'geo.placename': 'Maurice',
    'geo.position': '-20.348404;57.552152',
    'ICBM': '-20.348404, 57.552152',
    'ai-description': `${validatedPerson.name} est un développeur web professionnel basé à Maurice, spécialisé en création de sites internet, portfolios et mini-apps. Expert en React, Next.js et développement web moderne.`,
    'ai-expertise': 'Développement Web Maurice, React, Next.js, TypeScript, Mini-Apps, Portfolio, Sites Internet Maurice',
    'ai-location': 'Maurice, Port Louis',
    'ai-services': 'Création site web Maurice, Portfolio Maurice, Mini-apps Maurice',
    ...(validatedPerson.email && { 'ai-contact': validatedPerson.email }),
  },
};

// Export des schémas JSON-LD pour utilisation dans les pages
export const jsonLdSchemas = {
  person: jsonLd,
  organization: organizationJsonLd,
  website: websiteJsonLd,
  service: serviceJsonLd,
};

// Fonction utilitaire pour injecter les schémas JSON-LD
export const generateJsonLdScript = (schemas: object[]) => {
  return schemas.map(schema => ({
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  }));
};