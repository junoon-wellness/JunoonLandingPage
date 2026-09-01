// Waitlist signups go to beehiiv (same platform as the newsletter).
// Requires BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID env vars — see .env.example.
// API reference: https://developers.beehiiv.com/api-reference/subscriptions/create
//
// ⚠️ The custom fields below ("First Name", "Phone") must already exist in
// beehiiv (Audience → Custom Fields). If they don't, beehiiv accepts the
// subscription and silently discards those values — no error is returned.

import { isValidEmail, isValidOptionalPhone, normaliseSource } from "@/lib/constants";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
// beehiiv's API needs the "pub_" prefix; tolerate a raw UUID in the env var.
const rawPubId = process.env.BEEHIIV_PUBLICATION_ID;
const BEEHIIV_PUBLICATION_ID = rawPubId
  ? rawPubId.startsWith("pub_")
    ? rawPubId
    : `pub_${rawPubId}`
  : undefined;

// Best-effort per-IP rate limit: in-memory, so it resets on cold start and
// isn't shared across instances/regions. That's enough to blunt casual
// scripted abuse (spam signups, or probing which emails are already
// subscribed via the alreadySubscribed response) without provisioning a
// shared store. If this ever needs to hold under real distributed abuse,
// swap the Map below for a durable limiter (e.g. Upstash via Vercel
// Marketplace) — same call sites, just a different `isRateLimited`.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();
let rateLimitSweepCounter = 0;

function isRateLimited(ip: string): boolean {
  // Sweep expired entries periodically so a long-lived warm instance doesn't
  // accumulate one entry per unique IP forever.
  rateLimitSweepCounter += 1;
  if (rateLimitSweepCounter % 500 === 0) {
    const now = Date.now();
    for (const [key, entry] of rateLimitHits) {
      if (now > entry.resetAt) rateLimitHits.delete(key);
    }
  }

  const now = Date.now();
  const entry = rateLimitHits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(req: Request): string {
  // Vercel (and most proxies) set x-forwarded-for as "client, proxy1, proxy2".
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  if (isRateLimited(getClientIp(req))) {
    return Response.json(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: { email?: unknown; firstName?: unknown; phone?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email;

  // RFC 5321's practical max. firstName/phone are bounded below via .slice();
  // email can't be silently truncated without changing what address is
  // subscribed, so an over-length value is rejected outright instead.
  if (typeof email !== "string" || email.length > 254 || !isValidEmail(email)) {
    return Response.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  // firstName and phone are optional additions — a body with only `email`
  // (the original contract) still works unchanged.
  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 32) : "";

  if (!isValidOptionalPhone(phone)) {
    return Response.json(
      { ok: false, error: "Please include your country code, e.g. +1 555 123 4567." },
      { status: 400 }
    );
  }

  // ?ref= channel, used for utm_medium below. utm_source is deliberately left
  // alone — the beehiiv welcome Automation filters on it.
  const source = normaliseSource(typeof body.source === "string" ? body.source : undefined);

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    // Fail loudly in the server logs, but don't expose config gaps to the client.
    console.error("Waitlist: missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID env vars");
    return Response.json(
      { ok: false, error: "Signup is temporarily unavailable. Please try again later." },
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
      // LV5-032 (2026-08-23, Kush: "beehiiv isn't working, it didn't land"):
      // an address that EXISTS but is not active (unsubscribed / inactive /
      // invalid) used to stop here as "already on the list", so it could never
      // re-join and nothing new ever reached Beehiiv. Only an ACTIVE subscriber
      // short-circuits now; anything else falls through to the create call,
      // which already sends reactivate_existing: true.
      let existingStatus: string | undefined;
      try {
        const json = (await lookup.json()) as { data?: { status?: string } };
        existingStatus = json?.data?.status;
      } catch {
        existingStatus = undefined;
      }
      if (existingStatus === "active") {
        return Response.json({ ok: true, alreadySubscribed: true });
      }
      console.warn("beehiiv: existing subscriber not active, reactivating:", existingStatus);
    } else if (lookup.status !== 404) {
      // 404 = not on the list yet, the normal path for a new signup.
      // Anything else that is ALSO not ok is a real beehiiv failure.
      //
      // JV3-220 (2026-09-01): this used to be a second, independent `if`,
      // so a 200 lookup fell straight into it and returned 502 — undoing
      // the reactivation the branch above had just decided to do. Every
      // brand-new subscriber sits at status "validating" for a short window
      // (VERIFIED on production: a first signup returns
      // {ok:true,status:"validating"}), so a double-tap or a retry hit this
      // and showed "Something went wrong" on a signup that had in fact
      // worked. Unsubscribed addresses could never re-join at all.
      //
      // It also called `lookup.text()` after the branch above had already
      // called `lookup.json()`. The body can only be read once, so that
      // threw "Body is unusable" into the outer catch — which is why the
      // runtime logs recorded a TypeError instead of beehiiv's response,
      // and why two attempts to diagnose this from logs found nothing.
      const detail = await lookup.text();
      console.error("beehiiv lookup failed:", lookup.status, detail);
      return Response.json(
        { ok: false, error: "Something went wrong. Please try again.", code: "lookup" },
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
        // DO NOT change utm_source: the welcome Automation filters on it.
        utm_source: "Waitlist",
        // Channel attribution from ?ref=. Falls back to the original value.
        utm_medium: source === "direct" ? "landing-page" : source,
        utm_campaign: "junoon-waitlist",
        // Only sent when the user actually supplied them.
        ...(firstName || phone
          ? {
              custom_fields: [
                ...(firstName ? [{ name: "First Name", value: firstName }] : []),
                ...(phone ? [{ name: "Phone", value: phone }] : []),
              ],
            }
          : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("beehiiv subscription failed:", res.status, detail);
      return Response.json(
        { ok: false, error: "Something went wrong. Please try again.", code: "create" },
        { status: 502 }
      );
    }

    // LV5-028 (2026-08-23): surface Beehiiv's own subscriber status so a
    // "created but not visible in the Subscribers list" case can be diagnosed
    // from the response (pending = double opt-in waiting on the confirmation
    // email; invalid = Beehiiv rejected the address). Nothing sensitive.
    let status: string | undefined;
    try {
      const json = (await res.json()) as { data?: { status?: string } };
      status = json?.data?.status;
    } catch {
      status = undefined;
    }
    if (status && status !== "active") console.warn("beehiiv: subscriber created with status", status);
    return Response.json({ ok: true, status });
  } catch (err) {
    console.error("beehiiv request error:", err);
    // JV3-220: the three 502s used to be indistinguishable from the client,
    // which is what forced a hunt through runtime logs. `code` names the
    // branch and carries nothing sensitive — the form only ever renders
    // `error`, so this is invisible to members.
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again.", code: "network" },
      { status: 502 }
    );
  }
}
