import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, person, social, socialAbout } from "@/resources";
import { about as aboutContent } from "@/resources/content";
import TableOfContents from "@/components/about/TableOfContents";
import React from "react";
import Image from "next/image";
import Breadcrumbs from '@/components/Breadcrumbs';
import { routeImages } from "@/resources/routeImages";
import { InternalLinks } from '@/components/InternalLinks';
import { Metadata } from "next";
import JsonLdScripts from '@/components/JsonLdScripts';
import Head from "next/head";

export const generateMetadata = (): Metadata => {
  return {
    title: aboutContent.title,
    description: aboutContent.description,
    keywords: 'développeur web Maurice, création site internet, portfolio développeur, expert web Maurice, freelance développeur',
    authors: [{ name: person.name, url: `${baseURL}${aboutContent.path}` }],
    alternates: {
      canonical: `${baseURL}${aboutContent.path}`,
    },
    openGraph: {
      title: aboutContent.title,
      description: aboutContent.description,
      images: [
        {
          url: routeImages['/about'],
          width: 1200,
          height: 630,
          alt: aboutContent.title,
        }
      ],
      type: 'profile',
      locale: 'fr_FR',
      siteName: 'Création de Site Web & Portfolio Maurice',
      url: `${baseURL}${aboutContent.path}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: aboutContent.title,
      description: aboutContent.description,
      images: [routeImages['/about']],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

export default function About() {
  const about = aboutContent;
  
  // Breadcrumbs personnalisés pour JsonLdScripts
  const breadcrumbItems = [
    { name: 'Accueil', url: baseURL, position: 1 },
    { name: 'À propos', url: `${baseURL}${about.path}`, position: 2 }
  ];

  // Schémas additionnels spécifiques à la page About
  const additionalSchemas = [
    // Schéma Person enrichi
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${baseURL}${about.path}#person`,
      name: person.name,
      jobTitle: person.role,
      description: about.description,
      url: `${baseURL}${about.path}`,
      image: `${baseURL}${person.avatar}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: person.location,
        addressCountry: 'MU',
      },
      knowsAbout: about.technical.skills.map(skill => skill.title),
      alumniOf: about.studies.institutions.map(institution => ({
        '@type': 'EducationalOrganization',
        name: institution.name,
        description: institution.description,
      })),
      worksFor: about.work.experiences.map(exp => ({
        '@type': 'Organization',
        name: exp.company,
      })),
      knowsLanguage: person.languages,
      sameAs: social.filter(s => s.link).map(s => s.link),
    },
    // Schéma ProfilePage
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: about.title,
      description: about.description,
      url: `${baseURL}${about.path}`,
      mainEntity: {
        '@id': `${baseURL}${about.path}#person`
      },
      about: {
        '@type': 'Person',
        '@id': `${baseURL}${about.path}#person`
      }
    }
  ];

  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <>
      <Head>
        {/* Meta tags SEO additionnels */}
        <meta name="author" content={person.name} />
        <meta name="creator" content={person.name} />
        <meta name="publisher" content={person.name} />
        <meta name="language" content="fr" />
        <meta name="geo.region" content="MU" />
        <meta name="geo.placename" content={person.location} />
        
        {/* Schema.org Article pour le profil */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: about.title,
              description: about.description,
              author: {
                '@type': 'Person',
                name: person.name,
                url: `${baseURL}${about.path}`,
              },
              publisher: {
                '@type': 'Person',
                name: person.name,
                logo: {
                  '@type': 'ImageObject',
                  url: `${baseURL}${person.avatar}`,
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${baseURL}${about.path}`,
              },
              datePublished: '2024-01-01',
              dateModified: new Date().toISOString(),
              image: routeImages['/about'],
            })
          }}
        />
      </Head>

      <JsonLdScripts 
        page="about" 
        additionalSchemas={additionalSchemas}
        breadcrumbItems={breadcrumbItems}
      />

      <Column maxWidth="m">
        <Breadcrumbs
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'À propos' }
          ]}
        />

        <Schema
          as="webPage"
          baseURL={baseURL}
          title={about.title}
          description={about.description}
          path={about.path}
          image={routeImages['/about']}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />


        <Flex fillWidth mobileDirection="column" horizontal="center">
          {about.avatar.display && (
            <Column
              position="sticky"
              minWidth="160"
              paddingX="l"
              paddingBottom="xl"
              gap="m"
              flex={3}
              horizontal="center"
            >
              <Image
                src={person.avatar || ''}
                alt={`${person.name} - Développeur web à Maurice`}
                width={160}
                height={160}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginBottom: 16,
                  width: 160,
                  height: 160,
                  aspectRatio: '1 / 1',
                  display: 'block',
                  maxWidth: '100%',
                  minWidth: 0
                }}
                loading="eager" // Image principale, chargement prioritaire
                priority
                unoptimized
              />
              <Flex gap="8" vertical="center">
                <Icon onBackground="accent-weak" name="globe" />
                <Text variant="body-default-s">{person.locationLabel}</Text>
              </Flex>
              {person.languages.length > 0 && (
                <Flex wrap gap="8">
                  {person.languages.map((language, index) => (
                    <Tag key={language} size="l">
                      {language}
                    </Tag>
                  ))}
                </Flex>
              )}
            </Column>
          )}

          <Column flex={9} maxWidth={40}>
            <main>
              <Column
                id={about.intro.title}
                fillWidth
                minHeight="160"
                vertical="center"
                marginBottom="32"
              >
                {about.calendar.display && (
                  <Flex
                    fitWidth
                    border="brand-alpha-medium"
                    style={{
                      backdropFilter: "blur(var(--static-space-1))",
                    }}
                    background="brand-alpha-weak"
                    radius="full"
                    padding="4"
                    gap="8"
                    marginBottom="m"
                    vertical="center"
                  >
                    <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                    <Flex paddingX="8">Planifier un rendez-vous</Flex>
                    <IconButton
                      href={about.calendar.link}
                      data-border="rounded"
                      variant="secondary"
                      icon="chevronRight"
                      aria-label="Planifier un rendez-vous"
                    />
                  </Flex>
                )}

                <Heading as="h1" variant="display-strong-xl">
                  {person.name}
                </Heading>
                <Text
                  variant="display-default-xs"
                  onBackground="neutral-weak"
                >
                  {person.role}
                </Text>

                {social.length > 0 && (
                  <Flex paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                    {social.map(
                      (item) =>
                        item.link && (
                          <React.Fragment key={item.name}>
                            <Button
                              className="s-flex-hide"
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                              target={item.name === 'Resume' ? '_blank' : undefined}
                              rel={item.name === 'Resume' ? 'noopener noreferrer' : undefined}
                              aria-label={`Voir mon profil ${item.name}`}
                            />
                            <IconButton
                              className="s-flex-show"
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                              target={item.name === 'Resume' ? '_blank' : undefined}
                              rel={item.name === 'Resume' ? 'noopener noreferrer' : undefined}
                              aria-label={`Voir mon profil ${item.name}`}
                            />
                          </React.Fragment>
                        ),
                    )}
                    {socialAbout.map(
                      (item) =>
                        item.link && (
                          <React.Fragment key={item.name}>
                            <Button
                              className="s-flex-hide"
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Contacter via ${item.name}`}
                            />
                            <IconButton
                              className="s-flex-show"
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Contacter via ${item.name}`}
                            />
                          </React.Fragment>
                        ),
                    )}
                  </Flex>
                )}
              </Column>

              {about.intro.display && (
                <section>
                  <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                    {about.intro.description}
                  </Column>
                </section>
              )}

              {about.work.display && (
                <section>
                  <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                    {about.work.title}
                  </Heading>
                  <Column fillWidth gap="l" marginBottom="40">
                    {about.work.experiences.map((experience, index) => (
                      <article key={`${experience.company}-${experience.role}-${index}`}>
                        <Column fillWidth>
                          <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                            <Heading as="h3" id={experience.company} variant="heading-strong-l">
                              {experience.company}
                            </Heading>
                            <Text variant="heading-default-xs" onBackground="neutral-weak">
                              <time>{experience.timeframe}</time>
                            </Text>
                          </Flex>
                          <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                            {experience.role}
                          </Text>
                          <Column as="ul" gap="16">
                            {experience.achievements.map((achievement: JSX.Element, index: number) => (
                              <Text
                                as="li"
                                variant="body-default-m"
                                key={`${experience.company}-${index}`}
                              >
                                {achievement}
                              </Text>
                            ))}
                          </Column>
                          {experience.images.length > 0 && (
                            <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                              {experience.images.map((image, index) => (
                                <Flex
                                  key={index}
                                  border="neutral-medium"
                                  radius="m"
                                >
                                  <Image
                                    src={typeof image === 'string' ? image : (image?.src || '')}
                                    alt={typeof image === 'string' ? `Projet réalisé chez ${experience.company}` : (image?.alt || `Projet réalisé chez ${experience.company}`)}
                                    width={200}
                                    height={120}
                                    style={{
                                      borderRadius: '8px',
                                      objectFit: 'cover',
                                      width: '200px',
                                      height: '120px',
                                      aspectRatio: '16/9',
                                      display: 'block'
                                    }}
                                    loading="lazy"
                                    unoptimized
                                  />
                                </Flex>
                              ))}
                            </Flex>
                          )}
                        </Column>
                      </article>
                    ))}
                  </Column>
                </section>
              )}

              {about.studies.display && (
                <section>
                  <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                    {about.studies.title}
                  </Heading>
                  <Column fillWidth gap="l" marginBottom="40">
                    {about.studies.institutions.map((institution, index) => (
                      <article key={`${institution.name}-${index}`}>
                        <Column fillWidth gap="4">
                          <Heading as="h3" id={institution.name} variant="heading-strong-l">
                            {institution.name}
                          </Heading>
                          <Text variant="heading-default-xs" onBackground="neutral-weak">
                            {institution.description}
                          </Text>
                        </Column>
                      </article>
                    ))}
                  </Column>
                </section>
              )}

              {about.technical.display && (
                <section>
                  <Heading
                    as="h2"
                    id={about.technical.title}
                    variant="display-strong-s"
                    marginBottom="40"
                  >
                    {about.technical.title}
                  </Heading>
                  <Column fillWidth gap="l">
                    {about.technical.skills.map((skill, index) => (
                      <article key={`${skill.title}-${index}`}>
                        <Column fillWidth gap="4">
                          <Heading as="h3" id={skill.title} variant="heading-strong-l">
                            {skill.title}
                          </Heading>
                          <Text variant="body-default-m" onBackground="neutral-weak">
                            {skill.description}
                          </Text>
                          {skill.images && skill.images.length > 0 && (
                            <Flex fillWidth paddingTop="m" gap="12" wrap>
                              {skill.images.map((image, index) => (
                                <Flex
                                  key={index}
                                  border="neutral-medium"
                                  radius="m"
                                >
                                  <Image
                                    src={typeof image === 'string' ? image : (image?.src || '')}
                                    alt={typeof image === 'string' ? `Technologie ${skill.title}` : (image?.alt || `Technologie ${skill.title}`)}
                                    width={200}
                                    height={120}
                                    style={{
                                      borderRadius: '8px',
                                      objectFit: 'cover',
                                      width: '200px',
                                      height: '120px',
                                      aspectRatio: '16/9',
                                      display: 'block'
                                    }}
                                    loading="lazy"
                                    unoptimized
                                  />
                                </Flex>
                              ))}
                            </Flex>
                          )}
                        </Column>
                      </article>
                    ))}
                  </Column>
                </section>
              )}
            </main>
            
            {/* Liens internes pour réduire les pages orphelines */}
            <div style={{ marginTop: '48px' }}>
              <InternalLinks currentPage="/about" />
            </div>
          </Column>
        </Flex>
      </Column>
    </>
  );
}