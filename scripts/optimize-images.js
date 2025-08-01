const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public'),
  outputDir: path.join(__dirname, '../public/optimized'),
  quality: 85,
  sizes: [192, 512], // Taille standard pour les icônes
  formats: ['webp', 'png'],
  maxSize: 100 * 1024, // 100KB max pour les favicons
};

// Vérifier si ImageMagick est installé
function checkImageMagick() {
  try {
    execSync('convert -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ ImageMagick n\'est pas installé. Installez-le avec:');
    console.error('   Ubuntu/Debian: sudo apt-get install imagemagick');
    console.error('   macOS: brew install imagemagick');
    return false;
  }
}

// Optimiser une image
function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, height, quality = config.quality, format = 'png' } = options;
  
  try {
    let command = `convert "${inputPath}"`;
    
    if (width && height) {
      command += ` -resize ${width}x${height}`;
    }
    
    if (format === 'webp') {
      command += ` -quality ${quality}`;
    } else {
      command += ` -quality ${quality} -strip`;
    }
    
    command += ` "${outputPath}"`;
    
    console.log(`🔄 Optimisation: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    execSync(command, { stdio: 'ignore' });
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    console.log(`   ${formatBytes(inputSize)} -> ${formatBytes(outputSize)} (${reduction}% de réduction)`);
    
    return outputSize;
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${inputPath}:`, error.message);
    return null;
  }
}

// Formater les bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Créer les dossiers nécessaires
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Optimiser les favicons
function optimizeFavicons() {
  console.log('🚀 Optimisation des favicons...');
  
  const faviconPath = path.join(config.inputDir, 'favicon.png');
  
  if (!fs.existsSync(faviconPath)) {
    console.error(`❌ ${faviconPath} n'existe pas`);
    return;
  }
  
  const originalSize = fs.statSync(faviconPath).size;
  console.log(`📁 Fichier original: ${formatBytes(originalSize)}`);
  
  if (originalSize > config.maxSize) {
    console.log(`⚠️  Le fichier dépasse ${formatBytes(config.maxSize)}, optimisation nécessaire`);
    
    // Créer une version optimisée temporaire
    const tempPath = path.join(config.inputDir, 'favicon-temp.png');
    
    // Optimiser en 512x512
    const newSize = optimizeImage(faviconPath, tempPath, {
      width: 512,
      height: 512,
      quality: config.quality
    });
    
    if (newSize && newSize < originalSize) {
      // Backup de l'original
      const backupPath = path.join(config.inputDir, 'favicon-original-backup.png');
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(faviconPath, backupPath);
        console.log(`💾 Backup créé: ${path.basename(backupPath)}`);
      }
      
      // Remplacer l'original par la version optimisée
      fs.renameSync(tempPath, faviconPath);
      console.log(`✅ Favicon optimisé avec succès!`);
      
      // Créer version WebP
      const webpPath = path.join(config.inputDir, 'favicon.webp');
      optimizeImage(faviconPath, webpPath, {
        format: 'webp',
        quality: config.quality
      });
    }
  } else {
    console.log(`✅ Le favicon respecte déjà la limite de taille`);
  }
}

// Optimiser toutes les images du dossier images
function optimizeAllImages() {
  console.log('🚀 Optimisation de toutes les images...');
  
  const imagesDir = path.join(config.inputDir, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.warn('⚠️  Dossier images non trouvé');
    return;
  }
  
  const processDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        processDirectory(itemPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(item)) {
        const size = stats.size;
        
        if (size > 500 * 1024) { // 500KB
          console.log(`⚠️  Image volumineuse détectée: ${item} (${formatBytes(size)})`);
          
          const relativePath = path.relative(config.inputDir, itemPath);
          const outputPath = path.join(itemPath.replace(/\.(png|jpg|jpeg)$/i, '-optimized.$1'));
          
          optimizeImage(itemPath, outputPath, {
            quality: 80
          });
        }
      }
    }
  };
  
  processDirectory(imagesDir);
}

// Générer un rapport d'optimisation
function generateReport() {
  console.log('\n📊 Rapport d\'optimisation:');
  
  const checkFile = (filePath, name) => {
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      const status = size > config.maxSize ? '❌' : '✅';
      console.log(`   ${status} ${name}: ${formatBytes(size)}`);
      return size;
    } else {
      console.log(`   ⚠️  ${name}: Non trouvé`);
      return 0;
    }
  };
  
  const faviconSize = checkFile(path.join(config.inputDir, 'favicon.png'), 'favicon.png');
  const webpSize = checkFile(path.join(config.inputDir, 'favicon.webp'), 'favicon.webp');
  const backupSize = checkFile(path.join(config.inputDir, 'favicon-original-backup.png'), 'Backup original');
  
  if (faviconSize > 0 && backupSize > 0) {
    const reduction = ((backupSize - faviconSize) / backupSize * 100).toFixed(1);
    console.log(`\n💡 Amélioration: ${reduction}% de réduction de taille`);
  }
  
  console.log('\n🔧 Recommandations:');
  if (faviconSize > config.maxSize) {
    console.log('   - Réduisez encore la taille du favicon');
  }
  if (webpSize === 0) {
    console.log('   - Créez une version WebP pour de meilleures performances');
  }
  console.log('   - Utilisez WebP pour les navigateurs modernes');
  console.log('   - Gardez PNG comme fallback pour la compatibilité');
}

// Fonction principale
function main() {
  console.log('🖼️  Optimiseur d\'images - Portfolio Kevin Mickael\n');
  
  if (!checkImageMagick()) {
    process.exit(1);
  }
  
  // Optimiser les favicons en priorité
  optimizeFavicons();
  
  // Optionnel: optimiser toutes les images
  const args = process.argv.slice(2);
  if (args.includes('--all')) {
    optimizeAllImages();
  }
  
  // Générer le rapport
  generateReport();
  
  console.log('\n✅ Optimisation terminée!');
}

// Exécution
if (require.main === module) {
  main();
}

module.exports = {
  optimizeImage,
  optimizeFavicons,
  optimizeAllImages,
  generateReport
};
