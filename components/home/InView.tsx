'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Plays a section's entrance once, the first time it scrolls into view
 * (Kush, call of Mon 9 Nov: "as you scroll down, they ... go to whatever
 * distance they're at"). Used by the J Score bars and the ring of the limbs.
 *
 * How it stays safe:
 *   - Before this runs (no JavaScript, or before hydration) nothing is hidden:
 *     the drawing renders in its final state.
 *   - On mount it marks the block `data-anim="ready"` (CSS hides the moving
 *     parts at their start positions), then `data-anim="in"` once a third of
 *     it is on screen, which runs the CSS transitions in app/home.css.
 *   - prefers-reduced-motion: it never arms, so the final state just shows.
 *   - A block already on screen at load goes straight to "in" (it still plays).
 */
export default function InView({
  className,
  children,
  threshold = 0.35,
  ...rest
}: {
  className?: string
  children: ReactNode
  threshold?: number
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return
    el.dataset.anim = 'ready'
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // one frame at the start positions, then play
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                el.dataset.anim = 'in'
              }),
            )
            io.disconnect()
          }
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  )
}
