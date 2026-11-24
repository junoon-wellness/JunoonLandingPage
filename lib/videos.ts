import snapshot from '@/content/videos.json'

/**
 * The classes on /library's Videos tab. Arnav, Sat 21 Nov 2026: "add another
 * tab for videos please so there will be two tabs". The four classes are
 * Arjav's picks, relayed by Arnav the same evening, in his order.
 *
 * content/videos.json is a static snapshot taken from the app's own published
 * Library list (title, category, teacher, length, thumbnail), so the page stays
 * statically generated with no runtime call to Supabase. Teacher names are the
 * About page's names.
 *
 * The classes play on the page from Mux, through a PUBLIC playback id made for
 * the website (Arnav, Sat 21 Nov 2026: "A approved go"). The app's database
 * holds only the signed ids, so the public ones live in this snapshot. To stop
 * a class playing here, delete its public playback id in Mux: the card then
 * falls back to its poster linking to the app once the id is removed here.
 * `video_url` stays null (the app's storage files are not public).
 *
 * `description` is copied word for word from the app's Library row (the admin
 * door's videos list, Sun 22 Nov 2026). The rows carry no props and no level,
 * so neither is in the snapshot; the page shows a Props or Level line only for
 * a class whose snapshot has one.
 */
export interface LibraryVideo {
  id: string
  title: string
  category: string
  instructor: string
  duration_seconds: number
  thumbnail_url: string
  video_url: string | null
  mux_public_playback_id?: string | null
  description?: string | null
  props?: string | null
  level?: string | null
  /**
   * The one class that plays in full for visitors, with no preview cap, no pill
   * and no 1:00 end card (Arnav, HQ Tue 24 Nov 2026 6:01 PM: "Can we add that full
   * class which we plan to add on the look around, also here in the landing page
   * and make it the first video"; Arjav's pick, JV5-009). Absent on every other class.
   */
  full?: boolean
}

/**
 * Every class plays as a 60 second preview (Kush, Sun 22 Nov 2026 call triage D1:
 * "Previews of 30 to 60 seconds, then a subscribe ask"; Arnav, same day: "60
 * seconds confirmed"). Two layers: the Mux URL asks for the first 60 s only
 * (instant clipping, below), and the player stops at 60 s on its own as well.
 * The full assets stay public on Mux, so this is a soft cap: a hard one needs
 * separate 60 second clip assets.
 */
export const PREVIEW_SECONDS = 60

/**
 * True when a class runs longer than the preview, so it is cut and shows the pill.
 * A `full` class is never cut: both layers (the Mux clip and the player's stop) key off this.
 */
export function isPreviewed(v: LibraryVideo): boolean {
  return !v.full && v.duration_seconds > PREVIEW_SECONDS
}

/**
 * The teacher's round headshot under public/instructors/, matched by first
 * name ("Amman Advaita" -> amman). A teacher with no headshot gets none.
 */
const HEADSHOTS: Record<string, string> = {
  amman: '/instructors/amman-head-v2.jpg',
  divya: '/instructors/divya-head.jpg',
  durva: '/instructors/durva-head-v2.jpg',
  shoam: '/instructors/shoam-head.jpg',
}
export function teacherHeadshot(instructor: string): string | null {
  return HEADSHOTS[instructor.trim().split(/\s+/)[0]?.toLowerCase() ?? ''] ?? null
}

export function getLibraryVideos(): LibraryVideo[] {
  return snapshot.videos as LibraryVideo[]
}

/** Whole minutes, rounded to the nearest, never below 1. */
export function videoMinutes(seconds: number): number {
  return Math.max(1, Math.round(seconds / 60))
}

/**
 * The thumbnail through Next's image route (allowed by `images.remotePatterns`
 * in next.config.mjs), so it is served from this site's own origin and the
 * CSP's img-src needs no new host. Used for a playing card's <video poster>,
 * which next/image cannot render. 828 is one of Next's default device widths.
 */
export function posterSrc(thumbnailUrl: string): string {
  return `/_next/image?url=${encodeURIComponent(thumbnailUrl)}&w=828&q=75`
}

/**
 * Where a class plays from: the public Mux stream, else a public file, else
 * nothing. A class longer than the preview asks Mux for its first PREVIEW_SECONDS only,
 * with Mux's instant clipping params for on-demand assets (asset_start_time /
 * asset_end_time, mux.com/docs/guides/create-instant-clips). Checked 22 Nov
 * 2026 on all four classes: the clipped playlist's segments add up to the cap.
 */
export function playbackSrc(v: LibraryVideo): string | null {
  if (v.mux_public_playback_id) {
    const base = `https://stream.mux.com/${v.mux_public_playback_id}.m3u8`
    return isPreviewed(v) ? `${base}?asset_start_time=0&asset_end_time=${PREVIEW_SECONDS}` : base
  }
  return v.video_url
}

/**
 * Arnav, Sun 22 Nov 2026: "I want the videos to be listed on the page like
 * this (similar to how articles are) and when you click into it you get the
 * view with more information." Each class has its own page at
 * /library/videos/<slug>; the slug is the title, lower-cased.
 */
export function videoSlug(v: LibraryVideo): string {
  return v.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getVideoBySlug(slug: string): LibraryVideo | undefined {
  return getLibraryVideos().find(v => videoSlug(v) === slug)
}

/**
 * A card's picture: Mux's public still, 20 seconds in (the first seconds of
 * each class are the Junoon logo card; at 20 s the teacher is on screen),
 * through Next's image route. Falls back to the stored thumbnail.
 */
export function cardThumb(v: LibraryVideo): string {
  return v.mux_public_playback_id
    ? `https://image.mux.com/${v.mux_public_playback_id}/thumbnail.jpg?time=20&width=960`
    : v.thumbnail_url
}
