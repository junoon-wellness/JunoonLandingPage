import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = new URL('./frames/', import.meta.url).pathname;
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const SHOTS = [
  { i: 2,  name: '01-the-way-in' },
  { i: 4,  name: '02-onboarding' },
  { i: 13, name: '03-plan-reveal' },
  { i: 16, name: '04-plan-tab' },
  { i: 23, name: '05-edit-sheet' },
  { i: 26, name: '06-coach' },
  { i: 32, name: '07-library' },
  { i: 36, name: '08-ritual' },
];

const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
await p.goto('http://localhost:3006/tour-embed/index.html', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 3500));

await p.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find(x => /highlights/i.test(x.textContent || ''));
  if (btn && /on/i.test(btn.textContent)) btn.click();
});
await new Promise(r => setTimeout(r, 400));

// Find the screen ONCE, by geometry only, and tag it. Keying off border-radius
// broke the moment the first capture squared its corners.
const box = await p.evaluate(() => {
  const el = [...document.querySelectorAll('div')].find(d => {
    const r = d.getBoundingClientRect();
    return Math.abs(r.width - 393) < 2 && Math.abs(r.height - 852) < 2 &&
           getComputedStyle(d).overflow === 'hidden';
  });
  if (!el) return null;
  el.id = 'jn-shot-target';
  el.style.borderRadius = '0';          // the hero's own bezel does the rounding
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});
if (!box) { console.error('FATAL: phone screen not found'); await b.close(); process.exit(1); }
console.log('phone screen:', JSON.stringify(box));

let ok = 0;
for (const s of SHOTS) {
  await p.evaluate(i => document.querySelectorAll('button')[i].click(), s.i);
  await new Promise(r => setTimeout(r, 1500));
  // Re-read the rect each time in case a step nudges layout, but the element
  // itself is the tagged one, so it can never go "missing" again.
  const live = await p.evaluate(() => {
    const el = document.getElementById('jn-shot-target');
    if (!el) return null;
    el.style.borderRadius = '0';
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  if (!live) { console.error('  lost target at step', s.i); continue; }
  await p.screenshot({ path: `${OUT}${s.name}.png`, clip: { ...live, scale: 2 } });
  const label = await p.evaluate(i => (document.querySelectorAll('button')[i].textContent || '').trim(), s.i);
  console.log(`  ${s.name}  <- "${label}"`);
  ok++;
}
console.log(`\ncaptured ${ok}/${SHOTS.length}`);
await b.close();
