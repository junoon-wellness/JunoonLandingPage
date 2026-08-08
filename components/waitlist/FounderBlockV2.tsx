'use client'

import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'

// public/arjav-photo.jpg is a 400x400 crop of the source photo, centred on the
// face. The source was a wide seated shot, so it needed cropping rather than
// dropping in as-is.

export default function FounderBlockV2() {
  return (
    <section
      className="v2-section v2-founder"
      style={{
        background: 'var(--jn-bg)',
        borderTop: '0.5px solid rgba(245,240,232,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '36px',
      }}
    >
      <Reveal
        x={-28}
        y={0}
        className="v2-founder-photo"
        style={{
          background: 'var(--jn-surface)',
          flexShrink: 0,
          border: '0.5px solid rgba(245,240,232,0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Was a raw <img>, so it shipped the full 400x400 JPEG to a 168px
            slot with no format negotiation. */}
        <Image
          src="/arjav-photo.jpg"
          alt="Arjav, founder of Junoon Wellness"
          width={400}
          height={400}
          sizes="(max-width: 768px) 140px, 168px"
          style={{ width: '100%', height: '100%' }}
        />
      </Reveal>

      <Reveal x={28} y={0} delay={0.1} className="v2-founder-text" style={{ maxWidth: '540px' }}>
        <blockquote
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '21px',
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.85)',
            lineHeight: 1.5,
            marginBottom: '14px',
            fontWeight: 400,
          }}
        >
          &ldquo;I spent years watching South Asian clients try platforms that just didn&apos;t
          speak to them. Junoon is what I wish existed when I started coaching.&rdquo;
        </blockquote>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--jn-text)',
            letterSpacing: '0.04em',
          }}
        >
          Arjav · Founder, Junoon Wellness
        </div>
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
      </Reveal>
    </section>
  )
}
