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
import styles from './home.module.css';

export default function Home() {
  // Récupérer l'article épinglé
  const pinnedPost = getPosts(['src', 'app', 'blog', 'posts']).find(
    (post) => post.metadata.tag === 'epingle'
  );
  const canonicalUrl = `${baseURL}/`;
  return (
    <>
          <Head>
      <title>Création de site web professionnel à Maurice | Portfolio web </title>
      <meta name="description" content="Développeur web professionnel à Maurice spécialisé dans la création de sites web et portfolios optimisés SEO. Augmentez votre visibilité en ligne et attirez plus de clients avec un site moderne et performant." />
      <meta property="og:title" content="Création de site web professionnel à Maurice | Portfolio web" />
      <meta property="og:description" content="Développeur web professionnel à Maurice spécialisé dans la création de sites web et portfolios optimisés SEO. Augmentez votre visibilité en ligne et attirez plus de clients avec un site moderne et performant." />
      <meta name="twitter:title" content="Création de site web professionnel à Maurice | Portfolio web" />
      <meta name="twitter:description" content="Développeur web professionnel à Maurice spécialisé dans la création de sites web et portfolios optimisés SEO. Augmentez votre visibilité en ligne et attirez plus de clients avec un site moderne et performant." />
      <meta name="keywords" content="création site web Maurice, développeur web Maurice, portfolio web professionnel, SEO Maurice, site internet Maurice, web design Maurice, référencement naturel, visibilité Google Maurice, site responsive Maurice, développement web île Maurice" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Column maxWidth="m" gap="xl" horizontal="center" className={styles.responsiveHome}>
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
                <Flex gap="8" vertical="center" paddingRight="4" className={styles.aboutButtonFlex}>
                  {about.avatar.display && (
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={32}
                      height={32}
                      className={styles.aboutAvatar}
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
                  Façonnez Votre Avenir Numérique : Créez Votre Portfolio Web
                </Heading>
                <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left'}}>
                  
                  Notre objectif est de démocratiser l&apos;accès au monde numérique pour tous. Je suis là pour vous accompagner dans cette transition essentielle.<br/><br/>
                  Il est temps de vous présenter une opportunité concrète et innovante : la création d&apos;un portfolio web. Ce dernier est bien plus qu&apos;un simple CV ; c&apos;est une vitrine numérique accessible instantanément, permettant de présenter vos compétences et réalisations de manière percutante.<br/><br/>
                  <span style={{display: 'block', margin: '32px 0 12px 0'}}>
                    <div className="heading-responsive">
                      <Heading as="h3" variant="display-strong-m">
                        Qu&apos;est-ce qu&apos;un portfolio web ?
                      </Heading>
                    </div>
                  </span>
                  Un portfolio web est l&apos;équivalent numérique de votre CV, mais avec une dimension interactive et visuelle. Il met en lumière vos expériences et réalisations concrètes.<br/><br/>
                  Prenons l&apos;exemple d&apos;un travailleur indépendant, comme un chef cuisinier. Au lieu de simplement lister vos compétences sur papier, imaginez pouvoir montrer des photos de vos projets terminés, des témoignages de clients, ou même des vidéos de votre travail. Lorsque quelqu&apos;un vous interroge sur vos services, vous pouvez simplement dire : &quot;Avez-vous un téléphone ? Scannez ce QR code pour découvrir mon travail et mes références&quot;, ou &quot;Visitez mon site web : www.votredomaine.com&quot;.<br/><br/>
                  Contrairement à un CV traditionnel qui ne peut détailler vos réalisations de manière exhaustive, un portfolio web offre une visibilité complète et concrète de votre savoir-faire.<br/><br/>
                  <span style={{display: 'block', margin: '32px 0 12px 0'}}>
                    <Heading as="h3" variant="display-strong-l" style={{marginBottom: 8, color: '#2563eb'}}>
                      Quels sont les avantages d&apos;un portfolio web ?
                    </Heading>
                  </span>
                  Les bénéfices de disposer d&apos;un portfolio web sont multiples et significatifs dans le paysage numérique actuel :<br/><br/>
                  <ul style={{marginLeft: 24}}>
                    <li><b>Visibilité Instantanée :</b> Présentez vos compétences et réalisations de manière immédiate.</li>
                    <li><b>Adaptation Numérique :</b> Intégrez pleinement le monde numérique en valorisant votre image professionnelle.</li>
                    <li><b>Mise en Valeur :</b> Démontrez votre valeur ajoutée de manière concrète et convaincante.</li>
                    <li><b>Impact Persuasif :</b> Captivez votre audience et mettez en avant la qualité de votre travail.</li>
                    <li><b>Gain de Temps et Économie :</b> Réduisez le temps et les coûts liés aux impressions de CV à chaque démarche.</li>
                    <li><b>Accessibilité Mondiale :</b> Soyez visible sur Internet (notamment Google), un atout majeur pour attirer des clients internationaux.</li>
                    <li><b>Optimisation de Profils :</b> Enrichissez vos profils professionnels (LinkedIn, etc.) et améliorez votre image de marque personnelle.</li>
                    <li><b>Renforcement Employeur :</b> Présentez votre portfolio aux employeurs pour appuyer votre candidature et justifier votre valeur.</li>
                  </ul>
                  <br/>
                  Chacun de nous possède un talent unique ; mon souhait est de vous aider à le révéler au monde 🌟 !<br/><br/>
                  <span style={{display: 'block', margin: '32px 0 12px 0'}}>
                    <Image 
                      src="https://surfshark.com/wp-content/uploads/2024/07/How-to-scan-a-QR-code-on-your-phone-safely-Hero-1024x501.png" 
                      alt="QR Code Création de site web ou portfolio web professionnel à l&apos;île Maurice" 
                      width={1024}
                      height={501}
                      style={{maxWidth: '100%', height: 'auto', borderRadius: 12, marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}
                      loading="lazy"
                      unoptimized
                    />
                  <Heading as="h3" variant="display-strong-m" style={{marginTop: 24, marginBottom: 24, whiteSpace: 'nowrap'}}>
                  Une solution moderne : Le QR Code
                </Heading>
                  </span>
                  Imaginez intégrer un QR Code sur votre carte de visite personnelle ou votre carte d&apos;identité. Un simple scan redirigera instantanément vos interlocuteurs vers votre portfolio web, offrant une présentation complète de votre profil et de vos réalisations. C&apos;est une manière innovante et très efficace de vous démarquer !
                </Text>
                <Button
                href="https://wa.me/23054593145"
                variant="primary"
                size="l"
                weight="strong"
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Me contacter
              </Button>
              </Column>
            </RevealFx>
          </Column>
        </Column>
        <RevealFx translateY="16" delay={0.6}>
          <Projects range={[1, 1]} />
        </RevealFx>
        
        {/* Section blog supprimée de l'accueil */}
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
                  <CuteQuote />
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
