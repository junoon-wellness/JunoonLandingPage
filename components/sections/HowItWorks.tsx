"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import { fadeUp, stagger, VIEWPORT } from "@/lib/animations";
import { clean } from "@/lib/text";
import { howItWorks } from "@/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-8 py-24 sm:px-12 lg:px-16 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="max-w-xl"
      >
        <MonoLabel>{howItWorks.monoLabel}</MonoLabel>
        <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.15] text-bark lg:text-5xl">
          {clean(howItWorks.headline)}
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.1)}
        className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10"
      >
        {howItWorks.steps.map((step) => (
          <motion.div key={step.number} variants={fadeUp} className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 left-0 font-serif text-[5rem] leading-none text-clay/20"
            >
              {step.number}
            </span>
            <div className="relative pt-8">
              <h3 className="font-sans text-xl font-medium text-bark">{step.title}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-driftwood">
                {clean(step.body)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
