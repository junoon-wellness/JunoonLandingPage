'use client'

import Image from 'next/image'

export default function NavV2() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px 48px',
        background: 'rgba(28,20,16,0.78)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid rgba(245,240,232,0.07)',
      }}
      className="v2-nav"
    >
      <a
        href="#top"
        className="v2-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <Image
          src="/logo-turmeric-text.png"
          alt="Junoon"
          width={112}
          height={32}
          style={{ height: '26px', width: 'auto' }}
          loading="eager"
        />
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span
          className="nav-pill v2-pill"
          style={{
            fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#B5522A',
            border: '0.5px solid rgba(181,82,42,0.35)',
            borderRadius: '100px',
            padding: '6px 14px',
            whiteSpace: 'nowrap',
          }}
        >
          Pre-launch · 2026
        </span>

        <a
          href="#join"
          className="v2-btn v2-link"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            minHeight: '38px',
            fontSize: '12px',
          }}
        >
          Join waitlist
        </a>
      </div>
    </nav>
  )
}
