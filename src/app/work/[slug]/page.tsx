import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX, ImageSlider } from "@/components";
import { Metadata } from "next";

// Composant pour afficher les iframes
function IframeDisplay({ src, title }: { src: string; title?: string }) {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '100%',
      height: '400px', 
      margin: '16px 0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <iframe
        src={src}
        title={title || 'Embedded content'}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
        loading="lazy"
      />
    </div>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
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

  const posts = getPosts(["src", "app", "work", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden', 
      boxSizing: 'border-box' 
    }}>
      <Column 
        as="section" 
        maxWidth="m" 
        horizontal="center" 
        gap="l" 
        style={{ 
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${work.path}/${post.slug}`}
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
        <Column 
          maxWidth="xs" 
          gap="16"
          style={{ 
            width: '100%', 
            maxWidth: '100%', 
            boxSizing: 'border-box' 
          }}
        >
          <Button data-border="rounded" href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
            Projets
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        </Column>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '100%', 
          overflowX: 'hidden', 
          boxSizing: 'border-box' 
        }}>
          {post.metadata.images.length > 0 && (
            post.metadata.images[0].startsWith('iframe:') ? (
              <IframeDisplay 
                src={post.metadata.images[0].replace('iframe:', '')} 
                title={post.metadata.title}
              />
            ) : post.metadata.images.length > 1 ? (
              <ImageSlider 
                key={`slider-${post.slug}`}
                images={post.metadata.images}
                title="Galerie du projet"
                autoPlay={true}
                interval={4000}
              />
            ) : (
              <img
                src={post.metadata.images[0]}
                alt="image"
                style={{ 
                  width: '100%', 
                  maxWidth: '100%', 
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
                loading="lazy"
              />
            )
          )}
        </div>
        
        <Column 
          style={{ 
            margin: "auto",
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden'
          }} 
          as="article" 
          maxWidth="xs"
        >
          <Flex gap="12" marginBottom="24" vertical="center">
            {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Flex>
          <CustomMDX source={post.content} />
        </Column>
        <ScrollToHash />
      </Column>
    </div>
  );
}