'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * LV5-020 spruce (2): the checklist's tick DRAWS ITSELF as the row enters view.
 *
 * Same viewport contract and easing as `DrawLine` in components/motion/Reveal.tsx
 * — once, at 40% visible — so it lands with the rest of the page's motion
 * rather than as a second system. It is a separate component because DrawLine
 * animates `scaleX` on a span, and a tick has to animate `pathLength` on an
 * SVG path; scaling a tick would skew it.
 *
 * ⚠️ REDUCED MOTION IS HANDLED HERE, NOT IN CSS. The `.jn-reveal` class that
 * neutralises the rest of the page's motion only overrides `opacity`,
 * `transform`, `filter` and `clip-path`. `pathLength` is none of those, so a
 * tick carrying `.jn-reveal` would still animate — it would just do it
 * invisibly to that rule. `useReducedMotion()` renders the finished tick
 * instead.
 */
const EASE = [0.22, 1, 0.36, 1] as const

/** Transcribed from `checkStrokes()` in the app's JunoonIcons.swift (24x24). */
const CHECK_D = 'M4.8 12.6 L9.4 17.2 L19.2 7'

export default function CheckMark({
  size = 16,
  delay = 0,
  color = 'var(--jn-sage)',
}: {
  size?: number
  delay?: number
  color?: string
}) {
  const still = useReducedMotion()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <motion.path
        d={CHECK_D}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={still ? false : { pathLength: 0, opacity: 0 }}
        whileInView={still ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay, ease: EASE }}
      />
    </svg>
  )
}
