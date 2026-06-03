import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsOfService } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Terms of Service - Junoon",
  description: "The terms governing your use of the Junoon app and services.",
};

export default function TermsPage() {
  return <LegalDocument doc={termsOfService} />;
}
