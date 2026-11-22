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
 * `video_url` is null on every row today: the app's class files are not public
 * (signed Mux playback, and a storage bucket that is not public). A row plays
 * inline on the page only once it carries a PUBLIC file's URL, and that also
 * needs the CSP's media-src in next.config.mjs opened for the file's host.
 * Until then a card is the class's poster, linking to the app.
 */
export interface LibraryVideo {
  id: string
  title: string
  category: string
  instructor: string
  duration_seconds: number
  thumbnail_url: string
  video_url: string | null
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
