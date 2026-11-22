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

/** Where a card plays from: the public Mux stream, else a public file, else nothing. */
export function playbackSrc(v: LibraryVideo): string | null {
  if (v.mux_public_playback_id) return `https://stream.mux.com/${v.mux_public_playback_id}.m3u8`
  return v.video_url
}
