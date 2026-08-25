import type { Metadata } from 'next'
import Image from 'next/image'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import ContactForm from '@/components/cta/ContactForm'
import JharokhaFrame from '@/components/brand/JharokhaFrame'
import Jaali from '@/components/brand/Jaali'
import Reveal from '@/components/motion/Reveal'
import Toran from '@/components/brand/Toran'
import SectionLabel from '@/components/brand/SectionLabel'
import BioDisclosure from '@/components/about/BioDisclosure'
/* LV5-032 (Kush: "a better animation/transition as the user scrolls"): each
   band's media slides in from ITS OWN side (x ±36, settling from scale 0.96)
   and the copy from the opposite side 0.15s later, 0.9s each. Band 2 is the
   reversed band, so its signs flip. Reduced motion neutralises all of it via
   .jn-reveal in globals.css. */
import { clean } from '@/lib/text'

/* ══════════════════════════════════════════════════════════════════
   THE JUNOON ELEMENT — dials (LV5-021)

   Both default ON. Flip either to false and that surface returns to
   exactly what LV5-016/LV5-019 shipped; nothing else on the page reads
   these, so they can be flipped independently.
   ══════════════════════════════════════════════════════════════════ */

/** Instructor headshots sit inside the jharokha arch instead of a 4:5 box. */
const INSTRUCTOR_ARCH = true

/**
 * LV5-022 SC5 / LV5-024: the panel behind the instructor grid. Moved here
 * from inside the "Meet our instructors" section — see the note there and
 * the "ONE GEOMETRY" note atop components/brand/Jaali.tsx.
 */
const ABOUT_JAALI = true


/*
 * LV5-022 SC4 - the founder video slot's arch is GONE. Kush, 2026-08-23:
 * "I don't like the cutout for the video." It is a rounded 16:9 rectangle
 * again, now with a gold hairline instead of the neutral one. The arch
 * stays on the instructor photos, which he did not object to.
 */

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
    'Reclaiming Ancient Indian practices for the Modern Life. Meet the team and instructors behind Junoon.'
  ),
}

const STORY_PARAGRAPHS = [
  'Before starting Junoon, we noticed a growing trend around us: people were feeling more stressed, facing more health issues, and becoming increasingly disconnected from their body and mind.',
  'We knew something needed to change.',
  "That's when we decided to look back to where it all began. Thousands of years ago, ancient India developed a holistic system designed to support human well-being in a deep, lasting way. Today, these time-tested practices remain our most effective tools for modern-day problems—when applied correctly.",
  'We created Junoon because we believe deeply in this approach. Junoon is a space and a community dedicated to helping you return to your roots. We draw directly from ancient texts on yoga, meditation, and breathwork, personalizing these timeless practices to fit your daily life.',
  "Our team built this platform with Junoon (passion), purpose, and intention. Having you here means everything to us. Let's do this together.",
] as const

/* LV5-022 SC3: the /about sub-line. Kush may edit this wording. */
const SUBLINE =
  'Yoga, breathwork and meditation, rooted in ancient India, built for modern life.'

const TAGLINE = 'Ancient Traditions, Modern Solutions.'
const SIGNATURE = 'Arjav, Founder and CEO'

interface Person {
  name: string
  role: string
  photo?: string
  bio?: string
  /** LV5-019: focal point for the 4:5 `object-fit: cover` crop, as a CSS
   *  `object-position` value. Only the four instructor photos set this -
   *  TEAM's placeholder silhouettes have no photo to position. */
  objectPosition?: string
}

// LV5-026: Kush, 2026-08-23 - "Arjav's box remove from the row of 4 and
// just have the remaining 3 of us on the about page." Arjav stays on the
// page only as the band-03 founder card + signature above, not in this
// row. Kush's real headshot (public/team/kush.jpg, cropped from
// ~/Downloads/IMG_7670.jpg) is in; Arnav and Tej still render the
// clay-light silhouette placeholder below until their files arrive.
const TEAM: Person[] = [
  {
    name: 'Kush Jain',
    role: 'Operations',
    photo: '/team/kush.jpg',
    objectPosition: '50% 30%',
  },
  {
    name: 'Arnav Jain',
    role: 'Engineering',
    // Kush, 2026-08-23: ~/Downloads/DSC01837.JPG (4896x3672, EXIF-rotated to
    // portrait) cropped head-and-shoulders at 4:5, flash red-eye reduced, and
    // the pink wall keyed out to the same light-grey ground as Kush's photo
    // ("make arnav's background white and consistent with mine").
    photo: '/team/arnav-grey.jpg',
    objectPosition: '50% 35%',
  },
  {
    name: 'Tej Chhabra',
    role: 'Technology',
    // Kush, 2026-08-23: ~/Downloads/upscalemedia-transformed.jpeg (1600x1600
    // studio headshot) cropped 4:5 centred on the face.
    photo: '/team/tej.jpg',
    objectPosition: '50% 40%',
  },
]

// Specialty + first bio paragraph quoted verbatim from
// junoon-wellness-app/Junoon-IOS/Junoon/Core/Fixtures.swift `Fixtures.teachers`.
// Durva's bio is a placeholder in the fixture ("will be added soon"), so her
// card shows the specialty only, per the ticket.
//
// objectPosition (LV5-019): the ticket's premise was that Shoam's file was
// still a 1600x962 landscape source and Durva's a "wide shot" needing a
// right-shifted crop. Checked both against the app repo's own
// *InstructorAvatar.imageset sources (Assets.xcassets) - all four files
// here are already byte-identical (md5) to those square avatar crops, so
// no re-export was needed. Values below are still per-person: Shoam's is a
// full-body candid with his face in one corner, so it gets the same
// slightly-high framing as Amman/Divya's already-centred headshots.
const INSTRUCTORS: Person[] = [
  {
    name: 'Shoam Mehta',
    role: 'Yoga Coach · Sadhaka',
    // Kush, 2026-08-24: head-and-shoulders re-crop (new filename — same-name
    // replacement serves stale bytes) + his full bio, VERBATIM from the
    // app's Fixtures.swift (Kush: "theres a better one in the app").
    photo: '/instructors/shoam-head.jpg',
    bio: "Namaste, I am Shoam Mehta, Yoga Instructor and Sadhaka.\n\nYoga has been a game-changer for me. It helped me acknowledge my flaws, work on them, and become a better and more complete version of myself. It has given me the strength and patience to face the different challenges life has thrown my way, and helped me see those challenges as opportunities rather than problems - opportunities to learn something and grow.\n\nMy motto in life is that nothing is permanent. I live by that belief, knowing that things and people can change for the better or for the good. This has helped me become extremely grateful for what I have and patient for things to change in my favor. This is what made me a passionate yoga coach and trainer.",
    objectPosition: '50% 50%',
  },
  {
    name: 'Amman Advaita',
    role: 'Hatha · Iyengar · Meditation',
    photo: '/instructors/amman-head.jpg',
    bio: "At 14, a visit to Rumtek Monastery lit something that hasn't gone out since. That spark led to a Yoga Shastri certification under Dr. Hansraj Yadav, fifteen years of deepening study in Hatha and Iyengar methodologies, and formal training in the Sri Vidya tantric tradition, Tibetan Buddhism, and Tibetan Yantra Yoga.",
    // Kush, 2026-08-24: "move ammans picture lower and to the right". With
    // object-fit: cover the percentages position the IMAGE, not the subject —
    // so BOTH numbers go DOWN to move him down-and-right. 50/50 -> 38/38.
    objectPosition: '38% 38%',
  },
  {
    name: 'Divya Sahasrabuddhe',
    role: 'Hatha Yoga · Pranayama',
    photo: '/instructors/divya.jpg',
    bio: "Hi, I'm Divya Sahasrabuddhe, a certified Hatha Yoga and pranayama teacher from Goa with 18 years of dedicated practice. What began as a personal journey to build strength, balance, and mental clarity gradually deepened into a lifelong commitment, leading me to train at the Sivananda Ashram and share these practices with others.",
    // Kush, 2026-08-24: "divyas just slightly up" — Y only, and only a little.
    objectPosition: '50% 43%',
  },
  {
    name: 'Durva Aparna',
    role: 'Intro Yoga · Pranayama · Mobility',
    // Kush, 2026-08-24: re-crop centred on her profile (the old 70% window
    // pushed her face to the frame's edge). New filename per the cache trap.
    // Same day, later: "durva slightly down and to the left" — Y down, X up.
    // ⚠️ Kept modest (58/42) precisely BECAUSE of the note above: hers is a
    // profile shot, so it runs out of room at the frame's edge sooner than the
    // head-on portraits do.
    objectPosition: '58% 42%',
    photo: '/instructors/durva-head.jpg',
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

/**
 * LV5-021: `arch` puts the photo inside the jharokha instead of the 4:5 box.
 *
 * LV5-019's crop is CARRIED THROUGH UNCHANGED — same `object-fit: cover`, same
 * per-person `object-position`. Only the box's aspect moves, 4:5 (0.800) to the
 * arch's locked 660:754 (0.875), i.e. very slightly less tall. `object-position`
 * is a percentage of the overflow, so the focal points still frame the same
 * faces; they are not pixel offsets that would need re-deriving.
 *
 * The frame sets its own aspect-ratio inline, which is why `.ab-person-photo`'s
 * `aspect-ratio: 4/5` does not have to be removed for the arched variant.
 */
function PeopleGrid({
  people,
  arch = false,
  className,
}: {
  people: Person[]
  arch?: boolean
  /** LV5-026: lets the team row opt into the 3-up `.ab-team-grid` modifier
   *  while the instructor grid below keeps the plain 4-up `.ab-people-grid`. */
  className?: string
}) {
  return (
    <div className={className ? `ab-people-grid ${className}` : 'ab-people-grid'}>
      {people.map(p => (
        <div key={p.name} className="ab-person-card">
          {p.photo ? (
            arch ? (
              <JharokhaFrame className="ab-person-photo is-arched" strokeOpacity={0.45}>
                <Image
                  src={p.photo}
                  alt={p.name}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: p.objectPosition ?? '50% 50%',
                  }}
                />
              </JharokhaFrame>
            ) : (
              <div className="ab-person-photo">
                <Image
                  src={p.photo}
                  alt={p.name}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: p.objectPosition ?? '50% 50%',
                  }}
                />
              </div>
            )
          ) : (
            <div className="ab-person-photo ab-placeholder">
              <SilhouetteIcon />
            </div>
          )}
          <div className="ab-person-name">{p.name}</div>
          <div className="ab-person-role">{p.role}</div>
          {/* Kush, 2026-08-23: bios hide behind a sage chevron toggle. */}
          {p.bio && <BioDisclosure bio={p.bio} />}
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div id="top">
      {ABOUT_JAALI && (
        <Jaali variant="panel" zIndex={-1} maskPosition="50% 1900px" maskSize="1100px 720px" />
      )}
      <NavV2 />

      {/*
        LV5-022 SC3. Kush: "text is bland." Given the site's standard headline
        treatment - sage mono eyebrow with its short rule, Cormorant light, the
        accent clause in turmeric italic, one sub-line under it.

        THE HEADLINE STRING IS UNCHANGED, including the capital A in "Ancient".
        The <em> only wraps a span of it; it adds no words and removes none.
      */}
      <header className="ab-hero">
        {/* Kush, 2026-08-23: "remove about junoon smaller golden text at the top" */}
        {/* Kush, 2026-08-24: new headline wording, both phrases in the
            accent, sized to sit as ONE line across the top on desktop. */}
        <h1 className="ab-headline">
          Reclaiming <em>Ancient Indian practices</em> for the <em>Modern Life</em>.
        </h1>
        <p className="ab-subline">{SUBLINE}</p>
      </header>

      {/* Kush, 2026-08-24: "also remove founder video for now until we have it
          ready please". Arjav's file never arrived, so this band was rendering
          an empty 16:9 slot with a play mark and the caption "Founder video".
          The section is REMOVED, not the plumbing: `FOUNDER_VIDEO_SRC` in
          lib/constants.ts and the `.ab-hero-video` / `.ab-video-cinema` CSS are
          untouched, so restoring this is pasting the section back and setting
          the constant. Keep the rounded frame, no arch, when it returns. */}

      {/* Kush, 2026-08-24: "put the ancient traditions banner below the
          video" — a full-width band directly under the cinematic slot. */}
      <section className="ab-tagline-band" aria-label="Ancient Traditions, Modern Solutions">
        <Reveal y={18} duration={0.9} amount={0.3}>
          <div className="ab-tagline-panel">
            <div className="ab-tagline-text">{TAGLINE}</div>
          </div>
        </Reveal>
      </section>

      {/* Kush, 2026-08-24: "all 4 of those paragraphs are one quote so we
          need one sign off so keep the bottom one… arjavs picture on one
          side and the quote around it". One founder-letter band replaces
          the old three story bands, and the 2026-08-23 mid-story sign-off
          is gone by the same ruling. Story wording stays VERBATIM — the
          accent <em> wraps below add and remove no words. */}
      <section className="ab-band ab-founder-letter" aria-label="A letter from our founder">
        <Reveal className="ab-letter-media" x={-36} y={0} scale={0.96} duration={0.9} amount={0.15}>
          <div className="ab-founder-card ab-founder-card-lg">
            <div className="ab-founder-photo">
              <Image
                src="/arjav-photo.jpg"
                alt="Arjav, founder of Junoon Wellness"
                width={720}
                height={900}
                sizes="(max-width: 768px) 78vw, 360px"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }}
              />
            </div>
            <div className="ab-founder-caption">
              <div className="ab-founder-name">Arjav Chhabra</div>
              <div className="ab-founder-role">Founder &amp; CEO</div>
            </div>
          </div>
        </Reveal>
        <Reveal className="ab-band-copy ab-letter-copy" x={36} y={0} duration={0.9} delay={0.15} amount={0.15}>
          <span className="ab-letter-quotemark" aria-hidden="true">&ldquo;</span>
          <p>{STORY_PARAGRAPHS[0]}</p>
          <p className="ab-letter-pivot">{STORY_PARAGRAPHS[1]}</p>
          <p>{STORY_PARAGRAPHS[2]}</p>
          {/* Paragraphs 4-5 rendered inline so two phrases can carry the
              turmeric accent — words identical to STORY_PARAGRAPHS[3]/[4],
              which stay the canonical wording. */}
          <p>
            We created Junoon because we believe deeply in this approach. Junoon is a space and a
            community dedicated to helping you{' '}
            <em className="ab-letter-accent">return to your roots</em>. We draw directly from
            ancient texts on yoga, meditation, and breathwork, personalizing these timeless
            practices to fit your daily life.
          </p>
          <p>
            Our team built this platform with Junoon (passion), purpose, and intention. Having you
            here means everything to us.{' '}
            <em className="ab-letter-accent">Let&apos;s do this together.</em>
          </p>
          <div className="ab-signature">
            {SIGNATURE}
          </div>
        </Reveal>
      </section>

      {/* Kush, 2026-08-23: toran divider between the story and the people */}
      <Toran />
      <section className="ab-people-section" aria-label="Our team">
        <SectionLabel align="center" className="ab-people-heading">Our team</SectionLabel>
        <PeopleGrid people={TEAM} className="ab-team-grid" />
      </section>

      <section className="ab-people-section ab-people-panel" aria-label="Meet our instructors">
        {/* LV5-022 SC5 / LV5-024: the instructor-grid panel used to render
            HERE. `.ab-people-section` and `.ab-people-panel` are both
            `position: relative`, which scoped the old call to this local box
            instead of the page wrapper. It now renders as `ABOUT_JAALI` at
            the top of this page's own `<div id="top">` — see the
            "ONE GEOMETRY" note atop components/brand/Jaali.tsx. The arched
            photos still sit on it, which is the pairing the poster uses. */}
        <SectionLabel align="center" className="ab-people-heading">Meet our instructors</SectionLabel>
        <PeopleGrid people={INSTRUCTORS} arch={INSTRUCTOR_ARCH} className="ab-instructor-grid" />
      </section>

      {/* Kush, 2026-08-23: toran divider between the instructors and the contact form */}
      <Toran />
      <section className="ab-contact-section" aria-label="Contact">
        <div className="ab-contact-inner">
          <div className="ab-contact-heading">
            <SectionLabel align="center" style={{ marginBottom: '10px' }}>
              Get in touch
            </SectionLabel>
          </div>
          <ContactForm />
        </div>
      </section>

      <FooterV2 />
    </div>
  )
}
