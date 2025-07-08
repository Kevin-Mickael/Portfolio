"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Flex, Button, Text } from '@once-ui-system/core';
import { Icon } from '@once-ui-system/core';

interface ImageSliderProps {
  images: (string | { src: string; alt?: string; width?: number; height?: number })[];
  title?: string;
  autoPlay?: boolean;
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  title,
  autoPlay = true,
  interval = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour normaliser les images
  const normalizeImages = useCallback(() => {
    return images.map(img => {
      if (typeof img === 'string') {
        return { src: img, alt: 'Image' };
      }
      return { src: img.src, alt: img.alt || 'Image' };
    });
  }, [images]);

  const normalizedImages = normalizeImages();

  // Fonction pour aller à l'image suivante
  const goToNext = useCallback(() => {
    if (images.length <= 1 || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex >= images.length - 1 ? 0 : prevIndex + 1;
      console.log('➡️ Next:', prevIndex, '->', newIndex);
      return newIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  // Fonction pour aller à l'image précédente
  const goToPrevious = useCallback(() => {
    if (images.length <= 1 || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex <= 0 ? images.length - 1 : prevIndex - 1;
      console.log('⬅️ Previous:', prevIndex, '->', newIndex);
      return newIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  // Fonction pour aller à une image spécifique
  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= images.length || index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    console.log('🎯 Go to slide:', index);
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, currentIndex, isTransitioning]);

  // Gestion de l'autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, isPaused, images.length, interval, goToNext]);

  // Reset quand les images changent
  useEffect(() => {
    setCurrentIndex(0);
    setIsTransitioning(false);
    setImageError({});
  }, [images]);

  // Fonction pour empêcher le scroll horizontal
  const preventHorizontalScroll = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = normalizedImages[currentIndex];

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '100%', 
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Flex 
        direction="column" 
        gap="16" 
        style={{ 
          width: '100%', 
          maxWidth: '100%', 
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
        onWheel={preventHorizontalScroll}
      >
        {title && (
          <Flex horizontal="center">
            <Text variant="heading-strong-m">
              {title}
            </Text>
          </Flex>
        )}
        
        <Flex 
          position="relative" 
          style={{ 
            width: '100%',
            maxWidth: '100%',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            backgroundColor: '#f0f0f0'
          } as React.CSSProperties}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={preventHorizontalScroll}
        >
          {/* Main Image */}
          {imageError[currentIndex] ? (
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              color: '#666'
            }}>
              <Text variant="body-default-m">Image non disponible</Text>
            </div>
          ) : (
            <Image
              key={`image-${currentIndex}`}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
                transition: isTransitioning ? 'opacity 0.5s ease-in-out' : 'none',
                opacity: isTransitioning ? 0.7 : 1
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => handleImageError(currentIndex)}
              priority={currentIndex === 0}
              unoptimized={true}
            />
          )}

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                onClick={goToPrevious}
                variant="tertiary"
                size="s"
                disabled={isTransitioning}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: isTransitioning ? 'not-allowed' : 'pointer',
                  opacity: isTransitioning ? 0.5 : 1
                }}
              >
                <Icon name="chevronLeft" size="m" />
              </Button>

              <Button
                onClick={goToNext}
                variant="tertiary"
                size="s"
                disabled={isTransitioning}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: isTransitioning ? 'not-allowed' : 'pointer',
                  opacity: isTransitioning ? 0.5 : 1
                }}
              >
                <Icon name="chevronRight" size="m" />
              </Button>
            </>
          )}

          {/* Slide Counter */}
          {images.length > 1 && (
            <Flex
              position="absolute"
              bottom="l"
              right="l"
              background="neutral-strong"
              padding="s"
              radius="m"
              style={{ 
                zIndex: 5,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white'
              }}
            >
              <Text variant="body-default-s" style={{ color: 'white' }}>
                {currentIndex + 1} / {images.length}
              </Text>
            </Flex>
          )}
        </Flex>

        {/* Dots Navigation */}
        {images.length > 1 && (
          <Flex 
            gap="8" 
            horizontal="center" 
            style={{ 
              width: '100%', 
              maxWidth: '100%',
              overflowX: 'hidden',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  padding: 0,
                  background: index === currentIndex ? 'var(--color-brand-strong, #007bff)' : 'var(--color-neutral-alpha-medium, #ccc)',
                  border: 'none',
                  cursor: isTransitioning ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease',
                  opacity: isTransitioning ? 0.5 : 1,
                  margin: '0 2px'
                }}
                title={`Image ${index + 1}`}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default ImageSlider;