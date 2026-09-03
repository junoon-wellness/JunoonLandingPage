/**
 * LV5-006 (Kush, 2026-08-22): "Hide the full tour walkthrough for now until
 * the design kit is fully updated." Flips off the WalkthroughTeaser band on
 * the homepage and every link to /tour. `app/tour/page.tsx` and
 * `public/tour-embed/*` stay on disk and reachable by direct URL (noindex,
 * nofollow) - flip this back to `true` to re-link it once the rebuild
 * (junoon-v3 board project, JV3-101, BLOCKED on the design kit) ships.
 */
export const SHOW_TOUR = false

/**
 * Single source of truth for the founding-member offer - the "500" in
 * "First 500 members. Permanent pricing." and the denominator of the progress
 * bar. Change it here and it updates everywhere.
 */
export const TOTAL_SPOTS = 500

/**
 * LV5-002: the nav badge and hero CTA link here. '#' placeholder until Kush
 * supplies the real App Store URL — every caller treats a click as a no-op
 * anchor jump until this is filled in, never a broken external link.
 * TODO(Kush): swap in the real App Store listing URL once the app is live
 * there and the link is known.
 */
export const APP_STORE_URL = 'https://apps.apple.com/us/app/junoon-wellness/id6781123809'

/**
 * LV5-016: the /about founder video. Arjav's finished edit landed 2026-08-28
 * and is self-hosted per Kush's ruling — 18MB sits well under the ~25MB bar
 * that would have sent it to Vercel Blob instead.
 *
 * 🔴 LV5-062 — THE LARGE-FILE RULE FOR junoonwellness.com. Kush ruled this on
 * 2026-09-02, verbatim: "A then B". In order, and note that the first option is
 * the DEFAULT, not the fallback:
 *
 *   1. COMPRESS OR SPLIT it under 25MB and keep it in public/, like everything
 *      else on this site. This is what the founder video above did — 208MB down
 *      to 18MB — and it is what should happen almost every time.
 *
 *   2. Vercel Blob, on the Vercel project `junoon-landing-page` (NOT
 *      `junoon-website-ji7r`, which is the app) — the EXCEPTION, and only when a
 *      genuine >25MB download is actually required. For a one-off, upload it
 *      through the Vercel dashboard and paste the public URL. Do NOT add the
 *      @vercel/blob dependency or write upload code until a real >25MB file
 *      exists; nothing here is wired for it today, deliberately.
 *
 *   3. VIDEO over 25MB goes to Mux instead (ruled 2026-08-28) — not to public/
 *      and not to Blob.
 *
 * 🔴 NEVER Supabase Storage. Its egress caused the August billing overage, and
 *    that is exactly why the video library was moved off it. This is not a
 *    judgement call to be re-litigated per file.
 * 🔴 NEVER a Google Drive or Dropbox link for anything served from this site.
 *
 * Source was 2880x2160 (4:3) HEVC @120fps, 208MB. Re-encoded to 1600x1200
 * H.264 @30fps CRF 23 with +faststart (so playback starts before the whole
 * file downloads).
 *
 * NOT CROPPED — the full 4:3 frame ships, and .ab-video-cinema is 4/3 to match
 * (Kush, 2026-08-28: change the bar, not the video). An earlier 16:9 encode was
 * replaced after real frames showed it beheaded the bench B-roll and clipped the
 * in-app phone screens. If anyone widens that slot again, they are cropping
 * Arjav's composition — re-encode from the original instead.
 *
 * null is still handled: the whole section unmounts rather than rendering an
 * empty slot, which is what Kush asked to remove on 2026-08-24.
 */
export const FOUNDER_VIDEO_SRC: string | null = '/junoon-founder.mp4'

/** Poster frame (t=0.6s) so the slot isn't black while the video loads. */
export const FOUNDER_VIDEO_POSTER = '/junoon-founder-poster.jpg'

/** Traffic sources we accept from the `?ref=` query param. Anything else → 'direct'. */
export const VALID_SOURCES = ['instagram', 'tiktok', 'linkedin', 'direct'] as const

export type Source = (typeof VALID_SOURCES)[number]

export function normaliseSource(ref: string | undefined): Source {
  return VALID_SOURCES.includes(ref as Source) ? (ref as Source) : 'direct'
}

/** Shared by client and server so the two can never disagree. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Phone is optional everywhere. Empty passes; anything present must carry
 * enough digits to be a real number. Same rule as junoon-yoga-presignup so
 * the two forms behave identically.
 */
export function isValidOptionalPhone(phone: string): boolean {
  const trimmed = phone.trim()
  if (!trimmed) return true
  return trimmed.replace(/\D/g, '').length >= 8
}
