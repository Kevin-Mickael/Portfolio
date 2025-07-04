import React, { useEffect, useRef, useState } from 'react';
import { Column } from '@once-ui-system/core';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  threshold = 0.1,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold]);

  return (
    <Column
      ref={sectionRef}
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className || ''}`}
    >
      {isVisible && children}
    </Column>
  );
};

export default LazySection; 