'use client'

import FeatureRail, { type RailCard } from '@/components/rail/FeatureRail'
import { SCREENS } from '@/lib/screens'

/**
 * The secondary features (v4 spec §B), seeded with the two Kush picked.
 *
 * Adding a third or fourth is a config change: append here and the rail
 * engine handles the snap points, the arrows and the edge fades. Month-end
 * and education are the obvious next two, once they have screenshots.
 */
const CARDS: RailCard[] = [
  {
    id: 'habits',
    title: 'A week you can actually finish.',
    body: 'Habits sized for a working day, not for someone with nothing else on. A two minute walk counts on the days that need it.',
    screen: SCREENS.habits,
    accent: 'var(--jn-stone)',
  },
  {
    id: 'insights',
    title: 'It asks how it felt, and remembers.',
    body: 'A short check-in after a session is the whole input. That is what the coach reads to sharpen next week. Nothing to fill out, ever.',
    screen: SCREENS.insights,
    accent: 'var(--jn-turmeric)',
  },
]

export default function RestOfApp() {
  return <FeatureRail cards={CARDS} eyebrow="And the rest of the app" />
}
