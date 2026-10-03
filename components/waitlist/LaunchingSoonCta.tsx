import Link from 'next/link'
import { EMAIL_SIGNUP_HREF } from '@/lib/constants'

/**
 * Stands in for the App Store badge while LAUNCHING_SOON is on (see
 * lib/constants.ts). Rendered only by AppStoreBadge.tsx, so every badge
 * spot on the site swaps together and flips back together.
 *
 * Sized to sit where the 46px-tall, ~155px-wide "nav" badge sat, so the nav
 * bar, the phone menu, the hero's phone banner and the /pricing card keep
 * their layout. Two short lines rather than one long one: "Launching soon ·
 * Join our email list" on a single line is far wider than the badge slot.
 *
 * Draft wording, for Arjav to approve.
 */
export default function LaunchingSoonCta({
  full = false,
  onClick,
}: {
  /** Full-width row for the phone menu, same as the badge's `full`. */
  full?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={EMAIL_SIGNUP_HREF}
      className={`v2-link v2-launch-cta${full ? ' v2-launch-cta--full' : ''}`}
      onClick={onClick}
    >
      <span className="v2-launch-cta-eyebrow jn-mono">Launching soon</span>
      <span className="v2-launch-cta-label">Join our email list</span>
    </Link>
  )
}
