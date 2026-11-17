'use client'

import { useState, type ReactNode } from 'react'
import InView from '@/components/home/InView'
import { buildWheel, WHEEL_R } from '@/components/home/wheel-geometry'
import { LIMBS } from '@/lib/landing-copy'

/**
 * "Your Samadhi Score": the ring of the limbs does the explaining (option A,
 * Arnav, HQ DM Tue 17 Nov 2026: "I feel like the information here can be
 * presented in a more concise and organized way. I dont like how you expand
 * and it takes up so much space"). The <details> fold under the paragraph is
 * gone; each of the seven chips round the ring, and Samadhi in the middle, is
 * a button. Hover or click on a desktop, tap on a phone, and the one box under
 * the paragraph shows that limb's number, name and meaning (LIMBS.items, word
 * for word). Samadhi is shown first.
 *
 * The box never changes height: all eight entries sit in the same grid cell
 * and only the chosen one is visible, so the box is always as tall as the
 * longest one at that width and the page never jumps.
 *
 * The slow turn pauses while the pointer is over the ring or a chip has
 * keyboard focus (app/theme.css, "the limbs wheel"), so a chip holds still to
 * be clicked.
 *
 * LIMBS.body (the Patanjali paragraph) is not shown here, pending Arnav's call;
 * the words stay in lib/landing-copy.ts.
 */

/** Seven spokes and seven labels around the ring; Samadhi is the centre.
 * Each label's angle from the top (degrees, clockwise); all sit 42% of the
 * ring's width from the centre (the same places as the mock-up's x/y).
 * In LIMBS.items order: label i is LIMBS.items[i]. */
const RING_LABELS: [string, number][] = [
  ['Yama', 0],
  ['Niyama', 51.4],
  ['Asana', 102.9],
  ['Pranayama', 154.3],
  ['Pratyahara', 205.7],
  ['Dharana', 257.1],
  ['Dhyana', 308.6],
]
const RING_R = 42

/** Samadhi, the eighth limb, sits in the middle. */
const CENTRE = 7

/** The ornate wheel under the labels (Arnav, HQ DM Tue 17 Nov 2026: "I want
 * the wheel to look more artistic like this"): see components/home/wheel-geometry.ts.
 * Its seven carved pillars are the spokes, one at each label's angle. */
const WHEEL = buildWheel(RING_LABELS.map(([, angle]) => angle))

/** Which entrance the ring plays (see app/home.css, "4b"). Kush's pick,
 * Mon 9 Nov 10:22 PM: 'orbit' ("Fan out like a clock"). 'sweep' is the
 * other one, kept so a switch back is this one line. */
const RING_VARIANT: 'sweep' | 'orbit' = 'orbit'

/** Round 2 (Kush, 9:30 call Tue 10 Nov: "a version of ... the fan one ...
 * rotating in a circle after it's been fanned out just slowly"): once the ring
 * has fanned out, the seven limbs and their spokes turn slowly round Samadhi,
 * the labels staying upright. `false` brings back the still ring. */
const RING_SPIN = true

export default function LimbsWheel({ children }: { children: ReactNode }) {
  const [sel, setSel] = useState(CENTRE)

  /** Hover selects with a mouse only; a tap or a click arrives as onClick. */
  const hover = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setSel(i)
  }

  return (
    <div className="hw-score hw-limbs">
      <InView
        className="k-ring"
        data-variant={RING_VARIANT}
        data-spin={RING_SPIN || undefined}
        role="group"
        aria-label="The eight limbs of yoga in a ring, with Samadhi in the middle"
      >
        <div className="halo" />
        <div className="orb">
          <svg viewBox="0 0 100 100" className="wheel" aria-hidden="true">
            <circle className="w1" cx="50" cy="50" r={WHEEL_R.rimOuter} />
            <circle className="w2" cx="50" cy="50" r={WHEEL_R.rimOuter2} />
            {WHEEL.cord.map((d, i) => (
              <path key={`cord${i}`} className="cord" d={d} />
            ))}
            {WHEEL.knots.map(([x, y]) => (
              <circle key={`k${x}-${y}`} className="dot" cx={x.toFixed(2)} cy={y.toFixed(2)} r="0.22" />
            ))}
            <circle className="w2" cx="50" cy="50" r={WHEEL_R.rimInner2} />
            <circle className="w1" cx="50" cy="50" r={WHEEL_R.rimInner} />
            {WHEEL.beads.map(([x, y]) => (
              <circle key={`b${x}-${y}`} className="dot" cx={x.toFixed(2)} cy={y.toFixed(2)} r="0.3" />
            ))}
            <circle className="w1" cx="50" cy="50" r={WHEEL_R.hubOuter} />
            <circle className="w2" cx="50" cy="50" r={WHEEL_R.hubInner} />
            <path className="tick" d={WHEEL.hubTicks} />
            <path className="petal" d={WHEEL.lotusOuter} />
            <path className="petal2" d={WHEEL.lotusInner} />
            <path className="petal2" d={WHEEL.lotusBack} />
            <circle className="w1" cx="50" cy="50" r={WHEEL_R.lotusBase} />
          </svg>
          <svg viewBox="0 0 100 100" className="spokes" aria-hidden="true">
            {WHEEL.pillars.map((p, i) => (
              <g
                key={RING_LABELS[i][0]}
                className={sel === i ? 'on' : undefined}
                style={{ '--i': i } as React.CSSProperties}
              >
                <path className="po" d={p.outline} pathLength={1} />
                <path className="pb" d={p.bands} pathLength={1} />
                <path className="pf" d={p.flute} pathLength={1} />
              </g>
            ))}
          </svg>
          {RING_LABELS.map(([name, angle], i) => (
            <button
              key={name}
              type="button"
              className="lb"
              style={{ '--a': `${angle}deg`, '--r': RING_R, '--i': i } as React.CSSProperties}
              aria-pressed={sel === i}
              aria-controls="limb-box"
              onClick={() => setSel(i)}
              onFocus={() => setSel(i)}
              onPointerEnter={hover(i)}
            >
              <b>{name}</b>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="centre"
          aria-pressed={sel === CENTRE}
          aria-controls="limb-box"
          onClick={() => setSel(CENTRE)}
          onFocus={() => setSel(CENTRE)}
          onPointerEnter={hover(CENTRE)}
        >
          {LIMBS.items[CENTRE].name}
        </button>
      </InView>
      <div className="hw-text">
        {children}
        <div className="k-limbbox" id="limb-box" aria-live="polite">
          {LIMBS.items.map((l, i) => (
            <div key={l.name} className="k-limbbox-i" data-on={sel === i || undefined} aria-hidden={sel !== i}>
              <span className="ln">{i + 1}</span>
              <b>{l.name}</b>
              <span className="lt">{l.body}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
