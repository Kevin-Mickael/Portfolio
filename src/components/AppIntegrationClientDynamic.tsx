"use client";
import dynamic from 'next/dynamic';

const AppIntegrationClient = dynamic(() => import('@/components/AppIntegrationClient'), {
  ssr: false,
  loading: () => <div style={{ height: '400px' }} />,
});

export default function AppIntegrationClientDynamic() {
  return <AppIntegrationClient />;
} 