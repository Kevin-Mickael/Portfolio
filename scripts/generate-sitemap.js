const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  baseURL: 'https://creativfolio.com',
  outputPath: path.join(__dirname, '../public/sitemap.xml'),
  blogDir: path.join(__dirname, '../src/app/blog/posts'),
  workDir: path.join(__dirname, '../src/app/work/projects'),
  maxUrls: 50000, // Limite recommandée par Google
  maxFileSize: 50 * 1024 * 1024, // 50MB max
};

// Pages principales avec métadonnées SEO
const staticPages = [
  { 
    url: '/', 
    priority: 1.0, 
    changefreq: 'daily',
    lastmod: new Date().toISOString().split('T')[0] // Date d'aujourd'hui
  },
  { 
    url: '/about', 
    priority: 0.9, 
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/work', 
    priority: 0.8, 
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/blog', 
    priority: 0.7, 
    changefreq: 'daily',
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/contact', 
    priority: 0.6, 
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/confidentialite', 
    priority: 0.5, 
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/cgu', 
    priority: 0.5, 
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
];

// Validation des URLs
function validateURL(url) {
  if (!url || typeof url !== 'string') return false;
  if (!url.startsWith('/')) return false;
  if (url.length > 2048) return false; // Limite recommandée
  return true;
}

// Validation des priorités
function validatePriority(priority) {
  return priority >= 0.0 && priority <= 1.0;
}

// Validation des changefreq
const validChangefreq = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

function validateChangefreq(changefreq) {
  return validChangefreq.includes(changefreq);
}

// Helper pour lire les métadonnées d'un fichier MDX de manière robuste
function getMetaFromMDX(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Fichier non trouvé: ${filePath}`);
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Recherche de publishedAt avec regex plus robuste
    const publishedAtMatch = content.match(/publishedAt:\s*["']([^"']+)["']/);
    if (publishedAtMatch) {
      const date = publishedAtMatch[1];
      // Validation basique de la date
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
    }

    // Si pas de publishedAt, utiliser la date de modification du fichier
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture de ${filePath}:`, error.message);
    return null;
  }
}

// Fonction pour scanner les fichiers MDX d'un répertoire
function scanMDXFiles(dirPath, urlPrefix, priority, changefreq) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.warn(`⚠️  Répertoire non trouvé: ${dirPath}`);
      return [];
    }

    const files = fs.readdirSync(dirPath);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));

    return mdxFiles.map(f => {
      const slug = f.replace(/\.mdx$/, '');
      const filePath = path.join(dirPath, f);
      const lastmod = getMetaFromMDX(filePath);
      
      return {
        url: `${urlPrefix}/${slug}`,
        lastmod,
        priority,
        changefreq,
      };
    }).filter(item => validateURL(item.url));
  } catch (error) {
    console.error(`❌ Erreur lors du scan de ${dirPath}:`, error.message);
    return [];
  }
}

// Fonction pour générer le XML du sitemap
function generateSitemapXML(urls) {
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  urls.forEach(url => {
    if (!validateURL(url.url)) {
      console.warn(`⚠️  URL invalide ignorée: ${url.url}`);
      return;
    }

    let xml = `  <url>\n    <loc>${config.baseURL}${url.url}</loc>`;
    
    if (url.lastmod) {
      xml += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.priority && validatePriority(url.priority)) {
      xml += `\n    <priority>${url.priority}</priority>`;
    }
    
    if (url.changefreq && validateChangefreq(url.changefreq)) {
      xml += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    xml += '\n  </url>';
    xmlLines.push(xml);
  });

  xmlLines.push('</urlset>');
  return xmlLines.join('\n');
}

// Fonction principale
async function generateSitemap() {
  console.log('🚀 Génération du sitemap...');
  
  try {
    // Validation de la configuration
    if (!config.baseURL || !config.baseURL.startsWith('http')) {
      throw new Error('URL de base invalide');
    }

    // Scan des fichiers
    console.log('📁 Scan des pages statiques...');
    const staticUrls = staticPages.filter(page => validateURL(page.url));

    console.log('📝 Scan des articles de blog...');
    const blogPosts = scanMDXFiles(config.blogDir, '/blog', 0.7, 'weekly');

    console.log('💼 Scan des projets...');
    const workPosts = scanMDXFiles(config.workDir, '/work', 0.8, 'monthly');

    // Combinaison de toutes les URLs
    const allUrls = [...staticUrls, ...blogPosts, ...workPosts];

    // Validation du nombre d'URLs
    if (allUrls.length > config.maxUrls) {
      console.warn(`⚠️  Nombre d'URLs (${allUrls.length}) dépasse la limite recommandée (${config.maxUrls})`);
    }

    // Génération du XML
    const sitemapXML = generateSitemapXML(allUrls);

    // Validation de la taille du fichier
    const fileSize = Buffer.byteLength(sitemapXML, 'utf8');
    if (fileSize > config.maxFileSize) {
      throw new Error(`Taille du sitemap (${fileSize} bytes) dépasse la limite (${config.maxFileSize} bytes)`);
    }

    // Écriture du fichier
    fs.writeFileSync(config.outputPath, sitemapXML, 'utf-8');
    
    console.log(`✅ Sitemap généré avec succès !`);
    console.log(`📊 Statistiques:`);
    console.log(`   - URLs totales: ${allUrls.length}`);
    console.log(`   - Pages statiques: ${staticUrls.length}`);
    console.log(`   - Articles de blog: ${blogPosts.length}`);
    console.log(`   - Projets: ${workPosts.length}`);
    console.log(`   - Taille du fichier: ${(fileSize / 1024).toFixed(2)} KB`);
    console.log(`📁 Fichier: ${config.outputPath}`);

    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error.message);
    process.exit(1);
  }
}

// Notification IndexNow (optionnelle)
async function notifyIndexNow() {
  try {
    console.log('🔔 Notification IndexNow...');
    const response = await fetch(`${config.baseURL}/api/indexnow`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Sitemap-Generator/1.0'
      }
    });
    
    if (response.ok) {
      console.log('✅ IndexNow notifié avec succès !');
    } else {
      console.warn(`⚠️  Erreur IndexNow: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.warn('⚠️  Impossible de notifier IndexNow:', error.message);
  }
}

// Exécution
if (require.main === module) {
  generateSitemap()
    .then(success => {
      if (success) {
        return notifyIndexNow();
      }
    })
    .catch(error => {
      console.error('❌ Erreur fatale:', error.message);
      process.exit(1);
    });
}

module.exports = { generateSitemap, config }; 