import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  // Articles de blog avec priorité moyenne et mise à jour hebdomadaire
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  // Projets avec haute priorité et mise à jour mensuelle
  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  // Routes principales avec priorités personnalisées
  const activeRoutes = Object.keys(routesConfig).filter((route) => 
    routesConfig[route as keyof typeof routesConfig]
  );

  const routes = activeRoutes.map((route) => {
    let priority = 0.5; // Priorité par défaut
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly'; // Fréquence par défaut

    // Personnalisation des priorités et fréquences selon la route
    switch(route) {
      case '/':
        priority = 1.0;
        changeFrequency = 'daily';
        break;
      case '/about':
        priority = 0.9;
        changeFrequency = 'weekly';
        break;
      case '/work':
        priority = 0.8;
        changeFrequency = 'weekly';
        break;
      case '/blog':
        priority = 0.7;
        changeFrequency = 'daily';
        break;
      case '/contact':
        priority = 0.6;
        changeFrequency = 'monthly';
        break;
    }

    return {
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency,
      priority
    };
  });

  return [...routes, ...blogs, ...works];
}
