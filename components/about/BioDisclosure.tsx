'use client'

import { useId, useState } from 'react'

/**
 * Kush, 2026-08-23: "for instructors hide their bios under green chevrons."
 * A small sage disclosure under each instructor's role line: closed by
 * default, the chevron flips while open. Only cards that HAVE a bio render
 * one (Durva's bio is still owed by the humans-inputs ticket, so her card
 * simply shows nothing extra — same as before).
 */
export default function BioDisclosure({ bio }: { bio: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div>
      <button
        type="button"
        className="ab-bio-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
      >
        Bio
        <svg
          className="ab-bio-chevron"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.5 6l4.5 4.5L12.5 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <p className="ab-person-bio" id={id}>
          {bio}
        </p>
      )}
    </div>
  )
}
