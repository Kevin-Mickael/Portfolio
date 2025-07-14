'use client';

import React, { useState, useEffect } from "react";
import styles from "./FAQ.module.scss";

const FAQ_DATA = [
  {
    question: "Que proposez-vous exactement ?",
    answer: (<>Que vous soyez machiniste, mécanicien, plombier, maçon, couturier, garagiste, artiste, coiffeur, photographe ou créateur de mode... J&apos;accompagne tous les professionnels dans la création de leur site web et portfolio personnalisé. Mon objectif ? Mettre en valeur votre <strong>savoir-faire</strong>, attirer de nouveaux clients et développer votre activité grâce à une présence digitale percutante et professionnelle.</>)
  },
  {
    question: "Combien de temps faut-il pour créer un site ou un portfolio ?",
    answer: (<>Le délai dépend du projet, mais en général, je livre votre site ou portfolio en <strong>2 à 5 jours</strong> maximum.</>)
  },
  {
    question: (<>L&apos;hébergement est-il compris ?</>),
    answer: (<><strong>Oui, l&apos;hébergement est inclus dans l&apos;offre</strong>. En revanche, la maintenance du site après livraison n&apos;est pas incluse, mais je peux vous proposer une option si besoin.</>)
  },
  {
    question: "Pourquoi avoir un site web ou portfolio web ?",
    answer: (<>Dans un monde où 90% des clients recherchent en ligne avant de commander ou faire appel à un professionnel, être absent du digital c&apos;est perdre des opportunités. <strong>Votre site web devient votre vitrine 24h/24, prouve votre professionnalisme et vous permet de vous démarquer face à vos concurrents </strong>qui n&apos;ont qu&apos;une simple page Facebook.</>)
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Générer le schéma FAQPage JSON-LD
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_DATA.map((item) => ({
        '@type': 'Question',
        'name': typeof item.question === 'string' ? item.question : '',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': typeof item.answer === 'string' ? item.answer : (typeof item.answer === 'object' && 'props' in item.answer ? item.answer.props.children : ''),
        },
      })),
    };
    // Injecter le script JSON-LD dans le head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.innerHTML = JSON.stringify(faqSchema);
    // Supprimer l'ancien script si présent
    const old = document.getElementById('faq-jsonld');
    if (old) old.remove();
    document.head.appendChild(script);
    return () => {
      const old = document.getElementById('faq-jsonld');
      if (old) old.remove();
    };
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={styles.faqSection} aria-label="FAQ">
      <h2 className={styles.faqTitle}>Questions Fréquentes</h2>
      <ul className={styles.faqList}>
        {FAQ_DATA.map((item, idx) => (
          <li key={idx} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-header-${idx}`}
              onClick={() => toggle(idx)}
            >
              <span>{item.question}</span>
              <span className={styles.faqIcon} aria-hidden>
                {openIndex === idx ? "▲" : "▼"}
              </span>
            </button>
            <div
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-header-${idx}`}
              className={
                openIndex === idx ? styles.faqAnswerOpen : styles.faqAnswer
              }
            >
              {item.answer}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ; 