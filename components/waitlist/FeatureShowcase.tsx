'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PhoneFrame from './PhoneFrame'

/**
 * The three product pillars, each one a switchable panel rather than a static
 * card. Replaces BreathworkShowcase + PillarsV2, which between them sold
 * breathwork and nothing else.
 *
 * Panels cross-fade instead of sliding: the copy changes along with the images,
 * and sliding text reads as noise. Phones stay on the left in every panel so
 * the layout doesn't jump on each auto-advance.
 */

const FEATURES = [
  {
    id: 'breath',
    tab: 'Breath & Movement',
    glyph: 'प्राण',
    accent: '#B5522A',
    eyebrow: 'Breathwork on demand',
    title: 'Need to reset?',
    titleAccent: 'Just ask.',
    body: "Tell the coach you're stretched thin between meetings and it starts a guided breathing session built around the time you actually have, not a generic timer.",
    points: [
      'Ask in plain language. The coach reads the situation, not a keyword.',
      'Pick a length that fits the gap you actually have: 2, 3 or 5 minutes.',
      'Or start one yourself from anywhere in the app, no conversation needed.',
    ],
    phones: [
      {
        src: '/screenshots/screenshot-breathwork-coach.png',
        alt: 'Asking the Junoon coach to start a breathing exercise and being offered two, three or five minute options',
      },
      {
        src: '/screenshots/screenshot-breathwork-session.png',
        alt: 'A guided Box Breathing session in progress, showing the inhale cue and cycle count',
      },
    ],
  },
  {
    id: 'practice',
    tab: 'Yoga & Meditation',
    glyph: 'ध्यान',
    accent: '#C8902A',
    eyebrow: 'Practice on your schedule',
    title: 'Classes that fit',
    titleAccent: 'the day you’re having.',
    body: 'Live sessions and a full on-demand library, from short mobility work to full pranayama practice. The coach picks what suits your body and the time you have.',
    points: [
      'Yoga, meditation and pranayama, taught by instructors who know the tradition.',
      'Filter by length, style, or what your body needs that day.',
      'Every class explained functionally, so you know what it does and why.',
    ],
    phones: [
      {
        src: '/screenshots/screenshot-practice.png',
        alt: 'The Junoon practice library showing yoga and breathwork videos with durations',
      },
      {
        src: '/screenshots/screenshot-coach-pick.png',
        alt: 'The Junoon coach recommending a five minute Chair Yoga practice chosen for the season and your morning window',
      },
    ],
  },
  {
    id: 'habits',
    tab: 'Habit Building',
    glyph: 'दिनचर्या',
    accent: '#B5A898',
    eyebrow: 'Small habits, kept',
    title: 'A week you can',
    titleAccent: 'actually finish.',
    body: 'Junoon builds a plan around your real schedule and keeps it small enough to stick with. A two minute walk counts on the days that need it.',
    points: [
      'A weekly plan that adjusts when life gets in the way.',
      'Habits sized for a working day, like a short walk after lunch.',
      'See what you finished without turning practice into a scoreboard.',
    ],
    phones: [
      {
        src: '/screenshots/screenshot-plan.png',
        alt: 'The Junoon weekly plan showing habits and sessions scheduled across a Thursday',
      },
      {
        src: '/screenshots/screenshot-coach.png',
        alt: 'The Junoon coach shaping a personalised weekly plan in conversation',
      },
    ],
  },
]

const INTERVAL_MS = 7000

export default function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const select = useCallback((i: number) => setActive(i), [])

  useEffect(() => {
    if (paused || reducedMotion.current) return
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActive(i => (i + 1) % FEATURES.length)
      }
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const f = FEATURES[active]

  return (
    <section
      className="v2-section v2-fs"
      style={{ background: '#1C1410' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* All three panels stay mounted, stacked in one grid cell, and cross-fade.
          They were previously remounted via `key`, which re-requested each
          panel's images on every switch. That flooded Next's image optimizer,
          left the hero's first screenshot permanently pending, and flashed an
          empty frame on first view of a panel.

          No data-reveal in here either: the page's IntersectionObserver runs
          once at mount and unobserves, so anything revealed later would stay
          stuck at opacity 0. */}
      <div className="v2-fs-stack">
        {FEATURES.map((item, i) => {
          const isActive = i === active
          return (
            <div
              key={item.id}
              className={`v2-fs-panel v2-showcase${isActive ? ' is-active' : ''}`}
              role="tabpanel"
              id={`fs-panel-${item.id}`}
              aria-labelledby={`fs-tab-${item.id}`}
              aria-hidden={!isActive}
              // React 19 takes `inert` as a real boolean. Keeps the hidden
              // panels' links and buttons out of the tab order.
              inert={!isActive}
            >
              <div className="v2-showcase-phones">
                <PhoneFrame
                  className="v2-showcase-phone-a"
                  src={item.phones[0].src}
                  alt={item.phones[0].alt}
                  width={206}
                />
                <PhoneFrame
                  className="v2-showcase-phone-b"
                  src={item.phones[1].src}
                  alt={item.phones[1].alt}
                  width={206}
                />
              </div>

              <div>
                <div className="eyebrow" style={{ marginBottom: '18px' }}>
                  {item.eyebrow}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(28px, 3.2vw, 42px)',
                    fontWeight: 400,
                    lineHeight: 1.12,
                    letterSpacing: '-0.01em',
                    color: '#F5F0E8',
                    marginBottom: '18px',
                  }}
                >
                  {item.title}{' '}
                  <em style={{ fontStyle: 'italic', color: '#C8902A' }}>{item.titleAccent}</em>
                </h2>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 300,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                    maxWidth: '420px',
                    marginBottom: '24px',
                  }}
                >
                  {item.body}
                </p>

                <ul style={{ listStyle: 'none', display: 'grid', gap: '12px' }}>
                  {item.points.map(p => (
                    <li
                      key={p}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '16px 1fr',
                        gap: '12px',
                        alignItems: 'start',
                        fontSize: '13px',
                        fontWeight: 300,
                        color: 'rgba(245,240,232,0.62)',
                        lineHeight: 1.7,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: item.accent,
                          marginTop: '8px',
                        }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs: the old pillar cards, now the control for the panel above */}
      <div className="v2-pillars v2-fs-tabs" role="tablist" aria-label="What Junoon does">
        {FEATURES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`fs-tab-${item.id}`}
            aria-selected={i === active}
            aria-controls={`fs-panel-${item.id}`}
            className={`pillar-card-v2 v2-fs-tab${i === active ? ' is-active' : ''}`}
            onClick={() => select(i)}
            style={{ ['--pillar-accent' as string]: item.accent }}
          >
            <span className="v2-fs-tab-head">
              <span className="v2-fs-tab-title">{item.tab}</span>
              <span className="v2-deva" aria-hidden="true">
                {item.glyph}
              </span>
            </span>
            <span className="v2-fs-tab-body">{item.eyebrow}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
