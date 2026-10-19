import Image from 'next/image'

/**
 * Arjav's founder quote, moved OUT of the hero by the refresh (LV5-074).
 * The 27 Sep scope: "Arjav's quote leaves the hero for its own quiet section
 * lower down." The words, photo and name line are unchanged from the hero
 * version (LV5-018). Where the quote finally lives (here, About, or nowhere)
 * is Arjav's call; About already carries his full founder letter.
 */
export default function FounderNote() {
  return (
    <section className="rf-band" aria-label="From our founder">
      <div className="rf-band-inner">
        <figure className="rf-founder" style={{ margin: 0 }}>
          <div className="rf-founder-photo">
            <Image
              src="/arjav-photo.jpg"
              alt="Arjav, founder of Junoon Wellness"
              width={192}
              height={192}
              sizes="96px"
            />
          </div>
          <div>
            <blockquote className="rf-founder-quote" style={{ margin: 0 }}>
              &ldquo;I spent years watching South Asian clients try platforms that just didn&apos;t
              speak to them. Junoon is what I wish existed when I started coaching.&rdquo;
            </blockquote>
            <figcaption className="rf-founder-name">Arjav · Founder, Junoon Wellness</figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}
