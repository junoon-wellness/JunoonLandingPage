/**
 * App-wide rule: no em dashes (—) or en dashes (–) in rendered text — use " - ".
 * Run all copy from content.ts through this before rendering.
 */
export function clean(text: string): string {
  return text.replace(/\s*[—–]\s*/g, " - ");
}

/** Split a copy string on newlines into trimmed, cleaned lines. */
export function lines(text: string): string[] {
  return text.split("\n").map((l) => clean(l));
}
