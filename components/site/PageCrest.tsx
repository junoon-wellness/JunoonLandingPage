/**
 * The one motif on the pages after the home page (Kush, Mon 9 Nov 10:24 PM:
 * "not look bland ... the old one we had was definitely too too much going
 * on ... add some flare ... keep it on brand").
 *
 * One quiet layer behind the top of the page, in the Design System's own
 * terms (DesignKit DESIGN-GUIDE, "Surface hierarchy": the Deep surface is the
 * bark to soil gradient, for "hero moments"; "Turmeric glows, it never
 * speaks"): a bark to soil band that fades into the page, a soft turmeric
 * halo, and the white banyan from the logo, large and faint, at the right.
 * Nothing else: no jaali, no grain, no garland. Styles: `.pc-*` in
 * app/globals.css.
 *
 * Purely decorative: aria-hidden, no pointer events, z-index -1 against the
 * body (the same containing block the jaali panels used).
 */
export default function PageCrest() {
  return (
    <div className="pc" aria-hidden="true">
      <div className="pc-band" />
      <div className="pc-halo" />
      {/* eslint-disable-next-line @next/next/no-img-element -- a decorative CSS-sized layer; next/image adds nothing here */}
      <img className="pc-tree" src="/brand/junoon-tree-white-560.webp" alt="" width={560} height={560} />
    </div>
  )
}
