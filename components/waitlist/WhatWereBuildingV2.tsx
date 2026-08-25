'use client'

import Reveal, { DrawLine } from '@/components/motion/Reveal'

/**
 * The 01-04 list, refreshed to the current product truth (spec §B4).
 *
 * "A community that gets it" came out and the weekly planning ritual went in:
 * the ritual is the thing the app actually opens with, and the community line
 * was describing an audience rather than a feature. The AI Coach row was
 * rewritten to say what it does (learns from what you finish) instead of
 * asserting that it personalises.
 */
const features = [
  {
    num: '01',
    title: 'Live and on-demand classes',
    body: 'Yoga, meditation, pranayama, and breathwork. Taught live, available on demand, at every level and around real schedules.',
  },
  {
    num: '02',
    title: 'An AI Coach that learns your week',
    body: 'Recommends what to practice next based on what you actually finished, what felt right, and the time you have. Guidance that used to require a personal teacher.',
  },
  {
    num: '03',
    title: 'A weekly planning ritual',
    body: 'Every Sunday the coach lays out your week: what to practice, when it fits your schedule. You approve it, change it, or tell it what to fix.',
  },
  {
    // Kush, 2026-08-23: his exact replacement copy for row 04 — verbatim.
    num: '04',
    title: 'Ancient Indian backed philosophy',
    body: 'Knowledge grounded in ancient India, seamlessly blended with modern science and psychology.',
  },
]

const RULE: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: '0.5px',
  background: 'var(--jn-hairline)',
}

export default function WhatWereBuildingV2() {
  return (
    <section className="v2-section">
      {/* LV5-031: the "What we're building" eyebrow + its 40px margin are gone
          (Kush: "completely remove SC 4 ... move up the elements in that
          space after"). The headline opens the section. */}

      {/* Kush, 2026-08-24: "how can we reduce the empty space on desktop in
          these areas". MEASURED at 1999px before the change: this grid's left
          column was 210px tall next to a 524px right column, so 314px — about
          60% of the section — sat blank underneath it, and the intro paragraph
          is capped at 420px inside a 913px column so another ~490px sat blank
          beside it.

          `v2-two-col--intro` (globals.css) narrows the left track and centres
          it against the list ABOVE 1024px only. It is a MODIFIER, not an edit
          to `.v2-two-col`: that class is shared with NewsletterJoin on
          /library, which Kush tuned separately in LV5-032 and must not move.

          The inline alignItems is gone rather than overridden — it beat the
          stylesheet, so the modifier could not have worked while it was here.
          Below 1024px the grid is still a single column and unaffected. */}
      <div className="v2-two-col v2-two-col--intro">
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              color: 'var(--jn-text)',
              marginBottom: '20px',
            }}
          >
            A practice that{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>knows you.</em>
          </h2>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--jn-text-dim)',
              lineHeight: 1.75,
              maxWidth: '420px',
            }}
          >
            Junoon brings together yoga, pranayama, Ayurveda and breathwork with an AI Coach that
            makes expert guidance personal. Not a library you browse through. A practice that
            adapts to you.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {features.map((f, i) => (
            <Reveal
              key={f.num}
              delay={i * 0.09}
              y={16}
              amount={0.35}
              style={{
                position: 'relative',
                padding: '20px 0',
                display: 'grid',
                gridTemplateColumns: '34px 1fr',
                gap: '16px',
                alignItems: 'start',
              }}
            >
              {/* Rules draw across rather than appearing. The row's own reveal
                  carries them along, which reads as the line pulling the row
                  into place. */}
              <DrawLine delay={i * 0.09} duration={0.9} style={{ ...RULE, top: 0 }} />
              {i === features.length - 1 && (
                <DrawLine
                  delay={i * 0.09 + 0.12}
                  duration={0.9}
                  style={{ ...RULE, bottom: 0 }}
                />
              )}

              <div
                className="jn-mono"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  // LV5-031: were sage (SC4 "remove the green elements").
                  // Turmeric measures 6.46:1 on the ground, so it passes at
                  // label size where clay (3.63:1) would not.
                  color: 'var(--jn-turmeric)',
                  paddingTop: '4px',
                }}
              >
                {f.num}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '19px',
                    fontWeight: 500,
                    color: 'var(--jn-text)',
                    marginBottom: '5px',
                    lineHeight: 1.25,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--jn-text-soft)',
                    lineHeight: 1.7,
                  }}
                >
                  {f.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
