'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, transform, useScroll, useTransform } from 'framer-motion'

/**
 * THE PRICING STAGE (LV5-020)
 *
 * Kush, 2026-08-22: "when a user scrolls down it adds the elements in the
 * screenshot to the right side and the pricing part goes to the left, as a
 * smooth transition like we had with the V4 hero."
 *
 * The card opens CENTRED in the fold. As the visitor scrolls the stage, it
 * travels left into the first column of a two-column grid while the right
 * column — the "what we're building next" chips, then the FAQ — fades and
 * rises into the space it was always going to occupy. Past the pin the whole
 * thing scrolls away and the footer follows.
 *
 * Ported from `landing-v4`'s components/waitlist/HeroV4.tsx, which is not on
 * this branch (`git show landing-v4:components/waitlist/HeroV4.tsx`). The
 * pattern came across; the component did not.
 *
 * ⚠️ FUNCTION-FORM useTransform ONLY. The (value, inputRange, outputRange)
 * array form compiles to a native WAAPI animation in framer-motion 12 and
 * returns wrong values for scroll-linked motion. Same rule as the header of
 * components/story/ScrollStory.tsx and HeroV2's phone parallax.
 *
 * ⚠️ THE LATERAL TRAVEL IS MEASURED, NEVER HARD-CODED — see `measure()`.
 */

/**
 * 🔴 ONE NUMBER, TWO PLACES. This constant gates the pin and the transforms;
 * `@media (min-width: 1024px)` in globals.css gates the two-column grid they
 * animate INTO. They describe the same threshold and must move together — a
 * stage that pins while the grid is still stacked slides the card sideways
 * out of a single column. Search globals.css for PRICING_STAGE_MIN.
 */
export const PRICING_STAGE_MIN = 1024

/**
 * Below this the pinned stage cannot show the card without cutting it off, so
 * the pin is skipped entirely. Not a guess: `measure()` compares the grid's
 * real content height against the viewport and only pins when it fits.
 */
const PIN_PADDING = 64

// useLayoutEffect warns during SSR; useEffect is the correct no-op there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function PricingStage({ card, side }: { card: ReactNode; side: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardColRef = useRef<HTMLDivElement>(null)

  /** px the card sits right of its resting column in order to be centred. */
  const [shift, setShift] = useState(0)
  /** false => no pin, no transforms, plain document flow. */
  const [animated, setAnimated] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Measured before paint, so the card is never briefly off-centre.
  useIsoLayoutEffect(() => {
    const grid = gridRef.current
    const col = cardColRef.current
    if (!grid || !col) return

    const stillQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideQuery = window.matchMedia(`(min-width: ${PRICING_STAGE_MIN}px)`)

    const measure = () => {
      /*
        THREE reasons to stay static, checked in order:
          - narrow: the grid is one column, so there is nowhere to travel to
          - the visitor asked for reduced motion
          - the content is taller than the viewport, so a 100vh pin would
            crop the card or the FAQ. Measured rather than assumed: a 1024x768
            laptop and a 1440x900 desktop disagree about this, and the guess
            that "desktop is tall enough" is what would cut someone's FAQ off.
      */
      const fits = grid.scrollHeight + PIN_PADDING <= window.innerHeight
      if (!wideQuery.matches || stillQuery.matches || !fits) {
        setAnimated(false)
        setShift(0)
        return
      }

      /*
        THE TRAVEL. The card rests in the left column; centring it means
        moving it right by the distance between the column's centre and the
        stage's centre. Measured from the live layout rather than computed
        from a column formula, so it stays correct if the grid ratio, the gap
        or the page padding ever change.

        offsetLeft/offsetWidth are LAYOUT values: unlike getBoundingClientRect
        they ignore the very transform this effect is about to drive, so the
        measurement can never feed on its own output. `.pr-stage-grid` is
        `position: relative`, which makes it the offsetParent.
      */
      setShift(grid.clientWidth / 2 - (col.offsetLeft + col.offsetWidth / 2))
      setAnimated(true)
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    window.addEventListener('resize', measure)
    stillQuery.addEventListener('change', measure)
    wideQuery.addEventListener('change', measure)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      stillQuery.removeEventListener('change', measure)
      wideQuery.removeEventListener('change', measure)
    }
  }, [])

  // The card holds its centred position through the first beat, then travels;
  // the right column follows it into the space it vacates. Clamped by default
  // outside each range, so before 0.15 the card is simply centred and after
  // 0.6 the layout is simply at rest.
  const cardX = useTransform(scrollYProgress, transform([0.15, 0.55], [shift, 0]))
  const sideOpacity = useTransform(scrollYProgress, transform([0.2, 0.6], [0, 1]))
  const sideY = useTransform(scrollYProgress, transform([0.2, 0.6], [32, 0]))

  return (
    <section
      ref={sectionRef}
      className={`pr-stage${animated ? ' is-pinned' : ''}`}
      aria-label="Plan"
    >
      <div className="pr-stage-pin">
        <div className="pr-stage-grid" ref={gridRef}>
          <motion.div
            className="pr-stage-card"
            ref={cardColRef}
            style={animated ? { x: cardX } : undefined}
          >
            {card}
          </motion.div>

          {/*
            The right column is in the DOM from the start — only its paint is
            deferred — so the chips and the FAQ are always there for crawlers
            and assistive tech even while the stage is at progress 0.
          */}
          <motion.div
            className="pr-stage-side"
            style={animated ? { opacity: sideOpacity, y: sideY } : undefined}
          >
            {side}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
