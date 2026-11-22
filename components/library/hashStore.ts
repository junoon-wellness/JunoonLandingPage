/**
 * The URL hash as a tiny store for /library's client pieces (the tabs and the
 * article filter). Both read the same hash, so a change made by one is seen
 * by the other: "#videos" is the Videos tab, "#articles-<group>" an article
 * filter, "#articles" is Articles with All, and no hash is the Videos tab (Videos first, Arnav, Sat 21 Nov 2026).
 */
const EVENT = 'lb-hash-change'

export function subscribeHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

export const hashSnapshot = () => window.location.hash

// The server (and the first client render) always shows Videos.
export const serverHashSnapshot = () => ''

/** Set the hash (or clear it with null) without a scroll jump or a history entry. */
export function setHash(hash: string | null) {
  const { pathname, search } = window.location
  window.history.replaceState(null, '', hash ? `#${hash}` : pathname + search)
  window.dispatchEvent(new Event(EVENT))
}
