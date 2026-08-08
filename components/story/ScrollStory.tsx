'use client'

import Image from 'next/image'
import {
  motion,
  transform,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, type Screen } from '@/lib/screens'
import Reveal from '@/components/motion/Reveal'
import PhoneFrame from '@/components/waitlist/PhoneFrame'

/**
 * THE SCROLL STORY ENGINE (spec §B5)
 *
 * Desktop: a tall section where a phone pair stays pinned while chapters of
 * copy scroll past and the screenshots crossfade. A progress rail shows where
 * you are.
 *
 * Tablet/mobile (<1024px) and reduced motion: four stacked chapter cards, no
 * pin, no crossfade. That is a layout fork, not a degraded desktop, and it is
 * decided in CSS (`.jn-story-stage` / `.jn-story-cards` in globals.css). A JS
 * media-query fork would have to guess during SSR and then correct itself,
 * which either flashes the wrong layout or trips hydration.
 *
 * Kept generic on purpose: Phase 2's cinematic hero reuses this.
 *
 * ⚠️ Screenshots are mounted once and crossfaded by opacity. Never key them by
 * chapter: remounting re-requests the image, starves Next's image optimizer,
 * and has already sent one hero screenshot permanently blank.
 */

export interface StoryChapter {
  id: string
  /** Small tracked label above the heading. */
  eyebrow: string
  /** Heading. Wrap the emphasis clause in <em>; it picks up the accent. */
  title: ReactNode
  body: string
  points: string[]
  /** A `--jn-*` custom property reference, e.g. `var(--jn-turmeric)`. */
  accent: string
  /** Devanagari watermark glyph. */
  glyph: string
  /** Short label under the progress rail. */
  railLabel: string
  /** [primary phone, secondary phone] */
  screens: [Screen, Screen]
}

/** Half-width of the copy crossfade, in units of total scroll progress. */
const FADE = 0.05

/**
 * ⚠️ USE THE FUNCTION FORM OF useTransform IN THIS FILE. Not the
 *    `useTransform(value, inputRange, outputRange)` array form.
 *
 * Given the array form, framer-motion 12 compiles the mapping into a native
 * WAAPI animation: the input range becomes the keyframes' `offset` array and
 * the browser drives it. Two things go wrong here.
 *
 *  1. Offsets must sit inside [0, 1] and never decrease, so the obvious way to
 *     say "hold past the end" (a sentinel like 2 or -1) makes Element.animate
 *     throw and the whole section fails to render.
 *  2. Even with legal offsets it produced wrong values, measured: at scroll
 *     progress 1.0 chapter 1's copy sat at opacity 1 instead of 0, so all four
 *     chapters' text stacked on top of each other.
 *
 * Passing a function instead keeps the mapping in JS, where it is exact. The
 * curve is identical; `transform()` builds the same piecewise interpolator.
 */
function windows(i: number, n: number) {
  const start = i / n
  const end = (i + 1) / n
  const first = i === 0
  const last = i === n - 1
  return {
    start,
    end,
    first,
    last,
    // Copy hands the baton over cleanly: chapter i has finished fading out
    // before chapter i+1 starts fading in, so text never sits over text.
    copyInput: [
      first ? 0 : start,
      first ? 0.001 : start + FADE,
      last ? 0.999 : end - FADE,
      last ? 1 : end,
    ],
  }
}

/* ── one chapter's copy layer ─────────────────────────────────────────── */
function StoryCopy({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: StoryChapter
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const { copyInput, first, last } = windows(index, total)
  const mapOpacity = useMemo(
    () => transform(copyInput, [first ? 1 : 0, 1, 1, last ? 1 : 0]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, total]
  )
  const mapY = useMemo(
    () => transform(copyInput, [first ? 0 : 24, 0, 0, last ? 0 : -24]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, total]
  )
  const opacity = useTransform(progress, mapOpacity)
  const y = useTransform(progress, mapY)

  return (
    <motion.div
      className="jn-story-copy"
      style={{ opacity, y, ['--jn-ch-accent' as string]: chapter.accent }}
    >
      <div className="eyebrow" style={{ marginBottom: '18px', color: chapter.accent }}>
        {chapter.eyebrow}
      </div>
      <h3 className="jn-ch-title">{chapter.title}</h3>
      <p className="jn-ch-body">{chapter.body}</p>
      <ul className="jn-ch-points">
        {chapter.points.map(p => (
          <li key={p} className="jn-ch-point">
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ── one screenshot layer inside a persistent frame ───────────────────── */
function StoryShot({
  screen,
  index,
  total,
  progress,
  sizes,
  decorative = false,
}: {
  screen: Screen
  index: number
  total: number
  progress: MotionValue<number>
  sizes: string
  /** The second phone repeats the chapter visually; it carries no new meaning. */
  decorative?: boolean
}) {
  const { start } = windows(index, total)
  // Cumulative, not a symmetric crossfade: the layer below stays fully opaque,
  // so the bezel never bleeds through at the halfway point.
  const map = useMemo(() => transform([start - FADE, start + FADE], [0, 1]), [start])
  const opacity = useTransform(progress, map)

  return (
    <motion.div className="jn-story-shot" style={index === 0 ? undefined : { opacity }}>
      <Image
        src={screen.src}
        alt={decorative ? '' : screen.alt}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        sizes={sizes}
        loading="lazy"
        draggable={false}
      />
    </motion.div>
  )
}

/* ── one progress-rail segment ────────────────────────────────────────── */
function RailSegment({
  chapter,
  index,
  total,
  progress,
  active,
}: {
  chapter: StoryChapter
  index: number
  total: number
  progress: MotionValue<number>
  active: boolean
}) {
  const { start, end } = windows(index, total)
  const map = useMemo(() => transform([start, end], [0, 1]), [start, end])
  const scaleX = useTransform(progress, map)

  return (
    <div className="jn-story-seg" data-active={active}>
      <span className="jn-story-seg-track">
        <motion.span
          className="jn-story-seg-fill"
          style={{ scaleX, background: chapter.accent }}
        />
      </span>
      <span className="jn-story-seg-label">{chapter.railLabel}</span>
    </div>
  )
}

/* ── the engine ───────────────────────────────────────────────────────── */
export default function ScrollStory({
  chapters,
  label,
}: {
  chapters: StoryChapter[]
  /** Accessible name for the section. */
  label: string
}) {
  const containerRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', p => {
    setActive(Math.max(0, Math.min(chapters.length - 1, Math.floor(p * chapters.length))))
  })

  const n = chapters.length

  return (
    <section
      ref={containerRef}
      className="jn-story"
      aria-label={label}
      style={{ ['--jn-story-chapters' as string]: n }}
    >
      <div className="jn-story-pin">
        {/* ── desktop: the pinned stage ── */}
        <div className="jn-story-stage">
          <div className="jn-story-phones">
            <div className="v2-device jn-story-device-a">
              {chapters.map((c, i) => (
                <StoryShot
                  key={c.id}
                  screen={c.screens[0]}
                  index={i}
                  total={n}
                  progress={scrollYProgress}
                  sizes="300px"
                />
              ))}
            </div>
            <div className="v2-device jn-story-device-b">
              {chapters.map((c, i) => (
                <StoryShot
                  key={c.id}
                  screen={c.screens[1]}
                  index={i}
                  total={n}
                  progress={scrollYProgress}
                  sizes="200px"
                  decorative
                />
              ))}
            </div>
          </div>

          <div className="jn-story-copies">
            <span className="jn-story-glyph" aria-hidden="true">
              {chapters[active].glyph}
            </span>
            {chapters.map((c, i) => (
              <StoryCopy
                key={c.id}
                chapter={c}
                index={i}
                total={n}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div className="jn-story-rail" aria-hidden="true">
          {chapters.map((c, i) => (
            <RailSegment
              key={c.id}
              chapter={c}
              index={i}
              total={n}
              progress={scrollYProgress}
              active={i === active}
            />
          ))}
        </div>

        {/*
          ── mobile / reduced motion: the stacked fork ──
          Exactly one of the two subtrees is ever `display: none`, and
          `display: none` also removes a subtree from the accessibility tree.
          So neither is aria-hidden: whichever fork is on screen is the one
          that gets announced, and the content is never doubled up.
        */}
        <div className="jn-story-cards">
          {chapters.map(c => (
            <article
              key={c.id}
              className="jn-story-card"
              style={{ ['--jn-ch-accent' as string]: c.accent }}
            >
              <Reveal className="jn-story-card-phone" y={22} amount={0.15}>
                <PhoneFrame src={c.screens[0].src} alt={c.screens[0].alt} width={232} />
              </Reveal>
              <Reveal delay={0.08} amount={0.15}>
                <div className="eyebrow" style={{ marginBottom: '16px', color: c.accent }}>
                  {c.eyebrow}
                </div>
                <h3 className="jn-ch-title">{c.title}</h3>
                <p className="jn-ch-body">{c.body}</p>
                <ul className="jn-ch-points">
                  {c.points.map(p => (
                    <li key={p} className="jn-ch-point">
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
