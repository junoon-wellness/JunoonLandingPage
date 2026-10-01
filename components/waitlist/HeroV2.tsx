import Link from 'next/link'
import AppStoreBadge from './AppStoreBadge'
import TapPathPhone from './TapPathPhone'

/**
 * THE HOME HERO, Direction A3 (LV5-074, website refresh, 1 Oct 2026).
 *
 * Kush's rulings: Direction A as the base (27 Sep round 1), A3 "Coach speaks
 * first" (round 2), the phone plays Path 1 and loops quietly, built from
 * stills in code (round 3). See TapPathPhone.tsx for the phone.
 *
 * What changed from the LV5-018/030 hero, and why (27 Sep scope §a):
 * - one plain headline: the gold italic clause is retired ("Retire all four")
 * - body text at full strength (DM Sans 400, not 300 at 64% opacity)
 * - the boxed offer card becomes ONE line of fine print under the buttons
 * - the App Store badge and "See pricing" sit together as the two actions
 * - the six-screen carousel (DeviceCarousel.tsx, now unmounted) gives way to
 *   the tap path, with one soft halo and a Pause control
 * - Arjav's founder quote leaves the hero (scope: "for its own quiet section
 *   lower down"); it now sits near the end of Home, see FounderNote.tsx.
 *   Where it finally lives is Arjav's call.
 *
 * WORDS: the headline and the two lede sentences are the site's existing
 * words (only the italics went). The fine print is PR #3's founder-price
 * wording, verbatim, which Arjav has been asked to approve (Group DM 3,
 * 1 Oct 11:44); no approved rewording had arrived when this was built.
 */
export default function HeroV2() {
  return (
    <header className="rf-hero">
      <h1 className="rf-hero-headline">Wellness rooted in where you&apos;re from.</h1>

      <div className="rf-hero-text">
        <p className="rf-hero-lede">
          A modern wellness platform built for the South Asian diaspora. Live classes, on-demand
          content, and an AI Coach that personalises your practice, grounded in the traditions you
          grew up around.
        </p>

        <div className="rf-hero-cta">
          <AppStoreBadge size="lg" />
          <Link href="/pricing" className="v2-link rf-textlink">
            See pricing
          </Link>
        </div>

        {/* W2 + W3 (Kush, 1 Oct): the founder price, and the free month kept
            ("the App Store still gives one"). PR #3 wording. */}
        <p className="rf-fine">
          Your first month is free, for everyone. The first 100 members then keep $4.99 a month for
          life. After that it is $8.99 a month.
        </p>
      </div>

      <TapPathPhone />
    </header>
  )
}
