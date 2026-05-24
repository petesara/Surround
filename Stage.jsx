// Stage — orchestrates scene transitions, panel, top/bottom bars.
const { useState, useEffect, useRef, useMemo } = React;

// ── Tweaks defaults ──────────────────────────────────────────────
// Three salon-scene knobs surfaced through the Tweaks toggle.
// accent:   how much lilac lands in the otherwise mustard room
// wallArt:  whether the user's drop-slot frame is visible above the sofa
// daylight: tones the city sky in the O-window
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "loud",
  "wallArt": "visible",
  "daylight": "afternoon"
}/*EDITMODE-END*/;

// Decide if an item should render for the current tweak state.
function itemPassesGate(item, t) {
  if (!item.gate) return true;
  if (item.gate === 'wallArt')      return t.wallArt === 'visible';
  if (item.gate === 'accentThrow')  return t.accent !== 'none';
  if (item.gate === 'accentPlant')  return t.accent === 'loud';
  return true;
}

// Salon-only: merge a daylight palette override into the scene's palette and
// drop any items gated out by the current tweak state.
const DAYLIGHT_PALETTES = {
  afternoon: { '--sky-top': '#C49A7A', '--sky-bot': '#9B7FA6' },
  dusk:      { '--sky-top': '#9B7FA6', '--sky-bot': '#46384D' },
  night:     { '--sky-top': '#46384D', '--sky-bot': '#0E0B16' },
};
function applyTweaks(scene, t) {
  if (scene.id !== 'salon') return scene;
  return {
    ...scene,
    palette: { ...scene.palette, ...(DAYLIGHT_PALETTES[t.daylight] || {}) },
    items: (scene.items || []).filter(it => itemPassesGate(it, t)),
  };
}

// All furniture components — both SVG primitives and the photo wrappers.
const FURN_COMPONENTS = {
  Sofa, ArcLamp, CoffeeTable, Vase, Artwork, Chair, Bed, Rug, Pendant, Counter,
  Photo, Placeholder, Throw, ArtSlot,
  MustardSectional, BoucleChair, WalnutMarbleTable, JuliusConsole, LunaLamp, HerizRug,
};

function TopBar({ scene, onJump, idx, total }) {
  return (
    <div className="topbar" data-screen-label="topbar">
      <div className="brand" onClick={() => onJump(0)}>
        <span className="the">the</span>surround
        <span className="mood">interiors · M5V Toronto</span>
      </div>
      <div className="topbar-nav">
        <a onClick={() => onJump(1)}>Salon</a>
        <a onClick={() => onJump(2)}>Bedroom</a>
        <a onClick={() => onJump(3)}>Kitchen</a>
        <a onClick={() => onJump(4)}>Begin</a>
      </div>
    </div>
  );
}

function BottomBar({ idx, total, setIdx, scene }) {
  const isLast = idx === total - 1;
  return (
    <div className="bottombar" data-screen-label="bottombar">
      <div className="scene-now"><em>{String(idx).padStart(2, '0')} / {String(total - 1).padStart(2, '0')}</em> {scene.mood}</div>
      <div className="dots">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} className={"dot-btn" + (i === idx ? " active" : "")} onClick={() => setIdx(i)} aria-label={"scene " + i}/>
        ))}
      </div>
      <div className="nav-btn">
        <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>← prev</button>
        <button className={isLast ? "primary" : ""} onClick={() => setIdx(Math.min(total - 1, idx + 1))} disabled={isLast && false}>
          {isLast ? "begin a project →" : "next →"}
        </button>
      </div>
    </div>
  );
}

function OpeningScene() {
  const dots = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    delay: -Math.random() * 6 + 's',
    size: Math.random() * 1.5 + 1 + 'px',
    opacity: Math.random() * 0.5 + 0.2,
  })), []);
  return (
    <>
      <div className="opening-particles">
        {dots.map((d, i) => (
          <span key={i} style={{ left: d.left, top: d.top, width: d.size, height: d.size, opacity: d.opacity, animationDelay: d.delay }} />
        ))}
      </div>
      <div className="opening-mark">
        <div className="O-big"></div>
        <div className="wm"><span className="the">the</span> surround</div>
        <div className="sub">interior design · Toronto</div>
        <div className="place">click anywhere to step in &nbsp;·&nbsp; → for next</div>
      </div>
    </>
  );
}

function RoomScene({ scene, onHotspot }) {
  return (
    <>
      <div className="room">
        <div className="wall">
          <div className="O-window"></div>
        </div>
        <div className="floor"></div>
      </div>

      <div className="scene-label">
        <div className="eyebrow">{scene.eyebrow}</div>
        <h1 dangerouslySetInnerHTML={{ __html: scene.headline }} />
        {scene.blurb && <p>{scene.blurb}</p>}
      </div>

      {scene.items.map((item) => {
        const Comp = FURN_COMPONENTS[item.Comp];
        if (!Comp) return null;
        return (
          <div key={item.id} className="furn" style={{ left: item.x, top: item.y, width: item.w, height: item.h }}>
            <Comp {...item.props} />
          </div>
        );
      })}

      {scene.items.map((item) => (
        <button
          key={item.id + '-hot'}
          className={"hotspot" + (item.hot.dark ? " dark" : "")}
          style={{ left: item.hot.x, top: item.hot.y, transform: 'translate(-50%, -50%)' }}
          onClick={() => onHotspot(item)}
          aria-label={"open " + item.info.name}
        >
          <span className="pulse"></span>
          <span className="dot"></span>
        </button>
      ))}

      <div className="moodboard-rail">
        <span className="count">{scene.items.length} pieces</span>
        <span className="hint">tap a dot to see the source</span>
      </div>
    </>
  );
}

function BeginScene() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="room" style={{ background: 'linear-gradient(135deg, #806588 0%, #46384D 100%)' }}>
        <div className="wall">
          {/* No O-window in begin — this scene is a form, not a room. The brand mark in the corner is the O moment. */}
        </div>
        <div className="floor" style={{ background: '#2a1f30' }}></div>
      </div>
      <div className="begin-content">
        <div>
          <div className="scene-label" style={{ position: 'relative', left: 0, top: 0 }}>
            <div className="eyebrow" style={{ color: 'rgba(240,234,224,0.7)' }}>04 — BEGIN</div>
            <h1 style={{ fontSize: 'clamp(52px, 6vw, 88px)' }}>
              Tell us about<br /><em>the room.</em>
            </h1>
            <p style={{ color: 'rgba(240,234,224,0.85)' }}>
              Send a few photos, your floor plan if you have it, and a sentence about how the room should feel. We respond within 48 hours.
            </p>
          </div>
        </div>
        <form className="begin-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div style={{ border: '1px solid rgba(240,234,224,0.4)', borderRadius: 'var(--r-3)', padding: 28, color: 'var(--bone)' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 12 }}>Received.</div>
              <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                You'll hear from us by Thursday. In the meantime, look at the floor.
              </div>
            </div>
          ) : (
            <>
              <div><label>Name</label><input placeholder="" /></div>
              <div><label>Email</label><input type="email" placeholder="" /></div>
              <div>
                <label>The project</label>
                <select>
                  <option>a single room</option>
                  <option>a whole condo</option>
                  <option>just moodboarding for now</option>
                </select>
              </div>
              <div>
                <label>Investment range</label>
                <select>
                  <option>$15k – $40k</option>
                  <option>$40k – $80k</option>
                  <option>$80k +</option>
                </select>
              </div>
              <div>
                <label>A sentence about how the room should feel</label>
                <textarea rows="2" placeholder="like a slow afternoon, but with friends over"></textarea>
              </div>
              <button className="submit" type="submit">send → <span className="arr">→</span></button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

function DetailPanel({ item, onClose }) {
  // Imperatively animate the panel mask + panel using WAAPI (CSS transitions
  // get throttled in this iframe environment).
  const maskRef = useRef(null);
  const panelRef = useRef(null);
  const [content, setContent] = useState(null);
  const open = !!item;

  // Capture item so the panel content remains during exit animation
  useEffect(() => {
    if (item) setContent(item);
  }, [item]);

  useEffect(() => {
    const mask = maskRef.current, panel = panelRef.current;
    if (!mask || !panel) return;
    mask.getAnimations().forEach(a => a.cancel());
    panel.getAnimations().forEach(a => a.cancel());
    if (open) {
      mask.style.pointerEvents = 'auto';
      mask.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
      panel.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
    } else {
      mask.style.pointerEvents = 'none';
      const a = mask.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
      panel.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
      // clear content after exit
      const t = setTimeout(() => setContent(null), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!content) return null;
  return (
    <div ref={maskRef} className="panel-mask" style={{ opacity: 0, pointerEvents: 'none' }} onClick={onClose}>
      <div ref={panelRef} className="panel" style={{ transform: 'translateX(100%)' }} onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose} aria-label="close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <div className={"panel-photo" + (content.Comp === 'Photo' ? ' is-photo' : '') + (content.Comp === 'ArtSlot' ? ' is-slot' : '')} style={{ background: panelBg(content.Comp) }}>
          {(() => {
            const C = FURN_COMPONENTS[content.Comp];
            if (!C) return null;
            // For photo pieces, override fit to 'cover' so the panel header fills.
            const props = content.Comp === 'Photo' ? { ...content.props, fit: 'cover' } : content.props;
            return <C {...props} />;
          })()}
        </div>
        <div className="panel-body">
          <div className="kicker">{content.info.kicker}</div>
          <h3>{content.info.name}</h3>
          <div className="design">{content.info.design}</div>
          <p className="blurb">{content.info.blurb}</p>
          <div className="meta-row">
            {content.info.meta.map(([k, v], i) => (
              <div key={i}><div className="k">{k}</div><div className="v">{v}</div></div>
            ))}
          </div>
          <div className="panel-actions">
            <button className="btn-pri">Save to moodboard <span className="arr">→</span></button>
            <button className="btn-sec">We'll source for you <span className="arr">→</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function panelBg(comp) {
  // Per-piece background tint for the panel photo header
  const map = {
    Sofa: '#CDBBD4', ArcLamp: '#46384D', CoffeeTable: '#E7DFD0', Vase: '#9B7FA6',
    Artwork: '#F0EAE0', Chair: '#6B7A5C', Bed: '#806588', Rug: '#E7DFD0',
    Pendant: '#24202E', Counter: '#46384D',
    Photo: '#F0EAE0', Throw: '#CDBBD4', ArtSlot: '#24202E', Placeholder: '#24202E',
    // Modeled Sutton pieces
    MustardSectional: '#3a2e22',
    BoucleChair: '#E4D9E8',
    WalnutMarbleTable: '#2a2018',
    JuliusConsole: '#E7DFD0',
    LunaLamp: '#2a2335',
    HerizRug: '#F4EFE6',
  };
  return map[comp] || '#E4D9E8';
}

function SceneSlot({ scene, cls, extra, isActive, isBehind, children }) {
  const ref = useRef(null);
  // Apply target styles imperatively on every change — using Web Animations API
  // (CSS transitions get frozen in this preview iframe).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targetOp = isActive ? 1 : 0;
    const targetScale = isActive ? 1 : (isBehind ? 0.96 : 1.04);
    const targetBlur = isActive ? 0 : 8;
    // Cancel previous
    el.getAnimations().forEach(a => a.cancel());
    // Read current
    const cs = getComputedStyle(el);
    const curOp = parseFloat(cs.opacity);
    el.animate(
      [
        { opacity: curOp, transform: cs.transform, filter: cs.filter },
        { opacity: targetOp, transform: `scale(${targetScale})`, filter: `blur(${targetBlur}px)` },
      ],
      { duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    );
  }, [isActive, isBehind]);

  return (
    <div
      ref={ref}
      className={"scene" + extra + " " + cls}
      style={{
        ...(scene.palette || {}),
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'scale(1)' : (isBehind ? 'scale(0.96)' : 'scale(1.04)'),
        filter: isActive ? 'blur(0px)' : 'blur(8px)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      data-screen-label={scene.label}
    >
      {children}
    </div>
  );
}

function Stage() {
  const [idx, setIdx] = useState(0);
  const [hot, setHot] = useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const onKey = (e) => {
      if (hot) {
        if (e.key === 'Escape') setHot(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); setIdx(i => Math.min(SCENES.length - 1, i + 1)); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { setIdx(i => Math.max(0, i - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hot]);

  // Click anywhere on opening scene → advance
  useEffect(() => {
    if (idx !== 0) return;
    const onClick = (e) => {
      // Don't advance if clicking topbar / bottombar / tweaks panel
      if (e.target.closest('.topbar') || e.target.closest('.bottombar') || e.target.closest('.twk-panel')) return;
      setIdx(1);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [idx]);

  const scene = SCENES[idx];

  return (
    <div className="stage">
      <TopBar scene={scene} idx={idx} total={SCENES.length} onJump={setIdx} />
      <div className="scene-area">
        {SCENES.map((s, i) => {
          const cls = i === idx ? 'active' : (i < idx ? 'behind' : 'ahead');
          const extra = s.kind === 'opening' ? ' opening' : '';
          const tweaked = applyTweaks(s, t);
          return (
            <SceneSlot key={s.id} scene={tweaked} cls={cls} extra={extra} isActive={i === idx} isBehind={i < idx}>
              {s.kind === 'opening' && <OpeningScene />}
              {s.kind === 'room'    && <RoomScene scene={tweaked} onHotspot={setHot} />}
              {s.kind === 'begin'   && <BeginScene />}
            </SceneSlot>
          );
        })}
      </div>
      <BottomBar idx={idx} total={SCENES.length} setIdx={setIdx} scene={scene} />
      <DetailPanel item={hot} onClose={() => setHot(null)} />
      <SurroundTweaks t={t} setTweak={setTweak} sceneId={scene.id} />
    </div>
  );
}

// ── Tweaks panel for the salon ──────────────────────────────────
// Auto-opens only when the user activates Tweaks from the host toolbar.
// Only the salon scene reads these knobs.
function SurroundTweaks({ t, setTweak, sceneId }) {
  const onSalon = sceneId === 'salon';
  return (
    <TweaksPanel title="Salon · tweaks">
      <div style={{ fontSize: 10.5, letterSpacing: '0.06em', color: 'rgba(41,38,27,0.6)', margin: '2px 0 6px' }}>
        {onSalon ? 'Adjusting the salon scene.' : 'Switch to scene 01 to see these tweaks take effect.'}
      </div>
      <TweakSection label="The lilac moment" />
      <TweakRadio
        label="Accent" value={t.accent}
        options={['none', 'throw', 'loud']}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakSection label="Wall art" />
      <TweakRadio
        label="Frame" value={t.wallArt}
        options={['visible', 'hidden']}
        onChange={(v) => setTweak('wallArt', v)}
      />
      <TweakSection label="Light" />
      <TweakRadio
        label="Daylight" value={t.daylight}
        options={['afternoon', 'dusk', 'night']}
        onChange={(v) => setTweak('daylight', v)}
      />
    </TweaksPanel>
  );
}

Object.assign(window, { Stage });
