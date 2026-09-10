// Does THIS visitor have to be asked before the Meta Pixel loads?
//
// The client cannot answer this itself — it needs the visitor's country, and
// the only trustworthy source is the edge. Vercel puts it on every request as
// `x-vercel-ip-country`.
//
// 🔴 WHY THIS IS A ROUTE AND NOT A `headers()` CALL IN THE LAYOUT. Reading
// headers in the root layout would opt EVERY page on the site into dynamic
// rendering, because the root layout wraps all of them. This is a marketing
// site whose speed is the point, so the whole thing staying statically
// rendered is worth one tiny request from the pixel component instead.
//
// 🔴 WHAT THIS DELIBERATELY DOES NOT DO:
// · It never returns the country, only a boolean. A location is personal
//   information; a yes/no about which banner to draw is not. Nothing here
//   reaches a log, a cookie, or the client beyond that one bit.
// · It sets no cookie. A consent gate that writes a cookie in order to decide
//   whether it may write a cookie is the joke that writes itself.

import { isConsentRequired } from "@/lib/consent-regions";

// 🔴 MUST NOT BE CACHED, AND THIS IS THE ONE LINE THAT COULD MAKE THIS ROUTE
// ACTIVELY HARMFUL IF IT WERE WRONG. The answer is per-visitor. A cached
// response would serve one country's verdict to everyone who followed — so a
// single German visit could suppress the pixel worldwide, or a single US
// visit could set cookies across the EEA without asking.
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  const country = request.headers.get("x-vercel-ip-country");

  return Response.json(
    { consentRequired: isConsentRequired(country) },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    },
  );
}
