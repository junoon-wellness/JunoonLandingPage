'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Auto-advancing product carousel inside a phone frame.
 *
 * - Loops seamlessly: a clone of the first slide sits at the end, and once the
 *   transition into it finishes we snap back to index 0 with transitions off,
 *   so there's never a backwards rewind.
 * - Tap the phone to advance; tap a dot to jump.
 * - Auto-advance pauses on hover/focus, while the tab is hidden, and entirely
 *   under prefers-reduced-motion.
 */

// Ordered as a product story: the coach, what it personalises, what it can
// start for you on the spot, then the rest of the app.
const SLIDES = [
  {
    src: '/screenshots/screenshot-coach.png',
    label: 'AI Coach',
    alt: 'Junoon AI coach conversation shaping a personalised weekly plan',
  },
  {
    src: '/screenshots/screenshot-coach-pick.png',
    label: 'Coach Picks',
    alt: 'The Junoon coach recommending a five-minute Chair Yoga practice chosen for the season and your morning window',
  },
  {
    src: '/screenshots/screenshot-breathwork-coach.png',
    label: 'Breathwork',
    alt: 'Asking the Junoon coach for a breathing exercise and being offered two, three or five minute options',
  },
  {
    src: '/screenshots/screenshot-breathwork-session.png',
    label: 'In Session',
    alt: 'A guided Box Breathing session in progress, showing the inhale cue and cycle count',
  },
  {
    src: '/screenshots/screenshot-plan.png',
    label: 'Weekly Plan',
    alt: 'Junoon weekly wellness plan with yoga and movement sessions',
  },
  {
    src: '/screenshots/screenshot-library.png',
    label: 'Library',
    alt: 'Junoon article library with wellness guides and resources',
  },
]

const INTERVAL_MS = 3600
const TRANSITION_MS = 700

export default function DeviceCarousel() {
  // index can reach SLIDES.length, which is the cloned first slide
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const next = useCallback(() => {
    setAnimate(true)
    // Clamp at the clone. Without this, clicking faster than the 700ms
    // snap-back walks the track past its last slide and shows blank space.
    setIndex(i => (i >= SLIDES.length ? i : i + 1))
  }, [])

  const goTo = useCallback((i: number) => {
    setAnimate(true)
    setIndex(i)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (paused || reducedMotion.current) return
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') next()
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, next])

  // Seamless wrap: after landing on the clone, jump back to the real first slide
  useEffect(() => {
    if (index !== SLIDES.length) return
    const id = setTimeout(() => {
      setAnimate(false)
      setIndex(0)
    }, TRANSITION_MS)
    return () => clearTimeout(id)
  }, [index])

  // Re-enable transitions after the silent snap-back.
  // Double rAF is deliberate: a single one can fire before the browser has
  // painted the untransitioned jump, which would animate the rewind we're
  // trying to hide.
  useEffect(() => {
    if (animate) return
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [animate])

  const activeDot = index % SLIDES.length

  return (
    <div
      className="v2-carousel-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="v2-device-glow" aria-hidden="true" />

      <button
        type="button"
        className="v2-device v2-device-front v2-carousel-btn"
        onClick={next}
        aria-label={`Junoon app preview: ${SLIDES[activeDot].label}. Tap to see the next screen.`}
      >
        <div
          className="v2-carousel-track"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animate ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
          }}
        >
          {[...SLIDES, SLIDES[0]].map((s, i) => (
            <div className="v2-carousel-slide" key={`${s.src}-${i}`}>
              <Image
                src={s.src}
                alt={i === activeDot ? s.alt : ''}
                width={919}
                height={1998}
                sizes="300px"
                loading={i === 0 ? 'eager' : 'lazy'}
                {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </button>

      {/* Dots — the tap-through control */}
      <div className="v2-dots" role="tablist" aria-label="App screens">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === activeDot}
            aria-label={s.label}
            className={`v2-dot${i === activeDot ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          >
            <span className="v2-dot-mark" aria-hidden="true" />
            <span className="v2-dot-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
