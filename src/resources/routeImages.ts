// Mapping des routes/pages vers leurs images statiques pour un SEO optimal
// Utiliser toujours des chemins root-based (ex: /images/home.jpg)

export const routeImages: Record<string, string> = {
  '/': '/favicon.png',
  '/about': '/favicon.png',
  '/work': '/favicon.png',
  '/blog': '/favicon.png',
  '/contact': '/favicon.png',
  '/cgu': '/favicon.png',
  '/confidentialite': '/favicon.png',
  // Ajouter d'autres routes si besoin
};

// Pour les pages dynamiques (blog/[slug], work/[slug]),
// l'image doit être définie dans le frontmatter du .mdx ou dans le mapping spécifique si besoin. 