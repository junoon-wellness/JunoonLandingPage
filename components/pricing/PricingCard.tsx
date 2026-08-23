import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import Jaali from '@/components/brand/Jaali'
import JharokhaFrame from '@/components/brand/JharokhaFrame'
import CheckMark from './CheckMark'
import FeatureIcon, { type FeatureIconName } from './FeatureIcon'

/* ══════════════════════════════════════════════════════════════════
   THE JUNOON ELEMENT — dials (LV5-021 (d))

   PRICING_JAALI  a lattice panel behind the card
   PRICING_ARCH   the card's header sits inside a jharokha crown

   Independent. Flip both to false and the card is LV5-015's, except for
   the ribbon, which does not come back (see .pr-founder-pill).
   ══════════════════════════════════════════════════════════════════ */
const PRICING_JAALI = true
const PRICING_ARCH = true

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
          centre at y~34 puts it 24px ABOVE the card, where `overflow: hidden`
          cut the "5" off.

          Replaced rather than repaired, for two reasons: at 390px the card is
          ~342px wide and "500 FOUNDER SPOTS" needs ~134px of chord that a
          corner band cannot give without shrinking under the 11px type floor;
          and the arch crown below now owns the top of the card, so a diagonal
          band across that corner fights it. The pill reads at every width and
          keeps the fact.
        */}
        <span className="pr-founder-pill">First 500</span>

        <div className="pr-card-head">
          {PRICING_ARCH && (
            <div className="pr-crown" aria-hidden="true">
              <JharokhaFrame strokeOpacity={0.45}>
                {/* Its own vignette is pushed hard so the arch dissolves into
                    the card instead of ending on a hard edge. */}
                <Jaali layerOpacity={0.3} vignetteColor="#2C2118" vignetteStrength={0.94} />
              </JharokhaFrame>
            </div>
          )}

          <div className="pr-price-row">
            <span className="pr-price">$8.99</span>
            <span className="pr-price-unit">/month</span>
          </div>

          <p className="pr-offer-line">
            The first 500 members get their first month free, and $8.99 stays their price for
            life.
          </p>
        </div>

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
          <AppStoreBadge size="lg" />
          <span className="pr-cta-sub">Subscribe in the app</span>
          <span className="pr-cta-fine">Cancel anytime in the App Store.</span>
        </div>
      </div>
    </div>
  )
}
