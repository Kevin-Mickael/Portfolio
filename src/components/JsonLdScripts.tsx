import Script from 'next/script';
import { jsonLdSchemas } from '@/app/metadata.config';
import { baseURL, person } from '@/resources';

interface JsonLdScriptsProps {
  page?: 'home' | 'blog' | 'work' | 'about' | 'contact';
  additionalSchemas?: object[];
}

export const JsonLdScripts: React.FC<JsonLdScriptsProps> = ({ 
  page = 'home', 
  additionalSchemas = [] 
}) => {
  // Schémas de base pour toutes les pages
  const baseSchemas = [
    jsonLdSchemas.person,
    jsonLdSchemas.organization,
    jsonLdSchemas.website,
    jsonLdSchemas.service,
  ];

  // Schémas spécifiques selon la page
  const pageSpecificSchemas: Record<string, object[]> = {
    home: [
      // Schéma VideoObject pour la page d'accueil
      {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Création de site web et portfolio à Maurice',
        description: "Vidéo de présentation : création de site web et portfolio professionnel à l'île Maurice",
        thumbnailUrl: [`${baseURL}/images/avatar.jpeg`],
        uploadDate: '2024-07-09',
        contentUrl: `${baseURL}/video/presentation.mp4`,
        embedUrl: `${baseURL}/video/presentation.mp4`,
        publisher: {
          '@type': 'Person',
          name: person.name,
          url: baseURL,
          logo: {
            '@type': 'ImageObject',
            url: `${baseURL}${person.avatar}`,
          },
        },
        duration: 'PT7S',
      },
      // Schéma LocalBusiness pour Google My Business
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Création de Site Web & Portfolio Maurice',
        image: `${baseURL}/favicon.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Stanley Ave',
          addressLocality: 'Quatre Bornes',
          postalCode: '72249',
          addressCountry: 'MU',
        },
        telephone: '+230 5459 3145',
        url: baseURL,
        openingHours: 'Mo-Fr 09:00-17:00',
      },
    ],
    blog: [],
    work: [],
    about: [],
    contact: []
  };

  // Schéma BreadcrumbList global
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${baseURL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseURL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Contact',
        item: `${baseURL}/contact`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Projets',
        item: `${baseURL}/work`,
      },
    ],
  };

  // Combiner tous les schémas
  const allSchemas = [
    ...baseSchemas,
    ...pageSpecificSchemas[page],
    breadcrumbSchema,
    ...additionalSchemas,
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <Script
          key={index}
          id={`jsonld-${page}-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
};

export default JsonLdScripts;
