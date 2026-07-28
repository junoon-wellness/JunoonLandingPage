import { TOTAL_SPOTS } from '@/lib/constants'

const stats = [
  { value: String(TOTAL_SPOTS), label: 'Founding spots' },
  { value: '6', label: 'Practices included' },
  { value: '1', label: 'AI Coach' },
]

/**
 * What's left of the old CounterBar once the progress bar moved into the hero.
 * Three facts, no duplicated urgency.
 */
export default function StatBand() {
  return (
    <div className="v2-stats" style={{ position: 'relative', zIndex: 2, background: '#1C1410' }}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{ display: 'flex', alignItems: 'center', gap: '48px' }}
        >
          {i > 0 && (
            <span
              aria-hidden="true"
              style={{
                width: '0.5px',
                height: '32px',
                background: 'rgba(245,240,232,0.12)',
              }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '30px',
                fontWeight: 400,
                lineHeight: 1,
                color: '#C8902A',
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#93826F',
              }}
            >
              {s.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
