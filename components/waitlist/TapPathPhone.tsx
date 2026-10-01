'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

/**
 * THE HERO PHONE: PATH 1, STITCHED FROM STILLS IN CODE (LV5-074)
 *
 * Kush's round 3 picks (27 Sep, verbatim): "Path 1 Coach first (default):
 * Keep · How it plays: Loops quietly · Build it from: Stills stitched in
 * code". So: the coach conversation, then Home (tap "Start" on the hips
 * card), then the before-the-session screen (tap "Start"), then the session
 * playing, then the coach between clips, and round again. It loops, so a
 * visible Pause is required (WCAG 2.2.2, motion over 5 seconds).
 *
 * Ported from the round 3 review page's `TapEngine`
 * (handoffs/2026-09-27/website-refresh/round3/tappath.html). Every frame is
 * computed from the clock alone, so pause, resume and reduced motion all
 * draw from the same function. Screens are laid out at 402 x 812 pt (the App
 * Store screenshot size) and scaled to the phone.
 *
 * REAL vs DRAWN (round 3 NOTES.md):
 *   coach chat     rebuilt in HTML, word for word from App Store shot 03-coach
 *   Home           real App Store 1.0.5 capture (01-home)
 *   before session DRAWN from the V5 code, not a screenshot
 *   session player real App Store 1.0.5 capture (04-session)
 *   between clips  real player capture with the coach card DRAWN over it
 *
 * 🔴 W6 (Kush, 1 Oct: "Build with the drawn screens on the preview; real
 * captures before it goes live"). The two drawn steps are therefore
 * DROPPED on the live domain (junoonwellness.com) by `isLiveSite()` below,
 * so a merge that lands before the screenshot run cannot put a drawing in
 * front of the public. On the live site the loop is coach, Home, session.
 * When the real captures exist: swap them into public/screenshots/tappath/
 * as plain images, and delete the live-site filter.
 *
 * The images were checked for the iOS status bar and the BETA badge: none.
 * App Store version 1.05 (with the Library tab these shots show) has been
 * live since 29 Sep 2026 (itunes lookup, read 1 Oct).
 */

const IMG = '/screenshots/tappath'
const SW = 402
const SH = 812

type ScreenId = 'coach' | 'home' | 'pre' | 'player' | 'dj'
type Transition = 'cut' | 'push' | 'up' | 'fade' | null

interface Step {
  s: ScreenId
  /** seconds on screen */
  d: number
  /** how this screen arrives */
  tr: Transition
  /** caption under the phone (DRAFT words, for Arjav) */
  cap: string
  /** a tap: seconds into the step, and where (stage pt), or a selector */
  tap?: { at: number; x: number; y: number; sel?: string }
  /** coach only: when each chat item appears (null = never) */
  times?: (number | null)[]
  drawn?: boolean
}

/* The conversation is copied word for word from the App Store screenshot
   03-coach (26 Sep). The last message is left out of Path 1, as in round 3. */
const CHAT: { k: 'cm' | 'me' | 'pk'; t?: string }[] = [
  {
    k: 'cm',
    t: 'Good to see you back. Your lower back has had three sessions this week, which is more than the two before it, and it is starting to show up in how you describe your mornings.',
  },
  { k: 'me', t: 'mornings have been easier. my hips still feel tight by the evening though' },
  {
    k: 'cm',
    t: 'That tracks. Sitting all afternoon shortens the front of the hip, so the evening is where you feel it. Try this one before dinner rather than before bed.',
  },
  { k: 'pk' },
  { k: 'me', t: 'ok, adding it to tonight' },
  { k: 'cm', t: 'Good. I will keep the wind down after it so you finish soft.' },
]
/* Example line for the drawn between-clips card (round 3: "my example"). */
const DJLINE = 'Lie back with your feet on the wall. Cross your right ankle over your left knee.'

/* Path 1. Captions are drafts: the first, second and fourth are the site's
   or the App Store's own words; the third and fifth are new (round 3). */
const PATH_1: Step[] = [
  { s: 'coach', d: 7.6, tr: null, times: [1.3, 2.9, 4.5, 5.6, 6.6, null], cap: 'A coach that learns your week.' },
  { s: 'home', d: 3.8, tr: 'cut', tap: { at: 2.7, x: 95, y: 182 }, cap: 'Everything that matters, on one page.' },
  { s: 'pre', d: 3.6, tr: 'push', tap: { at: 2.6, x: 297, y: 757, sel: '.go' }, cap: 'A session built around how you feel.', drawn: true },
  { s: 'player', d: 3.8, tr: 'up', cap: 'Taught by people who know the tradition.' },
  { s: 'dj', d: 6.6, tr: 'fade', cap: 'Between poses, your coach talks you into the next one.', drawn: true },
]

function isLiveSite() {
  return /(^|\.)junoonwellness\.com$/i.test(window.location.hostname)
}

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x))
const ease = (p: number) => {
  p = clamp(p, 0, 1)
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
}
const eo = (p: number) => 1 - Math.pow(1 - clamp(p, 0, 1), 3)

/* The drawn setup figure (stand-in; the app draws its own, JV3-844).
   Points: head, shoulder, elbow, wrist, hip, knee, ankle, toe. */
const POSE = {
  kneel: [[166, 60], [160, 102], [172, 160], [202, 196], [142, 206], [230, 224], [140, 238], [108, 242]],
  lie: [[44, 222], [84, 226], [120, 242], [160, 244], [172, 228], [222, 166], [262, 236], [292, 242]],
}
function figSVG(p: number) {
  const q = POSE.kneel.map((v, i) => [v[0] + (POSE.lie[i][0] - v[0]) * p, v[1] + (POSE.lie[i][1] - v[1]) * p])
  const P = (i: number) => `${q[i][0].toFixed(1)} ${q[i][1].toFixed(1)}`
  return (
    '<path d="M20 254 L300 254" stroke="rgba(245,240,232,.28)" stroke-width="6" fill="none"/>' +
    `<path d="M${P(0)} L${P(1)} L${P(4)} L${P(5)} L${P(6)} L${P(7)} M${P(1)} L${P(2)} L${P(3)}" stroke="#F5F0E8" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="${q[0][0].toFixed(1)}" cy="${q[0][1].toFixed(1)}" r="24" fill="#0A0705" stroke="#F5F0E8" stroke-width="15"/>`
  )
}

type Draw = (t: number) => void

/** Builds one screen's DOM into L and returns its draw-at-time function. */
function buildScreen(L: HTMLDivElement, st: Step, rm: boolean): Draw {
  switch (st.s) {
    case 'coach': {
      let h = '<div class="tp-coach"><p class="tm">9:57 AM</p>'
      CHAT.forEach((m, i) => {
        if (m.k === 'pk')
          h += `<div class="it pk" data-i="${i}"><div class="top"><span>COACH PICK</span><span>Class</span></div><b>Hip Opening Flow</b><span class="d">A grounded mobility practice for desk-heavy days.</span><div class="act"><span>Not for me</span><span class="go">Open practice &rarr;</span></div></div>`
        else if (m.k === 'me') h += `<p class="it me" data-i="${i}">${m.t}</p>`
        else h += `<div class="it cm" data-i="${i}"><div class="typing"><i></i><i></i><i></i></div><p class="tx">${m.t}</p></div>`
      })
      h += `<div class="inp"><span>Message your coach...</span><img src="${IMG}/tree.png" alt=""></div></div>`
      L.innerHTML = h
      const its = Array.from(L.querySelectorAll<HTMLElement>('.it'))
      const T = st.times ?? []
      its.forEach((e, i) => {
        if (T[i] === null || T[i] === undefined) e.style.display = 'none'
      })
      return t => {
        its.forEach((e, i) => {
          const at = T[i]
          if (at === null || at === undefined) return
          const fade = e.classList.contains('cm') ? (e.querySelector<HTMLElement>('.tx') ?? e) : e
          const ty = e.querySelector<HTMLElement>('.typing')
          const p = at < 0 ? 1 : rm ? (t >= at ? 1 : 0) : eo((t - at) / 0.45)
          fade.style.opacity = String(p)
          fade.style.transform = p < 1 && !rm ? `translateY(${((1 - p) * 8).toFixed(2)}px)` : ''
          if (ty) {
            const on = at >= 0 && t >= at - 1.05 && t < at
            ty.style.display = on ? 'flex' : 'none'
            if (on)
              Array.from(ty.children).forEach((d, k) => {
                ;(d as HTMLElement).style.opacity = rm
                  ? '0.6'
                  : (0.28 + 0.72 * Math.max(0, Math.sin(t * 6.3 - k * 0.9))).toFixed(2)
              })
          }
        })
      }
    }
    case 'home':
      L.innerHTML = `<img class="tp-img" src="${IMG}/scr-home.jpg" alt="">`
      return () => {}
    case 'player': {
      L.innerHTML = `<img class="tp-img" src="${IMG}/scr-session.jpg" alt=""><div class="tp-band"><img src="${IMG}/scr-session.jpg" alt=""></div>`
      const bi = L.querySelector<HTMLElement>('.tp-band img')
      return t => {
        if (bi) bi.style.transform = rm ? '' : `scale(${(1 + 0.045 * clamp(t / st.d, 0, 1)).toFixed(4)})`
      }
    }
    case 'pre':
      L.innerHTML =
        '<div class="tp-pre"><div class="top"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></div>' +
        `<div class="fig0"><img src="${IMG}/twin-figure.jpg" alt=""></div><p class="eb">EVENING · 27 MIN · AT HOME</p>` +
        '<p class="tt">Maya\'s evening hips and lower back session</p><div class="chips"><span>HIPS</span><span>LOWER BACK</span></div>' +
        '<p class="ds">Hips and lower back, then a calm finish. About 27 minutes.</p>' +
        '<div class="pcta"><span class="add">+&nbsp; Add to plan · Today</span><span class="go">Start</span></div></div>'
      return () => {}
    case 'dj': {
      const C = 2 * Math.PI * 29.5
      L.innerHTML =
        `<img class="tp-img" src="${IMG}/scr-session.jpg" alt=""><div class="tp-card"><div class="sp"></div><div class="tr"><svg class="ring" viewBox="0 0 62 62"><circle cx="31" cy="31" r="29.5"/></svg><svg class="fig" viewBox="0 0 320 300"></svg></div>` +
        '<p class="ln"><span class="ink"></span><span class="tail"></span></p><div class="sp"></div><span class="phz">Pause here</span></div>'
      const ring = L.querySelector<SVGCircleElement>('.ring circle')
      const fig = L.querySelector<SVGSVGElement>('.fig')
      const ink = L.querySelector<HTMLElement>('.ink')
      const tail = L.querySelector<HTMLElement>('.tail')
      let lastF = -1
      return t => {
        const f = clamp(1 - t / (st.d + 0.8), 0, 1)
        if (ring) ring.style.strokeDasharray = `${(f * C).toFixed(2)} ${C.toFixed(2)}`
        const mp = rm ? 1 : ease((t - 0.3) / 4.6)
        if (fig && Math.abs(mp - lastF) > 0.002) {
          fig.innerHTML = figSVG(mp)
          lastF = mp
        }
        const n = rm ? DJLINE.length : Math.round(DJLINE.length * clamp((t - 0.7) / 4.2, 0, 1))
        if (ink) ink.textContent = DJLINE.slice(0, n)
        if (tail) tail.textContent = DJLINE.slice(n)
      }
    }
  }
}

interface Engine {
  play: () => void
  pause: () => void
  destroy: () => void
}

function mount(host: HTMLDivElement, bar: HTMLDivElement, steps: Step[], width: number, rm: boolean): Engine {
  const inner = width - 20
  const sc = inner / SW
  const vh = Math.round((inner * SH) / SW)

  const ph = document.createElement('div')
  ph.className = 'tp-phone'
  ph.style.width = `${width}px`
  const view = document.createElement('div')
  view.className = 'tp-view'
  view.style.height = `${vh}px`
  ph.appendChild(view)
  const stage = document.createElement('div')
  stage.className = 'tp-stage'
  stage.style.transform = `scale(${sc})`
  view.appendChild(stage)

  const layers = steps.map(st => {
    const L = document.createElement('div')
    L.className = 'tp-layer'
    const draw = buildScreen(L, st, rm)
    const dim = document.createElement('div')
    dim.className = 'tp-dim'
    L.appendChild(dim)
    stage.appendChild(L)
    return { L, draw, dim }
  })
  const rip = document.createElement('div')
  rip.className = 'tp-rip'
  const tap = document.createElement('div')
  tap.className = 'tp-tap'
  stage.appendChild(rip)
  stage.appendChild(tap)
  host.appendChild(ph)

  bar.innerHTML = ''
  const tb = document.createElement('div')
  tb.className = 'tp-bar'
  const tk = document.createElement('div')
  tk.className = 'tp-ticks'
  const ticks = steps.map(() => {
    const sp = document.createElement('span')
    const i = document.createElement('i')
    sp.appendChild(i)
    tk.appendChild(sp)
    return i
  })
  const cap = document.createElement('p')
  cap.className = 'tp-cap'
  tb.appendChild(tk)
  tb.appendChild(cap)
  bar.appendChild(tb)

  const starts: number[] = []
  let total = 0
  steps.forEach(s => {
    starts.push(total)
    total += s.d
  })

  let T = 0
  let playing = false
  let raf = 0
  let t0 = 0
  let T0 = 0
  let lastI = -1

  const idx = (t: number) => {
    for (let i = steps.length - 1; i > 0; i--) if (t >= starts[i]) return i
    return 0
  }

  const drawTap = (st: Step, lt: number, L: HTMLDivElement) => {
    if (!st.tap) {
      tap.style.opacity = '0'
      rip.style.opacity = '0'
      return
    }
    const p = lt - st.tap.at
    if (p < -0.45 || p > 0.7) {
      tap.style.opacity = '0'
      rip.style.opacity = '0'
      return
    }
    let x = st.tap.x
    let y = st.tap.y
    if (st.tap.sel) {
      const e = L.querySelector(st.tap.sel)
      if (e) {
        const r = e.getBoundingClientRect()
        const sr = stage.getBoundingClientRect()
        if (r.width && sr.width) {
          // Measured scale, not `sc`: Home's .jn-home-scale CSS zoom (>=1600px)
          // also scales client rects, so only the stage's own rect is true.
          const k = sr.width / SW
          x = (r.left + r.width / 2 - sr.left) / k
          y = (r.top + r.height / 2 - sr.top) / k
        }
      }
    }
    tap.style.left = rip.style.left = `${x.toFixed(1)}px`
    tap.style.top = rip.style.top = `${y.toFixed(1)}px`
    if (rm) {
      tap.style.opacity = '0.95'
      tap.style.transform = ''
      rip.style.opacity = '0'
      return
    }
    let op: number
    let s2: number
    let ro = 0
    let rs = 1
    if (p < 0) {
      const a = eo((p + 0.45) / 0.3)
      op = 0.95 * a
      s2 = 1.3 - 0.3 * a
    } else if (p < 0.18) {
      op = 0.95
      s2 = 0.84
    } else {
      const q = clamp((p - 0.18) / 0.52, 0, 1)
      op = 0.95 * (1 - q)
      s2 = 0.84 + 0.12 * q
      ro = 0.85 * (1 - q)
      rs = 1 + 1.4 * q
    }
    tap.style.opacity = op.toFixed(3)
    tap.style.transform = `scale(${s2.toFixed(3)})`
    rip.style.opacity = ro.toFixed(3)
    rip.style.transform = `scale(${rs.toFixed(3)})`
  }

  const render = (tIn: number) => {
    const t = clamp(tIn, 0, total)
    T = t
    const i = idx(t)
    const lt = t - starts[i]
    const st = steps[i]
    const TR = rm ? 0 : st.tr === 'push' ? 0.45 : 0.5
    const p = i > 0 && st.tr && st.tr !== 'cut' && TR > 0 && lt < TR ? ease(lt / TR) : 1
    layers.forEach((x, j) => {
      const on = j === i || (j === i - 1 && p < 1)
      x.L.classList.toggle('on', on)
      if (!on) return
      x.draw(j === i ? lt : steps[j].d)
      let tf = ''
      let op = 1
      let dm = 0
      if (j === i) {
        x.L.style.zIndex = '2'
        if (p < 1) {
          if (st.tr === 'push') tf = `translateX(${((1 - p) * 100).toFixed(2)}%)`
          else if (st.tr === 'up') tf = `translateY(${((1 - p) * 100).toFixed(2)}%)`
          else op = p
        }
      } else {
        x.L.style.zIndex = '1'
        if (st.tr === 'push') {
          tf = `translateX(${(-p * 30).toFixed(2)}%)`
          dm = p * 0.35
        } else if (st.tr === 'up') dm = p * 0.45
      }
      x.L.style.transform = tf
      x.L.style.opacity = String(op)
      x.dim.style.opacity = String(dm)
    })
    drawTap(st, lt, layers[i].L)
    ticks.forEach((e, k) => {
      e.style.transform = `scaleX(${clamp((t - starts[k]) / steps[k].d, 0, 1).toFixed(3)})`
    })
    if (i !== lastI) {
      lastI = i
      cap.textContent = st.cap
    }
  }

  const loop = (now: number) => {
    if (!playing) return
    let t = T0 + (now - t0) / 1000
    if (t >= total) {
      // "Loops quietly" (round 3 pick): straight back to the coach.
      T0 = 0
      t0 = now
      t = 0
    }
    render(t)
    raf = window.requestAnimationFrame(loop)
  }

  // Reduced motion rests on Home with the tap marked (round 3's still),
  // not on the empty first frame of the chat.
  const homeAt = steps.findIndex(s => s.s === 'home')
  const startAt = rm && homeAt >= 0 ? starts[homeAt] + (steps[homeAt].tap?.at ?? 0) + 0.06 : 0
  render(startAt)
  if (document.fonts?.ready) document.fonts.ready.then(() => render(T)).catch(() => {})

  return {
    play() {
      if (playing) return
      playing = true
      T0 = T
      t0 = window.performance.now()
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(loop)
    },
    pause() {
      playing = false
      window.cancelAnimationFrame(raf)
    },
    destroy() {
      playing = false
      window.cancelAnimationFrame(raf)
      host.innerHTML = ''
      bar.innerHTML = ''
    },
  }
}

const RM_QUERY = '(prefers-reduced-motion: reduce)'
function subscribeRM(cb: () => void) {
  const mq = window.matchMedia?.(RM_QUERY)
  mq?.addEventListener('change', cb)
  return () => mq?.removeEventListener('change', cb)
}
const readRM = () => window.matchMedia?.(RM_QUERY).matches ?? false

export default function TapPathPhone() {
  const hostRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Engine | null>(null)
  /** The visitor's own Play / Pause wins over everything else. */
  const [choice, setChoice] = useState<'play' | 'pause' | null>(null)
  const choiceRef = useRef<'play' | 'pause' | null>(null)
  const rm = useSyncExternalStore(subscribeRM, readRM, () => false)
  // Reduced motion: nothing moves until the visitor presses Play.
  const paused = choice === 'pause' || (choice === null && rm)

  useEffect(() => {
    const host = hostRef.current
    const bar = barRef.current
    if (!host || !bar) return
    const still = readRM()
    const steps = isLiveSite() ? PATH_1.filter(s => !s.drawn) : PATH_1
    const width = Math.round(clamp(host.clientWidth || 300, 240, 320))
    const engine = mount(host, bar, steps, width, still)
    engineRef.current = engine
    const wantsPlay = () => (choiceRef.current === null ? !still : choiceRef.current === 'play')

    // Play only while the phone is on screen; never burn frames off-screen.
    let visible = false
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            es => {
              es.forEach(e => {
                visible = e.isIntersecting
                if (visible && wantsPlay()) engine.play()
                else engine.pause()
              })
            },
            { threshold: 0.25 },
          )
        : null
    if (io) io.observe(host)
    else {
      visible = true
      if (wantsPlay()) engine.play()
    }

    const onVis = () => {
      if (document.hidden) engine.pause()
      else if (visible && wantsPlay()) engine.play()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  const toggle = () => {
    const next = paused ? 'play' : 'pause'
    choiceRef.current = next
    setChoice(next)
    if (next === 'pause') engineRef.current?.pause()
    else engineRef.current?.play()
  }

  return (
    <div className="rf-hero-phone">
      <div
        ref={hostRef}
        className="tp-host"
        role="img"
        aria-label="The Junoon app: the coach suggests a session, Home, then the session playing with the coach between poses."
      />
      <div ref={barRef} aria-hidden="true" style={{ width: '100%' }} />
      <button
        type="button"
        className="tp-toggle"
        onClick={toggle}
        aria-label={paused ? 'Play the app preview' : 'Pause the app preview'}
      >
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  )
}
