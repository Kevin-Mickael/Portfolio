# Système de Sitemap - Creativfolio

## Vue d'ensemble

Ce projet utilise un système de génération de sitemap robuste et automatisé pour optimiser le SEO et l'indexation par les moteurs de recherche.

## Architecture

### Fichiers principaux

- `scripts/generate-sitemap.js` - Générateur principal du sitemap
- `scripts/validate-sitemap.js` - Validateur du sitemap
- `scripts/test-sitemap.js` - Suite de tests complète
- `public/sitemap.xml` - Fichier sitemap généré
- `public/_headers` - Configuration des headers Cloudflare

### Configuration

Le système est configuré pour :
- **URL de base** : `https://creativfolio.com`
- **Limite d'URLs** : 50,000 (recommandation Google)
- **Taille max** : 50MB
- **Format** : XML standard sitemap.org

## Utilisation

### Commandes disponibles

```bash
# Générer le sitemap
npm run sitemap

# Valider le sitemap
npm run validate-sitemap

# Tests complets
npm run test-sitemap

# Build avec génération automatique
npm run build
```

### Intégration automatique

Le sitemap est automatiquement généré lors de :
- `npm run build`
- `npm run export`

## Fonctionnalités

### ✅ Génération automatique
- Scan des pages statiques
- Détection des articles de blog (MDX)
- Détection des projets (MDX)
- Extraction des métadonnées (publishedAt)

### ✅ Validation robuste
- Validation XML
- Vérification des URLs
- Contrôle des priorités et changefreq
- Validation de la taille du fichier

### ✅ Gestion d'erreurs
- Gestion des fichiers manquants
- Validation des dates
- Logs détaillés
- Gestion des cas edge

### ✅ Optimisations SEO
- Priorités appropriées par type de contenu
- Fréquences de mise à jour optimisées
- Dates de dernière modification
- Headers Cloudflare optimisés

## Structure du sitemap

### Pages statiques
- **Priorité** : 0.5 - 1.0
- **Fréquence** : daily à monthly
- **URLs** : /, /about, /work, /blog, /contact, /confidentialite, /cgu

### Articles de blog
- **Priorité** : 0.7
- **Fréquence** : weekly
- **Détection** : fichiers `.mdx` dans `src/app/blog/posts/`
- **Métadonnées** : `publishedAt` extrait du frontmatter

### Projets
- **Priorité** : 0.8
- **Fréquence** : monthly
- **Détection** : fichiers `.mdx` dans `src/app/work/projects/`
- **Métadonnées** : `publishedAt` extrait du frontmatter

## Configuration Cloudflare

### Headers optimisés
```http
/sitemap.xml
  Content-Type: application/xml
  Cache-Control: public, max-age=3600
  X-Robots-Tag: noindex
```

### Sécurité
```http
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Bonnes pratiques

### ✅ Respectées
- [x] Format XML standard
- [x] Limites Google respectées
- [x] Validation automatique
- [x] Gestion d'erreurs
- [x] Logs détaillés
- [x] Tests automatisés
- [x] Intégration CI/CD
- [x] Headers optimisés
- [x] Cache approprié

### 🔧 Maintenance

#### Ajouter une nouvelle page statique
1. Ajouter l'URL dans `staticPages` array
2. Définir priorité et changefreq appropriés

#### Ajouter un nouvel article/projet
1. Créer le fichier `.mdx` dans le bon répertoire
2. Ajouter `publishedAt: "YYYY-MM-DD"` dans le frontmatter
3. Le sitemap sera automatiquement mis à jour

#### Modifier la configuration
1. Éditer `config` object dans `generate-sitemap.js`
2. Tester avec `npm run test-sitemap`

## Monitoring

### IndexNow
Le système notifie automatiquement IndexNow après génération pour une indexation rapide.

### Logs
Les logs détaillés permettent de :
- Suivre la génération
- Identifier les erreurs
- Vérifier les statistiques
- Monitorer les performances

## Troubleshooting

### Problèmes courants

#### Fichier sitemap non généré
```bash
npm run sitemap
npm run validate-sitemap
```

#### Erreurs de validation
```bash
npm run test-sitemap
```

#### URLs manquantes
Vérifier que les fichiers MDX existent dans les bons répertoires.

#### Dates invalides
Vérifier le format `publishedAt: "YYYY-MM-DD"` dans les fichiers MDX.

## Performance

### Optimisations
- Génération incrémentale
- Cache approprié
- Validation rapide
- Headers optimisés
- Compression automatique

### Métriques
- Taille typique : ~2-5 KB
- Temps de génération : <1s
- URLs typiques : 10-50
- Validation : <100ms

## Sécurité

### Headers de sécurité
- Protection XSS
- Contenu-Type strict
- Referrer Policy
- Permissions Policy

### Validation
- URLs sécurisées
- XML valide
- Limites respectées
- Contenu sécurisé

---

*Dernière mise à jour : 2025-07-26* 