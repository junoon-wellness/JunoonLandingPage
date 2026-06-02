import type { Variants } from "framer-motion";

// Custom ease retained for any interaction transitions that still use it.
export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// Shared viewport config (kept for API compatibility with section components).
export const VIEWPORT = { once: true, amount: 0.3 } as const;

// Entrance/scroll animations have been removed — content renders in place.
// These variants are intentionally identity (no opacity/transform/transition)
// so nothing fades or slides in.
export const textIn: Variants = { hidden: {}, show: {} };

export const phoneIn: Variants = { hidden: {}, show: {} };

export const fadeUp: Variants = { hidden: {}, show: {} };

export const stagger = (_staggerChildren = 0.1, _delayChildren = 0): Variants => ({
  hidden: {},
  show: {},
});
