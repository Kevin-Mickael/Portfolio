import React from 'react';
import { Metadata } from 'next';
import styles from '../confidentialite/terms.module.css';
import { routeImages } from "@/resources/routeImages";
import { baseURL } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Conditions Générales d\'Utilisation | Création de Site Web & Portfolio';
  const description = 'Consultez les conditions générales d\'utilisation (CGU) de Création de Site Web & Portfolio Maurice. Découvrez les règles d\'utilisation, la propriété intellectuelle, la responsabilité et vos droits en tant qu\'utilisateur du site.';
  const url = `${baseURL}/cgu`;
  
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
        url: routeImages['/cgu'],
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [routeImages['/cgu']],
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
            <h1 className={styles.headingLarge}>Conditions Générales d&apos;Utilisation</h1>
            <div className={styles.dateContainer}>
              <p className={styles.updateDate}>Dernière mise à jour : 14 juillet 2025</p>
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div>
              <div className={styles.section}>
                <div className={styles.sectionContent}>
                  <p className={styles.paragraph}>
                    L&apos;utilisation du site implique l&apos;acceptation pleine et entière des présentes conditions générales d&apos;utilisation (CGU).<br/>
                    Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le site.
                  </p>
                </div>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Présentation du site</h2>
                <p className={styles.paragraph}>
                  Ce site présente des exemples de réalisations web, des projets de création de sites internet et des portfolios numériques conçus pour valoriser différents secteurs d&apos;activité.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Accès au site</h2>
                <p className={styles.paragraph}>
                  Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès internet.<br/>
                  Nous pouvons interrompre ou limiter l&apos;accès pour maintenance ou en cas d&apos;abus.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Propriété intellectuelle</h2>
                <p className={styles.paragraph}>
                  Les contenus du site (textes, images, logos, etc.) sont protégés par le droit d&apos;auteur.<br/>
                  Toute reproduction sans autorisation écrite préalable est interdite.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Responsabilité</h2>
                <p className={styles.paragraph}>
                  Nous nous efforçons de maintenir un site sécurisé et actualisé.<br/>
                  Cependant, l&apos;utilisateur utilise le site sous sa propre responsabilité.<br/>
                  Nous ne saurions être tenus responsables en cas de dommages indirects liés à l&apos;utilisation du site.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Comportement de l&apos;utilisateur</h2>
                <p className={styles.paragraph}>
                  L&apos;utilisateur s&apos;engage à :
                </p>
                <ul className={styles.commonList}>
                  <li><span className={styles.paragraph}>Ne pas nuire au bon fonctionnement du site</span></li>
                  <li><span className={styles.paragraph}>Ne pas tenter d&apos;accéder de manière non autorisée à nos systèmes</span></li>
                </ul>
                <p className={styles.paragraph}>
                  Toute violation peut entraîner des poursuites conformément à la législation mauricienne.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Modifications</h2>
                <p className={styles.paragraph}>
                  Nous pouvons modifier ces CGU à tout moment. La version applicable est celle en ligne au moment de la visite.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Loi applicable et juridiction compétente</h2>
                <p className={styles.paragraph}>
                  Les présentes CGU sont régies par la législation en vigueur en République de Maurice.<br/>
                  En cas de litige, les tribunaux mauriciens sont seuls compétents.
                </p>
              </div>
              <div className={styles.section}>
                <h2 className={styles.headingMedium}> Contact</h2>
                <p className={styles.paragraph}>
                  Pour toute question sur ces CGU, contactez-nous à <a className={styles.link} href={`mailto:${'contact'}${'@'}${'creativfolio.com'}`}>contact@creativfolio.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
