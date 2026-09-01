/**
 * Conversion tracking, kept deliberately thin.
 *
 * The site had NO analytics of any kind before 2026-09-01 — no page
 * analytics and no Meta Pixel — while a Meta Ads campaign was starting. That
 * means an ad spend nobody could attribute, no retargeting of people who
 * visited and did not sign up, and no signal for Meta's own optimisation to
 * learn from.
 *
 * Design rules here, all deliberate:
 * · NOTHING is imported from Meta. `fbq` is read off `window` if the pixel
 *   loaded, and every call is a no-op if it did not. No pixel id, no
 *   behaviour change, no console noise, no bundle cost.
 * · These helpers never throw. An analytics failure must not be able to take
 *   down a signup — the conversion event fires AFTER the subscription has
 *   already succeeded.
 * · No personal data is passed. Meta receives the fact that a signup
 *   happened, never the address that signed up.
 */

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** True only in a browser where the pixel script actually loaded. */
function pixel(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  return typeof window.fbq === "function" ? window.fbq : undefined;
}

/**
 * A newsletter or waitlist signup completed. Called from SignupForm on the
 * success path only — never for `alreadySubscribed`, which is not a new
 * conversion and would inflate the count.
 *
 * "Lead" is Meta's standard event name; using the standard one rather than a
 * custom event is what lets the campaign optimise for it.
 */
export function trackSignup(source: string): void {
  try {
    pixel()?.("track", "Lead", { content_category: source });
  } catch {
    // Analytics must never break a signup that already succeeded.
  }
}
