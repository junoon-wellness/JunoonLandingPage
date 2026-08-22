import type { Metadata } from 'next'
import Link from 'next/link'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import SignupForm from '@/components/waitlist/SignupForm'
import { getAllArticles } from '@/lib/library'
import { normaliseSource } from '@/lib/constants'
import { clean } from '@/lib/text'

/**
 * LV5-017 — /library. Newsletter block at top (the full version of Home's
 * SecondCTA teaser — same topics/chips copy, same beehiiv list, `utm_source`
 * left as "Waitlist" per the automation trap noted in the ticket), then the
 * 20 real articles pulled by scripts/pull-library.mjs, then a plain link
 * out to the app's own public /education route. No recipes section (not
 * built, per the ticket). Fully static — no client fetch to Supabase.
 */
export const metadata: Metadata = {
  title: clean('Library - Junoon'),
  description: clean(
    'Articles on Ayurveda, yoga and breathwork from Junoon, plus updates by email.'
  ),
}

const TOPICS = [
  'App updates and news',
  'Wellness articles',
  'Live class announcements',
  'Recipes and more',
]

// No `searchParams` read here (unlike Home) on purpose: the ticket calls
// for this route to be statically generated, and the newsletter list here
// doesn't need per-visit ?ref= attribution the way the homepage does.
export default function LibraryPage() {
  const source = normaliseSource(undefined)
  const articles = getAllArticles()

  return (
    <div id="top">
      <NavV2 />

      <section className="lb-newsletter" aria-label="Newsletter">
        <div>
          <div className="eyebrow" style={{ marginBottom: '14px' }}>
            Junoon Library
          </div>
          <h1 className="lb-newsletter-headline">
            Get updates by email. <em style={{ color: 'var(--jn-turmeric)' }}>Read here.</em>
          </h1>
          <p className="lb-newsletter-sub">{TOPICS.join(', ')}.</p>

          <ul className="lb-topics">
            {TOPICS.map(t => (
              <li key={t} className="lb-topic jn-mono">
                {t}
              </li>
            ))}
          </ul>

          <ul className="lb-chips">
            {['No spam', 'Unsubscribe anytime'].map(c => (
              <li key={c} className="lb-chip">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SignupForm id="join" source={source} withPhone={false} />
        </div>
      </section>

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
