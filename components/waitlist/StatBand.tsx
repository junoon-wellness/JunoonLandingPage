'use client'

import { TOTAL_SPOTS } from '@/lib/constants'
import CountUp from '@/components/motion/CountUp'
import Reveal, { DrawLine } from '@/components/motion/Reveal'

const stats = [
  { value: TOTAL_SPOTS, label: 'Founding spots' },
  { value: 6, label: 'Practices included' },
  { value: 1, label: 'AI Coach' },
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
                color: 'var(--jn-turmeric)',
              }}
            />
            <span
              className="jn-mono"
              style={{
                fontSize: '10px',
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
