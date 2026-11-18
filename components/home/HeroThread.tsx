'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import IPhoneFrame from '@/components/home/IPhoneFrame'
import { INDIA_BOX, INDIA_DOTS } from '@/lib/india-dots'
import { FEATURES, HERO_THREAD } from '@/lib/landing-copy'

/**
 * THE FIRST SCREEN, ROUND 2 (Kush, Fri 13 Nov 2026, notes on round 1):
 *  - start from A, "the thread": the practice pills and the feature words,
 *    moved so the whole group sits centred;
 *  - India as C drew it, a field of dots; all four pieces (map, pills, words,
 *    phone) scaled to each other;
 *  - the connecting lines are gone. The one quiet join left is a thin timer
 *    bar under the feature that is on (Kush's pick, 6:54 PM Fri 13 Nov);
 *  - no mark on the map (Kush's pick, same time); the dots are only a little
 *    brighter around the north;
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
  // Pranayama: the breath. The app's own Breathwork glyph (Arnav, Tue 17 Nov 2026:
  // "match the same ones on the app"), copied from the iOS sheet's i-breathwork in
  // Junoon-IOS/DesignKit/v01/assets/junoon-icons-chrome.svg. Same 24 box, and the
  // app draws it at 15pt with a 1.5 design stroke, the stroke this list already uses.
  <path key="p" d="M2.6 8.6h9.2a2.6 2.6 0 1 0-2.6-2.6M2.6 13.6h14a2.8 2.8 0 1 1 2.8 2.8M2.6 18.6h8.6" />,
  // Dhyana: a seated figure. The app's own Sit glyph (Arnav, Tue 17 Nov 2026: "draw sit
  // icon"), i-sit in Junoon-IOS/DesignKit/v01/assets/junoon-icons-chrome.svg, our own
  // drawing that replaces the SF Symbol on the app's Sit tile. Copied path for path; its
  // head circle is written as two arcs so the whole glyph is one path, like its neighbours.
  <path
    key="d"
    d="M12 2.2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM12 7v7.4M5.6 15.8l1.2-4.8c.4-1.6 1.6-2.4 3.2-2.4h4c1.6 0 2.8.8 3.2 2.4l1.2 4.8M2.8 17.6c2.8-1.6 6.2-2.4 9.2-2.4 3 0 6.4.8 9.2 2.4M2.8 17.6c2.2 1.8 7.4 2.4 12.4.8M21.2 17.6c-2.2 1.8-7.4 2.4-12.4.8"
  />,
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

/**
 * The dimmer dots drift (Arnav, Sat 14 Nov 2026: "the darker dots transition
 * from top to bottom slowly, fade in and out ... very smooth animation"): a
 * soft band of light runs north to south across tiers 1 and 2 and repeats.
 * So each of those tiers is drawn one row of dots per path, and every row
 * carries its height on the map as --y (0 at the top, 1 at the bottom); the
 * one keyframe in app/theme.css (hx-drift) turns that into its delay. Same
 * dots, same look at rest; tier 0 (the bright north) stays one still path.
 * Pure and fixed at build time, so the server draws exactly what the client
 * does.
 */
type DotRow = { d: string; y: string }
function rowsOf(path: string): DotRow[] {
  const rows = new Map<string, string>()
  for (const dot of path.split('M')) {
    if (!dot) continue
    // each dot is "x y" then "h0"
    const y = dot.split(' ')[1].replace('h0', '')
    rows.set(y, `${rows.get(y) ?? ''}M${dot}`)
  }
  return [...rows].map(([y, d]) => ({ d, y: (parseFloat(y) / INDIA_BOX.h).toFixed(3) }))
}
// Arnav, 3:44 PM: all dots one standard darkness so the band reads everywhere, the north included.
const DRIFT_ROWS: [DotRow[], DotRow[], DotRow[]] = [rowsOf(INDIA_DOTS[2]), rowsOf(INDIA_DOTS[1]), rowsOf(INDIA_DOTS[0])]

/** India as a field of dots. */
function IndiaDots() {
  const { w, h } = INDIA_BOX
  return (
    <svg className="hx-map" viewBox={`-4 -4 ${w + 8} ${h + 8}`} role="img" aria-label="A map of India drawn in dots">
      {DRIFT_ROWS[0].map(r => (
        <path key={`t2-${r.y}`} className="hx-dots t2" d={r.d} style={{ '--y': r.y } as React.CSSProperties} />
      ))}
      {DRIFT_ROWS[1].map(r => (
        <path key={`t1-${r.y}`} className="hx-dots t1" d={r.d} style={{ '--y': r.y } as React.CSSProperties} />
      ))}
      {DRIFT_ROWS[2].map(r => (
        <path key={`t0-${r.y}`} className="hx-dots t0" d={r.d} style={{ '--y': r.y } as React.CSSProperties} />
      ))}
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
