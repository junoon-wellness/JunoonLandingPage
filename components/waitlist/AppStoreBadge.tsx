import { APP_STORE_URL } from '@/lib/constants'

/**
 * LV5-002: the site's primary post-launch CTA, replacing the waitlist form
 * everywhere it appeared in the nav.
 *
 * ⚠️ This is a neutral dark pill, not Apple's official "Download on the App
 * Store" badge artwork. Neither this repo nor the app repo has a local copy
 * of Apple's badge SVG (searched both trees for *apple*.svg / *app-store*
 * assets — zero hits), and hand-drawing an imitation of Apple's mark is
 * explicitly out of bounds per the round brief. So: real wordmark text,
 * no invented Apple glyph. Swap this for the real asset (Apple's Marketing
 * Guidelines site has the official SVG/PNG/PDF) whenever it's available —
 * this component is the one place that needs to change.
 */
export default function AppStoreBadge({
  full = false,
  size,
  onClick,
}: {
  /** Full-width variant for the mobile sheet. */
  full?: boolean
  /**
   * LV5-018 (Kush): scale the badge up in the two spots he called out —
   * 'nav' for NavV2 (persistent bar + mobile sheet, +~10-15% over the base
   * size), 'lg' for the /pricing card's CTA (~1.4-1.5x, ~200px wide).
   * Omitted keeps today's size — nothing calls it unsized any more now that
   * HeroV2's own copy of the badge is gone, but the default stays the
   * original look for any future caller.
   */
  size?: 'nav' | 'lg'
  onClick?: () => void
}) {
  return (
    <a
      href={APP_STORE_URL}
      className={`v2-link v2-appstore-badge${size ? ` v2-appstore-badge--${size}` : ''}`}
      style={full ? { width: '100%' } : undefined}
      onClick={onClick}
    >
      <span className="v2-appstore-badge-eyebrow">Download on the</span>
      <span className="v2-appstore-badge-name">App Store</span>
    </a>
  )
}
