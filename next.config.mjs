import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * Content Security Policy — ENFORCING.
 *
 * Shipped report-only first, deliberately: a wrong CSP does not degrade a
 * page, it breaks it — blocked scripts, unstyled layout, dead forms — and
 * that is not a thing to discover on the day promotion starts.
 *
 * FLIPPED TO ENFORCING after measuring ZERO violations on production across
 * every page shape the site has: the home page (framer-motion, the hero
 * carousel, lazy images), /about (the self-hosted founder video reached
 * readyState 4 with no error), /pricing (scroll-linked animation), a
 * /library/[slug] article (the one place dangerouslySetInnerHTML is used),
 * /contact and /terms. Fonts reported `loaded` on each.
 *
 * ⚠️ `'unsafe-inline'` in script-src is NOT an oversight. Next.js injects
 * inline bootstrap scripts on every page, and the alternative (per-request
 * nonces) forces every page to render dynamically, which would throw away the
 * static prerendering this site is built on — a real speed cost for a site
 * with no login and no user data to protect. What the policy still buys with
 * it in place is host restriction: script, frame and connect targets are
 * pinned, so an injected `<script src="evil.com">` is blocked even though an
 * inline one would not be.
 *
 * facebook.net / facebook.com are listed ahead of the Meta Pixel (JV3-270).
 * They do nothing until NEXT_PUBLIC_META_PIXEL_ID is set, and listing them now
 * means the pixel cannot be broken by a policy nobody remembered to update.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  // 'self' also covers Vercel Web Analytics — it is served from
  // /_vercel/insights/script.js on this origin, not a third-party host.
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net",
  // Next injects a <style> block per page; framer-motion writes inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com",
  // Fonts are self-hosted (subset WOFF2), so no external font host is needed.
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://www.facebook.com",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Everything below is enforcing from the start. Unlike the CSP, none of these
 * can break a page that was already working — they restrict capabilities the
 * site does not use.
 */
const SECURITY_HEADERS = [
  // Stops a browser guessing a file is HTML when we said it was not, which is
  // the mechanism behind "upload a .jpg, get it executed as a page".
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking: nobody may put junoonwellness.com in a frame. X-Frame-Options
  // is the legacy twin of frame-ancestors above — kept for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  // Send the full URL to ourselves, only the origin to anyone else, and
  // nothing at all when leaving HTTPS. Stops paths leaking into third-party
  // referrer logs.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site asks for none of these, so no script on it can either.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  /**
   * HSTS. `includeSubDomains` added 2026-09-01 after VERIFYING both live
   * subdomains already force HTTPS themselves (app.junoonwellness.com and
   * admin.junoonwellness.com each answer HTTP with a 308 to HTTPS), so this
   * changes nothing for them — it only closes the first-visit window.
   *
   * ⚠️ `preload` is deliberately NOT set. It is the one directive here that is
   * genuinely hard to undo: it means submitting the domain to a list baked into
   * browser binaries, and removal takes months to reach users. That is Kush's
   * call to make, not a default to inherit. It also binds EVERY future
   * subdomain to HTTPS forever, including ones nobody has created yet.
   */
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Content-Security-Policy", value: CSP },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Vercel already omits this, but the setting makes it explicit and survives
  // a move to any other host.
  poweredByHeader: false,

  turbopack: {
    /**
     * Pin the workspace root to THIS directory.
     *
     * There is an unrelated 87-byte package-lock.json sitting in ~, so Next
     * walked up, found two lockfiles, and inferred /Users/kushjain as the
     * workspace root. That put Turbopack's persistence directory outside the
     * project, where a `next build` cache and a `next dev` cache end up
     * fighting over the same files. The symptom is a dev server that reports
     * "Ready" and then dies with:
     *
     *   Failed to open database
     *     0: Loading persistence directory failed
     *     1: invalid digit found in string
     *
     * Pinning the root keeps the cache in ./.next and silences the warning.
     */
    root: dirname(fileURLToPath(import.meta.url)),
  },

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },

  /**
   * www.junoonwellness.com served the whole site at 200 with no redirect and
   * no canonical link (VERIFIED 2026-09-01), so search engines saw two
   * complete copies of every page and split the ranking signals between them.
   * Right before a promotion push is the worst time to be competing with
   * yourself. 308 keeps the method and is cached, unlike a 302.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.junoonwellness.com" }],
        destination: "https://junoonwellness.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
