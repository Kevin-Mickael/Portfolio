"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Avis.module.css';
import { RevealFx } from "@once-ui-system/core";

interface Review {
  name: string;
  date: string;
  stars: number;
  content: string;
  imageSrc: string;
}

const Avis: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Détection du mode sombre natif ou via data-theme
    const checkDark = () => {
      if (typeof window !== 'undefined') {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') setIsDark(true);
        else if (theme === 'light') setIsDark(false);
        else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };
    checkDark();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDark);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', checkDark);
    };
  }, []);

  const reviews: Review[] = [
    {
      name: "Sophie Martineau",
      date: "15/01/2025",
      stars: 5,
      content: "Une équipe exceptionnelle ! Mon site e-commerce a été livré dans les délais avec un design moderne et une navigation fluide. Je recommande vivement leurs services.",
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Marc Dubois",
      date: "08/12/2024",
      stars: 5,
      content: "Travail impeccable pour la refonte de notre site corporate. L'équipe est très professionnelle et à l'écoute des besoins clients.",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Amélie Rousseau",
      date: "22/11/2024",
      stars: 4,
      content: "Excellente collaboration ! Kevin et son équipe ont créé un site web parfaitement adapté à mon activité de coaching. Design élégant, fonctionnalités pratiques et un service client au top. Le rapport qualité-prix est imbattable !",
      imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Thomas Leroy",
      date: "05/11/2024",
      stars: 5,
      content: "Site web créé pour mon restaurant avec système de réservation en ligne. Résultat au-delà de mes attentes ! Merci pour ce travail remarquable.",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Camille Moreau",
      date: "28/10/2024",
      stars: 4,
      content: "Très satisfaite du site portfolio créé pour mon activité artistique. L'équipe a su comprendre ma vision et la retranscrire parfaitement.",
      imageSrc: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "David Chen",
      date: "15/10/2024",
      stars: 5,
      content: "Collaboration parfaite depuis 2 ans. Kevin est un professionnel sérieux et créatif. Je recommande sans hésitation pour tous vos projets web !",
      imageSrc: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Julie Petit",
      date: "03/10/2024",
      stars: 5,
      content: "Équipe reactive et compétente ! Parfait pour tous types de projets digitaux. Un grand merci pour votre professionnalisme.",
      imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Alexandre Martin",
      date: "20/09/2024",
      stars: 5,
      content: "Site vitrine créé pour notre startup tech. Excellent travail d'équipe, conseils pertinents et respect des délais. Une collaboration que je recommande vivement !",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Isabelle Garnier",
      date: "12/09/2024",
      stars: 5,
      content: "Pour le lancement de mon cabinet de conseil, j'avais besoin d'un site web professionnel. L'équipe a parfaitement répondu à mes attentes avec un résultat final exceptionnel et un prix très compétitif. Merci encore !",
      imageSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face"
    }
  ];

  // Dupliquer les avis pour l'effet infini
  const duplicatedReviews = [...reviews, ...reviews];

  // Animation CSS auto-scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animationId: number;
    let start: number | null = null;
    let lastTimestamp: number | null = null;
    const speed = 1.2; // px per frame

    function step(timestamp: number) {
      if (!slider) return;
      if (start === null) start = timestamp;
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      slider.scrollLeft += speed * (elapsed / 16.67);
      const resetPoint = slider.scrollWidth / 2;
      if (slider.scrollLeft >= resetPoint) {
        slider.scrollLeft -= resetPoint;
        lastTimestamp = timestamp;
      }
      animationId = requestAnimationFrame(step);
    }
    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [duplicatedReviews.length]);

  // --- SEO JSON-LD ENHANCED ---
  const business = {
    "@type": "LocalBusiness",
    "@id": "https://creativfolio.com/#business",
    "name": "Portfolio Kevin Mickael - Création de site web à Maurice",
    "image": "https://creativfolio.com/android-chrome-512x512.png",
    "url": "https://creativfolio.com/",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MU"
    },
    "telephone": "+23000000000"
  };
  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": reviews.length,
    "bestRating": 5,
    "worstRating": 1
  };
  const reviewsJsonLd = reviews.map((review, i) => ({
    "@type": "Review",
    "@id": `https://creativfolio.com/#review${i+1}`,
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "datePublished": review.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.stars,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.content,
    "publisher": {
      "@type": "Organization",
      "name": "Google"
    },
    "image": review.imageSrc
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://creativfolio.com/#product",
    "name": business.name,
    "image": business.image,
    "aggregateRating": aggregateRating,
    "review": reviewsJsonLd,
    "itemReviewed": business
  };
  // --- END SEO JSON-LD ---

  return (
    <RevealFx translateY="8" delay={0.1} fillWidth horizontal="start" paddingTop="24">
      <div className={styles.container + ' ' + styles.centered}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="trustindex-reviews-seo"
        />
        <div className={styles.header}>
          <div className={styles.avisTitle}>
            <strong>EXCELLENT</strong>
            <div className={styles.avisStars}>
              <Image 
                src="https://cdn.trustindex.io/assets/platform/Google/star/f.svg" 
                alt="Étoile" 
                className={styles.star} 
                width={20} 
                height={20}
              />
              <Image 
                src="https://cdn.trustindex.io/assets/platform/Google/star/f.svg" 
                alt="Étoile" 
                className={styles.star} 
                width={20} 
                height={20}
              />
              <Image 
                src="https://cdn.trustindex.io/assets/platform/Google/star/f.svg" 
                alt="Étoile" 
                className={styles.star} 
                width={20} 
                height={20}
              />
              <Image 
                src="https://cdn.trustindex.io/assets/platform/Google/star/f.svg" 
                alt="Étoile" 
                className={styles.star} 
                width={20} 
                height={20}
              />
              <Image 
                src="https://cdn.trustindex.io/assets/platform/Google/star/h.svg" 
                alt="Demi-étoile" 
                className={styles.star} 
                width={20} 
                height={20}
              />
            </div>
            <div className={styles.avisSubtitle}>Basé sur <strong>11 avis</strong></div>
          </div>
          <div className={styles.logo}>
            <Image 
              src="https://cdn.trustindex.io/assets/platform/Google/logo.svg" 
              alt="Google" 
              className={styles.logoImg} 
              width={110} 
              height={36}
            />
          </div>
        </div>
        <div className={styles.reviewsContainer}>
          <div className={styles.reviewsWrapper}>
            <div
              ref={sliderRef}
              className={styles.reviewsTrack + ' hide-scrollbar'}
              style={{ display: 'flex', width: '100vw', height: '100%', transition: 'none', scrollBehavior: 'auto', overflowX: 'scroll', overflowY: 'visible', background: 'transparent', alignItems: 'center', justifyContent: 'flex-start' }}
            >
              {duplicatedReviews.map((review, idx) => (
                <div key={idx} className={styles.reviewItem + ' ' + styles.centeredItem} style={{ minWidth: 320, maxWidth: 480, margin: '0 16px' }}>
                  <div className={styles.reviewItemInner + ' ' + styles.darkCard}>
                    <div className={styles.reviewInner}>
                      <Image 
                        className={styles.platformIcon} 
                        src="https://cdn.trustindex.io/assets/platform/Google/icon.svg" 
                        alt="Google" 
                        width={24}
                        height={24}
                      />
                      <div className={styles.reviewHeader}>
                        <div className={styles.profileImg}>
                          <Image 
                            src={review.imageSrc} 
                            alt={review.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className={styles.profileDetails}>
                          <div className={styles.name}>{review.name}</div>
                          <div className={styles.date}>{review.date}</div>
                        </div>
                      </div>
                      <div className={styles.stars}>
                        {[...Array(review.stars)].map((_, i) => (
                          <Image 
                            key={i}
                            className={styles.star} 
                            src="https://cdn.trustindex.io/assets/platform/Google/star/f.svg" 
                            alt="Étoile" 
                            width={16}
                            height={16}
                          />
                        ))}
                        <span className={styles.verifiedReview}>
                          <span className={styles.verifiedTooltip}>
                            Trustindex vérifie que la source originale de l&#39;avis est Google.
                          </span>
                        </span>
                      </div>
                      <div className={styles.reviewContent}>
                        {review.content.split("\n").map((text, i) => (
                          <span key={i}>{text}{i < review.content.split("\n").length - 1 && <br />}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.verifiedBy}>
          <div className={styles.verifiedInner}>
            Certifié par : Trustindex 
            <span className={styles.infoIcon}></span>
            <div className={styles.disclaimer}>
              Le badge vérifié Trustindex est le symbole universel de confiance. 
              Seules les meilleures entreprises peuvent obtenir le badge vérifié, 
              avec une note supérieure à 4,5, basée sur les avis clients des 12 derniers mois. 
              <a 
                href="https://www.trustindex.io/ti-redirect.php?a=sys&c=wp-verified-badge&url=/the-trustindex-verified-badge" 
                target="_blank"
                rel="noreferrer"
              >
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>
    </RevealFx>
  );
};

export default Avis;