import type { Config } from "tailwindcss";
import { colors, radii, shadows } from "./brand-tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: colors.clay,
        clay700: colors.clay700,
        clayLight: colors.clayLight,
        saffron: colors.saffron,
        turmeric: colors.turmeric,
        ivory: colors.ivory,
        cream: colors.cream,
        canvas: colors.canvas,
        bark: colors.bark,
        soil: colors.soil,
        driftwood: colors.driftwood,
        linen: colors.linen,
        warmWhite: colors.warmWhite,
        sage: colors.sage,
        moss: colors.moss,
        indigo: colors.indigo,
        midnight: colors.midnight,
        blush: colors.blush,
        success: colors.success,
        error: colors.error,
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      boxShadow: {
        card: shadows.card,
        button: shadows.button,
        deep: shadows.deep,
        phone: shadows.phone,
      },
      borderRadius: {
        sm: radii.sm,
        md: radii.md,
        lg: radii.lg,
        xl: radii.xl,
        full: radii.full,
      },
    },
  },
  plugins: [],
};

export default config;
