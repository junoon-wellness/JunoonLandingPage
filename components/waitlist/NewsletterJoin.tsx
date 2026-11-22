'use client'

import SignupForm from './SignupForm'
import Reveal from '@/components/motion/Reveal'

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
export default function NewsletterJoin({
  source,
  onSignupSuccess,
  firstSection = false,
}: NewsletterJoinProps) {
  return (
    <section
      className={`v2-section v2-two-col${firstSection ? ' v2-section-top v2-section-newsletter' : ''}`}
      style={{
        // Rework, Mon 9 Nov: at the top of /library it sits on the page's
        // bark to soil band (components/site/PageCrest), so it lets it show.
        background: firstSection ? 'transparent' : 'var(--jn-surface)',
        borderTop: '0.5px solid rgba(245,240,232,0.06)',
        // LV5-031 (Kush: "first name is clipping, move it down to be aligned
        // with the text to the left"): was 'center', which let the taller
        // form column start ABOVE the headline. 'start' pins both columns'
        // tops together; the form's first label now lines up with the headline.
        alignItems: 'start',
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
            Join the{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>newsletter.</em>
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
            {/* Arnav, Sat 21 Nov 2026 7:38 PM: "Information here needs to be cleaner/more concise".
                One line replaces Kush's 23 Aug paragraph; the topic bullets and the No spam /
                Unsubscribe tags are gone (the form already says "No spam. Unsubscribe anytime."). */}
            Ancient Indian practices, the science behind them, and what&apos;s new in Junoon.
          </p>
        </Reveal>

      </div>

      <Reveal delay={0.1} style={{ position: 'relative', zIndex: 1 }}>
        <SignupForm id="join" source={source} onSignupSuccess={onSignupSuccess} compact />
      </Reveal>
    </section>
  )
}
