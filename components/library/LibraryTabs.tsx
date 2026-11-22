'use client'

import { useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react'

/**
 * /library's two tabs, Articles and Videos.
 * Arnav, Sat 21 Nov 2026: "add another tab for videos please so there will be
 * two tabs".
 *
 * Only this switcher is a client component. Both panels arrive already
 * rendered on the server (as children props), so the page stays statically
 * generated and both lists are in the HTML; the switcher only shows one.
 *
 * The choice lives in the URL hash so a tab can be linked: /library#videos
 * opens on Videos. Articles is the default and carries no hash. No element on
 * the page has id="videos", so the hash never makes the browser jump.
 */
type Tab = 'articles' | 'videos'
const TABS: { id: Tab; label: string }[] = [
  { id: 'articles', label: 'Articles' },
  { id: 'videos', label: 'Videos' },
]
const TAB_EVENT = 'lb-tab-change'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  window.addEventListener(TAB_EVENT, onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener(TAB_EVENT, onChange)
  }
}
const hashSnapshot = () => window.location.hash
// The server (and the first client render) always shows Articles.
const serverSnapshot = () => ''

export default function LibraryTabs({
  articles,
  videos,
}: {
  articles: ReactNode
  videos: ReactNode
}) {
  const hash = useSyncExternalStore(subscribe, hashSnapshot, serverSnapshot)
  const current: Tab = hash === '#videos' ? 'videos' : 'articles'
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ articles: null, videos: null })

  function select(tab: Tab) {
    const { pathname, search } = window.location
    // replaceState, not location.hash: no scroll jump and no extra history entry.
    window.history.replaceState(null, '', tab === 'videos' ? '#videos' : pathname + search)
    window.dispatchEvent(new Event(TAB_EVENT))
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const i = TABS.findIndex(t => t.id === current)
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (i + 1) % TABS.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    if (next === null) return
    e.preventDefault()
    const tab = TABS[next].id
    select(tab)
    tabRefs.current[tab]?.focus()
  }

  return (
    <>
      <div className="lb-tabs-bar">
        <div role="tablist" aria-label="Library" className="lb-tabs">
          {TABS.map(t => {
            const on = t.id === current
            return (
              <button
                key={t.id}
                ref={el => {
                  tabRefs.current[t.id] = el
                }}
                type="button"
                role="tab"
                id={`lb-tab-${t.id}`}
                aria-controls={`lb-panel-${t.id}`}
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                className="lb-tab"
                onClick={() => select(t.id)}
                onKeyDown={onKeyDown}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
      <div
        role="tabpanel"
        id="lb-panel-articles"
        aria-labelledby="lb-tab-articles"
        className="lb-tabpanel"
        hidden={current !== 'articles'}
      >
        {articles}
      </div>
      <div
        role="tabpanel"
        id="lb-panel-videos"
        aria-labelledby="lb-tab-videos"
        className="lb-tabpanel"
        hidden={current !== 'videos'}
      >
        {videos}
      </div>
    </>
  )
}
