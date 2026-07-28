'use client'

import SignupForm from './SignupForm'
import SpotsProgress from './SpotsProgress'
import DeviceCarousel from './DeviceCarousel'

interface HeroV2Props {
  source: string
  claimed: number
  isFlashing: boolean
  onSignupSuccess: () => void
}

export default function HeroV2({ source, claimed, isFlashing, onSignupSuccess }: HeroV2Props) {
  return (
    <section className="v2-hero noise-bg" style={{ background: '#1C1410', overflow: 'hidden' }}>
      {/* Faint engineering grid replaces the old 720px yantra motif */}
      <div className="v2-grid" aria-hidden="true" />

      {/* ── Left: the pitch and the action ──
          On mobile this wrapper becomes `display: contents` so its children
          promote to grid items and the carousel can be ordered in between the
          paragraph and the form. See .v2-hero-copy in globals.css. */}
      <div className="v2-hero-copy" style={{ position: 'relative', zIndex: 2, maxWidth: '560px' }}>
        <h1
          className="v2-hero-headline fade-up delay-2"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: '-0.015em',
            color: '#F5F0E8',
            marginBottom: '22px',
          }}
        >
          Wellness rooted in{' '}
          <em style={{ fontStyle: 'italic', color: '#C8902A' }}>where you&apos;re from.</em>
        </h1>

        <p
          className="v2-hero-sub fade-up delay-3"
          style={{
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(245,240,232,0.65)',
            maxWidth: '460px',
            marginBottom: '32px',
          }}
        >
          A modern wellness platform built for the South Asian diaspora. Live classes, on-demand
          content, and an AI Coach that personalises your practice, grounded in the traditions you
          grew up around.
        </p>

        <div className="v2-hero-form fade-up delay-4">
          <SignupForm id="join" source={source} onSignupSuccess={onSignupSuccess} withPhone />
        </div>

        <div
          className="v2-hero-progress fade-up delay-5"
          style={{ marginTop: '30px', maxWidth: '420px' }}
        >
          <SpotsProgress claimed={claimed} isFlashing={isFlashing} />
        </div>
      </div>

      {/* ── Right: the actual product, cycling through the real app screens ── */}
      <div className="v2-devices fade-up delay-3">
        <DeviceCarousel />
      </div>
    </section>
  )
}
