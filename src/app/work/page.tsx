import { Column, Meta, Schema, Heading } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import FAQ from "@/components/FAQ";
import Avis from "@/components/Avis";
import Breadcrumbs from '@/components/Breadcrumbs';
import Head from "next/head";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const canonicalUrl = `${baseURL}${work.path}`;
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
            })
          }}
        />
        <link rel="canonical" href={canonicalUrl} />
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
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Heading as="h1" variant="display-strong-l" marginBottom="l" style={{position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0}}>
          {work.title}
        </Heading>
        <Projects />
        <Avis />
        <FAQ />
      </Column>
    </>
  );
}
