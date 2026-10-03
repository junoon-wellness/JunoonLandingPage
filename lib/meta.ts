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
import { LAUNCHING_SOON } from "@/lib/constants"

const DESCRIPTION_BASE =
  "An AI wellness coach that brings India's living traditions of yoga, breathwork and meditation into a practice built around your modern life."

export const meta = {
  title: "Junoon - Ancient Practice, Personal Coaching",
  // THE LAUNCHING-SOON SWITCH (lib/constants.ts): the Google and link-preview
  // description follows it. With the switch off this is the same string as before.
  description: LAUNCHING_SOON
    ? `${DESCRIPTION_BASE} Launching soon. Join our email list.`
    : `${DESCRIPTION_BASE} Available now on the App Store.`,
} as const
