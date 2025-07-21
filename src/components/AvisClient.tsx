"use client";
import dynamic from 'next/dynamic';

const Avis = dynamic(() => import('@/components/Avis'), {
  ssr: false,
  loading: () => <div style={{ height: '400px' }} />,
});

export default function AvisClient() {
  return <Avis />;
} 