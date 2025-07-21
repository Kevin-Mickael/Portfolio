import { Posts } from "@/components/blog/Posts";
import { getPosts } from '@/utils/utils';
import FAQ, { faqJsonLd } from "@/components/FAQ";
import AppIntegrationClient from '@/components/AppIntegrationClient';
import CuteQuote from '@/components/CuteQuote';

export async function generateMetadata() {
  return {
    title: "Création de site web professionnel à Maurice | Portfolio web",
    description: "Développeur web professionnel à Maurice spécialisé dans la création de sites web et portfolios optimisés SEO. Augmentez votre visibilité en ligne et attirer plus de clients avec un site moderne et performant.",
    twitter: {
      title: "Création de site web professionnel à Maurice | Portfolio web",
      description: "Développeur web professionnel à Maurice spécialisé dans la création de sites web et portfolios optimisés SEO. Augmentez votre visibilité en ligne et attirer plus de clients avec un site moderne et performant.",
    },
    other: {
      'script[type="application/ld+json"]': JSON.stringify(faqJsonLd),
    }
  };
}

export default function Home() {
  return (
    <div>
      <FAQ />
      <Posts />
      <AppIntegrationClient />
      <CuteQuote />
    </div>
  );
} 