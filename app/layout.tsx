import type { Metadata } from "next";
import localFont from "next/font/local";
import { meta } from "@/lib/meta";
import { clean } from "@/lib/text";
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

// NOTE: og:image is intentionally omitted - no real OG asset exists yet.
// Do not invent a URL (see handoff placeholder policy).
export const metadata: Metadata = {
  title: clean(meta.title),
  description: clean(meta.description),
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
