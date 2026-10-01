import { createElement, type CSSProperties, type ElementType, type ReactNode } from 'react'

/**
 * LV5-074 (website refresh, 1 Oct 2026): SCROLL FADE-UPS ARE OFF.
 *
 * This used to be the page's reveal primitive (framer-motion whileInView,
 * 25 call sites): every section, card and hairline faded or drew itself in
 * as it scrolled into view. The 27 Sep refresh scope lists "something moves
 * on every scroll" as one of the ten things that make the site read as
 * AI-made, and proposes at most one entrance on the whole site, on the hero
 * (that one lives in globals.css, `.rf-hero-phone`).
 *
 * The API is kept exactly so no call site had to change: every prop is still
 * accepted, the motion ones are simply ignored, and content renders in place
 * at full opacity from the first paint. That also removes the old risk that
 * content parked at opacity 0 never appeared (screenshots, slow observers).
 *
 * To bring the motion back, restore this file from git history (LV5-074's
 * parent commit); nothing else references framer for reveals.
 */

export interface RevealProps {
  children: ReactNode
  /** Rendered element. */
  as?: ElementType
  /** Ignored since LV5-074 (motion off). */
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  amount?: number
  repeat?: boolean
  className?: string
  style?: CSSProperties
  id?: string
}

export default function Reveal({ children, as = 'div', className, style, id }: RevealProps) {
  return createElement(as, { id, className: className || undefined, style }, children)
}

/** Formerly a staggered container; now a plain wrapper. */
export function RevealGroup({
  children,
  className,
  style,
}: {
  children: ReactNode
  stagger?: number
  delayChildren?: number
  amount?: number
  repeat?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={className || undefined} style={style}>
      {children}
    </div>
  )
}

/** A child of `<RevealGroup>`; renders in place. */
export function RevealItem({
  children,
  as = 'div',
  className,
  style,
}: {
  children: ReactNode
  as?: ElementType
  y?: number
  x?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  return createElement(as, { className: className || undefined, style }, children)
}

/** A hairline; it no longer draws itself in, it is simply there. */
export function DrawLine({
  vertical = false,
  className,
  style,
}: {
  vertical?: boolean
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  void vertical
  return (
    <span
      aria-hidden="true"
      className={className || undefined}
      style={{ display: 'block', ...style }}
    />
  )
}
