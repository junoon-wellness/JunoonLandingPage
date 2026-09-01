import type { Metadata } from "next";
import localFont from "next/font/local";
import { meta } from "@/lib/meta";
import { clean } from "@/lib/text";
import JaaliGround from "@/components/brand/JaaliGround";
import MetaPixel from "@/components/analytics/MetaPixel";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/*
 * Fonts are WOFF2, subset to Latin (2026-09-01).
 *
 * They used to be raw .ttf carrying every alphabet the typefaces support —
 * Cyrillic, Greek, Vietnamese — on an entirely Latin site, and all five are
 * <link rel="preload">'d on every page, so they land on the critical path
 * before first paint. Measured on production: 638 KB per page load, with
 * compression already negotiated. The optimised hero screenshot is 29 KB.
 *
 * Subsetting + WOFF2 takes that to ~339 KB with no visual change. Coverage
 * was VERIFIED, not assumed: every character rendered across all seven live
 * pages was checked against each subset. (DM Mono is missing "→" both before
 * and after — the original never had it, so that arrow has always fallen
 * back to DM Sans. Not a regression.)
 *
 * ⚠️ The .ttf originals are gone from the repo. To re-cut a subset — say a
 * future page needs Devanagari — pull the originals from Google Fonts and
 * re-run with wider ranges; the ranges used are recorded in the commit that
 * introduced this. The subsets deliberately keep the full weight AXIS and
 * all OpenType features (kerning, ligatures), so nothing about how the type
 * renders has changed.
 */
const cormorant = localFont({
  src: [
    { path: "../public/fonts/CormorantGaramond[wght].woff2", style: "normal" },
    { path: "../public/fonts/CormorantGaramond-Italic[wght].woff2", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = localFont({
  src: [{ path: "../public/fonts/DMSans[opsz,wght].woff2" }],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = localFont({
  src: [
    { path: "../public/fonts/DMMono-Regular.woff2", weight: "400" },
    { path: "../public/fonts/DMMono-Medium.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

// OG / link-preview image (Kush, 2026-08-23): without one, iMessage/WhatsApp
// picked the first large photo on the page (Arjav's). public/og-image.png is
// a 1200x630 logo card generated from logo-clay-text.png on --jn-bg; regenerate
// with the PIL snippet recorded on the board (LV5-029). openGraph carries ONLY
// images/siteName/type here so each page's own title/description still flow
// into og:title / og:description - setting openGraph.title in the layout
// would override every page with the Home title.
export const metadata: Metadata = {
  metadataBase: new URL("https://junoonwellness.com"),
  title: clean(meta.title),
  description: clean(meta.description),
  openGraph: {
    type: "website",
    siteName: "Junoon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Junoon - Ancient Traditions, Modern Solutions.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      {/*
        bg/text colours deliberately live in globals.css rather than as Tailwind
        utilities here - utility classes would out-specify the `body` rule and
        keep the page cream.
      */}
      <body className="font-sans antialiased relative">
        {/* LV5-024: position:relative — THE PAGE WRAPPER. Every Jaali
            instance (this ground layer, and every per-page panel) is
            `position:absolute; inset:0` against this box, so they all share
            one containing block and one tile origin. See the "ONE GEOMETRY"
            note atop components/brand/Jaali.tsx. */}
        {/* LV5-022 SC5: the site-wide jaali ground. One mount, every route.
            Absolute and at z-index -1, so it sits under all page content and
            over the canvas background, and scrolls with the page like every
            panel. See components/brand/JaaliGround.tsx. */}
        <JaaliGround />
        {children}
        {/*
          Added 2026-09-01 — the site had NO analytics at all while a Meta
          Ads campaign was starting, so ad spend could not be attributed.
          Vercel's is cookieless and collects no personal data, so it needs
          no consent banner. MetaPixel renders NOTHING until
          NEXT_PUBLIC_META_PIXEL_ID is set — and /privacy must disclose the
          tracking before that happens. See components/analytics/MetaPixel.tsx.
        */}
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
