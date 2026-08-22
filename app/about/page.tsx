import type { Metadata } from 'next'
import Image from 'next/image'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import ContactForm from '@/components/cta/ContactForm'
import { FOUNDER_VIDEO_SRC } from '@/lib/constants'
import { clean } from '@/lib/text'

/**
 * LV5-016 — /about, board B "Chaptered" (LV5-009, ACCEPTED), padding
 * removed especially at the top per Kush's 2026-08-22 ruling: "I like B but
 * remove the empty padding throughout, especially at the top." The
 * headline sits close under the fixed nav (see .ab-hero in globals.css).
 *
 * Story copy (headline, five paragraphs, tagline, signature) is LOCKED
 * verbatim from LV5-008's notes — do not rephrase any of it, including the
 * single em dash in paragraph 3 ("modern-day problems—when applied
 * correctly"), which Kush ruled to keep. That is the ONLY em dash that
 * should appear anywhere on this page.
 */
export const metadata: Metadata = {
  title: clean('About - Junoon'),
  description: clean(
    'Reclaiming Ancient Indian practices and making them fit into modern life. Meet the team and instructors behind Junoon.'
  ),
}

const STORY_PARAGRAPHS = [
  'Before starting Junoon, we noticed a growing trend around us: people were feeling more stressed, facing more health issues, and becoming increasingly disconnected from their body and mind.',
  'We knew something needed to change.',
  "That's when we decided to look back to where it all began. Thousands of years ago, ancient India developed a holistic system designed to support human well-being in a deep, lasting way. Today, these time-tested practices remain our most effective tools for modern-day problems—when applied correctly.",
  'We created Junoon because we believe deeply in this approach. Junoon is a space and a community dedicated to helping you return to your roots. We draw directly from ancient texts on yoga, meditation, and breathwork, personalizing these timeless practices to fit your daily life.',
  "Our team built this platform with Junoon (passion), purpose, and intention. Having you here means everything to us. Let's do this together.",
] as const

const TAGLINE = 'Ancient Traditions, Modern Solutions.'
const SIGNATURE = 'Arjav, Founder and CEO'

interface Person {
  name: string
  role: string
  photo?: string
  bio?: string
}

// TEAM headshots are not supplied yet (LV5-008: "STILL NEEDED FROM HUMANS:
// ... TEAM headshots x4") — every card renders the clay-light silhouette
// placeholder below until Kush provides real photos.
const TEAM: Person[] = [
  { name: 'Arjav Chhabra', role: 'Founder & CEO' },
  { name: 'Kush Jain', role: 'Operations' },
  { name: 'Arnav Jain', role: 'Engineering' },
  { name: 'Tej Chhabra', role: 'Technology' },
]

// Specialty + first bio paragraph quoted verbatim from
// junoon-wellness-app/Junoon-IOS/Junoon/Core/Fixtures.swift `Fixtures.teachers`.
// Durva's bio is a placeholder in the fixture ("will be added soon"), so her
// card shows the specialty only, per the ticket.
const INSTRUCTORS: Person[] = [
  {
    name: 'Shoam Mehta',
    role: 'Yoga Coach · Sadhaka',
    photo: '/instructors/shoam.jpg',
    bio: 'Namaste, I am Shoam Mehta, Yoga Instructor and Sadhaka.',
  },
  {
    name: 'Amman Advaita',
    role: 'Hatha · Iyengar · Meditation',
    photo: '/instructors/amman.jpg',
    bio: "At 14, a visit to Rumtek Monastery lit something that hasn't gone out since. That spark led to a Yoga Shastri certification under Dr. Hansraj Yadav, fifteen years of deepening study in Hatha and Iyengar methodologies, and formal training in the Sri Vidya tantric tradition, Tibetan Buddhism, and Tibetan Yantra Yoga.",
  },
  {
    name: 'Divya Sahasrabuddhe',
    role: 'Hatha Yoga · Pranayama',
    photo: '/instructors/divya.jpg',
    bio: "Hi, I'm Divya Sahasrabuddhe, a certified Hatha Yoga and pranayama teacher from Goa with 18 years of dedicated practice. What began as a personal journey to build strength, balance, and mental clarity gradually deepened into a lifelong commitment, leading me to train at the Sivananda Ashram and share these practices with others.",
  },
  {
    name: 'Durva Aparna',
    role: 'Intro Yoga · Pranayama · Mobility',
    photo: '/instructors/durva.jpg',
  },
]

function SilhouetteIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="17" r="9" fill="currentColor" />
      <path d="M6 42c0-9.94 8.06-16 18-16s18 6.06 18 16" fill="currentColor" />
    </svg>
  )
}

function PlayMark() {
  return (
    <span className="ab-play-mark" aria-hidden="true">
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M17 10 L1 19.5 L1 0.5 Z" fill="currentColor" />
      </svg>
    </span>
  )
}

function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <div className="ab-people-grid">
      {people.map(p => (
        <div key={p.name} className="ab-person-card">
          {p.photo ? (
            <div className="ab-person-photo">
              <Image
                src={p.photo}
                alt={p.name}
                width={400}
                height={400}
                sizes="(max-width: 768px) 45vw, 22vw"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="ab-person-photo ab-placeholder">
              <SilhouetteIcon />
            </div>
          )}
          <div className="ab-person-name">{p.name}</div>
          <div className="ab-person-role">{p.role}</div>
          {p.bio && <p className="ab-person-bio">{p.bio}</p>}
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div id="top">
      <NavV2 />

      <header className="ab-hero">
        <div className="eyebrow ab-eyebrow">About</div>
        <h1 className="ab-headline">
          Reclaiming Ancient Indian practices and making them fit into modern life
        </h1>
      </header>

      {/* 01 — video left, copy right */}
      <section className="ab-band" aria-label="Where it started">
        <div className="ab-band-media">
          <div className="ab-video-slot">
            {FOUNDER_VIDEO_SRC ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={FOUNDER_VIDEO_SRC} controls playsInline />
            ) : (
              <>
                <PlayMark />
                <span className="ab-video-caption">Founder video</span>
              </>
            )}
          </div>
        </div>
        <div className="ab-band-copy">
          <span className="ab-band-num jn-mono">01</span>
          <p>{STORY_PARAGRAPHS[0]}</p>
          <p>{STORY_PARAGRAPHS[1]}</p>
        </div>
      </section>

      {/* 02 — copy left, tagline panel right */}
      <section className="ab-band ab-band-reverse" aria-label="Looking back">
        <div className="ab-band-copy">
          <span className="ab-band-num jn-mono">02</span>
          <p>{STORY_PARAGRAPHS[2]}</p>
          <p>{STORY_PARAGRAPHS[3]}</p>
        </div>
        <div className="ab-band-media">
          <div className="ab-tagline-panel">
            <div className="ab-tagline-text">{TAGLINE}</div>
          </div>
        </div>
      </section>

      {/* 03 — founder card left, copy right */}
      <section className="ab-band" aria-label="Built with Junoon">
        <div className="ab-band-media">
          <div className="ab-founder-card">
            <div className="ab-founder-photo">
              <Image
                src="/arjav-photo.jpg"
                alt="Arjav, founder of Junoon Wellness"
                width={280}
                height={280}
                sizes="140px"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div className="ab-founder-name">Arjav Chhabra</div>
              <div className="ab-founder-role">Founder &amp; CEO</div>
            </div>
          </div>
        </div>
        <div className="ab-band-copy">
          <span className="ab-band-num jn-mono">03</span>
          <p>{STORY_PARAGRAPHS[4]}</p>
          <div className="ab-signature">{SIGNATURE}</div>
        </div>
      </section>

      <section className="ab-people-section" aria-label="Our team">
        <div className="eyebrow ab-people-heading">Our team</div>
        <PeopleGrid people={TEAM} />
      </section>

      <section className="ab-people-section" aria-label="Meet our instructors">
        <div className="eyebrow ab-people-heading">Meet our instructors</div>
        <PeopleGrid people={INSTRUCTORS} />
      </section>

      <section className="ab-contact-section" aria-label="Contact">
        <div className="ab-contact-inner">
          <div className="ab-contact-heading">
            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '10px' }}>
              Get in touch
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <FooterV2 />
    </div>
  )
}
