'use client'

import { useCallback, useState } from 'react'
import NavV2 from './NavV2'
import HeroV2 from './HeroV2'
import StatBand from './StatBand'
import WhatWereBuildingV2 from './WhatWereBuildingV2'
import FeatureStory from './FeatureStory'
import WalkthroughTeaser from './WalkthroughTeaser'
import FooterV2 from './FooterV2'
import { SHOW_TOUR } from '@/lib/constants'

interface WaitlistPageV2Props {
  /** Active beehiiv subscribers, fetched server-side (beehiiv.ts caches 60s). */
  initialClaimed: number
  source: string
}

export default function WaitlistPageV2({ initialClaimed, source }: WaitlistPageV2Props) {
  const [claimed, setClaimed] = useState(initialClaimed)
  const [isFlashing, setIsFlashing] = useState(false)

  // The page-level scroll-reveal IntersectionObserver that used to live here
  // is gone (spec §A3). It collected whatever [data-reveal] elements existed
  // at mount and unobserved each as it fired, so a section mounted later would
  // sit at opacity 0 forever. Reveals are now per-component via framer's
  // whileInView - see components/motion/Reveal.tsx.

  // Optimistic bump. The authoritative number comes from beehiiv on the next
  // server render - there is no polling endpoint to hit.
  const handleSignupSuccess = useCallback(() => {
    setIsFlashing(true)
    setClaimed(c => c + 1)
    setTimeout(() => setIsFlashing(false), 400)
  }, [])

  return (
    <div id="top">
      <NavV2 />
      <HeroV2
        source={source}
        claimed={claimed}
        isFlashing={isFlashing}
        onSignupSuccess={handleSignupSuccess}
      />
      <StatBand />
      <WhatWereBuildingV2 />
      <FeatureStory />
      {SHOW_TOUR && <WalkthroughTeaser />}
      {/* LV5-018: OfferBandV2 + FounderBlockV2 removed from the page — both
          folded into a condensed version inside HeroV2 (Kush's review: the
          empty space under the hero copy should carry this, not two more
          full-width bands lower down). SecondCTA is also gone — Home no
          longer has a newsletter section at all; its layout lives on now as
          NewsletterJoin, used on /library only. All three component files
          stay on disk, just unreferenced here. */}
      <FooterV2 />
    </div>
  )
}
