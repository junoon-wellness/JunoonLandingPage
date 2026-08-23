import type { Metadata } from 'next'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import PricingCard from '@/components/pricing/PricingCard'
import PricingStage from '@/components/pricing/PricingStage'
import { clean } from '@/lib/text'

/**
 * LV5-015 — /pricing, board A "One card" (LV5-011, ACCEPTED), padding cut
 * heavily per Kush's 2026-08-22 ruling: "go with A but cut down heavily on
 * empty padding throughout the page." Section paddings run at roughly half
 * of the site's standard .v2-section rhythm (see the .pr-* rules added to
 * globals.css) rather than the mockup's airier spacing.
 *
 * LV5-020 — the card, the chips and the FAQ now share one scroll-linked
 * STAGE on desktop: the card opens centred and travels left while the chips
 * and FAQ rise in on the right. Narrow viewports, reduced motion and short
 * viewports get the plain stacked document instead. All of that lives in
 * components/pricing/PricingStage.tsx; this file only decides what goes in
 * each column.
 *
 * All copy below is LOCKED from LV5-010's notes — do not rephrase the offer
 * line, the "500 founder spots" fact, or the five "what we're building
 * next" chips. The six feature-checklist rows are PLACEHOLDERS (see the
 * build report) pending Kush pasting the real App Store listing text; they
 * live in components/pricing/PricingCard.tsx now.
 */
export const metadata: Metadata = {
  title: clean('Pricing - Junoon'),
  description: clean(
    'One membership at $8.99 a month. The first 500 members get their first month free, and that price for life.'
  ),
}

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

      <PricingStage
        card={<PricingCard />}
        side={
          <>
            <section className="pr-side-block" aria-label="What we're building next">
              <div className="pr-next-heading">
                <div className="eyebrow">What we&apos;re building next</div>
              </div>
              <ul className="pr-chips" style={{ listStyle: 'none', padding: 0 }}>
                {NEXT_CHIPS.map(c => (
                  <li key={c} className="pr-chip">
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pr-side-block" aria-label="Frequently asked questions">
              <div className="pr-faq">
                {FAQ.map(item => (
                  <details key={item.q} className="pr-faq-item">
                    <summary>{item.q}</summary>
                    <p className="pr-faq-answer">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        }
      />

      <FooterV2 />
    </div>
  )
}
