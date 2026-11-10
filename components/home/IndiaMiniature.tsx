/**
 * The map of India on the first screen, round 2 (Kush, 9:30 call Tue 10 Nov:
 * "looking at the image Arjav used in the carousel yesterday ... we can
 * recreate something similar that would look clean for the website").
 *
 * The reference is slide 2 of the launch carousel "Not generic wellness"
 * (posted Mon 9 Nov; junoon-team pages/marketing/carousels-editable-1109.html):
 * a map of India painted in the Pahari miniature style. This redraws its look
 * by hand in SVG, with no generated picture and no generated people: the red
 * border with an ochre flower vine, parchment ground, a green sea with wave
 * strokes, the Himalaya with snow caps, the rivers, trees and palms, a temple
 * and ghat on the Ganga, and two small drawn practitioners. The outline is the
 * approved mock-up's own (landing-editable-1106.html, section 1, the old
 * lib/india-map.ts). The banyan is the logo's tree, inked green by a filter.
 *
 * The five labels around it (asana, pranayama, ancient texts, real Indian
 * instructors, the eight limbs) are HTML, in HomeLanding.tsx, with the
 * existing words.
 */
export default function IndiaMiniature() {
  return (
    <svg className="h4-mini" viewBox="0 0 400 432" role="img" aria-label="Map of India with the Junoon tree at its heart">
      <defs>
        <clipPath id="mm-field"><rect x="16" y="16" width="368" height="400" rx="2" /></clipPath>
        <pattern id="mm-waves" width="18" height="10" patternUnits="userSpaceOnUse">
          <path d="M1 7 q4 -5 8 0 t8 0" fill="none" stroke="#5F8576" strokeWidth=".9" opacity=".75" />
        </pattern>
        <pattern id="mm-vine" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="2.1" fill="#E3B65A" />
          <ellipse cx="8" cy="3.6" rx="1.3" ry="2.2" fill="#E3B65A" />
          <ellipse cx="8" cy="12.4" rx="1.3" ry="2.2" fill="#E3B65A" />
          <ellipse cx="3.6" cy="8" rx="2.2" ry="1.3" fill="#E3B65A" />
          <ellipse cx="12.4" cy="8" rx="2.2" ry="1.3" fill="#E3B65A" />
          <circle cx="8" cy="8" r="1" fill="#8E2F1E" />
        </pattern>
        <filter id="mm-ink" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.33  0 0 0 0 0.17  0 0 0 1 0" />
        </filter>
        <symbol id="mm-tree" viewBox="-10 -16 20 22" overflow="visible">
          <rect x="-1" y="-2" width="2" height="7" fill="#6B4A2E" />
          <circle cx="-4.5" cy="-5" r="5" fill="#5E7A3A" />
          <circle cx="4.5" cy="-5" r="5" fill="#5E7A3A" />
          <circle cx="0" cy="-10" r="6" fill="#6F8C45" />
          <circle cx="-2" cy="-11" r="1" fill="#F4EBD6" />
          <circle cx="3" cy="-7" r="1" fill="#F4EBD6" />
        </symbol>
        <symbol id="mm-palm" viewBox="-10 -18 20 24" overflow="visible">
          <path d="M0 6 C1 0 1 -6 0 -12" stroke="#6B4A2E" strokeWidth="1.6" fill="none" />
          <path d="M0 -12 C-4 -15 -8 -13 -10 -9 M0 -12 C4 -15 8 -13 10 -9 M0 -12 C-3 -17 -7 -18 -9 -16 M0 -12 C3 -17 7 -18 9 -16" stroke="#5E7A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="mm-hill" viewBox="-12 -8 24 8" overflow="visible">
          <path d="M-12 0 Q-5 -9 0 -7 Q6 -9 12 0 Z" fill="#C99A55" stroke="#8A6235" strokeWidth=".6" />
        </symbol>
      </defs>

      {/* the frame: a red band with an ochre flower vine, as on a Pahari page */}
      <rect x="0" y="0" width="400" height="432" rx="6" fill="#8E2F1E" />
      <rect x="3" y="3" width="394" height="426" rx="4" fill="url(#mm-vine)" />
      <rect x="12.5" y="12.5" width="375" height="407" fill="none" stroke="#E3B65A" strokeWidth="1.4" />
      <rect x="15" y="15" width="370" height="402" fill="none" stroke="#3A1A10" strokeWidth="1" />

      <g clipPath="url(#mm-field)">
        <rect x="16" y="16" width="368" height="400" fill="#F1E2BF" />
        <g transform="translate(38 34)">
          {/* the seas */}
          <path d="M-40 148 Q-14 158 8 157 L28 156 L52 198 L176 198 L229 192 Q252 197 276 189 Q292 212 304 240 Q316 284 342 300 L380 300 L380 420 L-40 420 Z" fill="#8DAE9E" />
          <path d="M-40 148 Q-14 158 8 157 L28 156 L52 198 L176 198 L229 192 Q252 197 276 189 Q292 212 304 240 Q316 284 342 300 L380 300 L380 420 L-40 420 Z" fill="url(#mm-waves)" />
          {/* clouds */}
          <g fill="#FBF5E6" stroke="#9C8466" strokeWidth=".8">
            <path d="M176 2 q4 -8 12 -4 q6 -9 15 -2 q9 -4 11 5 q7 2 3 8 h-40 q-6 -3 -1 -7 z" />
            <path d="M262 30 q4 -7 11 -3 q5 -8 13 -2 q8 -3 10 5 q6 2 2 7 h-35 q-5 -3 0 -7 z" />
          </g>
          {/* India */}
          <path d="M69.3,4.8 L85.8,10.7 L107.8,23.8 L116.6,41.6 L123.2,59.4 L118.8,77.2 L134.2,86.7 L133.1,103.4 L148.5,110.5 L168.3,120.0 L187.0,125.9 L203.5,129.5 L221.1,130.7 L222.2,114.0 L229.9,121.2 L239.8,128.3 L264.0,125.9 L265.1,115.2 L292.6,97.4 L309.1,96.2 L323.4,110.5 L308.0,121.2 L299.2,130.7 L292.6,146.1 L287.1,161.6 L279.4,172.3 L275.0,184.1 L267.3,168.7 L264.0,153.3 L242.0,146.1 L239.8,137.8 L224.4,134.2 L221.1,148.5 L227.7,158.0 L229.9,177.0 L226.6,188.9 L209.0,190.1 L205.7,204.3 L187.0,213.8 L177.1,228.1 L157.3,248.3 L143.0,257.8 L135.3,260.2 L133.1,283.9 L135.3,291.1 L130.9,307.7 L129.8,323.1 L119.9,335.0 L105.6,349.3 L94.6,339.8 L88.0,320.8 L80.3,302.9 L73.7,283.9 L66.0,264.9 L59.4,244.7 L52.8,219.8 L53.9,198.4 L50.6,188.9 L48.4,181.8 L46.2,191.3 L33.0,198.4 L22.0,190.1 L11.0,180.6 L22.0,173.4 L26.4,172.3 L7.7,171.1 L2.2,165.1 L8.8,156.8 L33.0,155.6 L25.3,140.2 L23.1,129.5 L16.5,124.7 L28.6,112.9 L42.9,114.0 L55.0,97.4 L66.0,84.3 L72.6,76.0 L81.4,61.8 L72.6,55.8 L66.0,51.1 L64.9,34.5 L59.4,30.9 Z" fill="#E8C47C" stroke="#7B5530" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Sri Lanka and the Andaman islands */}
          <path d="M121 356 q8 -3 11 7 q3 11 -5 15 q-8 -1 -9 -11 q0 -7 3 -11 z" fill="#E8C47C" stroke="#7B5530" strokeWidth="1.2" />
          <g fill="#E8C47C" stroke="#7B5530" strokeWidth=".9"><ellipse cx="298" cy="262" rx="2" ry="4" /><ellipse cx="300" cy="276" rx="1.8" ry="3.4" /><ellipse cx="301" cy="289" rx="1.6" ry="3" /></g>

          {/* rivers */}
          <g fill="none" stroke="#7FAFC4" strokeWidth="2.2" strokeLinecap="round">
            <path d="M124 84 C136 110 150 128 172 140 S205 156 214 170 S226 184 229 190" />
            <path d="M114 92 C120 118 138 136 170 141" strokeWidth="1.6" />
            <path d="M66 30 C60 70 46 110 30 156" strokeWidth="1.8" />
            <path d="M309 102 C292 112 272 118 262 130 S250 160 246 186" strokeWidth="1.8" />
            <path d="M146 210 C118 210 88 206 56 208" strokeWidth="1.7" />
            <path d="M80 236 C110 238 140 240 166 234" strokeWidth="1.6" />
            <path d="M72 268 C98 266 122 262 146 254" strokeWidth="1.5" />
          </g>

          {/* the Himalaya */}
          <g stroke="#5C566E" strokeWidth=".6" strokeLinejoin="round">
            <g transform="translate(78 42)"><path d="M-26 0 L0 -32 L26 0 Z" fill="#B3ADC0" /><path d="M0 -32 L26 0 L6 0 Z" fill="#8B85A0" /><path d="M-8 -22 L0 -32 L8 -22 L4 -24 L0 -20 L-4 -24 Z" fill="#FBF8F0" /></g>
            <g transform="translate(104 54)"><path d="M-22 0 L0 -28 L22 0 Z" fill="#B3ADC0" /><path d="M0 -28 L22 0 L5 0 Z" fill="#8B85A0" /><path d="M-7 -19 L0 -28 L7 -19 L3 -21 L0 -17 L-3 -21 Z" fill="#FBF8F0" /></g>
            <g transform="translate(130 96)"><path d="M-20 0 L0 -26 L20 0 Z" fill="#B3ADC0" /><path d="M0 -26 L20 0 L5 0 Z" fill="#8B85A0" /><path d="M-6 -18 L0 -26 L6 -18 L3 -20 L0 -16 L-3 -20 Z" fill="#FBF8F0" /></g>
            <g transform="translate(156 112)"><path d="M-22 0 L0 -30 L22 0 Z" fill="#B3ADC0" /><path d="M0 -30 L22 0 L5 0 Z" fill="#8B85A0" /><path d="M-7 -21 L0 -30 L7 -21 L3 -23 L0 -19 L-3 -23 Z" fill="#FBF8F0" /></g>
            <g transform="translate(182 122)"><path d="M-20 0 L0 -27 L20 0 Z" fill="#B3ADC0" /><path d="M0 -27 L20 0 L5 0 Z" fill="#8B85A0" /><path d="M-6 -19 L0 -27 L6 -19 L3 -21 L0 -17 L-3 -21 Z" fill="#FBF8F0" /></g>
            <g transform="translate(208 128)"><path d="M-22 0 L0 -32 L22 0 Z" fill="#B3ADC0" /><path d="M0 -32 L22 0 L5 0 Z" fill="#8B85A0" /><path d="M-7 -22 L0 -32 L7 -22 L3 -24 L0 -20 L-3 -24 Z" fill="#FBF8F0" /></g>
            <g transform="translate(240 124)"><path d="M-20 0 L0 -26 L20 0 Z" fill="#B3ADC0" /><path d="M0 -26 L20 0 L5 0 Z" fill="#8B85A0" /><path d="M-6 -18 L0 -26 L6 -18 L3 -20 L0 -16 L-3 -20 Z" fill="#FBF8F0" /></g>
            <g transform="translate(284 104)"><path d="M-18 0 L0 -24 L18 0 Z" fill="#B3ADC0" /><path d="M0 -24 L18 0 L4 0 Z" fill="#8B85A0" /><path d="M-5 -17 L0 -24 L5 -17 L2 -19 L0 -15 L-2 -19 Z" fill="#FBF8F0" /></g>
          </g>

          {/* hills, trees and palms */}
          <use href="#mm-hill" x="150" y="190" width="24" height="8" />
          <use href="#mm-hill" x="96" y="250" width="24" height="8" />
          <use href="#mm-hill" x="122" y="232" width="24" height="8" />
          <use href="#mm-hill" x="40" y="132" width="24" height="8" />
          <use href="#mm-tree" x="158" y="172" width="20" height="22" />
          <use href="#mm-tree" x="58" y="150" width="20" height="22" />
          <use href="#mm-tree" x="120" y="300" width="20" height="22" />
          <use href="#mm-tree" x="145" y="226" width="20" height="22" />
          <use href="#mm-tree" x="270" y="150" width="20" height="22" />
          <use href="#mm-palm" x="94" y="312" width="20" height="24" />
          <use href="#mm-palm" x="106" y="328" width="20" height="24" />

          {/* the temple and its ghat on the Ganga */}
          <g transform="translate(196 150)">
            <path d="M-12 8 h24 v3 h-24 z M-14 11 h28 v3 h-28 z M-16 14 h32 v3 h-32 z" fill="#E9DCC0" stroke="#8A6235" strokeWidth=".5" />
            <rect x="-9" y="-6" width="18" height="14" fill="#F4EBD6" stroke="#8A6235" strokeWidth=".6" />
            <path d="M-6 -6 C-6 -16 -2 -22 0 -26 C2 -22 6 -16 6 -6 Z" fill="#E3B65A" stroke="#8A6235" strokeWidth=".6" />
            <path d="M0 -26 v-6 l6 2 l-6 2" fill="#C4472A" stroke="#8A6235" strokeWidth=".4" />
            <rect x="-2.5" y="1" width="5" height="7" rx="2.5" fill="#6B4A2E" />
          </g>

          {/* the Junoon banyan (the logo's tree, inked in green) and a seated practitioner under it */}
          <image href="/brand/junoon-tree-white-560.webp" x="64" y="122" width="76" height="76" filter="url(#mm-ink)" />
          <g transform="translate(102 202)">
            <ellipse cx="0" cy="4" rx="9" ry="3" fill="#C4472A" />
            <path d="M-5 4 C-5 -4 -3 -8 0 -8 C3 -8 5 -4 5 4 Z" fill="#E07A2E" />
            <circle cx="0" cy="-11" r="3.2" fill="#8A5A3A" />
            <path d="M-3 -13 q3 -3 6 0" stroke="#2F1F14" strokeWidth="1.4" fill="none" />
          </g>
          {/* a second seated practitioner on the ghat */}
          <g transform="translate(222 172) scale(.85)">
            <ellipse cx="0" cy="4" rx="9" ry="3" fill="#6F8C45" />
            <path d="M-5 4 C-5 -4 -3 -8 0 -8 C3 -8 5 -4 5 4 Z" fill="#F4EBD6" />
            <circle cx="0" cy="-11" r="3.2" fill="#8A5A3A" />
          </g>
          {/* a standing pose in the south */}
          <g transform="translate(128 276) scale(1.25)">
            <path d="M0 -6 L0 8" stroke="#8A5A3A" strokeWidth="1.6" />
            <path d="M0 8 L-2 18 M0 8 L4 12 L-1 13" stroke="#8A5A3A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M-4 -6 h8 l1 10 h-10 z" fill="#E07A2E" />
            <path d="M-1 -7 L-4 -14 L0 -21 L4 -14 L1 -7" stroke="#8A5A3A" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="0" cy="-9" r="2.8" fill="#8A5A3A" />
          </g>
        </g>
      </g>
    </svg>
  )
}
