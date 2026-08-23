import type { Metadata } from 'next'
import Link from 'next/link'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import NewsletterJoin from '@/components/waitlist/NewsletterJoin'
import Jaali from '@/components/brand/Jaali'
import { getAllArticles } from '@/lib/library'
import { normaliseSource } from '@/lib/constants'
import { clean } from '@/lib/text'

/**
 * LV5-022 SC5 / LV5-024: the panel behind /library's header. Moved here from
 * inside NewsletterJoin.tsx — `.v2-section` is `position: relative`, which
 * scoped the old call to that local box instead of the page wrapper. See the
 * "ONE GEOMETRY" note atop components/brand/Jaali.tsx.
 */
const LIBRARY_JAALI = true

/**
 * LV5-017 — /library. Newsletter block at top, then the 20 real articles
 * pulled by scripts/pull-library.mjs, then a plain link out to the app's
 * own public /education route. No recipes section (not built, per the
 * ticket). Fully static — no client fetch to Supabase.
 *
 * LV5-018: the bespoke `.lb-newsletter` block was replaced with
 * NewsletterJoin, the shared two-column layout extracted from Home's old
 * SecondCTA (same topics/chips copy, same beehiiv list, `utm_source` left
 * as "Waitlist" per the automation trap noted in the LV5-017 ticket) —
 * minus the "See the Library tab" link, since this page IS the Library tab.
 */
export const metadata: Metadata = {
  title: clean('Library - Junoon'),
  description: clean(
    'Articles on Ayurveda, yoga and breathwork from Junoon, plus updates by email.'
  ),
}

// No `searchParams` read here (unlike Home) on purpose: the ticket calls
// for this route to be statically generated, and the newsletter list here
// doesn't need per-visit ?ref= attribution the way the homepage does.
export default function LibraryPage() {
  const source = normaliseSource(undefined)
  const articles = getAllArticles()

  return (
    <div id="top">
      {LIBRARY_JAALI && (
        <Jaali
          variant="panel"
          vignetteColor="#2C2118"
          zIndex={-1}
          maskPosition="50% 260px"
          maskSize="1100px 620px"
        />
      )}
      <NavV2 />

      <NewsletterJoin source={source} firstSection />

      <section className="lb-grid-section" aria-label="Articles">
        <div className="eyebrow lb-grid-heading">Articles</div>
        <div className="lb-grid">
          {articles.map(a => (
            <Link key={a.slug} href={`/library/${a.slug}`} className="v2-link lb-card">
              <span className="lb-card-eyebrow">{a.type}</span>
              <span className="lb-card-title">{a.title}</span>
              <span className="lb-card-desc">{a.description}</span>
              <span className="lb-card-meta jn-mono">{a.minutes} min read</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="lb-app-link-row">
        <a
          href="https://app.junoonwellness.com/education"
          target="_blank"
          rel="noopener noreferrer"
          className="v2-link lb-app-link"
        >
          Read more on the app →
        </a>
      </div>

      <FooterV2 />
    </div>
  )
}
