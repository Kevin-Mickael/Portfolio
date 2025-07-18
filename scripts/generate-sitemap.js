const fs = require('fs');
const path = require('path');

const baseURL = 'https://creativfolio.com';

// Pages principales
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.9, changefreq: 'weekly' },
  { url: '/work', priority: 0.8, changefreq: 'weekly' },
  { url: '/blog', priority: 0.7, changefreq: 'daily' },
  { url: '/contact', priority: 0.6, changefreq: 'monthly' },
  { url: '/confidentialite', priority: 0.5, changefreq: 'monthly' },
  { url: '/cgu', priority: 0.5, changefreq: 'monthly' },
];

// Helper pour lire les métadonnées d'un fichier MDX
function getMetaFromMDX(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/publishedAt:\s*"([^"]+)"/);
  return match ? match[1] : null;
}

// Blog posts
const blogDir = path.join(__dirname, '../src/app/blog/posts');
const blogPosts = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.mdx'))
  .map(f => {
    const slug = f.replace(/\.mdx$/, '');
    const publishedAt = getMetaFromMDX(path.join(blogDir, f));
    return {
      url: `/blog/${slug}`,
      lastmod: publishedAt,
      priority: 0.7,
      changefreq: 'weekly',
    };
  });

// Projects
const workDir = path.join(__dirname, '../src/app/work/projects');
const workPosts = fs.readdirSync(workDir)
  .filter(f => f.endsWith('.mdx'))
  .map(f => {
    const slug = f.replace(/\.mdx$/, '');
    const publishedAt = getMetaFromMDX(path.join(workDir, f));
    return {
      url: `/work/${slug}`,
      lastmod: publishedAt,
      priority: 0.8,
      changefreq: 'monthly',
    };
  });

const urls = [
  ...staticPages,
  ...blogPosts,
  ...workPosts,
];

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

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap, 'utf-8');
console.log('✅ Sitemap généré dans public/sitemap.xml');

// Appel automatique à IndexNow après génération du sitemap
(async () => {
  try {
    const res = await fetch('https://creativfolio.com/api/indexnow', {
      method: 'GET',
    });
    if (res.ok) {
      console.log('🚀 IndexNow notifié avec succès !');
    } else {
      console.error('❌ Erreur lors de la notification IndexNow:', await res.text());
    }
  } catch (e) {
    console.error('❌ Exception lors de la notification IndexNow:', e);
  }
})(); 