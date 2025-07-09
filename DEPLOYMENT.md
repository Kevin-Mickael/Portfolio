# Guide de Déploiement Cloudflare - Portfolio Kevin Mickael

## 🚀 Préparation SEO Complète

### 1. Configuration des Outils de Suivi

#### Google Search Console
1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter votre propriété : `https://creativfolio.com`
3. Vérifier la propriété (recommandé : fichier HTML)
4. Récupérer le code de vérification et l'ajouter dans `src/app/metadata.config.ts`

#### Bing Webmaster Tools
1. Aller sur [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Ajouter votre site : `https://creativfolio.com`
3. Vérifier la propriété
4. Récupérer le code de vérification

#### Google Analytics 4
1. Créer un compte GA4 sur [Google Analytics](https://analytics.google.com)
2. Créer une propriété pour votre site
3. Récupérer le Measurement ID (G-XXXXXXXXXX)
4. Ajouter le script GA4 dans le layout

### 2. Configuration Cloudflare

#### Étape 1 : Créer un compte Cloudflare
1. Aller sur [Cloudflare](https://cloudflare.com)
2. Créer un compte gratuit
3. Ajouter votre domaine : `creativfolio.com`

#### Étape 2 : Configuration DNS
```
Type    Nom                    Contenu
A       @                      [IP de votre serveur]
CNAME   www                   creativfolio.com
```

#### Étape 3 : Configuration Cloudflare Pages
1. Dans le dashboard Cloudflare, aller dans "Pages"
2. Cliquer sur "Create a project"
3. Connecter votre repository GitHub
4. Configuration du build :
   - **Framework preset** : Next.js
   - **Build command** : `npm run build`
   - **Build output directory** : `.next`
   - **Root directory** : `/` (laisser vide)

#### Étape 4 : Variables d'environnement
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://creativfolio.com
```

### 3. Optimisations Cloudflare

#### Configuration Wrangler
1. Installer Wrangler : `npm install -g wrangler`
2. Se connecter : `wrangler login`
3. Modifier `wrangler.toml` avec vos informations :
   - Remplacer `REMPLACER_PAR_TON_ZONE_ID` par votre Zone ID
   - Ajuster le nom du projet si nécessaire

#### Headers de Sécurité
Les fichiers `public/_headers` et `public/_redirects` sont déjà configurés pour :
- Sécurité renforcée
- Cache optimisé
- Redirections SEO
- Compression automatique

### 4. Vérifications Post-Déploiement

#### Test de Performance
1. [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. [GTmetrix](https://gtmetrix.com/)
3. [WebPageTest](https://www.webpagetest.org/)

#### Test SEO
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)
3. [Open Graph Debugger](https://developers.facebook.com/tools/debug/)

#### Test de Sécurité
1. [Security Headers](https://securityheaders.com/)
2. [Mozilla Observatory](https://observatory.mozilla.org/)

### 5. Monitoring et Maintenance

#### Outils de Monitoring
- **Uptime Robot** : Surveillance de disponibilité
- **Google Search Console** : Performance SEO
- **Google Analytics** : Trafic et comportement utilisateur
- **Cloudflare Analytics** : Métriques de performance

#### Maintenance Régulière
- Vérifier les erreurs 404 dans Google Search Console
- Analyser les Core Web Vitals
- Mettre à jour les dépendances
- Vérifier les liens cassés
- Optimiser les images

### 6. Optimisations Supplémentaires

#### Images
- Utiliser le format WebP/AVIF
- Optimiser les images avec des outils comme TinyPNG
- Implémenter le lazy loading
- Utiliser les dimensions appropriées

#### Performance
- Minimiser les requêtes HTTP
- Utiliser la compression gzip/brotli
- Optimiser le cache navigateur
- Implémenter le service worker (optionnel)

#### SEO Local
- Créer un Google My Business
- Ajouter des données structurées locales
- Optimiser pour les recherches locales à Maurice

### 7. Checklist de Déploiement

- [ ] Code de vérification Google Search Console ajouté
- [ ] Code de vérification Bing Webmaster Tools ajouté
- [ ] Google Analytics configuré
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configuré
- [ ] Métadonnées optimisées
- [ ] Images optimisées
- [ ] Test de performance effectué
- [ ] Test SEO effectué
- [ ] Test de sécurité effectué
- [ ] Redirections configurées
- [ ] Cache configuré
- [ ] Headers de sécurité configurés

### 8. Commandes de Déploiement

```bash
# Build de production
npm run build

# Test local de production
npm run start

# Déploiement via Cloudflare Pages (automatique via GitHub)
git add .
git commit -m "Optimisation SEO pour Cloudflare"
git push origin main
```

### 9. Support et Ressources

- [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Documentation Next.js](https://nextjs.org/docs)
- [Google Search Console Help](https://support.google.com/webmasters/)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

**Note** : Ce guide couvre les optimisations SEO essentielles pour un déploiement réussi sur Cloudflare. Assurez-vous de tester chaque étape avant de passer à la suivante. 