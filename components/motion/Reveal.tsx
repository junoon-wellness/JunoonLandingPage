'use client'

import { motion, type Transition } from 'framer-motion'
import type { CSSProperties, ElementType, ReactNode } from 'react'

/**
 * The page's one reveal primitive (spec §A3).
 *
 * Replaces the old `[data-reveal]` + one-shot IntersectionObserver in
 * WaitlistPageV2. That observer collected whatever existed at mount and
 * unobserved each element as it fired, so anything mounted later stayed at
 * opacity 0 forever. `whileInView` is per-element and has no such window.
 *
 * REDUCED MOTION is handled in CSS, not here: every reveal carries
 * `.jn-reveal`, and globals.css neutralises the inline transform/opacity for
 * that class inside a `prefers-reduced-motion` block. Branching the component
 * tree on a JS media query instead would either flash hidden content for a
 * frame or disagree with the server render.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export interface RevealProps {
  children: ReactNode
  /** Rendered element. Anything motion() can wrap. */
  as?: ElementType
  /** Seconds. Use for hand-tuned staircases; prefer `<RevealGroup>` for lists. */
  delay?: number
  duration?: number
  /** Starting offset in px. y is the default direction. */
  y?: number
  x?: number
  /** Starting scale (LV5-032: the About bands settle from 0.96 → 1). */
  scale?: number
  /** Fraction of the element that must be visible before it fires. */
  amount?: number
  /** Animate every time it scrolls into view instead of once. */
  repeat?: boolean
  className?: string
  style?: CSSProperties
  id?: string
}

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  y = 18,
  x = 0,
  scale = 1,
  amount = 0.2,
  repeat = false,
  className = '',
  style,
  id,
}: RevealProps) {
  const MotionTag = motion[as as 'div']
  const transition: Transition = { duration, delay, ease: EASE }

  return (
    <MotionTag
      id={id}
      className={`jn-reveal ${className}`.trim()}
      style={style}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: !repeat, amount, margin: '0px 0px -8% 0px' }}
      transition={transition}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Staggered container. Children animate through the same variants, so the
 * delays live in one place rather than as hand-numbered `.delay-3` classes.
 */
export function RevealGroup({
  children,
  stagger = 0.09,
  delayChildren = 0,
  amount = 0.2,
  repeat = false,
  className = '',
  style,
}: {
  children: ReactNode
  stagger?: number
  delayChildren?: number
  amount?: number
  repeat?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: !repeat, amount, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** A child of `<RevealGroup>`. Timing comes from the parent. */
export function RevealItem({
  children,
  as = 'div',
  y = 16,
  x = 0,
  duration = 0.62,
  className = '',
  style,
}: {
  children: ReactNode
  as?: ElementType
  y?: number
  x?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const MotionTag = motion[as as 'div']
  return (
    <MotionTag
      className={`jn-reveal ${className}`.trim()}
      style={style}
      variants={{
        hidden: { opacity: 0, y, x },
        shown: { opacity: 1, y: 0, x: 0, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * A hairline that draws itself left-to-right as it enters view. Used above the
 * numbered rows in WhatWereBuilding and between the stat-band figures.
 */
export function DrawLine({
  vertical = false,
  delay = 0,
  duration = 0.8,
  className = '',
  style,
}: {
  vertical?: boolean
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`jn-reveal ${className}`.trim()}
      style={{
        display: 'block',
        transformOrigin: vertical ? 'top' : 'left',
        ...style,
      }}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration, delay, ease: EASE }}
    />
  )
}
