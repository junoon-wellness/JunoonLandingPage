'use client'

import NavV2 from './NavV2'
import HeroV2 from './HeroV2'
import WhatWereBuildingV2 from './WhatWereBuildingV2'
import FeatureStory from './FeatureStory'
import WalkthroughTeaser from './WalkthroughTeaser'
import FooterV2 from './FooterV2'
import Jaali from '@/components/brand/Jaali'
import { SHOW_TOUR } from '@/lib/constants'

/**
 * LV5-021 (c) / LV5-024: a jaali PANEL behind the hero phone, never a page
 * texture. Kush chose solid dark pages (LV5-018 took the ambient ground
 * radials back off this hero), so the lattice reads as a local moment behind
 * the device column, not a page-wide wash.
 *
 * LV5-024 moved this from inside HeroV2 (where it was sized to `.v2-devices`,
 * a local `position:relative` box) to here, as a page-level full-page copy —
 * see the "ONE GEOMETRY" note atop components/brand/Jaali.tsx for why. Mask
 * coordinates are a best-effort estimate (top-right, roughly where the phone
 * carousel sits in the hero) — no live browser pass this round.
 *
 * Set to false and the hero is exactly what LV5-018 shipped.
 */
const HERO_JAALI = true

/**
 * LV5-022 SC5 / LV5-024: the same panel treatment behind the feature-story
 * phone pair, moved out of ScrollStory for the same "page wrapper" reason.
 * Mask is centred lower on the page than the hero panel, roughly where
 * FeatureStory's phone column sits after StatBand + WhatWereBuildingV2.
 */
const FEATURE_JAALI = true

/*
  The page-level scroll-reveal IntersectionObserver that used to live here is
  gone (spec §A3). It collected whatever [data-reveal] elements existed at
  mount and unobserved each as it fired, so a section mounted later would sit
  at opacity 0 forever. Reveals are now per-component via framer's
  whileInView - see components/motion/Reveal.tsx.

  LV5-024: this component used to take `initialClaimed`/`source` props and
  hold `claimed`/`isFlashing` state for a live subscriber counter + signup
  attribution, threaded down into HeroV2. HeroV2 dropped its own signup form
  under LV5-018 and never read any of it — see app/page.tsx's own note.
*/
export default function WaitlistPageV2() {
  return (
    <div id="top">
      {/* LV5-024: page-level jaali panels. Both are full-page `inset:0`
          copies of the same tile grid the site-wide ground (mounted in
          app/layout.tsx) uses — see the "ONE GEOMETRY" note atop
          components/brand/Jaali.tsx. zIndex={-1} matches ground so both stay
          behind all real content regardless of local stacking contexts, and
          paint above ground because they come later in DOM tree order. */}
      {HERO_JAALI && (
        <Jaali variant="panel" zIndex={-1} maskPosition="82% 380px" maskSize="820px 820px" />
      )}
      {FEATURE_JAALI && (
        <Jaali variant="panel" zIndex={-1} maskPosition="28% 2050px" maskSize="900px 780px" />
      )}
      <NavV2 />
      <HeroV2 />
      {/* LV5-032: <StatBand /> (500 founder spots · 6 practices · 1 AI coach) removed — Kush, 2026-08-23: "remove this section and move up accordingly". Component stays on disk. */}
      <WhatWereBuildingV2 />
      <FeatureStory />
      {SHOW_TOUR && <WalkthroughTeaser />}
      {/* LV5-018: OfferBandV2 + FounderBlockV2 removed from the page — both
          folded into a condensed version inside HeroV2 (Kush's review: the
          empty space under the hero copy should carry this, not two more
          full-width bands lower down). SecondCTA is also gone — Home no
          longer has a newsletter section at all; its layout lives on now as
          NewsletterJoin, used on /library only. LV5-024: all three component
          files are deleted (grep proved zero remaining imports), not just
          unreferenced. */}
      <FooterV2 />
    </div>
  )
}
