'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH, type HeroScreen } from '@/lib/screens'

/**
 * THE VIDEO-READY SLOT (v4 spec §A3)
 *
 * Everything that renders inside the hero phone's bezel goes through here, so
 * swapping the screen is one config entry in lib/screens.ts and nothing in the
 * hero. Both branches fill the bezel identically: same box, same object-fit,
 * same intrinsic 640:1391.
 *
 * ⚠️ NOT the scroll-scrubbed version. v4 spec §G keeps the scrub in its own
 * round because it needs the real recording to tune against. This is a muted,
 * looping, inline clip.
 */
export default function PhoneScreen({
  screen,
  sizes,
  priority = false,
}: {
  screen: HeroScreen
  /** `sizes` for the image path; the hero knows its own rendered width. */
  sizes: string
  priority?: boolean
}) {
  if (screen.kind === 'video') {
    return <HeroVideo screen={screen} priority={priority} />
  }

  const shot = SCREENS[screen.key]

  return (
    <Image
      className="jn-phone-screen"
      src={shot.src}
      alt={shot.alt}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      draggable={false}
    />
  )
}

/**
 * ⚠️ REDUCED MOTION: THE VIDEO MUST NOT AUTOPLAY.
 *
 * A looping clip is exactly the "large moving content" the preference exists to
 * suppress, and unlike the rest of the page this cannot be neutralised in CSS:
 * `autoplay` is a behaviour, not a style. So it is decided in JS.
 *
 * The poster still renders, so a reduced-motion visitor gets the same first
 * frame the video starts on rather than an empty bezel, and `controls` appear
 * so they can choose to play it. `key` on the element is deliberate: React
 * would otherwise reuse the DOM node and leave `autoPlay` as it was at mount.
 */
function HeroVideo({
  screen,
  priority,
}: {
  screen: Extract<HeroScreen, { kind: 'video' }>
  priority: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  // Starts false so the server render and the first client render agree; the
  // effect corrects it before anything can play.
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setReduced(mq.matches)
      const v = ref.current
      if (!v) return
      if (mq.matches) {
        v.pause()
        v.currentTime = 0
      } else if (v.paused) {
        // Autoplay can still be refused (low power mode); nothing to recover,
        // the poster stays up.
        void v.play().catch(() => {})
      }
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <video
      key={reduced ? 'still' : 'playing'}
      ref={ref}
      className="jn-phone-screen"
      src={screen.src}
      poster={screen.poster}
      aria-label={screen.alt}
      autoPlay={!reduced}
      controls={reduced}
      loop
      muted
      // Without playsInline, iOS Safari takes the video fullscreen on play and
      // the hero composition falls apart.
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      disablePictureInPicture
    />
  )
}
