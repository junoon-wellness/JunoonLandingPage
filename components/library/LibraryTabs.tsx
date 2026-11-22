'use client'

import { useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react'
import { hashSnapshot, serverHashSnapshot, setHash, subscribeHash } from './hashStore'

/**
 * /library's two tabs, Articles and Videos.
 * Arnav, Sat 21 Nov 2026: "add another tab for videos please so there will be
 * two tabs".
 *
 * Only this switcher is a client component. Both panels arrive already
 * rendered on the server (as children props), so the page stays statically
 * generated and both lists are in the HTML; the switcher only shows one.
 *
 * The choice lives in the URL hash so a tab can be linked: /library#articles (no hash = Videos)
 * opens on Videos. Articles is the default and carries no hash, or an article
 * filter's "#articles-<group>" (see ArticleFilter). No element on the page has
 * those ids, so the hash never makes the browser jump.
 */
type Tab = 'articles' | 'videos'
// Videos first and open by default (Arnav, Sat 21 Nov 2026: "Can we have the videos first and articles second to
// the right of it so when users open library they see the videos first").
const TABS: { id: Tab; label: string }[] = [
  { id: 'videos', label: 'Videos' },
  { id: 'articles', label: 'Articles' },
]
export default function LibraryTabs({
  articles,
  videos,
}: {
  articles: ReactNode
  videos: ReactNode
}) {
  const hash = useSyncExternalStore(subscribeHash, hashSnapshot, serverHashSnapshot)
  // No hash is Videos; "#articles" or any "#articles-<group>" filter is Articles.
  const current: Tab = hash === '#articles' || hash.startsWith('#articles-') ? 'articles' : 'videos'
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ articles: null, videos: null })

  function select(tab: Tab) {
    if (tab === current) return // keeps an article filter when Articles is pressed again
    setHash(tab === 'articles' ? 'articles' : null)
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
