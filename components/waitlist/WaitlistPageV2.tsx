'use client'

import { useCallback, useState } from 'react'
import NavV2 from './NavV2'
import HeroV2 from './HeroV2'
import StatBand from './StatBand'
import WhatWereBuildingV2 from './WhatWereBuildingV2'
import FeatureShowcase from './FeatureShowcase'
import OfferBandV2 from './OfferBandV2'
import FounderBlockV2 from './FounderBlockV2'
import SecondCTA from './SecondCTA'
import FooterV2 from './FooterV2'

interface WaitlistPageV2Props {
  /** Active beehiiv subscribers, fetched server-side (beehiiv.ts caches 60s). */
  initialClaimed: number
  source: string
}

export default function WaitlistPageV2({ initialClaimed, source }: WaitlistPageV2Props) {
  const [claimed, setClaimed] = useState(initialClaimed)
  const [isFlashing, setIsFlashing] = useState(false)

  // Optimistic bump. The authoritative number comes from beehiiv on the next
  // server render — there is no polling endpoint to hit.
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
      <FeatureShowcase />
      <OfferBandV2 />
      <FounderBlockV2 />
      <SecondCTA source={source} onSignupSuccess={handleSignupSuccess} />
      <FooterV2 />
    </div>
  )
}
