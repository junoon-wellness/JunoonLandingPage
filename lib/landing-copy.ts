/**
 * THE LANDING PAGE WORDS, in one place.
 *
 * Source: Arjav's text for the whole landing page (the approved editable
 * mock-up, junoon-team pages/mockups/landing-editable-1106.html, his words of
 * Sun 8 Nov 2026), with his six health and science rewordings applied (Mon
 * 9 Nov, answers 4, 5, 6, 8, 23 and 24 on his health-lines page).
 *
 * Rulings that shape what is here:
 *  - Member quotes are left off the page until real members give theirs with
 *    their yes (Kush, Mon 9 Nov, D1). Nobody writes them for them.
 *  - The founding price and "theirs for life" / "Lifetime deal" are IN: Kush
 *    checked App Store Connect (Mon 9 Nov, 4:21 PM, the founders price is live
 *    and permanent).
 *  - FAQ answers 6, 7 and 8 are the agent drafts marked DRAFT on the mock-up,
 *    kept as drafted; the mock-up's third pricing block (DRAFT: remove, same
 *    as plan 1) is removed as drafted.
 *
 * No em dashes in any visible text.
 */

/**
 * The founding offer, live in App Store Connect as a permanent price (Kush,
 * Mon 9 Nov, 4:21 PM: "founders price is live in appstore connect and it is
 * a permanent price so both are true they can be on the landing page").
 */
export const FOUNDING_LINE =
  'The first 100 members get a founding price, theirs for life.'

/* ── The top ─────────────────────────────────────────────────────────────── */

export const NAV_CTA = 'Get the app'

export const HERO_HEADLINE = 'Connecting Ancient India with modern life.'

export const HERO_SUB =
  'Junoon brings back the practices of ancient India, and connects them under one system to fit your modern day life. Yoga, meditation and breathwork rooted in how these practices were taught in India.'

export const HERO_CHIPS = [
  'Asana',
  'Pranayama',
  'Ancient texts',
  'Real Indian instructors',
  "Patanjali's 8 limbs",
]

/** The words around the map of India and the arrow to the phone. */
export const HERO_MAP = {
  caption: 'Where it comes from',
  captionSmall: 'Rooted in India',
  bridge: 'made for your life',
}

/** The line above the App Store badge on the first screen. */
export const HERO_FINE = {
  lead: 'Founding members:',
  rest: 'your first month is free, for everyone. ' + FOUNDING_LINE,
}

/** The eight features around the drawn phone: four left, four right. */
export const FEATURES = [
  { title: 'A coach who knows you', body: 'Remembers your sleep, energy and needs' },
  { title: 'Sessions built for your life', body: 'Fits the time and energy you have' },
  { title: 'Pranayama on demand', body: 'The ancient breathwork system' },
  {
    title: 'Sit and do nothing',
    body: 'Unplug and listen to our junoon music with the lost art of sitting and doing nothing',
  },
  {
    title: 'On demand classes',
    body: 'Pick from our library of dozens of on demand classes, filmed in Indian studios',
  },
  { title: 'Nightly reflection', body: 'Reflect on each day with your coach' },
  { title: 'Live classes', body: 'Coming soon: practise live with teachers' },
  { title: 'Your Samadhi', body: "Quantifying your progress on Patanjali's eight limbs" },
]

/* ── Section 2: your first two weeks ─────────────────────────────────────── */

export const TWO_WEEKS = {
  eyebrow: 'Two weeks to know you',
  heading: 'Your first 14 days: the learning phase',
  days: [
    {
      label: 'Day 1',
      title: 'Meet your coach',
      body: 'Ten short questions, a welcome film from our founder Arjav and your first session.',
    },
    {
      label: 'Days 2 to 13',
      title: 'Practise, then reflect',
      body: 'A session built around your needs each day, and a reflection each night.',
    },
    {
      label: 'Day 14',
      title: 'Learning phase completion',
      body: "A look back, and view your J score baseline, which measures your progress towards Patanjali's 8 limbs of yoga.",
    },
  ],
}

/* ── Section 3: meet your coach ──────────────────────────────────────────── */

export const COACH = {
  eyebrow: 'Your coach',
  heading: 'A coach that learns your week.',
  body: 'Your coach remembers your sleep, your stress and your needs, then builds each session around the time and energy you have.',
  cards: [
    { title: "Today's session", body: 'Built around your body, your time and your day.' },
    {
      title: 'Your day briefing',
      body: 'Each morning your coach checks in and explains why your setup looks like it does.',
    },
    {
      title: 'Four coaches',
      body: 'Acharya, Anjali, Aria or Arjav talks you through each session.',
    },
    { title: 'Nightly reflection', body: 'Reflect on each day with your coach.' },
  ],
}

/* ── Section 4: the eight limbs ──────────────────────────────────────────── */

export const LIMBS = {
  eyebrow: 'Eight limbs to grow into, for life',
  heading: 'Junoon pulls from all 8 limbs of traditional yoga',
  body: 'Over 1,500 years ago, Patanjali outlined the Eight Limbs of Yoga in the Yoga Sutras. Today, many Western yoga classes focus mainly on asana, the physical postures. But the other seven limbs explore everything from how we treat others to breathwork, meditation, and self-awareness. At Junoon, we bring all eight limbs into your practice, helping you explore yoga beyond the physical poses, at your own pace.',
  items: [
    {
      name: 'Yama',
      body: 'Ethical principles like nonviolence, honesty, non-stealing, moderation, and non-possessiveness.',
    },
    {
      name: 'Niyama',
      body: 'Personal disciplines like cleanliness, contentment, self-discipline, self-reflection, and devotion.',
    },
    {
      name: 'Asana',
      body: 'Training the body to become steady, comfortable, and prepared for meditation.',
    },
    {
      name: 'Pranayama',
      body: 'Working with your breath. In the tradition, a steady breath goes with a steady mind.',
    },
    {
      name: 'Pratyahara',
      body: 'Turning your attention away from external distractions and toward your inner experience.',
    },
    {
      name: 'Dharana',
      body: 'Training your mind to focus on one object, thought, or point without wandering.',
    },
    {
      name: 'Dhyana',
      body: 'Sustaining an uninterrupted flow of attention, moving beyond effortful concentration.',
    },
    {
      name: 'Samadhi',
      body: 'A profound state of meditative awareness where the distinction between the observer and the object of meditation dissolves.',
    },
  ],
}

/* ── Section 5: your J Score ─────────────────────────────────────────────── */

export const JSCORE = {
  eyebrow: 'Your J Score',
  heading: 'Watch your practice grow.',
  body: "Your J Score reflects how consistently you're incorporating the first seven limbs of yoga into your practice, guiding you toward the eighth: Samadhi, the ultimate state of meditative absorption and inner awareness.",
  points: [
    {
      title:
        'Your J Score tracks how consistently you practice the first seven limbs of yoga, helping you identify areas for growth as you progress toward the eighth: Samadhi.',
      body: '',
    },
    { title: 'Measured against your own start', body: 'Never against other people.' },
    { title: 'Grows as you practise', body: 'Check it any time, not only on day 14.' },
  ],
}

/* ── Section 6: classes and breathwork ───────────────────────────────────── */

export const CLASSES = {
  eyebrow: 'Classes and breathwork',
  heading: 'Classes and breathwork, any time.',
  body: 'Yoga, pranayama, and meditation guided by Indian teachers rooted in these ancient traditions. Download any class and practice anytime, anywhere, even without an internet connection.',
  cards: [
    {
      title: 'The library',
      body: 'Yoga, meditation and pranayama classes from teachers who grew up with these practices. Download any class.',
    },
    {
      title: 'Breathwork',
      body: 'Guided breath practices, from a one minute reset to a longer sit.',
    },
    {
      title: 'Live classes',
      body: 'Coming soon inside the app, included with all subscriptions.',
      soon: true,
    },
  ],
}

/* ── Section 7: learn ────────────────────────────────────────────────────── */

export const LEARN = {
  eyebrow: 'Learn',
  heading: 'Read where the roots come from.',
  body: 'Short articles and guides on the teachers and texts behind the practice, free to read in the app.',
  /** The three article titles are real library entries (content/library). */
  articles: [
    {
      slug: 'why-junoon-exists',
      kind: 'Article · 3 min',
      title: 'Why Junoon Exists',
      line: 'Junoon',
    },
    {
      slug: 'svatmarama-on-breath-and-mind',
      kind: 'Article · 6 min',
      title: 'Svātmārāma on Breath and Mind',
      line: 'Hatha Yoga Pradipika',
    },
    {
      slug: 'krishnamacharyas-method',
      kind: 'Guide',
      title: "Krishnamacharya's Method",
      line: 'The teacher of Iyengar, Pattabhi Jois and Indra Devi.',
    },
  ],
}

/* ── Section 9: pricing ──────────────────────────────────────────────────── */

export const PRICING = {
  eyebrow: 'Pricing',
  heading: 'Your first month is free.',
  body: 'Your first month is free, for everyone. The first 100 members get a founding price, theirs for life.',
  plans: [
    {
      name: 'Founders pricing',
      price: '$4.99 per month for the first 100 users',
      included: 'Lifetime deal, as a thank you from our junoon team',
    },
    {
      name: 'Post 100',
      price: '$8.99 per month',
      included: 'Everything included',
    },
  ],
}

/* ── Section 10: questions ───────────────────────────────────────────────── */

export const FAQ_COPY = {
  eyebrow: 'Questions',
  heading: 'Questions people ask.',
  items: [
    {
      q: 'What is Junoon?',
      a: "Junoon is a yoga, breathwork and meditation app rooted in India's eight limbs, with a coach that fits your practice to your real day.",
    },
    {
      q: 'Do I need to know yoga already?',
      a: 'No. Your first two weeks are for your coach to get to know you, and every level is welcome.',
    },
    {
      q: 'How does the coach work?',
      a: 'You tell it about your day, your body and your goals. It builds each session around the time and energy you have, and learns from what you finish and how it felt.',
    },
    {
      q: 'Is this medical advice?',
      a: 'No. Junoon offers wellness guidance, not medical advice. You must be 18 or older to use Junoon.',
    },
    {
      q: 'What does it cost?',
      a: "Your first month is free, for everyone. After that, it's $8.99 per month, with the exception of the first 100 users ($4.99).",
    },
    // The next three answers are agent drafts from the editable mock-up,
    // not yet confirmed by Arjav (marked DRAFT there). Listed as assumed.
    {
      q: 'Which phones does it work on?',
      a: 'Junoon works on iPhone, and you can get it on the App Store. Android is coming.',
    },
    {
      q: 'How do I cancel?',
      a: 'You can cancel any time in your iPhone settings. Open Settings, tap your name, then Subscriptions, choose Junoon and tap Cancel Subscription. You keep access until the end of the period you have paid for.',
    },
    {
      q: 'What happens to my information?',
      a: 'We keep what you give us so Junoon can fit your day: your name, email, the answers you give when you set up, your chats with your coach and your practice. Apple Health is used only if you connect it, and your health information is never used for ads. We do not sell your personal information for money. We measure which of our ads bring people to the app only if you tap Allow when it asks, and that never includes your health data. You can see and delete what your coach remembers, and delete your account any time: Settings, then Delete account at the bottom.',
    },
  ],
}

/* ── Section 11 and 12: download, footer ─────────────────────────────────── */

export const DOWNLOAD = {
  heading: 'Start your two weeks.',
  body: 'Your first month is free, for everyone. The first 100 members get a founding price, theirs for life.',
}

export const FOOTER_LEGAL =
  '© 2026 Junoon Wellness LLC · Junoon offers wellness guidance, not medical advice. You must be 18 or older to use Junoon.'
