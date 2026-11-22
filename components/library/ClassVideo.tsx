'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import type HlsType from 'hls.js'

/**
 * A class that plays on /library's Videos tab (Arnav, Sat 21 Nov 2026: "A
 * approved go"). Until it is pressed it is only the thumbnail (next/image, from
 * this site's own origin) with a play button: no video bytes and no player code
 * load. On press, Safari and iOS get the stream directly; every other browser
 * loads hls.js then, and only then.
 * One class plays at a time: starting one pauses any other on the page.
 */
function pauseOthers(e: SyntheticEvent<HTMLVideoElement>) {
  const me = e.currentTarget
  document.querySelectorAll<HTMLVideoElement>('video[data-lb-class]').forEach(v => {
    if (v !== me && !v.paused) v.pause()
  })
}

export default function ClassVideo({
  src,
  thumbnail,
  poster,
  title,
}: {
  src: string
  thumbnail: string
  poster: string
  title: string
}) {
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<HlsType | null>(null)

  useEffect(() => () => hlsRef.current?.destroy(), [])

  function start() {
    const video = videoRef.current
    if (!video) return
    setStarted(true)
    const isHls = src.includes('.m3u8')
    // Safari (and every iOS browser, all WebKit) plays HLS itself: set it inside
    // the tap, so iOS counts the play as the tap's. Chrome now also answers
    // "maybe" for HLS, but its own player failed this stream in a headless
    // check (error 4), so everyone else uses hls.js, the way Mux's player does.
    const appleWebKit = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (!isHls || (appleWebKit && video.canPlayType('application/vnd.apple.mpegurl'))) {
      video.src = src
      video.play().catch(() => {})
      return
    }
    import('hls.js').then(({ default: Hls }) => {
      if (!Hls.isSupported()) {
        video.src = src
        video.play().catch(() => {})
        return
      }
      // No worker: the site's CSP does not allow blob: scripts, and these
      // streams are fMP4, so there is little to do off the main thread.
      const hls = new Hls({ enableWorker: false })
      hlsRef.current = hls
      hls.loadSource(src)
      hls.attachMedia(video)
      video.play().catch(() => {})
    })
  }

  return (
    <>
      <video
        ref={videoRef}
        className="lb-card-video"
        data-lb-class=""
        poster={poster}
        controls={started}
        preload="none"
        playsInline
        aria-label={title}
        onPlay={pauseOthers}
      />
      {!started && (
        <button type="button" className="lb-card-play" onClick={start} aria-label={`Play ${title}`}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="lb-card-play-mark" aria-hidden="true" />
        </button>
      )}
    </>
  )
}
