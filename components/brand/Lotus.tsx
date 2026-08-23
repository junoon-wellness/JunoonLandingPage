/**
 * The Junoon lotus — a five-path line drawing, 1.5px stroke on a 24-box.
 * ONE drawing for the whole site: the pricing feature row imports it too
 * (components/pricing/FeatureIcon.tsx), so the mark above a section label and
 * the icon beside "Guided meditation and breathwork" are the same lotus.
 *
 * Kush, 2026-08-23: "it's a nice element to have throughout, especially in
 * that mint color" — default colour is sage. Decorative: aria-hidden.
 */
export default function Lotus({
  size = 18,
  color = 'var(--jn-sage)',
  className,
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 5 C10.2 7.2 9.6 9.6 9.6 12.6 C9.6 15.6 10.6 17.6 12 18.4 C13.4 17.6 14.4 15.6 14.4 12.6 C14.4 9.6 13.8 7.2 12 5 Z" />
      <path d="M7.2 8.4 C7.6 11 8.4 13.6 10 15.6 C10.6 16.4 11.2 17 12 18.4" />
      <path d="M16.8 8.4 C16.4 11 15.6 13.6 14 15.6 C13.4 16.4 12.8 17 12 18.4" />
      <path d="M3.6 12.2 C4.6 14.8 6.4 17 9 18.2 C10 18.6 11 18.8 12 18.8 C13 18.8 14 18.6 15 18.2 C17.6 17 19.4 14.8 20.4 12.2" />
      <path d="M8 20.4 C9.3 20.9 10.6 21.1 12 21.1 C13.4 21.1 14.7 20.9 16 20.4" />
    </svg>
  )
}
