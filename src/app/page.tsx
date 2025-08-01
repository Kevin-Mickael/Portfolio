import React from "react";
import Image from "next/image";
import { Metadata } from "next";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes } from "@/resources";
import { Mailchimp, InternalLinks } from "@/components";
import { Projects } from "@/components/work/Projects";
import { getPosts } from '@/utils/utils';
import FAQ from "@/components/FAQ";
import AppIntegrationClient from '@/components/AppIntegrationClient';
import CuteQuote from '@/components/CuteQuote';
import JsonLdScripts from '@/components/JsonLdScripts';
import styles from './home.module.css';
import { routeImages } from "@/resources/routeImages";

export const generateMetadata = (): Metadata => {
  return {
    title: home.title,
    description: home.description,
    keywords: [
      'création site web Maurice',
      'portfolio Maurice',
      'mini-apps Maurice',
      'Site web',
      'développeur web Maurice',
      'site internet professionnel Maurice'
    ],
    openGraph: {
      title: home.title,
      description: home.description,
      images: [routeImages['/']],
      type: 'website',
    },
    twitter: {
      title: home.title,
      description: home.description,
      images: [routeImages['/']],
    },
    alternates: {
      canonical: baseURL,
    },
  };
};

export default function Home() {
  // Récupérer l'article épinglé
  const pinnedPost = getPosts(['src', 'app', 'blog', 'posts']).find(
    (post) => post.metadata.tag === 'epingle'
  );
  const canonicalUrl = `${baseURL}/`;
  return (
    <>
      <JsonLdScripts page="home" />
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
                href={home.featured.href}>
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
            )}
            <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
              <Heading as="h1" wrap="balance" variant="display-strong-l">
                {home.headline}
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
                  {/* Vidéo de présentation */}
                <RevealFx translateY="8" delay={0.5} fillWidth horizontal="center" paddingTop="24" paddingBottom="24">
                  <div style={{ width: '100%', maxWidth: '3840px', margin: '32px auto 0 auto', borderRadius: 0, overflow: 'hidden' }}>
                    <video
                      src="/video/presentation.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        border: 'none',
                        borderRadius: 30,
                        background: '#000',
                        maxWidth: '3840px',
                        boxShadow: 'none',
                      }}
                      poster="/images/avatar.jpeg"
                    />
                  </div>
                </RevealFx>

            <RevealFx translateY="8" delay={0.5} fillWidth horizontal="center" paddingTop="40" paddingBottom="32">
              <Column fillWidth horizontal="start" gap="12" style={{alignItems: 'flex-start'}}>
                {/* Nouveau bloc ajouté */}
                <Heading
                  as="h2"
                  variant="display-strong-l"
                  style={{
                    textAlign: 'left',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    marginBottom: '16px'
                  }}
                >
                  🌍 <strong>Faites-vous une place sur le web et ouvrez-vous au monde</strong>
                </Heading>
                <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left', marginBottom: '32px'}}>
                  Aujourd&apos;hui, la première impression se joue en ligne. Vos clients, vos partenaires, vos futurs employeurs… tous vont instinctivement chercher votre nom ou votre activité sur Internet. Alors pourquoi ne pas leur offrir une image professionnelle et engageante ?<br/><br/>
                  Je vous accompagne pour créer un <strong>site web qui vous ressemble</strong>, pensé pour mettre en valeur ce que vous faites et donner envie de vous contacter. C&apos;est bien plus qu&apos;une simple page : c&apos;est votre vitrine, accessible partout, tout le temps, et facile à partager grâce à un <strong>QR code</strong>.<br/><br/>
                  Dans cette ère numérique, avoir un site, c&apos;est :<br/>
                  <ul style={{marginLeft: 24, marginTop: 16}}>
                    <li>montrer que vous prenez votre activité au sérieux,</li>
                    <li>inspirer confiance dès le premier regard,</li>
                    <li>toucher de nouveaux clients, même à l&apos;international.</li>
                  </ul>
                </Text>
                
                {/* Titre existant */}
                <Heading
                  as="h2"
                  variant="display-strong-l"
                  style={{
                    textAlign: 'left',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                  }}
                >
                  ✨ Créons ensemble votre portfolio web et montrez au monde qui vous êtes
                </Heading>
                <Text variant="body-default-l" style={{maxWidth: 900, textAlign: 'left'}}>
                  
                  Je vous aide à transformer votre parcours et vos talents en une vitrine numérique vivante, accessible partout et tout le temps, même grâce à un simple QR code à scanner.<br/><br/>
                  Plus qu&apos;un CV, votre portfolio web raconte votre histoire, montre vos réalisations et capte l&apos;attention des employeurs, clients ou partenaires.<br/><br/>
                  Ces portfolios sont pensés pour mettre en avant vos compétences, avec style, simplicité et impact.<br/><br/>
                  <span style={{display: 'block', margin: '32px 0 12px 0'}}>
                    <div className="heading-responsive">
                      <Heading as="h3" variant="display-strong-m">
                        Ce que votre portfolio web vous apporte :
                      </Heading>
                    </div>
                  </span>
                  <ul style={{marginLeft: 24}}>
                    <li><b>Votre histoire en images et vidéos</b><br/>Montrez vos projets, vos créations, vos témoignages clients pour convaincre d&apos;un coup d&apos;œil.</li>
                    <li><b>Partage facile grâce à un QR code</b><br/>Offrez une expérience moderne et pratique à ceux qui découvrent votre travail.</li>
                    <li><b>Visible partout, tout le temps</b><br/>Votre vitrine en ligne, même à l&apos;autre bout du monde.</li>
                    <li><b>Gain de temps et économies</b><br/>Plus besoin d&apos;imprimer et d&apos;envoyer votre CV à chaque occasion.</li>
                    <li><b>Une image professionnelle forte</b><br/>Mettez en valeur votre profil LinkedIn, votre candidature et votre personal branding.</li>
                    <li><b>Faites la différence</b><br/>Démarquez-vous avec une présentation concrète, originale et percutante de vos compétences.</li>
                  </ul>
                  <br/>
                  📌 <strong>Votre talent mérite d&apos;être vu et reconnu. Ensemble, donnons-lui la vitrine numérique qu&apos;il mérite, et ouvrez-vous de nouvelles opportunités.</strong><br/><br/>
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
                href="https://wa.me/23054593145?text=Bonjour Kevin, je vous contacte depuis votre site web. J'aimerais discuter d'un projet de création de site web ou portfolio."
                variant="primary"
                size="l"
                weight="strong"
                target="_blank"
                rel="noopener noreferrer"
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
        
        {/* Nouvelle section Mini-Apps */}
        <RevealFx translateY="16" delay={0.7}>
          <Column fillWidth paddingY="48" gap="l" style={{ 
            background: 'linear-gradient(135deg, var(--surface-weak) 0%, var(--surface) 100%)', 
            borderRadius: 'var(--radius-xl)', 
            padding: '48px 32px',
            border: '1px solid var(--border-weak)'
          }}>
            <Column fillWidth horizontal="start" gap="m">
              <Heading
                as="h2"
                variant="display-strong-l"
                style={{
                  textAlign: 'left',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  marginBottom: '16px'
                }}
              >
                🌱 <strong>Création de mini-applications pour simplifier votre quotidien à Maurice</strong>
              </Heading>
              <Text variant="body-default-l" style={{maxWidth: 800, textAlign: 'left', marginBottom: '32px'}}>
                Je conçois également des <strong>mini-applications légères, simples à utiliser, et utiles dans la vie de tous les jours</strong>, directement accessibles depuis votre téléphone, tablette ou ordinateur.
              </Text>
              <Text variant="body-default-l" style={{maxWidth: 800, textAlign: 'left', marginBottom: '32px'}}>
                Ces <strong>applications web personnalisées à Maurice</strong> sont pensées pour répondre à de petits besoins précis, pour les familles, les parents, les étudiants ou les professionnels mauriciens. Pas besoin d&apos;installer quoi que ce soit : elles fonctionnent directement en ligne, en quelques clics.
              </Text>
              
              <Column fillWidth gap="m" style={{maxWidth: 800}}>
                <Heading as="h3" variant="display-strong-m" style={{textAlign: 'left', marginBottom: '24px'}}>
                  📱 Exemples de mini-apps que je développe :
                </Heading>
                
                <Column gap="l" style={{textAlign: 'left'}}>
                  <Row gap="m" style={{alignItems: 'flex-start', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-l)', border: '1px solid var(--border-weak)'}}>
                    <Text style={{fontSize: '24px', minWidth: '32px'}}>🍼</Text>
                    <Column gap="s">
                      <Text variant="body-strong-m">Application suivi bébé </Text>
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        Une petite app pour noter les heures des biberons ou tétées, le poids et la taille, et avoir des rappels pour la prochaine prise. Idéale pour les nouveaux parents mauriciens.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m" style={{alignItems: 'flex-start', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-l)', border: '1px solid var(--border-weak)'}}>
                    <Text style={{fontSize: '24px', minWidth: '32px'}}>🍎</Text>
                    <Column gap="s">
                      <Text variant="body-strong-m">App cuisine mauricienne - Idées repas</Text>
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        Une app qui suggère des recettes rapides, y compris des plats mauriciens, en fonction des ingrédients que vous avez sous la main.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m" style={{alignItems: 'flex-start', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-l)', border: '1px solid var(--border-weak)'}}>
                    <Text style={{fontSize: '24px', minWidth: '32px'}}>🧒🏾</Text>
                    <Column gap="s">
                      <Text variant="body-strong-m">Application éducative enfants </Text>
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        Une interface colorée et sécurisée pour occuper les enfants mauriciens avec des jeux éducatifs simples et un minuteur pour contrôler le temps d&apos;écran.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m" style={{alignItems: 'flex-start', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-l)', border: '1px solid var(--border-weak)'}}>
                    <Text style={{fontSize: '24px', minWidth: '32px'}}>🧘🏽</Text>
                    <Column gap="s">
                      <Text variant="body-strong-m">App bien-être et méditation </Text>
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        Une mini app qui vous guide à travers 5 minutes de respiration ou d&apos;étirement quand vous en avez besoin. Parfaite pour décompresser dans le rythme de vie mauricien.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m" style={{alignItems: 'flex-start', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-l)', border: '1px solid var(--border-weak)'}}>
                    <Text style={{fontSize: '24px', minWidth: '32px'}}>📝</Text>
                    <Column gap="s">
                      <Text variant="body-strong-m">Application de listes partagées</Text>
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        Une app pour créer des listes (courses, tâches, idées) et les garder accessibles et partagées avec votre famille ou équipe à Maurice.
                      </Text>
                    </Column>
                  </Row>
                </Column>
                
                <Column gap="m" style={{marginTop: '32px', textAlign: 'left'}}>
                  <Heading as="h3" variant="display-strong-m" style={{marginBottom: '16px'}}>
                  ❓ Demandez votre mini‑app personnalisée
                  </Heading>
                  <Text variant="body-default-l" style={{maxWidth: 700}}>
                  Dites‑moi ce dont vous avez besoin et je crée pour vous une mini‑application simple, utile et adaptée à votre quotidien à Maurice.
                  </Text>
                  
                  <Button
                    href="/contact"
                    variant="tertiary"
                    size="l"
                    weight="strong"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-neutral-strong)',
                      border: '2px solid white',
                      marginTop: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Demander une application spécifique
                  </Button>
                </Column>
              </Column>
            </Column>
          </Column>
        </RevealFx>
        
        {/* Debut mini apps iframe */}
        <RevealFx translateY="16" delay={0.6}>
          <Projects range={[1, 1]} />
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
        
        {/* Liens internes pour réduire les pages orphelines */}
        <RevealFx translateY="8" delay={0.8}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <InternalLinks currentPage="/" />
          </div>
        </RevealFx>
      </Column>
    </>
  );
}