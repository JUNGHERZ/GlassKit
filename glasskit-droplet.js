// ============================================================
// GlassKit – Droplet
//
// The motion behind .glass-tab-bar--droplet and .glass-segmented--droplet.
// The stylesheet draws the drop of glass; this module puts it on the chosen
// item, lets it run to a new one, and lets a finger drag it along the row.
// Optional and dependency-free: without it a --droplet row keeps its usual
// look, the tab bar its spotlight and the segmented row its raised option.
//
//   import { attachDroplets } from '@jungherz-de/glasskit/glasskit-droplet.js';
//   attachDroplets();                    // every --droplet row in the page
//
//   import { attachDroplet } from '@jungherz-de/glasskit/glasskit-droplet.js';
//   const drop = attachDroplet(row);     // one row; drop.update(), drop.destroy()
//
// The chosen item is the tab with .is-active or the option with
// aria-pressed="true". The page keeps setting them its own way and the drop
// follows. Dragged onto another item, the drop clicks it, so the page's own
// click handler makes the choice. In a row that scrolls sideways a swipe
// still scrolls: only the drop itself is dragged, and the row scrolls along
// at its edges.
//
// It writes what glasskit.css reads: data-droplet on the row, the chosen
// item's box as --gl-droplet-left, -right, -top and -bottom, data-droplet-dir
// and data-droplet-lift while the drop travels, data-droplet-drag while a
// finger holds it, and .is-under-droplet on the item below it.
//
// A row laid out as a column — a vertical tab bar, a sidebar — runs the drop
// along y (since 1.32.0): data-droplet-axis="y" on the row, the directions
// "down" and "up", the drag on the vertical. The axis comes from the row's
// aria-orientation="vertical" or its flex-direction. The timing comes from
// the --gl-droplet-* tokens, which the module reads as well: the lift and how
// long the lens follows the drop.
//
// Options of attachDroplet, for rows whose items live elsewhere (GlassKit
// Elements uses them): items() returns the items, isChosen(item) tells the
// chosen one, choose(item) picks one, lens(item, on) marks the item below
// the drop. Without a MutationObserver reaching the items, call update()
// after the choice changed.
// ============================================================

const ROWS = '.glass-tab-bar--droplet, .glass-segmented--droplet';
const ITEMS = '.glass-tab-bar__item, .glass-segmented__item';
const attached = new WeakMap();

// A duration token as the browser hands it over, "0.3s" or "280ms".
const ms = (value, fallback) => {
  const v = String(value).trim(), n = parseFloat(v);
  if (Number.isNaN(n)) return fallback;
  return v.endsWith('ms') ? n : v.endsWith('s') ? n * 1000 : fallback;
};

export function attachDroplet(row, options = {}) {
  if (attached.has(row)) return attached.get(row);

  const items = options.items || (() => [...row.querySelectorAll(ITEMS)]);
  const isChosen = options.isChosen
    || (it => it.classList.contains('is-active') || it.getAttribute('aria-pressed') === 'true');
  const choose = options.choose || (it => it.click());
  const mark = options.lens || ((it, on) => it.classList.toggle('is-under-droplet', on));
  const usable = it => !it.disabled && it.getAttribute('aria-disabled') !== 'true';
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const set = (k, px) => row.style.setProperty(`--gl-droplet-${k}`, `${px}px`);
  const token = (name, fallback) => ms(getComputedStyle(row).getPropertyValue(`--gl-droplet-${name}`), fallback);

  // pos is where the drop starts along the axis: left in a row, top in a
  // column. The axis is read again whenever the drop is placed.
  let chosen = null, pos = 0, placed = null, liftTimer = 0, lensFrame = 0, edgeFrame = 0;
  let drag = null, eatClick = false, under = null, axisY = false;
  const vertical = () => row.getAttribute('aria-orientation') === 'vertical'
    || getComputedStyle(row).flexDirection.startsWith('column');
  const scrolls = () => axisY ? row.scrollHeight > row.clientHeight + 1 : row.scrollWidth > row.clientWidth + 1;

  // The row on screen and its scale there. Rects are viewport pixels, scaled
  // by every transform on an ancestor — an app that zooms in on start, a
  // popover that opens from scale(0.96) — while the drop's lengths are the
  // row's own. So distances on screen are divided by the scale: the drop
  // sits right at rest and while such a transform runs, and nothing needs
  // measuring again when it ends (before 1.28.0 it stayed beside the item).
  // The layout size is the computed one under GlassKit's border-box,
  // unscaled and nearly unrounded, else the offset size, rounded to whole
  // pixels. A difference within that rounding is no transform: the rects
  // are then taken as they are, as before.
  const frame = () => {
    const n = row.getBoundingClientRect(), cs = getComputedStyle(row);
    const exact = cs.boxSizing === 'border-box', tolerance = exact ? 0.05 : 0.5;
    const w = exact ? parseFloat(cs.width) : row.offsetWidth;
    const h = exact ? parseFloat(cs.height) : row.offsetHeight;
    const scale = (onScreen, own) => onScreen > 0 && own > 0 && Math.abs(onScreen - own) > tolerance ? onScreen / own : 1;
    return { n, sx: scale(n.width, w), sy: scale(n.height, h) };
  };
  // An item's box in the row's padding box; in a row that scrolls, in its
  // scrolled content, where the drop scrolls along with the items.
  const boxOf = (it, f = frame()) => {
    const r = it.getBoundingClientRect();
    const l = (r.left - f.n.left) / f.sx - row.clientLeft + row.scrollLeft;
    const t = (r.top - f.n.top) / f.sy - row.clientTop + row.scrollTop;
    const height = r.height / f.sy;
    return { left: l, width: r.width / f.sx, top: t, height, bottom: row.clientHeight - t - height };
  };
  const put = b => {
    pos = axisY ? b.top : b.left;
    set('left', b.left); set('right', row.clientWidth - b.left - b.width);
    set('top', b.top); set('bottom', row.clientHeight - b.top - b.height);
  };
  const centreOf = b => axisY ? b.top + b.height / 2 : b.left + b.width / 2;

  // The usable item nearest a point of the row lights up as under a lens.
  const lens = centre => {
    let below = null, best = Infinity;
    const f = centre == null ? null : frame();
    if (f) for (const it of items()) {
      if (!usable(it)) continue;
      const d = Math.abs(centreOf(boxOf(it, f)) - centre);
      if (d < best) { best = d; below = it; }
    }
    if (below !== under) {
      if (under) mark(under, false);
      if (below) mark(below, true);
      under = below;
    }
    return below;
  };
  // While the drop travels, the lens follows its centre — as long as its
  // edges travel by the tokens, the trailing one the longer (620 ms unset).
  const follow = () => {
    cancelAnimationFrame(lensFrame);
    const start = performance.now();
    const length = Math.max(token('duration', 300), token('trail-delay', 40) + token('trail-duration', 500)) + 80;
    const step = now => {
      if (now - start > length) { lens(null); return; }
      const cs = getComputedStyle(row, '::before');
      if (axisY) {
        const t = parseFloat(cs.top), b = parseFloat(cs.bottom);
        lens(t + (row.clientHeight - t - b) / 2);
      } else {
        const l = parseFloat(cs.left), r = parseFloat(cs.right);
        lens(l + (row.clientWidth - l - r) / 2);
      }
      lensFrame = requestAnimationFrame(step);
    };
    lensFrame = requestAnimationFrame(step);
  };

  const place = (it, travel) => {
    axisY = vertical();
    if (axisY) row.dataset.dropletAxis = 'y';
    else delete row.dataset.dropletAxis;
    const b = boxOf(it), to = axisY ? b.top : b.left;
    row.dataset.droplet = '';
    if (travel && motion.matches && Math.abs(to - pos) > 1) {
      row.dataset.dropletDir = axisY ? (to > pos ? 'down' : 'up') : (to > pos ? 'right' : 'left');
      row.dataset.dropletLift = '';
      clearTimeout(liftTimer);
      liftTimer = setTimeout(() => { delete row.dataset.dropletLift; }, token('lift-duration', 280));
      follow();
    } else {
      delete row.dataset.dropletDir;
    }
    put(b);
    placed = { ...b, rowWidth: row.clientWidth, rowHeight: row.clientHeight };
    chosen = it;
  };

  // Follow the choice. Nothing chosen, no drop. A new item is watched for
  // its size too; a size that changed moves the drop without a journey.
  const update = () => {
    for (const it of items()) if (!watched.has(it)) { watched.add(it); ro.observe(it); }
    const it = items().find(isChosen);
    if (!it) {
      if (chosen) { chosen = null; placed = null; delete row.dataset.droplet; }
      return;
    }
    if (it !== chosen) place(it, chosen !== null && row.dataset.droplet !== undefined);
  };
  const ro = new ResizeObserver(() => {
    if (!chosen || drag?.moved) return;
    const b = { ...boxOf(chosen), rowWidth: row.clientWidth, rowHeight: row.clientHeight };
    if (!placed || Object.keys(b).some(k => Math.abs(b[k] - placed[k]) > 0.5)) place(chosen, false);
  });
  const watched = new Set();
  ro.observe(row);
  const mo = new MutationObserver(update);
  mo.observe(row, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'aria-pressed'] });

  // Dragging: past 8px the drop slides under the finger and grows into a
  // lens; let go, the item below it is chosen and the drop settles on it.
  // Along the row's axis: x in a row, y in a column.
  const at = client => {
    const f = frame();
    const p = axisY
      ? (client - f.n.top) / f.sy - row.clientTop + row.scrollTop
      : (client - f.n.left) / f.sx - row.clientLeft + row.scrollLeft;
    const boxes = items().map(it => boxOf(it, f));
    const min = Math.min(...boxes.map(b => axisY ? b.top : b.left));
    const max = Math.max(...boxes.map(b => axisY ? b.top + b.height : b.left + b.width)) - drag.size;
    return Math.min(max, Math.max(min, p - drag.size / 2));
  };
  const track = () => {
    const p = at(drag.client), b = boxOf(chosen);
    put(axisY ? { ...b, top: p, height: drag.size } : { ...b, left: p, width: drag.size });
    drag.below = lens(p + drag.size / 2);
    cancelAnimationFrame(edgeFrame);
    if (!scrolls()) return;
    const n = row.getBoundingClientRect(), zone = 32;
    const lo = axisY ? n.top : n.left, hi = axisY ? n.bottom : n.right;
    const v = drag.client < lo + zone ? -1 : drag.client > hi - zone ? 1 : 0;
    if (v) edgeFrame = requestAnimationFrame(() => {
      if (axisY) row.scrollTop += v * 6; else row.scrollLeft += v * 6;
      if (drag?.moved) track();
    });
  };
  const down = e => {
    if (!chosen || drag || !usable(chosen) || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if (scrolls() && !e.composedPath().includes(chosen)) return;
    const b = boxOf(chosen), client = axisY ? e.clientY : e.clientX;
    drag = { id: e.pointerId, start: client, client, size: axisY ? b.height : b.width, moved: false, below: null };
  };
  const move = e => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.client = axisY ? e.clientY : e.clientX;
    if (!drag.moved) {
      if (Math.abs(drag.client - drag.start) < 8) return;
      drag.moved = true;
      row.setPointerCapture(e.pointerId);
      delete row.dataset.dropletDir;
      row.dataset.dropletDrag = '';
    }
    track();
  };
  const up = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    cancelAnimationFrame(edgeFrame);
    if (!d.moved) return;                         // a tap: the item's own click does it
    delete row.dataset.dropletDrag;
    lens(null);
    const target = d.below || chosen;
    if (e.type === 'pointerup' && target !== chosen) choose(target);
    // Settle where the choice is, unless it already set the drop on its way.
    const next = items().find(isChosen) || chosen;
    if (next !== chosen || row.dataset.dropletDir === undefined) place(next, true);
    eatClick = true;                              // the click the drag ends in
    setTimeout(() => { eatClick = false; }, 400);
  };
  const click = e => { if (eatClick) { eatClick = false; e.stopPropagation(); e.preventDefault(); } };
  row.addEventListener('pointerdown', down);
  row.addEventListener('pointermove', move);
  row.addEventListener('pointerup', up);
  row.addEventListener('pointercancel', up);
  row.addEventListener('click', click, true);

  update();

  const handle = {
    update,
    destroy() {
      mo.disconnect(); ro.disconnect();
      clearTimeout(liftTimer); cancelAnimationFrame(lensFrame); cancelAnimationFrame(edgeFrame);
      row.removeEventListener('pointerdown', down);
      row.removeEventListener('pointermove', move);
      row.removeEventListener('pointerup', up);
      row.removeEventListener('pointercancel', up);
      row.removeEventListener('click', click, true);
      lens(null);
      for (const k of ['droplet', 'dropletDir', 'dropletLift', 'dropletDrag', 'dropletAxis']) delete row.dataset[k];
      for (const k of ['left', 'right', 'top', 'bottom']) row.style.removeProperty(`--gl-droplet-${k}`);
      attached.delete(row);
    },
  };
  attached.set(row, handle);
  return handle;
}

// Every --droplet row below a root: the document, or a shadow root.
export function attachDroplets(root = document) {
  return [...root.querySelectorAll(ROWS)].map(row => attachDroplet(row));
}
