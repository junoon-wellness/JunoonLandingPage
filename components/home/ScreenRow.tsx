'use client'

import { Children, cloneElement, isValidElement, useEffect, useRef } from 'react'

/**
 * A swipe row of full-size app screens (round 4, Kush, 7:18 PM Fri 13 Nov:
 * "swipe rows but with the full sized screens"). One screen per swipe on a
 * phone (scroll-snap with a hard stop), about four in view on a computer with
 * two arrow buttons. No visible scroll bar. The slides are server-rendered
 * children; this adds the arrows and the drift.
 *
 * The drift (Arnav, 3:37 PM Sat 14 Nov: "can we make it so this part is
 * automatically constantly scrolling thru the screens"): the row moves right
 * to left by itself at DRIFT_PX_S, about one screen every 9 to 10 seconds, and
 * loops without a jump. The slides are rendered twice; the second set is
 * aria-hidden and inert, and when the row has scrolled one full set it steps
 * back by exactly that width, which looks identical. Snapping is off while it
 * drifts (`.is-drifting`), or every frame would fight the snap.
 *   - It stops while the mouse is over the row, while a finger is on it (and
 *     until its fling settles), while the row has keyboard focus, while the tab
 *     is hidden, and while the row is off screen. It eases back in over RAMP_MS.
 *   - The arrows still move one screen; the drift carries on from there.
 *   - prefers-reduced-motion: no drift, and the copies are hidden by CSS, so
 *     the row behaves exactly as it did before.
 * One requestAnimationFrame loop nudging scrollLeft; no React state per frame.
 *
 * Pattern, from memory: Apple's App Store and iPhone pages ("Take a closer
 * look" galleries with arrow buttons), Headspace's phone carousels.
 */
const DRIFT_PX_S = 30
const RAMP_MS = 1200
const QUIET_MS = 250

/** Width of one set of slides, or 0 when the copies are not shown. */
function setWidth(el: HTMLElement) {
  const first = el.querySelector<HTMLElement>('.sr-slide')
  const copy = el.querySelector<HTMLElement>('.sr-dup')
  if (!first || !copy || copy.offsetParent === null) return 0
  return Math.max(0, copy.offsetLeft - first.offsetLeft)
}

export default function ScreenRow({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  // the drift waits until this time (performance.now()) before moving again
  const quietUntil = useRef(0)

  const go = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const slide = el.querySelector<HTMLElement>('.sr-slide')
    const step = slide ? slide.offsetWidth + 20 : el.clientWidth * 0.8
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const w = still ? 0 : setWidth(el)
    if (w > 0) {
      // looping row: hop one whole set first when needed (it looks the same),
      // then glide to the start of the next or previous screen
      let x = el.scrollLeft
      if (dir === 1 && x >= w) x -= w
      if (dir === -1 && x < step) x += w
      el.scrollLeft = x
      const base = slide ? slide.offsetLeft : 0
      const stops = Array.from(el.querySelectorAll<HTMLElement>('.sr-slide'), s => s.offsetLeft - base)
      const to = dir === 1 ? stops.find(s => s > x + 1) : stops.reverse().find(s => s < x - 1)
      quietUntil.current = performance.now() + 600
      el.scrollTo({ left: to ?? x + dir * step, behavior: 'smooth' })
      return
    }
    el.scrollBy({ left: dir * step, behavior: still ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let last = 0
    let pos = 0
    let speed = 0
    let wrote = -1
    let hover = false
    let touch = false
    let focus = false
    let onScreen = false

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(t - last, 50) : 0
      last = t
      if (hover || touch || focus || document.hidden || t < quietUntil.current) {
        speed = 0
        pos = el.scrollLeft
        return
      }
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft
      speed = Math.min(DRIFT_PX_S, speed + (DRIFT_PX_S * dt) / RAMP_MS)
      pos += (speed * dt) / 1000
      const w = setWidth(el)
      if (w > 0 && pos >= w) pos -= w
      el.scrollLeft = pos
      wrote = el.scrollLeft
    }
    const start = () => {
      if (raf || mq.matches || !onScreen) return
      el.classList.add('is-drifting')
      pos = el.scrollLeft
      last = 0
      speed = 0
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onMotionPref = () => {
      if (!mq.matches) return start()
      stop()
      el.classList.remove('is-drifting')
    }

    // anyone else scrolling (a swipe's fling, a trackpad, the arrows) holds the drift until it settles
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - wrote) > 1) quietUntil.current = Math.max(quietUntil.current, performance.now() + QUIET_MS)
    }
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') hover = true
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') hover = false
    }
    const onTouchStart = () => {
      touch = true
    }
    const onTouchEnd = () => {
      touch = false
      quietUntil.current = performance.now() + QUIET_MS
    }
    // keyboard focus only: a mouse click on the row must not stop it for good
    const onFocusIn = () => {
      focus = el.matches(':focus-visible') || !!el.querySelector(':focus-visible')
    }
    const onFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) focus = false
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(el)
    mq.addEventListener('change', onMotionPref)
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    el.addEventListener('focusin', onFocusIn)
    el.addEventListener('focusout', onFocusOut)
    return () => {
      stop()
      io.disconnect()
      mq.removeEventListener('change', onMotionPref)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('focusin', onFocusIn)
      el.removeEventListener('focusout', onFocusOut)
      el.classList.remove('is-drifting')
    }
  }, [])

  // the second set, for the seamless loop: hidden from screen readers and the tab order
  const copies = Children.map(children, child =>
    isValidElement<{ className?: string }>(child)
      ? cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          className: `${child.props.className ?? ''} sr-dup`.trim(),
          'aria-hidden': true,
          inert: true,
        })
      : null,
  )

  return (
    <div className="sr">
      <div className="sr-track" ref={ref} role="group" aria-label={label} tabIndex={0}>
        {children}
        {copies}
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
