import { Metadata } from 'next';
import { baseURL, person, home } from '@/resources';

const defaultOpenGraph = {
  type: 'website',
  locale: 'fr_FR',
  url: baseURL,
  siteName: home.title,
  images: [{
    url: `${baseURL}/favicon.png`,
    width: 512,
    height: 512,
    alt: home.title,
    type: 'image/png',
  }],
};

const defaultTwitter = {
  card: 'summary_large_image',
  creator: `@${person.name.replace(/\s+/g, '')}`,
  site: '@kevinmickael',
  images: [`${baseURL}/favicon.png`],
};

// Mots-clés enrichis pour un meilleur SEO et visibilité IA
const keywords = [
  // Mots-clés principaux
  'développeur web',
  'frontend developer',
  'react developer',
  'next.js developer',
  'portfolio',
  'développeur freelance',
  person.name,
  'développeur maurice',
  'développeur madagascar',
  'développeur full stack',
  'expert react',
  'expert next.js',
  'développeur typescript',
  'création site web',
  'création Portfolio',
  'développement web',
  'web design',
  'responsive design',
  'UI/UX design',
  'développeur javascript',
  'développeur frontend maurice',
  'développeur frontend madagascar',
  
  // Technologies spécifiques
  'HTML',
  'CSS',
  'Wordpress',
  'Shopify',
  'Wix',
  'Squarespace',
  'Webflow',
  'Figma',
  'IT support',
  'software engineer',
  'freelance developer',
  'web application',
  'mobile development',
  'database design',
  'SQL Server',
  'PostgreSQL',
  'Go programming',
  'Node.js',
  'API development',
  'cloudflare',
  'performance web',
  'optimisation SEO',
  
  // Mots-clés pour les IA
  'développeur web professionnel',
  'expert en développement web',
  'spécialiste react next.js',
  'développeur full stack maurice',
  'créateur de sites web',
  'développeur web freelance',
  'expert en typescript',
  'développeur web moderne',
  'spécialiste frontend',
  'développeur web maurice',
  'développeur web madagascar',
  'expert en développement d\'applications',
  'spécialiste en eHealth',
  'développeur web HTML & CSS',
  'expert en bases de données',
  'développeur d\'APIs',
  'spécialiste en performance web',
  'expert en optimisation SEO',
  'développeur web cloudflare',
  'spécialiste en développement moderne',
];

// Schéma JSON-LD enrichi pour Google et les IA
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': baseURL,
  name: person.name,
  url: baseURL,
  jobTitle: 'Développeur Web Full Stack & IT Support Engineer',
  description: home.description,
  image: `${baseURL}/favicon.png`,
  sameAs: [
    'https://github.com/Kevin-Mickael',
    'https://www.linkedin.com/in/andriatsilavokevin/',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  knowsAbout: [
    'Développement Web',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Go',
    'PostgreSQL',
    'SQL Server',
    'UI/UX Design',
    'Responsive Design',
    'Web Performance',
    'SEO',
    'IT Support',
    'eHealth Systems',
    'OpenELIS',
    'Database Design',
    'API Development',
    'Cloudflare',
    'Web Development',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Software Engineering',
    'System Architecture',
    'Database Management',
    'Web Security',
    'Performance Optimization',
    'Mobile Development',
    'Progressive Web Apps',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MU',
    addressRegion: 'Mauritius',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: "Ecole Supérieure de Management et D'Informatique Appliquée",
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Développeur Web Full Stack',
    description: 'Développement d\'applications web modernes avec React, Next.js et TypeScript',
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Développement Web',
      description: 'Création de sites web professionnels et applications web modernes',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mauritius',
    },
  },
  // Informations supplémentaires pour les IA
  additionalName: 'Kevin Mickael Andriatsilavo',
  familyName: 'Andriatsilavo',
  givenName: 'Kevin Mickael',
  honorificPrefix: 'Mr.',
  honorificSuffix: 'BSc',
  gender: 'Male',
  birthDate: '2000-19-11', // À ajuster selon votre date de naissance
  nationality: {
    '@type': 'Country',
    name: 'Madagascar',
  },
  // Compétences techniques détaillées
  skill: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Go',
    'PostgreSQL',
    'SQL Server',
    'HTML5',
    'CSS3',
    'SASS/SCSS',
    'Git',
    'Docker',
    'AWS',
    'Cloudflare',
    'REST APIs',
    'GraphQL',
    'MongoDB',
    'Redis',
    'Webpack',
    'Vite',
    'Jest',
    'Cypress',
    'Figma',
    'Adobe XD',
    'Linux',
    'Windows',
    'macOS',
  ],
  // Expérience professionnelle
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: "Ecole Supérieure de Management et D'Informatique Appliquée",
      },
    },
  ],
  // Langues parlées
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
    {
      '@type': 'Language',
      name: 'Malagasy',
      proficiencyLevel: 'Native',
    },
  ],
};

// Schéma pour l'organisation
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: `${person.name} - Portfolio`,
  url: baseURL,
  logo: `${baseURL}/favicon.png`,
  description: home.description,
  founder: {
    '@type': 'Person',
    name: person.name,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: person.email,
    availableLanguage: ['French', 'English', 'Malagasy'],
    areaServed: {
      '@type': 'Country',
      name: 'Mauritius',
    },
  },
  // Informations pour les IA
  foundingDate: '2021-01-01',
  numberOfEmployees: '1',
  industry: 'Technology',
  sector: 'Information Technology',
  serviceType: 'Web Development',
  areaServed: [
    {
      '@type': 'Country',
      name: 'Mauritius',
    },
    {
      '@type': 'Country',
      name: 'Madagascar',
    },
    {
      '@type': 'Country',
      name: 'France',
    },
  ],
};

// Schéma pour le site web
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: home.title,
  url: baseURL,
  description: home.description,
  author: {
    '@type': 'Person',
    name: person.name,
  },
  publisher: {
    '@type': 'Organization',
    name: `${person.name} - Portfolio`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseURL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  // Informations pour les IA
  inLanguage: ['fr-FR', 'en-US'],
  isAccessibleForFree: true,
  dateCreated: '2021-01-01',
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@type': 'Person',
    name: person.name,
  },
};

// Schéma pour les services offerts
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Développement Web Full Stack',
  description: 'Services de développement web professionnel incluant la création de sites web, applications web, et solutions eHealth',
  provider: {
    '@type': 'Person',
    name: person.name,
    url: baseURL,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Mauritius',
  },
  serviceType: [
    'Web Development',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'UI/UX Design',
    'Database Design',
    'API Development',
    'eHealth Systems',
    'IT Support',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Création de Sites Web et Portfolio Web',
      description: 'Sites web professionnels et responsives et Portfolio Web',
      price: '0',
      priceCurrency: 'EUR',
    },
    {
      '@type': 'Offer',
      name: 'Développement d\'Applications Web',
      description: 'Applications web modernes avec React et Next.js',
      price: '0',
      priceCurrency: 'EUR',
    },
    {
      '@type': 'Offer',
      name: 'Systèmes eHealth',
      description: 'Développement de systèmes de laboratoire et eHealth',
      price: '0',
      priceCurrency: 'EUR',
    },
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: home.title,
    template: `%s `,
  },
  description: home.description,
  keywords: keywords,
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
    canonical: baseURL,
    languages: {
      'fr-FR': baseURL,
      'en-US': baseURL,
    },
  },
  openGraph: {
    ...defaultOpenGraph,
    title: home.title,
    description: home.description,
  },
  twitter: {
    ...defaultTwitter,
    title: home.title,
    description: home.description,
  },
  verification: {
    // TODO: Remplacer par ton code de vérification Google Search Console
    google: 'google-site-verification=REMPLACER_PAR_TON_CODE',
    // TODO: Ajouter Bing Webmaster Tools
    yandex: 'yandex-verification=REMPLACER_PAR_TON_CODE',
  },
  category: 'technology',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': home.title,
    'application-name': home.title,
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
    'referrer': 'origin-when-cross-origin',
    'color-scheme': 'light dark',
    // Métadonnées pour les IA
    'ai-description': `${person.name} est un développeur web full stack professionnel basé à Maurice, spécialisé en React, Next.js, TypeScript et développement d'applications web modernes. Expert en eHealth et systèmes de laboratoire.`,
    'ai-expertise': 'React, Next.js, TypeScript, Node.js, Go, PostgreSQL, eHealth, OpenELIS, Web Development, Full Stack',
    'ai-location': 'Mauritius, Madagascar',
    'ai-contact': person.email,
    'ai-linkedin': 'https://www.linkedin.com/in/andriatsilavokevin/',
    'ai-github': 'https://github.com/Kevin-Mickael',
  },
};

// Export des schémas JSON-LD pour utilisation dans les pages
export const jsonLdSchemas = {
  person: jsonLd,
  organization: organizationJsonLd,
  website: websiteJsonLd,
  service: serviceJsonLd,
}; 