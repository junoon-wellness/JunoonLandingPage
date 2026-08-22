'use client'

import { TOTAL_SPOTS } from '@/lib/constants'

interface SpotsProgressProps {
  /** Live active-subscriber count from beehiiv, server-rendered. */
  claimed: number
  isFlashing: boolean
}

/**
 * Urgency lives next to the action, not in a strip further down the page -
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
          className="jn-mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            // 11px floor (was 10px) — LV4-015's accessibility pass.
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--jn-mute)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--jn-sage)',
            }}
          />
          Founding spots claimed
        </span>
        <span
          className={`count-up jn-mono${isFlashing ? ' flashing' : ''}`}
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'var(--jn-turmeric)',
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
          background: 'var(--jn-hairline)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            // Was clay -> turmeric: two warm tones a few degrees apart, on a
            // warm ground, so the bar barely read as filling at all. Moss ->
            // sage runs dark to light in a hue nothing else here uses, which
            // is what makes a progress bar legible as progress.
            // (Moss fails AA as text — fine here, it is a fill.)
            background: 'linear-gradient(90deg, var(--jn-moss), var(--jn-sage))',
            transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}
