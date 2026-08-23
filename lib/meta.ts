/**
 * Page metadata. Lives here rather than in the old `content.ts` (deleted in v3)
 * because `meta` was the only export of that file still reachable from the
 * rendered site.
 *
 * The og:image lives in app/layout.tsx (public/og-image.png, added 2026-08-23),
 * not here - it is site-wide, not per-page.
 *
 * The title is written with a plain hyphen on purpose. `clean()` would convert
 * an em dash anyway, but the source is what gets grepped for brand-voice
 * violations, so it should be clean at rest.
 */
export const meta = {
  title: "Junoon - Ancient Practice, Personal Coaching",
  description:
    "An AI wellness coach that brings India's living traditions of yoga, breathwork and meditation into a practice built around your modern life. Available now on the App Store.",
} as const
