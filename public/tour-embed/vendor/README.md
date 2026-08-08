# /tour vendored dependencies

Self-hosting for the walkthrough iframe (v4 spec §E, ticket LV4-009). Before
this, `/tour` reached out to `unpkg.com` and `fonts.googleapis.com` on every
visit, so the page only worked as well as those two hosts did.

## What is here, and where it came from

| File | Source | Notes |
|---|---|---|
| `react.production.min.js` | `https://unpkg.com/react@18.3.1/umd/react.production.min.js` | byte-identical to the CDN copy |
| `react-dom.production.min.js` | `https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js` | byte-identical to the CDN copy |
| `fonts.css` | hand-written | `@font-face` rules pointing at `/fonts/*`, which this site already ships |

## ⚠️ The React files are pinned by SRI. Do not re-minify or reformat them.

`support.js` loads them with an `integrity="sha384-…"` attribute. That check
applies to same-origin scripts too, so **a single changed byte makes the
browser refuse the file and the tour renders nothing.** Both copies were
verified against the hashes in `support.js` when vendored:

    react      sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z
    react-dom  sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1

To re-vendor, download from the same URL and re-check with:

```bash
openssl dgst -sha384 -binary react.production.min.js | openssl base64 -A
```

## Fonts

The tour originally linked a Google Fonts stylesheet for Cormorant Garamond,
DM Sans and DM Mono. All three already live in `public/fonts` for next/font,
and the iframe is same-origin, so `fonts.css` declares them locally instead.
next/font's own `@font-face` rules could not be reused: they are scoped to the
parent document and fingerprinted per build.

## What is deliberately NOT vendored: Babel

`support.js` also references `@babel/standalone` (3.1 MB). It is **not**
vendored, on purpose:

- it loads lazily, only from `x-import` when a module is declared `kind: "jsx"`,
- this artifact contains no JSX and no `type="text/babel"`, so that path is
  never taken.

Vendoring 3.1 MB for a branch this tour cannot reach is a worse trade than
leaving the reference in place. If a future walkthrough export does use runtime
JSX, this decision has to be revisited: the symptom would be `/tour` working
online and failing with unpkg blocked.

## Re-copying the artifact from V06

`index.html` and `support.js` here are OUR copy and have been edited (the CDN
URLs and the font link were rewritten). The V06 source folder is untouched and
still points at the CDNs. Re-copying from V06 therefore **reverts this
hardening** and the rewrite has to be redone.
