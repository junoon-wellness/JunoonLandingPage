/**
 * The one motif on the pages after the home page (Kush, Mon 9 Nov 10:24 PM:
 * "not look bland ... the old one we had was definitely too too much going
 * on ... add some flare ... keep it on brand").
 *
 * One quiet layer behind the top of the page, in the Design System's own
 * terms (DesignKit DESIGN-GUIDE, "Surface hierarchy": the Deep surface is the
 * bark to soil gradient, for "hero moments"): a bark to soil band that fades
 * into the page. The white banyan that sat large and faint at the right was
 * removed (Arnav, Sat 21 Nov 7:19 PM: "remove the banyan tree from the price,
 * about, library page in the background"). Round 2 (Kush, 9:30 call Tue 10 Nov, "don't like the glow") took out
 * the turmeric halo that sat behind the top.
 * Nothing else: no jaali, no grain, no garland. Styles: `.pc-*` in
 * app/globals.css.
 *
 * Purely decorative: aria-hidden, no pointer events, z-index -1 against the
 * body (the same containing block the jaali panels used).
 */
export default function PageCrest() {
  // The bark to soil band is gone too: every page sits on the home page's black
  // (Arnav, Sun 22 Nov 2026: "The backgrounds on the other tabs are completely
  // dark/black like Home screen?"). Nothing is drawn now; the `.pc-*` styles stay
  // unused so the band can come back by restoring this one line.
  return null
}
