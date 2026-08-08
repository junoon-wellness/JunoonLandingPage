'use client'

import Image from 'next/image'
import { TOTAL_SPOTS } from '@/lib/constants'
import CountUp from '@/components/motion/CountUp'
import Reveal, { DrawLine } from '@/components/motion/Reveal'

/**
 * OfferBand + FounderBlock, merged (v4 spec §C1).
 *
 * v3 ran these as two consecutive full-height bands, which read as the page
 * saying the same thing twice with a photo in between. One band, one reveal:
 * the offer argues, the founder vouches for it, and they share a rule down
 * the middle.
 *
 * ⚠️ All copy is carried over verbatim from the two v3 components. Spec §C1
 * is explicit that nothing here gets rewritten.
 */
export default function OfferFounderBand() {
  return (
    <section className="jn-offer-founder" aria-label="Founding member offer">
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

      {/* ── the offer ── */}
      <Reveal className="jn-of-offer">
        <div className="eyebrow" style={{ marginBottom: '14px' }}>
          Founding member offer
        </div>
        <div className="jn-of-headline">
          First {TOTAL_SPOTS} members.{' '}
          <strong>Permanent pricing.</strong>
        </div>
        <p className="jn-of-body">
          When Junoon launches, founding members lock in a permanent discount. Not a trial, not a
          first-month deal. The price you join at is the price you keep. We&apos;re doing this
          because we want the people who believed in us early to benefit from being early.
        </p>

        <div className="jn-of-count">
          <CountUp
            to={TOTAL_SPOTS}
            duration={1400}
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(52px, 6vw, 76px)',
              fontWeight: 300,
              lineHeight: 1,
              color: 'var(--jn-clay)',
              letterSpacing: '-0.02em',
            }}
          />
          <span
            className="jn-mono"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--jn-mute)' }}
          >
            Founding spots total
          </span>
        </div>
      </Reveal>

      {/* ── the founder, vouching for it ── */}
      <Reveal delay={0.12} className="jn-of-founder">
        <div className="jn-of-photo">
          <Image
            src="/arjav-photo.jpg"
            alt="Arjav, founder of Junoon Wellness"
            width={400}
            height={400}
            sizes="(max-width: 900px) 128px, 148px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <blockquote className="jn-of-quote">
            &ldquo;I spent years watching South Asian clients try platforms that just didn&apos;t
            speak to them. Junoon is what I wish existed when I started coaching.&rdquo;
          </blockquote>
          <div className="jn-of-name">Arjav · Founder, Junoon Wellness</div>
          <div
            className="jn-mono"
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--jn-mute)',
              marginTop: '5px',
            }}
          >
            Yoga instructor · 80+ coaching clients
          </div>
        </div>
      </Reveal>
    </section>
  )
}
