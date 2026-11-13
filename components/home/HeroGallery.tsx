'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import IPhoneFrame from '@/components/home/IPhoneFrame'

/**
 * The first phone on the page, round 2 (Kush, 9:30 call Tue 10 Nov): "the
 * first phone cutout, if we can change that to being a rotating gallery ...
 * maybe it just highlights on the side, like, which one it's showing ... it
 * just adds a little glow to that little dot next to it". Live classes and the
 * J Score are left out ("live classes coming soon, maybe we skip ... our J
 * score is still coming").
 *
 * Real screens from the staging app (Mon 9 Nov night captures, test logins
 * with real-looking names). Each screen belongs to one of the eight features
 * around the phone (FEATURES in lib/landing-copy.ts, by index); the showing
 * one lights its dot on the side, and the dot row under the phone shows the
 * same. "Sit and do nothing" has no capture yet, so it is not in the turn.
 *
 * Motion: one screen every 5 s, a short cross-fade. It waits while the
 * phone is off screen or the tab is hidden, pauses while a pointer or focus
 * is on it, and carries on from the screen someone picks (Arnav, 13 Nov). With
 * prefers-reduced-motion it never turns by itself (the dots still work).
 * Without JavaScript the first screen shows.
 */

export type GalleryFeature = { title: string }

const SCREENS: { src: string; alt: string; feature: number }[] = [
  { src: '/landing/coach-chat.jpg', alt: 'The coach chat', feature: 0 },
  { src: '/landing/day2-session.jpg', alt: 'A session playing', feature: 1 },
  { src: '/landing/breathwork.jpg', alt: 'A breathwork session, mid-breath', feature: 2 },
  { src: '/landing/class-library.jpg', alt: 'The class library', feature: 4 },
  { src: '/landing/coach-voices.jpg', alt: 'The evening reflection with the coach', feature: 5 },
]

const TURN_MS = 5000

const MOTION_QUERY = '(prefers-reduced-motion: reduce)'
function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
function prefersStill() {
  return window.matchMedia(MOTION_QUERY).matches
}

function Feature({
  title,
  on,
  onPick,
}: GalleryFeature & { on: boolean; onPick?: () => void }) {
  if (!onPick) {
    return (
      <div className="h4-feat">
        <b>{title}</b>
      </div>
    )
  }
  return (
    <button type="button" className="h4-feat" data-on={on || undefined} aria-pressed={on} onClick={onPick}>
      <b>{title}</b>
    </button>
  )
}

export default function HeroGallery({ features }: { features: GalleryFeature[] }) {
  const [shown, setShown] = useState(0)
  const [held, setHeld] = useState(false)
  const [visible, setVisible] = useState(false)
  // Reduced motion; on the server and before hydration it counts as "still".
  const still = useSyncExternalStore(subscribeMotion, prefersStill, () => true)
  const ref = useRef<HTMLDivElement>(null)

  // Turn only while the phone is on screen.
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(entries => setVisible(entries.some(e => e.isIntersecting)), {
      threshold: 0.3,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (still || held || !visible) return
    const t = window.setInterval(() => {
      if (document.hidden) return
      setShown(i => (i + 1) % SCREENS.length)
    }, TURN_MS)
    return () => window.clearInterval(t)
  }, [still, held, visible])

  const pick = (i: number) => {
    setShown(i)
  }
  const screenFor = (featureIndex: number) => SCREENS.findIndex(s => s.feature === featureIndex)

  const side = (from: number, to: number) =>
    features.slice(from, to).map((f, k) => {
      const idx = from + k
      const s = screenFor(idx)
      return (
        <Feature
          key={f.title}
          {...f}
          on={s === shown}
          onPick={s >= 0 ? () => pick(s) : undefined}
        />
      )
    })

  return (
    <div
      className="h4-app"
      ref={ref}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="h4-feats l">{side(0, 4)}</div>
      <div className="h4-gal">
        <IPhoneFrame bare className="h4-gal-phone">
          {SCREENS.map((s, i) => (
            <Image
              key={s.src}
              className="ip-img h4-gal-img"
              data-on={i === shown || undefined}
              src={s.src}
              alt={i === shown ? s.alt : ''}
              aria-hidden={i === shown ? undefined : true}
              width={660}
              height={1430}
              sizes="262px"
              priority={i === 0}
            />
          ))}
        </IPhoneFrame>
        <div className="h4-dots" role="group" aria-label="App screens">
          {SCREENS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              data-on={i === shown || undefined}
              aria-pressed={i === shown}
              aria-label={features[s.feature]?.title ?? s.alt}
              onClick={() => pick(i)}
            />
          ))}
        </div>
      </div>
      <div className="h4-feats r">{side(4, 8)}</div>
    </div>
  )
}
