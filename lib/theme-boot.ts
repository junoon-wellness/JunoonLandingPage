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
 * It also reads the review switches (Kush picks between drawn variations on
 * the review page). Each is a `data-*` on <html>, defaults are our picks:
 *   ?pin=place|none        the hero map: a small named place, or no mark
 *   ?join=bar|none         the hero: a timer bar under the feature that is on
 *   ?ground=black|brown    Dark on Pricing, About, Library: near-black like the
 *                          home page and the app, or the rich brown of 9 Nov
 *   ?light=latte|ivory     Light: the app's latte ground, or a paler ivory
 *   ?review=1              shows the small switcher panel (ReviewSwitch.tsx)
 * Unknown values fall back to the default. Nothing here is personal data.
 *
 * Kept as a plain string (no imports, ES5) because it is injected as-is.
 */
export const THEME_STORAGE_KEY = 'jn-theme'

export const REVIEW_SWITCHES = {
  pin: ['place', 'none'],
  join: ['bar', 'none'],
  ground: ['black', 'brown'],
  light: ['latte', 'ivory'],
} as const

export type ReviewSwitch = keyof typeof REVIEW_SWITCHES

export const THEME_BOOT = `(function(){try{
var d=document.documentElement,q=new URLSearchParams(location.search),t=q.get('theme'),s=null;
try{s=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}
if(t!=='light'&&t!=='dark'){t=(s==='light'||s==='dark')?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
d.dataset.theme=t;
var v=${JSON.stringify(REVIEW_SWITCHES)};
for(var k in v){var x=q.get(k);d.dataset[k]=v[k].indexOf(x)>=0?x:v[k][0]}
if(q.get('review')==='1')d.dataset.review='1';
}catch(e){document.documentElement.dataset.theme='dark'}})();`
