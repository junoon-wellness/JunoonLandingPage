const pillars = [
  {
    glyph: 'प्राण',
    title: 'Breath & Movement',
    body: 'Yoga and pranayama as daily practice tools — not performance. Explained functionally. Taught for real schedules.',
    accent: '#B5522A',
  },
  {
    glyph: 'विज्ञान',
    title: 'Ancient Meets Modern',
    body: 'What was passed down to you, explained by the science that now confirms it. Plain English. No mysticism.',
    accent: '#C8902A',
  },
  {
    glyph: 'संघ',
    title: 'Community & Practice',
    body: 'Real people. Real practices. A community built around showing up — not transformation.',
    accent: '#B5A898',
  },
]

export default function PillarsV2() {
  return (
    <section
      className="v2-section-tight"
      style={{ position: 'relative', zIndex: 2, background: '#1C1410', paddingTop: 0 }}
    >
      <div data-reveal className="v2-pillars">
        {pillars.map((p, i) => (
          <div
            key={p.glyph}
            className="pillar-card-v2"
            style={{
              padding: '32px 28px',
              borderRight:
                i < pillars.length - 1 ? '0.5px solid rgba(245,240,232,0.09)' : 'none',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.35s ease',
              ['--pillar-accent' as string]: p.accent,
            }}
          >
            {/* Devanagari is now a small label beside the title rather than a
                dominant glyph — and in a font that can actually render it. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                marginBottom: '9px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#F5F0E8',
                  letterSpacing: '-0.005em',
                }}
              >
                {p.title}
              </span>
              <span className="v2-deva" aria-hidden="true">
                {p.glyph}
              </span>
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.62)',
                lineHeight: 1.7,
              }}
            >
              {p.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
