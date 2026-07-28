// public/arjav-photo.jpg is a 400x400 crop of the source photo, centred on the
// face. The source was a wide seated shot, so it needed cropping rather than
// dropping in as-is.
const SHOW_PHOTO = true

export default function FounderBlockV2() {
  return (
    <section
      className="v2-section v2-founder"
      style={{
        background: '#1C1410',
        borderTop: '0.5px solid rgba(245,240,232,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '36px',
      }}
    >
      <div
        data-reveal
        data-reveal-direction="left"
        className="v2-founder-photo"
        style={{
          background: '#2C2118',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '0.5px solid rgba(245,240,232,0.12)',
          overflow: 'hidden',
        }}
      >
        {SHOW_PHOTO ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/arjav-photo.jpg"
            alt="Arjav, founder of Junoon Wellness"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '26px',
              fontWeight: 400,
              color: '#C8902A',
            }}
          >
            A
          </span>
        )}
      </div>

      <div
        data-reveal
        data-reveal-direction="right"
        data-reveal-stagger="1"
        className="v2-founder-text"
        style={{ maxWidth: '540px' }}
      >
        <blockquote
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '21px',
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.85)',
            lineHeight: 1.5,
            marginBottom: '14px',
            fontWeight: 400,
          }}
        >
          &ldquo;I spent years watching South Asian clients try platforms that just didn&apos;t
          speak to them. Junoon is what I wish existed when I started coaching.&rdquo;
        </blockquote>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#F5F0E8',
            letterSpacing: '0.04em',
          }}
        >
          Arjav · Founder, Junoon Wellness
        </div>
        <div
          style={{
            fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8C7B6B',
            marginTop: '5px',
          }}
        >
          Yoga instructor · 80+ coaching clients
        </div>
      </div>
    </section>
  )
}
