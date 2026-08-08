// ============================================================
// JUNOON BRAND TOKENS
// Source of truth - extracted directly from Brand.swift
// Use these everywhere. Do not hardcode hex values inline.
// ============================================================

export const colors = {
  // Core palette
  clay:       "#C4724A",   // primary CTA, links, accents
  clay700:    "#A85E3A",   // pressed/hover state of clay
  clayLight:  "#F4E2D0",   // clay tinted backgrounds
  saffron:    "#D4935A",   // warm secondary accent
  turmeric:   "#E8B870",   // highlight, badges
  ivory:      "#F5F0E8",   // primary button text, on-dark text
  cream:      "#FAF7F2",   // app background (light)
  canvas:     "#EFEBE4",   // slightly deeper background
  bark:       "#2C2118",   // primary text, dark headings
  soil:       "#4A3728",   // secondary dark text
  driftwood:  "#8C7B6B",   // muted/caption text
  linen:      "#EDE8DF",   // card borders, dividers
  warmWhite:  "#FEFCF9",   // card backgrounds
  sage:       "#7B9E87",   // wellness accent, success-adjacent
  moss:       "#5C7A65",   // deeper sage
  indigo:     "#4A5568",   // dark UI elements
  midnight:   "#2D3748",   // darkest UI
  blush:      "#E8C4B8",   // soft accent
  success:    "#27AE60",
  error:      "#C0392B",
} as const;

// ============================================================
// DARK PAGE PALETTE  (junoonwellness.com waitlist landing)
//
// These deliberately DIVERGE from the Brand.swift-derived values above.
// `colors` describes the light in-app theme; the landing page is dark
// end-to-end and uses a deeper, more saturated clay and turmeric so the
// accents hold up against #1C1410. The two are not meant to agree.
//
// The live source of truth for these is the `--jn-*` custom properties in
// app/globals.css. This block exists so TypeScript callers (and Phase 2)
// have the same values without re-eyeballing hexes. Keep them in sync.
// ============================================================
export const darkPage = {
  bg:          "#1C1410",   // --jn-bg          page background
  surface:     "#2C2118",   // --jn-surface     elevated surface, phone bezel
  surfaceDeep: "#4A3728",   // --jn-surface-deep gradient end
  text:        "#F5F0E8",   // --jn-text        primary text
  textDim:     "rgba(245,240,232,0.64)", // --jn-text-dim
  clay:        "#B5522A",   // --jn-clay        eyebrows, rules, primary button
  turmeric:    "#C8902A",   // --jn-turmeric    italic emphasis, active states
  mute:        "#8C7B6B",   // --jn-mute        mono labels
  stone:       "#B5A898",   // --jn-stone       tertiary accent
  gold:        "#D4A96A",   // --jn-gold        footer wordmark
  error:       "#E08A62",   // --jn-error
} as const;

// Semantic aliases - use these in components
export const semantic = {
  background:     colors.cream,
  surface:        colors.warmWhite,
  border:         colors.linen,
  textPrimary:    colors.bark,
  textSecondary:  colors.soil,
  textMuted:      colors.driftwood,
  accent:         colors.clay,
  accentHover:    colors.clay700,
  accentLight:    colors.clayLight,
} as const;

// ============================================================
// TYPOGRAPHY
// Font files are in /fonts/ directory (copy to public/fonts/)
// ============================================================
export const fonts = {
  serif:      "Cormorant Garamond",   // headings, logo, editorial text
  sans:       "DM Sans",              // body, UI, buttons
  mono:       "DM Mono",              // labels, tags, caps text (MONO LABELS always uppercase + letter-spacing)
} as const;

export const typeScale = {
  // Display (hero headline)
  display:    { size: "4.5rem",  lineHeight: "1.1",  font: fonts.serif,  weight: 300 },
  // H1 section headings
  h1:         { size: "3rem",    lineHeight: "1.15", font: fonts.serif,  weight: 400 },
  // H2 sub-section
  h2:         { size: "2rem",    lineHeight: "1.2",  font: fonts.serif,  weight: 400 },
  // H3 card titles
  h3:         { size: "1.25rem", lineHeight: "1.3",  font: fonts.sans,   weight: 500 },
  // Body
  body:       { size: "1rem",    lineHeight: "1.6",  font: fonts.sans,   weight: 400 },
  bodyLg:     { size: "1.125rem",lineHeight: "1.6",  font: fonts.sans,   weight: 400 },
  // Mono label (always uppercase, letter-spacing: 0.1em)
  monoLabel:  { size: "0.625rem",lineHeight: "1",    font: fonts.mono,   weight: 400, transform: "uppercase", letterSpacing: "0.1em" },
  monoLabelLg:{ size: "0.75rem", lineHeight: "1",    font: fonts.mono,   weight: 400, transform: "uppercase", letterSpacing: "0.1em" },
  // Caption
  caption:    { size: "0.875rem",lineHeight: "1.4",  font: fonts.sans,   weight: 400 },
} as const;

// ============================================================
// SPACING & LAYOUT
// ============================================================
export const spacing = {
  xs:   "0.25rem",
  sm:   "0.5rem",
  md:   "1rem",
  lg:   "1.5rem",
  xl:   "2rem",
  "2xl":"3rem",
  "3xl":"4rem",
  "4xl":"6rem",
} as const;

export const radii = {
  sm:   "0.5rem",   // 8px
  md:   "0.75rem",  // 12px
  lg:   "1rem",     // 16px - cards (matches app BrandCard)
  xl:   "1.5rem",   // 24px - modals, phone frame
  full: "9999px",   // pills
} as const;

export const shadows = {
  card:   "0 2px 12px rgba(44,33,24,0.08)",    // BrandCard shadow
  button: "0 2px 12px rgba(196,114,74,0.20)",  // PrimaryButton clay shadow
  deep:   "0 8px 32px rgba(44,33,24,0.12)",
  phone:  "0 24px 80px rgba(44,33,24,0.18)",
} as const;
