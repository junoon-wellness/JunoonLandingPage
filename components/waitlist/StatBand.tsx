'use client'

import { TOTAL_SPOTS } from '@/lib/constants'
import CountUp from '@/components/motion/CountUp'
import Reveal, { DrawLine } from '@/components/motion/Reveal'

// The middle numeral carries the second hue. Middle rather than arbitrary:
// three identical numbers read as a list, one different in the centre reads
// as a deliberate emphasis — and "practices included" is the substantive
// product claim of the three, the other two being scarcity and a feature name.
const stats = [
  { value: TOTAL_SPOTS, label: 'Founding spots', accent: 'var(--jn-turmeric)' },
  { value: 6, label: 'Practices included', accent: 'var(--jn-sage)' },
  { value: 1, label: 'AI Coach', accent: 'var(--jn-turmeric)' },
]

/**
 * What's left of the old CounterBar once the progress bar moved into the hero.
 * Three facts, no duplicated urgency.
 *
 * v3 (spec §B3): the numerals roll up on first reveal and the 0.5px
 * separators draw themselves in.
 */
export default function StatBand() {
  return (
    <div className="v2-stats" style={{ position: 'relative', zIndex: 2, background: 'var(--jn-bg)' }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          {i > 0 && (
            <DrawLine
              vertical
              delay={0.12 * i}
              duration={0.6}
              style={{
                width: '0.5px',
                height: '32px',
                background: 'rgba(245,240,232,0.12)',
              }}
            />
          )}
          <Reveal
            delay={0.08 * i}
            y={12}
            amount={0.6}
            style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}
          >
            <CountUp
              to={s.value}
              duration={1000}
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '30px',
                fontWeight: 400,
                lineHeight: 1,
                color: s.accent,
              }}
            />
            <span
              className="jn-mono"
              style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: 'var(--jn-mute)',
              }}
            >
              {s.label}
            </span>
          </Reveal>
        </div>
      ))}
    </div>
  )
}
