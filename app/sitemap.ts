import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/library'

/**
 * LV5-047 — matches metadataBase in app/layout.tsx.
 */
const BASE_URL = 'https://junoonwellness.com'

const STATIC_PATHS = ['/', '/pricing', '/library', '/about', '/privacy', '/terms']

/**
 * Article slugs come from the exact same source
 * app/library/[slug]/page.tsx's generateStaticParams reads
 * (getAllArticles() in @/lib/library) — never hand-typed, so this list can
 * never drift from the real article set.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(path => ({
    url: `${BASE_URL}${path}`,
  }))

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map(article => ({
    url: `${BASE_URL}/library/${article.slug}`,
    lastModified: new Date(article.created_at),
  }))

  return [...staticEntries, ...articleEntries]
}
