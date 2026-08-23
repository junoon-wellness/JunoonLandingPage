'use client'

import SignupForm from './SignupForm'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

interface NewsletterJoinProps {
  source: string
  onSignupSuccess?: () => void
  /** /library renders this directly under NavV2 with nothing above it — the
      standard .v2-section 56px top padding tucks the headline under the
      fixed nav bar. Adds the `.v2-section-top` modifier (84-92px, matching
      .pr-hero / .ab-hero) for that case. */
  firstSection?: boolean
}

/**
 * LV5-018: the two-column newsletter join layout, extracted out of SecondCTA
 * so /library can reuse the same headline + topics + chips + stacked-form
 * treatment without duplicating the markup. SecondCTA itself came off Home
 * entirely (Kush: the page no longer has a newsletter section at the
 * bottom) so its file is now unused, but the pattern it defined lives on
 * here as the single copy.
 *
 * Unlike SecondCTA, there is no "See the Library tab" link in the chips row
 * — this component IS rendered on /library, so that link would point at
 * itself.
 */
const TOPICS = [
  'App updates and news',
  'Wellness articles',
  'Live class announcements',
  'Recipes and more',
]

export default function NewsletterJoin({
  source,
  onSignupSuccess,
  firstSection = false,
}: NewsletterJoinProps) {
  return (
    <section
      className={`v2-section v2-two-col${firstSection ? ' v2-section-top' : ''}`}
      style={{
        background: 'var(--jn-surface)',
        borderTop: '0.5px solid rgba(245,240,232,0.06)',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* LV5-022 SC5 / LV5-024: /library's header panel used to render HERE.
          This `<section>` is `.v2-section`, which is `position: relative`, so
          the old call scoped to this local box instead of the page wrapper.
          It now renders at app/library/page.tsx as `LIBRARY_JAALI` — see the
          "ONE GEOMETRY" note atop components/brand/Jaali.tsx. */}
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
            Get updates by email.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>
              Join the newsletter.
            </em>
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--jn-text-soft)',
              lineHeight: 1.75,
              maxWidth: '440px',
              marginBottom: '18px',
            }}
          >
            App updates and news, wellness articles, live class announcements, recipes and more.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.05}
          delayChildren={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 16px',
            maxWidth: '380px',
            marginBottom: '18px',
          }}
        >
          {TOPICS.map(topic => (
            <RevealItem
              key={topic}
              as="span"
              y={10}
              className="jn-mono"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'none',
                color: 'var(--jn-text-soft)',
                lineHeight: 1.5,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--jn-sage)',
                  flexShrink: 0,
                }}
              />
              {topic}
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup
          stagger={0.07}
          delayChildren={0.12}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {['No spam', 'Unsubscribe anytime'].map(b => (
            <RevealItem
              key={b}
              as="span"
              y={10}
              className="jn-mono"
              style={{
                fontSize: '11px',
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
        <SignupForm id="join" source={source} onSignupSuccess={onSignupSuccess} compact />
      </Reveal>
    </section>
  )
}
