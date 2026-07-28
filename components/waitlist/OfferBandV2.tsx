import { TOTAL_SPOTS } from '@/lib/constants'

export default function OfferBandV2() {
  return (
    <div className="v2-offer" style={{ zIndex: 2 }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: '#B5522A',
        }}
      />

      <div>
        <div className="eyebrow" style={{ marginBottom: '14px' }}>
          Founding member offer
        </div>
        <div
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(26px, 2.8vw, 34px)',
            fontWeight: 400,
            color: '#F5F0E8',
            lineHeight: 1.15,
            marginBottom: '14px',
            letterSpacing: '-0.008em',
          }}
        >
          First {TOTAL_SPOTS} members.{' '}
          <strong style={{ fontWeight: 600, color: '#C8902A', fontStyle: 'italic' }}>
            Permanent pricing.
          </strong>
        </div>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(245,240,232,0.62)',
            lineHeight: 1.75,
            maxWidth: '520px',
          }}
        >
          When Junoon launches, founding members lock in a permanent discount. Not a trial, not a
          first-month deal. The price you join at is the price you keep. We&apos;re doing this
          because we want the people who believed in us early to benefit from being early.
        </p>
      </div>

      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(56px, 7vw, 78px)',
            fontWeight: 300,
            lineHeight: 1,
            color: '#C8902A',
            letterSpacing: '-0.02em',
          }}
        >
          {TOTAL_SPOTS}
        </div>
        <div
          style={{
            fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#93826F',
            marginTop: '8px',
          }}
        >
          Founding spots total
        </div>
      </div>
    </div>
  )
}
