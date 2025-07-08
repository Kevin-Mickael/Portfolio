"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Button,
} from "@once-ui-system/core";
import Image from "next/image";
import ImageSlider from "./ImageSlider";
import { projects } from "@/resources/projects-data";
import { useState } from "react";

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

// Composant pour le slider horizontal illimité avec hover
const InfiniteSlider: React.FC<{ images: string[]; projects: any[] }> = ({ images, projects }) => {
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  // Trouver le projet correspondant à l'image par son chemin
  const findProjectByImage = (imagePath: string) => {
    return projects.find(project => project.image === imagePath);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '200px',
      overflow: 'hidden',
      borderRadius: '12px',
      position: 'relative'
    }}
    >
      <div style={{
        display: 'flex',
        animation: hoveredImageIndex !== null ? 'none' : 'scroll 40s linear infinite',
        width: 'fit-content'
      }}>
        {/* Dupliquer les images pour un défilement illimité */}
        {[...images, ...images, ...images].map((image, globalIndex) => {
          const originalIndex = globalIndex % images.length;
          const project = findProjectByImage(image);
          // Utiliser l'index original de l'image plutôt que l'index global
          const isThisImageHovered = hoveredImageIndex === originalIndex;
          
          return (
            <div
              key={`${originalIndex}-${Math.floor(globalIndex / images.length)}`}
              style={{
                position: 'relative',
                marginRight: '16px'
              }}
              onMouseEnter={() => {
                setHoveredImageIndex(originalIndex); // Utiliser l'index original
              }}
              onMouseLeave={() => {
                setHoveredImageIndex(null);
              }}
            >
              <img
                src={image}
                alt={`Slide ${originalIndex + 1}`}
                width={300}
                height={200}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'filter 0.3s ease'
                }}
                sizes="300px"
              />
              
              {/* Overlay avec bouton "Visiter" - seulement pour l'image survolée */}
              {isThisImageHovered && project && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  padding: '16px',
                  opacity: 0,
                  animation: 'fadeIn 0.3s ease-out forwards'
                }}>
                  <div style={{ 
                    textAlign: 'right', 
                    color: 'white',
                    transform: 'translateY(20px)',
                    animation: 'slideUp 0.4s ease-out 0.1s forwards'
                  }}>
                    <Text variant="heading-strong-s" style={{ 
                      color: 'white', 
                      marginBottom: '4px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                      {project.name}
                    </Text>
                    <Text variant="body-default-s" style={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      marginBottom: '12px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {project.category}
                    </Text>
                    <SmartLink
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        fontWeight: '600',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        transform: 'scale(0.9)',
                        animation: 'buttonPop 0.4s ease-out 0.2s forwards'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                      }}
                    >
                      Visiter
                    </SmartLink>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes buttonPop {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1);
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
  const isSliderProject = href && href.includes('image-slider-showcase');
  
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
            sandbox="allow-scripts allow-same-origin"
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
            <InfiniteSlider images={images} projects={projects} />
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
                    <Text variant="body-default-s">Voir </Text>
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