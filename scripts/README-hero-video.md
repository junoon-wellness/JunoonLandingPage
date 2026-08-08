# Rebuilding the mock hero video

`public/hero/mock-tour.mp4` is 8 screens captured from the `/tour` walkthrough
and assembled into a ~15s loop (v4 ticket LV4-014).

⚠️ **It is a MOCK.** The walkthrough is a stylised recreation of the app, not
real app pixels. It exists so the motion concept can be judged, and so the
video path in `PhoneScreen` is exercised before Kush's real recording lands.
Replacing it with the real thing is one entry (`HERO_SCREEN` in
`lib/screens.ts`) plus two files, and these scripts become unnecessary.

## Rebuild

```bash
# 1. dev server must be up (the capture drives /tour-embed on :3006)
npm run dev

# 2. capture the 8 stills  (needs puppeteer-core + system Chrome)
node scripts/hero-video-capture.mjs

# 3. assemble + poster
./scripts/hero-video-assemble.sh

# 4. copy out/ into public/hero/
```

`puppeteer-core` is deliberately NOT a dependency of this project: it was
installed in a scratch directory for the one-off capture. Install it wherever
you run the script.

## Two things that are easy to get wrong

1. **The wrap copy must not zoom.** Every segment ramps 1.00 -> 1.03. The 9th
   segment is a repeat of frame 1 that closes the loop, and if it zooms too,
   the last frame sits at a different scale from frame 0 and the loop pops.
   Measured: with the zoom on it, the seam was 17.3 mean-abs-diff; with it off,
   0.78 (and that residual scales with CRF, i.e. it is codec noise, not motion).
2. **Trim past the final crossfade, not to it.** Cutting exactly at the crossfade
   end leaves the last frame ~96% of the way through the blend. The extra 0.2s
   tail lets it resolve to a clean frame 1.

## Finding the phone in the walkthrough

The screen is the one `div` measuring 393x852 with `overflow: hidden`. Do not
key off its border-radius: the script squares the corners (the hero bezel does
the rounding), which makes a radius-based selector fail on every step after the
first.
