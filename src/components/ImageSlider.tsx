"use client";

import React, { useState, useEffect } from 'react';
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

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Flex direction="column" gap="16" fillWidth>
      {title && (
        <Flex horizontal="center">
          <Text variant="heading-strong-m">
            {title}
          </Text>
        </Flex>
      )}
      
      <Flex 
        position="relative" 
        fillWidth 
        style={{ 
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        {/* Main Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease-in-out'
          }}
        />

        {/* Navigation Buttons */}
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

        {/* Slide Counter */}
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
      </Flex>

      {/* Dots Navigation */}
      <Flex gap="8" horizontal="center">
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
              border: 'none'
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ImageSlider; 