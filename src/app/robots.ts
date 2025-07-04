import { baseURL } from "@/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/blog", "/work", "/gallery", "/contact"],
        disallow: [
          "/api/*",  // Protéger les endpoints API
          "/_next/*", // Protéger les fichiers système Next.js
          "/static/*", // Protéger les ressources statiques
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
