import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import { getAllArticles, getArticleBySlug } from '@/lib/library'
import { markdownToHtml } from '@/lib/markdown'
import { clean } from '@/lib/text'

/**
 * LV5-017 — /library/[slug], the article reader. Statically generated for
 * every article pulled into content/library/ (see generateStaticParams
 * below) — no dynamic fetch at request time.
 */
export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: clean('Library - Junoon') }
  return {
    title: clean(`${article.title} - Junoon Library`),
    description: clean(article.description),
  }
}

export default async function LibraryArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const bodyHtml = markdownToHtml(article.content)

  return (
    <div id="top">
      <NavV2 />

      <header className="lb-reader-hero">
        <Link href="/library" className="v2-link lb-reader-back">
          ← Library
        </Link>
        <div className="eyebrow lb-reader-eyebrow">{article.type}</div>
        <h1 className="lb-reader-title">{article.title}</h1>
        <div className="lb-reader-meta jn-mono">{article.minutes} min read</div>
        <p className="lb-reader-desc">{article.description}</p>
      </header>

      <article
        className="lb-reader-body"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <div className="lb-reader-body" style={{ paddingTop: 0 }}>
        <div className="lb-reader-cta">
          <a
            href="https://app.junoonwellness.com/education"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-link lb-app-link"
          >
            Read more on the app →
          </a>
        </div>
      </div>

      <FooterV2 />
    </div>
  )
}
