import { Column, Schema, Heading } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import FAQ, { faqJsonLd } from "@/components/FAQ";
import AvisClient from "@/components/AvisClient";
import { reviewsJsonLd } from "@/components/Avis";
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${baseURL}${work.path}`;
  const imageUrl = `/api/og/generate?title=${encodeURIComponent(work.title)}`;

  const breadcrumbJsonLd = {
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
        "item": canonicalUrl
      }
    ]
  };

  return {
    title: work.title,
    description: work.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: work.title,
      description: work.description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description: work.description,
      images: [imageUrl],
    },
    other: {
      'script[type="application/ld+json"]': [
        JSON.stringify(breadcrumbJsonLd),
        JSON.stringify(faqJsonLd),
        JSON.stringify(reviewsJsonLd),
      ].join(''),
    }
  };
}

export default function Work() {
  return (
    <>
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
        <Heading as="h1" variant="display-strong-l" marginBottom="l">
          {work.title}
        </Heading>
        <Projects />
        <AvisClient />
        <FAQ />
      </Column>
    </>
  );
}
