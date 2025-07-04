import { Metadata } from 'next';
import { baseURL, person, home } from '@/resources';

const defaultOpenGraph = {
  type: 'website',
  locale: 'fr_FR',
  url: baseURL,
  siteName: home.title,
  images: [{
    url: `${baseURL}/images/og/home.jpg`,
    width: 1200,
    height: 630,
    alt: home.title,
  }],
};

const defaultTwitter = {
  card: 'summary_large_image',
  creator: `@${person.name.replace(/\s+/g, '')}`,
  images: [`${baseURL}/images/og/home.jpg`],
};

// Mots-clés enrichis pour un meilleur SEO
const keywords = [
  'développeur web',
  'frontend developer',
  'react developer',
  'next.js developer',
  'portfolio',
  'développeur freelance',
  person.name,
  'développeur madagascar',
  'développeur maurice',
  'développeur full stack',
  'expert react',
  'expert next.js',
  'développeur typescript',
  'création site web',
  'développement web',
  'web design',
  'responsive design',
  'UI/UX design',
  'développeur javascript',
  'développeur frontend maurice',
  'développeur frontend madagascar',
];

// Schéma JSON-LD enrichi pour Google
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': baseURL,
  name: person.name,
  url: baseURL,
  jobTitle: 'Développeur Web Full Stack',
  description: home.description,
  image: `${baseURL}/images/avatar.jpeg`,
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
    'UI/UX Design',
    'Responsive Design',
    'Web Performance',
    'SEO',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MU',
    addressRegion: 'Mauritius',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: home.title,
    template: `%s | ${person.name}`,
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
  },
  category: 'technology',
}; 