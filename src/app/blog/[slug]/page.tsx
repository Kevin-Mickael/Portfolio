import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import { AvatarGroup, Button, Column, Heading, HeadingNav, Icon, Row, Text, Schema } from "@once-ui-system/core";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) {
    return {};
  }

  const canonicalUrl = `${baseURL}${blog.path}/${post.slug}`;
  const imageUrl = post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.metadata.title,
    "description": post.metadata.summary,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": person.name,
      "url": `${baseURL}${about.path}`,
      "image": `${baseURL}${person.avatar}`
    },
    "datePublished": post.metadata.publishedAt,
    "dateModified": post.metadata.publishedAt,
    "mainEntityOfPage": canonicalUrl,
    "url": canonicalUrl
  };

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
        "name": "Blog",
        "item": `${baseURL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.metadata.title
      }
    ]
  };

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [imageUrl],
    },
    other: {
      'script[type="application/ld+json"]': [
        JSON.stringify(articleJsonLd),
        JSON.stringify(breadcrumbJsonLd)
      ].join(''),
    }
  };
}

export default async function Blog({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${baseURL}${blog.path}/${post.slug}`;

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <>
      <Row fillWidth>
        <Row maxWidth={12} hide="m"/>
        <Row fillWidth horizontal="center">
          <Column as="section" maxWidth="xs" gap="l">
            <Breadcrumbs
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.metadata.title }
              ]}
            />
            <Schema
              as="blogPosting"
              baseURL={baseURL}
              path={`${blog.path}/${post.slug}`}
              title={post.metadata.title}
              description={post.metadata.summary}
              datePublished={post.metadata.publishedAt}
              dateModified={post.metadata.publishedAt}
              image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
              author={{
                name: person.name,
                url: `${baseURL}${about.path}`,
                image: `${baseURL}${person.avatar}`,
              }}
            />
            <Button data-border="rounded" href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
              Posts
            </Button>
            <Heading variant="display-strong-s">{post.metadata.title}</Heading>
            <Row gap="12" vertical="center">
              {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
              <Text variant="body-default-s" onBackground="neutral-weak">
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
              </Text>
            </Row>
            <Column as="article" fillWidth>
              <CustomMDX source={post.content} />
            </Column>
            <ScrollToHash />
          </Column>
        </Row>
        <Column maxWidth={12} paddingLeft="40" fitHeight position="sticky" top="80" gap="16" hide="m">
          <Row
            gap="12"
            paddingLeft="2"
            vertical="center"
            onBackground="neutral-medium"
            textVariant="label-default-s"
          >
            <Icon name="document" size="xs" />
            On this page
          </Row>
          <HeadingNav fitHeight/>
        </Column>
      </Row>
    </>
  );
}
