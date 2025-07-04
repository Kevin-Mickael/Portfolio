"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import ImageSlider from "./ImageSlider";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string | { label?: string; url: string; icon?: string };
}

// Composant pour le slider horizontal illimité
const InfiniteSlider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '200px',
      overflow: 'hidden',
      borderRadius: '12px',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        animation: 'scroll 40s linear infinite',
        width: 'fit-content',
        transform: 'translateX(0)'
      }}>
        {/* Dupliquer les images pour un défilement illimité */}
        {[...images, ...images, ...images].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              width: '300px',
              height: '200px',
              objectFit: 'cover',
              marginRight: '16px',
              borderRadius: '8px'
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${images.length * 316}px);
          }
        }
      `}</style>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const isIframe = images.length === 1 && images[0].startsWith('iframe:');
  const isSliderProject = title.includes("🎨 Galerie d'inspiration créative");
  
  return (
    <Column fillWidth gap="m">
      {isIframe && (
        <div
          style={{
            width: '110%',
            height: '600px',
            background: '#eee',
            borderRadius: 'var(--radius-l)',
            overflow: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none', // Firefox
          }}
          className="hide-scrollbar"
        >
          <iframe
            src={images[0].replace('iframe:', '')}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allowFullScreen
            loading="lazy"
            title={title}
          />
        </div>
      )}
      
      <Flex
        mobileDirection="column"
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        <Column flex={7} gap="16">
          {!isSliderProject && avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
          
          {isSliderProject && images.length > 1 ? (
            <InfiniteSlider images={images} />
          ) : (
            <>
              {description?.trim() && (
                <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                  {description}
                </Text>
              )}
              <Flex gap="24" wrap>
                {content?.trim() && (
                  <SmartLink
                    suffixIcon="arrowRight"
                    style={{ margin: "0", width: "fit-content" }}
                    href={href}
                  >
                    <Text variant="body-default-s">Read case study</Text>
                  </SmartLink>
                )}
                {link && (typeof link === 'object' ? (
                  <SmartLink
                    suffixIcon={link.icon || undefined}
                    style={{ margin: "0", width: "fit-content" }}
                    href={link.url}
                  >
                    <Text variant="body-default-s">{link.label || 'Visiter'}</Text>
                  </SmartLink>
                ) : (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ margin: "0", width: "fit-content" }}
                    href={link}
                  >
                    <Text variant="body-default-s">View project</Text>
                  </SmartLink>
                ))}
              </Flex>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
};
