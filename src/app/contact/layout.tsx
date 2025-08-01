import { Metadata } from 'next';
import { contact } from '@/resources/content';
import { baseURL } from '@/resources';
import { routeImages } from '@/resources/routeImages';

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  alternates: {
    canonical: `${baseURL}${contact.path}`,
  },
  openGraph: {
    title: contact.title,
    description: contact.description,
    images: [routeImages['/contact'] || routeImages['/']],
    type: 'website',
    url: `${baseURL}${contact.path}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: contact.title,
    description: contact.description,
    images: [routeImages['/contact'] || routeImages['/']],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}