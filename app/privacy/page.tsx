import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyPolicy } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy - Junoon",
  description: "How Junoon Wellness collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}
