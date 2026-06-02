"use client";

import { motion } from "framer-motion";
import Placeholder from "@/components/ui/Placeholder";
import { fadeUp, VIEWPORT } from "@/lib/animations";
import { clean } from "@/lib/text";
import { footer } from "@/content";

export default function FooterSection() {
  return (
    <footer className="bg-bark px-8 py-16 sm:px-12 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="flex flex-col gap-8"
      >
        <p className="font-serif text-2xl font-light text-ivory">
          {clean(footer.tagline)}
        </p>

        <div className="flex flex-wrap gap-3">
          <Placeholder className="!text-driftwood">[Privacy Policy - URL needed]</Placeholder>
          <Placeholder className="!text-driftwood">[Terms of Service - URL needed]</Placeholder>
          <Placeholder className="!text-driftwood">
            [contact@junoonwellness.com - confirm address]
          </Placeholder>
          {footer.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-driftwood underline-offset-4 transition-colors hover:text-ivory hover:underline"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-driftwood">{footer.copyright}</p>
      </motion.div>
    </footer>
  );
}
