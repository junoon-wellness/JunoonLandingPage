/**
 * The big coach quote below the hero (LV5-074). Kush, round 3 (27 Sep):
 * "Big quote below the hero: Keep".
 *
 * The quote is the coach's own line from the App Store screenshot 03-coach,
 * the same conversation the hero phone plays. The ticket asks for the coach
 * chat to be labelled as an example, hence "(Example conversation.)".
 * The caption is a DRAFT for Arjav (round 3 wording).
 */
export default function CoachQuote() {
  return (
    <section className="rf-band rf-quote" aria-label="What the coach says">
      <div className="rf-band-inner">
        <blockquote>
          &ldquo;Sitting all afternoon shortens the front of the hip, so the evening is where you
          feel it. Try this one before dinner rather than before bed.&rdquo;
        </blockquote>
        <cite>
          The Junoon coach, to a member whose hips feel tight by evening. (Example conversation.)
        </cite>
      </div>
    </section>
  )
}
