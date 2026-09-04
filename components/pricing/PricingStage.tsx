'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, transform, useScroll, useTransform } from 'framer-motion'

/**
 * THE PRICING STAGE (LV5-020, re-tuned by LV5-022 SC2)
 *
 * Kush, 2026-08-22: "when a user scrolls down it adds the elements in the
 * screenshot to the right side and the pricing part goes to the left, as a
 * smooth transition like we had with the V4 hero."
 * Kush, 2026-08-23: "minimize this spacing and have everything fit on one page
 * even with scroll."
 *
 * The card opens CENTRED in the fold. As the visitor scrolls the stage, it
 * travels left into the first column of a two-column grid while the right
 * column - the "what we're building next" chips, then the FAQ - fades and
 * rises into the space it was always going to occupy.
 *
 * 🔴 SC2 MOVED THE HEADLINE INSIDE THE PIN. It used to be a <header> above
 * this section, which meant it had scrolled off the top by the time the slide
 * finished - so "everything fits on one screen at the end state" was not even
 * expressible. The headline is now the stage's own `head` slot and is pinned
 * with the rest of it.
 *
 * 🔴 SC2 STAGE HEIGHT IS NOW 100vh + THE TRAVEL, not a flat 1.6x viewport.
 * The runway is exactly as long as the distance the card has to cover, so the
 * page stops eating 60vh of scroll to move the card 310px. It is set inline
 * from the measured shift because CSS cannot know that number.
 *
 * ⚠️ FUNCTION-FORM useTransform ONLY. The (value, inputRange, outputRange)
 * array form compiles to a native WAAPI animation in framer-motion 12 and
 * returns wrong values for scroll-linked motion. Same rule as the header of
 * components/story/ScrollStory.tsx and HeroV2's phone parallax.
 *
 * ⚠️ THE LATERAL TRAVEL IS MEASURED, NEVER HARD-CODED - see `measure()`.
 */

/**
 * 🔴 ONE NUMBER, TWO PLACES. This constant gates the pin and the transforms;
 * `@media (min-width: 1024px)` in globals.css gates the two-column grid they
 * animate INTO. They describe the same threshold and must move together - a
 * stage that pins while the grid is still stacked slides the card sideways
 * out of a single column. Search globals.css for PRICING_STAGE_MIN.
 */
export const PRICING_STAGE_MIN = 1024

/** Breathing room required between the pinned content and the viewport edge. */
/* Kush, 2026-08-23 ("get everything on one page"): the pin's top/bottom padding (see .pr-stage-pin) — top clears the fixed nav. */
const PIN_PADDING_TOP = 124
const PIN_PADDING_BOTTOM = 20

/**
 * 🔴 JV3-282 r2 — WHY THE STAGE IS FLAT, WRITTEN ON THE DOM.
 *
 * When `animated` is false this section renders as a perfectly ordinary
 * two-column block: both cards side by side, no pin, a page you can barely
 * scroll. That is the CORRECT end state, which is exactly the problem — it is
 * pixel-for-pixel indistinguishable from a stage whose animation is broken, and
 * there is nothing in the DOM, the console or the network tab that says which
 * one you are looking at.
 *
 * That ambiguity cost this ticket two rounds. Round 1 measured the runway and
 * fixed a real defect. Kush then reported it STILL static and the honest answer
 * was three more hypotheses, because the page cannot say why it is flat. It was
 * `prefers-reduced-motion` — macOS Accessibility > Reduce Motion was on on his
 * Mac, the code silently dropped the whole stage, and he saw "everything in one
 * static page". Two rounds of diagnosis for a state the page already knew.
 *
 * So the reason is now an attribute. Open dev tools on the live site, look at
 * `<section class="pr-stage" data-pr-static="...">`, and it tells you. Absent
 * means the stage IS animating.
 */
type StaticReason =
  /** Below PRICING_STAGE_MIN: the grid is one column, nowhere to travel to. */
  | 'narrow'
  /** The visitor asked for reduced motion, so there is no pin and no slide. */
  | 'reduced-motion'
  /** A 100vh pin would crop the headline, the card or the FAQ. */
  | 'content-taller-than-viewport'

// useLayoutEffect warns during SSR; useEffect is the correct no-op there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function PricingStage({
  head,
  card,
  side,
}: {
  head: ReactNode
  card: ReactNode
  side: ReactNode
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardColRef = useRef<HTMLDivElement>(null)

  /** px the card sits right of its resting column in order to be centred. */
  const [shift, setShift] = useState(0)
  /** false => no pin, no transforms, plain document flow. */
  const [animated, setAnimated] = useState(false)
  /* JV3-282 r2: which of the three conditions turned the stage off. Rendered as
     `data-pr-static` — see the StaticReason doc comment for why this exists.
     null only until the first measure() runs, which is before paint. */
  const [staticReason, setStaticReason] = useState<StaticReason | null>(null)
  /* Kush, 2026-08-23: "reduce both paddings and get everything on one page":
     the pin used to be 100vh tall with the content centred, which left equal
     dead bands above the headline and below the card, and pushed the footer a
     full screen down. The pin is now exactly as tall as its content, so at the
     end of the slide the footer is already on screen underneath.

     🔴 JV3-282: this is the VIEWPORT height, not the pin's own height, and the
     difference is the whole bug. The stage's scroll runway is
     `stageHeight - innerHeight`; the header comment above promises that runway
     equals the card's travel, which only holds if the base term IS the
     viewport. When SC2 made the pin content-height it kept feeding the pin's
     height into this formula, so every pixel by which the content is SHORTER
     than the screen was silently subtracted from the runway. MEASURED on
     production at 1512x900 before the fix: pin 704, stage 1068, runway 168px
     for a 364px travel - the slide finished inside 126px of scroll, which one
     trackpad flick skips entirely. Nothing here changes what is PAINTED: the
     extra height is scroll tail underneath a sticky, content-height pin.
     `animated` already guarantees pinH <= innerHeight, so this is never the
     smaller of the two. */
  const [stageBase, setStageBase] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Measured before paint, so the card is never briefly off-centre.
  useIsoLayoutEffect(() => {
    const inner = innerRef.current
    const grid = gridRef.current
    const col = cardColRef.current
    if (!inner || !grid || !col) return

    const stillQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideQuery = window.matchMedia(`(min-width: ${PRICING_STAGE_MIN}px)`)

    const measure = () => {
      /*
        THREE reasons to stay static, checked in order:
          - narrow: the grid is one column, so there is nowhere to travel to
          - the visitor asked for reduced motion
          - the content is taller than the viewport, so a 100vh pin would crop
            the headline, the card or the FAQ. Measured rather than assumed: a
            1024x768 laptop and a 1440x900 desktop disagree about this, and the
            guess that "desktop is tall enough" is what would cut someone's FAQ
            off. SC2 measures the INNER wrapper, which now includes the
            headline - measuring the grid alone would have missed it.

        🔴 JV3-282 r2: SAME THREE CONDITIONS, SAME ORDER, SAME RESULT - the only
        change is that each one now NAMES ITSELF on the way out. Nothing here
        decides differently than it did before; see the StaticReason comment for
        why that name is worth a state variable.
      */
      const pinH = inner.scrollHeight + PIN_PADDING_TOP + PIN_PADDING_BOTTOM
      const off = (reason: StaticReason) => {
        setStaticReason(reason)
        setAnimated(false)
        setShift(0)
      }
      if (!wideQuery.matches) return off('narrow')
      if (stillQuery.matches) return off('reduced-motion')
      if (pinH > window.innerHeight) return off('content-taller-than-viewport')

      /*
        THE TRAVEL. The card rests in the left column; centring it means moving
        it right by the distance between the column's centre and the stage's
        centre. Measured from the live layout rather than computed from a
        column formula, so it stays correct if the grid ratio, the gap or the
        page padding ever change.

        offsetLeft/offsetWidth are LAYOUT values: unlike getBoundingClientRect
        they ignore the very transform this effect is about to drive, so the
        measurement can never feed on its own output. `.pr-stage-grid` is
        `position: relative`, which makes it the offsetParent.
      */
      setShift(grid.clientWidth / 2 - (col.offsetLeft + col.offsetWidth / 2))
      setStageBase(window.innerHeight)
      setStaticReason(null)
      setAnimated(true)
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(inner)
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

  /*
    Ranges widened for the shorter runway. With the stage now only `shift` px
    taller than the viewport, the whole slide has to play out inside that
    distance: the card covers its travel over the first 75% and the right
    column lands on the last beat, so progress 1 IS the end state the ticket
    asks to fit on one screen. Clamped outside each range by default.
  */
  const cardX = useTransform(scrollYProgress, transform([0, 0.75], [shift, 0]))
  const sideOpacity = useTransform(scrollYProgress, transform([0.35, 1], [0, 1]))
  const sideY = useTransform(scrollYProgress, transform([0.35, 1], [32, 0]))
  /* LV5-032 (Kush: "a green small chevron that's animated like a slight
     bouncing trying to get the user to scroll"): visible at rest, gone by the
     time the slide is 12% in. The bounce is a CSS keyframe on the inner svg so
     it never fights this opacity transform on the wrapper. */
  const cueOpacity = useTransform(scrollYProgress, transform([0, 0.12], [1, 0]))

  return (
    <section
      ref={sectionRef}
      className={`pr-stage${animated ? ' is-pinned' : ''}`}
      aria-label="Plan"
      /* JV3-282 r2: present ONLY when the stage is flat, and it says which of the
         three conditions did it. Absent = the stage is animating. `not-measured`
         is the pre-hydration server render and should never be observable. */
      data-pr-static={animated ? undefined : (staticReason ?? 'not-measured')}
      /* Kush, 2026-08-23 ("get everything on one page"): one screen + exactly the travel the card has to cover.
         JV3-282: was `pinHeight + shift`, which ate the runway on any screen taller than the pinned content. */
      style={animated ? { height: `${Math.round(stageBase + shift)}px` } : undefined}
    >
      <div className="pr-stage-pin">
        <div className="pr-stage-inner" ref={innerRef}>
          {head}

          <div className="pr-stage-grid" ref={gridRef}>
            <motion.div
              className="pr-stage-card"
              ref={cardColRef}
              style={animated ? { x: cardX } : undefined}
            >
              {card}
            </motion.div>

            {/*
              The right column is in the DOM from the start - only its paint is
              deferred - so the chips and the FAQ are always there for crawlers
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

        {animated && (
          <motion.div className="pr-scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
            <svg
              className="pr-scroll-cue-chevron"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--jn-sage)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 9 L12 16 L19 9" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  )
}
