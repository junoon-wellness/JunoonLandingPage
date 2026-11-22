import Image from "next/image";
import ClassVideo from "@/components/library/ClassVideo";
import {
  isPreviewed,
  playbackSrc,
  posterSrc,
  PREVIEW_SECONDS,
  teacherHeadshot,
  videoMinutes,
  type LibraryVideo,
} from "@/lib/videos";
import { APP_STORE_URL } from "@/lib/constants";

export const APP_URL = "https://app.junoonwellness.com";

/**
 * One class (moved from the Videos tab to its own page, /library/videos/<slug>), laid out after Glo's class page (Arnav, Sun 22
 * Nov 2026): the player across the full width, with the 60 second preview pill
 * on it; then the title, the teacher's round photo beside "Teacher • Category"
 * and the length, and the class's own description. A Props or Level line shows
 * only when the snapshot has one. A row with a public stream or file plays
 * inline; any other row is its poster, linking to the app.
 */
export default function ClassBlock({ video: v }: { video: LibraryVideo }) {
  const minutes = videoMinutes(v.duration_seconds);
  const photo = teacherHeadshot(v.instructor);
  const src = playbackSrc(v);
  return (
    <article className="lb-class">
      {src ? (
        <div className="lb-card-thumb lb-class-player">
          <ClassVideo
            src={src}
            thumbnail={v.thumbnail_url}
            poster={posterSrc(v.thumbnail_url)}
            title={v.title}
            previewSeconds={isPreviewed(v) ? PREVIEW_SECONDS : null}
            fullMinutes={minutes}
            fullClassHref={APP_STORE_URL}
          />
        </div>
      ) : (
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lb-card-thumb lb-class-player"
        >
          <Image
            src={v.thumbnail_url}
            alt={v.title}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </a>
      )}
      <h3 className="lb-class-title">{v.title}</h3>
      <div className="lb-class-teacher">
        {photo && (
          <Image
            src={photo}
            alt=""
            width={44}
            height={44}
            className="lb-class-photo"
          />
        )}
        <div className="lb-class-meta">
          <span>
            {v.instructor} • {v.category}
          </span>
          <span>
            {minutes} min{v.level ? ` • ${v.level}` : ""}
          </span>
        </div>
      </div>
      {v.description && <p className="lb-class-desc">{v.description}</p>}
      {v.props && (
        <p className="lb-class-props">
          <strong>Props:</strong> {v.props}
        </p>
      )}
    </article>
  );
}
