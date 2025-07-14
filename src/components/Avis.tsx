"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Avis.module.css';

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

  const reviews: Review[] = [
    {
      name: "JEAN PHILIPPE ADADE",
      date: "06/02/2025",
      stars: 5,
      content: "J'ai confié la création de mon site web à l'équipe Création de Site Web & Portfolio, et je suis entièrement satisfait du résultat. L'équipe est très réactive et super professionnelle !",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjUJZTSgOOLByMOO818XD_W20OdDsF1Iecw4SrR0a6CGGr8vXQA=w40-h40-c-rp-mo-br100"
    },
    {
      name: "Mathias De Bock",
      date: "15/11/2024",
      stars: 5,
      content: "Excellente, travail parfait et livré à temps pour un site web pour une société de courtage en crédit et assurance.",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjWikGxhNbQorri7As3DEpBe0w7mWqR6jWH9eg_j1W8z6py2zbg=w40-h40-c-rp-mo-br100"
    },
    {
      name: "Frederic Occelli",
      date: "12/10/2023",
      stars: 4,
      content: "J'ai embauché Kevin pour créer un site web mon magasin.\n\nAvec un grand professionnalisme, répondant à toutes mes demandes, l'équipe a réussi à transformer mes projets en réalité : un site web fonctionnel, très moderne, facile d'accès pour mettre à jour mes articles ou pour le paiement en ligne, attentif à chaque détail, il ne me reste plus qu'à recevoir les commandes et les clients en magasin !\n\nEt tout cela pour un devis qui défie toute concurrence !!\n\nJe recommande sans aucune hésitation !!\n\nMerci Kevin  et toute l'équipe !!",
      imageSrc: "https://lh3.googleusercontent.com/a/ACg8ocJDoSVHmCw7DJu4MPC33tkqdD9eAFVO27b79CqRY40shLdMig=w40-h40-c-rp-mo-br100"
    },
    {
      name: "Tina Boodhoo",
      date: "03/05/2023",
      stars: 5,
      content: "Nous avons obtenu un site web exceptionnel qui répond aux attentes de nos clients. Merci beaucoup pour votre excellent travail, nous vous sommes très reconnaissants.",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjWuHrI5WFq-h0Gh5zQtMf3a3vSp95MU7Xi10Ti6F6-y2sDA5JfY=w40-h40-c-rp-mo-ba2-br100"
    },
    {
      name: "Nicolas CAPELLE",
      date: "03/02/2023",
      stars: 4,
      content: "Très satisfait du travail, je recommande vos services.",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjXwaOaUNzMeh3hrMMvFqVMQbtvbQ2ZvtifF50m9ia96tG4UYdC5=w40-h40-c-rp-mo-ba3-br100"
    },
    {
      name: "Loic Verron",
      date: "08/11/2021",
      stars: 5,
      content: "Une équipe très professionnelle, à l'écoute de mes besoins et qui a été patiente avec moi ! Je recommande cette Création de Site Web & Portfolio pour son rapport qualité/prix également.",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjU_F7zjvpD175_CEuoGFeVIh1kUJ8KVW_s791x6mBn2py_Up4RY=w40-h40-c-rp-mo-br100"
    },
    {
      name: "Yohan Benouaich",
      date: "05/11/2021",
      stars: 5,
      content: "Une belle collaboration depuis plusieurs années. Kevin vraiment est sérieux et professionnelle, je recommande.",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjUR5QvKJDatbplxhBk29F1lZ8mzzaK3wqn8LDhCJQYb-gfgppJ3=w40-h40-c-rp-mo-br100"
    },
    {
      name: "Com & Marketing L' Agence 39",
      date: "03/11/2021",
      stars: 5,
      content: "L'équipe est au top et réactive, pour tous types de projets je recommande !",
      imageSrc: "https://lh3.googleusercontent.com/a-/ALV-UjX_eEc-uDRWJ0NjOH5uXT45b5Vukqh_dMGw3ItX5atl2uY1Mimp=w40-h40-c-rp-mo-br100"
    },
    {
      name: "Benoit Messana",
      date: "12/10/2021",
      stars: 5,
      content: "Ayant besoin d'être visible sur le web pour le lancement de notre entreprise, nous cherchions une agence web qui puisse répondre à notre cahier des charges.\nCréation de Site Web & Portfolio nous a été recommandée et nous sommes entièrement satisfaits du résultat final et d'un prix plus que correct.\nUne équipe qui sait vous écouter et vous conseille sur les dernières avancées du web.\nMerci encore.",
      imageSrc: "https://lh3.googleusercontent.com/a/ACg8ocIZPCwSK3r1lrucVSxgXGMI3621hwFZ7Zu8hHt53YrPYgUGKA=w40-h40-c-rp-mo-br100"
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

  // Génération du balisage JSON-LD pour SEO (avis + aggregate)
  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 11,
    "bestRating": 5,
    "worstRating": 1
  };
  const reviewsJsonLd = reviews.map((review) => ({
    "@type": "Review",
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
    "reviewBody": review.content.replace(/'/g, "&#39;"),
    "publisher": {
      "@type": "Organization",
      "name": "Google"
    }
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Portfolio Kevin Mickael - Création de site web à Maurice",
    "aggregateRating": aggregateRating,
    "review": reviewsJsonLd
  };

  return (
    <div className={styles.container + ' ' + styles.centered + ' ' + styles.darkMode}>
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
            style={{ display: 'flex', width: '3500px', height: '100%', transition: 'none', scrollBehavior: 'auto', overflowX: 'scroll', overflowY: 'visible', background: 'transparent', alignItems: 'center', justifyContent: 'center' }}
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
                        <span key={i}>{text.replace(/'/g, "&#39;")}{i < review.content.split("\n").length - 1 && <br />}</span>
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
  );
};

export default Avis; 