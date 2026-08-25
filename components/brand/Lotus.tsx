/**
 * The Junoon lotus — the brand mark.
 *
 * Kush, 2026-08-24: "can we replace the current lotus mark we have with
 * something like the one on the left... i also want to reduce the amount of
 * times it appears... keep it in nav and footer only." He supplied a reference
 * image (filled pink petals over green leaves) and asked for an approximation
 * rather than a traced asset, so this is drawn from scratch to match its
 * character: solid fills, no strokes, five petals in three tone ranks over two
 * leaves and a bottom point.
 *
 * This REPLACES the previous five-path outline drawing. That outline lotus was
 * shared with the pricing feature row; it now lives inline in
 * components/pricing/FeatureIcon.tsx, where it belongs beside its five stroked
 * siblings. Two lotus drawings exist in this repo on purpose: this filled one
 * is the brand mark, that stroked one is an icon in a list of icons.
 *
 * Geometry is symmetric BY CONSTRUCTION, not by hand: one petal path rotated
 * about a fixed origin (32,47) for the four side petals, and one leaf path
 * mirrored with scale(-1,1). Editing PETAL or LEAF changes both sides at once.
 * The trailing `translate` on a rotated petal shifts it along its OWN axis,
 * which is what pulls the outer ranks back so they sit under the centre petal.
 *
 * Decorative everywhere it is used: aria-hidden.
 */

/** One petal, pointing up, its base at (32,47) — the rotation origin. */
const PETAL =
  'M32 9 C27.5 17 25 26 25 33 C25 40 27.5 44.5 32 47 C36.5 44.5 39 40 39 33 C39 26 36.5 17 32 9 Z'

/** The right-hand leaf. The left one is this path mirrored. */
const LEAF = 'M31 44 C40 37 52 35 61 38 C55 49 43 54 31 50 Z'

/** The small point below the leaves. */
const TIP = 'M32 49 C35 52 36.5 56 32 61 C27.5 56 29 52 32 49 Z'

const OUTER = '#DA8079'
const MID = '#ECA098'
const CENTRE = '#F9CCC7'
const GREEN = '#4A7A38'

export default function Lotus({
  size = 22,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d={PETAL} fill={OUTER} transform="rotate(-70 32 47) translate(0 9)" />
      <path d={PETAL} fill={OUTER} transform="rotate(70 32 47) translate(0 9)" />
      <path d={PETAL} fill={MID} transform="rotate(-35 32 47) translate(0 3)" />
      <path d={PETAL} fill={MID} transform="rotate(35 32 47) translate(0 3)" />
      <path d={PETAL} fill={CENTRE} />
      <path d={LEAF} fill={GREEN} />
      <path d={LEAF} fill={GREEN} transform="translate(64 0) scale(-1 1)" />
      <path d={TIP} fill={GREEN} />
    </svg>
  )
}
