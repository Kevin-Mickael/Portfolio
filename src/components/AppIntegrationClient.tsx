"use client";
import dynamic from "next/dynamic";

const AppIntegration = dynamic(() => import("./Web"), { ssr: false });
 
export default function AppIntegrationClient() {
  return <AppIntegration />;
} 