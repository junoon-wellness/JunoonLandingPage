"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import { fadeUp, stagger, VIEWPORT } from "@/lib/animations";
import { clean } from "@/lib/text";
import { testimonials } from "@/content";

export default function TestimonialsSection() {
  return (
    <section className="bg-canvas px-8 py-24 sm:px-12 lg:px-16 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="max-w-xl"
      >
        <MonoLabel>{testimonials.monoLabel}</MonoLabel>
        <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.15] text-bark lg:text-5xl">
          {clean(testimonials.headline)}
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.1)}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {testimonials.items.map((item, i) => {
          const isPlaceholder = item.quote.startsWith("PLACEHOLDER");
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`rounded-lg p-8 ${
                isPlaceholder
                  ? "border-2 border-dashed border-clay/40 bg-linen/50"
                  : "border border-linen bg-warmWhite shadow-card"
              }`}
            >
              {isPlaceholder ? (
                <p className="font-serif text-xl italic text-driftwood">Quote to be added</p>
              ) : (
                <>
                  <p className="font-serif text-xl italic text-bark">“{clean(item.quote)}”</p>
                  <p className="mt-4 font-sans text-sm font-medium text-soil">{item.name}</p>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
