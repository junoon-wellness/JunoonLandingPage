'use client'

import { useRef } from 'react'

/**
 * A swipe row of full-size app screens (round 4, Kush, 7:18 PM Fri 13 Nov:
 * "swipe rows but with the full sized screens"). One screen per swipe on a
 * phone (scroll-snap with a hard stop), about four in view on a computer with
 * two arrow buttons. No visible scroll bar. The slides are server-rendered
 * children; this only adds the arrows.
 *
 * Pattern, from memory: Apple's App Store and iPhone pages ("Take a closer
 * look" galleries with arrow buttons), Headspace's phone carousels.
 */
export default function ScreenRow({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const go = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const slide = el.querySelector<HTMLElement>('.sr-slide')
    const step = slide ? slide.offsetWidth + 20 : el.clientWidth * 0.8
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: still ? 'auto' : 'smooth' })
  }
  return (
    <div className="sr">
      <div className="sr-track" ref={ref} role="group" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="sr-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous screen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next screen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}
