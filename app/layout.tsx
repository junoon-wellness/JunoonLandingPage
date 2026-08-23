import type { Metadata } from "next";
import localFont from "next/font/local";
import { meta } from "@/lib/meta";
import { clean } from "@/lib/text";
import JaaliGround from "@/components/brand/JaaliGround";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "../public/fonts/CormorantGaramond[wght].ttf", style: "normal" },
    { path: "../public/fonts/CormorantGaramond-Italic[wght].ttf", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = localFont({
  src: [{ path: "../public/fonts/DMSans[opsz,wght].ttf" }],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = localFont({
  src: [
    { path: "../public/fonts/DMMono-Regular.ttf", weight: "400" },
    { path: "../public/fonts/DMMono-Medium.ttf", weight: "500" },
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
      </body>
    </html>
  );
}
