"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: (string | { src: string; alt?: string })[];
  autoPlay?: boolean;
  interval?: number;
  height?: number | string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = true,
  interval = 3000,
  height = 360,
}) => {
  const slides = images.map(img => typeof img === 'string' ? { src: img, alt: 'Image' } : { src: img.src, alt: img.alt || 'Image' });
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    timer.current = setInterval(() => setIndex(i => (i + 1) % slides.length), interval);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [autoPlay, interval, slides.length]);

  useEffect(() => { setIndex(0); }, [images]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  if (!slides.length) return null;

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
      <div style={{ width: '100%', height, position: 'relative', background: '#f0f0f0' }}>
        <Image
          src={slides[index].src}
          alt={slides[index].alt}
          fill
          style={{ objectFit: 'cover', borderRadius: 12, transition: 'opacity 0.3s' }}
          sizes="(max-width: 768px) 100vw, 800px"
          priority={index === 0}
          unoptimized
        />
        {slides.length > 1 && (
          <>
            <button onClick={() => goTo(index - 1)} aria-label="Précédent" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', zIndex: 2 }}>&lt;</button>
            <button onClick={() => goTo(index + 1)} aria-label="Suivant" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', zIndex: 2 }}>&gt;</button>
          </>
        )}
        {slides.length > 1 && (
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', background: i === index ? '#007bff' : '#ccc', cursor: 'pointer', opacity: i === index ? 1 : 0.6 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;