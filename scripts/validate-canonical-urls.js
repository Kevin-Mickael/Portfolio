const fs = require('fs');
const path = require('path');

// Configuration
const baseURL = 'https://creativfolio.com';
const outDir = path.join(__dirname, '../out');

// Fonction pour extraire l'URL canonique d'un fichier HTML
function extractCanonicalUrl(htmlContent) {
  const canonicalMatch = htmlContent.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
  return canonicalMatch ? canonicalMatch[1] : null;
}

// Fonction pour valider récursivement les fichiers HTML
function validateDirectory(dirPath, relativePath = '') {
  const issues = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        // Récursion dans les sous-dossiers
        const subIssues = validateDirectory(fullPath, path.join(relativePath, item));
        issues.push(...subIssues);
      } else if (item === 'index.html') {
        // Validation des fichiers index.html
        const htmlContent = fs.readFileSync(fullPath, 'utf-8');
        const canonicalUrl = extractCanonicalUrl(htmlContent);
        
        // Construire l'URL attendue
        let expectedUrl;
        if (relativePath === '') {
          expectedUrl = baseURL + '/';
        } else {
          expectedUrl = baseURL + '/' + relativePath.replace(/\\/g, '/');
        }
        
        // Vérification
        if (!canonicalUrl) {
          issues.push({
            type: 'MISSING_CANONICAL',
            file: path.join(relativePath, item),
            expected: expectedUrl,
            found: null
          });
        } else if (canonicalUrl !== expectedUrl) {
          issues.push({
            type: 'INCORRECT_CANONICAL',
            file: path.join(relativePath, item),
            expected: expectedUrl,
            found: canonicalUrl
          });
        }
      }
    }
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${dirPath}:`, error.message);
  }
  
  return issues;
}

// Fonction principale
function validateCanonicalUrls() {
  console.log('🔍 Validation des URL canoniques...');
  
  if (!fs.existsSync(outDir)) {
    console.error('❌ Le dossier de build "out" n\'existe pas. Exécutez d\'abord "npm run build".');
    process.exit(1);
  }
  
  const issues = validateDirectory(outDir);
  
  if (issues.length === 0) {
    console.log('✅ Toutes les URL canoniques sont correctes !');
    return true;
  }
  
  console.log(`❌ ${issues.length} problème(s) détecté(s) :`);
  
  for (const issue of issues) {
    console.log(`\n📁 Fichier: ${issue.file}`);
    console.log(`   Type: ${issue.type}`);
    console.log(`   Attendue: ${issue.expected}`);
    console.log(`   Trouvée: ${issue.found || 'MANQUANTE'}`);
  }
  
  return false;
}

// Fonction pour afficher un résumé des pages validées
function showSummary() {
  const issues = validateDirectory(outDir);
  const totalPages = countHtmlFiles(outDir);
  const validPages = totalPages - issues.length;
  
  console.log(`\n📊 Résumé de validation:`);
  console.log(`   - Pages totales: ${totalPages}`);
  console.log(`   - Pages valides: ${validPages}`);
  console.log(`   - Pages avec problèmes: ${issues.length}`);
  
  if (issues.length > 0) {
    console.log(`\n🔧 Actions recommandées:`);
    console.log(`   1. Vérifiez que generateSEO() est utilisé dans toutes les pages`);
    console.log(`   2. Vérifiez que les URLs passées correspondent aux chemins de fichiers`);
    console.log(`   3. Reconstruisez le projet après les corrections`);
  }
}

// Fonction pour compter les fichiers HTML
function countHtmlFiles(dirPath) {
  let count = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        count += countHtmlFiles(fullPath);
      } else if (item === 'index.html') {
        count++;
      }
    }
  } catch (error) {
    // Ignorer les erreurs de lecture
  }
  
  return count;
}

// Exécution
if (require.main === module) {
  const isValid = validateCanonicalUrls();
  showSummary();
  
  if (!isValid) {
    process.exit(1);
  }
}

module.exports = { validateCanonicalUrls, extractCanonicalUrl };
