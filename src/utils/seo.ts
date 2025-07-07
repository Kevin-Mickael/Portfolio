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
    image = '/images/og/home.jpg',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = person.name,
    section,
    tags = [],
  } = config;

  const fullUrl = url ? `${baseURL}${url}` : baseURL;
  const fullImageUrl = image.startsWith('http') ? image : `${baseURL}${image}`;

  const allKeywords = [
    ...keywords,
    'développeur web',
    'frontend developer',
    'react developer',
    'next.js developer',
    'portfolio',
    person.name,
    'développeur maurice',
    'développeur madagascar',
  ];

  const openGraph = {
    title,
    description,
    url: fullUrl,
    siteName: `${person.name} - Portfolio`,
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
      template: `%s | ${person.name}`,
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
  };
}

// Fonction pour générer les schémas JSON-LD spécifiques aux pages
export function generatePageJsonLd(config: SEOConfig) {
  const { title, description, url, type, publishedTime, modifiedTime, author, tags } = config;
  const fullUrl = url ? `${baseURL}${url}` : baseURL;

  if (type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      image: `${baseURL}/images/og/home.jpg`,
      author: {
        '@type': 'Person',
        name: author || person.name,
        url: baseURL,
      },
      publisher: {
        '@type': 'Organization',
        name: `${person.name} - Portfolio`,
        logo: {
          '@type': 'ImageObject',
          url: `${baseURL}/favicon.png`,
        },
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: fullUrl,
    author: {
      '@type': 'Person',
      name: person.name,
      url: baseURL,
    },
    publisher: {
      '@type': 'Organization',
      name: `${person.name} - Portfolio`,
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  };
} 