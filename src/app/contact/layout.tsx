import { Metadata } from "next";
import { contact } from "@/resources/content";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description: contact.description,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}