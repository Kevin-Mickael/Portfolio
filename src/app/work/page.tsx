import { Column, Meta, Schema, Heading } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import FAQ from "@/components/FAQ";
import Avis from "@/components/Avis";
import Breadcrumbs from '@/components/Breadcrumbs';
import Head from "next/head";
import { routeImages } from "@/resources/routeImages";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: routeImages['/work'],
    path: work.path,
    canonical: `${baseURL}${work.path}`,
  });
}

export default function Work() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": work.title,
    "description": work.description,
    "url": `${baseURL}${work.path}`,
    "author": {
      "@type": "Person",
      "name": person.name,
      "url": `${baseURL}${about.path}`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": baseURL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projets",
          "item": `${baseURL}/work`
        }
      ]
    },
    "mainEntity": {
      "@type": "CollectionPage",
      "name": "Portfolio de Projets",
      "description": work.description
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${baseURL}${work.path}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content="fr" />
        
        {/* Open Graph tags manuels */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content={work.title} />
        <meta property="og:description" content={work.description} />
        <meta property="og:url" content={`${baseURL}${work.path}`} />
        <meta property="og:image" content={routeImages['/work']} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={work.title} />
        <meta name="twitter:description" content={work.description} />
        <meta name="twitter:image" content={routeImages['/work']} />
        
        {/* Robots meta */}
        <meta name="robots" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>
      
      <Column maxWidth="m">
        <Breadcrumbs
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Projets' }
          ]}
        />
        
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={work.path}
          title={work.title}
          description={work.description}
          image={routeImages['/work']}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        
        <Heading 
          as="h1" 
          variant="display-strong-l" 
          marginBottom="l"
          className="sr-only"
        >
          {work.title}
        </Heading>
        
        <main>
          <Projects />
          <Avis />
          <FAQ />
        </main>
      </Column>
    </>
  );
}