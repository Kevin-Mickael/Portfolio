const fs = require('fs');
const path = require('path');
const { generateSitemap } = require('./generate-sitemap');
const { validateSitemap } = require('./validate-sitemap');

async function runTests() {
  console.log('🧪 Tests du système de sitemap...\n');
  
  let allTestsPassed = true;
  
  // Test 1: Génération du sitemap
  console.log('📝 Test 1: Génération du sitemap');
  try {
    const result = await generateSitemap();
    if (result) {
      console.log('✅ Génération réussie');
    } else {
      console.log('❌ Échec de la génération');
      allTestsPassed = false;
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la génération: ${error.message}`);
    allTestsPassed = false;
  }
  
  // Test 2: Validation du sitemap
  console.log('\n🔍 Test 2: Validation du sitemap');
  try {
    const isValid = validateSitemap();
    if (isValid) {
      console.log('✅ Validation réussie');
    } else {
      console.log('❌ Échec de la validation');
      allTestsPassed = false;
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la validation: ${error.message}`);
    allTestsPassed = false;
  }
  
  // Test 3: Vérification du fichier
  console.log('\n📁 Test 3: Vérification du fichier');
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const stats = fs.statSync(sitemapPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ Fichier existe (${sizeKB} KB)`);
    
    // Vérification du contenu
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    if (content.includes('<?xml') && content.includes('<urlset')) {
      console.log('✅ Structure XML valide');
    } else {
      console.log('❌ Structure XML invalide');
      allTestsPassed = false;
    }
  } else {
    console.log('❌ Fichier sitemap non trouvé');
    allTestsPassed = false;
  }
  
  // Test 4: Vérification des URLs
  console.log('\n🔗 Test 4: Vérification des URLs');
  try {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    const urlMatches = content.match(/<loc>https:\/\/creativfolio\.com[^<]+<\/loc>/g);
    if (urlMatches && urlMatches.length > 0) {
      console.log(`✅ ${urlMatches.length} URLs trouvées`);
      
      // Vérification des URLs spécifiques
      const requiredUrls = ['/', '/about', '/work', '/blog', '/contact'];
      const missingUrls = requiredUrls.filter(url => 
        !content.includes(`<loc>https://creativfolio.com${url}</loc>`)
      );
      
      if (missingUrls.length === 0) {
        console.log('✅ Toutes les URLs principales présentes');
      } else {
        console.log(`❌ URLs manquantes: ${missingUrls.join(', ')}`);
        allTestsPassed = false;
      }
    } else {
      console.log('❌ Aucune URL trouvée');
      allTestsPassed = false;
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la vérification des URLs: ${error.message}`);
    allTestsPassed = false;
  }
  
  // Résumé
  console.log('\n📊 Résumé des tests:');
  if (allTestsPassed) {
    console.log('🎉 Tous les tests sont passés ! Le sitemap est prêt pour la production.');
  } else {
    console.log('⚠️  Certains tests ont échoué. Veuillez corriger les problèmes avant le déploiement.');
  }
  
  return allTestsPassed;
}

// Exécution
if (require.main === module) {
  runTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Erreur fatale:', error.message);
      process.exit(1);
    });
}

module.exports = { runTests }; 