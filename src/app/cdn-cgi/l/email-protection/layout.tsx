import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirection - Créativfolio',
  description: 'Page de redirection automatique vers notre page de contact.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function EmailProtectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
