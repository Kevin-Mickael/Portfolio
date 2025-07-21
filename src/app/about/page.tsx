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
 import { Metadata } from "next";
 
 export async function generateMetadata(): Promise<Metadata> {
  const about = aboutContent;
  const canonicalUrl = `${baseURL}${about.path}`;
  return {
    title: about.title.replace('About', 'À propos'),
    description: about.description.replace('Meet', 'Rencontrez'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: about.title.replace('About', 'À propos'),
      description: about.description.replace('Meet', 'Rencontrez'),
      url: canonicalUrl,
      images: [
        {
          url: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
          width: 1200,
          height: 630,
          alt: about.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: about.title.replace('About', 'À propos'),
      description: about.description.replace('Meet', 'Rencontrez'),
      images: [`/api/og/generate?title=${encodeURIComponent(about.title)}`],
    },
  };
 }
 
 export default function About() {
  const about = aboutContent;
  const canonicalUrl = `${baseURL}${about.path}`;
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
      <Column maxWidth="m">
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={about.title}
          description={about.description}
          path={about.path}
          image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
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
                alt={person.name}
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
                loading="lazy"
                unoptimized
              />
              <Flex gap="8" vertical="center">
                <Icon onBackground="accent-weak" name="globe" />
                {person.locationLabel}
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
                  <Flex paddingX="8">Schedule a call</Flex>
                  <IconButton
                    href={about.calendar.link}
                    data-border="rounded"
                    variant="secondary"
                    icon="chevronRight"
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
                                  key={item.name}
                                  href={item.link}
                                  prefixIcon={item.icon}
                                  label={item.name}
                                  size="s"
                                  weight="default"
                                  variant="secondary"
                                  target={item.name === 'Resume' ? '_blank' : undefined}
                                  rel={item.name === 'Resume' ? 'noopener noreferrer' : undefined}
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
                                  key={item.name}
                                  href={item.link}
                                  prefixIcon={item.icon}
                                  label={item.name}
                                  size="s"
                                  weight="default"
                                  variant="secondary"
                                  target="_blank"
                                  rel="noopener noreferrer"
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
                              />
                          </React.Fragment>
                      ),
                  )}
                </Flex>
              )}
            </Column>
 
            {about.intro.display && (
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
              </Column>
            )}
 
            {about.work.display && (
              <>
                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                  {about.work.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                  {about.work.experiences.map((experience, index) => (
                    <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                      <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
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
                                alt={typeof image === 'string' ? (experience.company + ' logo') : (image?.alt || (experience.company + ' logo'))}
                                width={160}
                                height={90}
                                style={{
                                  borderRadius: '8px',
                                  objectFit: 'cover',
                                  width: '200%',
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
                  ))}
                </Column>
              </>
            )}
 
            {about.studies.display && (
              <>
                <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                  {about.studies.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                  {about.studies.institutions.map((institution, index) => (
                    <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {institution.description}
                      </Text>
                    </Column>
                  ))}
                </Column>
              </>
            )}
 
            {about.technical.display && (
              <>
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
                    <Column key={`${skill}-${index}`} fillWidth gap="4">
                      <Text id={skill.title} variant="heading-strong-l">{skill.title}</Text>
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
                            alt={typeof image === 'string' ? (skill.title + ' logo') : (image?.alt || (skill.title + ' logo'))}
                            width={160}
                            height={90}
                            style={{
                              borderRadius: '8px',
                              objectFit: 'cover',
                              width: '200%',
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
                  ))}
                </Column>
              </>
            )}
          </Column>
        </Flex>
      </Column>
    </>
  );
 }