// Schematic furniture as inline SVG. Strokes inherit currentColor.
// Each piece is a function returning JSX; positioned by parent via wrapper div.

const Sofa = ({ color = '#C49A7A', leg = '#181420' }) => (
  <svg viewBox="0 0 240 110" width="100%" height="100%">
    {/* Back cushion */}
    <rect x="14" y="14" width="212" height="50" rx="10" fill={color} />
    {/* Seat cushions */}
    <rect x="20" y="48" width="100" height="38" rx="8" fill={color} opacity="0.85" />
    <rect x="120" y="48" width="100" height="38" rx="8" fill={color} opacity="0.85" />
    {/* Arms */}
    <rect x="0"   y="36" width="22" height="56" rx="8" fill={color} opacity="0.9" />
    <rect x="218" y="36" width="22" height="56" rx="8" fill={color} opacity="0.9" />
    {/* Legs */}
    <rect x="14"  y="88" width="6" height="14" fill={leg} />
    <rect x="220" y="88" width="6" height="14" fill={leg} />
    {/* Throw pillow */}
    <circle cx="44" cy="58" r="13" fill="#F0EAE0" opacity="0.55" />
  </svg>
);

const ArcLamp = ({ color = '#F0EAE0', pole = '#181420' }) => (
  <svg viewBox="0 0 120 220" width="100%" height="100%">
    {/* Base */}
    <ellipse cx="100" cy="208" rx="18" ry="4" fill={pole} />
    {/* Pole — arc */}
    <path d="M100 208 L100 140 Q100 30 30 30" stroke={pole} strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* Shade */}
    <ellipse cx="30" cy="36" rx="20" ry="10" fill={color} />
    <rect x="10" y="36" width="40" height="22" fill={color} />
    <ellipse cx="30" cy="58" rx="20" ry="10" fill={color} opacity="0.7" />
  </svg>
);

const CoffeeTable = ({ color = '#181420', top = '#C49A7A' }) => (
  <svg viewBox="0 0 200 70" width="100%" height="100%">
    <ellipse cx="100" cy="20" rx="92" ry="14" fill={top} />
    <ellipse cx="100" cy="20" rx="92" ry="14" fill="none" stroke={color} strokeWidth="1.5" />
    <rect x="20"  y="22" width="3" height="40" fill={color} />
    <rect x="178" y="22" width="3" height="40" fill={color} />
    <ellipse cx="100" cy="64" rx="80" ry="5" fill={color} opacity="0.18" />
  </svg>
);

const Vase = ({ color = '#9B7FA6', stem = '#6B7A5C' }) => (
  <svg viewBox="0 0 80 180" width="100%" height="100%">
    {/* branches */}
    <path d="M40 80 Q30 50 20 28"  stroke={stem} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M40 80 Q50 45 56 18"  stroke={stem} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M40 80 Q42 60 44 38"  stroke={stem} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="20" cy="26" rx="3.5" ry="6" fill={stem} />
    <ellipse cx="56" cy="16" rx="3.5" ry="6" fill={stem} />
    <ellipse cx="44" cy="36" rx="3" ry="5" fill={stem} />
    {/* vase */}
    <path d="M22 84 Q14 110 22 150 L58 150 Q66 110 58 84 Z" fill={color} />
    <ellipse cx="40" cy="84" rx="18" ry="5" fill={color} opacity="0.85" />
    <ellipse cx="40" cy="84" rx="18" ry="5" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
  </svg>
);

const Artwork = ({ frame = '#181420', tint1 = '#9B7FA6', tint2 = '#C49A7A' }) => (
  <svg viewBox="0 0 180 120" width="100%" height="100%">
    <rect x="2" y="2" width="176" height="116" fill="#F0EAE0" stroke={frame} strokeWidth="2" />
    <circle cx="60" cy="62" r="34" fill={tint1} opacity="0.85" />
    <circle cx="110" cy="48" r="22" fill={tint2} opacity="0.9" />
    <path d="M20 96 L160 96" stroke={frame} strokeWidth="1.2" opacity="0.4" />
  </svg>
);

const Chair = ({ color = '#6B7A5C', leg = '#181420' }) => (
  <svg viewBox="0 0 140 180" width="100%" height="100%">
    {/* Backrest curve */}
    <path d="M20 30 Q70 4 120 30 L120 96 Q70 86 20 96 Z" fill={color} />
    {/* Seat */}
    <rect x="14" y="96" width="112" height="22" rx="6" fill={color} opacity="0.92" />
    {/* Legs */}
    <rect x="22"  y="118" width="5" height="48" fill={leg} />
    <rect x="113" y="118" width="5" height="48" fill={leg} />
  </svg>
);

const Bed = ({ frame = '#181420', cloth = '#F0EAE0', pillow = '#CDBBD4' }) => (
  <svg viewBox="0 0 360 140" width="100%" height="100%">
    {/* Headboard */}
    <rect x="0" y="0" width="360" height="34" rx="6" fill={frame} />
    {/* Mattress */}
    <rect x="14" y="34" width="332" height="50" rx="6" fill={cloth} />
    {/* Pillows */}
    <rect x="32"  y="44" width="80" height="22" rx="6" fill={pillow} />
    <rect x="120" y="44" width="80" height="22" rx="6" fill={pillow} opacity="0.85" />
    {/* Duvet edge */}
    <rect x="14" y="80" width="332" height="14" rx="4" fill={cloth} opacity="0.7" />
    {/* Bed frame */}
    <rect x="0" y="94" width="360" height="22" rx="4" fill={frame} opacity="0.85" />
    <rect x="4"   y="116" width="6" height="20" fill={frame} />
    <rect x="350" y="116" width="6" height="20" fill={frame} />
  </svg>
);

const Rug = ({ color = '#9B7FA6' }) => (
  <svg viewBox="0 0 420 80" width="100%" height="100%">
    <ellipse cx="210" cy="40" rx="208" ry="34" fill={color} opacity="0.55" />
    <ellipse cx="210" cy="40" rx="180" ry="28" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
  </svg>
);

const Pendant = ({ color = '#C49A7A', cord = '#181420' }) => (
  <svg viewBox="0 0 120 180" width="100%" height="100%">
    <line x1="60" y1="0" x2="60" y2="80" stroke={cord} strokeWidth="1.5" />
    <path d="M30 80 L90 80 L82 130 L38 130 Z" fill={color} />
    <ellipse cx="60" cy="132" rx="22" ry="5" fill={color} opacity="0.5" />
    {/* glow */}
    <ellipse cx="60" cy="160" rx="50" ry="14" fill={color} opacity="0.18" />
  </svg>
);

const Counter = ({ color = '#181420', top = '#C49A7A' }) => (
  <svg viewBox="0 0 420 140" width="100%" height="100%">
    {/* Top */}
    <rect x="0" y="0" width="420" height="14" rx="3" fill={top} />
    {/* Body */}
    <rect x="0" y="14" width="420" height="106" fill={color} />
    {/* Cabinet seams */}
    <line x1="140" y1="14" x2="140" y2="120" stroke="rgba(240,234,224,0.18)" strokeWidth="1" />
    <line x1="280" y1="14" x2="280" y2="120" stroke="rgba(240,234,224,0.18)" strokeWidth="1" />
    {/* Brass pulls */}
    <rect x="60"  y="60" width="30" height="3" rx="1" fill="#C49A7A" />
    <rect x="200" y="60" width="30" height="3" rx="1" fill="#C49A7A" />
    <rect x="340" y="60" width="30" height="3" rx="1" fill="#C49A7A" />
    {/* Shadow at base */}
    <rect x="0" y="120" width="420" height="20" fill="rgba(0,0,0,0.25)" />
  </svg>
);

// Photo — render a real product photograph in the same coordinate system as the
// SVG primitives above. Kept for future use; the salon now uses modeled SVGs.
const Photo = ({ src, alt = '', fit = 'contain', shadow = false }) => (
  <img
    src={src}
    alt={alt}
    draggable={false}
    style={{
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block',
      filter: shadow ? 'drop-shadow(0 22px 36px rgba(24,20,32,0.35))' : 'none',
      userSelect: 'none',
    }}
  />
);

// ── Modeled pieces for the Sutton salon ────────────────────────────────────
// Each one is drawn as a stylized 3/4-view "object" with proper material colors,
// edge highlights, side shading and a ground shadow — so the room reads as a
// composed scene rather than a collage of product cards. Sources of truth are
// the product photos in assets/furniture/.

// MustardSectional — three-module foam-bolster sectional in mustard chenille.
// Rolled arms, three back cushions, three throw pillows. Generous and low.
const MustardSectional = ({ color = '#B89A4D', deep = '#7A6428', light = '#D6B96A' }) => (
  <svg viewBox="0 0 320 180" width="100%" height="100%">
    {/* ground shadow */}
    <ellipse cx="160" cy="172" rx="158" ry="6" fill="#181420" opacity="0.28" />
    {/* back-cushion row */}
    <rect x="18" y="22" width="284" height="76" rx="16" fill={color} />
    {/* top highlight */}
    <rect x="18" y="22" width="284" height="14" rx="12" fill={light} opacity="0.55" />
    {/* module divider dimples on back */}
    <line x1="113" y1="38" x2="113" y2="92" stroke={deep} strokeWidth="1.2" opacity="0.35"/>
    <line x1="207" y1="38" x2="207" y2="92" stroke={deep} strokeWidth="1.2" opacity="0.35"/>
    {/* rolled arms */}
    <ellipse cx="22" cy="68" rx="22" ry="48" fill={color} />
    <ellipse cx="22" cy="68" rx="22" ry="48" fill={deep} opacity="0.18" />
    <ellipse cx="298" cy="68" rx="22" ry="48" fill={color} />
    <ellipse cx="298" cy="68" rx="22" ry="48" fill={deep} opacity="0.18" />
    {/* arm top highlights */}
    <ellipse cx="22" cy="32" rx="18" ry="10" fill={light} opacity="0.55" />
    <ellipse cx="298" cy="32" rx="18" ry="10" fill={light} opacity="0.55" />
    {/* seat front bolster */}
    <rect x="22" y="92" width="276" height="58" rx="14" fill={color} />
    <rect x="22" y="92" width="276" height="9" rx="6" fill="#F0EAE0" opacity="0.22" />
    {/* seat module dividers */}
    <line x1="113" y1="106" x2="113" y2="148" stroke={deep} strokeWidth="1" opacity="0.3"/>
    <line x1="207" y1="106" x2="207" y2="148" stroke={deep} strokeWidth="1" opacity="0.3"/>
    {/* three throw pillows on the seat */}
    <rect x="50"  y="106" width="58" height="22" rx="5" fill={color} opacity="0.95" />
    <rect x="50"  y="106" width="58" height="5"  rx="3" fill={light} opacity="0.5" />
    <rect x="131" y="106" width="58" height="22" rx="5" fill={color} opacity="0.95" />
    <rect x="131" y="106" width="58" height="5"  rx="3" fill={light} opacity="0.5" />
    <rect x="212" y="106" width="58" height="22" rx="5" fill={color} opacity="0.95" />
    <rect x="212" y="106" width="58" height="5"  rx="3" fill={light} opacity="0.5" />
    {/* base shadow */}
    <rect x="22" y="148" width="276" height="6" fill={deep} opacity="0.4" />
    {/* floor contact shadow */}
    <ellipse cx="160" cy="156" rx="158" ry="3" fill="#181420" opacity="0.18" />
  </svg>
);

// BoucleChair — walnut frame, ivory boucle seat & back, brass arm supports,
// sculpted curved walnut legs. Tall and slim, sits high.
const BoucleChair = ({ frame = '#4a3526', boucle = '#EFE9DD', brass = '#C49A56' }) => (
  <svg viewBox="0 0 160 200" width="100%" height="100%">
    {/* ground shadow */}
    <ellipse cx="80" cy="192" rx="58" ry="4" fill="#181420" opacity="0.28" />
    {/* outer walnut frame — sculpted back panel */}
    <path d="M22 38 Q22 14 80 14 Q138 14 138 38 L138 116 Q138 124 130 124 L30 124 Q22 124 22 116 Z" fill={frame} />
    {/* frame top highlight */}
    <path d="M28 32 Q28 18 80 18 Q132 18 132 32" stroke="#6b4f37" strokeWidth="1" fill="none" opacity="0.55" />
    {/* inner boucle cushion (back) */}
    <rect x="34" y="24" width="92" height="84" rx="8" fill={boucle} />
    {/* boucle texture — tiny dots */}
    {Array.from({ length: 36 }).map((_, i) => {
      const cx = 38 + (i % 9) * 10 + ((Math.floor(i / 9) % 2) ? 4 : 0);
      const cy = 30 + Math.floor(i / 9) * 18;
      return <circle key={i} cx={cx} cy={cy} r="1.1" fill={frame} opacity="0.13" />;
    })}
    {/* back-cushion shadow against frame */}
    <rect x="34" y="24" width="92" height="6" rx="4" fill={frame} opacity="0.12" />
    {/* seat cushion */}
    <rect x="22" y="116" width="116" height="24" rx="6" fill={boucle} />
    <rect x="22" y="116" width="116" height="6" rx="4" fill={frame} opacity="0.15" />
    {/* armrest caps */}
    <ellipse cx="22" cy="114" rx="14" ry="8" fill={frame} />
    <ellipse cx="138" cy="114" rx="14" ry="8" fill={frame} />
    {/* brass arm supports — curved tubes from frame down to seat rail */}
    <path d="M22 118 Q12 138 22 152" stroke={brass} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M138 118 Q148 138 138 152" stroke={brass} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* brass highlight */}
    <path d="M22 118 Q12 138 22 152" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* sculpted curved legs — splayed slightly */}
    <path d="M32 140 Q26 168 36 188" stroke={frame} strokeWidth="5.5" fill="none" strokeLinecap="round" />
    <path d="M128 140 Q134 168 124 188" stroke={frame} strokeWidth="5.5" fill="none" strokeLinecap="round" />
    {/* front rail */}
    <path d="M40 142 Q80 152 120 142" stroke={frame} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// WalnutMarbleTable — low rectangular coffee table. Honed white marble slab on
// top, open shelf below, walnut plinth base. 3/4 view shows front face only.
const WalnutMarbleTable = ({ wood = '#8B5E3B', wood2 = '#5b3d23', marble = '#F4EFE6', vein = '#a89e8e' }) => (
  <svg viewBox="0 0 240 110" width="100%" height="100%">
    {/* ground shadow */}
    <ellipse cx="120" cy="104" rx="110" ry="4" fill="#181420" opacity="0.25" />
    {/* marble slab — front face */}
    <rect x="6" y="6" width="228" height="20" rx="2" fill={marble} />
    {/* marble veining */}
    <path d="M30 12 Q60 17 90 13 Q120 9 150 18" stroke={vein} strokeWidth="0.6" fill="none" opacity="0.45" />
    <path d="M40 20 Q80 24 120 20 Q170 16 210 22" stroke={vein} strokeWidth="0.5" fill="none" opacity="0.32" />
    <path d="M70 10 Q90 14 110 11" stroke={vein} strokeWidth="0.4" fill="none" opacity="0.35" />
    {/* marble top-edge highlight */}
    <rect x="6" y="6" width="228" height="2" fill="#fff" opacity="0.5" />
    {/* marble bottom shadow (slab depth) */}
    <rect x="6" y="23" width="228" height="3" fill={vein} opacity="0.4" />
    {/* upper wood shelf cap */}
    <rect x="12" y="26" width="216" height="6" fill={wood} />
    <rect x="12" y="26" width="216" height="2" fill="#fff" opacity="0.2" />
    {/* open shelf cavity (dark) */}
    <rect x="12" y="32" width="216" height="30" fill="#1a1208" />
    <rect x="12" y="32" width="216" height="6" fill="#000" opacity="0.5" />
    {/* base plinth */}
    <rect x="22" y="62" width="196" height="34" rx="2" fill={wood} />
    {/* wood grain */}
    <line x1="40" y1="74" x2="200" y2="74" stroke={wood2} strokeWidth="0.5" opacity="0.55" />
    <line x1="40" y1="84" x2="200" y2="84" stroke={wood2} strokeWidth="0.5" opacity="0.45" />
    {/* side shading on plinth */}
    <rect x="22" y="62" width="6" height="34" fill="#000" opacity="0.18" />
    <rect x="212" y="62" width="6" height="34" fill="#000" opacity="0.18" />
    {/* base contact shadow */}
    <rect x="22" y="92" width="196" height="4" fill="#181420" opacity="0.4" />
  </svg>
);

// JuliusConsole — long ebonized oak media console. Curved-top profile, four
// fluted door panels, brass vertical pulls between door pairs, sled base.
const JuliusConsole = ({ wood = '#2d2018', wood2 = '#1a120c', wood3 = '#3a2a1f', brass = '#C49A56' }) => (
  <svg viewBox="0 0 480 160" width="100%" height="100%">
    {/* ground shadow */}
    <ellipse cx="240" cy="156" rx="230" ry="5" fill="#181420" opacity="0.32" />
    {/* main body — curved top corners */}
    <path d="M10 32 Q10 6 36 6 L444 6 Q470 6 470 32 L470 134 L10 134 Z" fill={wood} />
    {/* top thin highlight */}
    <path d="M14 30 Q14 10 36 10 L444 10 Q466 10 466 30" stroke="#6a4d36" strokeWidth="1" fill="none" opacity="0.6" />
    {/* door dividers (four panels) */}
    <line x1="125" y1="22" x2="125" y2="130" stroke={wood2} strokeWidth="1.5" />
    <line x1="240" y1="22" x2="240" y2="130" stroke={wood2} strokeWidth="1.5" />
    <line x1="355" y1="22" x2="355" y2="130" stroke={wood2} strokeWidth="1.5" />
    {/* fluted wood grain on door faces */}
    {[40, 60, 80, 100, 155, 175, 195, 215, 270, 290, 310, 330, 385, 405, 425, 445].map((x, i) => (
      <line key={i} x1={x} y1="22" x2={x} y2="130" stroke={wood3} strokeWidth="0.5" opacity="0.5" />
    ))}
    {/* brass pulls — vertical strips between door pairs */}
    <rect x="121" y="58" width="3" height="40" rx="1" fill={brass} />
    <rect x="125" y="58" width="3" height="40" rx="1" fill={brass} opacity="0.7" />
    <rect x="351" y="58" width="3" height="40" rx="1" fill={brass} />
    <rect x="355" y="58" width="3" height="40" rx="1" fill={brass} opacity="0.7" />
    {/* bottom shadow inside */}
    <rect x="10" y="128" width="460" height="6" fill="#000" opacity="0.4" />
    {/* sled feet */}
    <rect x="22" y="134" width="20" height="22" fill={wood2} />
    <rect x="438" y="134" width="20" height="22" fill={wood2} />
  </svg>
);

// LunaLamp — slim brass arc lamp with frosted glass globe on top, marble base.
const LunaLamp = ({ brass = '#C19A55', brassHi = '#E2C283', globe = '#F4EFE6', marble = '#E8E1D4' }) => (
  <svg viewBox="0 0 140 320" width="100%" height="100%">
    {/* soft halo around the globe */}
    <circle cx="44" cy="46" r="58" fill={globe} opacity="0.10" />
    <circle cx="44" cy="46" r="38" fill={globe} opacity="0.18" />
    {/* brass arc — base up, then over to globe */}
    <path d="M92 304 L92 226 Q92 68 44 68" stroke={brass} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* arc highlight */}
    <path d="M93 304 L93 226 Q93 69 45 69" stroke={brassHi} strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round" />
    {/* marble disc base */}
    <ellipse cx="92" cy="308" rx="32" ry="6" fill="#181420" opacity="0.32" />
    <ellipse cx="92" cy="302" rx="30" ry="7" fill={marble} />
    <ellipse cx="92" cy="298" rx="30" ry="2.5" fill="#fff" opacity="0.55" />
    {/* small brass collar at base */}
    <rect x="89" y="294" width="6" height="6" fill={brass} />
    {/* frosted glass globe */}
    <circle cx="44" cy="46" r="26" fill={globe} />
    <circle cx="38" cy="38" r="9" fill="#fff" opacity="0.6" />
    {/* pole-to-globe joiner */}
    <rect x="42" y="68" width="4" height="6" fill={brass} />
  </svg>
);

// HerizRug — Heriz medallion in olive/khaki ground with gold border and rust
// medallion + corner motifs. Drawn in shallow perspective (top edge inset).
const HerizRug = ({ ground = '#7a6a4a', gold = '#C49A56', goldHi = '#e2bf7d', rust = '#a87547', accent = '#3f3327' }) => (
  <svg viewBox="0 0 480 100" width="100%" height="100%" preserveAspectRatio="none">
    {/* outer border (gold) — perspective trapezoid */}
    <polygon points="22,6 458,6 478,92 2,92" fill={gold} />
    {/* gold border top highlight */}
    <polygon points="22,6 458,6 456,12 24,12" fill={goldHi} opacity="0.5" />
    {/* inner ground */}
    <polygon points="42,16 438,16 458,82 22,82" fill={ground} />
    {/* central medallion */}
    <polygon points="240,28 268,50 240,72 212,50" fill={rust} opacity="0.92" />
    <polygon points="240,34 260,50 240,66 220,50" fill={accent} opacity="0.6" />
    <circle cx="240" cy="50" r="4" fill={gold} opacity="0.7" />
    {/* corner stars */}
    <polygon points="80,32 96,42 80,52 64,42" fill={rust} opacity="0.7" />
    <polygon points="400,32 416,42 400,52 384,42" fill={rust} opacity="0.7" />
    <polygon points="120,60 134,68 120,76 106,68" fill={rust} opacity="0.55" />
    <polygon points="360,60 374,68 360,76 346,68" fill={rust} opacity="0.55" />
    {/* tiny pattern dots */}
    <circle cx="160" cy="42" r="2" fill={accent} opacity="0.55" />
    <circle cx="180" cy="58" r="2" fill={accent} opacity="0.55" />
    <circle cx="320" cy="42" r="2" fill={accent} opacity="0.55" />
    <circle cx="300" cy="58" r="2" fill={accent} opacity="0.55" />
    <circle cx="200" cy="32" r="1.5" fill={accent} opacity="0.4" />
    <circle cx="280" cy="32" r="1.5" fill={accent} opacity="0.4" />
    <circle cx="200" cy="68" r="1.5" fill={accent} opacity="0.4" />
    <circle cx="280" cy="68" r="1.5" fill={accent} opacity="0.4" />
    {/* fringe — bottom edge */}
    <rect x="2" y="88" width="476" height="3" fill={goldHi} opacity="0.6" />
  </svg>
);

// Throw — a small folded blanket, drawn as two stacked rounded rects. Used to
// land a lilac (or any) accent colour into a room that's mostly warm/wood.
const Throw = ({ color = '#9B7FA6' }) => (
  <svg viewBox="0 0 140 100" width="100%" height="100%" preserveAspectRatio="none">
    {/* shadow under the throw, against the sofa */}
    <ellipse cx="70" cy="92" rx="58" ry="4" fill="#181420" opacity="0.22" />
    {/* lower fold */}
    <rect x="8"  y="44" width="124" height="42" rx="6" fill={color} />
    {/* upper fold, slightly inset */}
    <rect x="16" y="14" width="108" height="40" rx="6" fill={color} opacity="0.92" />
    {/* fringe / texture lines */}
    <line x1="20" y1="78" x2="120" y2="78" stroke="#181420" strokeWidth="0.6" opacity="0.18" />
    <line x1="22" y1="22" x2="118" y2="22" stroke="#F0EAE0" strokeWidth="0.5" opacity="0.25" />
  </svg>
);

// ArtSlot — wraps the <image-slot> web component so a hi-fi room can have a
// user-fillable art frame. Drop an image to populate; persists via slot's id.
const ArtSlot = ({ slotId = 'salon-wall-art', placeholder = 'wall art \u00b7 drop here' }) => (
  React.createElement('image-slot', {
    id: slotId,
    shape: 'rect',
    placeholder: placeholder,
    style: { width: '100%', height: '100%', display: 'block', border: '1px solid rgba(240,234,224,0.55)' },
  })
);

// Placeholder — a hairline-framed rectangle with mono-label, for pieces the
// client hasn't supplied a photo for yet (e.g. wall art). Inert; the hotspot
// over it still works.
const Placeholder = ({ label = 'image to come' }) => (
  <div style={{
    width: '100%', height: '100%',
    border: '1px dashed rgba(240,234,224,0.5)',
    background: 'repeating-linear-gradient(135deg, rgba(240,234,224,0.04) 0 8px, rgba(240,234,224,0.10) 8px 16px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(240,234,224,0.7)',
    fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center', padding: 8,
  }}>{label}</div>
);

Object.assign(window, {
  Sofa, ArcLamp, CoffeeTable, Vase, Artwork, Chair, Bed, Rug, Pendant, Counter,
  Photo, Placeholder, Throw, ArtSlot,
  MustardSectional, BoucleChair, WalnutMarbleTable, JuliusConsole, LunaLamp, HerizRug,
});
