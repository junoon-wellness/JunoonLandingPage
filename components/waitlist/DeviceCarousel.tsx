'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_SLIDES, SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/lib/screens'
import { usePointerTilt } from '@/components/motion/usePointerTilt'

/**
 * Auto-advancing product carousel inside a phone frame.
 *
 * ⚠️ THE MECHANICS BELOW ARE DELIBERATELY UNCHANGED IN v3 (spec §B2).
 * - Loops seamlessly: a clone of the first slide sits at the end, and once the
 *   transition into it finishes we snap back to index 0 with transitions off,
 *   so there's never a backwards rewind.
 * - Tap the phone to advance; tap a pill to jump.
 * - Auto-advance pauses on hover/focus, while the tab is hidden, and entirely
 *   under prefers-reduced-motion.
 *
 * v3 changes only the skin: slides come from lib/screens.ts, the dots became
 * progress pills that fill over the interval, and the frame carries a sprung
 * pointer tilt.
 */

const SLIDES = HERO_SLIDES.map(s => ({ ...SCREENS[s.key], label: s.label }))

const INTERVAL_MS = 3600
const TRANSITION_MS = 700

/**
 * LV5-019 (2026-08-22, Kush): "make these 3 across and each a different
 * color for the line and bubble shading". One accent per dot, in slide
 * order, applied as a `--dot-accent` custom property (see `.v2-dot` /
 * `.v2-dot-mark` / `.v2-dot-fill` in globals.css). Trimmed to five when the
 * lineup went to five slides (Kush, 2026-08-23) — blush dropped with the
 * Breathwork slide; the five kept all clear 3:1 against --jn-bg as graphics
 * per the contrast table on LV5-019.
 */
const DOT_ACCENTS = [
  'var(--jn-sage)', // AI Coach
  'var(--jn-clay)', // Live Classes
  'var(--jn-gold-alt)', // Recorded Classes
  'var(--jn-jade-tint)', // Your Plan
  'var(--jn-turmeric)', // Weekly Ritual
]

export default function DeviceCarousel() {
  // index can reach SLIDES.length, which is the cloned first slide
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useRef(false)

  const { ref: tiltRef, enabled: tiltEnabled, rotateX, rotateY } = usePointerTilt()

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
      data-paused={paused}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="v2-device-glow" aria-hidden="true" />

      <motion.div
        ref={tiltRef}
        className={tiltEnabled ? 'v2-tilt' : undefined}
        style={
          tiltEnabled
            ? { rotateX, rotateY, transformPerspective: 1100 }
            : undefined
        }
      >
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
              transition: animate
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : 'none',
            }}
          >
            {[...SLIDES, SLIDES[0]].map((s, i) => (
              <div className="v2-carousel-slide" key={`${s.src}-${i}`}>
                <Image
                  src={s.src}
                  alt={i === activeDot ? s.alt : ''}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  sizes="300px"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </button>
      </motion.div>

      {/* Progress pills - the tap-through control, and the clock.
          The active pill's fill runs the same 3600ms as the auto-advance, so
          the control shows you when the next screen lands. */}
      <div className="v2-dots" role="tablist" aria-label="App screens">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === activeDot}
            aria-label={s.label}
            className={`v2-dot${i === activeDot ? ' is-active' : ''}`}
            style={{ ['--dot-accent' as string]: DOT_ACCENTS[i] }}
            onClick={() => goTo(i)}
          >
            <span className="v2-dot-mark" aria-hidden="true">
              {/* Keyed on `index`, not on the active slide, so the fill also
                  restarts on the wrap from the clone back to slide 0 (where
                  the active index does not change). It carries no image, so
                  this is not the remount trap. */}
              <span key={index} className="v2-dot-fill" />
            </span>
            <span className="v2-dot-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
