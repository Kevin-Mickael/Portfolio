"use client";

import React, { useRef, useEffect, useState } from "react";

interface ProjectImage {
  src: string;
  name: string;
  category: string;
  link: string;
}

interface ImageSliderProps {
  images: ProjectImage[];
  height?: number | string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, height = 200 }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dupliquer les images pour l'effet infini
  const duplicatedImages = [...images, ...images];

  // Animation CSS auto-scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animationId: number;
    let start: number | null = null;
    let lastTimestamp: number | null = null;
    const speed = 1.5; // px per frame (moyen)

    function step(timestamp: number) {
      if (!slider) return;
      if (start === null) start = timestamp;
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      // Avancer le scroll
      slider.scrollLeft += speed * (elapsed / 16.67); // 16.67ms = 1 frame à 60fps
      // Si on a atteint la moitié (fin du premier set), on revient au début sans flash
      const resetPoint = slider.scrollWidth / 2;
      if (slider.scrollLeft >= resetPoint) {
        slider.scrollLeft -= resetPoint;
        // Synchroniser le temps pour éviter le micro-arrêt
        lastTimestamp = timestamp;
      }
      animationId = requestAnimationFrame(step);
    }
    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [duplicatedImages.length]);

  return (
    <div
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: "visible",
        borderRadius: 0,
        position: "relative",
        height: typeof height === 'number' ? `${height}px` : height,
        background: 'transparent',
      }}
      ref={el => {
        if (el) {
          console.log('[ImageSlider] Parent width:', el.offsetWidth);
        }
      }}
    >
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          width: '3500px', // force pour debug
          height: "100%",
          transition: "none",
          scrollBehavior: "auto",
          overflowX: "scroll",
          overflowY: "visible",
          background: 'transparent',
        }}
        // log de largeur réelle
        onLoad={() => {
          if (sliderRef.current) {
            console.log('[ImageSlider] Slider width:', sliderRef.current.scrollWidth);
          }
        }}
        className="hide-scrollbar"
      >
        {duplicatedImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              marginRight: 16,
              width: 300,
              height: typeof height === 'number' ? `${height}px` : height,
              flex: "0 0 auto",
              cursor: "pointer",
              background: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={img.src}
              alt={img.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // borderRadius: 16, // supprimé pour image rectangulaire
                display: "block",
                // background: '#ccc', // supprimé
              }}
              loading={idx === 0 ? "eager" : "lazy"}
            />
            {/* Overlay au hover */}
            {hoveredIndex === idx && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  padding: 16,
                  animation: "fadeIn 0.3s ease-out forwards",
                }}
              >
                <div
                  style={{
                    textAlign: "right",
                    color: "white",
                    transform: "translateY(20px)",
                    animation: "slideUp 0.4s ease-out 0.1s forwards",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{img.name}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 12, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{img.category}</div>
                  {typeof img.link === "string" && img.link.trim() !== "" && (
                    <a
                      href={img.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "white",
                        color: "black",
                        border: "none",
                        fontWeight: 600,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                        padding: "8px 16px",
                        borderRadius: 6,
                        textDecoration: "none",
                        display: "inline-block",
                        transform: "scale(0.9)",
                        animation: "buttonPop 0.4s ease-out 0.2s forwards",
                      }}
                    >
                      View
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        @keyframes buttonPop {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Webkit */
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;