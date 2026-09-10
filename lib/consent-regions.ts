/**
 * Which visitors have to be ASKED before a Meta Pixel cookie is set.
 *
 * Background, because the shape of this file is a legal decision and not a
 * technical one: EU/UK rules (the ePrivacy Directive Art. 5(3), and PECR as
 * the ICO enforces it) require clear opt-in consent BEFORE a non-essential
 * cookie is written, and continued browsing does not count as consent.
 * Vercel Web Analytics is exempt because it sets no cookie at all. The Meta
 * Pixel is squarely covered — it exists to set an advertising cookie.
 *
 * 🔒 KUSH RULED, 2026-09-10: ask EU/UK visitors, and nobody else. Everyone
 * outside this list sees no banner and the pixel behaves exactly as it did
 * before consent gating existed. That is deliberate: Junoon's audience is
 * mostly US and India, so gating only the regions that require it closes the
 * real exposure at close to zero cost to the conversion funnel.
 *
 * This module is deliberately DEPENDENCY-FREE so it can be unit-tested by
 * plain `node --experimental-strip-types` — this repo has no test runner.
 */

/**
 * The EU 27. ISO 3166-1 alpha-2, which is what Vercel's geo header speaks.
 */
const EU_27 = [
  "AT", // Austria
  "BE", // Belgium
  "BG", // Bulgaria
  "CY", // Cyprus
  "CZ", // Czechia
  "DE", // Germany
  "DK", // Denmark
  "EE", // Estonia
  "ES", // Spain
  "FI", // Finland
  "FR", // France
  "GR", // Greece
  "HR", // Croatia
  "HU", // Hungary
  "IE", // Ireland
  "IT", // Italy
  "LT", // Lithuania
  "LU", // Luxembourg
  "LV", // Latvia
  "MT", // Malta
  "NL", // Netherlands
  "PL", // Poland
  "PT", // Portugal
  "RO", // Romania
  "SE", // Sweden
  "SI", // Slovenia
  "SK", // Slovakia
] as const;

/** The rest of the EEA — ePrivacy applies here too, and these are not EU. */
const EEA_NON_EU = [
  "IS", // Iceland
  "LI", // Liechtenstein
  "NO", // Norway
] as const;

/**
 * The UK and the territories that kept a GDPR-equivalent regime of their own
 * after Brexit. Including the Crown Dependencies and Gibraltar costs nothing
 * and each genuinely has its own prior-consent rule.
 */
const UK_AND_DEPENDENCIES = [
  "GB", // United Kingdom
  "GG", // Guernsey
  "GI", // Gibraltar
  "IM", // Isle of Man
  "JE", // Jersey
] as const;

/**
 * ⚠️ SWITZERLAND (CH) IS DELIBERATELY ABSENT, and this is the one entry worth
 * a second opinion. The revised Swiss FADP requires transparency about
 * tracking but does not carry ePrivacy's prior-consent rule for cookies, so
 * a Swiss visitor is treated like any other non-EEA visitor. Lower confidence
 * than the rest of this file — if a lawyer ever reviews this list, that is
 * the line to ask about.
 */
export const CONSENT_REQUIRED_COUNTRIES: ReadonlySet<string> = new Set<string>([
  ...EU_27,
  ...EEA_NON_EU,
  ...UK_AND_DEPENDENCIES,
]);

/**
 * Values that mean "we could not work out where this request came from",
 * which is NOT the same as "somewhere outside the EEA" and must not be
 * treated as it. Vercel sends these rather than omitting the header: `XX`
 * when the IP cannot be resolved to a country, and `T1` for traffic arriving
 * over Tor. `ZZ` is the ISO-reserved code for exactly this meaning.
 *
 * Without this set, an unresolvable IP would fall through to the final
 * `has()` check, return false, and load the pixel — the silent fail-open the
 * comment below says we are avoiding. A header being PRESENT is not the same
 * as a header being INFORMATIVE, and that distinction is the whole reason
 * this exists.
 */
const UNKNOWN_PLACEHOLDERS: ReadonlySet<string> = new Set<string>(["XX", "ZZ", "T1"]);

/**
 * True when this visitor must be asked before the pixel loads.
 *
 * 🔴 AN UNKNOWN COUNTRY RETURNS TRUE — WE ASK. That is the deliberate
 * failure mode and it is worth stating plainly, because the alternative is
 * worse in a way nobody would notice. If the geo header is ever missing (a
 * host change, a proxy in front, a Vercel change), failing OPEN would set
 * advertising cookies on EU visitors silently and indefinitely. Failing to
 * ASK instead shows a banner to people who did not need one — visible within
 * minutes, costs a little conversion, and tracks nobody without permission.
 *
 * A caller that genuinely wants "not in the EEA/UK" rather than "must ask"
 * should test `CONSENT_REQUIRED_COUNTRIES.has()` directly.
 */
export function isConsentRequired(country: string | null | undefined): boolean {
  if (typeof country !== "string") return true;
  const code = country.trim().toUpperCase();
  if (code.length === 0) return true;
  if (UNKNOWN_PLACEHOLDERS.has(code)) return true;
  return CONSENT_REQUIRED_COUNTRIES.has(code);
}
