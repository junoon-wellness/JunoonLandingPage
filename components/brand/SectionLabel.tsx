import type { ReactNode } from 'react'

/**
 * A section label. Wraps the existing gold `.eyebrow` text; `align` mirrors
 * the label's own alignment.
 *
 * Kush, 2026-08-24: "i also want to reduce the amount of times it appears...
 * keep it in nav and footer only." This component was the single biggest
 * source of lotus marks on the site — six call sites across Library, About and
 * Pricing — so the mark is gone from here. The wrapper and both alignment
 * classes stay: they still control how the eyebrow sits, and `--stacked`'s
 * 8px gap is now inert with one child rather than wrong.
 */
export default function SectionLabel({
  children,
  align = 'start',
  className,
  style,
}: {
  children: ReactNode
  align?: 'start' | 'center'
  className?: string
  style?: React.CSSProperties
}) {
  // Kush, 2026-08-23: centred labels keep the lotus ABOVE the text; left-
  // aligned ones ("What we're building next", "Articles") carry it BESIDE the
  // text so the block stays one line tall.
  if (align === 'center') {
    return (
      <div
        className={`jn-section-label jn-section-label--stacked${className ? ` ${className}` : ''}`}
        style={{ alignItems: 'center', ...style }}
      >
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div
      className={`jn-section-label jn-section-label--inline${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="eyebrow">{children}</div>
    </div>
  )
}
