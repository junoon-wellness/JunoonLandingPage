import type { Metadata } from 'next'
import Toran from '@/components/brand/Toran'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import PageCrest from '@/components/site/PageCrest'
import SiteFooter from '@/components/site/SiteFooter'
import NewsletterJoin from '@/components/waitlist/NewsletterJoin'
import Jaali from '@/components/brand/Jaali'
import { ARTICLE_GROUPS, articleGroup, getAllArticles } from '@/lib/library'
import ArticleFilter from '@/components/library/ArticleFilter'
import Image from 'next/image'
import LibraryTabs from '@/components/library/LibraryTabs'
import ClassVideo from '@/components/library/ClassVideo'
import {
  getLibraryVideos,
  isPreviewed,
  playbackSrc,
  posterSrc,
  PREVIEW_SECONDS,
  teacherHeadshot,
  videoMinutes,
  type LibraryVideo,
} from '@/lib/videos'
import { APP_STORE_URL, normaliseSource } from '@/lib/constants'
import { clean } from '@/lib/text'

/**
 * LV5-022 SC5 / LV5-024: the panel behind /library's header. Moved here from
 * inside NewsletterJoin.tsx — `.v2-section` is `position: relative`, which
 * scoped the old call to that local box instead of the page wrapper. See the
 * "ONE GEOMETRY" note atop components/brand/Jaali.tsx.
 */
const LIBRARY_JAALI = false // rework 9 Nov: one plain ground, as on the home page

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
    'Articles and videos on Ayurveda, yoga and breathwork from Junoon, plus updates by email.'
  ),
}

// No `searchParams` read here (unlike Home) on purpose: the ticket calls
// for this route to be statically generated, and the newsletter list here
// doesn't need per-visit ?ref= attribution the way the homepage does.
export default function LibraryPage() {
  const source = normaliseSource(undefined)
  const articles = getAllArticles()
  const videos = getLibraryVideos()
  const chips = ARTICLE_GROUPS.map(g => ({
    id: g.id,
    label: g.label,
    count: articles.filter(a => articleGroup(a) === g.id).length,
  }))

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
      <SiteHeader current="/library" />
      <PageCrest />

      <NewsletterJoin source={source} firstSection />

      {/* Kush, 2026-08-23: toran divider between the newsletter and the articles */}
      <Toran />
      {/* Arnav, Sat 21 Nov 2026: "add another tab for videos please so there will
          be two tabs". Articles stays exactly as it was; the "Articles" label is
          now the first tab. */}
      <LibraryTabs
        articles={
          <>
            <section className="lb-grid-section" aria-label="Articles">
              <ArticleFilter chips={chips} total={articles.length}>
                <div className="lb-grid">
                  {articles.map(a => (
                    <Link
                      key={a.slug}
                      href={`/library/${a.slug}`}
                      className="v2-link lb-card"
                      data-group={articleGroup(a) ?? undefined}
                    >
                      <span className="lb-card-eyebrow">{a.type}</span>
                      <span className="lb-card-title">{a.title}</span>
                      <span className="lb-card-desc">{a.description}</span>
                      <span className="lb-card-meta jn-mono">{a.minutes} min read</span>
                    </Link>
                  ))}
                </div>
              </ArticleFilter>
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
          </>
        }
        videos={
          <>
            {/* Arnav, Sun 22 Nov 2026: Glo's class page, one class per block
                ("I want to copy the same style and also cap our videos at 2 minutes"). */}
            <section className="lb-grid-section" aria-label="Videos">
              <div className="lb-classes">
                {videos.map(v => (
                  <ClassBlock key={v.id} video={v} />
                ))}
              </div>
            </section>

            <div className="lb-app-link-row">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="v2-link lb-app-link"
              >
                Watch them all in the app →
              </a>
            </div>
          </>
        }
      />

      <SiteFooter />
    </div>
  )
}

const APP_URL = 'https://app.junoonwellness.com'

/**
 * One class on the Videos tab, laid out after Glo's class page (Arnav, Sun 22
 * Nov 2026): the player across the full width, with the 60 second preview pill
 * on it; then the title, the teacher's round photo beside "Teacher • Category"
 * and the length, and the class's own description. A Props or Level line shows
 * only when the snapshot has one. A row with a public stream or file plays
 * inline; any other row is its poster, linking to the app.
 */
function ClassBlock({ video: v }: { video: LibraryVideo }) {
  const minutes = videoMinutes(v.duration_seconds)
  const photo = teacherHeadshot(v.instructor)
  const src = playbackSrc(v)
  return (
    <article className="lb-class">
      {src ? (
        <div className="lb-card-thumb lb-class-player">
          <ClassVideo
            src={src}
            thumbnail={v.thumbnail_url}
            poster={posterSrc(v.thumbnail_url)}
            title={v.title}
            previewSeconds={isPreviewed(v) ? PREVIEW_SECONDS : null}
            fullMinutes={minutes}
            fullClassHref={APP_STORE_URL}
          />
        </div>
      ) : (
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lb-card-thumb lb-class-player"
        >
          <Image
            src={v.thumbnail_url}
            alt={v.title}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </a>
      )}
      <h3 className="lb-class-title">{v.title}</h3>
      <div className="lb-class-teacher">
        {photo && (
          <Image
            src={photo}
            alt=""
            width={44}
            height={44}
            className="lb-class-photo"
          />
        )}
        <div className="lb-class-meta">
          <span>
            {v.instructor} • {v.category}
          </span>
          <span>
            {minutes} min{v.level ? ` • ${v.level}` : ''}
          </span>
        </div>
      </div>
      {v.description && <p className="lb-class-desc">{v.description}</p>}
      {v.props && (
        <p className="lb-class-props">
          <strong>Props:</strong> {v.props}
        </p>
      )}
    </article>
  )
}
