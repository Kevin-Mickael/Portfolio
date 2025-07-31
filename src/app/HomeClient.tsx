"use client";
import React from "react";
import Image from "next/image";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL } from "@/resources";
import { routeImages } from "@/resources/routeImages";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from '@/utils/utils';
import FAQ, { faqJsonLd } from "@/components/FAQ";
import AppIntegrationClientDynamic from '@/components/AppIntegrationClientDynamic';
import CuteQuote from '@/components/CuteQuote';
import styles from './home.module.css';
import LazySection from "@/components/LazySection";

export default function Home({ posts, projects }: { posts: any[], projects: any[] }) {
  const [whiteSpaceStyle, setWhiteSpaceStyle] = React.useState<React.CSSProperties>({});
  
  React.useEffect(() => {
    const handleResize = () => {
      setWhiteSpaceStyle({
        whiteSpace: window.innerWidth > 768 ? 'nowrap' : 'normal',
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial style

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Récupérer l'article épinglé
  const pinnedPost = posts.find(
    (post) => post.metadata.tag === 'epingle'
  );
  const canonicalUrl = `${baseURL}/`;
  return (
    <>
      <Column maxWidth="m" gap="xl" horizontal="center" className={styles.responsiveHome}>
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={routeImages['/']}
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
                href={home.featured.href} aria-label="Création de mini-apps, site web et portfolio web à Maurice">
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
            )}
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
                  Créons ensemble votre portfolio web et montrez au monde qui vous êtes 🌍
                </Heading>
                <br/>
                <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left'}}>
                  Je vous aide à transformer votre parcours et vos talents en une vitrine numérique vivante, accessible partout et tout le temps, même grâce à un simple QR code à scanner.<br/><br/>
                  Plus qu’un CV, votre portfolio web raconte votre histoire, montre vos réalisations et capte l’attention des employeurs, clients ou partenaires.<br/><br/>
                  Ces portfolios sont pensés pour mettre en avant vos compétences, avec style, simplicité et impact.<br/><br/>
                  <Button href="/work" variant="tertiary" size="l" weight="strong" arrowIcon style={{ border: '1.5px solid #d1d5db' }}>
                    Découvrez mes réalisations
                  </Button>
                  <br/>
                  <span style={{display: 'block', margin: '32px 0 12px 0'}}>
                    <div className="heading-responsive">
                    <Heading 
                      as="h2" 
                      variant="display-strong-m" 
                      style={whiteSpaceStyle}
                    >
                      Ce que votre portfolio web vous apporte :
                    </Heading>
                    </div>
                  </span>
                  <ul style={{marginLeft: 24}}>
                    <li><b>Votre histoire en images et vidéos</b><br/>Montrez vos projets, vos créations, vos témoignages clients pour convaincre d’un coup d’œil.</li>
                    <li><b>Partage facile grâce à un QR code</b><br/>Offrez une expérience moderne et pratique à ceux qui découvrent votre travail.</li>
                    <li><b>Visible partout, tout le temps</b><br/>Votre vitrine en ligne, même à l’autre bout du monde.</li>
                    <li><b>Gain de temps et économies</b><br/>Plus besoin d’imprimer et d’envoyer votre CV à chaque occasion.</li>
                    <li><b>Une image professionnelle forte</b><br/>Mettez en valeur votre profil LinkedIn, votre candidature et votre personal branding.</li>
                    <li><b>Faites la différence</b><br/>Démarquez-vous avec une présentation concrète, originale et percutante de vos compétences.</li>
                  </ul>
                  <br/>
                  <span style={{display: 'block', margin: '32px 0 12px 0'}}>
                    <Image 
                      src="/images/qr-code-scan.png" 
                      alt="QR Code Création de site web ou portfolio web professionnel à l'île Maurice" 
                      width={1024}
                      height={501}
                      style={{maxWidth: '100%', height: 'auto', borderRadius: 12, marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}
                      loading="lazy"
                      unoptimized
                    />
                  <Heading 
                    as="h2" 
                    variant="display-strong-m" 
                    style={{
                      ...whiteSpaceStyle,
                      marginTop: 24, 
                      marginBottom: 24, 
                    }}
                  >
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
                aria-label="Me contacter via WhatsApp au +230 54593145"
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
        
        
        {/* Section blog supprimée de l'accueil */}
        <Projects range={[2]} />
        {/* Bloc mini-apps avant technologies */}
        <RevealFx translateY="8" delay={0.3} fillWidth horizontal="center" paddingTop="40" paddingBottom="32">
            <Column fillWidth horizontal="start" gap="12" style={{alignItems: 'flex-start'}}>
                <Heading
                  as="h2"
                  variant="display-strong-l"
                  style={{
                    textAlign: 'left',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    marginBottom: '16px',
                  }}
                >
                  🌱 Création de mini-apps pour simplifier votre quotidien à l&apos;île Maurice
                </Heading>
                
                <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left'}}>
                  Je conçois également des mini-applications web légères, simples à utiliser, et utiles dans la vie de tous les jours, directement accessibles depuis votre téléphone, tablette ou ordinateur.<br/><br/>
                  Ces applications sont pensées pour répondre à de petits besoins précis, pour les familles, les parents, les étudiants ou les professionnels.
                </Text>
                
                <Text 
                  variant="heading-default-m" 
                  style={{ 
                    marginTop: '32px', 
                    marginBottom: '24px',
                    display: 'block'
                  }}
                >
                  📱 Quelques exemples de mini-apps que je peux créer :
                </Text>
                
                <Column as="ul" gap="m" fillWidth style={{ listStyle: 'none', padding: 0, marginTop: '24px' }}>
                  <Row as="li" gap="m" vertical="center" style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: '1.5rem' }}>🍼</Text>
                    <Column>
                      <Text weight="strong">Suivi bébé</Text>
                      <Text onBackground="neutral-weak">Une petite app pour noter les heures des biberons ou tétées, le poids et la taille, et avoir des rappels pour la prochaine prise.</Text>
                    </Column>
                  </Row>
                  <Row as="li" gap="m" vertical="center" style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: '1.5rem' }}>🍎</Text>
                    <Column>
                      <Text weight="strong">Idées repas faciles</Text>
                      <Text onBackground="neutral-weak">Une app qui suggère des recettes rapides en fonction des ingrédients que vous avez sous la main.</Text>
                    </Column>
                  </Row>
                  <Row as="li" gap="m" vertical="center" style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: '1.5rem' }}>🧒🏾</Text>
                    <Column>
                      <Text weight="strong">Tablette enfants</Text>
                      <Text onBackground="neutral-weak">Une interface colorée et sécurisée pour occuper les enfants avec des jeux éducatifs simples et un minuteur pour contrôler le temps d’écran.</Text>
                    </Column>
                  </Row>
                  <Row as="li" gap="m" vertical="center" style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: '1.5rem' }}>🧘🏽</Text>
                    <Column>
                      <Text weight="strong">Pause bien-être</Text>
                      <Text onBackground="neutral-weak">Une mini app qui vous guide à travers 5 minutes de respiration ou d’étirement quand vous en avez besoin.</Text>
                    </Column>
                  </Row>
                  <Row as="li" gap="m" vertical="center" style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: '1.5rem' }}>📝</Text>
                    <Column>
                      <Text weight="strong">Liste rapide</Text>
                      <Text onBackground="neutral-weak">Une app pour créer des listes (courses, tâches, idées) et les garder accessibles et partagées.</Text>
                    </Column>
                  </Row>
                </Column>
                
                <Button
                  href="/contact"
                  variant="secondary"
                  size="l"
                  weight="strong"
                  style={{ marginTop: '24px', border: '1.5px solid #d1d5db' }}
                  arrowIcon
                >
                  Demande spécifique
                </Button>
              </Column>
        </RevealFx>
        
       <RevealFx translateY="16" delay={0.6}>
          <Projects range={[1, 1]} />
        </RevealFx>

        {/* Section Nos technologies */}
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingTop="40" paddingBottom="32">
          <Column fillWidth horizontal="center" gap="xl">
            <AppIntegrationClientDynamic />
          </Column>
        </RevealFx>

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
