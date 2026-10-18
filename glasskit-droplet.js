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
// Options of attachDroplet, for rows whose items live elsewhere (GlassKit
// Elements uses them): items() returns the items, isChosen(item) tells the
// chosen one, choose(item) picks one, lens(item, on) marks the item below
// the drop. Without a MutationObserver reaching the items, call update()
// after the choice changed.
// ============================================================

const ROWS = '.glass-tab-bar--droplet, .glass-segmented--droplet';
const ITEMS = '.glass-tab-bar__item, .glass-segmented__item';
const attached = new WeakMap();

export function attachDroplet(row, options = {}) {
  if (attached.has(row)) return attached.get(row);

  const items = options.items || (() => [...row.querySelectorAll(ITEMS)]);
  const isChosen = options.isChosen
    || (it => it.classList.contains('is-active') || it.getAttribute('aria-pressed') === 'true');
  const choose = options.choose || (it => it.click());
  const mark = options.lens || ((it, on) => it.classList.toggle('is-under-droplet', on));
  const usable = it => !it.disabled && it.getAttribute('aria-disabled') !== 'true';
  const scrolls = () => row.scrollWidth > row.clientWidth + 1;
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const set = (k, px) => row.style.setProperty(`--gl-droplet-${k}`, `${px}px`);

  let chosen = null, left = 0, placed = null, liftTimer = 0, lensFrame = 0, edgeFrame = 0;
  let drag = null, eatClick = false, under = null;

  // An item's box in the row's padding box; in a row that scrolls, in its
  // scrolled content, where the drop scrolls along with the items.
  const boxOf = it => {
    const n = row.getBoundingClientRect(), r = it.getBoundingClientRect();
    const l = r.left - n.left - row.clientLeft + row.scrollLeft;
    const t = r.top - n.top - row.clientTop + row.scrollTop;
    return { left: l, width: r.width, top: t, bottom: row.clientHeight - t - r.height };
  };
  const put = (l, width, b) => {
    left = l;
    set('left', l); set('right', row.clientWidth - l - width);
    set('top', b.top); set('bottom', b.bottom);
  };

  // The usable item nearest a point of the row lights up as under a lens.
  const lens = centre => {
    let below = null, best = Infinity;
    if (centre != null) for (const it of items()) {
      if (!usable(it)) continue;
      const b = boxOf(it), d = Math.abs(b.left + b.width / 2 - centre);
      if (d < best) { best = d; below = it; }
    }
    if (below !== under) {
      if (under) mark(under, false);
      if (below) mark(below, true);
      under = below;
    }
    return below;
  };
  // While the drop travels, the lens follows its centre.
  const follow = () => {
    cancelAnimationFrame(lensFrame);
    const start = performance.now();
    const step = now => {
      if (now - start > 620) { lens(null); return; }
      const cs = getComputedStyle(row, '::before');
      const l = parseFloat(cs.left), r = parseFloat(cs.right);
      lens(l + (row.clientWidth - l - r) / 2);
      lensFrame = requestAnimationFrame(step);
    };
    lensFrame = requestAnimationFrame(step);
  };

  const place = (it, travel) => {
    const b = boxOf(it);
    row.dataset.droplet = '';
    if (travel && motion.matches && Math.abs(b.left - left) > 1) {
      row.dataset.dropletDir = b.left > left ? 'right' : 'left';
      row.dataset.dropletLift = '';
      clearTimeout(liftTimer);
      liftTimer = setTimeout(() => { delete row.dataset.dropletLift; }, 280);
      follow();
    } else {
      delete row.dataset.dropletDir;
    }
    put(b.left, b.width, b);
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
  const at = clientX => {
    const n = row.getBoundingClientRect();
    const x = clientX - n.left - row.clientLeft + row.scrollLeft;
    const boxes = items().map(boxOf);
    const min = Math.min(...boxes.map(b => b.left));
    const max = Math.max(...boxes.map(b => b.left + b.width)) - drag.width;
    return Math.min(max, Math.max(min, x - drag.width / 2));
  };
  const track = () => {
    const l = at(drag.clientX);
    put(l, drag.width, boxOf(chosen));
    drag.below = lens(l + drag.width / 2);
    cancelAnimationFrame(edgeFrame);
    if (!scrolls()) return;
    const n = row.getBoundingClientRect(), zone = 32;
    const v = drag.clientX < n.left + zone ? -1 : drag.clientX > n.right - zone ? 1 : 0;
    if (v) edgeFrame = requestAnimationFrame(() => { row.scrollLeft += v * 6; if (drag?.moved) track(); });
  };
  const down = e => {
    if (!chosen || drag || !usable(chosen) || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if (scrolls() && !e.composedPath().includes(chosen)) return;
    drag = { id: e.pointerId, x: e.clientX, clientX: e.clientX, width: boxOf(chosen).width, moved: false, below: null };
  };
  const move = e => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.clientX = e.clientX;
    if (!drag.moved) {
      if (Math.abs(e.clientX - drag.x) < 8) return;
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
      for (const k of ['droplet', 'dropletDir', 'dropletLift', 'dropletDrag']) delete row.dataset[k];
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
