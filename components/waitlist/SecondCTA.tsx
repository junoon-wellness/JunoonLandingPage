'use client'

import Link from 'next/link'
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
 *
 * LV5-004: reformatted from a generic "join anyway" pitch into the newsletter
 * join — a teaser of the full newsletter home on the Library tab. Still one
 * list under the hood (same beehiiv publication, same `utm_source`), just
 * framed honestly now that there's no waitlist left to be a fallback for.
 */
const TOPICS = [
  'App updates and news',
  'Wellness articles',
  'Live class announcements',
  'Recipes and more',
]

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
          {/* LV5-002: "No card" dropped — Kush, 08/20 call: "I can't say no
              card because we do require card" (referring to the app's free
              month). Misleading beside this section either way once it's
              read as app-adjacent copy rather than a pure email opt-in. */}
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
          <RevealItem as="span" y={10}>
            <Link
              href="/library"
              className="v2-link jn-mono"
              style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'var(--jn-turmeric)',
                textDecoration: 'none',
              }}
            >
              See the Library tab →
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>

      <Reveal delay={0.1} style={{ position: 'relative', zIndex: 1 }}>
        {/* LV5-002: `#join` moved here from the hero form, which is gone now
            that the hero's CTA is the App Store badge. This is the only
            signup form left on the page, so this is where the anchor
            belongs. */}
        <SignupForm id="join" source={source} onSignupSuccess={onSignupSuccess} compact />
      </Reveal>
    </section>
  )
}
