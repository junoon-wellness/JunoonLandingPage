"use client";

import { motion } from "framer-motion";
import MonoLabel from "@/components/ui/MonoLabel";
import Placeholder from "@/components/ui/Placeholder";
import { fadeUp, stagger, VIEWPORT } from "@/lib/animations";
import { clean, lines } from "@/lib/text";
import { teachers } from "@/content";

export default function TeachersSection() {
  return (
    <section id="teachers" className="px-8 py-24 sm:px-12 lg:px-16 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="max-w-xl"
      >
        <MonoLabel>{teachers.monoLabel}</MonoLabel>
        <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.15] text-bark lg:text-5xl">
          {lines(teachers.headline).map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-5 font-sans text-base leading-relaxed text-soil">
          {clean(teachers.body)}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.1)}
        className="mt-14 grid gap-8 sm:grid-cols-3"
      >
        {teachers.items.map((teacher, i) => {
          const isPlaceholder = teacher.name.startsWith("PLACEHOLDER");
          const initials = isPlaceholder ? `T${i + 1}` : initialsOf(teacher.name);
          return (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
              {/* Clay circle placeholder with initials, per placeholder policy */}
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full bg-clay font-serif text-2xl text-ivory ${
                  isPlaceholder ? "border-2 border-dashed border-clay/40" : ""
                }`}
              >
                {initials}
              </div>
              <div className="mt-4 flex flex-col items-center gap-2">
                {isPlaceholder ? (
                  <>
                    <Placeholder>[Teacher name - add before launch]</Placeholder>
                    <Placeholder>[Role / bio - add before launch]</Placeholder>
                  </>
                ) : (
                  <>
                    <p className="font-sans text-base font-medium text-bark">{teacher.name}</p>
                    <p className="font-sans text-sm text-driftwood">{clean(teacher.role)}</p>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
