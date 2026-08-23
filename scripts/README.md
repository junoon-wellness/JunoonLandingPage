# scripts/

## pull-library.mjs

One-off / manually-rerun puller for the `/library` page's articles. Reads the
app's `public.resources` table (Article/Guide rows, published only) over
PostgREST and writes each one to `content/library/<slug>.json`. The site
never talks to Supabase at build or request time — these files are the data.

Re-run and commit the diff whenever Arjav adds or edits an article.

```sh
( set -a; source "../junoon-wellness-app/.env.local"; set +a; \
  node scripts/pull-library.mjs )
```

Never paste the anon key directly into a command or commit it — the command
above sources it from the app repo's own `.env.local` into the current
shell's environment only. See the comment at the top of the script for the
filter rule (excludes video-caption rows and anything that looks unfinished).
