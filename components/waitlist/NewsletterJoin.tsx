'use client'

import SignupForm from './SignupForm'

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

/*
 * LV5-074 (website refresh, phase 4): MARKUP AND STYLE ONLY. The headline's
 * gold italic clause, the dotted code-font topic chips and the two
 * "NO SPAM / UNSUBSCRIBE ANYTIME" pills became plain text: the topics as a
 * simple list, the pills as one quiet line. Every word is unchanged; the
 * reassurance line uses the exact words the form itself already shows on
 * its full variant ("No spam. Unsubscribe anytime.").
 *
 * 🔴 SignupForm and app/api/waitlist/route.ts are NOT touched (the route's
 * utm_source "Waitlist" drives the beehiiv welcome automation). Never submit
 * this form to test it: every submit is a real signup.
 */
export default function NewsletterJoin({
  source,
  onSignupSuccess,
  firstSection = false,
}: NewsletterJoinProps) {
  return (
    <section
      className={`v2-section v2-two-col${firstSection ? ' v2-section-top v2-section-newsletter' : ''}`}
      style={{
        background: 'var(--jn-sheet)',
        borderBottom: '1px solid var(--jn-hairline)',
        // LV5-031: 'start' pins both columns' tops together.
        alignItems: 'start',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1224px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(34px, 4vw, 52px)',
            fontWeight: 400,
            color: 'var(--jn-text)',
            lineHeight: 1.06,
            margin: '0 0 16px',
            letterSpacing: '-0.008em',
          }}
        >
          Get updates by email. Join the newsletter.
        </h1>
        <p
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: 'var(--jn-text-dim)',
            lineHeight: 1.6,
            maxWidth: '30em',
            margin: '0 0 20px',
          }}
        >
          {/* Kush, 2026-08-23: his exact replacement line, verbatim. */}
          Deepen your understanding of ancient Indian wellness practices and discover how they
          connect with modern science and everyday life.
        </p>

        <ul className="rf-newsletter-topics" aria-label="What the newsletter covers">
          {TOPICS.map(topic => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <p className="rf-newsletter-note">No spam. Unsubscribe anytime.</p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SignupForm id="join" source={source} onSignupSuccess={onSignupSuccess} compact />
      </div>
    </section>
  )
}
