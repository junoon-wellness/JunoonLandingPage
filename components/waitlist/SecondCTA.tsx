'use client'

import SignupForm from './SignupForm'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

interface SecondCTAProps {
  source: string
  onSignupSuccess: () => void
}

/**
 * Bottom-of-page CTA. Replaces the old newsletter strip - the toggle between
 * "waitlist" and "newsletter" was dropped, because beehiiv's welcome Automation
 * filters on a single acquisition source ("Waitlist"). One list, one action.
 */
export default function SecondCTA({ source, onSignupSuccess }: SecondCTAProps) {
  return (
    <section
      className="v2-section v2-two-col drift-bg"
      style={{
        background: 'var(--jn-surface)',
        borderTop: '0.5px solid rgba(245,240,232,0.06)',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(26px, 2.8vw, 36px)',
              fontWeight: 400,
              color: 'var(--jn-text)',
              lineHeight: 1.15,
              marginBottom: '14px',
              letterSpacing: '-0.008em',
            }}
          >
            Still thinking it over?{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>Join anyway.</em>
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--jn-text-soft)',
              lineHeight: 1.75,
              maxWidth: '440px',
            }}
          >
            Joining costs nothing and commits you to nothing. It holds your founding-member
            pricing while there are still spots left, and we&apos;ll email you once before launch.
            Not weekly.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.07}
          delayChildren={0.12}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '18px' }}
        >
          {['No spam', 'No card', 'Unsubscribe anytime'].map(b => (
            <RevealItem
              key={b}
              as="span"
              y={10}
              className="jn-mono"
              style={{
                fontSize: '10px',
                letterSpacing: '0.1em',
                padding: '5px 12px',
                border: '0.5px solid rgba(245,240,232,0.12)',
                borderRadius: '2px',
                color: 'rgba(245,240,232,0.7)',
              }}
            >
              {b}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal delay={0.1} style={{ position: 'relative', zIndex: 1 }}>
        <SignupForm source={source} onSignupSuccess={onSignupSuccess} compact />
      </Reveal>
    </section>
  )
}
