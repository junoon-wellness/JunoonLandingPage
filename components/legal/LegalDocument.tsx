import NavV2 from "@/components/waitlist/NavV2";
import FooterV2 from "@/components/waitlist/FooterV2";
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

/**
 * LV5-074 (website refresh, scope phase 6): /privacy and /terms move from the
 * old cream light page onto the site's own two schemes, with the site nav
 * (and its Dark / Light switch) and footer. The TEXT is untouched: it comes
 * from lib/legalContent.ts, where the only change in this round is the
 * company name (LV5-073, PR #3) and the privacy date TODO (W10).
 *
 * ⚠️ /privacy is also the App Store's privacy-policy link, and /terms,
 * /privacy and /contact are App Store review requirements. Keep all three.
 */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <div id="top">
      <NavV2 />
      <main className="rf-doc">
        <header className="rf-doc-head">
          <h1 className="rf-doc-title">{doc.title}</h1>
          <p className="rf-doc-sub">
            {doc.subtitle} · {doc.updated}
          </p>
        </header>

        <article>
          {doc.blocks.map((block, i) => {
            switch (block.type) {
              case "h2":
                return <h2 key={i}>{block.text}</h2>;
              case "h3":
                return <h3 key={i}>{block.text}</h3>;
              case "p":
                return <p key={i}>{linkify(block.text)}</p>;
              case "ul":
                return (
                  <ul key={i}>
                    {block.items.map((item, j) => (
                      <li key={j}>
                        <span>{linkify(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              case "callout":
                return (
                  <div key={i} className="rf-doc-callout">
                    {block.paras.map((p, j) => (
                      <p key={j}>{linkify(p)}</p>
                    ))}
                  </div>
                );
              case "table":
                return (
                  <div key={i} style={{ marginTop: "22px", overflowX: "auto" }}>
                    <table>
                      <thead>
                        <tr>
                          {block.head.map((h, j) => (
                            <th key={j}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, r) => (
                          <tr key={r}>
                            {row.map((cell, c) => (
                              <td key={c}>{linkify(cell)}</td>
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
      </main>
      <FooterV2 />
    </div>
  );
}
