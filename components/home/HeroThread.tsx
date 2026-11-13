'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import IPhoneFrame from '@/components/home/IPhoneFrame'
import { INDIA_BOX, INDIA_DOTS, INDIA_PLACE } from '@/lib/india-dots'
import { FEATURES, HERO_MAP, HERO_THREAD } from '@/lib/landing-copy'

/**
 * THE FIRST SCREEN, ROUND 2 (Kush, Fri 13 Nov 2026, notes on round 1):
 *  - start from A, "the thread": the practice pills and the feature words,
 *    moved so the whole group sits centred;
 *  - India as C drew it, a field of dots; all four pieces (map, pills, words,
 *    phone) scaled to each other;
 *  - the connecting lines are gone. The one quiet join left is a thin timer
 *    bar under the feature that is on (switch `?join=none` to drop it too);
 *  - the place on the map: a small named dot (`?pin=place`, our pick) or no
 *    mark at all (`?pin=none`);
 *  - seven features (Your Samadhi AND On demand classes), a turn about every
 *    3 seconds, and it draws in Light as well as Dark (app/theme.css).
 *
 * Patterns borrowed, from memory, not re-checked today: Apple's iPhone pages
 * (a feature list beside one device, the list item that is on is bright and
 * the rest dim) and Linear / Oura's auto-advancing tabs (the thin bar that
 * fills while a tab is on).
 *
 * Motion: one feature every 3 s. It waits while the hero is off screen or the
 * tab is hidden, holds while a pointer or keyboard focus is on it, and carries
 * on from whatever someone picks. With prefers-reduced-motion it never turns
 * by itself and nothing slides (picking still works). Without JavaScript the
 * first feature shows.
 */

const TURN_MS = 3000

const ICONS: React.ReactNode[] = [
  // Guru: a person
  <path key="g" d="M12 4.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4zM5.5 20c.8-3.6 3.4-5.6 6.5-5.6s5.7 2 6.5 5.6" />,
  // Asana: a standing pose
  <path key="a" d="M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 7v7M12 14l-3.5 6M12 14l3.5 6M6 10.5l6-2 6 2" />,
  // Pranayama: the breath
  <path key="p" d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" />,
  // Dhyana: a seated figure
  <path key="d" d="M12 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 8v5M7 17c2-1.6 3.5-4 5-4s3 2.4 5 4M5 19h14" />,
  // Abhyasa: a class, played on demand
  <path key="c" d="M3.5 6.5h17v11h-17zM10.5 9.6v4.8l4-2.4z" />,
  // Svadhyaya: the evening, a moon
  <path key="s" d="M16.5 4.5a8 8 0 1 0 3 11 6.5 6.5 0 0 1-3-11z" />,
  // Patanjali's 8 limbs: a wheel
  <path key="l" d="M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM12 3.5v6.9M12 13.6v6.9M3.5 12h6.9M13.6 12h6.9M6 6l4.8 4.8M13.2 13.2 18 18M18 6l-4.8 4.8M10.8 13.2 6 18" />,
]

const MOTION_QUERY = '(prefers-reduced-motion: reduce)'
function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
const prefersStill = () => window.matchMedia(MOTION_QUERY).matches

/** India as a field of dots, with the place it started marked (or not). */
function IndiaDots() {
  const { w, h } = INDIA_BOX
  return (
    <svg className="hx-map" viewBox={`-4 -4 ${w + 8} ${h + 8}`} role="img" aria-label="A map of India drawn in dots">
      <path className="hx-dots t2" d={INDIA_DOTS[2]} />
      <path className="hx-dots t1" d={INDIA_DOTS[1]} />
      <path className="hx-dots t0" d={INDIA_DOTS[0]} />
      <g className="hx-place" transform={`translate(${INDIA_PLACE.x} ${INDIA_PLACE.y})`}>
        <circle className="hx-ring" r="9" />
        <circle className="hx-ring r2" r="9" />
        <circle className="hx-spot" r="5" />
        <text x="13" y="5">{INDIA_PLACE.name}</text>
      </g>
    </svg>
  )
}

export default function HeroThread() {
  const [on, setOn] = useState(0)
  const [held, setHeld] = useState(false)
  const [visible, setVisible] = useState(false)
  // Bumped when a turn is skipped (tab hidden), so the timer re-arms.
  const [tick, setTick] = useState(0)
  const still = useSyncExternalStore(subscribeMotion, prefersStill, () => true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(es => setVisible(es.some(e => e.isIntersecting)), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // One timeout per step (not an interval), so a pick restarts the full 3 s.
  useEffect(() => {
    if (still || held || !visible) return
    const t = window.setTimeout(() => {
      if (document.hidden) setTick(n => n + 1)
      else setOn(i => (i + 1) % HERO_THREAD.length)
    }, TURN_MS)
    return () => window.clearTimeout(t)
  }, [on, tick, still, held, visible])

  const auto = !still && !held && visible

  return (
    <div
      className="hx"
      ref={ref}
      data-auto={auto || undefined}
      style={{ '--turn': `${TURN_MS}ms` } as React.CSSProperties}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <figure className="hx-roots">
        <IndiaDots />
        <figcaption>{HERO_MAP.captionSmall}</figcaption>
      </figure>

      <div className="hx-pills" role="group" aria-label="Practices from India">
        {HERO_THREAD.map((t, i) => (
          <button
            key={t.practice}
            type="button"
            className="hx-pill"
            data-on={i === on || undefined}
            aria-pressed={i === on}
            onClick={() => setOn(i)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {ICONS[i]}
            </svg>
            <span>
              <b>{t.practice}</b>
              <small>{t.gloss}</small>
            </span>
          </button>
        ))}
      </div>

      <ol className="hx-list" aria-label="What is in the app">
        {HERO_THREAD.map((t, i) => (
          <li key={t.practice} data-on={i === on || undefined}>
            <button type="button" aria-pressed={i === on} onClick={() => setOn(i)}>
              {FEATURES[t.feature].title}
            </button>
            {/* the join: a bar that fills while this one is on (re-keyed per turn) */}
            {i === on ? <i key={`bar-${on}`} className="hx-bar" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      <div className="hx-phone" aria-live="polite">
        <IPhoneFrame bare className="hx-ip">
          {HERO_THREAD.map((t, i) => (
            <Image
              key={t.src}
              className="ip-img hx-img"
              data-on={i === on || undefined}
              src={t.src}
              alt={i === on ? t.alt : ''}
              aria-hidden={i === on ? undefined : true}
              width={660}
              height={1430}
              sizes="240px"
              priority={i === 0}
            />
          ))}
        </IPhoneFrame>
      </div>
    </div>
  )
}
