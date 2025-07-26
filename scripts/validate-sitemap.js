const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

// Configuration
const config = {
  sitemapPath: path.join(__dirname, '../public/sitemap.xml'),
  baseURL: 'https://creativfolio.com',
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxUrls: 50000,
};

// Validation du XML
function validateXML(xmlContent) {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseAttributeValue: true,
    });
    
    const result = parser.parse(xmlContent);
    
    if (!result.urlset) {
      throw new Error('Structure XML invalide: urlset manquant');
    }
    
    if (!result.urlset.url || !Array.isArray(result.urlset.url)) {
      throw new Error('Structure XML invalide: aucune URL trouvée');
    }
    
    return result.urlset.url;
  } catch (error) {
    throw new Error(`Erreur de parsing XML: ${error.message}`);
  }
}

// Validation des URLs
function validateURLs(urls) {
  const errors = [];
  const warnings = [];
  const validChangefreq = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  
  urls.forEach((url, index) => {
    // Validation de l'URL
    if (!url.loc) {
      errors.push(`URL ${index + 1}: <loc> manquant`);
    } else if (!url.loc.startsWith(config.baseURL)) {
      errors.push(`URL ${index + 1}: URL ne commence pas par ${config.baseURL}`);
    }
    
    // Validation de la priorité
    if (url.priority !== undefined) {
      const priority = parseFloat(url.priority);
      if (isNaN(priority) || priority < 0 || priority > 1) {
        errors.push(`URL ${index + 1}: priorité invalide (${url.priority})`);
      }
    }
    
    // Validation de changefreq
    if (url.changefreq && !validChangefreq.includes(url.changefreq)) {
      errors.push(`URL ${index + 1}: changefreq invalide (${url.changefreq})`);
    }
    
    // Validation de lastmod
    if (url.lastmod) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(url.lastmod)) {
        warnings.push(`URL ${index + 1}: format de date suspect (${url.lastmod})`);
      }
    }
  });
  
  return { errors, warnings };
}

// Validation de la taille et du nombre d'URLs
function validateSizeAndCount(xmlContent, urls) {
  const errors = [];
  const warnings = [];
  
  const fileSize = Buffer.byteLength(xmlContent, 'utf8');
  if (fileSize > config.maxFileSize) {
    errors.push(`Taille du fichier (${(fileSize / 1024 / 1024).toFixed(2)} MB) dépasse la limite (${config.maxFileSize / 1024 / 1024} MB)`);
  }
  
  if (urls.length > config.maxUrls) {
    errors.push(`Nombre d'URLs (${urls.length}) dépasse la limite recommandée (${config.maxUrls})`);
  }
  
  if (urls.length === 0) {
    errors.push('Aucune URL trouvée dans le sitemap');
  }
  
  return { errors, warnings };
}

// Fonction principale de validation
function validateSitemap() {
  console.log('🔍 Validation du sitemap...');
  
  try {
    // Vérifier que le fichier existe
    if (!fs.existsSync(config.sitemapPath)) {
      throw new Error(`Fichier sitemap non trouvé: ${config.sitemapPath}`);
    }
    
    // Lire le contenu
    const xmlContent = fs.readFileSync(config.sitemapPath, 'utf-8');
    
    // Validation de base
    if (!xmlContent.includes('<?xml')) {
      throw new Error('Fichier ne commence pas par la déclaration XML');
    }
    
    if (!xmlContent.includes('<urlset')) {
      throw new Error('Balise urlset manquante');
    }
    
    // Parser le XML
    const urls = validateXML(xmlContent);
    
    // Validation des URLs
    const urlValidation = validateURLs(urls);
    
    // Validation de la taille et du nombre
    const sizeValidation = validateSizeAndCount(xmlContent, urls);
    
    // Combiner les résultats
    const allErrors = [...urlValidation.errors, ...sizeValidation.errors];
    const allWarnings = [...urlValidation.warnings, ...sizeValidation.warnings];
    
    // Affichage des résultats
    console.log(`📊 Statistiques de validation:`);
    console.log(`   - URLs trouvées: ${urls.length}`);
    console.log(`   - Taille du fichier: ${(Buffer.byteLength(xmlContent, 'utf8') / 1024).toFixed(2)} KB`);
    
    if (allErrors.length > 0) {
      console.log('\n❌ Erreurs trouvées:');
      allErrors.forEach(error => console.log(`   - ${error}`));
    }
    
    if (allWarnings.length > 0) {
      console.log('\n⚠️  Avertissements:');
      allWarnings.forEach(warning => console.log(`   - ${warning}`));
    }
    
    if (allErrors.length === 0 && allWarnings.length === 0) {
      console.log('\n✅ Sitemap valide !');
      return true;
    } else if (allErrors.length === 0) {
      console.log('\n⚠️  Sitemap valide avec avertissements');
      return true;
    } else {
      console.log('\n❌ Sitemap invalide');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la validation:', error.message);
    return false;
  }
}

// Exécution
if (require.main === module) {
  const isValid = validateSitemap();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateSitemap, config }; 