'use client'

import { useEffect, useSyncExternalStore } from 'react'

/**
 * LV5-074 / W8 (Kush, 1 Oct: "yes"): the Dark / Light switch.
 *
 * - First visit: the inline script in app/layout.tsx has already set
 *   <html data-theme> from the device setting, before first paint.
 * - A tap writes the choice to localStorage ("jn-theme") and it sticks.
 * - Until the visitor taps, the site keeps following the device live (a
 *   phone switching to dark at sunset takes the site with it).
 *
 * The selected look is pure CSS keyed on <html data-theme> (globals.css,
 * `.rf-mode`), so the right pill is lit on the server-rendered first paint.
 * This component only owns the click and the aria-pressed state.
 */

const KEY = 'jn-theme'
type Mode = 'dark' | 'light'

function read(): Mode {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

const listeners = new Set<() => void>()
function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
function apply(mode: Mode) {
  document.documentElement.setAttribute('data-theme', mode)
  listeners.forEach(l => l())
}

export default function ThemeSwitch({ className = '' }: { className?: string }) {
  // Server snapshot is null: nothing is pressed in the HTML, the CSS lights
  // the right pill anyway, and aria-pressed catches up on hydration.
  const mode = useSyncExternalStore<Mode | null>(subscribe, read, () => null)

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem(KEY)
      } catch {
        stored = null
      }
      if (stored !== 'light' && stored !== 'dark') apply(mq.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const choose = (m: Mode) => {
    try {
      localStorage.setItem(KEY, m)
    } catch {
      // Private mode or storage blocked: the switch still works for this visit.
    }
    apply(m)
  }

  return (
    <div className={`rf-mode ${className}`.trim()} role="group" aria-label="Colour scheme">
      <button
        type="button"
        data-mode="dark"
        aria-pressed={mode === null ? undefined : mode === 'dark'}
        onClick={() => choose('dark')}
      >
        Dark
      </button>
      <button
        type="button"
        data-mode="light"
        aria-pressed={mode === null ? undefined : mode === 'light'}
        onClick={() => choose('light')}
      >
        Light
      </button>
    </div>
  )
}
