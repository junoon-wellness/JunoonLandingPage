import type { Metadata } from "next";
import NavV2 from "@/components/waitlist/NavV2";
import FooterV2 from "@/components/waitlist/FooterV2";
import ContactForm from "@/components/cta/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Junoon",
  description: "Get in touch with the Junoon Wellness team.",
};

/**
 * ⚠️ This route is registered as the app's App Store SUPPORT URL. Keep it.
 *
 * LV5-074 (website refresh): moved from the old cream page onto the site's
 * two schemes, with the site nav and footer. Same words. The form's light
 * Tailwind chrome is re-pointed at the theme tokens by the `.ab-contact-inner`
 * rules in globals.css (shared with the About page's contact section).
 */
export default function ContactPage() {
  return (
    <div id="top">
      <NavV2 />
      <main className="rf-doc">
        <header className="rf-doc-head">
          <h1 className="rf-doc-title">Contact Us</h1>
          <p className="rf-doc-sub">
            Have a question, feedback, or need help with the Junoon app? Fill out the form below and
            we&apos;ll get back to you.
          </p>
        </header>

        <div className="ab-contact-inner" style={{ marginTop: "32px", maxWidth: "none" }}>
          <ContactForm />
        </div>

        <p style={{ marginTop: "40px" }}>
          You can also reach us directly at{" "}
          <a href="mailto:admin@junoonwellness.com">admin@junoonwellness.com</a>
        </p>
      </main>
      <FooterV2 />
    </div>
  );
}
