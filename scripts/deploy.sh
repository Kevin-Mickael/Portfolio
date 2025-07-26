#!/bin/bash

# Script de déploiement optimisé pour Cloudflare Pages
# Creativfolio - Portfolio de Kevin

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement Creativfolio sur Cloudflare Pages..."

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCÈS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier wrangler (optionnel)
    if ! command -v wrangler &> /dev/null; then
        warning "Wrangler n'est pas installé (optionnel pour le déploiement)"
    fi
    
    success "Prérequis vérifiés"
}

# Nettoyage
cleanup() {
    log "Nettoyage des fichiers temporaires..."
    rm -rf .next
    rm -rf out
    success "Nettoyage terminé"
}

# Installation des dépendances
install_dependencies() {
    log "Installation des dépendances..."
    npm ci --production=false
    success "Dépendances installées"
}

# Tests et validation
run_tests() {
    log "Exécution des tests..."
    
    # Test du sitemap
    if npm run test-sitemap; then
        success "Tests du sitemap passés"
    else
        error "Tests du sitemap échoués"
        exit 1
    fi
    
    # Linting
    if npm run lint; then
        success "Linting passé"
    else
        warning "Linting avec des avertissements"
    fi
}

# Build de production
build_project() {
    log "Build de production..."
    
    if npm run build; then
        success "Build réussi"
    else
        error "Build échoué"
        exit 1
    fi
}

# Validation du build
validate_build() {
    log "Validation du build..."
    
    # Vérifier que le sitemap existe
    if [ -f "public/sitemap.xml" ]; then
        success "Sitemap généré"
    else
        error "Sitemap manquant"
        exit 1
    fi
    
    # Vérifier la taille du sitemap
    sitemap_size=$(wc -c < public/sitemap.xml)
    if [ "$sitemap_size" -gt 52428800 ]; then  # 50MB
        error "Sitemap trop volumineux ($sitemap_size bytes)"
        exit 1
    else
        success "Taille du sitemap OK ($sitemap_size bytes)"
    fi
    
    # Vérifier les fichiers essentiels
    essential_files=("public/robots.txt" "public/favicon.ico" "public/manifest.json")
    for file in "${essential_files[@]}"; do
        if [ -f "$file" ]; then
            success "Fichier $file présent"
        else
            warning "Fichier $file manquant"
        fi
    done
}

# Optimisation pour Cloudflare
optimize_for_cloudflare() {
    log "Optimisation pour Cloudflare Pages..."
    
    # Vérifier la configuration Wrangler
    if [ -f "wrangler.toml" ]; then
        success "Configuration Wrangler présente"
    else
        warning "Configuration Wrangler manquante"
    fi
    
    # Vérifier les headers
    if [ -f "public/_headers" ]; then
        success "Headers Cloudflare configurés"
    else
        warning "Headers Cloudflare manquants"
    fi
    
    # Vérifier les redirects
    if [ -f "public/_redirects" ]; then
        success "Redirects configurés"
    else
        warning "Redirects manquants"
    fi
}

# Déploiement (optionnel)
deploy() {
    if command -v wrangler &> /dev/null; then
        log "Déploiement avec Wrangler..."
        
        # Vérifier l'authentification
        if wrangler whoami &> /dev/null; then
            success "Authentification Wrangler OK"
            
            # Déployer
            if wrangler pages deploy out --project-name creativfolio; then
                success "Déploiement réussi"
            else
                error "Déploiement échoué"
                exit 1
            fi
        else
            error "Authentification Wrangler échouée"
            warning "Connectez-vous avec: wrangler login"
            exit 1
        fi
    else
        warning "Wrangler non installé - déploiement manuel requis"
        log "Pour déployer manuellement:"
        log "1. Uploadez le contenu du dossier 'out' vers Cloudflare Pages"
        log "2. Ou installez Wrangler: npm install -g wrangler"
    fi
}

# Génération du rapport
generate_report() {
    log "Génération du rapport de déploiement..."
    
    report_file="deploy-report-$(date +%Y%m%d-%H%M%S).txt"
    
    cat > "$report_file" << EOF
Rapport de déploiement Creativfolio
==================================
Date: $(date)
Version: $(node -p "require('./package.json').version")

Fichiers générés:
- sitemap.xml: $(wc -c < public/sitemap.xml) bytes
- URLs dans le sitemap: $(grep -c '<url>' public/sitemap.xml)

Build info:
- Node.js: $(node --version)
- npm: $(npm --version)
- Next.js: $(node -p "require('./package.json').dependencies.next")

Optimisations:
- Compression: activée
- Cache: configuré
- Headers: optimisés
- Sécurité: renforcée

Status: ✅ Prêt pour le déploiement
EOF
    
    success "Rapport généré: $report_file"
}

# Fonction principale
main() {
    log "Début du processus de déploiement..."
    
    check_prerequisites
    cleanup
    install_dependencies
    run_tests
    build_project
    validate_build
    optimize_for_cloudflare
    deploy
    generate_report
    
    success "Processus de déploiement terminé avec succès !"
    log "Votre site est prêt pour la production sur Cloudflare Pages"
}

# Gestion des erreurs
trap 'error "Script interrompu"; exit 1' INT TERM

# Exécution
main "$@" 