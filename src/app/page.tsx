import React from "react";
import Image from "next/image";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from '@/utils/utils';
import FAQ from "@/components/FAQ";

export default function Home() {
  // Récupérer l'article épinglé
  const pinnedPost = getPosts(['src', 'app', 'blog', 'posts']).find(
    (post) => post.metadata.tag === 'epingle'
  );
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        {/* Bloc titre style accueil personnalisé */}
        <Column maxWidth="s">
          {home.featured.display && (
          <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
            <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
              href={home.featured.href}>
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading as="h1" wrap="balance" variant="display-strong-l" style={{position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0}}>
              Création site web Maurice : développeur, agence et web designer pour site vitrine, e-commerce et portfolio professionnel.
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Flex gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={32}
                    height={32}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      overflow: 'hidden',
                      marginRight: 8,
                      marginLeft: '-0.75rem',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                    }}
                    loading="lazy"
                    unoptimized
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Derniers articles du blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" thumbnail />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} />
      {/* Section article épinglé */}
      {pinnedPost && (
        <RevealFx translateY="16" delay={0.7}>
          <Column fillWidth paddingY="32" gap="m" style={{ background: 'var(--surface-strong)', borderRadius: 'var(--radius-l)' }}>
            <Heading as="h2" variant="display-strong-m" wrap="balance">
              {pinnedPost.metadata.title}
            </Heading>
            {pinnedPost.metadata.image && (
              <Image
                src={pinnedPost.metadata.image}
                alt={pinnedPost.metadata.title}
                width={800}
                height={450}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-l)', marginBottom: 24 }}
                loading="lazy"
                unoptimized
              />
            )}
            <Text variant="body-default-l" onBackground="neutral-medium" style={{ marginBottom: 16 }}>
              {pinnedPost.metadata.summary}
            </Text>
            <Button
              href="/blog/presentation"
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              Lire l&apos;article
            </Button>
            {/* FAQ déplacée ici, harmonisée */}
            <RevealFx translateY="8" delay={0.1} fillWidth horizontal="start" paddingTop="24">
              <Column fillWidth maxWidth="s" style={{ margin: '0 auto' }}>
                <FAQ />
              </Column>
            </RevealFx>
          </Column>
        </RevealFx>
      )}
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
