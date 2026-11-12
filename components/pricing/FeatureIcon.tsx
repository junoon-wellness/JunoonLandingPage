/**
 * LV5-020 spruce (1): a line icon per feature row.
 *
 * These are NOT new drawings. Each one is transcribed from the app's own icon
 * sheet — junoon-wellness-app/Junoon-IOS/Junoon/DesignSystem/JunoonIcons.swift,
 * which stores every glyph as stroked subpaths in a 24x24 design space. SwiftUI
 * Path and SVG share the same y-down origin, so the coordinates carry across
 * unchanged: `move/addLine` becomes M/L, `addCurve(to:control1:control2:)`
 * becomes C with the controls first, `addEllipse(in:)` becomes a circle,
 * `addRoundedRect` becomes a rect with rx.
 *
 * Which app glyph each row uses:
 *   plan       tabPlanStrokes()      calendar with the day dot
 *   coach      tabCoachStrokes()     speech bubble
 *   meditation (the lotus, below)     the seven-path outline lotus (redrawn 12 Nov)
 *   yoga       yogaStrokes()         seated figure
 *   live       playCircleStrokes()   play in a ring
 *   ritual     habitStrokes()        the loop with its sweep
 *
 * Sage, 1.5px stroke. Purely decorative next to a text label, so aria-hidden —
 * and sage is only being asked to carry a SHAPE here, not type, which is the
 * distinction --jn-sage vs --jn-moss exists for in globals.css.
 */
export type FeatureIconName = 'plan' | 'coach' | 'meditation' | 'yoga' | 'live' | 'ritual'

export default function FeatureIcon({
  name,
  size = 20,
}: {
  name: FeatureIconName
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--jn-sage)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {name === 'plan' && (
        <>
          <rect x="3.2" y="4.8" width="17.6" height="16" rx="3.4" />
          <path d="M3.2 9.6 H20.8" />
          <path d="M8.2 2.8 V6.4 M15.8 2.8 V6.4" />
          {/* the day dot: heavier on purpose, same widthOverride the sheet uses */}
          <path d="M12 15 L12.01 15" strokeWidth={2.4} />
        </>
      )}

      {name === 'coach' && (
        <path d="M7.2 4.4 L16.8 4.4 C19.0091 4.4 20.8 6.1909 20.8 8.4 L20.8 12.4 C20.8 14.6091 19.0091 16.4 16.8 16.4 L10.4 16.4 L7.2 19.6 L7.2 16.4 C4.9909 16.4 3.2 14.6091 3.2 12.4 L3.2 8.4 C3.2 6.1909 4.9909 4.4 7.2 4.4 Z" />
      )}

      {/* Arnav, 2026-11-12: redrawn as the classic outline lotus (a tall
          centre petal, two back petals peeking out, two side petals and two
          petals lying flat at the base), after the reference he sent in HQ.
          Still stroked sage, so it sits beside the five line icons. The
          filled two-tone brand lotus stays in nav + footer only. */}
      {name === 'meditation' && (
        <>
          <path d="M12 4 C9.7 6.6 9.2 9.8 9.4 12.6 C9.6 15.2 10.6 17 12 17.9 C13.4 17 14.4 15.2 14.6 12.6 C14.8 9.8 14.3 6.6 12 4 Z" />
          <path d="M9.6 9.2 C9.2 7.9 8.4 6.9 7.2 6.3 C6.8 7.6 6.8 8.9 7.1 10.2" />
          <path d="M14.4 9.2 C14.8 7.9 15.6 6.9 16.8 6.3 C17.2 7.6 17.2 8.9 16.9 10.2" />
          <path d="M9.5 11.9 C8 10.3 5.7 9.4 3 9.3 C3.4 12.1 4.6 14.2 6.4 15.6" />
          <path d="M14.5 11.9 C16 10.3 18.3 9.4 21 9.3 C20.6 12.1 19.4 14.2 17.6 15.6" />
          <path d="M12 18.4 C9.4 15.8 5.6 15.2 2.6 16.4 C5.2 19 8.9 19.8 12 18.4 Z" />
          <path d="M12 18.4 C14.6 15.8 18.4 15.2 21.4 16.4 C18.8 19 15.1 19.8 12 18.4 Z" />
        </>
      )}
      {name === 'yoga' && (
        <>
          <circle cx="12" cy="4.8" r="2.2" />
          <path d="M12 7.4 L12 12.2" />
          <path d="M5.6 12.2 C8.2 14 9.8 14.6 12 14.6 C14.2 14.6 15.8 14 18.4 12.2" />
          <path d="M12 12.2 L7.6 18.8 L16.4 18.8 Z" />
        </>
      )}

      {name === 'live' && (
        <>
          <circle cx="12" cy="12" r="8.8" />
          <path d="M10.2 8.4 L16 12 L10.2 15.6 Z" />
        </>
      )}

      {name === 'ritual' && (
        <>
          <path d="M4.6 19.4 C3.4 12.6 8.4 4.6 20 4.6 C20 14.2 13.8 19 4.6 19.4 Z" />
          <path d="M4.6 19.4 C8 15.4 12.4 12.4 17.4 11" />
        </>
      )}
    </svg>
  )
}
