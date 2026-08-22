'use client'

import Image from 'next/image'
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, type Screen } from '@/lib/screens'

/**
 * THE FEATURE STORY TABS (spec §B5)
 *
 * LV5-003 (2026-08-22, Kush): replaced the scroll-jacked pin with named,
 * clickable tabs. Four tabs above a persistent phone pair + copy column;
 * selecting a tab (click, or arrow keys while a tab has focus) crossfades
 * that chapter's screenshots and copy in. No more scroll hijacking, no pin,
 * no section that eats four viewports of scroll to read four paragraphs.
 *
 * Kept generic on purpose: Phase 2's cinematic hero reuses this.
 *
 * ⚠️ Screenshots are mounted once and crossfaded by opacity (CSS, driven by
 * the `data-active` attribute). Never key them by chapter: remounting
 * re-requests the image, starves Next's image optimizer, and has already
 * sent one hero screenshot permanently blank.
 *
 * The crossfade for both the shots and the copy lives entirely in CSS
 * (`.jn-story-shot` / `.jn-story-copy` + `[data-active='true']` in
 * globals.css), same pattern as `.jn-tour-cta`'s hover crossfade elsewhere
 * on this page - `prefers-reduced-motion` kills the transition there, not
 * here, so there is one place that rule lives.
 */

export interface StoryChapter {
  id: string
  /** Small tracked label above the heading. */
  eyebrow: string
  /** Heading. Wrap the emphasis clause in <em>; it picks up the accent. */
  title: ReactNode
  body: string
  points: string[]
  /** A `--jn-*` custom property reference, e.g. `var(--jn-turmeric)`. */
  accent: string
  /** Short label under the progress rail; also the tab's visible name. */
  railLabel: string
  /** [primary phone, secondary phone] */
  screens: [Screen, Screen]
}

/**
 * Auto-advance is OFF by default (Kush, LV5-003: named tabs put the reader in
 * control; nothing here asked for the story to keep moving on its own). Flip
 * `AUTO_ADVANCE` to `true` to re-enable a ~6s rotation that pauses whenever a
 * tab is clicked or focused - if that's ever wanted, wire a `setInterval`
 * keyed on `active` here and clear it on tab interaction.
 */
const AUTO_ADVANCE = false
void AUTO_ADVANCE // referenced so the constant isn't flagged unused while off

/* ── one tab ───────────────────────────────────────────────────────────── */
function StoryTab({
  chapter,
  active,
  onSelect,
  onKeyDown,
  tabRef,
}: {
  chapter: StoryChapter
  active: boolean
  onSelect: () => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
  tabRef: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      id={`jn-story-tab-${chapter.id}`}
      aria-selected={active}
      aria-controls="jn-story-panel"
      tabIndex={active ? 0 : -1}
      data-active={active}
      className="jn-story-tab"
      style={{ ['--jn-tab-accent' as string]: chapter.accent }}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      {chapter.railLabel}
    </button>
  )
}

/* ── the engine ───────────────────────────────────────────────────────── */
export default function ScrollStory({
  chapters,
  label,
}: {
  chapters: StoryChapter[]
  /** Accessible name for the section. */
  label: string
}) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const n = chapters.length
  const activeChapter = chapters[active]

  const focusTab = (i: number) => {
    setActive(i)
    tabRefs.current[i]?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        focusTab((index + 1) % n)
        return
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        focusTab((index - 1 + n) % n)
        return
      case 'Home':
        e.preventDefault()
        focusTab(0)
        return
      case 'End':
        e.preventDefault()
        focusTab(n - 1)
        return
      default:
        return
    }
  }

  return (
    <section className="jn-story" aria-label={label}>
      <div role="tablist" aria-label={label} className="jn-story-tabs">
        {chapters.map((c, i) => (
          <StoryTab
            key={c.id}
            chapter={c}
            active={i === active}
            onSelect={() => setActive(i)}
            onKeyDown={e => handleKeyDown(e, i)}
            tabRef={el => {
              tabRefs.current[i] = el
            }}
          />
        ))}
      </div>

      <div
        id="jn-story-panel"
        role="tabpanel"
        aria-labelledby={`jn-story-tab-${activeChapter.id}`}
        className="jn-story-stage"
      >
        {/* ── the persistent phone pair ── */}
        <div className="jn-story-phones">
          <div className="v2-device jn-story-device-a">
            {chapters.map((c, i) => (
              <div key={c.id} className="jn-story-shot" data-active={i === active}>
                <Image
                  src={c.screens[0].src}
                  alt={c.screens[0].alt}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  sizes="300px"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <div className="v2-device jn-story-device-b">
            {chapters.map((c, i) => (
              <div key={c.id} className="jn-story-shot" data-active={i === active}>
                {/* The second phone repeats the chapter visually; it carries no new meaning. */}
                <Image
                  src={c.screens[1].src}
                  alt=""
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  sizes="200px"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── the crossfading copy column ── */}
        <div className="jn-story-copies">
          {chapters.map((c, i) => (
            <div
              key={c.id}
              className="jn-story-copy"
              data-active={i === active}
              aria-hidden={i !== active}
              style={{ ['--jn-ch-accent' as string]: c.accent }}
            >
              <div className="eyebrow" style={{ marginBottom: '18px', color: c.accent }}>
                {c.eyebrow}
              </div>
              <h3 className="jn-ch-title">{c.title}</h3>
              <p className="jn-ch-body">{c.body}</p>
              <ul className="jn-ch-points">
                {c.points.map(p => (
                  <li key={p} className="jn-ch-point">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
