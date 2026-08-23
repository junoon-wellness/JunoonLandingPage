import { APP_STORE_URL } from '@/lib/constants'

/**
 * LV5-024: Apple's OWN "Download on the App Store" badge artwork, not a
 * hand-drawn imitation. `/public/appstore-badge.svg` is a byte-identical copy
 * of the black badge at
 * agent-os/companies/junoon/content-studio/assets/Download_on_the_App_Store_Badge.svg
 * (moved there by JMP-004) — never edit or recolour it; Apple's guidelines
 * require the mark to ship unmodified.
 *
 * The badge's native artwork is 135x40 (viewBox "0 0 135 40") — that 3.375:1
 * aspect is LOCKED (BADGE_ASPECT below) so every size variant scales both
 * axes together rather than stretching the mark. 40px is Apple's own stated
 * minimum height; the default variant renders at exactly that and pads the
 * link's tap target up to 44px rather than growing the artwork past what
 * Apple ships.
 *
 * LV5-002 (superseded): this used to be a neutral dark text pill because
 * neither repo had a local copy of Apple's SVG. It does — see the ticket —
 * so the pill is gone.
 */
const BADGE_ASPECT = 135 / 40

/** Rendered badge height per variant, px. Width is derived from BADGE_ASPECT. */
const BADGE_HEIGHT: Record<'default' | 'nav' | 'lg', number> = {
  /** Apple's own minimum. */
  default: 40,
  /** LV5-018 (Kush): "+~10-15% over the base size" for NavV2. */
  nav: 46,
  /** LV5-018 (Kush): "~1.4-1.5x, ~200px wide" for the /pricing card's CTA. */
  lg: 60,
}

export default function AppStoreBadge({
  full = false,
  size,
  onClick,
}: {
  /** Full-width variant for the mobile sheet. The badge itself stays at its
   *  fixed, correctly-proportioned size (Apple's mark is never stretched) —
   *  `full` widens the tappable row around it and centres the badge in it. */
  full?: boolean
  /** LV5-018 (Kush): scale the badge up in the two spots he called out —
   *  'nav' for NavV2 (persistent bar + mobile sheet), 'lg' for the
   *  /pricing card's CTA. Omitted renders Apple's 40px minimum. */
  size?: 'nav' | 'lg'
  onClick?: () => void
}) {
  const height = BADGE_HEIGHT[size ?? 'default']
  const width = Math.round(height * BADGE_ASPECT)

  return (
    <a
      href={APP_STORE_URL}
      className={`v2-link v2-appstore-badge${size ? ` v2-appstore-badge--${size}` : ''}`}
      style={full ? { width: '100%' } : undefined}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a static,
          purpose-built SVG in /public; next/image's optimizer buys nothing
          for a vector asset that must render pixel-for-pixel unmodified. */}
      <img
        src="/appstore-badge.svg"
        alt="Download on the App Store"
        width={width}
        height={height}
        style={{ display: 'block', width: `${width}px`, height: `${height}px` }}
      />
    </a>
  )
}
