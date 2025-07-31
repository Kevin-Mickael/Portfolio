import { Column, Meta, Schema, Heading } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import FAQ from "@/components/FAQ";
import Avis from "@/components/Avis";
import Breadcrumbs from '@/components/Breadcrumbs';
import { InternalLinks } from "@/components";
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
        
        {/* Liens internes pour réduire les pages orphelines - bien ajustés */}
        <div style={{ width: '100%', maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
          <InternalLinks currentPage="/work" />
        </div>
      </Column>
  );
}
