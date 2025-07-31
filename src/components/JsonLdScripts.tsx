import Script from 'next/script';
import { jsonLdSchemas } from '@/app/metadata.config';
import { baseURL, person } from '@/resources';

interface JsonLdScriptsProps {
  page?: 'home' | 'blog' | 'work' | 'about' | 'contact';
  additionalSchemas?: object[];
  breadcrumbItems?: Array<{ name: string; url: string; position: number }>;
}

export const JsonLdScripts: React.FC<JsonLdScriptsProps> = ({ 
  page = 'home', 
  additionalSchemas = [],
  breadcrumbItems = []
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
        inLanguage: 'fr-FR',
        keywords: 'création site web, portfolio, Maurice, développeur web',
      },
      // Schéma LocalBusiness pour Google My Business
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${baseURL}/#localbusiness`,
        name: 'Création de Site Web & Portfolio Maurice',
        image: `${baseURL}/favicon.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Stanley Ave',
          addressLocality: 'Quatre Bornes',
          postalCode: '72249',
          addressCountry: 'MU',
          addressRegion: 'Plaines Wilhems',
        },
        telephone: '+230 5459 3145',
        url: baseURL,
        openingHours: 'Mo-Fr 09:00-17:00',
        priceRange: '$$',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -20.2659,
          longitude: 57.4777,
        },
        sameAs: [
          // Ajoutez vos réseaux sociaux ici
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '1',
        },
      },
    ],
    blog: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog - Création de Sites Web Maurice',
        description: 'Articles et conseils sur le développement web, design et SEO à Maurice',
        url: `${baseURL}/blog`,
        author: {
          '@type': 'Person',
          name: person.name,
          url: `${baseURL}/about`,
        },
        publisher: {
          '@type': 'Person',
          name: person.name,
          logo: {
            '@type': 'ImageObject',
            url: `${baseURL}${person.avatar}`,
          },
        },
        inLanguage: 'fr-FR',
      },
    ],
    work: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Portfolio - Projets Web Maurice',
        description: 'Découvrez mes réalisations en développement web et création de sites à Maurice',
        url: `${baseURL}/work`,
        author: {
          '@type': 'Person',
          name: person.name,
          url: `${baseURL}/about`,
        },
        mainEntity: {
          '@type': 'ItemList',
          name: 'Projets Portfolio',
          numberOfItems: '10', // Ajustez selon le nombre réel
        },
      },
    ],
    about: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: `À propos - ${person.name}`,
        description: 'Développeur web spécialisé dans la création de sites modernes à Maurice',
        url: `${baseURL}/about`,
        mainEntity: {
          '@type': 'Person',
          name: person.name,
          jobTitle: 'Développeur Web Frontend',
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
          },
          knowsAbout: [
            'Développement Web',
            'React',
            'Next.js',
            'SEO',
            'UI/UX Design',
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Quatre Bornes',
            addressCountry: 'MU',
          },
        },
      },
    ],
    contact: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact - Développeur Web Maurice',
        description: 'Contactez-moi pour vos projets de création de sites web à Maurice',
        url: `${baseURL}/contact`,
        mainEntity: {
          '@type': 'ContactPoint',
          telephone: '+230 5459 3145',
          contactType: 'customer service',
          availableLanguage: ['French', 'English'],
          areaServed: 'MU',
        },
      },
    ],
  };

  // Génération dynamique du BreadcrumbList selon la page
  const generateBreadcrumbSchema = () => {
    if (breadcrumbItems.length > 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item) => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          item: item.url,
        })),
      };
    }

    // Breadcrumbs par défaut pour chaque page
    const defaultBreadcrumbs: Record<string, object> = {
      home: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseURL}/`,
          },
        ],
      },
      blog: {
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
        ],
      },
      work: {
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
            name: 'Projets',
            item: `${baseURL}/work`,
          },
        ],
      },
      about: {
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
            name: 'À propos',
            item: `${baseURL}/about`,
          },
        ],
      },
      contact: {
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
            name: 'Contact',
            item: `${baseURL}/contact`,
          },
        ],
      },
    };

    return defaultBreadcrumbs[page];
  };

  // Combiner tous les schémas
  const allSchemas = [
    ...baseSchemas,
    ...pageSpecificSchemas[page],
    generateBreadcrumbSchema(),
    ...additionalSchemas,
  ].filter(Boolean); // Filtrer les valeurs undefined

  return (
    <>
      {allSchemas.map((schema, index) => (
        <Script
          key={`jsonld-${page}-${index}`}
          id={`jsonld-${page}-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  );
};

export default JsonLdScripts;