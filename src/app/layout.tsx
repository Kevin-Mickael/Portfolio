import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";
import { defaultMetadata, jsonLdSchemas } from './metadata.config';
import { Background, Column, Flex, opacity, SpacingToken } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from '@/components';
import { CookieBanner } from '@/components/CookieBanner';
import { effects, fonts, style, dataStyle } from '@/resources';
import { Metadata } from 'next';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientErrorBoundary>
      <Flex
        suppressHydrationWarning
        as="html"
        lang="fr"
        fillWidth
        className={classNames(
          fonts.heading.variable,
          fonts.body.variable,
          fonts.label.variable,
          fonts.code.variable,
        )}
      >
        <head>
          {/* DNS Prefetch pour les domaines externes */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          
          {/* Preconnect pour les ressources critiques */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Google Fonts avec preconnect */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Préchargement de la police Inter pour améliorer le LCP */}
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
          <style>{`@font-face { font-family: 'Inter'; font-display: swap; }`}</style>
          
          {/* URL canonique */}
          <link rel="canonical" href="https://creativfolio.com/" />
          
          {/* Favicons et icônes PWA */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico?v=4" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=4" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=4" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=4" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png?v=4" />
          <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png?v=4" />
          <link rel="manifest" href="/manifest.json?v=4" />
          <link rel="mask-icon" href="/favicon-32x32.png?v=4" color="#000000" />
          
          {/* Meta tags pour PWA */}
          <meta name="application-name" content="Portfolio Kevin Mickael" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Portfolio Kevin Mickael" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-TileImage" content="/favicon.png" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          
          {/* Schémas JSON-LD pour le SEO et les IA */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdSchemas.person),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdSchemas.organization),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdSchemas.website),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdSchemas.service),
            }}
          />
          
          {/* Balises régionales pour la Mauricie */}
          <meta name="geo.region" content="MU" />
          <meta name="geo.placename" content="Mauritius" />
          <meta name="geo.position" content="-20.348404;57.552152" />
          <meta name="ICBM" content="-20.348404, 57.552152" />

          {/* Données structurées LocalBusiness pour la régionalité */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Portfolio Kevin Mickael",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "MU",
                  "addressRegion": "Mauritius"
                },
                "url": "https://creativfolio.com/",
                "image": "/favicon.png"
              })
            }}
          />
          <script
            id="theme-init"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const root = document.documentElement;
                    const defaultTheme = 'system';
                    
                    // Set defaults from config
                    const config = ${JSON.stringify({
                      brand: style.brand,
                      accent: style.accent,
                      neutral: style.neutral,
                      solid: style.solid,
                      'solid-style': style.solidStyle,
                      border: style.border,
                      surface: style.surface,
                      transition: style.transition,
                      scaling: style.scaling,
                      'viz-style': dataStyle.variant,
                    })};
                    
                    // Apply default values
                    Object.entries(config).forEach(([key, value]) => {
                      root.setAttribute('data-' + key, value);
                    });
                    
                    // Resolve theme function
                    const resolveTheme = (themeValue) => {
                      if (!themeValue || themeValue === 'system') {
                        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      }
                      return themeValue;
                    };
                    
                    // Get saved theme or use default
                    const savedTheme = localStorage.getItem('data-theme') || defaultTheme;
                    
                    // Apply resolved theme
                    const resolvedTheme = resolveTheme(savedTheme);
                    root.setAttribute('data-theme', resolvedTheme);
                    
                    // Store the resolved theme for consistency
                    if (savedTheme === 'system') {
                      localStorage.setItem('data-theme', 'system');
                    }
                    
                    // Apply any saved style overrides
                    const styleKeys = Object.keys(config);
                    styleKeys.forEach(key => {
                      const value = localStorage.getItem('data-' + key);
                      if (value) {
                        root.setAttribute('data-' + key, value);
                      }
                    });
                    
                    // Listen for system theme changes
                    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                    const handleSystemThemeChange = () => {
                      const currentSavedTheme = localStorage.getItem('data-theme');
                      if (currentSavedTheme === 'system' || !currentSavedTheme) {
                        const newResolvedTheme = resolveTheme('system');
                        root.setAttribute('data-theme', newResolvedTheme);
                      }
                    };
                    
                    mediaQuery.addEventListener('change', handleSystemThemeChange);
                    
                  } catch (e) {
                    console.error('Failed to initialize theme:', e);
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                })();
              `,
            }}
          />
        </head>
        <Providers>
          <Column 
            as="body" 
            background="page" 
            fillWidth 
            style={{
              minHeight: "100vh",
              scrollBehavior: 'smooth',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              overflowX: 'hidden',
              maxWidth: '100vw'
            }} 
            margin="0" 
            padding="0" 
            horizontal="center"
          >
            <Background
              position="fixed"
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
            <Flex fillWidth minHeight="16" hide="s"/>
              <Header />
              <Flex
                zIndex={0}
                fillWidth
                padding="l"
                horizontal="center"
                flex={1}
              >
                <Flex horizontal="center" fillWidth minHeight="0">
                  <RouteGuard>
                    {children}
                  </RouteGuard>
                </Flex>
              </Flex>
              <Footer/>
              <CookieBanner />
            </Column>
          </Providers>
        </Flex>
      </ClientErrorBoundary>
  );
}
