import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import CheckMark from './CheckMark'
import FeatureIcon, { type FeatureIconName } from './FeatureIcon'

/**
 * THE PLAN CARD.
 *
 * 🔴 LV5-022 SC1 — THE ARCH IS OFF THIS CARD AND MUST NOT COME BACK AS AN
 * OVERLAY. Round 1 put an arch-frame crown behind the header. It was
 * absolutely positioned at z-index 0 inside the header wrapper, which was
 * `position: relative` with NO z-index of its own — so it never made a
 * stacking context, and the crown painted into the CARD's context instead:
 * above the card's own surface, and above every in-flow row below it, because
 * a positioned z-index-0 element paints over non-positioned siblings. Only
 * `.pr-price-row` and `.pr-offer-line` had been lifted to z-index 1, so the
 * gold hairline ran straight across the price, the offer line and four
 * feature rows, and the crown's lattice read as "the lattice is showing
 * through the card".
 *
 * Kush, 2026-08-23: "this is messed up." He is right, and the lesson is not
 * "lift the other rows too" — an ornament that has to out-stack the content
 * it decorates is the wrong ornament. If an arch is ever wanted here it must
 * be the CARD'S OWN CLIP SHAPE, never a line drawn over content.
 *
 * The card surface is opaque `--jn-surface` and nothing lattice-textured
 * lives inside it. The lattice stays on the page ground BEHIND the card.
 *
 * LV5-024: the panel that lights the page ground behind this card now
 * renders at app/pricing/page.tsx (as `PRICING_JAALI`), not here —
 * `.pr-card-stage` is `position: relative`, which made this component's own
 * Jaali call scope to that local box instead of the page wrapper. See the
 * "ONE GEOMETRY" note atop components/brand/Jaali.tsx.
 */

/**
 * The six feature rows. Copy is LOCKED from LV5-010 — do not rephrase. The
 * `icon` field is LV5-020 spruce; it maps each row onto a glyph the app
 * already owns (see FeatureIcon.tsx).
 */
const FEATURES: { label: string; icon: FeatureIconName }[] = [
  { label: 'Weekly plan', icon: 'plan' },
  { label: 'AI coach', icon: 'coach' },
  { label: 'Guided meditation and breathwork', icon: 'meditation' },
  { label: 'Yoga and movement', icon: 'yoga' },
  { label: 'Live classes', icon: 'live' },
  // LV5-031 (Kush, 2026-08-23): 'Weekly ritual' row removed — five rows now.
]

export default function PricingCard() {
  return (
    <div className="pr-card-stage">
      <div className="pr-card">
        {/*
          Replaces the corner ribbon that clipped to "00 FOUNDER SPOTS"
          (LV5-020). Kush kept this. At rotate(38deg) the old 190px band's
          left end rose 95 x sin(38) = 58.5px, which from a centre ~34px down
          put it 24px ABOVE the card, where `overflow: hidden` cut the "5".
        */}
        {/* LV5-032 (Kush: "make it much more obvious that the first month is
            free"): the free month leads the card, above the price. */}
        <p className="pr-free-line">Your first month is free.</p>

        {/* JV3-307: the pill labels the PRICE, not the free month (the free
            month is for everyone; only the first 500 keep $8.99). Desktop
            position is unchanged - the pill is absolute in the card corner
            there; at <=540px it is in flow and now sits above the price row. */}
        <span className="pr-founder-pill">First 500</span>

        <div className="pr-price-row">
          <span className="pr-price">$8.99</span>
          <span className="pr-price-unit">/month</span>
        </div>

        <p className="pr-offer-line">
          Your first month is free. The first 500 members keep $8.99 a month for life.
        </p>

        <ul className="pr-checklist">
          {FEATURES.map((f, i) => (
            <li key={f.label} className="pr-check-row">
              <FeatureIcon name={f.icon} />
              <span>{f.label}</span>
              {/* Staggered so the column reads as one gesture rather than six
                  ticks firing at once. */}
              <CheckMark delay={i * 0.07} />
            </li>
          ))}
        </ul>

        <div className="pr-cta">
          {/* SC2: was size="lg" (64px min-height, 200px min-width). The
              ticket's stated fallback for fitting the card in 800px, and it
              was needed - 14px back. */}
          <AppStoreBadge size="nav" />
          <span className="pr-cta-sub">Subscribe in the app</span>
          <span className="pr-cta-fine">Cancel anytime in the App Store.</span>
        </div>
      </div>
    </div>
  )
}
