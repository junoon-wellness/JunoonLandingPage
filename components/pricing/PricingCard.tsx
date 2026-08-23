import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import Jaali from '@/components/brand/Jaali'
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
 */

/** The lattice panel on the page ground behind the card. Not inside it. */
const PRICING_JAALI = true

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
  { label: 'Weekly ritual', icon: 'ritual' },
]

export default function PricingCard() {
  return (
    <div className="pr-card-stage">
      {/* BEHIND the card, on the page ground. The card is opaque, so nothing
          on it is ever read through the lattice; what this lights is the
          margin around the card, and the vignette fades that back into the
          page before the panel's own edge. */}
      {PRICING_JAALI && <Jaali variant="panel" inset="-6% -8%" radius={14} zIndex={0} />}

      <div className="pr-card">
        {/*
          Replaces the corner ribbon that clipped to "00 FOUNDER SPOTS"
          (LV5-020). Kush kept this. At rotate(38deg) the old 190px band's
          left end rose 95 x sin(38) = 58.5px, which from a centre ~34px down
          put it 24px ABOVE the card, where `overflow: hidden` cut the "5".
        */}
        <span className="pr-founder-pill">First 500</span>

        <div className="pr-price-row">
          <span className="pr-price">$8.99</span>
          <span className="pr-price-unit">/month</span>
        </div>

        <p className="pr-offer-line">
          The first 500 members get their first month free, and $8.99 stays their price for
          life.
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
