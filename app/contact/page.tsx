import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/cta/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Junoon",
  description: "Get in touch with the Junoon Wellness team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-14 text-bark sm:px-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-baseline gap-1 font-serif text-2xl font-light text-bark transition-colors hover:text-clay"
        >
          Junoon<span className="text-clay">.</span>
        </Link>

        <header className="mt-10 border-b border-linen pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-driftwood">Support</p>
          <h1 className="mt-3 font-serif text-4xl font-normal leading-tight">Contact Us</h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-soil">
            Have a question, feedback, or need help with the Junoon app? Fill out the form below and we&apos;ll get back to you.
          </p>
        </header>

        <div className="mt-8">
          <ContactForm />
        </div>

        <footer className="mt-12 border-t border-linen pt-8">
          <p className="font-sans text-sm text-driftwood">
            You can also reach us directly at{" "}
            <a
              href="mailto:admin@junoonwellness.com"
              className="text-clay underline underline-offset-2 hover:text-clay700"
            >
              admin@junoonwellness.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
