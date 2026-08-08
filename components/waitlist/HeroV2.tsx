'use client'

import { useRef } from 'react'
import { motion, transform, useScroll, useTransform } from 'framer-motion'
import SignupForm from './SignupForm'
import SpotsProgress from './SpotsProgress'
import DeviceCarousel from './DeviceCarousel'

interface HeroV2Props {
  source: string
  claimed: number
  isFlashing: boolean
  onSignupSuccess: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Entrance staircase, moved off the old `.fade-up .delay-N` CSS classes onto
 * framer variants (spec §B2). Same feel, tighter timings, and the delays are
 * now one number in one place instead of five hand-numbered classes.
 *
 * Reduced motion is neutralised by `.jn-reveal` in globals.css.
 */
const container = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.085, delayChildren: 0.05 } },
}

const step = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.66, ease: EASE } },
}

export default function HeroV2({ source, claimed, isFlashing, onSignupSuccess }: HeroV2Props) {
  const sectionRef = useRef<HTMLElement>(null)

  // Phone parallax: it travels slower than the copy as the hero leaves. A few
  // px only, enough to read as depth rather than as a moving element.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Function form, not the (value, inputRange, outputRange) form: see the
  // warning at the top of components/story/ScrollStory.tsx for why the array
  // form is not trustworthy for scroll-linked values in framer-motion 12.
  const phoneY = useTransform(scrollYProgress, transform([0, 1], [0, 64]))

  return (
    <section
      ref={sectionRef}
      className="v2-hero noise-bg"
      style={{ background: 'var(--jn-bg)', overflow: 'hidden' }}
    >
      {/* Faint engineering grid replaces the old 720px yantra motif */}
      <div className="v2-grid" aria-hidden="true" />

      {/* ── Left: the pitch and the action ──
          On mobile this wrapper becomes `display: contents` so its children
          promote to grid items and the carousel can be ordered in between the
          paragraph and the form. See .v2-hero-copy in globals.css.

          `display: contents` is also why the stagger container has to be a
          plain div with variants rather than a motion wrapper with padding:
          it must not introduce a box of its own. */}
      <motion.div
        className="v2-hero-copy"
        style={{ position: 'relative', zIndex: 2, maxWidth: '560px' }}
        variants={container}
        initial="hidden"
        animate="shown"
      >
        <motion.div
          className="v2-hero-eyebrow eyebrow jn-reveal"
          style={{ marginBottom: '26px' }}
          variants={step}
        >
          Founding member waitlist
        </motion.div>

        <motion.h1
          className="v2-hero-headline jn-reveal"
          variants={step}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: '-0.015em',
            color: 'var(--jn-text)',
            marginBottom: '22px',
          }}
        >
          Wellness rooted in{' '}
          {/* The italic clause settles a beat after the line lands: it opens
              slightly tracked-out and closes to its resting letter-spacing. */}
          <motion.em
            className="jn-reveal"
            style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)', display: 'inline-block' }}
            initial={{ opacity: 0, letterSpacing: '0.08em' }}
            animate={{ opacity: 1, letterSpacing: '-0.015em' }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          >
            where you&apos;re from.
          </motion.em>
        </motion.h1>

        <motion.p
          className="v2-hero-sub jn-reveal"
          variants={step}
          style={{
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--jn-text-dim)',
            maxWidth: '460px',
            marginBottom: '32px',
          }}
        >
          A modern wellness platform built for the South Asian diaspora. Live classes, on-demand
          content, and an AI Coach that personalises your practice, grounded in the traditions you
          grew up around.
        </motion.p>

        <motion.div className="v2-hero-form jn-reveal" variants={step}>
          <SignupForm id="join" source={source} onSignupSuccess={onSignupSuccess} withPhone />
        </motion.div>

        <motion.div
          className="v2-hero-progress jn-reveal"
          variants={step}
          style={{ marginTop: '30px', maxWidth: '420px' }}
        >
          <SpotsProgress claimed={claimed} isFlashing={isFlashing} />
        </motion.div>
      </motion.div>

      {/* ── Right: the actual product, cycling through the real app screens ──
          Two wrappers on purpose. The outer one is bound to the scroll motion
          value; the inner one runs the entrance. Putting both on one element
          would have `animate: { y: 0 }` seize the same motion value the
          parallax is driving, and the scroll binding would go dead after the
          entrance finished. */}
      <motion.div className="v2-devices jn-reveal" style={{ y: phoneY }}>
        <motion.div
          className="jn-reveal"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
        >
          <DeviceCarousel />
        </motion.div>
      </motion.div>
    </section>
  )
}
