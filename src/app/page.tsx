import React from "react";
import Image from "next/image";
import Head from "next/head";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from '@/utils/utils';
import FAQ from "@/components/FAQ";
import AppIntegrationClient from '@/components/AppIntegrationClient';
import CuteQuote from '@/components/CuteQuote';

export default function Home() {
  // Récupérer l'article épinglé
  const pinnedPost = getPosts(['src', 'app', 'blog', 'posts']).find(
    (post) => post.metadata.tag === 'epingle'
  );
  const canonicalUrl = `${baseURL}/`;
  return (
    <>
      <Head>
        <title>Création de site web ou portfolio web professionnel à l&apos;île Maurice</title>
        <meta name="description" content="Tout le monde possède un talent unique qui mérite d&apos;être vu, reconnu et valorisé. Arrêtez de vous adapter aux opportunités des autres : créez la vôtre ! Votre portfolio web ou site web devient votre terrain de jeu professionnel, l&apos;endroit où votre créativité rencontre l&apos;ambition, où vos compétences se transforment en opportunités concrètes. Démarquez-vous dans un monde où les CV se ressemblent tous grâce à un site web moderne, optimisé pour le référencement naturel (SEO), la visibilité Google et l&apos;impact professionnel à l&apos;île Maurice. Contactez-moi pour révéler votre potentiel en ligne et attirer vos futurs clients ou employeurs !" />
        <meta property="og:title" content="Fatigué de chercher l&apos;emploi parfait ? Créez votre opportunité avec un portfolio web professionnel à l&apos;île Maurice" />
        <meta property="og:description" content="Tout le monde possède un talent unique qui mérite d&apos;être vu, reconnu et valorisé. Arrêtez de vous adapter aux opportunités des autres : créez la vôtre ! Votre portfolio web devient votre terrain de jeu professionnel, l&apos;endroit où votre créativité rencontre l&apos;ambition, où vos compétences se transforment en opportunités concrètes. Démarquez-vous dans un monde où les CV se ressemblent tous grâce à un site web moderne, optimisé pour le référencement naturel (SEO), la visibilité Google et l&apos;impact professionnel à l&apos;île Maurice. Contactez-moi pour révéler votre potentiel en ligne et attirer vos futurs clients ou employeurs !" />
        <meta name="twitter:title" content="Fatigué de chercher l&apos;emploi parfait ? Créez votre opportunité avec un portfolio web professionnel à l&apos;île Maurice" />
        <meta name="twitter:description" content="Tout le monde possède un talent unique qui mérite d&apos;être vu, reconnu et valorisé. Arrêtez de vous adapter aux opportunités des autres : créez la vôtre ! Votre portfolio web devient votre terrain de jeu professionnel, l&apos;endroit où votre créativité rencontre l&apos;ambition, où vos compétences se transforment en opportunités concrètes. Démarquez-vous dans un monde où les CV se ressemblent tous grâce à un site web moderne, optimisé pour le référencement naturel (SEO), la visibilité Google et l&apos;impact professionnel à l&apos;île Maurice. Contactez-moi pour révéler votre potentiel en ligne et attirer vos futurs clients ou employeurs !" />
        <meta name="keywords" content="création site web Maurice, portfolio web Maurice, développeur web Maurice, site internet professionnel, visibilité Google, SEO Maurice, web designer, site vitrine, site e-commerce, freelance web, opportunité emploi Maurice, branding digital, optimisation SEO, site web moderne, trouver clients en ligne" />
        <link rel="canonical" href={canonicalUrl} />
        {/* Favicons pour tous les navigateurs et moteurs de recherche */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
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
            <RevealFx translateY="8" delay={0.5} fillWidth horizontal="center" paddingTop="40" paddingBottom="32">
              <Column fillWidth horizontal="start" gap="12" style={{alignItems: 'flex-start'}}>
                <Heading
                  as="h2"
                  variant="display-strong-l"
                  style={{
                    textAlign: 'left',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                  }}
                >
                  Révélez votre potentiel au monde entier. 🌟
                </Heading>
                <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left'}}>
                Votre talent mérite d&apos;être vu, reconnu et célébré. Que vous soyez étudiant ambitieux, professionnel passionné, entrepreneur visionnaire ou créatif libre, votre portfolio web devient votre vitrine d&apos;excellence, celle qui transforme vos réalisations en opportunités extraordinaires.<br/>
                <br/>
                Dans un univers numérique où chaque clic compte, votre site professionnel ne se contente pas de présenter votre travail : il raconte votre histoire, inspire confiance instantanément et grave votre expertise dans les esprits.<br/> C&apos;est votre signature digitale, votre passeport vers le succès.<br/>
                <br/>
                <b>Parce que votre premier regard virtuel peut changer le cours de votre carrière.</b><br/>
                <br/>
                Ne laissez plus votre talent dans l&apos;ombre, donnez-lui la scène qu&apos;il mérite. Votre portfolio web, c&apos;est votre moment de briller.
                </Text>
              </Column>
            </RevealFx>
          </Column>
        </Column>
        <RevealFx translateY="16" delay={0.6}>
          <Projects range={[1, 1]} />
        </RevealFx>
        
        <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center" paddingTop="32" paddingBottom="32">
          <Column fillWidth horizontal="start" gap="8" style={{alignItems: 'flex-start'}}>
            <Heading as="h2" variant="display-strong-l" style={{textAlign: 'left', fontWeight: 700, marginBottom: 20}}>
              Fatigué de chercher l&apos;emploi parfait ? Il est temps de le créer.
            </Heading>
            <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left'}}>
              Tout le monde possède un talent unique qui sommeille - cette étincelle particulière qui vous distingue des autres. Peut-être que vous l&apos;avez toujours su, ou peut-être qu&apos;elle attend encore d&apos;être découverte. Mais une chose est certaine : votre talent mérite d&apos;être vu, reconnu et valorisé.<br/><br/>
              Arrêtez de vous adapter aux opportunités des autres. Créez la vôtre. <strong>Votre portfolio web devient votre terrain de jeu professionnel</strong>, l&apos;endroit où votre créativité rencontre l&apos;ambition, où vos compétences se transforment en opportunités concrètes.<br/><br/>
              Dans un monde où les CV se ressemblent tous, osez vous démarquer. Montrez qui vous êtes vraiment. Révélez ce potentiel caché que vous portez en vous. Votre prochaine grande opportunité ne viendra peut-être pas d&apos;une candidature, mais de quelqu&apos;un qui découvrira votre <strong>univers en ligne</strong>.<br/><br/>
              Votre talent n&apos;attend qu&apos;une chose : être libéré.<br/><br/>
              Je suis là pour toutes les personnes prêtes à franchir le pas. N&apos;hésitez pas à <a href="/contact" style={{color: '#0070f3', textDecoration: 'underline'}}>me contacter</a> - ensemble, nous donnerons vie à votre vision professionnelle.
            </Text>
          </Column>
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
        <CuteQuote />
        <Projects range={[2]} />
        <AppIntegrationClient />
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
    </>
  );
}
