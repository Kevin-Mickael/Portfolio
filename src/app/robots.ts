import { baseURL } from "@/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/blog", "/work", "/contact"],
        disallow: [
          "/api/*",  // Protéger les endpoints API
          "/_next/*", // Protéger les fichiers système Next.js
          "/static/*", // Protéger les ressources statiques
          "/admin/*", // Protéger les zones d'administration
          "/private/*", // Protéger les zones privées
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
