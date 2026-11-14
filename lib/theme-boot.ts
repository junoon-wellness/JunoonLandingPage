/**
 * Light and Dark for the whole site (Kush, Fri 13 Nov 2026: "please ensure
 * the light mode version is a toggle I can switch to for the whole website").
 *
 * This runs as an inline script in <head>, before the first paint, so a
 * visitor never sees the wrong theme flash. The order it decides in:
 *   1. `?theme=light` or `?theme=dark` in the address (review links; not saved)
 *   2. the visitor's own choice from the toggle (localStorage `jn-theme`)
 *   3. the visitor's system setting (prefers-color-scheme)
 * It writes `data-theme` on <html>; app/theme.css reads it.
 *
 * Kush settled every drawn variation by 7:36 PM Fri 13 Nov (rounds 2 to 4),
 * so the review switches and their panel are gone; only `?theme=` remains,
 * for review links. Nothing here is personal data.
 *
 * Kept as a plain string (no imports, ES5) because it is injected as-is.
 */
export const THEME_STORAGE_KEY = 'jn-theme'

export const THEME_BOOT = `(function(){try{
var d=document.documentElement,q=new URLSearchParams(location.search),t=q.get('theme'),s=null;
try{s=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}
if(t!=='light'&&t!=='dark'){t=(s==='light'||s==='dark')?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
d.dataset.theme=t;
}catch(e){document.documentElement.dataset.theme='dark'}})();`
