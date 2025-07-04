import React, { useState, useEffect } from 'react';
import { Media } from '@once-ui-system/core';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  radius?: "xs" | "s" | "m" | "l" | "xl" | "full" | "m-4" | "m-8" | "l-4" | "l-8" | "xs-4" | "xs-8" | "xl-4" | "xl-8" | "full-4" | "full-8" | undefined;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  radius = "m",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(
    // Créer une version miniature pour le chargement initial
    src.replace(/\.(jpg|jpeg|png)$/, '-thumbnail.$1')
  );

  // Validation du radius pour ne passer que des valeurs autorisées
  const validRadius = [
    "xs", "s", "m", "l", "xl", "full",
    "m-4", "m-8", "l-4", "l-8", "xs-4", "xs-8", "xl-4", "xl-8", "full-4", "full-8"
  ];
  const safeRadius = validRadius.includes(radius as string) ? radius : "m";

  useEffect(() => {
    // Précharger l'image en haute qualité
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Media
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'}`}
        style={{
          transition: 'filter 0.3s ease-in-out',
        }}
        radius={safeRadius}
      />
    </div>
  );
};

export default ProgressiveImage; 