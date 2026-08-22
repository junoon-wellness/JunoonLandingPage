'use client'

import Link from 'next/link'
import { TOTAL_SPOTS } from '@/lib/constants'
import CountUp from '@/components/motion/CountUp'
import Reveal, { DrawLine } from '@/components/motion/Reveal'

export default function OfferBandV2() {
  return (
    <div className="v2-offer" style={{ zIndex: 2 }}>
      {/* The clay edge draws down the side as the band arrives. */}
      <DrawLine
        vertical
        duration={0.9}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: 'var(--jn-clay)',
        }}
      />

      <Reveal>
        <div className="eyebrow" style={{ marginBottom: '14px' }}>
          Founding member offer
        </div>
        <div
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(26px, 2.8vw, 34px)',
            fontWeight: 400,
            color: 'var(--jn-text)',
            lineHeight: 1.15,
            marginBottom: '14px',
            letterSpacing: '-0.008em',
          }}
        >
          First {TOTAL_SPOTS} members.{' '}
          <strong style={{ fontWeight: 600, color: 'var(--jn-turmeric)', fontStyle: 'italic' }}>
            Permanent pricing.
          </strong>
        </div>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: 'var(--jn-text-soft)',
            lineHeight: 1.75,
            maxWidth: '520px',
          }}
        >
          The first 500 members get their first month free, and $8.99 stays their price for life.
          Not a trial, not an intro rate that changes later.{' '}
          <Link href="/pricing" className="v2-link" style={{ color: 'var(--jn-turmeric)' }}>
            See full pricing.
          </Link>
        </p>
      </Reveal>

      <Reveal delay={0.1} style={{ textAlign: 'center', flexShrink: 0 }}>
        <CountUp
          to={TOTAL_SPOTS}
          duration={1400}
          style={{
            display: 'block',
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(56px, 7vw, 78px)',
            fontWeight: 300,
            lineHeight: 1,
            color: 'var(--jn-clay)',
            letterSpacing: '-0.02em',
          }}
        />
        <div
          className="jn-mono"
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--jn-mute)',
            marginTop: '8px',
          }}
        >
          Founding spots total
        </div>
      </Reveal>
    </div>
  )
}
