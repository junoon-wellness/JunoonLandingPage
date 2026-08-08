'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Restrained pointer tilt for the hero phone (spec §B2). Max ~4deg, sprung.
 *
 * Disabled entirely on touch and under reduced motion, checked with
 * matchMedia rather than a viewport width: a small laptop still has a pointer,
 * and a large tablet still does not.
 */
const MAX_DEG = 4

export function usePointerTilt(max = MAX_DEG) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 130, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setEnabled(fine.matches && !still.matches)
    sync()
    fine.addEventListener('change', sync)
    still.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      still.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x.set((e.clientX - r.left) / r.width - 0.5)
      y.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  return { ref, enabled, rotateX, rotateY }
}
