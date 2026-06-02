"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import BrandCard from "@/components/ui/BrandCard";
import { Icon } from "@/components/ui/icons";
import { fadeUp, stagger, VIEWPORT } from "@/lib/animations";
import { clean, lines } from "@/lib/text";
import { pillars } from "@/content";

export default function PillarsSection() {
  return (
    <section className="bg-canvas px-8 py-24 sm:px-12 lg:px-16 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="max-w-xl"
      >
        <MonoLabel>{pillars.monoLabel}</MonoLabel>
        <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.15] text-bark lg:text-5xl">
          {lines(pillars.headline).map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.1)}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {pillars.items.map((item) => (
          <motion.div key={item.label} variants={fadeUp}>
            <BrandCard className="h-full p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-clayLight text-clay">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-5 font-sans text-xl font-medium text-bark">{item.label}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-driftwood">
                {clean(item.body)}
              </p>
            </BrandCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
