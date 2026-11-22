'use client'

import type { SyntheticEvent } from 'react'

/**
 * A class that plays inline on /library's Videos tab. Used only for a snapshot
 * row with a PUBLIC `video_url` (none today; see lib/videos.ts). One class plays
 * at a time: starting one pauses any other on the page.
 *
 * preload="none" so nothing downloads until someone presses play. The poster
 * comes through Next's image route, from this site's own origin.
 */
function pauseOthers(e: SyntheticEvent<HTMLVideoElement>) {
  const me = e.currentTarget
  document.querySelectorAll<HTMLVideoElement>('video[data-lb-class]').forEach(v => {
    if (v !== me && !v.paused) v.pause()
  })
}

export default function ClassVideo({
  src,
  poster,
  title,
}: {
  src: string
  poster: string
  title: string
}) {
  return (
    <video
      className="lb-card-video"
      data-lb-class=""
      src={src}
      poster={poster}
      controls
      preload="none"
      playsInline
      aria-label={title}
      onPlay={pauseOthers}
    />
  )
}
