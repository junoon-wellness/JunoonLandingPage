"use client";

import { motion } from "framer-motion";
import LogoLockup from "./LogoLockup";
import WaitlistForm from "./WaitlistForm";
import MonoLabel from "@/components/ui/MonoLabel";
import Placeholder from "@/components/ui/Placeholder";
import { fadeUp, stagger } from "@/lib/animations";
import { clean, lines } from "@/lib/text";
import { ctaPanel } from "@/content";

export default function CTAPanel({
  subscriberCount,
}: {
  subscriberCount?: number | null;
}) {
  const headlineLines = lines(ctaPanel.headline);
  // Use the live beehiiv count when available, otherwise fall back to static copy.
  const proofCount =
    typeof subscriberCount === "number"
      ? subscriberCount.toLocaleString()
      : ctaPanel.socialProof.count;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger(0.15)}
      className="flex min-h-screen flex-col gap-8 px-8 py-12 sm:px-12 lg:h-screen lg:overflow-y-auto lg:px-14 lg:py-14"
    >
      <motion.div variants={fadeUp}>
        <LogoLockup />
      </motion.div>

      <motion.div variants={fadeUp}>
        <MonoLabel>{ctaPanel.monoLabel}</MonoLabel>
      </motion.div>

      <h1 className="font-serif text-5xl font-light leading-[1.1] text-ivory lg:text-[3.5rem]">
        {headlineLines.map((line, i) => (
          <motion.span key={i} variants={fadeUp} className="block">
            {line}
          </motion.span>
        ))}
      </h1>

      <motion.p variants={fadeUp} className="max-w-md font-sans text-base leading-relaxed text-driftwood">
        {clean(ctaPanel.subheadline)}
      </motion.p>

      <motion.div variants={fadeUp} className="max-w-md">
        <WaitlistForm />
      </motion.div>

      <motion.p variants={fadeUp} className="font-mono text-xs text-driftwood">
        <span className="text-ivory">{proofCount}</span>{" "}
        {ctaPanel.socialProof.label}
      </motion.p>

      <motion.p variants={fadeUp} className="font-sans text-sm text-driftwood">
        {ctaPanel.appStore.note}
      </motion.p>

      {/* Footer links pinned to the bottom of the panel */}
      <motion.div
        variants={fadeUp}
        className="mt-auto flex flex-wrap gap-3 pt-6 font-sans text-xs text-driftwood"
      >
        <Placeholder>[Privacy Policy - add link before launch]</Placeholder>
        <Placeholder>[Terms of Service - add link before launch]</Placeholder>
      </motion.div>
    </motion.div>
  );
}
