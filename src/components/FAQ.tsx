'use client';

import React, { useState } from "react";
import styles from "./FAQ.module.scss";

const FAQ_DATA = [
  {
    question: "Que proposez-vous exactement ?",
    answer: "Que vous soyez machiniste, mécanicien, plombier, maçon, couturier, garagiste, artiste, coiffeur, photographe ou créateur de mode... J'accompagne tous les professionnels dans la création de leur site web et portfolio personnalisé. Mon objectif ? Mettre en valeur votre savoir-faire, attirer de nouveaux clients et développer votre activité grâce à une présence digitale percutante et professionnelle."
  },
  {
    question: "Combien de temps faut-il pour créer un site ou portfolio ?",
    answer: "Le délai dépend du projet, mais en général, je livre votre site ou portfolio en 2 à 5 jours maximum."
  },
  {
    question: "L'hébergement est-il compris ?",
    answer: "Oui, l'hébergement est inclus dans l'offre. En revanche, la maintenance du site après livraison n'est pas incluse, mais je peux vous proposer une option si besoin."
  },
  {
    question: "Proposez-vous un support technique après la livraison ?",
    answer: "Oui, je propose un support technique et une assistance IT pour vous accompagner après la mise en ligne de votre site. Que ce soit pour des mises à jour, des problèmes techniques ou des questions d'utilisation, je reste disponible pour vous conseiller et résoudre rapidement tous vos besoins informatiques."
  },
  {
    question: "Combien coûte le développement d'une mini-app ?",
    answer: "Le prix d'une mini-application dépend surtout de vos besoins et de la complexité des fonctionnalités souhaitées."
  }
];

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ_DATA.map((item) => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer,
    },
  })),
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              className={
                idx === 1
                  ? `${styles.faqQuestion} ${styles.faqQuestionLeft}`
                  : styles.faqQuestion
              }
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
              <p>{item.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ; 