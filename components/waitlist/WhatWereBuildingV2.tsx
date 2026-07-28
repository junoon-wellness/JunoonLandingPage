const features = [
  {
    num: '01',
    title: 'Live and on-demand classes',
    body: 'Yoga, meditation, pranayama, and breathwork. Taught live, available on demand, at every level and around real schedules.',
  },
  {
    num: '02',
    title: 'AI Coach',
    body: 'Personalises your practice to your body, your schedule, and your habits. The kind of guidance that used to require a personal teacher.',
  },
  {
    num: '03',
    title: 'Science-backed education',
    body: 'Weekly articles explaining the why behind South Asian wellness traditions. Plain English. No mysticism.',
  },
  {
    num: '04',
    title: 'A community that gets it',
    body: 'Built for people who grew up between two worlds and want a practice that reflects both. No explaining required.',
  },
]

export default function WhatWereBuildingV2() {
  return (
    <section className="v2-section" style={{ background: '#1C1410' }}>
      <div className="eyebrow" style={{ marginBottom: '40px' }}>
        What we&apos;re building
      </div>

      <div className="v2-two-col" style={{ alignItems: 'start' }}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              color: '#F5F0E8',
              marginBottom: '20px',
            }}
          >
            A practice that{' '}
            <em style={{ fontStyle: 'italic', color: '#C8902A' }}>knows you.</em>
          </h2>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.75,
              maxWidth: '420px',
            }}
          >
            Junoon brings together yoga, pranayama, Ayurveda and breathwork with an AI Coach that
            makes expert guidance personal. Not a library you browse through. A practice that
            adapts to you.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {features.map((f, i) => (
            <div
              key={f.num}
              style={{
                borderTop: '0.5px solid rgba(245,240,232,0.08)',
                borderBottom:
                  i === features.length - 1 ? '0.5px solid rgba(245,240,232,0.08)' : 'none',
                padding: '20px 0',
                display: 'grid',
                gridTemplateColumns: '34px 1fr',
                gap: '16px',
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '11px',
                  color: '#B5522A',
                  paddingTop: '4px',
                }}
              >
                {f.num}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '19px',
                    fontWeight: 500,
                    color: '#F5F0E8',
                    marginBottom: '5px',
                    lineHeight: 1.25,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'rgba(245,240,232,0.62)',
                    lineHeight: 1.7,
                  }}
                >
                  {f.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
