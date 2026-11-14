/**
 * Wraps every page so it fades in on arrival and on each move between pages
 * (Kush, Fri 13 Nov 2026: "polished transitions"). A template, unlike the
 * layout, mounts fresh on every navigation, which is what restarts the fade.
 * The fade is CSS only (`.pg-in`, app/theme.css) and is off with reduced
 * motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="pg-in">{children}</div>
}
