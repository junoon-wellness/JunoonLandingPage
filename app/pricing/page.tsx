import type { Metadata } from 'next'
import SectionLabel from '@/components/brand/SectionLabel'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import PricingCard from '@/components/pricing/PricingCard'
import PricingStage from '@/components/pricing/PricingStage'
import { clean } from '@/lib/text'

/*
 * LV5-074 (website refresh, 1 Oct 2026). Kush's W2 ruling, verbatim: "I
 * still want the structure to be the same and the look to be the same as
 * what we had before, at least for the card and how when you scroll, it
 * shows that what we're building next. I want that. So update the basic
 * things like the overall theme and background, but I still want the
 * structure of the pricing page to work in be the same. Just update it to,
 * have the new information formatted in a better way."
 *
 * So on this page ONLY the theme (the app's dark / light colours), the
 * background (the jaali lattice panel is gone: "Jaali: Remove it", 27 Sep)
 * and the price formatting on the card changed. The stage, the card, the
 * chips and the FAQ are exactly as LV5-020/022/032 built them.
 */

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
 * line, the "100 founder spots" fact (ruled 1 Oct 2026: $4.99 for life, first 100, then $8.99), or the five "what we're building
 * next" chips. The feature-checklist rows are ALSO locked (LV5-031 cut it
 * to five, "do not rephrase" — see components/pricing/PricingCard.tsx,
 * where they live). Corrected 2026-09-23 (LV5-071 scope): this comment
 * used to call those rows PLACEHOLDERS pending real App Store text; that
 * shipped already (LV5-010/LV5-031) and this comment had drifted.
 */
export const metadata: Metadata = {
  title: clean('Pricing - Junoon'),
  description: clean(
    'One membership. Your first month is free. The first 100 members then pay $4.99 a month for life, and after that it is $8.99 a month.'
  ),
}

const NEXT_CHIPS = [
  'Personalized recipes and meal plans',
  'More live classes',
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
    a: 'If you\'re one of the first 100 members, you pay $4.99 a month and that price is yours for life. After the first 100, it is $8.99 a month.',
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

      <PricingStage
        head={
          /* LV5-022 SC2: the headline is a STAGE SLOT now, not a <header>
             above the section. Above it, it had scrolled off the top by the
             time the slide finished, so "everything fits on one screen at the
             end state" could not be true by construction. */
          <header className="pr-head">
            <SectionLabel align="center">Pricing</SectionLabel>
            <h1 className="pr-headline">One membership. Everything included.</h1>
          </header>
        }
        card={<PricingCard />}
        side={
          <>
            {/* LV5-032 (Kush: "much more obvious that the first month is free
                ... especially when the user scrolls and gets the other info"):
                the first thing the sliding-in column says. No card/auto-renew
                wording, no future price (LV4-016 rulings). */}
            <section className="pr-side-block pr-free-callout" aria-label="Free month">
              {/* LV5-074: the gold italic clause is retired; same words. */}
              <h2 className="pr-free-callout-title">Start with a free month.</h2>
              <p className="pr-free-callout-body">
                Everyone&apos;s first month is free. The first 100 members then pay $4.99 a month,
                locked for life. After that it is $8.99 a month.
              </p>
            </section>

            <section className="pr-side-block" aria-label="What we're building next">
              <div className="pr-next-heading">
                <SectionLabel>What we&apos;re building next</SectionLabel>
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
