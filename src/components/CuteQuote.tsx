'use client';

import React from 'react';
import styles from './CuteQuote.module.css';

const CuteQuote: React.FC = () => {
  return (
    <section
      className={styles.quoteSection}
      aria-label="Citation inspirationnelle sur l&apos;unicité et la visibilité de votre talent"
      itemScope
      itemType="https://schema.org/Quotation"
    >
      <meta itemProp="keywords" content="citation inspiration, talent unique, visibilité, portfolio, web, célébration, montrer au monde" />
      <div className="mx-auto w-full px-5 py-20 md:px-10 md:py-32 max-w-7xl">
        <div className={styles.quoteContainer}>
          <div className={styles.heartWrapper}>
            <span className={styles.heartCenter}>
              <svg className={styles.heartIcon} width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M24 42.7l-2.9-2.6C9.8 30.7 2 23.6 2 15.3 2 8.8 7.8 3 14.3 3c3.5 0 6.8 1.6 9 4.1C25.9 4.6 29.2 3 32.7 3 39.2 3 45 8.8 45 15.3c0 8.3-7.8 15.4-19.1 24.8L24 42.7z" fill="currentColor"/>
              </svg>
            </span>
          </div>
          <blockquote className={`${styles.quoteText} mx-auto mb-0 text-center text-4xl max-w-3xl font-bold md:text-6xl`} itemProp="text">
            Vous portez en vous quelque chose d&apos;unique. Montrons-le au monde entier.
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default CuteQuote; 