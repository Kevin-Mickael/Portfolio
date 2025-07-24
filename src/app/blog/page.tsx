import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import { routeImages } from "@/resources/routeImages";
import Breadcrumbs from '@/components/Breadcrumbs';
import Head from 'next/head';

export async function generateMetadata() {
  return {
    title: "Blog"
  };
}

export default function Blog() {
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
                  "name": "Blog",
                  "item": `${baseURL}/blog`
                }
              ]
            })
          }}
        />
      </Head>
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
          image={routeImages['/blog']}
          author={{
            name: person.name,
            url: `${baseURL}/blog`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Heading as="h1" marginBottom="l" variant="display-strong-s" style={{position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0}}>
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
