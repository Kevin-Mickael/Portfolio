"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Flex, Button, Text } from '@once-ui-system/core';
import { Icon } from '@once-ui-system/core';

interface ImageSliderProps {
  images: string[];
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
  const currentIndexRef = useRef(0);
  const imagesRef = useRef(images);

  // Debug logs
  useEffect(() => {
    console.log('🔍 ImageSlider Debug:');
    console.log('  - Images reçues:', images);
    console.log('  - Nombre d\'images:', images.length);
    console.log('  - Current index:', currentIndex);
  }, [images, currentIndex]);

  // Mettre à jour la ref des images
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Reset currentIndex seulement si les images changent complètement
  useEffect(() => {
    const prevImages = imagesRef.current;
    const imagesChanged = prevImages.length !== images.length || 
                         !prevImages.every((img, index) => img === images[index]);
    
    if (imagesChanged) {
      console.log('🔄 Images changées, reset de l\'index');
      setCurrentIndex(0);
      currentIndexRef.current = 0;
    }
  }, [images]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        currentIndexRef.current = newIndex;
        return newIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length, isPaused]);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      currentIndexRef.current = newIndex;
      console.log('➡️ goToNext - currentIndex:', prevIndex, '->', newIndex);
      return newIndex;
    });
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      currentIndexRef.current = newIndex;
      console.log('⬅️ goToPrevious - currentIndex:', prevIndex, '->', newIndex);
      return newIndex;
    });
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    console.log('🎯 goToSlide - index demandé:', index);
    if (index >= 0 && index < images.length) {
      console.log('✅ Changement vers index:', index);
      setCurrentIndex(index);
      currentIndexRef.current = index;
    } else {
      console.log('❌ Index invalide:', index);
    }
  }, [images.length]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  // Test: Afficher les informations de débogage
  console.log('🔄 Rendu ImageSlider:');
  console.log('  - currentIndex:', currentIndex);
  console.log('  - images.length:', images.length);
  console.log('  - image actuelle:', images[currentIndex]);

  return (
    <Flex direction="column" gap="16" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
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
          overflow: 'hidden'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          style={{
            objectFit: 'cover',
            transition: 'opacity 0.5s ease-in-out'
          }}
          priority={currentIndex === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />

        {/* Navigation Buttons - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <Button
              onClick={goToPrevious}
              variant="tertiary"
              size="s"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none'
              }}
            >
              <Icon name="chevronLeft" size="m" />
            </Button>

            <Button
              onClick={goToNext}
              variant="tertiary"
              size="s"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none'
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
          >
            <Text variant="body-default-s" onBackground="neutral-strong">
              {currentIndex + 1} / {images.length}
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Dots Navigation - Only show if more than 1 image */}
      {images.length > 1 && (
        <Flex gap="8" horizontal="center" style={{ width: '100%', maxWidth: '100%' }}>
          {images.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              variant="tertiary"
              size="s"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                padding: 0,
                background: index === currentIndex ? 'var(--color-brand-strong)' : 'var(--color-neutral-alpha-medium)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.background = 'var(--color-brand-alpha-medium)';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.background = 'var(--color-neutral-alpha-medium)';
                }
              }}
              title={`Image ${index + 1}`}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ImageSlider;