'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PhoneFrame from '@/components/waitlist/PhoneFrame'
import Reveal from '@/components/motion/Reveal'
import type { Screen } from '@/lib/screens'

/**
 * THE FEATURE RAIL (v4 spec §B)
 *
 * A horizontal scroll-snap band for the secondary features. N cards by
 * config; seeded with two.
 *
 * Native scrolling, no library: `scroll-snap-type: x mandatory` plus
 * `overflow-x: auto`. That buys correct touch physics, correct keyboard
 * behaviour and correct reduced-motion behaviour for free, and it is the
 * reason this cannot trap the page's vertical scroll the way a JS-driven
 * horizontal hijack does (spec F2).
 *
 * Accessibility: the strip itself is focusable and labelled, so keyboard
 * users get native arrow-key scrolling inside it. The desktop arrows are
 * genuine buttons, hidden from AT because they duplicate that.
 */

export interface RailCard {
  id: string
  title: string
  body: string
  screen: Screen
  /** A `--jn-*` custom property reference. */
  accent: string
}

export default function FeatureRail({
  cards,
  eyebrow,
}: {
  cards: RailCard[]
  eyebrow: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    // 2px of slack: sub-pixel widths mean scrollLeft rarely hits the exact end.
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    // A resize can turn an overflowing rail into a fitting one, which should
    // retire the arrows rather than leave them pointing nowhere.
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const nudge = useCallback((dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.jn-rail-card')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    // `smooth` here is a deliberate exception to the page's reduced-motion
    // policy being CSS-only: this is a discrete user action, and the media
    // query below swaps it for an instant jump.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  return (
    <section className="jn-rail" aria-labelledby="rail-heading">
      <div className="jn-rail-head">
        <Reveal className="eyebrow" id="rail-heading">
          {eyebrow}
        </Reveal>

        <div className="jn-rail-arrows" aria-hidden="true">
          <button
            type="button"
            className="jn-rail-arrow"
            onClick={() => nudge(-1)}
            disabled={atStart}
            tabIndex={-1}
          >
            ←
          </button>
          <button
            type="button"
            className="jn-rail-arrow"
            onClick={() => nudge(1)}
            disabled={atEnd}
            tabIndex={-1}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="jn-rail-track"
        ref={trackRef}
        data-at-start={atStart}
        data-at-end={atEnd}
        tabIndex={0}
        role="group"
        aria-label={`${eyebrow}. Scroll horizontally for ${cards.length} more features.`}
      >
        {cards.map((c, i) => (
          <Reveal
            key={c.id}
            delay={i * 0.08}
            amount={0.25}
            className="jn-rail-card"
            style={{ ['--jn-ch-accent' as string]: c.accent }}
          >
            <div className="jn-rail-card-phone">
              <PhoneFrame src={c.screen.src} alt={c.screen.alt} width={176} />
            </div>
            <div className="jn-rail-card-copy">
              <h3 className="jn-rail-card-title">{c.title}</h3>
              <p className="jn-rail-card-body">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
