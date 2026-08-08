'use client'

import Image from 'next/image'
import { SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH, type HeroScreen } from '@/lib/screens'

/**
 * THE VIDEO-READY SLOT (v4 spec §A3)
 *
 * Everything that renders inside the hero phone's bezel goes through here, so
 * the eventual upgrade from "a screenshot" to "Kush's screen recording"
 * touches exactly two places: this file and `HERO_SCREEN` in lib/screens.ts.
 * The hero component itself never learns which one it is showing.
 *
 * Both branches fill the bezel identically: same box, same object-fit, same
 * intrinsic 640:1391. That is the whole point of the seam. If the video path
 * needed different sizing, dropping a recording in would become a hero rework,
 * which is what this exists to prevent.
 *
 * ⚠️ NOT the scroll-scrubbed version. v4 spec §G puts the scrub in its own
 * round, because it needs the real recording to tune against. This plays as a
 * muted, looping, inline clip: enough to prove the seam, not a stand-in for
 * that work.
 *
 * ⚠️ The video branch has never rendered - no recording exists yet. Treat it
 * as unexercised code until one lands.
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
    return (
      <video
        className="jn-phone-screen"
        src={screen.src}
        poster={screen.poster}
        aria-label={screen.alt}
        // A silent looping product shot, not media the visitor controls.
        autoPlay
        muted
        loop
        // Without playsInline, iOS Safari takes the video fullscreen on play
        // and the hero composition falls apart.
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        disablePictureInPicture
      />
    )
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
