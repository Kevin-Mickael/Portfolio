const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const baseURL = 'https://creativfolio.com';
const outputDir = path.join(__dirname, '../public');
const contentDir = path.join(__dirname, '../src/app');

// Helper pour formater la date
function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

// Fonction pour récupérer les métadonnées d'un fichier MDX
function getMetaFromMDX(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const publishedAtMatch = content.match(/publishedAt:\s*"([^"]+)"/);
    const lastUpdatedAtMatch = content.match(/lastUpdatedAt:\s*"([^"]+)"/);
    
    return {
      lastmod: lastUpdatedAtMatch ? formatDate(lastUpdatedAtMatch[1]) : (publishedAtMatch ? formatDate(publishedAtMatch[1]) : null),
    };
  } catch (e) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, e);
    return { lastmod: null };
  }
}

async function generateSitemap() {
  // Pages statiques
  const staticPages = (await glob('**/page.tsx', { cwd: contentDir }))
    .map(p => {
      const isHome = p === 'page.tsx';
      let url = isHome ? '/' : `/${p.replace(/\/page\.tsx$/, '')}`;
      url = url.replace(/\[slug\]/g, '*'); // Remplace les slugs dynamiques par un wildcard
      
      const priority = isHome ? 1.0 : (url.includes('/blog') || url.includes('/work') ? 0.8 : 0.7);
      const changefreq = isHome ? 'daily' : 'weekly';

      const filePath = path.join(contentDir, p);
      const stats = fs.statSync(filePath);
      
      return { url, priority, changefreq, lastmod: formatDate(stats.mtime) };
    })
    .filter(p => !p.url.includes('*')); // Exclut les routes dynamiques de base

  // Contenus dynamiques (blog et projets)
  const dynamicContent = ['blog/posts', 'work/projects'].flatMap(dir => {
    const fullDir = path.join(contentDir, dir);
    if (!fs.existsSync(fullDir)) return [];

    return fs.readdirSync(fullDir)
      .filter(f => f.endsWith('.mdx'))
      .map(f => {
        const slug = f.replace(/\.mdx$/, '');
        const meta = getMetaFromMDX(path.join(fullDir, f));
        return {
          url: `/${dir.split('/')[0]}/${slug}`,
          lastmod: meta.lastmod,
          priority: 0.9,
          changefreq: 'weekly',
        };
      });
  });
  
  const urls = [...staticPages, ...dynamicContent];

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => {
      let xml = `  <url>\n    <loc>${baseURL}${u.url}</loc>`;
      if (u.lastmod) xml += `\n    <lastmod>${u.lastmod}</lastmod>`;
      if (u.priority) xml += `\n    <priority>${u.priority}</priority>`;
      if (u.changefreq) xml += `\n    <changefreq>${u.changefreq}</changefreq>`;
      xml += '\n  </url>';
      return xml;
    }),
    '</urlset>'
  ].join('\n');

  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf-8');
  console.log(`✅ Sitemap généré dans ${outputDir}/sitemap.xml`);

  // Appel à IndexNow
  try {
    const res = await fetch(`${baseURL}/api/indexnow`);
    if (res.ok) {
      console.log('🚀 IndexNow notifié avec succès !');
    } else {
      console.error('❌ Erreur lors de la notification IndexNow:', await res.text());
    }
  } catch (e) {
    console.error('❌ Exception lors de la notification IndexNow:', e);
  }
}

generateSitemap(); 