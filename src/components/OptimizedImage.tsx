import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  webpSrc?: string;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  fallbackSrc,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(webpSrc || src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (webpSrc && imgSrc === webpSrc) {
        // Fallback from WebP to PNG
        setImgSrc(src);
      } else if (fallbackSrc) {
        // Fallback to a specific fallback image
        setImgSrc(fallbackSrc);
      }
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

// Hook pour détecter le support WebP
export const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);

  if (typeof window !== 'undefined' && supportsWebP === null) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const webpData = canvas.toDataURL('image/webp');
      setSupportsWebP(webpData.indexOf('image/webp') === 5);
    } else {
      setSupportsWebP(false);
    }
  }

  return supportsWebP;
};

export default OptimizedImage;
