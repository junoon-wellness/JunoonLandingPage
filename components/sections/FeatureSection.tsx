"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { textIn, phoneIn, VIEWPORT } from "@/lib/animations";
import { clean, lines } from "@/lib/text";

type Feature = {
  id: string;
  monoLabel: string;
  headline: string;
  body: string;
  bullets: string[];
  screenshot: { file: string; alt: string; status: string };
};

export default function FeatureSection({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  // Odd sections (1st, 3rd...) text left; even sections phone left.
  const reversed = index % 2 === 1;
  const isPlaceholder = feature.screenshot.status.includes("PLACEHOLDER");

  return (
    <section
      id={feature.id}
      className="grid min-h-screen items-center gap-12 px-8 py-24 sm:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16"
    >
      {/* Text block */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={textIn}
        className={reversed ? "lg:order-2" : "lg:order-1"}
      >
        <MonoLabel>{feature.monoLabel}</MonoLabel>
        <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.15] text-bark lg:text-[2.5rem]">
          {lines(feature.headline).map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-soil">
          {clean(feature.body)}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {feature.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay"
              />
              <span className="font-sans text-base text-soil">{clean(bullet)}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={phoneIn}
        className={`flex justify-center ${reversed ? "lg:order-1" : "lg:order-2"}`}
      >
        <PhoneFrame
          src={`/screenshots/${feature.screenshot.file}`}
          alt={feature.screenshot.alt}
          label={feature.id}
          placeholder={isPlaceholder}
        />
      </motion.div>
    </section>
  );
}
