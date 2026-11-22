import type { Metadata } from 'next'
import SiteHeader from '@/components/site/SiteHeader'
import PageCrest from '@/components/site/PageCrest'
import SiteFooter from '@/components/site/SiteFooter'
import PricingCard from '@/components/pricing/PricingCard'
import PricingStage from '@/components/pricing/PricingStage'
import Jaali from '@/components/brand/Jaali'
import { clean } from '@/lib/text'

/**
 * LV5-024: the lattice panel that lights the page ground behind the pricing
 * card. Moved here from inside PricingCard.tsx — `.pr-card-stage` is
 * `position: relative`, which scoped the old call to that local box instead
 * of the page wrapper. See the "ONE GEOMETRY" note atop
 * components/brand/Jaali.tsx. The card opens centred and travels left as the
 * stage pins (see PricingStage.tsx), but that travel is a CSS transform, not
 * a document-flow change, so the card's actual document position — and this
 * mask's target — stays put near the top of the page throughout the scroll.
 */
const PRICING_JAALI = false // rework 9 Nov: one plain ground, as on the home page

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
 * line (changed on purpose by Kush, Thu 12 Nov 2026: $4.99 a month for life if
 * you join by 31 December 2026, no longer "the first 100"), or the five "what we're building
 * next" chips. The feature-checklist rows are ALSO locked (LV5-031 cut it
 * to five, "do not rephrase" — see components/pricing/PricingCard.tsx,
 * where they live). Corrected 2026-09-23 (LV5-071 scope): this comment
 * used to call those rows PLACEHOLDERS pending real App Store text; that
 * shipped already (LV5-010/LV5-031) and this comment had drifted.
 */
export const metadata: Metadata = {
  title: clean('Pricing - Junoon'),
  description: clean(
    'One membership at $8.99 a month. Your first month is free. Join by 31 December 2026 and pay $4.99 a month instead, for life.'
  ),
}

/* Arnav, Sat 21 Nov 2026 7:30 PM: "we are just restating the same information. Instead we can focus
   more on what we're building next". Each item gets one line (DRAFT words for Arjav; the list was
   locked under LV5-010, so Kush and Arjav okay this before it merges). "Read articles inside the app"
   left the list: the app already has Learn and the reader. "Talk in Hindi and Hinglish" is the 1.1.1
   item Arnav asked for (JV4-756). */
const NEXT_ITEMS = [
  { title: 'Personalized recipes and meal plans', line: 'Meals that fit your plan and your body.' },
  { title: 'More live classes', line: 'Practise live with our teachers, more often.' },
  { title: 'Monthly progress insights', line: 'See how your practice is changing you, month by month.' },
  { title: 'Talk in Hindi and Hinglish', line: 'Your Acharya understands Hindi, Hinglish and Sanskrit pose names.' },
  { title: 'Android', line: 'Junoon on every phone.' },
]

export default function PricingPage() {
  return (
    <div id="top">
      {PRICING_JAALI && (
        <Jaali variant="panel" zIndex={-1} maskPosition="50% 460px" maskSize="760px 900px" />
      )}
      <SiteHeader current="/pricing" />
      <PageCrest />

      <PricingStage
        head={
          /* LV5-022 SC2: the headline is a STAGE SLOT now, not a <header>
             above the section. Above it, it had scrolled off the top by the
             time the slide finished, so "everything fits on one screen at the
             end state" could not be true by construction. */
          /* Arnav, Sun 22 Nov 2026: "can we just remove the pricing header from the page feels like its
             unnecessary". The visible heading is gone; the page keeps one heading for screen readers
             and search, hidden from view. */
          <h1 className="pr-sr-only">Pricing</h1>
        }
        card={<PricingCard />}
        side={
          <>
            <section className="pr-side-block pr-next" aria-label="What's coming next">
              <h2 className="pr-free-callout-title">
                What&apos;s coming <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>next.</em>
              </h2>
              <ul className="pr-next-list" style={{ listStyle: 'none', padding: 0 }}>
                {NEXT_ITEMS.map(item => (
                  <li key={item.title} className="pr-next-item">
                    <span className="pr-next-title">{item.title}</span>
                    <span className="pr-next-line">{item.line}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        }
      />

      <SiteFooter />
    </div>
  )
}
