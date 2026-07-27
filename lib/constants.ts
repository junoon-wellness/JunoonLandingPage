/**
 * Single source of truth for the founding-member offer — the "500" in
 * "First 500 members. Permanent pricing." and the denominator of the progress
 * bar. Change it here and it updates everywhere.
 */
export const TOTAL_SPOTS = 500

/**
 * Shown only when beehiiv can't be reached (`getActiveSubscriberCount()`
 * returns null on a missing API key or a failed request). The real number is
 * the live active-subscriber count — this exists purely so the counter never
 * renders as "0 of 500 claimed" during an outage.
 */
export const SPOTS_CLAIMED_FALLBACK = 61

/** Traffic sources we accept from the `?ref=` query param. Anything else → 'direct'. */
export const VALID_SOURCES = ['instagram', 'tiktok', 'linkedin', 'direct'] as const

export type Source = (typeof VALID_SOURCES)[number]

export function normaliseSource(ref: string | undefined): Source {
  return VALID_SOURCES.includes(ref as Source) ? (ref as Source) : 'direct'
}

/** Shared by client and server so the two can never disagree. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Phone is optional everywhere. Empty passes; anything present must carry
 * enough digits to be a real number. Same rule as junoon-yoga-presignup so
 * the two forms behave identically.
 */
export function isValidOptionalPhone(phone: string): boolean {
  const trimmed = phone.trim()
  if (!trimmed) return true
  return trimmed.replace(/\D/g, '').length >= 8
}
