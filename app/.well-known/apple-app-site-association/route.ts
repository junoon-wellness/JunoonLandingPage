// JV4-585 — the file that lets the Junoon iPhone app save and fill its password.
//
// The app's entitlement says `webcredentials:junoonwellness.com`. When the app
// is installed, iOS fetches THIS file from https://junoonwellness.com and, if
// the app's id is listed under `webcredentials`, lets the app's sign-in and
// sign-up boxes save the password to the iPhone's Passwords and fill it back
// with Face ID.
//
// 🔴 APPLE'S RULES FOR THIS FILE, all of which this route meets:
// · Served at /.well-known/apple-app-site-association, no file extension.
// · Status 200 over HTTPS, with NO redirect. www.junoonwellness.com 308s to
//   the apex (next.config.mjs), which is why the entitlement names the apex.
// · Content-Type application/json.
//
// ⚠️ WHAT IS DELIBERATELY NOT HERE: `applinks` (opening share links in the app).
// That waits for Kush's call on the share-link domain (JV4-348). Adding it
// with no matching entitlement does nothing; adding it with the wrong paths
// sends links to an app that cannot open them.
//
// ⚠️ The app id is the Apple team id + the bundle id. If either changes, this
// one constant changes, and so must the app's entitlement domain if the site
// moves.

const APP_ID = "HS9D4DQ5N3.com.junoonwellness.ios";

// The same bytes for every visitor, so it is built once at deploy time.
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(JSON.stringify({ webcredentials: { apps: [APP_ID] } }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
