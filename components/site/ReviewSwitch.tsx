'use client'

import { useSyncExternalStore } from 'react'
import { REVIEW_SWITCHES, type ReviewSwitch as SwitchName } from '@/lib/theme-boot'

/**
 * A REVIEW-ONLY panel (Kush picks between drawn variations, Fri 13 Nov 2026).
 * It renders nothing unless the address carries `?review=1`, so members never
 * see it. Each row flips one `data-*` switch on <html> (see lib/theme-boot.ts)
 * and writes it into the address, so a link carries the picks.
 */

const LABELS: Record<SwitchName | 'theme', string> = {
  theme: 'Theme',
  pin: 'Map mark',
  join: 'Joining',
  ground: 'Dark ground (inner pages)',
  light: 'Light ground',
}

const ROWS: { key: SwitchName | 'theme'; values: readonly string[] }[] = [
  { key: 'theme', values: ['dark', 'light'] },
  ...(Object.keys(REVIEW_SWITCHES) as SwitchName[]).map(k => ({ key: k, values: REVIEW_SWITCHES[k] })),
]

function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange)
  obs.observe(document.documentElement, { attributes: true })
  return () => obs.disconnect()
}
function snapshot() {
  const d = document.documentElement.dataset
  return ROWS.map(r => d[r.key] ?? '').join('|') + '|' + (d.review ?? '')
}

export default function ReviewSwitch() {
  const snap = useSyncExternalStore(subscribe, snapshot, () => '')
  if (!snap.endsWith('|1')) return null
  const d = document.documentElement.dataset

  const set = (key: string, value: string) => {
    d[key] = value
    const u = new URL(window.location.href)
    u.searchParams.set(key, value)
    window.history.replaceState(null, '', u.toString())
  }

  return (
    <aside className="review-switch" aria-label="Review switches">
      <b>Review switches</b>
      {ROWS.map(r => (
        <div key={r.key} className="rs-row">
          <span>{LABELS[r.key]}</span>
          <div role="group" aria-label={LABELS[r.key]}>
            {r.values.map(v => (
              <button key={v} type="button" aria-pressed={d[r.key] === v} onClick={() => set(r.key, v)}>
                {v}
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  )
}
