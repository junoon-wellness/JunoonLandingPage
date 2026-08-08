'use client'

import { useRef, useState } from 'react'
import { motion, transform, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
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

/**
 * THE CINEMATIC HERO (v4 spec §A)
 *
 * Full-bleed and centred. The phone starts at the bottom edge of the fold with
 * its top third showing, tilted back; as the visitor scrolls the first
 * viewport it rises, straightens and settles into full view while the copy
 * travels up and out. Past the pin everything scrolls away with the page.
 *
 * ⚠️ FUNCTION-FORM useTransform ONLY, same rule as the scroll story. The
 * (value, inputRange, outputRange) form gets compiled into a native WAAPI
 * animation whose keyframe offsets must sit inside [0,1], and it produced
 * measurably wrong values. The full account is in the header of
 * components/story/ScrollStory.tsx.
 *
 * WHY THE COPY DOES NOT FADE: fading it would leave an invisible but still
 * clickable email field sitting over the phone. Instead it translates by more
 * than its own height, so it is either on screen and interactive or clipped
 * out of the pin entirely. `data-offstage` then takes it out of the tab order
 * and the hit-test the moment it has left, which is what keeps the capture
 * honest at every scroll position (gate F1).
 */
export default function HeroV4({ source, claimed, isFlashing, onSignupSuccess }: HeroV4Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [offstage, setOffstage] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // The rise. Settles by 0.85 so there is a beat of stillness before the pin
  // releases, rather than the phone still moving as the next section arrives.
  const riseY = useTransform(scrollYProgress, p => `${transform([0, 0.85], [58, 0])(p)}%`)
  const riseTilt = useTransform(scrollYProgress, transform([0, 0.85], [15, 0]))
  const riseScale = useTransform(scrollYProgress, transform([0, 0.85], [0.93, 1]))
  const glow = useTransform(scrollYProgress, transform([0, 0.6], [0.35, 1]))

  // Copy clears itself: -118% of its own height, so nothing is left peeking.
  const copyY = useTransform(scrollYProgress, p => `${transform([0, 0.8], [0, -118])(p)}%`)

  useMotionValueEvent(scrollYProgress, 'change', p => setOffstage(p > 0.72))

  return (
    <section ref={sectionRef} className="jn-hero" aria-label="Junoon founding member waitlist">
      <div className="jn-hero-pin">
        <div className="v2-grid" aria-hidden="true" />

        <motion.div
          className="jn-hero-copy jn-reveal"
          style={{ y: copyY }}
          data-offstage={offstage}
        >
          <motion.div
            className="jn-hero-inner"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="eyebrow jn-hero-eyebrow">Founding member waitlist</div>

            {/*
              The clause is a PLAIN <em>, not a separately animated one.

              v3 gave it its own delayed fade. On this page that is a bad
              trade: the whole headline is one 88px line, and an independent
              animation that fails, throttles or is interrupted leaves the
              hero reading "Wellness rooted in" with its punchline missing.
              Measured exactly that while building. The line now arrives as
              one unit with the rest of the copy, which cannot strand half a
              sentence and reads better at this size anyway.
            */}
            <h1 className="jn-hero-h1">
              Wellness rooted in <em>where you&apos;re from.</em>
            </h1>

            <p className="jn-hero-sub">
              Live classes, on-demand practice, and an AI Coach that learns your week.
            </p>

            <div className="jn-hero-capture">
              <SignupForm source={source} onSignupSuccess={onSignupSuccess} inline />
            </div>

            <div className="jn-hero-progress">
              <SpotsProgress claimed={claimed} isFlashing={isFlashing} slim />
            </div>
          </motion.div>
        </motion.div>

        <div className="jn-hero-stage">
          <motion.div className="jn-hero-glow" aria-hidden="true" style={{ opacity: glow }} />
          <motion.div
            className="jn-hero-phone v2-device"
            style={{
              y: riseY,
              rotateX: riseTilt,
              scale: riseScale,
              transformPerspective: 1400,
            }}
          >
            <PhoneScreen screen={HERO_SCREEN} sizes="(max-width: 768px) 60vw, 300px" priority />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
