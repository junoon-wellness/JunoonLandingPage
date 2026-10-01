import NavV2 from './NavV2'
import HeroV2 from './HeroV2'
import CoachQuote from './CoachQuote'
import FeatureStory from './FeatureStory'
import PracticeSection from './PracticeSection'
import FounderNote from './FounderNote'
import WalkthroughTeaser from './WalkthroughTeaser'
import FooterV2 from './FooterV2'
import { SHOW_TOUR } from '@/lib/constants'

/**
 * HOME, after the LV5-074 website refresh (1 Oct 2026).
 *
 * Order, top to bottom:
 *   1. Hero: A3, one plain headline, the badge + "See pricing", the founder
 *      price as fine print, the phone looping Path 1 (HeroV2, TapPathPhone)
 *   2. The big coach quote, "(Example conversation.)" (CoachQuote)
 *   3. The four product tabs, now plain text tabs in ONE accent (FeatureStory)
 *   4. "A practice that knows you": the old "What we're building" and
 *      "What's new since launch" merged, no 01-04 numbers (PracticeSection)
 *   5. Arjav's founder quote, moved out of the hero (FounderNote)
 *   6. Footer
 *
 * Gone from Home, per Kush's rulings:
 * - both jaali panels (the HERO_JAALI / FEATURE_JAALI lattice copies) and
 *   the site-wide ground: "Jaali: Remove it" (27 Sep, round 1)
 * - the toran divider: "August picks: Retire all four" (27 Sep)
 * - NO teacher row: W9 "Leave it off Home" (1 Oct)
 *
 * WhatWereBuildingV2.tsx and WhatsNewV2.tsx are deleted: their words moved
 * verbatim into PracticeSection.tsx. DeviceCarousel.tsx stays on disk,
 * unmounted (the hero carousel the tap path replaced).
 */
export default function WaitlistPageV2() {
  return (
    <div id="top" className="jn-home-scale">
      <NavV2 />
      <HeroV2 />
      <CoachQuote />
      <FeatureStory />
      <PracticeSection />
      {SHOW_TOUR && <WalkthroughTeaser />}
      <FounderNote />
      <FooterV2 />
    </div>
  )
}
