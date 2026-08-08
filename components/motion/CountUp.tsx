'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import type { CSSProperties } from 'react'

/**
 * Number roll for the page's large figures (spec §A3): the stat band's
 * 500 / 6 / 1 and the offer band's 500.
 *
 * Reduced motion and no-JS are handled by where the value *starts*, not by a
 * branch after the fact:
 *   - server render and first paint hold the FINAL value, so a crawler or a
 *     reduced-motion visitor never sees a zero,
 *   - a layout effect (before paint) resets to zero only when motion is
 *     allowed, so nobody sees the number flick backwards.
 */

// useLayoutEffect warns during SSR; useEffect is the correct no-op there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface CountUpProps {
  to: number
  /** Milliseconds for the whole roll. */
  duration?: number
  className?: string
  style?: CSSProperties
}

export default function CountUp({ to, duration = 1000, className = '', style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(to)
  const [animatable, setAnimatable] = useState(false)

  useIsoLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAnimatable(true)
    setValue(0)
  }, [])

  useEffect(() => {
    if (!animatable || !inView) return

    let frame = 0
    const start = performance.now()
    // Same ease-out curve as every other motion on the page.
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(easeOut(t) * to))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animatable, inView, to, duration])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {value}
    </span>
  )
}
