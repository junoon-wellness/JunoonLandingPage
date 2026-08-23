import type { Metadata } from 'next'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import Jaali from '@/components/brand/Jaali'
import JharokhaFrame from '@/components/brand/JharokhaFrame'
import { clean } from '@/lib/text'

/* ══════════════════════════════════════════════════════════════════
   THE JUNOON ELEMENT — dials (LV5-021 (d))

   PRICING_JAALI  a lattice panel behind the card
   PRICING_ARCH   the card's header sits inside a jharokha crown

   Independent. Flip both to false and the card is exactly what LV5-015
   shipped, except for the ribbon, which does not come back (see
   .pr-founder-pill below).
   ══════════════════════════════════════════════════════════════════ */
const PRICING_JAALI = true
const PRICING_ARCH = true

/**
 * LV5-015 — /pricing, board A "One card" (LV5-011, ACCEPTED), padding cut
 * heavily per Kush's 2026-08-22 ruling: "go with A but cut down heavily on
 * empty padding throughout the page." Section paddings run at roughly half
 * of the site's standard .v2-section rhythm (see the .pr-* rules added to
 * globals.css) rather than the mockup's airier spacing.
 *
 * All copy below is LOCKED from LV5-010's notes — do not rephrase the offer
 * line, the "500 founder spots" fact, or the five "what we're building
 * next" chips. The six feature-checklist rows are PLACEHOLDERS (see the
 * build report) pending Kush pasting the real App Store listing text.
 */
export const metadata: Metadata = {
  title: clean('Pricing - Junoon'),
  description: clean(
    'One membership at $8.99 a month. The first 500 members get their first month free, and that price for life.'
  ),
}

const FEATURES = [
  'Weekly plan',
  'AI coach',
  'Guided meditation and breathwork',
  'Yoga and movement',
  'Live classes',
  'Weekly ritual',
]

const NEXT_CHIPS = [
  'Personalized recipes and meal plans',
  'More live classes: yoga, guided meditation, breathwork',
  'Monthly progress insights',
  'Read articles inside the app',
  'Android',
]

const FAQ = [
  {
    q: 'What does the free month include?',
    a: 'Everything in the app. The weekly plan, the AI coach, live classes, guided meditation and breathwork, from day one. There is no separate free tier.',
  },
  {
    q: 'What happens after the free month?',
    a: 'You keep your membership at $8.99 a month. As one of the first 500 members, that price is yours for life.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes, any time, right in the App Store.',
  },
]

export default function PricingPage() {
  return (
    <div id="top">
      <NavV2 />

      <header className="pr-hero">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          Pricing
        </div>
        <h1 className="pr-headline">One membership. Everything included.</h1>
      </header>

      <section className="pr-section" aria-label="Plan">
        <div className="pr-card-stage">
          {/* LV5-021 (d): the lattice sits BEHIND the card, which is opaque
              --jn-surface, so no text on the card is read through it. What it
              lights is the margin around the card, and the vignette fades that
              back into the page before the panel's own edge. */}
          {PRICING_JAALI && <Jaali inset="-6% -8%" radius={14} zIndex={0} />}

          <div className="pr-card">
            {/*
              WAS a rotated corner ribbon reading "00 FOUNDER SPOTS" (LV5-020).
              The clip was structural, not a width problem: at rotate(38deg) a
              190px band's left end rises 95 x sin(38) = 58.5px, which from a
              centre at y~34 puts it 24px ABOVE the card, where `overflow:
              hidden` cut the "5" off.

              Replaced rather than repaired, for two reasons: at 390px the card
              is ~342px wide and "500 FOUNDER SPOTS" needs ~134px of chord that
              a corner band cannot give without shrinking under the 11px type
              floor; and the arch crown below now owns the top of the card, so
              a diagonal band across that corner fights it. The pill reads at
              every width and keeps the fact.
            */}
            <span className="pr-founder-pill">First 500</span>

            <div className="pr-card-head">
              {PRICING_ARCH && (
                <div className="pr-crown" aria-hidden="true">
                  <JharokhaFrame strokeOpacity={0.45}>
                    {/* Its own vignette is pushed hard so the arch dissolves
                        into the card instead of ending on a hard edge. */}
                    <Jaali
                      layerOpacity={0.3}
                      vignetteColor="#2C2118"
                      vignetteStrength={0.94}
                    />
                  </JharokhaFrame>
                </div>
              )}

              <div className="pr-price-row">
                <span className="pr-price">$8.99</span>
                <span className="pr-price-unit">/month</span>
              </div>

              <p className="pr-offer-line">
                The first 500 members get their first month free, and $8.99 stays their price
                for life.
              </p>
            </div>

            <ul className="pr-checklist">
              {FEATURES.map(f => (
                <li key={f} className="pr-check-row">
                  <span className="pr-check-icon" aria-hidden="true">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="pr-cta">
              <AppStoreBadge size="lg" />
              <span className="pr-cta-sub">Subscribe in the app</span>
              <span className="pr-cta-fine">Cancel anytime in the App Store.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pr-section" aria-label="What we're building next">
        <div className="pr-next-heading">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            What we&apos;re building next
          </div>
        </div>
        <ul className="pr-chips" style={{ listStyle: 'none', padding: 0 }}>
          {NEXT_CHIPS.map(c => (
            <li key={c} className="pr-chip">
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="pr-section" aria-label="Frequently asked questions">
        <div className="pr-faq">
          {FAQ.map(item => (
            <details key={item.q} className="pr-faq-item">
              <summary>{item.q}</summary>
              <p className="pr-faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <FooterV2 />
    </div>
  )
}
