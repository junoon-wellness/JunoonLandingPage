/**
 * The ornate wheel behind the ring of the limbs (Arnav, HQ DM Tue 17 Nov 2026:
 * "I want the wheel to look more artistic like this", with a picture of a gold
 * dharma wheel). An original drawing in that spirit, not a copy of the picture:
 * a double rim with a two-strand cord between, a ring of beads, seven carved
 * pillars for spokes (one at each limb's label), and a lotus round the hub.
 *
 * Everything is in the 0 0 100 100 box the ring's SVGs use, centred on 50,50;
 * angles are degrees clockwise from the top, the same as RING_LABELS. Pure
 * functions, no React, so the same numbers can be drawn outside the page.
 */

const C = 50
const f = (n: number) => n.toFixed(2)

/** A point at radius r and angle a (degrees from the top, clockwise). */
function polar(r: number, a: number): [number, number] {
  const t = (a * Math.PI) / 180
  return [C + r * Math.sin(t), C - r * Math.cos(t)]
}
const pt = (p: [number, number]) => `${f(p[0])} ${f(p[1])}`

/** The radii of every ring in the drawing, outside in. */
export const WHEEL_R = {
  rimOuter: 43,
  rimOuter2: 42.1,
  cord: 40.25,
  cordAmp: 0.95,
  rimInner2: 38.4,
  rimInner: 37.6,
  beads: 36.4,
  pillarTop: 35,
  pillarFoot: 26.6,
  hubOuter: 26,
  hubInner: 25,
  lotusBase: 19,
}

/** Two strands of a cord, crossing 48 times round the band. */
function cord(): { strands: string[]; knots: [number, number][] } {
  const waves = 48
  const steps = waves * 12
  const strands = [1, -1].map(sign => {
    let d = ''
    for (let s = 0; s <= steps; s++) {
      const a = (s / steps) * 360
      const r = WHEEL_R.cord + sign * WHEEL_R.cordAmp * Math.sin((a * waves * Math.PI) / 180)
      d += `${s === 0 ? 'M' : 'L'}${pt(polar(r, a))}`
    }
    return d + 'Z'
  })
  // a seed in every other eye of the cord
  const knots: [number, number][] = []
  for (let k = 0; k < waves; k += 1) {
    if (k % 2 === 0) knots.push(polar(WHEEL_R.cord, ((k + 0.5) * 360) / waves))
  }
  return { strands, knots }
}

/** Evenly spaced points on a circle, offset half a step from the top. */
function beads(r: number, n: number): [number, number][] {
  return Array.from({ length: n }, (_, i) => polar(r, ((i + 0.5) * 360) / n))
}

/** Short radial ticks between the hub's two rings. */
function ticks(r1: number, r2: number, n: number): string {
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n
    d += `M${pt(polar(r1, a))}L${pt(polar(r2, a))}`
  }
  return d
}

/** One lotus petal: base on the circle rb, pointed tip at rt. */
function petal(phi: number, hw: number, rb: number, rt: number): string {
  const d = rt - rb
  const p1 = polar(rb, phi - hw)
  const p2 = polar(rb, phi + hw)
  const tip = polar(rt, phi)
  return (
    `M${pt(p1)}` +
    `C${pt(polar(rb + d * 0.45, phi - hw * 1.25))} ${pt(polar(rt - d * 0.3, phi - hw * 0.45))} ${pt(tip)}` +
    `C${pt(polar(rt - d * 0.3, phi + hw * 0.45))} ${pt(polar(rb + d * 0.45, phi + hw * 1.25))} ${pt(p2)}`
  )
}

/** A carved pillar along angle a, from the foot (hub) to the top (rim):
 * a slab and a rounded torus at the foot, a slim shaft, a flared lotus
 * capital under a slab at the top. Returns its outline, the cross lines and
 * a centre flute, each a separate path so each can draw in. */
function pillar(a: number): { outline: string; bands: string; flute: string } {
  const r0 = WHEEL_R.pillarFoot
  const r1 = WHEEL_R.pillarTop
  const t = (a * Math.PI) / 180
  const dir = [Math.sin(t), -Math.cos(t)]
  const perp = [Math.cos(t), Math.sin(t)]
  const P = (u: number, v: number) => pt([C + u * dir[0] + v * perp[0], C + u * dir[1] + v * perp[1]])

  const side = (s: 1 | -1) => ({
    footSlab: P(r0 + 0.7, 1.9 * s),
    torusCtl: P(r0 + 1.55, 2.0 * s),
    shaftFoot: P(r0 + 1.9, 0.95 * s),
    shaftTop: P(r1 - 2.3, 0.8 * s),
    capCtl: P(r1 - 1.0, 0.85 * s),
    capTop: P(r1 - 0.8, 1.9 * s),
    slabIn: P(r1 - 0.8, 2.3 * s),
    slabOut: P(r1, 2.3 * s),
  })
  const L = side(-1)
  const R = side(1)
  const outline =
    `M${P(r0, -1.9)}L${P(r0, 1.9)}L${R.footSlab}` +
    `Q${R.torusCtl} ${R.shaftFoot}L${R.shaftTop}Q${R.capCtl} ${R.capTop}` +
    `L${R.slabIn}L${R.slabOut}L${L.slabOut}L${L.slabIn}L${L.capTop}` +
    `Q${L.capCtl} ${L.shaftTop}L${L.shaftFoot}Q${L.torusCtl} ${L.footSlab}Z`
  const bands =
    `M${P(r0 + 0.7, -1.9)}L${P(r0 + 0.7, 1.9)}` +
    `M${P(r0 + 2.4, -0.94)}L${P(r0 + 2.4, 0.94)}` +
    `M${P(r1 - 2.8, -0.81)}L${P(r1 - 2.8, 0.81)}` +
    `M${P(r1 - 0.8, -1.9)}L${P(r1 - 0.8, 1.9)}`
  const flute = `M${P(r0 + 2.9, 0)}L${P(r1 - 3.3, 0)}`
  return { outline, bands, flute }
}

export type Wheel = ReturnType<typeof buildWheel>

/** The whole drawing, with one pillar at each of the given angles. */
export function buildWheel(angles: number[]) {
  const { strands, knots } = cord()
  // the lotus: two petals per limb, each with an inner contour, and a slim
  // back petal peeking out of every notch between them
  const count = angles.length * 2
  const step = 360 / count
  const rb = WHEEL_R.lotusBase
  const rt = WHEEL_R.hubInner - 0.7
  const hw = step / 2 - 1.2
  const centres = Array.from({ length: count }, (_, i) => angles[0] + i * step)
  const outer = centres.map(phi => petal(phi, hw, rb, rt))
  const inner = centres.map(phi => petal(phi, hw * 0.5, rb, rb + (rt - rb) * 0.62))
  const back = centres.map(phi => {
    const notch = phi + step / 2
    const rn = rb + (rt - rb) * 0.5
    return `M${pt(polar(rn, notch - 1.6))}L${pt(polar(WHEEL_R.hubInner - 0.25, notch))}L${pt(polar(rn, notch + 1.6))}`
  })
  return {
    cord: strands,
    knots,
    beads: beads(WHEEL_R.beads, 84),
    hubTicks: ticks(WHEEL_R.hubInner, WHEEL_R.hubOuter, 98),
    lotusOuter: outer.join(''),
    lotusInner: inner.join(''),
    lotusBack: back.join(''),
    pillars: angles.map(pillar),
  }
}
