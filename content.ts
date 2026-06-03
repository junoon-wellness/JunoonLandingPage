// ============================================================
// JUNOON LANDING PAGE — COPY & CONTENT
// All text for the page. Edit here first, then it flows
// into the components via props.
// ============================================================

export const meta = {
  title:       "Junoon — Ancient Practice, Personal Coaching",
  description: "An AI wellness coach that brings India's living traditions of yoga, breathwork, and meditation into a practice built around your modern life. Now in beta.",
  ogImage:     "/og-image.png",   // placeholder — add before launch
};

export const nav = {
  logo:    "Junoon",
  tagline: "Beta",
  links: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features",     href: "#features" },
  ],
  cta: { label: "Join waitlist", href: "#waitlist" },
};

// ============================================================
// LEFT PANEL — persistent CTA (sticky on desktop, top on mobile)
// ============================================================
export const ctaPanel = {
  monoLabel:   "Ancient practice · Now in Beta",
  headline:    "Ancient practice,\nbuilt around\nyou.",
  subheadline: "Junoon brings India's time-tested traditions of yoga, breathwork, and meditation into a personalised weekly plan, with on-demand sessions and guidance that adapts as you go.",

  waitlist: {
    heading:     "Join the waitlist",
    placeholder: "your@email.com",
    button:      "Get early access",
    success:     "You're on the list. We'll be in touch soon.",
    already:     "You're already on the list. We'll be in touch soon.",
    disclaimer:  "No spam. Early access only.",
  },

  socialProof: {
    count: "400+",
    label: "people already on the waitlist",
  },

  links: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
  ],

  appStore: {
    badge: "PLACEHOLDER_APP_STORE_BADGE",
    href:  "PLACEHOLDER_APP_STORE_LINK",
    note:  "Coming soon to the App Store",
  },
};

// ============================================================
// RIGHT PANEL — scrollable feature showcase
// Each section has a scroll-triggered animation
// ============================================================

// Hero section — shown at top of right panel
export const hero = {
  monoLabel:  "Ancient wisdom, modern intelligence",
  headline:   "Where ancient practice\nmeets modern life.",
  body:       "Junoon draws on India's living traditions of yoga, pranayama, and meditation, then shapes them around what you're carrying today: your stress, energy, and time. Your coach grows wiser every week.",
};

// Feature sections — each paired with a phone mockup screenshot
// Screenshots described below for the designer/photographer to capture
export const features = [
  {
    id:          "coach",
    monoLabel:   "Your AI Coach",
    headline:    "A coach that listens,\nthen plans.",
    body:        "Tell Junoon how you're feeling. It responds like a true guide, not a chatbot, drawing on time-tested practice to shape a weekly plan that adapts to what you share.",
    bullets: [
      "A personalised 7-day plan rooted in yoga and breathwork",
      "Adapts to stress, energy, and how your body feels",
      "Remembers your goals across every conversation",
    ],
    // SCREENSHOT INSTRUCTIONS:
    // Screen: CoachHomeView
    // Show the Coach tab with:
    //   - CoachHeaderSurface expanded (showing streak, minutes, video stats)
    //   - A few coach chat bubbles visible — one coach message and one user reply
    //   - The weekly plan card partially visible at the bottom
    // Mood: calm, warm, personal. Avoid showing any error states.
    screenshot: {
      file:    "screenshot-coach.png",
      alt:     "Junoon AI coach conversation showing a personalised weekly plan",
      status:  "captured",
    },
  },
  {
    id:          "practice",
    monoLabel:   "Practice",
    headline:    "Yoga, breathwork,\nand meditation.",
    body:        "On-demand sessions across every style and duration, from classical yoga and surya namaskar to pranayama and stillness. Filter by how you feel today, not just a category.",
    bullets: [
      "Sessions from 5 minutes to 60+",
      "Yoga, movement, breathwork, and stillness",
      "Progress tracking across every practice",
    ],
    // SCREENSHOT INSTRUCTIONS:
    // Screen: PracticeHomeView
    // Show:
    //   - The search bar at the top
    //   - Two or three video category rows (e.g. "Morning Flow", "Stress Relief")
    //   - At least one video card fully visible with thumbnail, title, instructor name, duration
    // Mood: organised, content-rich, browsable
    screenshot: {
      file:    "screenshot-practice.png",
      alt:     "Junoon practice library showing yoga and movement videos",
      status:  "captured",
    },
  },
  {
    id:          "weekly-plan",
    monoLabel:   "Weekly Plan",
    headline:    "Your next 7 days,\nalready planned.",
    body:        "Each week, your coach proposes a full schedule of practice and rest, sequenced in the rhythm of traditional practice. Swap anything, mark it done, or ask to change the pace. It's yours to adjust.",
    bullets: [
      "Proposed every week based on your check-in",
      "A balance of movement, breath, and rest",
      "Tap any item to begin straight from the plan",
    ],
    // SCREENSHOT INSTRUCTIONS:
    // Screen: WeeklyPlanCard inside CoachHomeView (or WeeklyPlanDetailView)
    // Show:
    //   - A full week view with 5-7 plan items listed
    //   - Each item showing title, type badge (video/article), and duration
    //   - At least one item marked as complete (checkmark visible)
    // Mood: structured, clean, achievable
    screenshot: {
      file:    "screenshot-plan.png",
      alt:     "Junoon weekly wellness plan with yoga and movement sessions",
      status:  "captured",
    },
  },
  {
    id:          "library",
    monoLabel:   "Library",
    headline:    "Ancient wisdom,\nwritten for today.",
    body:        "Articles and guides from teachers and practitioners, drawing on Ayurveda, yogic philosophy, and modern science. Recommended by your coach as you need them.",
    bullets: [
      "Wisdom on habits, mind, body, and breath",
      "Curated by your coach based on your goals",
      "Save anything to revisit later",
    ],
    // SCREENSHOT INSTRUCTIONS:
    // Screen: EducationHomeView or SavedLibraryView
    // Show:
    //   - A list of article cards with title, category label (e.g. "MENTAL HEALTH"), and short excerpt
    //   - At least one saved article with a bookmark indicator
    // Mood: editorial, warm, trustworthy
    screenshot: {
      file:    "screenshot-library.png",
      alt:     "Junoon article library with wellness guides and resources",
      status:  "captured",
    },
  },
];

// ============================================================
// HOW IT WORKS — simple 3-step section
// ============================================================
export const howItWorks = {
  monoLabel: "How it works",
  headline:  "Three steps to a practice that sticks.",
  steps: [
    {
      number: "01",
      title:  "Tell us about yourself",
      body:   "A quick 10-question onboarding covers your goals, energy levels, time available, and any physical considerations. Honest answers, not aspirational ones.",
    },
    {
      number: "02",
      title:  "Get your weekly plan",
      body:   "Your coach proposes a full 7-day schedule of yoga, breathwork, and rest, sequenced in the rhythm of traditional practice to match what you told us. Change anything at any time.",
    },
    {
      number: "03",
      title:  "Check in, adjust, repeat",
      body:   "Each week, you check in with your coach. How did it feel? What got in the way? The next plan adapts based on your real experience, not your intentions.",
    },
  ],
};

// ============================================================
// PILLARS — the three focus areas of the app
// ============================================================
export const pillars = {
  monoLabel: "What Junoon covers",
  headline:  "Wellness is more\nthan movement.",
  items: [
    {
      icon:  "leaf",     // use a simple SVG icon, see icons.ts
      label: "Habits",
      body:  "Build small, consistent rituals that compound over time. Morning routines, sleep, and mindful eating drawn from Ayurvedic wisdom.",
    },
    {
      icon:  "figure",
      label: "Movement",
      body:  "Yoga, mobility, and pranayama for all levels. On-demand sessions from 5 to 60 minutes.",
    },
    {
      icon:  "mind",
      label: "Mental Health",
      body:  "Meditation, mindfulness, and emotional balance. Ancient techniques, guided by teachers and calibrated by your coach.",
    },
  ],
};

// ============================================================
// TEACHERS — social proof / trust section
// ============================================================
export const teachers = {
  monoLabel: "The Teachers",
  headline:  "Real teachers.\nNot algorithms.",
  body:      "Junoon's library is built with practising yoga teachers and wellness experts steeped in tradition. The AI shapes the plan. Humans carry the lineage.",
  // PLACEHOLDER: Add teacher name, photo, and 1-line bio for 3-4 teachers
  // Format: { name: "...", role: "...", photo: "teacher-x.png" }
  items: [
    { name: "PLACEHOLDER_TEACHER_1", role: "PLACEHOLDER_ROLE", photo: "PLACEHOLDER_PHOTO" },
    { name: "PLACEHOLDER_TEACHER_2", role: "PLACEHOLDER_ROLE", photo: "PLACEHOLDER_PHOTO" },
    { name: "PLACEHOLDER_TEACHER_3", role: "PLACEHOLDER_ROLE", photo: "PLACEHOLDER_PHOTO" },
  ],
};

// ============================================================
// TESTIMONIALS (optional — add when available)
// ============================================================
export const testimonials = {
  monoLabel: "From the beta",
  headline:  "What people are saying.",
  // PLACEHOLDER: Add 3 short quotes from beta users
  // Format: { quote: "...", name: "...", handle: "..." }
  items: [
    { quote: "PLACEHOLDER_QUOTE_1", name: "PLACEHOLDER_NAME", handle: "" },
    { quote: "PLACEHOLDER_QUOTE_2", name: "PLACEHOLDER_NAME", handle: "" },
    { quote: "PLACEHOLDER_QUOTE_3", name: "PLACEHOLDER_NAME", handle: "" },
  ],
};

// ============================================================
// FOOTER
// ============================================================
export const footer = {
  tagline: "Ancient practice, built around you.",
  links: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact",          href: "mailto:admin@junoonwellness.com" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/junoonwellness/" },
  ],
  copyright: `© ${new Date().getFullYear()} Junoon Wellness. All rights reserved.`,
};
