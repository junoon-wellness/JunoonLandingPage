'use client'

import { TOTAL_SPOTS } from '@/lib/constants'

interface SpotsProgressProps {
  /** Live active-subscriber count from beehiiv, server-rendered. */
  claimed: number
  isFlashing: boolean
}

/**
 * Urgency lives next to the action, not in a strip further down the page —
 * this sits directly under the hero form.
 */
export default function SpotsProgress({ claimed, isFlashing }: SpotsProgressProps) {
  const taken = Math.min(TOTAL_SPOTS, Math.max(0, claimed))
  const pct = Math.min(100, (taken / TOTAL_SPOTS) * 100)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '9px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#93826F',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#B5522A',
            }}
          />
          Founding spots claimed
        </span>
        <span
          className={`count-up${isFlashing ? ' flashing' : ''}`}
          style={{
            fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: '#C8902A',
            display: 'inline-block',
          }}
        >
          {taken} / {TOTAL_SPOTS}
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={taken}
        aria-valuemin={0}
        aria-valuemax={TOTAL_SPOTS}
        aria-label={`${taken} of ${TOTAL_SPOTS} founding spots claimed`}
        style={{
          height: '3px',
          width: '100%',
          background: 'rgba(245,240,232,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #B5522A, #C8902A)',
            transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}
