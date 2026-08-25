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

      {/* Kush, 2026-08-24: "theres too much gap between the left and right
          columns still is there anyway to add more info horizontally in those
          sections rather than have it all be vertical".

          MEASURED at 1999px before this change: a heading in a 622px left
          column beside a single vertical list in an 864px right column, with
          the intro paragraph capped at 420px. The section was 607px tall and
          carried a wide empty gutter down the middle.

          Restructured to use the width instead of the height: the heading and
          intro now run ACROSS the top as one band, and the four points sit in
          a horizontal row beneath. `.wb-grid` is 4-across above 1600px, 2x2
          between 1025 and 1599, and a single column below that — so the phone
          and tablet layouts keep the stacked list they already had.

          The hairlines: each card carries its own top rule, so on a wide
          screen four aligned rules read as one line across the section. The
          closing rule under the last item only makes sense when the list is
          stacked, so `.wb-rule-end` is hidden above 1025px. */}
      <div className="wb-head">
        <Reveal>
          <h2 className="wb-title">
            A practice that{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>knows you.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="wb-intro">
            Junoon brings together yoga, pranayama, Ayurveda and breathwork with an AI Coach that
            makes expert guidance personal. Not a library you browse through. A practice that
            adapts to you.
          </p>
        </Reveal>
      </div>

      <div className="wb-grid">
        {features.map((f, i) => (
          <Reveal key={f.num} delay={i * 0.09} y={16} amount={0.35} className="wb-card">
            <DrawLine delay={i * 0.09} duration={0.9} style={{ ...RULE, top: 0 }} />
            {i === features.length - 1 && (
              <DrawLine
                delay={i * 0.09 + 0.12}
                duration={0.9}
                className="wb-rule-end"
                style={{ ...RULE, bottom: 0 }}
              />
            )}
            <div className="jn-mono wb-num">{f.num}</div>
            <div className="wb-card-body">
              <div className="wb-card-title">{f.title}</div>
              <div className="wb-card-copy">{f.body}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
