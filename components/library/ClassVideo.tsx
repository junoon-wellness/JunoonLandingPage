'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import type HlsType from 'hls.js'
import { PREVIEW_WORDS } from '@/lib/preview-copy'

/**
 * A class that plays on /library's Videos tab (Arnav, Sat 21 Nov 2026: "A
 * approved go"). Until it is pressed it is only the thumbnail (next/image, from
 * this site's own origin) with a play button: no video bytes and no player code
 * load. On press, Safari and iOS get the stream directly; every other browser
 * loads hls.js then, and only then.
 * One class plays at a time: starting one pauses any other on the page.
 *
 * The 60 second preview (Kush's D1 pick, Arnav: "60 seconds confirmed"; first asked as 2 minutes,
 * after Glo's class page). When `previewSeconds` is set, a pill at the top-left
 * says it is a preview, and the player stops itself there: playback pauses at
 * that second, a seek past it is pulled back, and an end card offers the full
 * class. The stream itself is already cut to that length by Mux (see
 * playbackSrc in lib/videos.ts); this is the second layer.
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
  previewSeconds,
  fullMinutes,
  fullClassHref,
}: {
  src: string
  thumbnail: string
  poster: string
  title: string
  /** Stop here; null plays the whole class with no pill. */
  previewSeconds: number | null
  /** The full class length in minutes, for the pill. */
  fullMinutes: number
  /** Where "Get the full class" goes. */
  fullClassHref: string
}) {
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
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

  /** The preview's stop: pause, hold the frame at the limit, show the end card. */
  function stopAtLimit(video: HTMLVideoElement) {
    if (previewSeconds === null) return
    video.pause()
    if (video.currentTime > previewSeconds) video.currentTime = previewSeconds
    setEnded(true)
  }

  function onTimeUpdate(e: SyntheticEvent<HTMLVideoElement>) {
    const video = e.currentTarget
    if (previewSeconds !== null && video.currentTime >= previewSeconds) stopAtLimit(video)
  }

  function onSeeking(e: SyntheticEvent<HTMLVideoElement>) {
    const video = e.currentTarget
    if (previewSeconds !== null && video.currentTime > previewSeconds) stopAtLimit(video)
  }

  function onEnded() {
    // The clipped stream ends at the limit by itself.
    if (previewSeconds !== null) setEnded(true)
  }

  function onPlay(e: SyntheticEvent<HTMLVideoElement>) {
    const video = e.currentTarget
    // A play from the limit (the keyboard, say) does not run past it.
    if (previewSeconds !== null && video.currentTime >= previewSeconds) {
      stopAtLimit(video)
      return
    }
    pauseOthers(e)
  }

  return (
    <>
      <video
        ref={videoRef}
        className="lb-card-video"
        data-lb-class=""
        poster={poster}
        controls={started && !ended}
        preload="none"
        playsInline
        aria-label={title}
        onPlay={onPlay}
        onTimeUpdate={onTimeUpdate}
        onSeeking={onSeeking}
        onEnded={onEnded}
      />
      {!started && (
        <button type="button" className="lb-card-play" onClick={start} aria-label={`Play ${title}`}>
          <Image src={thumbnail} alt={title} fill loading="lazy" sizes="(max-width: 1024px) 100vw, 960px" />
          <span className="lb-card-play-mark" aria-hidden="true" />
        </button>
      )}
      {previewSeconds !== null && !ended && (
        <div className="lb-preview-pill">
          <span className="lb-preview-pill-text">
            <span className="lb-preview-pill-line">{PREVIEW_WORDS.pillLead}</span>{' '}
            <span className="lb-preview-pill-line">{PREVIEW_WORDS.pillRest(fullMinutes)}</span>
          </span>
          <a href={fullClassHref} className="lb-preview-btn">
            {PREVIEW_WORDS.button}
            <span aria-hidden="true" className="lb-preview-chev" />
          </a>
        </div>
      )}
      {ended && (
        <div className="lb-preview-end" role="status">
          <p className="lb-preview-end-line">{PREVIEW_WORDS.endCard}</p>
          <a href={fullClassHref} className="lb-preview-btn lb-preview-btn--big">
            {PREVIEW_WORDS.button}
            <span aria-hidden="true" className="lb-preview-chev" />
          </a>
        </div>
      )}
    </>
  )
}
