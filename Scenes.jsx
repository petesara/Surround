// Scene data and composition.
// Each scene defines: palette (wall/floor/sky/accent), furniture placement, hotspots, copy.

const SCENES = [
  {
    id: 'opening',
    kind: 'opening',
    label: 'enter',
    mood: 'overture',
  },
  {
    id: 'salon',
    kind: 'room',
    label: '01 — the salon',
    mood: 'salon · the Sutton · M5V',
    eyebrow: '01 · THE SALON',
    headline: 'The salon.',
    blurb: 'the Sutton · King West · floor 27.',
    palette: {
      '--wall-color':   '#806588',     // lilac-500
      '--floor-color':  '#5a4361',
      '--accent-color': '#F0EAE0',
      '--sky-top':      '#C49A7A',
      '--sky-bot':      '#9B7FA6',
    },
    // Modeled pieces — stylized 3/4 view of each Sutton furniture item.
    // Source photos in assets/furniture/ guided proportions/colors. Ordered
    // back→front for z-stacking. Coordinates are % of the scene-area.
    items: [
      // Rug — anchors the floor in shallow perspective
      { id: 's-rug', Comp: 'HerizRug', x: '8%', y: '62%', w: '80%', h: '34%',
        props: {},
        hot: { x: '48%', y: '88%', dark: true },
        info: {
          kicker: 'RUG', name: 'Vatsal hand-knotted wool',
          design: 'Loloi · India · 100% wool',
          meta: [['Size','5\u2032 \u00d7 7\u2032 6\u2033'],['Fibre','wool, hand-tufted'],['Pile','medium, 0.25\u2033'],['Pattern','heriz medallion']],
        } },

      // Media console — back-right, against wall
      { id: 's-console', Comp: 'JuliusConsole', x: '64%', y: '50%', w: '32%', h: '18%',
        props: {},
        hot: { x: '80%', y: '58%' },
        info: {
          kicker: 'CASE GOODS', name: 'Julius media console',
          design: 'ebonized oak \u00b7 brass inlay pulls',
          meta: [['Length','68\u2033'],['Depth','18\u2033'],['Height','24\u2033'],['Finish','ebonized oak, brass']],
        } },

      // Floor lamp — far left, full height behind sofa
      { id: 's-lamp', Comp: 'LunaLamp', x: '1%', y: '8%', w: '13%', h: '66%',
        props: {},
        hot: { x: '7%', y: '20%' },
        info: {
          kicker: 'LIGHTING', name: 'Luna Drop arched floor lamp',
          design: 'brass arc \u00b7 frosted glass globe \u00b7 marble base',
          meta: [['Height','70\u2033'],['Shade','frosted glass globe, \u00d8 12\u2033'],['Base','honed white marble'],['Bulb','integrated LED, 2700 K']],
        } },

      // Accent chair — right of sofa, on rug
      { id: 's-chair', Comp: 'BoucleChair', x: '54%', y: '34%', w: '15%', h: '40%',
        props: {},
        hot: { x: '61%', y: '54%' },
        info: {
          kicker: 'ACCENT CHAIR', name: 'Colby boucle accent chair',
          design: 'walnut frame \u00b7 brass arm supports \u00b7 ivory boucle',
          meta: [['Width','29\u2033'],['Depth','27\u2033'],['Height','32\u2033'],['Upholstery','ivory boucle']],
        } },

      // Sectional — main piece, left-center, sits on rug
      { id: 's-sofa', Comp: 'MustardSectional', x: '15%', y: '36%', w: '44%', h: '38%',
        props: {},
        hot: { x: '37%', y: '54%' },
        info: {
          kicker: 'SEATING', name: 'Modular three-piece sectional',
          design: 'mustard chenille \u00b7 channel-stitched, foam-filled',
          meta: [['Width','110\u2033 overall'],['Depth','38\u2033'],['Seat height','17\u2033'],['Cushions','3 back + 3 throw']],
        } },

      // Coffee table — front-center, on rug, overlapping front of sofa
      { id: 's-table', Comp: 'WalnutMarbleTable', x: '24%', y: '60%', w: '28%', h: '20%',
        props: {},
        hot: { x: '38%', y: '74%' },
        info: {
          kicker: 'TABLE', name: 'Walnut plinth coffee table',
          design: 'solid walnut base \u00b7 honed white marble top',
          meta: [['Length','58\u2033'],['Depth','28\u2033'],['Height','15\u2033'],['Top','honed white marble']],
        } },

      // Wall art — DROP SLOT (image-slot web component). User drops their art.
      // Gated by tweak: t.wallArt === 'visible'
      { id: 's-art', Comp: 'ArtSlot', x: '22%', y: '6%', w: '24%', h: '24%',
        props: { slotId: 'salon-wall-art', placeholder: 'wall art · drop here' },
        gate: 'wallArt',
        hot: { x: '34%', y: '18%', dark: false },
        info: {
          kicker: 'ART', name: 'Wall art \u2014 placeholder',
          design: 'piece to be selected by client',
          meta: [['Position','above sectional'],['Suggested','~36\u2033 \u00d7 48\u2033'],['Frame','tbd'],['Status','placeholder']],
        } },

      // Lilac throw on the sofa — the brand colour landing in a mustard room.
      // Gated by tweak: t.accent !== 'none'
      { id: 's-throw', Comp: 'Throw', x: '37%', y: '44%', w: '11%', h: '10%',
        props: { color: '#9B7FA6' },
        gate: 'accentThrow',
        hot: { x: '42%', y: '48%' },
        info: {
          kicker: 'TEXTILE', name: 'Lilac wool throw',
          design: 'hand-loomed wool \u00b7 fringed',
          meta: [['Size','50\u2033 \u00d7 60\u2033'],['Fibre','100% lambswool'],['Colour','dusty lilac'],['Care','dry clean']],
        } },

      // Plant in lilac vessel — beside the chair on the floor.
      // Gated by tweak: t.accent === 'loud'
      { id: 's-plant', Comp: 'Vase', x: '73%', y: '52%', w: '9%', h: '24%',
        props: { color: '#9B7FA6', stem: '#6B7A5C' },
        gate: 'accentPlant',
        hot: { x: '77%', y: '60%' },
        info: {
          kicker: 'OBJECT', name: 'Eucalyptus in lilac vessel',
          design: 'studio ceramics \u00b7 stoneware, satin glaze',
          meta: [['Vessel height','15\u2033'],['Stem height','24\u2033'],['Botanical','dusty eucalyptus'],['Glaze','satin lilac']],
        } },
    ],
  },
  {
    id: 'bedroom',
    kind: 'room',
    label: '02 — the bedroom',
    mood: 'bedroom · sage, linen, low light',
    eyebrow: 'A BEDROOM ON FLOOR 27',
    headline: 'Quiet enough to hear<br><em>the harbour at night.</em>',
    blurb: 'Sage walls in clay paint, a low oak bed with a linen headboard, one ceramic pendant. Nothing that hums. Nothing that glows.',
    palette: {
      '--wall-color':   '#6B7A5C',
      '--floor-color':  '#3f4a35',
      '--accent-color': '#F0EAE0',
      '--sky-top':      '#9B7FA6',
      '--sky-bot':      '#46384D',
    },
    items: [
      { id: 'b-bed',    Comp: 'Bed',     x: '14%', y: '58%', w: 380, h: 150, props: { frame: '#181420', cloth: '#F0EAE0', pillow: '#CDBBD4' },
        hot: { x: '32%', y: '64%' },
        info: { kicker: 'BED', name: 'Low platform bed', design: 'Studio Surround · made in Prince Edward County', blurb: 'Solid white oak, hand-rubbed finish. The headboard wraps in heavy washed linen.', meta: [['Wood','white oak, FSC'],['Size','queen / king'],['Lead time','14 weeks'],['Investment','from $5,400']] }},
      { id: 'b-pendant', Comp: 'Pendant', x: '64%', y: '8%', w: 110, h: 180, props: { color: '#C49A7A', cord: '#181420' },
        hot: { x: '69%', y: '16%' },
        info: { kicker: 'LIGHTING', name: 'Brass pendant, hand-spun', design: 'In Common With · NYC', blurb: 'A single brass cone above the side of the bed — the only fixture in the room.', meta: [['Material','spun brass'],['Drop','adjustable to 120 cm'],['Bulb','E26, dim-to-warm'],['Source','via surround']] }},
      { id: 'b-vase',   Comp: 'Vase',    x: '78%',  y: '40%', w: 70, h: 150, props: { color: '#46384D', stem: '#C49A7A' },
        hot: { x: '81%', y: '44%' },
        info: { kicker: 'OBJECT', name: 'Pampas in plum vessel', design: 'Vessel by surround ceramics', blurb: 'A reach of bleached pampas, refreshed seasonally. The vessel is glazed in deep plum.', meta: [['Ceramic','stoneware, matte'],['Height','42 cm'],['Refresh','seasonal'],['Investment','from $380']] }},
      { id: 'b-art',    Comp: 'Artwork', x: '24%', y: '42%',  w: 130, h: 84, props: { frame: '#F0EAE0', tint1: '#46384D', tint2: '#9B7FA6' },
        hot: { x: '28%', y: '46%' },
        info: { kicker: 'ART', name: '"Night, harbour" — oil on canvas', design: 'commissioned · Olivia Cheng', blurb: 'A commissioned piece sized to the headboard. One of one.', meta: [['Edition','1 of 1'],['Size','72 × 48 cm'],['Frame','limed oak'],['Investment','$2,400']] }},
      { id: 'b-rug',    Comp: 'Rug',     x: '12%', y: '82%', w: 460, h: 60, props: { color: '#F0EAE0' },
        hot: { x: '28%', y: '92%' },
        info: { kicker: 'RUG', name: 'Sheepskin layered runner', design: 'Two natural sheepskins · via surround', blurb: 'A layered pair of undyed Icelandic sheepskins along the bedside.', meta: [['Size','2 × 3.4 m combined'],['Fibre','sheepskin, undyed'],['Care','seasonal airing'],['Investment','from $1,800']] }},
    ],
  },
  {
    id: 'kitchen',
    kind: 'room',
    label: '03 — the kitchen',
    mood: 'kitchen · plum walls, clay countertop, brass',
    eyebrow: 'A KITCHEN AT DUSK',
    headline: 'A kitchen that holds<br><em>a real dinner.</em>',
    blurb: 'Deep plum cabinetry. A clay-coloured stone countertop. Brass pulls warmed by every fingerprint. The lights stay low until ten.',
    palette: {
      '--wall-color':   '#24202E',
      '--floor-color':  '#0e0b16',
      '--accent-color': '#C49A7A',
      '--sky-top':      '#C49A7A',
      '--sky-bot':      '#46384D',
    },
    items: [
      { id: 'k-counter',Comp: 'Counter', x: '8%',  y: '52%', w: 480, h: 150, props: { color: '#181420', top: '#C49A7A' },
        hot: { x: '24%', y: '58%' },
        info: { kicker: 'CABINETRY', name: 'Plum oak island', design: 'Studio Surround · joinery by Forge & Co.', blurb: 'Fluted white oak fronts stained deep plum, brass push-pulls, a single 10ft slab of stone on top.', meta: [['Wood','rift-cut white oak'],['Stone','clay-tone Calacatta'],['Length','3 m'],['Investment','from $24,000']] }},
      { id: 'k-pendant',Comp: 'Pendant', x: '36%', y: '4%',  w: 130, h: 200, props: { color: '#C49A7A', cord: '#181420' },
        hot: { x: '42%', y: '14%' },
        info: { kicker: 'LIGHTING', name: 'Brass cone pendant', design: 'Apparatus Studio · NYC', blurb: 'A single hand-spun brass cone above the island. Dimmable to 1%.', meta: [['Material','solid brass'],['Drop','adjustable'],['Dim range','100 → 1%'],['Source','via surround']] }},
      { id: 'k-pendant2',Comp: 'Pendant', x: '60%', y: '4%',  w: 130, h: 200, props: { color: '#C49A7A', cord: '#181420' },
        hot: { x: '66%', y: '14%' },
        info: { kicker: 'LIGHTING', name: 'Brass cone, second pendant', design: 'Apparatus Studio · paired', blurb: 'Identical to its sister. We always hang them in pairs over an island.', meta: [['Material','solid brass'],['Drop','adjustable'],['Pair','always'],['Source','via surround']] }},
      { id: 'k-vase',   Comp: 'Vase',    x: '52%', y: '40%', w: 60, h: 110, props: { color: '#9B7FA6', stem: '#6B7A5C' },
        hot: { x: '55%', y: '42%' },
        info: { kicker: 'OBJECT', name: 'Herbs in dusk vessel', design: 'Vessel by surround ceramics', blurb: 'Living rosemary in a satin-glazed stoneware pot. The kitchen smells like dinner.', meta: [['Ceramic','stoneware, satin'],['Height','24 cm'],['Care','sun & weekly water'],['Investment','from $180']] }},
      { id: 'k-art',    Comp: 'Artwork', x: '24%', y: '36%', w: 130, h: 84, props: { frame: '#C49A7A', tint1: '#181420', tint2: '#9B7FA6' },
        hot: { x: '28%', y: '40%' },
        info: { kicker: 'ART', name: '"Dusk over the lake" — risograph', design: 'Edition of 30 · Olivia Cheng', blurb: 'A two-colour risograph framed in brass. The print run sold out in a week — we held three back.', meta: [['Edition','12 of 30'],['Size','61 × 41 cm'],['Frame','solid brass'],['Investment','$1,100']] }},
    ],
  },
  {
    id: 'begin',
    kind: 'begin',
    label: '04 — begin',
    mood: 'begin · a conversation',
  },
];

Object.assign(window, { SCENES });
