import Image from "next/image";
import Link from "next/link";
import {
  cardThumb,
  videoMinutes,
  videoSlug,
  type LibraryVideo,
} from "@/lib/videos";

/**
 * One class in the Videos tab's grid, after Glo's "Find your next class"
 * (Arnav, Sun 22 Nov 2026: "I want the videos to be listed on the page like
 * this (similar to how articles are)..."): a wide rounded still with small
 * dark chips at its bottom-left, the title, then "Teacher • Category". The
 * whole card links to the class's own page. A level chip shows only when the
 * class has a level.
 */
export default function ClassCard({ video: v }: { video: LibraryVideo }) {
  return (
    <Link href={`/library/videos/${videoSlug(v)}`} className="lb-vcard">
      <span className="lb-vcard-thumb">
        <Image
          src={cardThumb(v)}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="lb-vcard-chips">
          {v.level && <span className="lb-vcard-chip">{v.level}</span>}
          <span className="lb-vcard-chip">
            {videoMinutes(v.duration_seconds)} min
          </span>
        </span>
      </span>
      <span className="lb-vcard-title">{v.title}</span>
      <span className="lb-vcard-sub">
        {v.instructor} • {v.category}
      </span>
    </Link>
  );
}
