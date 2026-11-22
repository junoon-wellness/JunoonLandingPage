'use client'

import { useSyncExternalStore, type ReactNode } from 'react'
import { hashSnapshot, serverHashSnapshot, setHash, subscribeHash } from './hashStore'

/**
 * The Articles tab's filter chips: All, Ayurveda, Yoga, From Junoon.
 * Arnav, Sat 21 Nov 2026: "make the articles a little more organized too by
 * having a filter to organize the articles by".
 *
 * Every card stays in the server-rendered HTML. This only sets data-filter on
 * the wrapper, and CSS hides the cards of other groups (each card carries its
 * data-group), so the page stays static and crawlable. The choice rides in the
 * hash as "#articles-<group>", which the tabs read as Articles.
 */
export interface FilterChip {
  id: string
  label: string
  count: number
}

const PREFIX = '#articles-'

export default function ArticleFilter({
  chips,
  total,
  children,
}: {
  chips: FilterChip[]
  total: number
  children: ReactNode
}) {
  const hash = useSyncExternalStore(subscribeHash, hashSnapshot, serverHashSnapshot)
  const fromHash = hash.startsWith(PREFIX) ? hash.slice(PREFIX.length) : ''
  const current = chips.some(c => c.id === fromHash) ? fromHash : 'all'
  const all: FilterChip[] = [{ id: 'all', label: 'All', count: total }, ...chips]

  return (
    <>
      <div role="group" aria-label="Filter articles" className="lb-chips">
        {all.map(c => (
          <button
            key={c.id}
            type="button"
            className="lb-chip"
            aria-pressed={c.id === current}
            onClick={() => setHash(c.id === 'all' ? null : `articles-${c.id}`)}
          >
            {c.label}
            <span className="lb-chip-count">{c.count}</span>
          </button>
        ))}
      </div>
      <div className="lb-filterable" data-filter={current}>
        {children}
      </div>
    </>
  )
}
