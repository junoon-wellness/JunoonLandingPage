/**
 * LV5-017 — a small hand-rolled markdown-to-HTML renderer for the /library
 * reader pages, ported from the app repo's
 * `components/resources/resource-detail.tsx` (same escaping + inline-format
 * + block logic) rather than adding a markdown dependency like `marked`.
 * The pulled article content (see scripts/pull-library.mjs) is plain prose
 * with occasional `#`/`##`/`###` headings and `- ` lists, so this small
 * parser covers everything actually present in the 20 real articles.
 */

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const withInlineFormatting = (raw: string) => {
  let html = escapeHtml(raw)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.+?)`/g, '<code>$1</code>')
  return html
}

export function markdownToHtml(raw: string): string {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const current = lines[i].trim()
    if (!current) {
      i += 1
      continue
    }

    const heading = current.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      out.push(`<h${level}>${withInlineFormatting(heading[2])}</h${level}>`)
      i += 1
      continue
    }

    if (current.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length) {
        const line = lines[i].trim()
        if (!line.startsWith('- ')) break
        items.push(`<li>${withInlineFormatting(line.slice(2).trim())}</li>`)
        i += 1
      }
      out.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    const paragraph: string[] = []
    while (i < lines.length) {
      const line = lines[i].trimEnd()
      if (!line.trim()) {
        i += 1
        break
      }
      if (/^(#{1,3})\s+/.test(line.trim()) || line.trim().startsWith('- ')) break
      paragraph.push(line.trim())
      i += 1
    }
    out.push(`<p>${withInlineFormatting(paragraph.join('<br />'))}</p>`)
  }

  return out.join('')
}
