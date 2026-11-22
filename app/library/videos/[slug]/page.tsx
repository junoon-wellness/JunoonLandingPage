import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import PageCrest from "@/components/site/PageCrest";
import SiteFooter from "@/components/site/SiteFooter";
import ClassBlock from "@/components/library/ClassBlock";
import { getLibraryVideos, getVideoBySlug, videoSlug } from "@/lib/videos";
import { clean } from "@/lib/text";

/**
 * A class's own page. Arnav, Sun 22 Nov 2026: "...when you click into it you
 * get the view with more information." Statically generated from
 * content/videos.json; the block is the one the Videos tab used to stack.
 */
export function generateStaticParams() {
  return getLibraryVideos().map((v) => ({ slug: videoSlug(v) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideoBySlug(slug);
  if (!v) return { title: clean("Library - Junoon") };
  return {
    title: clean(`${v.title} - Junoon Library`),
    description: clean(v.description ?? `${v.title} with ${v.instructor}`),
  };
}

export default async function ClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = getVideoBySlug(slug);
  if (!v) notFound();
  return (
    <div id="top">
      <SiteHeader current="/library" />
      <PageCrest />
      <section className="lb-grid-section lb-classpage" aria-label={v.title}>
        <div className="lb-classes">
          <Link
            href="/library"
            className="v2-link lb-reader-back lb-class-back"
          >
            ← Back to classes
          </Link>
          <ClassBlock video={v} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
