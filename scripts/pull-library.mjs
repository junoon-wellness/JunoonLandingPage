#!/usr/bin/env node
/**
 * LV5-017 — pulls the Library tab's real articles out of the app's
 * Supabase (`public.resources`) and writes them into `content/library/` as
 * committed JSON. This is a one-off / manually-rerun step, not a build-time
 * or runtime fetch: the marketing site carries zero live Supabase
 * dependency (per LV5-013's research recommendation), so the pulled files
 * ARE the data. Re-run this and commit the diff whenever Arjav adds or
 * edits an article.
 *
 * USAGE — never commit or print the anon key. Source it from the APP
 * repo's own .env.local (not this repo's — this repo's copy is an empty
 * placeholder) into your shell, then run this script:
 *
 *   ( set -a; source "../junoon-wellness-app/.env.local"; set +a; \
 *     node scripts/pull-library.mjs )
 *
 * or point at a different checkout with APP_ENV_FILE=/path/to/.env.local.
 *
 * FILTER, per LV5-013's research report: `resources.type` is one of
 * Video / Article / Guide. The 40 `Video` rows are short companion
 * captions for member video content, not standalone articles — excluded.
 * Only `Article` and `Guide` rows, and only `is_published = true`, become
 * library entries. As of 2026-08-22 that's 18 Article + 2 Guide = 20 rows.
 *
 * Anything that looks unfinished (very short body, or an obvious
 * placeholder marker) is EXCLUDED and listed on stdout rather than
 * written — never edit article text, per the ticket's ruling that Arjav
 * owns article content.
 */

import { writeFile, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'content', 'library')

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (or the SUPABASE_URL /\n' +
      'SUPABASE_ANON_KEY fallbacks) in the environment. Source them from the APP repo\'s\n' +
      '.env.local first — see the usage comment at the top of this file. Never paste the\n' +
      'key directly into a command line (it can end up in shell history).'
  )
  process.exit(1)
}

// Minimum body length (characters) before a row is treated as unfinished.
// All 20 real rows measured 1000-3800 chars on 2026-08-22; anything under
// this is far more likely to be a stub than a genuinely short article.
const MIN_CONTENT_LENGTH = 200

const PLACEHOLDER_MARKERS = [
  'lorem ipsum',
  'will be added soon',
  'coming soon',
  'tbd',
  'todo',
  'placeholder',
  'xxx',
]

function slugify(title) {
  return title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics (Svātmārāma -> Svatmarama)
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeMarkdown(raw) {
  // The DB stores CRLF line endings; normalize to LF like the app's own
  // renderer does (components/resources/resource-detail.tsx) before this
  // ever reaches the reader page's markdown parser.
  return raw.replace(/\r\n?/g, '\n').trim()
}

async function main() {
  const params = new URLSearchParams({
    select: 'id,type,title,minutes,description,content,image_url,tags,created_at',
    type: 'in.(Article,Guide)',
    is_published: 'eq.true',
    order: 'created_at.asc',
  })

  const res = await fetch(`${SUPABASE_URL}/rest/v1/resources?${params}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })

  if (!res.ok) {
    console.error(`Supabase REST request failed: HTTP ${res.status}`)
    console.error(await res.text())
    process.exit(1)
  }

  const rows = await res.json()

  const included = []
  const excluded = []
  const slugCounts = new Map()

  for (const row of rows) {
    const content = normalizeMarkdown(row.content || '')
    const description = (row.description || '').trim()
    const haystack = `${content} ${description}`.toLowerCase()

    const tooShort = content.length < MIN_CONTENT_LENGTH
    const marker = PLACEHOLDER_MARKERS.find(m => haystack.includes(m))

    if (tooShort || marker) {
      excluded.push({ title: row.title, id: row.id, reason: tooShort ? 'too short' : `marker: "${marker}"` })
      continue
    }

    let slug = slugify(row.title)
    const seen = slugCounts.get(slug) || 0
    slugCounts.set(slug, seen + 1)
    if (seen > 0) slug = `${slug}-${seen + 1}` // de-dupe on the rare title clash

    included.push({
      slug,
      title: row.title,
      description,
      minutes: row.minutes,
      type: row.type,
      content,
      tags: row.tags || [],
      created_at: row.created_at,
      source_id: row.id,
    })
  }

  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  for (const entry of included) {
    await writeFile(
      path.join(OUT_DIR, `${entry.slug}.json`),
      JSON.stringify(entry, null, 2) + '\n',
      'utf8'
    )
  }

  const written = (await readdir(OUT_DIR)).filter(f => f.endsWith('.json'))

  console.log(`Pulled ${rows.length} resources (Article/Guide, published) from ${SUPABASE_URL}`)
  console.log(`Wrote ${written.length} articles to ${path.relative(process.cwd(), OUT_DIR)}/`)
  if (excluded.length > 0) {
    console.log(`\nExcluded ${excluded.length} (unfinished / placeholder):`)
    for (const e of excluded) console.log(`  - ${e.title} (${e.id}) — ${e.reason}`)
  } else {
    console.log('\nNo rows excluded as unfinished.')
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
