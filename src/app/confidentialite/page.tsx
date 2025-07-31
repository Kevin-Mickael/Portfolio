import React from 'react';
import { Metadata } from 'next';
import styles from './terms.module.css';
import { routeImages } from "@/resources/routeImages";
import { baseURL } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Politique de confidentialité | Création de Site Web & Portfolio Maurice';
  const description = 'Découvrez la politique de confidentialité de Création de Site Web & Portfolio Maurice : protection des données, droits des utilisateurs, cookies, sécurité et contact.';
  const url = `${baseURL}/confidentialite`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      images: [{
        url: routeImages['/confidentialite'],
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [routeImages['/confidentialite']],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return (
      <div className={styles.droipPage}>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <h1 className={styles.headingLarge}>Politique de confidentialité</h1>
            <div className={styles.dateContainer}>
              <p className={styles.updateDate}>Dernière mise à jour : 14 juillet 2025</p>
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div>
              <div className={styles.section}>
                <div className={styles.sectionContent}>
                  <p className={styles.paragraph}>
                    Nous respectons votre vie privée et protégeons vos données personnelles conformément à la <strong>Data Protection Act 2017 (Mauritius)</strong>. La présente politique vous explique quelles informations nous collectons et comment nous les utilisons.
                  </p>
                </div>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Données collectées</h2>
                <p className={styles.paragraph}>
                  Lorsque vous utilisez notre site, nous pouvons collecter :
                </p>
                <ul className={styles.commonList}>
                  <li><span className={styles.paragraph}>Nom, prénom</span></li>
                  <li><span className={styles.paragraph}>Adresse e-mail</span></li>
                  <li><span className={styles.paragraph}>Adresse IP et données de navigation</span></li>
                  <li><span className={styles.paragraph}>Toute information que vous nous communiquez via les formulaires</span></li>
                </ul>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Finalités</h2>
                <p className={styles.paragraph}>
                  Vos données sont utilisées pour :
                </p>
                <ul className={styles.commonList}>
                  <li><span className={styles.paragraph}>Répondre à vos demandes et vous fournir nos services</span></li>
                  <li><span className={styles.paragraph}>Améliorer le fonctionnement et la sécurité de notre site</span></li>
                  <li><span className={styles.paragraph}>Vous informer de nos actualités et offres, avec votre consentement</span></li>
                </ul>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Base légale</h2>
                <p className={styles.paragraph}>
                  La collecte et le traitement de vos données reposent sur :
                </p>
                <ul className={styles.commonList}>
                  <li><span className={styles.paragraph}>Votre consentement explicite</span></li>
                  <li><span className={styles.paragraph}>Notre intérêt légitime à exploiter et améliorer nos services</span></li>
                </ul>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Durée de conservation</h2>
                <p className={styles.paragraph}>
                  Nous conservons vos données aussi longtemps que nécessaire aux finalités pour lesquelles elles ont été collectées, et conformément à la législation mauricienne.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Vos droits</h2>
                <p className={styles.paragraph}>
                  Conformément à la <strong>Data Protection Act 2017</strong>, vous disposez de :
                </p>
                <ul className={styles.commonList}>
                  <li><span className={styles.paragraph}>Droit d&apos;accès</span></li>
                  <li><span className={styles.paragraph}>Droit de rectification</span></li>
                  <li><span className={styles.paragraph}>Droit de suppression</span></li>
                  <li><span className={styles.paragraph}>Droit d&apos;opposition</span></li>
                  <li><span className={styles.paragraph}>Droit à la portabilité</span></li>
                </ul>
                <p className={styles.paragraph}>
                  Vous pouvez exercer ces droits en nous contactant à <a className={styles.link} href={`mailto:${'contact'}${'@'}${'creativfolio.com'}`}>contact@creativfolio.com</a>
                </p>
                <p className={styles.paragraph}>
                  En cas de litige, vous pouvez également saisir le <strong>Data Protection Commissioner of Mauritius</strong> : 🌐 <a className={styles.link} href="https://dataprotection.govmu.org/" target="_blank" rel="noopener noreferrer">https://dataprotection.govmu.org/</a>
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Cookies</h2>
                <p className={styles.paragraph}>
                  Nous utilisons des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour les refuser ou les supprimer.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Sécurité</h2>
                <p className={styles.paragraph}>
                  Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Contact</h2>
                <p className={styles.paragraph}>
                  Pour toute question sur cette politique, écrivez-nous à <a className={styles.link} href={`mailto:${'contact'}${'@'}${'creativfolio.com'}`}>contact@creativfolio.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
