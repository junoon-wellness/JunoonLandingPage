import Link from "next/link";
import type { ReactNode } from "react";
import type { LegalDoc } from "@/lib/legalContent";

// Turn emails and URLs inside a string into clickable links.
const TOKEN = /([\w.+-]+@[\w-]+\.[\w.-]+)|(https?:\/\/[^\s)]+)/g;

function linkify(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [match, email, url] = m;
    nodes.push(
      <a
        key={m.index}
        href={email ? `mailto:${email}` : url}
        className="text-clay underline underline-offset-2 hover:text-soil"
        {...(url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {match}
      </a>
    );
    last = m.index + match.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <main className="min-h-screen bg-cream px-6 py-14 text-bark sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-baseline gap-1 font-serif text-2xl font-light text-bark transition-colors hover:text-clay"
        >
          Junoon<span className="text-clay">.</span>
        </Link>

        <header className="mt-10 border-b border-linen pb-8">
          <h1 className="font-serif text-4xl font-normal leading-tight">{doc.title}</h1>
          <p className="mt-3 font-sans text-base text-soil">{doc.subtitle}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-driftwood">
            {doc.updated}
          </p>
        </header>

        <article className="mt-8">
          {doc.blocks.map((block, i) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2
                    key={i}
                    className="mt-10 font-serif text-2xl font-normal leading-snug text-bark"
                  >
                    {block.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3
                    key={i}
                    className="mt-6 font-serif text-xl font-normal leading-snug text-bark"
                  >
                    {block.text}
                  </h3>
                );
              case "p":
                return (
                  <p key={i} className="mt-4 font-sans text-base leading-relaxed text-soil">
                    {linkify(block.text)}
                  </p>
                );
              case "ul":
                return (
                  <ul key={i} className="mt-4 flex flex-col gap-2 pl-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3 font-sans text-base leading-relaxed text-soil">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                        <span>{linkify(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              case "callout":
                return (
                  <div
                    key={i}
                    className="mt-6 rounded-md border border-clay/30 bg-clayLight/40 px-5 py-4"
                  >
                    {block.paras.map((p, j) => (
                      <p
                        key={j}
                        className={`font-sans text-sm leading-relaxed text-soil${j > 0 ? " mt-3" : ""}`}
                      >
                        {linkify(p)}
                      </p>
                    ))}
                  </div>
                );
              case "table":
                return (
                  <div key={i} className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse text-left font-sans text-sm">
                      <thead>
                        <tr>
                          {block.head.map((h, j) => (
                            <th
                              key={j}
                              className="border-b border-clay/40 pb-2 pr-6 font-mono text-xs uppercase tracking-wide text-driftwood"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, r) => (
                          <tr key={r} className="align-top">
                            {row.map((cell, c) => (
                              <td
                                key={c}
                                className="border-b border-linen py-3 pr-6 leading-relaxed text-soil"
                              >
                                {linkify(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
            }
          })}
        </article>
      </div>
    </main>
  );
}
