import fs from 'node:fs'
import path from 'node:path'

/**
 * LV5-017 — reads the articles pulled by scripts/pull-library.mjs out of
 * `content/library/*.json` at build time. No client fetch, no runtime
 * Supabase dependency — these files ARE the data (see that script's header
 * comment for the refresh workflow).
 */
export interface LibraryArticle {
  slug: string
  title: string
  description: string
  minutes: number
  type: string
  content: string
  tags: string[]
  created_at: string
  source_id: string
}

const LIBRARY_DIR = path.join(process.cwd(), 'content', 'library')

let cache: LibraryArticle[] | null = null

export function getAllArticles(): LibraryArticle[] {
  if (cache) return cache
  const files = fs.readdirSync(LIBRARY_DIR).filter(f => f.endsWith('.json'))
  const articles = files.map(
    f => JSON.parse(fs.readFileSync(path.join(LIBRARY_DIR, f), 'utf8')) as LibraryArticle
  )
  // Newest first, matching a normal blog/library index.
  articles.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
  cache = articles
  return articles
}

export function getArticleBySlug(slug: string): LibraryArticle | undefined {
  return getAllArticles().find(a => a.slug === slug)
}

/**
 * The Articles tab's filter groups, from each article's existing tags.
 * Arnav, Sat 21 Nov 2026: "make the articles a little more organized too by
 * having a filter to organize the articles by".
 * An article whose tags fit no group still shows under All.
 */
export type ArticleGroup = 'ayurveda' | 'yoga' | 'junoon'

export const ARTICLE_GROUPS: { id: ArticleGroup; label: string; tags: string[] }[] = [
  { id: 'ayurveda', label: 'Ayurveda', tags: ['charaka', 'ayurveda'] },
  { id: 'yoga', label: 'Yoga', tags: ['patanjali', 'krishnamacharya', 'hatha yoga pradipika'] },
  { id: 'junoon', label: 'From Junoon', tags: ['junoon'] },
]

export function articleGroup(a: LibraryArticle): ArticleGroup | null {
  const tags = a.tags.map(t => t.toLowerCase())
  return ARTICLE_GROUPS.find(g => g.tags.some(t => tags.includes(t)))?.id ?? null
}
