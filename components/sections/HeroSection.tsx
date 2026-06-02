"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import { fadeUp, stagger, VIEWPORT } from "@/lib/animations";
import { clean } from "@/lib/text";
import { hero } from "@/content";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center px-8 py-24 sm:px-12 lg:px-16"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.12)}
        className="max-w-xl"
      >
        <motion.div variants={fadeUp}>
          <MonoLabel large>{hero.monoLabel}</MonoLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-5xl font-normal leading-[1.1] text-bark lg:text-6xl"
        >
          {clean(hero.headline)}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 font-sans text-lg leading-relaxed text-soil"
        >
          {clean(hero.body)}
        </motion.p>
      </motion.div>
    </section>
  );
}
