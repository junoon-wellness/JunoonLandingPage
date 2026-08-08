'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, transform, useScroll, useTransform } from 'framer-motion'
import SignupForm from './SignupForm'
import SpotsProgress from './SpotsProgress'
import PhoneScreen from '@/components/hero/PhoneScreen'
import { HERO_SCREEN } from '@/lib/screens'

interface HeroV4Props {
  source: string
  claimed: number
  isFlashing: boolean
  onSignupSuccess: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const
/** Below this the hero stacks and the lateral move is switched off. */
const TWO_COLUMN_MIN = 900

// useLayoutEffect warns during SSR; useEffect is the correct no-op there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * THE CINEMATIC HERO (v4 spec §A, restructured round 3 at Kush's request)
 *
 * The video is the first thing and it is alone: it opens centred in the fold,
 * slightly oversized. As the visitor scrolls the first viewport it slides to
 * the right and settles at its resting size while the copy column assembles on
 * the left, landing in the two-column shape v3 used. Past the pin the whole
 * thing scrolls away with the page.
 *
 * ⚠️ The lateral distance is MEASURED, not guessed. The phone lives in the
 * right half of a two-column grid, so centring it means moving it left by a
 * quarter of the stage plus half the gap. Hard-coding that in vw breaks the
 * moment the gap or the padding changes; measuring keeps the phone genuinely
 * centred at every width.
 *
 * ⚠️ FUNCTION-FORM useTransform ONLY, same rule as the scroll story. The
 * array form compiles to a native WAAPI animation and returns wrong values.
 * See the header of components/story/ScrollStory.tsx.
 */
export default function HeroV4({ source, claimed, isFlashing, onSignupSuccess }: HeroV4Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Measured before paint so the phone is never briefly off-centre.
  useIsoLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const { width } = el.getBoundingClientRect()
      if (window.innerWidth < TWO_COLUMN_MIN) {
        setShift(0) // stacked: the phone is already centred
        return
      }
      const gap = parseFloat(getComputedStyle(el).columnGap) || 64
      setShift(-(width / 4 + gap / 2))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // The phone travels first; the copy follows into the space it vacates.
  const phoneX = useTransform(scrollYProgress, transform([0, 0.55], [shift, 0]))
  const phoneScale = useTransform(scrollYProgress, transform([0, 0.55], [1.12, 1]))
  const copyOpacity = useTransform(scrollYProgress, transform([0.26, 0.6], [0, 1]))
  const copyX = useTransform(scrollYProgress, transform([0.26, 0.6], [-44, 0]))
  const glow = useTransform(scrollYProgress, transform([0, 0.55], [1, 0.75]))

  return (
    <section ref={sectionRef} className="jn-hero" aria-label="Junoon founding member waitlist">
      <div className="jn-hero-pin">
        <div className="v2-grid" aria-hidden="true" />

        <div className="jn-hero-stage" ref={stageRef}>
          {/*
            The copy is present in the DOM from the start, so the H1 is always
            there for crawlers and assistive tech; only its paint is deferred.
          */}
          <motion.div className="jn-hero-copy jn-reveal" style={{ opacity: copyOpacity, x: copyX }}>
            <div className="eyebrow jn-hero-eyebrow">Founding member waitlist</div>

            <h1 className="jn-hero-h1">
              Wellness rooted in <em>where you&apos;re from.</em>
            </h1>

            <p className="jn-hero-sub">
              Live classes, on-demand practice, and an AI Coach that learns your week.
            </p>

            {/*
              THE FULL FORM LIVES HERE NOW (round 3). The hero takes name,
              email and phone; the close at the bottom is the short one. `#join`
              moved with it, so the nav CTA still lands on the form that can
              actually take a phone number.
            */}
            <div className="jn-hero-capture">
              <SignupForm
                id="join"
                source={source}
                onSignupSuccess={onSignupSuccess}
                withPhone
              />
            </div>

            <div className="jn-hero-progress">
              <SpotsProgress claimed={claimed} isFlashing={isFlashing} slim />
            </div>
          </motion.div>

          <motion.div className="jn-hero-phone-wrap" style={{ x: phoneX, scale: phoneScale }}>
            <motion.div className="jn-hero-glow" aria-hidden="true" style={{ opacity: glow }} />
            <div className="jn-hero-phone v2-device">
              <PhoneScreen
                screen={HERO_SCREEN}
                sizes="(max-width: 900px) 62vw, 300px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
