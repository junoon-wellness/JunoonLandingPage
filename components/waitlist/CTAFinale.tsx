'use client'

import SignupForm from './SignupForm'
import SpotsProgress from './SpotsProgress'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

interface CTAFinaleProps {
  source: string
  claimed: number
  isFlashing: boolean
  onSignupSuccess: () => void
}

/**
 * THE CLOSE (v4 spec §C2). SecondCTA, grown into a statement.
 *
 * ⚠️ ROUND 3 SWAPPED THE FORMS. The hero now carries the full three-field
 * form and `#join` with it; this is the short email-only capture. The
 * reasoning: someone at the bottom of the page has already read everything
 * and just needs the smallest possible ask, while someone at the top is the
 * one worth asking for a phone number.
 */
export default function CTAFinale({
  source,
  claimed,
  isFlashing,
  onSignupSuccess,
}: CTAFinaleProps) {
  return (
    <section className="jn-finale drift-bg" aria-labelledby="finale-heading">
      <div className="jn-finale-inner">
        <Reveal>
          <div className="eyebrow jn-finale-eyebrow">Last thing</div>
          <h2 id="finale-heading" className="jn-finale-h2">
            Still thinking it over? <em>Join anyway.</em>
          </h2>
          <p className="jn-finale-sub">
            Joining costs nothing and commits you to nothing. It holds your founding-member
            pricing while there are still spots left, and we&apos;ll email you once before launch.
            Not weekly.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="jn-finale-form">
          <SignupForm source={source} onSignupSuccess={onSignupSuccess} inline />
        </Reveal>

        <Reveal delay={0.16} className="jn-finale-progress">
          <SpotsProgress claimed={claimed} isFlashing={isFlashing} />
        </Reveal>

        <RevealGroup stagger={0.07} delayChildren={0.2} className="jn-finale-chips">
          {['No spam', 'No card', 'Unsubscribe anytime'].map(b => (
            <RevealItem
              key={b}
              as="span"
              y={10}
              className="jn-mono jn-finale-chip"
            >
              {b}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
