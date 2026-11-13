'use client'

import { useEffect } from 'react'

/**
 * Marks <html data-scrolled> once the page has moved, so the sticky top bar
 * turns to frosted glass and tightens (app/theme.css, section 2). Renders
 * nothing. A passive listener with no layout reads beyond scrollY.
 */
export default function ScrollState() {
  useEffect(() => {
    const d = document.documentElement
    const on = () => {
      if (window.scrollY > 8) d.dataset.scrolled = '1'
      else delete d.dataset.scrolled
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return null
}
