'use client'

import { useSyncExternalStore } from 'react'
import { THEME_STORAGE_KEY } from '@/lib/theme-boot'

/**
 * The Light / Dark switch in the top bar (Kush, Fri 13 Nov 2026). The theme
 * itself is set before paint by lib/theme-boot.ts; this button only flips
 * `data-theme` on <html> and remembers the choice for this visitor. Until a
 * visitor picks, the site follows their system setting, and keeps following
 * it if the system changes.
 *
 * Pattern borrowed (from memory): Apple's developer site and Linear put a
 * small sun / moon icon button at the end of the top bar, no label.
 */

type Theme = 'light' | 'dark'

function read(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange)
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  // Follow the system while the visitor has not picked.
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  const onSystem = () => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(THEME_STORAGE_KEY)
    } catch {}
    if (saved !== 'light' && saved !== 'dark') {
      document.documentElement.dataset.theme = mq.matches ? 'light' : 'dark'
    }
  }
  mq.addEventListener('change', onSystem)
  return () => {
    obs.disconnect()
    mq.removeEventListener('change', onSystem)
  }
}

export default function ThemeToggle() {
  // On the server the icon is drawn for Dark; the button is the same size
  // either way, so nothing moves when it hydrates.
  const theme = useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
  const next: Theme = theme === 'light' ? 'dark' : 'light'

  const flip = () => {
    const d = document.documentElement
    d.dataset.themeSwitching = '1'
    d.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    window.setTimeout(() => delete d.dataset.themeSwitching, 420)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={flip}
      aria-label={next === 'light' ? 'Switch to light' : 'Switch to dark'}
      title={next === 'light' ? 'Light' : 'Dark'}
      data-on={theme}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="tt-sun">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="tt-moon">
        <path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1z" />
      </svg>
    </button>
  )
}
