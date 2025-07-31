import mdx from "@next/mdx";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    // Configuration pour la production (export statique)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    domains: [
      'pages.dev',
      'vercel.app',
      'netlify.app',
      'github.io',
      'raw.githubusercontent.com',
      'images.unsplash.com',
      'cdn.jsdelivr.net',
      'res.cloudinary.com',
      'yt3.googleusercontent.com',
      'encrypted-tbn0.gstatic.com',
      'www.ivotoro.mg',
      'themewagon.github.io',
      'creativfolio.com',
      'localhost',
      '127.0.0.1',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'media.licdn.com',
      's3.amazonaws.com',
      'storage.googleapis.com',
      'firebasestorage.googleapis.com',
      'placehold.co',
      'dummyimage.com',
      'placekitten.com',
      'placeimg.com',
      'images.pexels.com',
      'images.ctfassets.net',
      'static.wixstatic.com',
      'assets.website-files.com',
      'img.shields.io',
      'api.iconify.design',
      'avatars.githubusercontent.com',
      'avatars.dicebear.com',
      'cdn.pixabay.com',
      'images.freeimages.com',
      'img.icons8.com',
      'cdn.dribbble.com',
      'cdn.behance.net',
      'images.squarespace-cdn.com',
      'images.prismic.io',
      'images.contentful.com',
      'cdn.shopify.com',
      'static-cdn.jtvnw.net',
      'media.giphy.com',
      'media.tenor.com',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimisations générales
  poweredByHeader: false,
  compress: true,
  // Optimisations pour Cloudflare
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@once-ui-system/core'],
  },
  // Cache et performance
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 heure
    pagesBufferLength: 5,
  },
  // Timeout plus long pour le développement
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    // Optimisations pour la production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  // Gestion des erreurs de build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configuration optimisée pour Cloudflare Pages
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

export default withBundle(withMDX(nextConfig));
