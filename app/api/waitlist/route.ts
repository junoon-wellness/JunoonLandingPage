// Waitlist signups go to beehiiv (same platform as the newsletter).
// Requires BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID env vars — see .env.example.
// API reference: https://developers.beehiiv.com/api-reference/subscriptions/create

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
// beehiiv's API needs the "pub_" prefix; tolerate a raw UUID in the env var.
const rawPubId = process.env.BEEHIIV_PUBLICATION_ID;
const BEEHIIV_PUBLICATION_ID = rawPubId
  ? rawPubId.startsWith("pub_")
    ? rawPubId
    : `pub_${rawPubId}`
  : undefined;

export async function POST(req: Request) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    // Fail loudly in the server logs, but don't expose config gaps to the client.
    console.error("Waitlist: missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID env vars");
    return Response.json(
      { ok: false, error: "Waitlist is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const base = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;
  const authHeaders = { Authorization: `Bearer ${BEEHIIV_API_KEY}` };

  try {
    // Check if they're already on the list so we can give tailored feedback.
    const lookup = await fetch(`${base}/by_email/${encodeURIComponent(email)}`, {
      headers: authHeaders,
    });
    if (lookup.ok) {
      return Response.json({ ok: true, alreadySubscribed: true });
    }
    // 404 = not found (expected for new signups); anything else is unexpected.
    if (lookup.status !== 404) {
      const detail = await lookup.text();
      console.error("beehiiv lookup failed:", lookup.status, detail);
      return Response.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 502 }
      );
    }

    const res = await fetch(base, {
      method: "POST",
      headers: { ...authHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        // Welcome email is handled by a beehiiv Automation (filtered to the waitlist
        // acquisition source), so keep beehiiv's global welcome email off here.
        send_welcome_email: false,
        // beehiiv's built-in "Acquisition source" is populated from utm_source,
        // so waitlist signups show up as "Waitlist" — no custom field needed.
        utm_source: "Waitlist",
        utm_medium: "landing-page",
        utm_campaign: "junoon-waitlist",
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("beehiiv subscription failed:", res.status, detail);
      return Response.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("beehiiv request error:", err);
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }
}
