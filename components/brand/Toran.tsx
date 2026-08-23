/**
 * Toran — the doorway-garland motif as a section divider: a repeating gold
 * scallop with a small hanging leaf at each junction and a top rule. (The
 * centre lozenge was dropped — Kush, 2026-08-23: "weird overlapping diamond".) Kush picked it from the flair canvas (2026-08-23,
 * "go with 1 and 3"). Replaces the plain hairline at MAJOR section breaks
 * only — never inside cards, never on the one-screen pricing stage.
 *
 * The pattern id is suffixed per instance so several torans on one page do
 * not share (and clobber) one <pattern>.
 */
import { useId } from 'react'

export default function Toran({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const pid = `toran-${id}`
  return (
    <div className={`jn-toran${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg
        className="jn-toran-svg"
        viewBox="0 0 1184 28"
        preserveAspectRatio="none"
        width="100%"
        height="28"
      >
        <defs>
          <pattern id={pid} x="0" y="0" width="48" height="28" patternUnits="userSpaceOnUse">
            <path d="M0 4 Q24 30 48 4" fill="none" stroke="var(--jn-turmeric)" strokeWidth="1" opacity="0.55" />
            <path d="M24 17 l3.5 5 -3.5 5 -3.5 -5 z" fill="var(--jn-turmeric)" opacity="0.45" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1184" height="28" fill={`url(#${pid})`} />
        <path d="M0 4 H1184" stroke="var(--jn-turmeric)" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}
