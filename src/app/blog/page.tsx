import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { Mailchimp, InternalLinks } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import { routeImages } from "@/resources/routeImages";
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from "next";
import JsonLdScripts from '@/components/JsonLdScripts';

export const generateMetadata = (): Metadata => {
  return {
    title: blog.title,
    description: blog.description,
    keywords: [
      'blog développement web Maurice',
      'tutoriels React Next.js',
      'conseils SEO Maurice',
      'articles techniques web',
      'astuces développeur Maurice'
    ],
    alternates: {
      canonical: `${baseURL}${blog.path}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'website',
      url: `${baseURL}${blog.path}`,
      images: [routeImages['/blog']],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [routeImages['/blog']],
    },
  };
};

export default function Blog() {
  return (
    <>
      <JsonLdScripts page="blog" />
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
