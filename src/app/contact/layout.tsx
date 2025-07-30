import { Metadata } from 'next';
import { contact } from '@/resources/content';
import { baseURL } from '@/resources';

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  alternates: {
    canonical: `${baseURL}${contact.path}`,
  },
  openGraph: {
    title: contact.title,
    description: contact.description,
    type: 'website',
    url: `${baseURL}${contact.path}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: contact.title,
    description: contact.description,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}