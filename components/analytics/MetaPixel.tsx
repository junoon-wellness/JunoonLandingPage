import ConsentGate from "./ConsentGate";

/**
 * Meta (Facebook) Pixel — needed so the Meta Ads campaign can attribute
 * signups, retarget visitors who did not convert, and optimise delivery
 * toward people who actually sign up rather than people who merely click.
 *
 * 🔴 SHIPS INERT. With no NEXT_PUBLIC_META_PIXEL_ID set, this renders
 * nothing at all: no script, no cookie, no request to Meta, and no consent
 * card either. That is deliberate — the plumbing could go live before the id
 * existed, and before the privacy policy was updated, without either being a
 * problem.
 *
 * 🟢 /privacy NOW DISCLOSES THE TRACKING (JV3-271, 2026-09-10). This comment
 * previously carried a "BEFORE SETTING THE ENV VAR, UPDATE /privacy" warning
 * because the policy said nothing about cookies, analytics or third-party
 * sharing. Section 3.4 now describes this pixel, exactly what it sends, and
 * what a visitor can do about it. That blocker is cleared.
 *
 * 🔴 CONSENT IS NOW GATED, AND THIS FILE NO LONGER LOADS THE SCRIPT ITSELF.
 * The script, and the decision about whether it may run, both live in
 * ConsentGate — a client component, because the answer depends on the
 * visitor. EU/UK visitors are asked first; everyone else is unaffected. This
 * file stays a server component so the env var is still read at module scope
 * and inlined at build time, which is the one thing that has to happen here.
 *
 * ⚠️ THE <noscript> BEACON WAS REMOVED, and it was a real trade rather than
 * a tidy-up. Meta's own install snippet ships a 1x1 <img> beacon so that a
 * visitor with JavaScript disabled still registers as a visit. But with
 * JavaScript disabled we cannot ask anyone anything — the beacon would fire
 * for an EU visitor with no possible way to seek consent first, which is the
 * exact thing this gate exists to prevent. The cost is losing visit data for
 * JS-disabled visitors, which is a negligible slice of traffic; the
 * alternative was an ungated request to Meta on every such visit.
 *
 * The var must be NEXT_PUBLIC_ to reach the browser, and must be read at
 * module scope so Next can inline it at build time. A pixel id is not a
 * secret — it is visible in the page source of every site that uses one.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  if (!PIXEL_ID) return null;

  return <ConsentGate pixelId={PIXEL_ID} />;
}
