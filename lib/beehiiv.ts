// Server-side helpers for talking to beehiiv.

const API_KEY = process.env.BEEHIIV_API_KEY;
const rawPubId = process.env.BEEHIIV_PUBLICATION_ID;
const PUBLICATION_ID = rawPubId
  ? rawPubId.startsWith("pub_")
    ? rawPubId
    : `pub_${rawPubId}`
  : undefined;

/**
 * Total active subscribers on the publication, used for the "X on the waitlist"
 * social proof. Returns null if unconfigured or the request fails, so callers
 * can fall back to static copy. Cached for an hour (the number moves slowly).
 */
export async function getActiveSubscriberCount(): Promise<number | null> {
  if (!API_KEY || !PUBLICATION_ID) return null;

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}?expand[]=stats`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const count = json?.data?.stats?.active_subscriptions;
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}
