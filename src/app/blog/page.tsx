import { Column, Heading, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${baseURL}/blog`;
  const jsonLd = {
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
        "name": "Blog",
        "item": canonicalUrl
      }
    ]
  };

  return {
    title: "Blog",
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'script[type="application/ld+json"]': JSON.stringify(jsonLd),
    }
  };
}

export default function Blog() {
  return (
    <>
      <Column maxWidth="s">
        <Breadcrumbs
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Blog' }
          ]}
        />
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          title={blog.title}
          description={blog.description}
          path={blog.path}
          image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}/blog`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Heading as="h1" marginBottom="l" variant="display-strong-s">
          {blog.title}
        </Heading>
        <Column
				fillWidth flex={1}>
				<Posts range={[1,1]} thumbnail direction="column"/>
				<Posts range={[2,3]} thumbnail/>
				<Posts range={[4]} columns="2"/>
			</Column>
        {newsletter.display && <Mailchimp newsletter={newsletter} />}
      </Column>
    </>
  );
}
