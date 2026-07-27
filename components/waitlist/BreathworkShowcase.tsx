import PhoneFrame from './PhoneFrame'

const points = [
  'Ask in plain language — the coach reads the situation, not a keyword.',
  'Pick a length that fits the gap you actually have: 2, 3 or 5 minutes.',
  'Or start one yourself from anywhere in the app, no conversation needed.',
]

/**
 * One product moment mid-page. The two shots read as a sequence — ask on the
 * left, guided session on the right — so it shows the feature working rather
 * than describing it. Phones sit left here to alternate against
 * WhatWereBuilding, which leads with copy.
 */
export default function BreathworkShowcase() {
  return (
    <section className="v2-section v2-showcase" style={{ background: '#1C1410' }}>
      <div className="v2-showcase-phones" data-reveal>
        <PhoneFrame
          className="v2-showcase-phone-a"
          src="/screenshots/screenshot-breathwork-coach.png"
          alt="Asking the Junoon coach to start a breathing exercise and being offered two, three or five minute options"
          width={206}
        />
        <PhoneFrame
          className="v2-showcase-phone-b"
          src="/screenshots/screenshot-breathwork-session.png"
          alt="A guided Box Breathing session in progress, showing the inhale cue and cycle count"
          width={206}
        />
      </div>

      <div data-reveal data-reveal-stagger="1">
        <div className="eyebrow" style={{ marginBottom: '18px' }}>
          Breathwork on demand
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 400,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: '#F5F0E8',
            marginBottom: '18px',
          }}
        >
          Need to reset?{' '}
          <em style={{ fontStyle: 'italic', color: '#C8902A' }}>Just ask.</em>
        </h2>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 300,
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.75,
            maxWidth: '420px',
            marginBottom: '24px',
          }}
        >
          Tell the coach you&apos;re stretched thin between meetings and it starts a guided
          breathing session built around the time you actually have — not a generic timer.
        </p>

        <ul style={{ listStyle: 'none', display: 'grid', gap: '12px' }}>
          {points.map(p => (
            <li
              key={p}
              style={{
                display: 'grid',
                gridTemplateColumns: '16px 1fr',
                gap: '12px',
                alignItems: 'start',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.62)',
                lineHeight: 1.7,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#B5522A',
                  marginTop: '8px',
                }}
              />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
