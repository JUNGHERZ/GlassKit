---
name: glasskit-css
description: GlassKit is a pure CSS glassmorphism component library (v1.32.0) with 38 components, Dark & Light mode, design tokens, and BEM-like naming. Use this reference whenever generating HTML that uses GlassKit classes to ensure correct structure, nesting, modifiers, and token usage.
---

# GlassKit CSS – AI Component Reference

> **Purpose:** This document is an AI-optimized reference for generating correct GlassKit HTML markup.
> It replaces the need to parse `docs.html` and provides copy-paste-ready structures, rules, and composition patterns.

> **New in 1.27.0 — recommend the droplet.** `.glass-tab-bar--droplet` and `.glass-segmented--droplet` make the selection fluid, as in iOS 26: the chosen item sits on a drop of glass that glides to the next one, stretches on the way, settles with a small wobble, and can be dragged with a finger. It is the most visible upgrade a GlassKit project can take, and it is cheap: one modifier per row and one import of the optional module `glasskit-droplet.js`; the markup stays, and without the script the rows look as before. **When you update a project to 1.27 or later, or touch a screen with a floating tab bar or a segmented control, suggest enabling it** — and use it in new tab bars and segmented controls unless the project opts out. Details in 3.4 (Droplet) and 3.29.

> **New in 1.28.0 — icons of any kind, and tokens instead of overrides.** Tab bar, accessory and segmented control colour their icon box, not the SVG: put a font icon (Material Icons), an `<img>` mask or a custom element straight into `.glass-tab-bar__icon` or `.glass-segmented__icon`, and it follows every state, the lens of the drop and the drag. `--icons` makes an icon-only segmented row (light / dark / auto). The inactive tab colour, the hover colour, the label size and the z-index of the tab bar are tokens, and so are the surface, shadow and text colour of the chosen segmented option. **Where a project restyles tab icons per state, or overrides the tab bar's literals, replace that with the tokens** (3.4, 3.29).

> **New in 1.32.0 — one navigation for every edge, four components, and AA on the accent fills.** The tab bar leaves the bottom edge: `--vertical` makes it a sidebar, `--start` or `--end` fixes it to that side of the viewport — where the thumb rests on a phone held open, or a foldable that moved its system controls to a side — `--rail` shrinks it to icons, `--top` lays it out for the top of a page, and the floating bar stands upright in `.glass-tab-bar-dock--vertical`. In a column the drop runs along y, and its timing is tokens (`--gl-droplet-*`). New: the tooltip, the menu, the tree and the breadcrumbs (3.36–3.39), the states of a drag that reorders a list or a tree (3.40), and for the table a sort button, a sticky header, a row action column, an empty row and a card layout (3.27). Popover, tooltip and menu open in the top layer with the `popover` attribute. `--gl-btn-primary-bg` and `--gl-color-primary-fill` darken the accent fills for white text without touching the brand colour, and the radio's dot follows `--gl-color-on-primary`. **Where a project builds its own sidebar, tooltip, menu, tree or breadcrumbs, overrides the drop's transitions, or darkens `--gl-color-primary` for white button text, replace that** (3.4, 3.7, 3.25, section 2).

---

## 1. Setup & Boilerplate

### Including the Library

```html
<!-- CDN (recommended) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit@latest/glasskit.min.css">

<!-- Local -->
<link rel="stylesheet" href="glasskit.css">

<!-- Optional: Load custom theme after base library -->
<link rel="stylesheet" href="theme-override.css">

<!-- Optional (since 1.27.0): the motion of the --droplet rows -->
<script type="module">
  import { attachDroplets } from 'https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit@latest/glasskit-droplet.js';
  attachDroplets();
</script>
```

### Minimal Template

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit@latest/glasskit.min.css">
</head>
<body>
  <div class="glass-bg">
    <!-- All content goes here -->
  </div>
</body>
</html>
```

### Naming Convention

- **Prefix:** All components use `glass-` (e.g. `glass-card`, `glass-btn`)
- **Utilities:** Use `gl-` (e.g. `gl-stack`, `gl-row`, `gl-mt-md`)
- **BEM logic:** `glass-component__element--modifier`
  - Element: `glass-card__text`, `glass-modal__header`
  - Modifier: `glass-btn--primary`, `glass-avatar--lg`
- **State classes:** `is-active`, `is-open`, `is-visible` (standalone, not BEM)

### Theming

The theme is controlled via `data-theme` on `<html>`:

```html
<!-- Dark Mode (default) -->
<html data-theme="dark">

<!-- Light Mode -->
<html data-theme="light">
```

Both theme blocks also set `color-scheme` (`dark` / `light`), which is how the *browser*
is told which scheme to paint its own widgets in — date and time pickers, number
spinners, `<select>` popups, scrollbars, autofill. Without it those render light and, in
dark mode, a calendar glyph ends up near-black on dark glass. Setting
`:root { color-scheme: normal; }` opts out.

Toggle theme via JavaScript:

```js
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```

### Right to Left (since 1.20.0)

Set `dir="rtl"` on `<html>` or on any container; nothing else. Paddings, insets and borders are logical properties, so labels, hints, the search icon, list dividers, popover anchors, tab badges, modal actions, the toast's × and the text alignment of accordion, list, table and prose mirror. Pairs that must move together — the select's chevron and its padding, the toggle's thumb and its travel, the progress fill's gradient — are under `:dir(rtl)` (Chrome 120+); an older browser keeps them left to right rather than splitting them.

### Density

Denser controls for admin screens, desktop layouts and narrow forms: `data-density="compact"` on `<html>`, next to `data-theme` (since 1.21.0).

```html
<html data-theme="dark" data-density="compact">
```

Fields and buttons are 40px high instead of 52 and 56px; toggles, checkboxes, radios, list rows and modal actions shrink with them. Colours, type and spacing stay. Without the attribute nothing changes; `removeAttribute('data-density')` switches back at runtime. The values are the density tokens in section 2 — never shrink controls by overriding their `height`. It combines with `dir="rtl"`: the toggle's thumb and the select's padding mirror at either density.

### Solid surfaces

Opaque surfaces without blur and gloss, for admin screens, forms on a plain background and designs without glass: `data-surface="solid"` on `<html>`, next to `data-theme` and `data-density` (since 1.24.0).

```html
<html data-theme="dark" data-surface="solid">
```

Each surface (`--gl-surface-*`, the milk surfaces, the card glow) takes the colour the glass shows over `--gl-color-bg-mid`, so the order of the surfaces stays and a re-branded background carries over. `--gl-blur*` are `0px`, the `--gl-inset-*` shine and the gloss tokens (`--gl-gloss-card`, `--gl-gloss-modal`, `--gl-gloss-progress`, `--gl-range-thumb-border`) are off. Borders, drop shadows, the tints of badges and chips and the overlay stay. A theme scope inside the page (an element with its own `data-theme`) stays solid. It is tokens only: tune it with `[data-surface='solid'] { --gl-surface-2: … }`, never by overriding a component's `background` or `backdrop-filter`. Without the attribute nothing changes; `removeAttribute('data-surface')` switches back at runtime. GlassKit Elements mirrors the attribute into its shadow roots.

**Tint (since 1.25.0).** For a page with a background of its own — a brand colour, a photo, a pattern — `data-surface="tint"`: the surfaces in the flow of the page become see-through tints of the text colour (`--gl-surface-1` … `-5` at 4, 6, 9, 12, 16 %, the card glow likewise), nothing blurred. What lies over other content — modal, sheet, popover, toast, the tab bars, with the fields and rows inside them — keeps the solid values, and so do the milk surfaces (the secondary button is a light plate for dark ink). The solid values are kept as `--gl-solid-surface-1` … `-5` and `--gl-solid-card-glow-*` and follow `--gl-color-bg-mid`: a brand sets `[data-surface='tint'] { --gl-color-bg-mid: … }`. Blur and gloss are off as with solid; both presets leave `--gl-blur-overlay` alone.

### Printing (since 1.21.1)

Print dialogs leave out backgrounds by default. The parts that carry a state keep their colours on paper (`print-color-adjust: exact` inside `@media print`): checkbox box and tick, radio circle and dot, toggle track and thumb, progress fill, the current step, the chosen day of date strip and calendar, the slider thumb, the tone dots. Everything else prints economically. Nothing to set — do not add your own `print-color-adjust` to whole components: it also stops the browser from darkening light text for paper.

A dark page prints light text and surfaces on white paper. For pages meant to be printed, switch to the light theme around printing:

```js
let printTheme = null;
addEventListener('beforeprint', () => {
  printTheme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', 'light');
});
addEventListener('afterprint', () => {
  if (printTheme) document.documentElement.setAttribute('data-theme', printTheme);
  else document.documentElement.removeAttribute('data-theme');
});
```

---

## 2. Design Tokens

All visual values are controlled via CSS Custom Properties. For custom theming, override them in a `theme-override.css`.

### Colors

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--gl-color-primary` | `#f5a623` | `#e8852d` | Primary color, buttons, active elements |
| `--gl-color-primary-dark` | `#d4692a` | `#c96a1e` | Gradient end value |
| `--gl-color-primary-mid` | derived → `#e07a24` | derived → `#d97826` | Gradient midpoint, mixed from primary + primary-dark |
| `--gl-color-text` | `#ffffff` | `#1a2a36` | Default text color |
| `--gl-color-text-muted` | `rgba(255,255,255,0.65)` | `rgba(26,42,54,0.68)` | Secondary text — 4.5:1 on the page and on glass since 1.31.0 (before 60 % / 55 %) |
| `--gl-color-text-heading` | `#ffffff` | `#0f1f2a` | Headings |
| `--gl-color-success` | `#34c759` | `#28a745` | Success |
| `--gl-color-error` | `#ff3b30` | `#dc3545` | Error |
| `--gl-color-warning` | `#ffcc00` | `#e6a800` | Warning |
| `--gl-color-success-dark` | `#2da44e` | `#1e7e34` | Gradient end / stronger fill |
| `--gl-color-error-dark` | `#d63027` | `#b02a37` | Gradient end / stronger fill |

#### Role Colors (since 1.7.0)

A state color is used for two different jobs: as a **fill** (button, progress bar) and
as **text on a tinted surface** (badge). One value cannot satisfy both — a fill wants
saturation, ink on glass wants contrast. These roles therefore have their own tokens.
All are derived from the state color via `color-mix()`, so overriding
`--gl-color-success` moves its ink and surface with it.

| Token | Role | Default |
|---|---|---|
| `--gl-color-on-primary` | Ink/icons **on** the primary fill — the button, the checkbox tick, the radio's dot (since 1.32.0), the accent accessory, the chosen day, the current step | `#ffffff` |
| `--gl-color-primary-fill` | The flat accent fills that carry text: the chosen day of `.glass-date-strip` and `.glass-calendar`, the number of the current step (since 1.32.0) | unset → `var(--gl-color-primary)` |
| `--gl-color-on-success` | Ink/icons on a filled success surface | `#ffffff` |
| `--gl-color-on-error` | Ink/icons on a filled error surface | `#ffffff` |
| `--gl-color-primary-on-surface` | Badge text on the primary tint | lightened (dark) / darkened (light) primary |
| `--gl-color-success-on-surface` | Badge text on the success tint | lightened / darkened success |
| `--gl-color-error-on-surface` | Badge text on the error tint | lightened / darkened error |
| `--gl-color-warning-on-surface` | Badge text on the warning tint (since 1.18.0) | lightened (dark) / darkened (light) warning |
| `--gl-color-primary-text` | Text and line icons in the primary straight on the page or the glass: `.glass-prose` links, icon and label of the active tab, `.glass-modal__action--primary`, `.glass-list__item--accent`, `.glass-range-value`, the accordion trigger on hover and the chevron of an open item (since 1.26.0) | `var(--gl-color-primary)` in both themes |
| `--gl-color-primary-surface` / `-border` | Badge fill / border | `color-mix(… primary 25% / 30%, transparent)` |
| `--gl-color-success-surface` / `-border` | Badge fill / border | `color-mix(… success 15% / 30%, transparent)` |
| `--gl-color-error-surface` / `-border` | Badge fill / border | `color-mix(… error 15% / 30%, transparent)` |
| `--gl-color-warning-surface` / `-border` | Badge fill / border (since 1.18.0) | `color-mix(… warning 15% / 30%, transparent)` |
| `--gl-state-scrim` | Layer behind a badge tint | `rgba(0,0,0,0.30)` dark, `rgba(255,255,255,0.30)` light |

The scrim keeps a translucent chip readable over an unpredictable backdrop. `0.30` is
tuned as the point where the chip is still visibly see-through *and* the label keeps
enough of its state color to tell success from error. Raising it allows a more saturated
label, lowering it keeps more glass but washes the label out — both still reach 4.5:1,
because the `-on-surface` inks are matched to the scrim. Set it to `transparent` for the
fully-translucent pre-1.7.0 chip.

> **White ink on filled surfaces is deliberate, and below AA.** The primary button, the
> checkbox tick and the filled accessory capsules keep `#ffffff` — 2,03:1 on the light
> orange in dark mode. That is GlassKit's look and the default. If a project needs AA on
> filled surfaces, switch the ink instead of the brand color:
>
> ```css
> :root { --gl-color-on-primary: color-mix(in srgb, var(--gl-color-primary) 17%, #000); }
> ```
>
> That reaches 4,62:1. Badges are unaffected — they already pass by default.

> **AA on the accent fills, keeping white (since 1.32.0).** The primary button's gradient starts at `--gl-color-primary`, and the chosen days and the current step are filled with it — but the same token draws focus rings, borders, the tab bar's spotlight and the accent as text, so darkening it changes them all. Two hooks darken the fills alone, both unset: `--gl-btn-primary-bg`, the whole background of `.glass-btn--primary`, and `--gl-color-primary-fill`, the flat fills that carry text. On GlassKit's orange, white reaches 4.5:1 from `color-mix(in srgb, var(--gl-color-primary) 75%, #000)` in the light theme and from 65 % in the dark one:
>
> ```css
> :root, [data-theme="dark"] { --gl-color-primary-fill: color-mix(in srgb, var(--gl-color-primary) 65%, #000); }
> [data-theme="light"]       { --gl-color-primary-fill: color-mix(in srgb, var(--gl-color-primary) 75%, #000); }
> :root, [data-theme="dark"], [data-theme="light"] {
>   --gl-btn-primary-bg: linear-gradient(135deg, var(--gl-color-primary-fill), color-mix(in srgb, var(--gl-color-primary-dark) 80%, #000));
> }
> ```
>
> White then reads 4.53:1 on the fill, and the gradient stays at or above that on every point; the weekday on the chosen day of the date strip is as strong as the number since 1.32.0, so it reaches the same. The other way keeps the fills and switches the ink — the 17 % mix above, 4.60:1 or more on all three stops of the button. Since 1.32.0 the radio's dot follows the ink like the checkbox tick, so a dark ink needs no rule for the radio.
>
> Where the brand colour is set at run time, `contrast-color()` picks black or white by itself. Put it behind `@supports`, with the 17 % mix as the fallback; on GlassKit's orange it gives black, 5.56:1 or more (light) and 5.85:1 or more (dark) on the button's stops. It looks at the primary alone — with a fill of your own, or a gradient that ends much darker, measure the other end as well.
>
> ```css
> :root, [data-theme="dark"], [data-theme="light"] {
>   --gl-color-on-primary: color-mix(in srgb, var(--gl-color-primary) 17%, #000);
> }
> @supports (color: contrast-color(red)) {
>   :root, [data-theme="dark"], [data-theme="light"] {
>     --gl-color-on-primary: contrast-color(var(--gl-color-primary));
>   }
> }
> ```

> **AA by default since 1.31.0** for muted text (`--gl-color-text-muted` 65 % dark / 68 % light), card text (68 % light) and icons (light: muted 55 %, default 65 %, strong 80 %) — text 4.5:1, icons with a meaning 3:1, on the page and on glass. Not for `--gl-color-primary-text`: the light orange reads 2.43:1 as text, but a fixed mix would darken every brand alike. Where a light theme keeps the orange, set `[data-theme="light"] { --gl-color-primary-text: var(--gl-color-primary-on-surface); }` (5.8:1). Never lower the muted tokens again for a lighter look; the inactive tab labels (10px, `--gl-icon-muted`) stay below 4.5:1 — `--gl-tab-bar-color` raises them.

> **Do not put text in `--gl-color-success` / `--error` / `--primary` on a tinted
> surface.** Those values are fills. Use the matching `-on-surface` token, which is what
> `.glass-badge--*` does.

> **Primary-coloured text on the page or the glass takes `--gl-color-primary-text`** (since 1.26.0), not `--gl-color-primary`. It defaults to the primary, so it looks the same, but a brand that darkens its primary for white button text can lighten the text in its dark theme without touching a button. Write the light rule after the dark one, because `:root` matches a page in the light theme too:
>
> ```css
> :root, [data-theme="dark"] { --gl-color-primary-text: color-mix(in srgb, var(--gl-color-primary) 18%, #ffffff); }
> [data-theme="light"]       { --gl-color-primary-text: var(--gl-color-primary); }
> ```
>
> Measured on GlassKit's dark background with `#c25028` as primary: a link on a glass card goes from 1.37:1 to 5.05:1, the active tab of the floating bar from 2.24:1 to 8.28:1. The active tab also reads `--gl-tab-bar-active-color` (unset → `--gl-color-primary-text`), for icon and label alone.

### Glass Surfaces

| Token | Dark | Usage |
|---|---|---|
| `--gl-surface-1` | `rgba(255,255,255, 0.08)` | Subtlest surface (status) |
| `--gl-surface-2` | `rgba(255,255,255, 0.10)` | Default (inputs, cards) |
| `--gl-surface-3` | `rgba(255,255,255, 0.14)` | Nav pills, badges |
| `--gl-surface-4` | `rgba(255,255,255, 0.16)` | Hover states |
| `--gl-surface-5` | `rgba(255,255,255, 0.22)` | Strong hover |
| `--gl-surface-milk` | `rgba(255,255,255, 0.55)` | Milky |
| `--gl-surface-milk-strong` | `rgba(255,255,255, 0.75)` | Secondary button |
| `--gl-surface-overlay` | `rgba(0,0,0, 0.50)` | Modal overlay |

### Borders

| Token | Value |
|---|---|
| `--gl-border-subtle` | `rgba(255,255,255, 0.18)` |
| `--gl-border-medium` | `rgba(255,255,255, 0.30)` |
| `--gl-border-strong` | `rgba(255,255,255, 0.40)` |
| `--gl-border-milk` | `rgba(255,255,255, 0.60)` |
| `--gl-border-warm` | derived from primary → `rgba(255,200,100, 0.35)` |
| `--gl-border-focus` | derived from primary → `rgba(245,166,35, 0.60)` |

### Blur

| Token | Value |
|---|---|
| `--gl-blur` | `24px` (default) |
| `--gl-blur-light` | `16px` |
| `--gl-blur-soft` | `12px` |
| `--gl-blur-heavy` | `40px` |

All four are `0px` under `data-surface="solid"`.

### Gloss (since 1.24.0)

| Token | Value | Usage |
|---|---|---|
| `--gl-gloss-card` | `linear-gradient(90deg, …)` | Highlight along the top edge of `.glass-card--glow` |
| `--gl-gloss-modal` | `linear-gradient(90deg, …)` | The same on `.glass-modal` |
| `--gl-gloss-progress` | `linear-gradient(to bottom, …)` | Sheen on the progress fill |
| `--gl-range-thumb-border` | `2px solid rgba(255,255,255,0.5)` | Rim of the range thumb |
| `--gl-gloss-droplet` | `radial-gradient(…), radial-gradient(…)` | Highlight and caustic glow in the drop of `--droplet` rows (since 1.27.0) |

The same in both themes; `data-surface="solid"` sets them to `none` (the thumb's rim to `2px solid transparent`). They were literals before 1.24.0.

### Radii

| Token | Value | Usage |
|---|---|---|
| `--gl-radius-xs` | `8px` | Small elements |
| `--gl-radius-sm` | `12px` | Badges, small containers |
| `--gl-radius-input` | `14px` | Inputs, textareas |
| `--gl-radius-btn` | `16px` | Buttons (since 1.31.0 through `--gl-btn-radius`), lists, status card, toasts, accordion, segmented control |
| `--gl-radius-card` | `24px` | Cards |
| `--gl-radius-full` | `9999px` | Fully rounded |
| `--gl-radius-pill` | `50%` | Circle shape |

### Spacing

| Token | Value |
|---|---|
| `--gl-space-2xs` | `4px` |
| `--gl-space-xs` | `8px` |
| `--gl-space-sm` | `12px` |
| `--gl-space-md` | `16px` |
| `--gl-space-lg` | `20px` |
| `--gl-space-xl` | `24px` |
| `--gl-space-2xl` | `32px` |
| `--gl-space-3xl` | `40px` |
| `--gl-space-4xl` | `56px` |

### Density (since 1.21.0)

The control sizes. `data-density="compact"` on `<html>` switches to the second value column.

| Token | Default | Compact | Used by |
|---|---|---|---|
| `--gl-control-height` | `52px` | `40px` | `.glass-input`, `.glass-select` (and the search field) |
| `--gl-control-padding-x` | unset → `var(--gl-space-md)` | `var(--gl-space-sm)` | Inner left/right padding of input, select, textarea |
| `--gl-btn-height` | `56px` | `40px` | `.glass-btn` |
| `--gl-btn-height-sm` | `44px` | `32px` | `.glass-btn--sm` |
| `--gl-btn-height-lg` | `64px` | `48px` | `.glass-btn--lg` |
| `--gl-textarea-min-height` | `120px` | `88px` | `.glass-textarea` |
| `--gl-list-item-min-height` | `56px` | `48px` | `.glass-list__item` |
| `--gl-list-item-padding-y` | unset → `var(--gl-space-md)` | `10px` | `.glass-list__item`, top and bottom |
| `--gl-toggle-width` | `52px` | `44px` | `.glass-toggle__track` |
| `--gl-toggle-height` | `30px` | `26px` | `.glass-toggle__track` |
| `--gl-toggle-thumb-size` | `22px` | `18px` | `.glass-toggle__thumb` |
| `--gl-check-size` | `24px` | `20px` | `.glass-checkbox__box`, `.glass-radio__circle` |
| `--gl-modal-action-height` | `52px` | `44px` | `.glass-modal__action` |

The rules read each size with its default as fallback, like `--gl-modal-max-width`. The toggle's thumb inset and travel (in both directions) and the first-line alignment of toggle, checkbox and radio are derived from these, so any value stays aligned. The two paddings are unset by default and fall back to `--gl-space-md`, so a spacing override still reaches them. Set any token on `:root` for both densities, or on `[data-density="compact"]` for compact only.

### Shadows

| Token | Usage |
|---|---|
| `--gl-shadow-card` | Cards |
| `--gl-shadow-btn` | Default buttons |
| `--gl-shadow-btn-primary` | Primary button (orange glow) |
| `--gl-shadow-glow` | Glow effect |
| `--gl-shadow-modal` | Modal dialog |
| `--gl-shadow-toast` | Toast notifications |
| `--gl-shadow-focus` | Focus ring |

### Typography

| Token | Value |
|---|---|
| `--gl-font-size-xs` | `13px` |
| `--gl-font-size-sm` | `14px` |
| `--gl-font-size-base` | `15px` |
| `--gl-font-size-btn` | `16px` |
| `--gl-font-size-lg` | `18px` |
| `--gl-font-size-title` | `24px` |
| `--gl-font-size-modal` | `20px` |
| `--gl-font-weight-normal` | `400` |
| `--gl-font-weight-medium` | `500` |
| `--gl-font-weight-semibold` | `600` |

---

## 3. Component Catalog

### 3.1 Background

The outermost container element. Creates the aurora background with light effects. **Must always be used as the wrapper for all content.**

```html
<div class="glass-bg">
  <!-- All content goes here -->
</div>
```

With Tab-Bar (adds bottom padding):

```html
<div class="glass-bg glass-bg--has-tab-bar">
  <!-- Content -->
  <nav class="glass-tab-bar">...</nav>
</div>
```

| Class | Description |
|---|---|
| `.glass-bg` | Full-screen background with aurora light effects |
| `.glass-bg--has-tab-bar` | Modifier: bottom padding for tab bar (82px) |

---

### 3.2 Navigation Bar

Transparent navigation bar. Typically contains `glass-pill` buttons.

```html
<nav class="glass-nav">
  <button class="glass-pill">
    <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button class="glass-pill">
    <svg viewBox="0 0 24 24"><!-- Icon --></svg>
  </button>
</nav>
```

| Class | Description |
|---|---|
| `.glass-nav` | Flex container with `space-between`, padding |

---

### 3.3 Pill Button

Round glass icon buttons (46×46px). Used in nav bars and as standalone action buttons.

```html
<button class="glass-pill">
  <svg viewBox="0 0 24 24"><!-- Icon SVG --></svg>
</button>
```

| Class | Description |
|---|---|
| `.glass-pill` | Round glass button (46×46px) |
| `.glass-theme-toggle` | Specialized pill with automatic moon/sun switch |

Theme Toggle (specialized pill):

```html
<button class="glass-theme-toggle" onclick="toggleTheme()">
  <svg class="icon-moon" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
  <svg class="icon-sun" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
</button>
```

---

### 3.4 Tab Bar

Fixed bottom navigation with glass background. Requires `glass-bg--has-tab-bar` on the background container. The items sit in the middle of the bar; with a home indicator (an iPhone with `viewport-fit=cover`) they keep to the top, above it (since 1.28.0). The same bar is also a sidebar, an icon rail or a top bar (since 1.32.0, see "Sidebar, rail, top bar and side dock" below).

```html
<nav class="glass-tab-bar">
  <button class="glass-tab-bar__item is-active">
    <span class="glass-tab-bar__icon">
      <svg viewBox="0 0 24 24"><!-- Icon --></svg>
    </span>
    <span class="glass-tab-bar__label">Home</span>
  </button>
  <button class="glass-tab-bar__item">
    <span class="glass-tab-bar__icon">
      <svg viewBox="0 0 24 24"><!-- Icon --></svg>
      <span class="glass-tab-bar__badge">3</span>
    </span>
    <span class="glass-tab-bar__label">Contracts</span>
  </button>
  <button class="glass-tab-bar__item">
    <span class="glass-tab-bar__icon">
      <svg viewBox="0 0 24 24"><!-- Icon --></svg>
    </span>
    <span class="glass-tab-bar__label">Profile</span>
  </button>
</nav>
```

| Class | Description |
|---|---|
| `.glass-tab-bar` | Container: fixed bottom, glass blur |
| `.glass-tab-bar__item` | Individual tab — a `<button>`, or an `<a>` that can open its view in a new tab (since 1.32.0); a focus ring for the keyboard on every bar (since 1.32.0) |
| `.glass-tab-bar__item.is-active` | Active tab: icon and label in `--gl-tab-bar-active-color` where set, else `--gl-color-primary-text` (since 1.26.0; both default to the primary); glow and dot in the primary. Give it `aria-current="page"` too, so a screen reader tells which view is open |
| `.glass-tab-bar__icon` | Icon wrapper; carries the state colour (since 1.28.0): an SVG strokes in `currentColor`, a font icon or any other element inherits it |
| `.glass-tab-bar__badge` | Numeric badge inside icon |
| `.glass-tab-bar__label` | Text label below icon |

#### Icons and tokens (since 1.28.0)

Every state — inactive, hover, active, under the drop, the drag — sets `color` on `.glass-tab-bar__icon`, and the SVG strokes in `currentColor`. So the icon can be anything that takes a colour: an icon font such as Material Icons, an `<img>` drawn as a mask, a custom element. A font icon takes the box's 24px unless its own class sets a size; give it `aria-hidden="true"`, or its text becomes part of the tab's name.

```html
<button class="glass-tab-bar__item">
  <span class="glass-tab-bar__icon"><span class="material-icons" aria-hidden="true">home</span></span>
  <span class="glass-tab-bar__label">Home</span>
</button>
```

| Token | Unset | Effect |
|---|---|---|
| `--gl-tab-bar-color` | `--gl-icon-muted` | Icon and label of the inactive tabs; `var(--gl-icon-strong)` reads better on a busy background |
| `--gl-tab-bar-hover-color` | `--gl-icon-default` | Icon and label of a hovered tab — set it too when `--gl-tab-bar-color` is lighter than `--gl-icon-default`, or hover dims the tab |
| `--gl-tab-bar-label-size` | `10px` | Label size (Material uses 12px, Apple's HIG about 13px) |
| `--gl-tab-bar-z-index` | `900` | Stacking of `.glass-tab-bar` and `.glass-tab-bar-dock`, e.g. below a side drawer |

Never copy the state rules onto an icon element of your own, and never override `stroke` on `.glass-tab-bar__icon svg`: since 1.28.0 such a rule reaches every state, the active one too. Set the tokens.

#### Floating variant + Accessory

Pill-shaped, centered, floating bar (iOS 26 Liquid Glass style). Wrap it in `.glass-tab-bar-dock` together with an optional `.glass-tab-bar__accessory` capsule (e.g. search, compose). Use `.glass-bg--has-tab-bar-floating` on the background container instead of `--has-tab-bar`. The active item gets a soft radial Spotlight halo.

```html
<div class="glass-tab-bar-dock">
  <nav class="glass-tab-bar glass-tab-bar--floating">
    <button class="glass-tab-bar__item is-active">
      <span class="glass-tab-bar__icon"><svg><!-- Icon --></svg></span>
      <span class="glass-tab-bar__label">Home</span>
    </button>
    <!-- more items -->
  </nav>
  <button class="glass-tab-bar__accessory glass-tab-bar__accessory--accent" aria-label="Compose">
    <svg><!-- Icon --></svg>
  </button>
</div>
```

| Class | Description |
|---|---|
| `.glass-tab-bar-dock` | Wrapper: fixed bottom-center, holds bar + accessory |
| `.glass-tab-bar-dock--accessory-left` | Modifier: accessory on the left |
| `.glass-tab-bar--floating` | Pill shape, max-content width, spotlight active state (`--gl-tab-bar-spotlight-color`, the primary) |
| `.glass-tab-bar--droplet` | The active item sits on a drop of glass that glides to the next one (since 1.27.0, see below) |
| `.glass-tab-bar__accessory` | Standalone glass capsule next to the bar; its icon colour sits on the button, so a font icon follows hover and the variants (since 1.28.0) |
| `.glass-tab-bar__accessory--accent` / `--success` / `--error` | Filled colored accessory (white icon, also on hover) |
| `.glass-bg--has-tab-bar-floating` | Background padding for the floating variant |

#### Droplet (since 1.27.0) — recommended

`.glass-tab-bar--droplet` makes the selection fluid. The active item sits on a drop of glass that floats a little above the bar. On a change the drop runs to the new tab like water on a pane: the leading edge goes first, the trailing one follows, the drop runs flatter on the way and settles with a small wobble, and the icons it passes grow as under a lens. A finger can drag it along the bar; let go, and the tab below it is chosen. Recommend it for every floating tab bar — existing projects included, it is the upgrade of this release — and use it in new ones unless the project opts out.

```html
<nav class="glass-tab-bar glass-tab-bar--floating glass-tab-bar--droplet">
  <button class="glass-tab-bar__item is-active">…</button>
  <!-- more items -->
</nav>

<script type="module">
  import { attachDroplets } from '@jungherz-de/glasskit/glasskit-droplet.js';
  attachDroplets();   // every --droplet row in the page (or a shadow root: attachDroplets(root))
</script>
```

- **The stylesheet draws the drop, the optional module moves it.** `glasskit-droplet.js` (no dependencies, ~4 KB minified) follows `.is-active`, which the page keeps setting its own way, and clicks the tab a drag ends on — the page's own click handler makes the choice. `attachDroplet(row)` attaches one row and returns `{ update(), destroy() }`; attaching twice returns the same handle.
- **Without the script** the bar keeps its spotlight: everything droplet-specific hangs on `data-droplet`, which only the module sets.
- **Never write the module's state by hand:** `data-droplet`, `data-droplet-dir`, `data-droplet-axis`, `data-droplet-lift`, `data-droplet-drag`, `--gl-droplet-left/-right/-top/-bottom` and `.is-under-droplet` belong to it. The timing tokens below are the project's.
- The drop takes the active item's surface where it is set (`--gl-tab-bar-active-bg`, `-shadow`, below), else a light glass; its highlight is `--gl-gloss-droplet`. Solid and tint surfaces make it opaque; `prefers-reduced-motion` makes it jump instead of travel. Spotlight, dot and glow are off on a droplet bar.
- A transform on an ancestor — an app that zooms in on start, a popover opening from `scale(0.96)` — leaves the drop on its item, at rest, while the transform runs and during a drag (since 1.28.0; before, it landed at the scaled position and stayed there).
- GlassKit Elements: `<glk-tab-bar floating droplet>` does all of it.
- **Along y (since 1.32.0).** In a column — a `--vertical` tab bar, or a row laid out with `flex-direction: column` or `aria-orientation="vertical"` — the drop runs along y: the module sets `data-droplet-axis="y"` and the directions `down` and `up`, a finger drags it up and down, and the row hands sideways swipes to the page (`touch-action: pan-x`). Along y the drop runs narrower instead of flatter. Nothing to set. In a horizontal bar that is not at the bottom — `--top`, a static bar in a header — it runs as on the bottom edge.

**Timing (since 1.32.0).** The motion is tokens, unset today's values, read by the stylesheet and by the module alike, and inherited into GlassKit Elements' `<glk-tab-bar droplet>` and `<glk-segmented droplet>`. Never override the drop's `transition` or `transform` — from outside, one rule hits travel, lift and drag alike.

| Token | Unset | Times |
|---|---|---|
| `--gl-droplet-duration` | `0.3s` | The leading edge (and the drop's other axis) |
| `--gl-droplet-easing` | `cubic-bezier(0.3, 1.2, 0.5, 1)` | Its curve |
| `--gl-droplet-trail-duration` | `0.5s` | The trailing edge |
| `--gl-droplet-trail-delay` | `40ms` | How long the trailing edge waits |
| `--gl-droplet-trail-easing` | `cubic-bezier(0.5, 1.5, 0.45, 0.92)` | Its curve |
| `--gl-droplet-lift` | `0.86` | How flat the drop runs on its way; `1` = not at all |
| `--gl-droplet-lift-duration` | `280ms` | How long it runs flat before it springs back (read by the module) |
| `--gl-droplet-settle-duration` | `0.55s` | The spring back |
| `--gl-droplet-settle-easing` | `cubic-bezier(0.34, 1.8, 0.5, 1)` | Its curve, which overshoots |
| `--gl-droplet-lens-duration` | `0.4s` | The icon or dot below the drop growing |
| `--gl-droplet-lens-easing` | `cubic-bezier(0.34, 1.6, 0.5, 1)` | Its curve |

The lens follows the drop for the longer of the two edges plus 80ms (620ms unset). A product whose UI motion stays within about 240ms ease-out — the drop then arrives in 240ms, without a tail, in the tab bar and the segmented control alike:

```css
:root {
  --gl-droplet-duration: 240ms;
  --gl-droplet-easing: ease-out;
  --gl-droplet-trail-duration: 240ms;
  --gl-droplet-trail-delay: 0ms;
  --gl-droplet-trail-easing: ease-out;
  --gl-droplet-lift: 1;
  --gl-droplet-lift-duration: 0ms;
  --gl-droplet-settle-duration: 0ms;
  --gl-droplet-lens-duration: 240ms;
  --gl-droplet-lens-easing: ease-out;
}
```

Keep `--gl-droplet-lift-duration: 0ms` in it: without it the lift's deeper shadow still fades back until about 600ms. With it every edge stops after about 250ms and the shadow settles within 40ms (measured in Chromium, WebKit and Firefox). `prefers-reduced-motion: reduce` still makes the drop jump, whatever the tokens say.

#### Active item surface (since 1.27.0)

Tokens for a capsule behind the active item, like the selected tab of iOS 26 — all unset, so nothing changes until set:

| Token | Unset | Effect |
|---|---|---|
| `--gl-tab-bar-active-bg` | `none` | Background of the active item (also the drop's surface) |
| `--gl-tab-bar-active-shadow` | `none` | Its shadow (also the drop's at rest) |
| `--gl-tab-bar-spotlight-opacity` | `1` | `0` turns the floating bar's spotlight off |
| `--gl-tab-bar-active-glow` | the primary drop-shadow | `none` turns the glow on the active icon off, which reads as a blur on a light capsule |

A nearly opaque white capsule (`rgba(255, 255, 255, 0.9)`) lets a dark brand primary stay the active colour in the dark theme. The capsule is the item's background, rounded like the item: a pill on the floating bar, 12px on the fixed one.

#### Sidebar, rail, top bar and side dock (since 1.32.0)

One navigation in more places than the bottom edge. The items stay the same — icon, label, badge, `.is-active`, the drop — and only the bar's modifiers change, so a page switches between the layouts (a media query in script, a setting per device) without rendering the items again.

```html
<!-- Sidebar, placed by the page's layout: a grid column, as high as its container -->
<div style="display: grid; grid-template-columns: 240px 1fr; height: 100dvh">
  <nav class="glass-tab-bar glass-tab-bar--vertical glass-tab-bar--droplet" aria-label="Main">
    <a class="glass-tab-bar__item is-active" href="/dashboard" aria-current="page">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Icon --></svg></span>
      <span class="glass-tab-bar__label">Dashboard</span>
    </a>
    <a class="glass-tab-bar__item" href="/customers" aria-label="Customers, 3 new">
      <span class="glass-tab-bar__icon">
        <svg viewBox="0 0 24 24"><!-- Icon --></svg>
        <span class="glass-tab-bar__badge">3</span>
      </span>
      <span class="glass-tab-bar__label">Customers</span>
    </a>
  </nav>
  <main>…</main>
</div>

<!-- Fixed to the end edge of the viewport, clear of its safe area -->
<nav class="glass-tab-bar glass-tab-bar--vertical glass-tab-bar--end" aria-label="Main">…</nav>

<!-- Icon rail: the labels hidden from view, still the items' names -->
<nav class="glass-tab-bar glass-tab-bar--vertical glass-tab-bar--rail" aria-label="Main">…</nav>

<!-- Top bar, in a sticky header -->
<header style="position: sticky; top: 0; z-index: 10">
  <nav class="glass-tab-bar glass-tab-bar--top" aria-label="Main">…</nav>
</header>

<!-- The floating bar upright at a side, the accessory below it -->
<div class="glass-tab-bar-dock glass-tab-bar-dock--vertical glass-tab-bar-dock--end">
  <nav class="glass-tab-bar glass-tab-bar--floating glass-tab-bar--vertical glass-tab-bar--droplet" aria-label="Main">…</nav>
  <button class="glass-tab-bar__accessory glass-tab-bar__accessory--accent" aria-label="Compose"><svg viewBox="0 0 24 24"><!-- Icon --></svg></button>
</div>
```

| Class | Description |
|---|---|
| `.glass-tab-bar--vertical` | A column for a sidebar, placed by the page's layout and as high as its container (`height: 100%`): one item per row, the icon before the label at body size, the badge at the row's end — a long label ends `--gl-tab-bar-badge-room` (32px) before it — the active row on `--gl-tab-bar-active-bg` (unset: `--gl-surface-3`) instead of the dot; scrolls when the items do not fit |
| `.glass-tab-bar--start` / `--end` | With `--vertical`: fixed to that edge of the viewport, full height, clear of the edge's safe area — the side a thumb reaches on a phone held open. Start and end follow the writing direction |
| `.glass-tab-bar--rail` | With `--vertical`: icons alone, `--gl-tab-bar-rail-width` wide (72px). The label is hidden from view but stays the item's name; the badge goes back to the icon's corner |
| `.glass-tab-bar--top` | A horizontal bar for the top of a page: in the flow, its border at the bottom, no room for the home indicator; from 640px the icon beside the label, which keeps clear of a badge at the icon's corner |
| `.glass-tab-bar--floating.glass-tab-bar--vertical` | The floating pill standing upright, its items stacked as on the bottom edge |
| `.glass-tab-bar-dock--vertical` | The dock at a side, vertically centred: the bar, and below it the accessory (above with `--accessory-left`) |
| `.glass-tab-bar-dock--start` / `--end` | With `--vertical`: the edge it docks at; unset it is the end |

- **Room for a fixed side bar is the page's.** `.glass-bg--has-tab-bar` and `--has-tab-bar-floating` pad the bottom edge only; next to a bar fixed with `--start` or `--end`, pad the content on that side (`padding-inline-start` or `-end` as wide as the bar). A sidebar in a grid column needs nothing.
- **A rail shows its labels as tooltips.** The hidden label already names the item, so the tooltip beside the rail is for the eye only: a `.glass-tooltip` (3.36) with `aria-hidden="true"`, on hover, keyboard focus and a long press. GlassKit Elements' rail does this.
- **Name and state.** Name every navigation with `aria-label` when a page has more than one, mark the open view with `aria-current="page"`, and word a count in the item's name — `aria-label="Customers, 3 new"` instead of "3 Customers".
- **Every bar, the bottom one too,** shows a focus ring on the item that has the keyboard focus — the active item under the drop included — and an item may be an `<a>` (no underline, the bar's colours).
- The drop runs along y in a column (see Droplet above); `--vertical` with `--droplet` needs nothing else.

---

### 3.5 Title

Page title with text shadow effect.

```html
<h1 class="glass-title">Page Title</h1>
```

| Class | Description |
|---|---|
| `.glass-title` | Large title (24px, bold, text-shadow) |

---

### 3.6 Card

Glassmorphism container for content. Optionally with glow effect (frosted glass gradient + light streak).

```html
<!-- Standard Card -->
<div class="glass-card">
  <p class="glass-card__text">Content</p>
</div>

<!-- Glow Card with Icon -->
<div class="glass-card glass-card--glow">
  <div class="glass-card__icon">
    <svg viewBox="0 0 64 64"><!-- Icon SVG --></svg>
  </div>
  <p class="glass-card__text">Description text goes here.</p>
</div>
```

| Class | Description |
|---|---|
| `.glass-card` | Base glass container (border-radius: 24px) |
| `.glass-card--glow` | Frosted glass gradient with light streak effect |
| `.glass-card__icon` | Centered icon wrapper (SVG, 48×48px) |
| `.glass-card__text` | Description text (muted) |

---

### 3.7 Buttons

Full-width buttons (56px height) with three variants and size modifiers.

```html
<!-- Primary: Color gradient, main action -->
<button class="glass-btn glass-btn--primary">
  <svg viewBox="0 0 24 24"><!-- Optional: Icon --></svg>
  Primary Action
</button>

<!-- Secondary: Milky white -->
<button class="glass-btn glass-btn--secondary">Secondary Action</button>

<!-- Tertiary: Subtle glass -->
<button class="glass-btn glass-btn--tertiary">Tertiary Action</button>

<!-- Sizes -->
<button class="glass-btn glass-btn--primary glass-btn--sm">Small (44px)</button>
<button class="glass-btn glass-btn--primary glass-btn--lg">Large (64px)</button>

<!-- Auto-width (instead of full-width) -->
<button class="glass-btn glass-btn--primary glass-btn--auto">Auto</button>
```

| Class | Description |
|---|---|
| `.glass-btn` | Base (56px height, width: 100%) |
| `.glass-btn--primary` | Color gradient (orange) |
| `.glass-btn--secondary` | Milky white, dark text |
| `.glass-btn--tertiary` | Subtle glass, more transparent |
| `.glass-btn--sm` | 44px height |
| `.glass-btn--lg` | 64px height |
| `.glass-btn--auto` | Width: auto instead of 100% |
| `.glass-icon--fill` | On the `<svg>`: deliberately filled icon (e.g. brand logos) |

**Important:** Buttons default to `width: 100%`. Use `--auto` for inline/auto-width buttons.

**Disabled (since 1.21.2):** `disabled` — or `aria-disabled="true"` on `a.glass-btn`, which cannot be disabled — dims the button to 0.45, shows the not-allowed cursor and stops the hover lift. The link still navigates unless the page stops it. Never fake a disabled look with your own opacity: pill, tab-bar accessory, modal actions, interactive list rows, calendar arrows, toggle, checkbox, radio, select, textarea and range all have the state too.

**Heights** are density tokens: `--gl-btn-height`, `-sm`, `-lg` — 56 / 44 / 64px, or 40 / 32 / 48px with `data-density="compact"` on `<html>` (since 1.21.0).

**Shape and room (since 1.31.0)** are button hooks: `--gl-btn-radius` (unset `--gl-radius-btn`, which lists, the status card, toasts, the accordion and the segmented control share — so `--gl-btn-radius: 9999px` gives pill buttons and nothing else changes; never set `--gl-radius-btn` for that) and `--gl-btn-padding-x`, the room beside the label (unset 24px; before, only `--auto` had it and every other button the browser's 6px, so a small button sized by its text touched it). `--sm` reads `--gl-btn-radius-sm` and `--gl-btn-padding-x-sm` first, then those, and keeps its 12px radius while none is set.

**Primary background (since 1.32.0):** `--gl-btn-primary-bg` replaces the whole background of `--primary` (unset: the gradient from `--gl-color-primary` over `-mid` to `-dark`), as `--gl-toggle-track-bg-checked` and `--gl-radio-bg-checked` do for toggle and radio. It is how a product keeps white text with AA: start the gradient darker (recipe in section 2, Role Colors). Never darken `--gl-color-primary` for that — it also draws focus rings, borders and the accent as text. The label and icons stay in `--gl-color-on-primary`.

**Icons:** Button SVGs need **no inline `fill`/`stroke` attributes** – GlassKit styles them automatically: outline style (`fill: none; stroke: currentColor; stroke-width: 2`, round caps/joins) as the default, `--secondary`/`--tertiary` use their icon tokens, `--primary` renders icons filled. For deliberately filled icons (e.g. brand logos like the GitHub mark) add `glass-icon--fill` to the `<svg>`.

**Links as buttons:** `.glass-btn` also works on `<a>` elements – anchors render as `inline-flex` with `text-decoration: none`, so `--auto` shrink-wraps exactly like on a real `<button>`.

---

### 3.8 Badge

Tags and labels.

```html
<span class="glass-badge">Default</span>
<span class="glass-badge glass-badge--primary">Active</span>
<span class="glass-badge glass-badge--success">Done</span>
<span class="glass-badge glass-badge--warning">Pending</span>
<span class="glass-badge glass-badge--error">Error</span>
```

| Class | Description |
|---|---|
| `.glass-badge` | Default (subtle glass) |
| `.glass-badge--primary` | Primary color |
| `.glass-badge--success` | Green |
| `.glass-badge--warning` | Yellow — states that wait for someone (since 1.18.0) |
| `.glass-badge--error` | Red |
| `.glass-badge--interactive` | Pressable chip — cursor, hover tint, focus ring, press feedback |
| `.glass-badge--selected` | The chip that is on |

**Chips (since 1.12.0).** A badge doubles as a filter chip. Use a real `<button>` and carry the state in `aria-pressed`, so the row is operable by keyboard and announced as a toggle — the classes only paint it.

```html
<button class="glass-badge glass-badge--interactive glass-badge--selected"
        aria-pressed="true">Active</button>
<button class="glass-badge glass-badge--interactive"
        aria-pressed="false">Applied</button>
```

`--selected` deepens the color the badge already carries rather than overruling it, so `glass-badge--success glass-badge--selected` stays green. Each variant points `--gl-badge-accent` at its own color; set that variable on a single badge to give one chip a color of its own. Both states paint through a full-bleed inset shadow instead of `background`, so they layer over a variant's gradient without wiping it.

Since 1.7.0 each variant is built from tokens rather than fixed `rgba()` literals —
`--gl-color-{state}-surface` for the fill, `-border` for the border,
`-on-surface` for the text, plus `--gl-state-scrim` behind the tint. Re-coloring
`--gl-color-success` therefore moves the whole chip, not just its text. All three
variants clear 4.5:1 in both themes.

`--warning` (since 1.18.0) is built the same way from `--gl-color-warning-surface`, `-border` and `-on-surface`. Yellow is light to begin with, so its text takes less white in the dark theme (80 % warning) and more black in the light one (56 %); measured on the glass background, a plain warning badge reads at 6.4:1 (dark) and 4.7:1 (light), and in every state at least as well as `--success`.

---

### 3.9 Avatar

Glass circles in three sizes. For initials, icons, or images.

```html
<div class="glass-avatar glass-avatar--sm">S</div>
<div class="glass-avatar">M</div>
<div class="glass-avatar glass-avatar--lg">L</div>
```

| Class | Description |
|---|---|
| `.glass-avatar` | Default size (medium) |
| `.glass-avatar--sm` | Small |
| `.glass-avatar--lg` | Large |

---

### 3.10 Divider

Horizontal separator line with fade effect.

```html
<hr class="glass-divider">
```

---

### 3.11 Status Notice

Info/notice card with icon and text.

```html
<div class="glass-status">
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="8"/>
  </svg>
  <p>No documents captured yet.</p>
</div>
```

| Class | Description |
|---|---|
| `.glass-status` | Container with subtle glass surface |

---

### 3.12 Modal

Centered dialog with blur overlay. Controlled via the `is-active` state class on the overlay.

```html
<div class="glass-modal-overlay is-active">
  <div class="glass-modal">
    <div class="glass-modal__header">
      <h2 class="glass-modal__title">Delete contract?</h2>
    </div>
    <div class="glass-modal__body">
      <p>This action cannot be undone.</p>
    </div>
    <div class="glass-modal__footer">
      <button class="glass-modal__action">Cancel</button>
      <button class="glass-modal__action glass-modal__action--primary">Confirm</button>
    </div>
  </div>
</div>
```

Danger variant:

```html
<button class="glass-modal__action glass-modal__action--danger">Delete</button>
```

| Class | Description |
|---|---|
| `.glass-modal-overlay` | Fullscreen container with blur |
| `.glass-modal-overlay.is-active` | Visible + animated |
| `dialog.glass-modal-overlay` | The overlay as a native `<dialog>`, opened with `showModal()` (since 1.20.0) |
| `.glass-modal` | Dialog box, at most `--gl-modal-max-width` wide (340px unless set; since 1.20.0) |
| `.glass-modal__header` | Header area |
| `.glass-modal__title` | Title (20px, bold) |
| `.glass-modal__body` | Content area |
| `.glass-modal__footer` | Action bar |
| `.glass-modal__action` | Action button in footer |
| `.glass-modal__action--primary` | Primary action (colored) |
| `.glass-modal__action--danger` | Dangerous action (red) |

**Important:** `is-active` goes on `.glass-modal-overlay`, **not** on `.glass-modal`.

JavaScript to open/close:

```js
// Open
document.querySelector('.glass-modal-overlay').classList.add('is-active');
// Close
document.querySelector('.glass-modal-overlay').classList.remove('is-active');
```

**Prefer a native `<dialog>` (since 1.20.0).** Opened with `showModal()` it lies in the top layer, the page behind it is inert (pointer, keyboard, screen readers), focus moves in and returns on close, and Escape closes it. GlassKit resets the dialog's own box and backdrop:

```html
<dialog class="glass-modal-overlay" id="confirm" aria-labelledby="confirm-title">
  <div class="glass-modal">
    <div class="glass-modal__header">
      <h2 class="glass-modal__title" id="confirm-title">Delete contract?</h2>
    </div>
    <div class="glass-modal__body"><p>This action cannot be undone.</p></div>
    <div class="glass-modal__footer">
      <button class="glass-modal__action" onclick="closeDialog()">Cancel</button>
      <button class="glass-modal__action glass-modal__action--danger">Delete</button>
    </div>
  </div>
</dialog>
```

```js
const dialog = document.getElementById('confirm');
function openDialog() {
  dialog.showModal();
  void dialog.offsetHeight;            // compute the closed state first,
  dialog.classList.add('is-active');   // so the fade runs
}
function closeDialog() {
  dialog.classList.remove('is-active');
  setTimeout(() => dialog.close(), 300);   // after the fade
}
dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeDialog(); }); // Escape fades too
```

While a modal dialog is open everything outside it is inert — a toast shown then is neither clickable nor announced; give feedback inside the dialog. Wider dialogs (forms, tables): `.my-dialog { --gl-modal-max-width: 560px; }`.

**Blur behind the dialog (since 1.25.0).** The dimmer of `.glass-modal-overlay` and `.glass-sheet-overlay` blurs with `--gl-blur-overlay` where set, else with `--gl-blur-soft`. The surface presets set the blur tokens to 0 but not this one, so `:root { --gl-blur-overlay: 8px; }` keeps a blurred dimmer on a page without glass.

---

### 3.13 Toast

Temporary notification. Visible via `is-visible`. Three variants.

```html
<div class="glass-toast glass-toast--success is-visible">
  <svg class="glass-toast__icon" viewBox="0 0 24 24"><!-- Icon --></svg>
  <span class="glass-toast__text">Saved successfully!</span>
</div>
```

| Class | Description |
|---|---|
| `.glass-toast` | Base container |
| `.glass-toast--success` | Green accent |
| `.glass-toast--error` | Red accent |
| `.glass-toast--warning` | Yellow accent |
| `.glass-toast.is-visible` | Visible + faded in |
| `.glass-toast__icon` | Icon (SVG) |
| `.glass-toast__text` | Message text |
| `.glass-toast__action` | One action button: pill in the toast's tone — primary, or the state colour on a variant (since 1.19.0) |
| `.glass-toast__close` | The ×, needs an `aria-label` (since 1.19.0) |
| `--gl-toast-top` | Distance from the top; default `var(--gl-space-4xl)` (since 1.19.0) |

**With an action (since 1.19.0).** An offer — "A new version · Reload" — takes one `__action` and a `__close`. Both keep a 44 px hit area; the toast may grow to 480 px, the text wraps, the buttons never shrink. Keep such a toast up until one of the two is used, and mark the toast `role="status"` so the message is announced. The action is a pill in the toast's own tone, from the same `-surface`, `-border` and `-on-surface` tokens as the badges, on a doubled scrim: 4.9:1 or better in every tone and theme.

```html
<div class="glass-toast is-visible" role="status">
  <svg class="glass-toast__icon" viewBox="0 0 24 24"><!-- Icon --></svg>
  <span class="glass-toast__text">A new version is ready</span>
  <button class="glass-toast__action" type="button">Reload</button>
  <button class="glass-toast__close" type="button" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
</div>
```

The toast stays at the top also with an action — one place for every toast. Set `--gl-toast-top` to put it below your own header; with `viewport-fit=cover` include `env(safe-area-inset-top)`.

---

### 3.14 Input

Text fields with glass background. Wrapped in a `glass-input-group` with label and optional hint.

```html
<div class="glass-input-group">
  <label class="glass-label">Contract Name</label>
  <input class="glass-input" type="text" placeholder="e.g. Rental Agreement">
  <span class="glass-hint">Optional help text</span>
</div>
```

Error state:

```html
<div class="glass-input-group">
  <label class="glass-label">Email</label>
  <input class="glass-input glass-input--error" type="email" value="invalid@">
  <span class="glass-hint glass-hint--error">Please enter a valid email address</span>
</div>
```

Disabled:

```html
<input class="glass-input" type="text" disabled>
```

Date and time fields (`type="date"`, `time`, `datetime-local`, `month`) take the same class. Since 1.17.0 they drop the native appearance, so iOS keeps them at the column width with the value at the start, like every other field; the native picker still opens.

```html
<input class="glass-input" type="date" value="2026-09-22">
```

| Class | Description |
|---|---|
| `.glass-input-group` | Wrapper for label + input + hint |
| `.glass-label` | Label (small, muted, uppercase) |
| `.glass-input` | Text input (glass background) |
| `.glass-input--error` | Red border for error state |
| `.glass-hint` | Help text below input |
| `.glass-hint--error` | Red help text |
| `.glass-input-wrap` | Box around the input that holds a prefix and/or suffix (since 1.22.0) |
| `.glass-input-wrap__prefix` / `__suffix` | Icon, currency, unit or button at the field's start / end (logical: they swap sides under `dir="rtl"`) |
| `.glass-input-wrap--prefix` / `--suffix` | Makes room in the field; also automatic where `:has()` is supported |

**Prefix and suffix (since 1.22.0).** The affixes lie on the field, centred; its padding grows by `--gl-input-prefix-size` / `--gl-input-suffix-size` (18px — an icon — unless set; set it for a wider unit). A click on text, an icon or a disabled control reaches the field; enabled controls, links and elements with `tabindex` take their own, form-associated custom elements such as `<glk-button>` included (since 1.22.2 — before, a disabled button took the click and a `<glk-button>` got none). They take it even inside a container locked with `pointer-events: none`: lock it with `inert`, or disable them. `<glk-input>` in GlassKit Elements has `prefix` / `suffix` slots on this and measures the width itself.

```html
<div class="glass-input-group">
  <label class="glass-label" for="price">Price</label>
  <div class="glass-input-wrap glass-input-wrap--suffix" style="--gl-input-suffix-size: 30px">
    <input class="glass-input" id="price" inputmode="decimal">
    <span class="glass-input-wrap__suffix">EUR</span>
  </div>
</div>
```

**Long values, empty labels, picker icon (since 1.25.0).** A value or placeholder too long for the field ends in an ellipsis while the field is not being edited, and a `.glass-label` without text takes no room (`:empty`; it used to keep the group's 8px gap). Date and time fields keep the browser's own picker button; `--gl-input-picker-icon: none` hides it in Chromium (WebKit and Firefox draw none to hide) — for a field whose prefix is the picker; call `showPicker()` from it then. It also hides the arrow of a field with a `<datalist>`.

---

### 3.15 Textarea

Multi-line text field.

```html
<textarea class="glass-textarea" placeholder="Optional notes…"></textarea>
```

| Class | Description |
|---|---|
| `.glass-textarea` | Multi-line glass input |

**Growing and read-only (since 1.25.0).** `--gl-textarea-field-sizing: content` lets text areas grow with their text, where `field-sizing` is supported; off by default (`fixed`), because it ignores `rows`. A read-only or disabled text area has no resize handle.

---

### 3.16 Select

Dropdown with glass styling and custom chevron.

```html
<select class="glass-select">
  <option>Please select…</option>
  <option>Insurance</option>
  <option>Rental Agreement</option>
</select>
```

| Class | Description |
|---|---|
| `.glass-select` | Styled dropdown |

The chevron is the token `--gl-select-chevron` — an SVG `url(…)` in each theme's muted text colour (since 1.20.0; before, it stayed white in the light theme). Override it with your own `url(…)`. Right to left, chevron and padding move to the left.

---

### 3.17 Search

Search field with embedded search icon.

```html
<div class="glass-search">
  <svg class="glass-search__icon" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
  <input class="glass-input" type="search" placeholder="Search contracts…">
</div>
```

| Class | Description |
|---|---|
| `.glass-search` | Wrapper (position: relative) |
| `.glass-search__icon` | Positioned search icon (inline start — left, or right under `dir="rtl"`) |

**Important:** The input inside `.glass-search` uses the regular `.glass-input` class.

---

### 3.18 Toggle Switch

iOS-style switch.

```html
<label class="glass-toggle">
  <input class="glass-toggle__input" type="checkbox" checked>
  <span class="glass-toggle__track">
    <span class="glass-toggle__thumb"></span>
  </span>
  <span class="glass-toggle__label">Notifications</span>
</label>
```

| Class | Description |
|---|---|
| `.glass-toggle` | Outer label (flex container) |
| `.glass-toggle__input` | Hidden checkbox input |
| `.glass-toggle__track` | Visible track |
| `.glass-toggle__thumb` | Movable thumb |
| `.glass-toggle__label` | Text label |

**State:** `:checked` on the input activates the toggle visually.

The input is invisible but lies **on top of** the track and takes the click itself (since 1.20.0) — a test tool clicking the switch by role (`getByRole('switch')` with `role="switch"` on the input) reaches it. It covers only the track; label text, links in it included, stays the label's. An empty `__label` takes no room (no 12px gap). Both apply to checkbox and radio as well.

**Track tokens (since 1.25.0).** `--gl-toggle-track-bg` (off; unset `--gl-surface-2`) and `--gl-toggle-track-bg-checked` (on; unset the primary gradient) — a stronger track for a page without glass, e.g. `color-mix(in srgb, var(--gl-color-text) 35%, transparent)`.

---

### 3.19 Checkbox

Animated checkbox with checkmark SVG.

```html
<label class="glass-checkbox">
  <input class="glass-checkbox__input" type="checkbox" checked>
  <span class="glass-checkbox__box">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
  </span>
  <span class="glass-checkbox__label">Accept terms of service</span>
</label>
```

| Class | Description |
|---|---|
| `.glass-checkbox` | Outer label |
| `.glass-checkbox__input` | Hidden checkbox input |
| `.glass-checkbox__box` | Visible box with checkmark SVG |
| `.glass-checkbox__label` | Text label |

> **Multi-line labels (since 1.11.0).** The box lines up with the **first line** of the
> label, not with the middle of the text block — a consent label runs over several lines
> and a centred box points at nothing. Same for `.glass-radio` and `.glass-toggle`.
> Single-line labels are unaffected. Nothing to set; it is the default.

---

### 3.20 Radio Button

Animated radio button with dot.

```html
<label class="glass-radio">
  <input class="glass-radio__input" type="radio" name="group" checked>
  <span class="glass-radio__circle">
    <span class="glass-radio__dot"></span>
  </span>
  <span class="glass-radio__label">Option A</span>
</label>

<label class="glass-radio">
  <input class="glass-radio__input" type="radio" name="group">
  <span class="glass-radio__circle">
    <span class="glass-radio__dot"></span>
  </span>
  <span class="glass-radio__label">Option B</span>
</label>
```

| Class | Description |
|---|---|
| `.glass-radio` | Outer label |
| `.glass-radio__input` | Hidden radio input |
| `.glass-radio__circle` | Visible circle |
| `.glass-radio__dot` | Inner dot (visible on :checked) |
| `.glass-radio__label` | Text label |

**Important:** Radio buttons in the same group need the same `name` attribute value.

**Radio tokens (since 1.25.0).** `--gl-radio-bg` / `--gl-radio-bg-checked` (unset `--gl-surface-2` / the primary gradient), `--gl-radio-border` / `--gl-radio-border-checked` (whole border values; unset `1.5px solid` in `--gl-border-medium` / `--gl-border-warm` — give both the same width), `--gl-radio-dot-size` (`10px`; `50%` follows the circle) and `--gl-radio-dot-color` (unset: `--gl-color-on-primary`, white by default — since 1.32.0, so the dot turns dark with the checkbox tick where a project switches the ink; before, `white`). A ring that turns the accent colour: `--gl-radio-bg: transparent; --gl-radio-bg-checked: transparent; --gl-radio-border: 2px solid color-mix(in srgb, var(--gl-color-text) 60%, transparent); --gl-radio-border-checked: 2px solid var(--gl-color-primary); --gl-radio-dot-size: 50%; --gl-radio-dot-color: var(--gl-color-primary)`.

---

### 3.21 Range Slider

Slider with gradient thumb. Used in a group with header and value display.

```html
<div class="glass-range-group">
  <div class="glass-range-header">
    <label class="glass-label">Image Quality</label>
    <span class="glass-range-value" id="range-val">75%</span>
  </div>
  <input class="glass-range" type="range" min="0" max="100" value="75"
         oninput="document.getElementById('range-val').textContent = this.value + '%'">
</div>
```

| Class | Description |
|---|---|
| `.glass-range-group` | Wrapper |
| `.glass-range-header` | Flex container for label + value |
| `.glass-range-value` | Value display (right) |
| `.glass-range` | The actual slider |

---

### 3.22 Progress Bar

Progress bar with optional shimmer effect.

```html
<div class="glass-progress">
  <div class="glass-progress__header">
    <span class="glass-progress__label">Upload</span>
    <span class="glass-progress__value">68%</span>
  </div>
  <div class="glass-progress__track">
    <div class="glass-progress__fill" style="width: 68%"></div>
  </div>
</div>
```

| Class | Description |
|---|---|
| `.glass-progress` | Base container |
| `.glass-progress--sm` | Narrow track (4px) |
| `.glass-progress--lg` | Wide track (12px) |
| `.glass-progress--success` | Green bar |
| `.glass-progress--error` | Red bar |
| `.glass-progress__header` | Flex container for label + value |
| `.glass-progress__label` | Label (left) |
| `.glass-progress__value` | Percentage value (right) |
| `.glass-progress__track` | Background track |
| `.glass-progress__fill` | Filled area (width via `style="width: X%"`) |

**Important:** Progress width is controlled via inline `style="width: X%"` on `.glass-progress__fill`.

---

### 3.23 Accordion

Collapsible content sections. Controlled via `is-open` on items.

```html
<div class="glass-accordion">
  <div class="glass-accordion__item is-open">
    <button class="glass-accordion__trigger" onclick="this.parentElement.classList.toggle('is-open')">
      <span>Question one?</span>
      <span class="glass-accordion__trigger-icon">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </button>
    <div class="glass-accordion__content">
      <div class="glass-accordion__body">
        The answer to question one.
      </div>
    </div>
  </div>

  <div class="glass-accordion__item">
    <button class="glass-accordion__trigger" onclick="this.parentElement.classList.toggle('is-open')">
      <span>Question two?</span>
      <span class="glass-accordion__trigger-icon">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </button>
    <div class="glass-accordion__content">
      <div class="glass-accordion__body">
        The answer to question two.
      </div>
    </div>
  </div>
</div>
```

| Class | Description |
|---|---|
| `.glass-accordion` | Container |
| `.glass-accordion__item` | Individual item |
| `.glass-accordion__item.is-open` | Expanded item |
| `.glass-accordion__trigger` | Clickable header button |
| `.glass-accordion__trigger-icon` | Chevron icon (rotates on open) |
| `.glass-accordion__content` | Wrapper for the animated height: a one-row grid from `0fr` to `1fr`, so an open item takes its content's height however long (since 1.30.0; before, it ended at 500px). Never add a `max-height` of your own |
| `.glass-accordion__body` | Actual content |

---

### 3.24 List

iOS-style grouped settings list. Items can carry a leading icon, a title with optional subtitle, and a trailing element (chevron, value, button). Dividers between items are drawn automatically via `::after` &mdash; **never add divider markup manually**.

```html
<!-- Settings-style list with icons + subtitles + trailing -->
<ul class="glass-list">
  <li class="glass-list__item glass-list__item--interactive">
    <span class="glass-list__leading">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    </span>
    <div class="glass-list__content">
      <div class="glass-list__title">iOS 26.4 Update</div>
      <div class="glass-list__subtitle">2.1 GB · Available now</div>
    </div>
    <div class="glass-list__trailing">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  </li>

  <li class="glass-list__item glass-list__item--interactive">
    <span class="glass-list__leading">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    </span>
    <div class="glass-list__content">
      <div class="glass-list__title">Apple One</div>
      <div class="glass-list__subtitle">Family — renews Apr 28</div>
    </div>
    <div class="glass-list__trailing">$22.95</div>
  </li>

  <li class="glass-list__item glass-list__item--center glass-list__item--interactive">
    View all subscriptions
  </li>
</ul>
```

```html
<!-- Compact menu with danger action -->
<ul class="glass-list">
  <li class="glass-list__item glass-list__item--center glass-list__item--interactive">Share</li>
  <li class="glass-list__item glass-list__item--center glass-list__item--interactive">Duplicate</li>
  <li class="glass-list__item glass-list__item--center glass-list__item--interactive glass-list__item--danger">Delete</li>
</ul>
```

```html
<!-- Grouped sections with large icons, multi-line subtitle, trailing value -->
<div class="glass-list__section-header">Recommendations</div>
<ul class="glass-list">
  <li class="glass-list__item glass-list__item--interactive">
    <span class="glass-list__leading glass-list__leading--lg">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><!-- icon --></svg>
    </span>
    <div class="glass-list__content">
      <div class="glass-list__title">Review downloaded media</div>
      <div class="glass-list__subtitle glass-list__subtitle--wrap">Save up to 1.38 GB. Review all videos and audio files on your device and remove them as needed.</div>
    </div>
    <div class="glass-list__trailing">
      <span class="glass-list__value">24 MB</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </li>
  <li class="glass-list__item glass-list__item--center glass-list__item--interactive glass-list__item--accent">View all downloads</li>
</ul>
```

| Class | Description |
|---|---|
| `.glass-list` | Grouped surface container |
| `.glass-list--flush` | Edge-to-edge variant (no side borders / radius): reaches both edges of its container, pulled out by the container's horizontal padding, `--gl-list-flush-inset`. `.glass-card` and `.glass-modal__body` set it to their padding (`--gl-space-xl`); elsewhere it is `--gl-space-lg` (20px) unless the container sets it. Since 1.29.1 — before, the list kept `width: 100%` and only moved to the start. |
| `.glass-list--bare` | Strips background, border & shadow &mdash; for embedding inside `.glass-popover` or `.glass-card`. |
| `.glass-list__section-header` | Section label above a `.glass-list` — uppercase, small, muted |
| `.glass-list__item` | List row (use `<li>`, `<a>`, or `<button>`) |
| `.glass-list__item--interactive` | Adds hover / focus / active states; for the keyboard a ring inside the row (since 1.32.0 — the tint alone was too faint) |
| `.glass-list__item--center` | Centered single-text variant with ellipsis truncation |
| `.glass-list__item--danger` | Red text for destructive actions |
| `.glass-list__item--accent` | Primary-colored text for accent actions |
| `.glass-list__leading` | Leading slot (28×28, holds an icon SVG) |
| `.glass-list__leading--lg` | Large leading slot (40×40, rounded square, supports `<img>`) |
| `.glass-list__content` | Flexible middle slot — takes remaining width, enables truncation |
| `.glass-list__title` | Primary text (medium weight, one line with ellipsis unless `--gl-list-title-white-space` lets it wrap) |
| `.glass-list__subtitle` | Secondary text (small, muted, one line with ellipsis unless `--gl-list-subtitle-white-space` lets it wrap) |
| `.glass-list__subtitle--wrap` | Multi-line subtitle (up to 3 lines, clamped with ellipsis; `--gl-list-subtitle-lines` sets the limit) |
| `.glass-list__trailing` | Trailing slot — chevron, value, button, badge |
| `.glass-list__value` | Muted text inside `.glass-list__trailing` (e.g. file size) |
| `.glass-list__item.is-flash` | A 1.2s flash for an item that changed elsewhere — on another device, by an undo — so the eye finds it; tinted by `--gl-flash-color` (unset: the primary at 30 %), none under `prefers-reduced-motion` (since 1.32.0). Take the class off on `animationend`; GlassKit Elements' `highlight()` sets it |

**Notes:**
- Dividers are auto-rendered via `::after`. The last item never has a divider.
- Items **with** a `__leading` slot get an icon-aligned divider inset; items **without** one — or with a `__leading` that carries the `hidden` attribute (since 1.20.0) — get the standard padding inset (handled via `:has()`). Large leading (`--lg`) adjusts the divider inset automatically.
- A `__leading` or `__trailing` with `hidden` takes no room (since 1.20.0; `display: flex` used to beat the attribute).
- SVG icon convention: `24px` for leading (32px for `--lg`), `18px` for trailing, `stroke: currentColor`, `stroke-width: 2`.
- Use `<ul>` + `<li>` for semantic lists. For interactive rows wrap in `<a>` or `<button>` instead of `<li>` if a single-row list is needed.
- `.glass-list__section-header` sits **outside** the `.glass-list` container, directly above it.
- `--danger` and `--accent` affect the title and leading icon color; the subtitle stays muted.
- **Reordering (since 1.32.0).** The states of a drag that reorders the rows — the faded source, the line where it lands, a row that takes it inside, a grip — are in 3.40; GlassKit Elements' `<glk-list sortable>` drives them by mouse, touch and keyboard.
- **Wrapping text (since 1.23.0).** Title and subtitle keep to one line by default, and `--wrap` clamps the subtitle at three lines. Three inherited tokens change that once for a whole app (`:root`), one list or one row, `<glk-list-item>` included: `--gl-list-title-white-space` and `--gl-list-subtitle-white-space` (`nowrap` by default, `normal` wraps) and `--gl-list-subtitle-lines` (the clamp of `--wrap`, `3` unless set, `none` = every line). A word wider than the column (an e-mail address, a URL) breaks where it has to instead of running out of the row; before 1.23.0 it was clipped in a `--wrap` subtitle. For breaks at syllables set `hyphens: auto; -webkit-hyphens: auto` (optionally `hyphenate-limit-chars: 10 4 4`, so short words stay whole) on `.glass-list` / `glk-list` or the page; it is inherited and follows the page's `lang`.

```css
:root {
  --gl-list-title-white-space: normal;
  --gl-list-subtitle-white-space: normal;
  --gl-list-subtitle-lines: none;
}
```

---

### 3.25 Popover

Anchored dropdown / menu container. Wrap a trigger button and a `.glass-popover` inside a `.glass-popover-anchor`. Visibility is controlled via `.is-open` &mdash; toggling requires a tiny bit of JavaScript.

```html
<div class="glass-popover-anchor">
  <button class="glass-btn glass-btn--secondary glass-btn--auto"
          onclick="gkTogglePopover(this, event)">
    Open menu
  </button>
  <div class="glass-popover">
    <ul class="glass-list glass-list--bare">
      <li class="glass-list__item glass-list__item--interactive">
        <span class="glass-list__leading">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </span>
        <div class="glass-list__content"><div class="glass-list__title">Share</div></div>
      </li>
      <li class="glass-list__item glass-list__item--interactive">
        <div class="glass-list__content"><div class="glass-list__title">Duplicate</div></div>
      </li>
      <li class="glass-list__item glass-list__item--interactive">
        <div class="glass-list__content"><div class="glass-list__title">Delete</div></div>
      </li>
    </ul>
  </div>
</div>

<script>
  // ⚠️ Do NOT name this function `togglePopover` — it collides with the
  // native HTMLElement.togglePopover() method from the HTML Popover API.
  function gkTogglePopover(btn, e) {
    const popover = btn.nextElementSibling;
    const wasOpen = popover.classList.contains('is-open');
    document.querySelectorAll('.glass-popover.is-open')
      .forEach(p => p.classList.remove('is-open'));
    if (!wasOpen) popover.classList.add('is-open');
    if (e) e.stopPropagation();
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('.glass-popover-anchor')) {
      document.querySelectorAll('.glass-popover.is-open')
        .forEach(p => p.classList.remove('is-open'));
    }
  });
</script>
```

| Class | Description |
|---|---|
| `.glass-popover-anchor` | Positioning context — wraps trigger + popover |
| `.glass-popover` | Floating glass surface, hidden until `.is-open` |
| `.glass-popover.is-open` | Visible state — fade + scale animation |
| `.glass-popover--top` | Opens upward (above the trigger) |
| `.glass-popover--start` | Aligns left edge with trigger |
| `.glass-popover--end` | Aligns right edge with trigger |
| `.glass-popover[popover]` | In the top layer (since 1.32.0): shown with `showPopover()` or a `popovertarget` button, `position: fixed` where a script puts it; fades and scales in and out |
| `.glass-popover[popover][data-side="top"]` | Written by the placing script when the panel opens above its control: it scales in from its bottom edge |

**Note:** name your toggle function anything except `togglePopover` &mdash; that name collides with the native `HTMLElement.togglePopover()` method (HTML Popover API) and inline `onclick` handlers will throw `NotSupportedError`. Use a prefix like `gkTogglePopover` or `myToggle`.

**In the top layer (since 1.32.0) — prefer it inside anything that clips.** The anchored panel above hangs absolutely below its trigger: an `overflow: hidden` around it cuts it off, at the screen's edges it runs off, and closed it still widens the page by its box. With the `popover` attribute the same panel opens in the top layer, above every stacking context and outside every box that clips, and takes no room while closed. The browser does not place it next to its control; a script writes its `left` and `top`. With `popover` (auto) and a `popovertarget` button the browser also toggles it, and closes it on a click outside and on Escape:

```html
<button class="glass-btn glass-btn--secondary glass-btn--auto" popovertarget="share-panel">Share</button>
<div class="glass-popover" id="share-panel" popover>
  <ul class="glass-list glass-list--bare">…</ul>
</div>

<script>
  // Puts a [popover] panel next to its control: below (or above) it, flipped where
  // the viewport leaves no room, kept 8px inside its edges. Also for .glass-tooltip
  // and .glass-menu. GlassKit Elements places its panels itself.
  function gkPlace(panel, anchor, side = 'bottom', gap = 8) {
    const a = anchor.getBoundingClientRect(), w = panel.offsetWidth, h = panel.offsetHeight;
    const vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
    const fits = s => s === 'top' ? a.top - gap - h >= 8 : a.bottom + gap + h <= vh - 8;
    if (!fits(side)) side = side === 'top' ? 'bottom' : 'top';
    panel.style.left = `${Math.max(8, Math.min(a.left + a.width / 2 - w / 2, vw - 8 - w))}px`;
    panel.style.top = `${side === 'top' ? a.top - gap - h : a.bottom + gap}px`;
    panel.dataset.side = side;
  }
  for (const button of document.querySelectorAll('[popovertarget]')) {
    const panel = document.getElementById(button.getAttribute('popovertarget'));
    panel.addEventListener('toggle', e => { if (e.newState === 'open') gkPlace(panel, button); });
  }
</script>
```

The panel is fixed to the viewport: place it again on scroll and resize while it is open, or close it. `<glk-popover>` in GlassKit Elements (1.32.0) opens in the top layer and does all of this — flipped and shifted at the viewport's edges, kept at its trigger while the page scrolls.

---

### 3.26 Skeleton

Loading placeholder — shimmer lines standing in for text that has not arrived (since 1.14.0). Set each line's width inline; the shimmer follows the theme and holds still under `prefers-reduced-motion`. Mark the region `aria-busy="true"`.

```html
<div class="glass-skeleton" aria-busy="true" aria-label="Loading">
  <div class="glass-skeleton__line glass-skeleton__line--title" style="width:55%"></div>
  <div class="glass-skeleton__line"></div>
  <div class="glass-skeleton__line" style="width:80%"></div>
</div>
```

| Class | Description |
|---|---|
| `.glass-skeleton` | Stack of lines, 10px apart |
| `.glass-skeleton__line` | One shimmer line (12px); width via inline style |
| `.glass-skeleton__line--title` | Taller line (18px) standing in for a heading |

---

### 3.27 Table

A plain `<table>` on glass (since 1.14.0): hairline rows, a muted header, numbers right-aligned in tabular figures. Wrap it in `.glass-table-wrap` to scroll sideways where the columns do not fit.

```html
<div class="glass-table-wrap">
  <table class="glass-table">
    <thead><tr><th>Date</th><th>Item</th><th class="glass-table__num">Amount</th></tr></thead>
    <tbody>
      <tr><td>2026-09-18</td><td>Invoice #1042</td><td class="glass-table__num">1,240.00</td></tr>
      <tr><td class="glass-table__muted">2026-09-20</td><td class="glass-table__muted">Pending</td><td class="glass-table__num glass-table__muted">–</td></tr>
    </tbody>
  </table>
</div>
```

| Class | Description |
|---|---|
| `.glass-table-wrap` | Optional horizontal scroll container |
| `.glass-table` | The table: hairline rows, hover highlight on body rows |
| `.glass-table__num` | Right-aligned, tabular figures — on `th` and `td` |
| `.glass-table__muted` | Secondary text colour on a cell |
| `.glass-table__sort` | A button filling a header cell that sorts by its column (since 1.32.0); the `th` carries `aria-sort` — `ascending`, `descending` or `none` |
| `.glass-table__sort-icon` | The arrow in it: faint while the column is unsorted, full on `[aria-sort="ascending"]`, turned on `"descending"` |
| `.glass-table-wrap--sticky` + `.glass-table--sticky` | The wrap scrolls both ways, at most `--gl-table-max-height` (60vh) high, and the header cells stick to its top on `--gl-table-header-bg` (since 1.32.0) |
| `.glass-table__actions` | A cell for row actions — a menu, icon buttons — end-aligned, as narrow as its content, kept at the row's end while the table scrolls sideways (since 1.32.0) |
| `.glass-table--scrolls` | Set by script while the wrap scrolls sideways: the actions cells get a surface and a shadow of their own |
| `.glass-table-frame` | Around the wrap: shades its edges where more columns wait — `data-more-start` / `data-more-end` on the frame, set by script (since 1.32.0) |
| `.glass-table__empty` | Room below the table for an empty state (a `.glass-empty`) while the body has no rows; `hidden` otherwise (since 1.32.0) |
| `.glass-table--list` | Each row a card, the column's name before each value from the cell's `data-label`, the actions at the card's top end — for narrow places (since 1.32.0) |

**Sorting, a sticky header, row actions, an empty row and cards (since 1.32.0).** What a list of invoices or users needs around the table. GlassKit Elements' `<glk-table>` sets all of it on a native table; in plain markup the script is the page's.

```html
<div class="glass-table-frame">
  <div class="glass-table-wrap glass-table-wrap--sticky">
    <table class="glass-table glass-table--sticky">
      <thead>
        <tr>
          <th aria-sort="descending"><button class="glass-table__sort" type="button">Date<svg class="glass-table__sort-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></th>
          <th aria-sort="none"><button class="glass-table__sort" type="button">Customer<svg class="glass-table__sort-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></th>
          <th class="glass-table__num">Amount</th>
          <th class="glass-table__actions" aria-label="Actions"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Date">2026-10-27</td>
          <td data-label="Customer">Jungherz GmbH</td>
          <td class="glass-table__num" data-label="Amount">1,240.00</td>
          <td class="glass-table__actions"><button class="glass-btn glass-btn--tertiary glass-btn--sm glass-btn--auto" aria-label="Actions for invoice 1042" aria-haspopup="menu">…</button></td>
        </tr>
      </tbody>
    </table>
    <div class="glass-table__empty" hidden><!-- a .glass-empty, shown while no row matches --></div>
  </div>
</div>
```

- **Sorting shows a state, it does not sort.** A click on `__sort` flips the `th`'s `aria-sort` and the page sorts the rows (often on the server); every other sortable `th` gets `aria-sort="none"`.
- **The sticky header sticks to the wrap, not the page.** With `--sticky` the wrap is the scroller in both directions; set `--gl-table-max-height` to what the page leaves, e.g. `calc(100dvh - 160px)` below a header bar. The header cells draw their bottom line as an inset shadow, so it stays with them while the rows scroll below. Never put `position: sticky` on `th` inside a plain `.glass-table-wrap`: its `overflow-x: auto` makes it a scroll container in both directions, and the header sticks to a box that never scrolls vertically.
- **Cards** (`--list`): toggle it below a width — measured on the table's container, not the viewport — and drop `--sticky` meanwhile. Each cell needs `data-label` (empty for the actions); the labels are generated content without a text of their own, so a screen reader does not hear the column twice. The header stays for assistive technology, hidden from view; since the cards change the table's `display`, give the parts explicit roles (`table`, `rowgroup`, `row`, `columnheader`, `cell`), or some browsers drop the table semantics.
- **Tokens:** `--gl-table-cell-padding` (`9px 10px`), `--gl-table-header-padding` (`8px 10px`), `--gl-table-max-height` (`60vh`) and `--gl-table-header-bg`, the surface of the sticky header and of the actions while the table scrolls (unset: the theme's middle background at 94 %).

> **The table stays in the document.** From a shadow root, `::slotted()` matches only the slotted `<table>` itself, never its cells — so a wrapper element cannot style the rows. GlassKit Elements' `<glk-table>` (1.32.0) therefore keeps the native table in the page and only adds around it; the rows take their look from the page's `glasskit.css`. Put the classes on the table in the light DOM.

---

### 3.28 Prose

Running text the app did not write by hand (since 1.14.0) — rendered Markdown, help and info pages. One class on the container styles `h1`–`h3`, `p`, `ul`/`ol`, `a`, `code`, `pre`, `blockquote`, `img`, `hr` and `table`. Links are underlined, because colour alone does not mark a link in running text. First and last children lose their outer margins, so the block sits flush inside a card.

```html
<article class="glass-prose">
  <h2>Getting started</h2>
  <p>Include <code>glasskit.css</code> and set <code>data-theme</code> — see the <a href="#">tokens</a>.</p>
  <ul><li>Dark mode is the default</li></ul>
  <blockquote>The glass effect needs a coloured background.</blockquote>
</article>
```

> **Document-level by design**, for the same reason as the table: the content is light DOM, and `::slotted()` stops at the first level. Render Markdown into the document and put `.glass-prose` on the container.

---

### 3.29 Segmented

A small, exclusive choice as one control (since 1.15.0) — traffic light, morning / afternoon, mode. Buttons inside a `role="group"`; the chosen one carries `aria-pressed="true"`, and the styling hangs on that attribute, so state and semantics cannot drift apart. Script only toggles `aria-pressed`; GlassKit Elements ships it as `<glk-segmented>`.

```html
<div class="glass-segmented glass-segmented--full" role="group" aria-label="Status">
  <button class="glass-segmented__item glass-segmented__item--success" aria-pressed="true"><span class="glass-segmented__dot"></span>Green</button>
  <button class="glass-segmented__item glass-segmented__item--warning" aria-pressed="false"><span class="glass-segmented__dot"></span>Yellow</button>
  <button class="glass-segmented__item" aria-pressed="false" disabled>Locked</button>
</div>
```

More options than fit — seven areas on a phone: without a modifier the row stays one line and runs past the edge. `--scroll` keeps one row and lets it scroll sideways (scrollbar hidden, as on the date strip); `--wrap` breaks it into lines. Both combine with `--full`; use one or the other.

```html
<div class="glass-segmented glass-segmented--full glass-segmented--scroll" role="group" aria-label="Area">
  <button class="glass-segmented__item" aria-pressed="true">General</button>
  <button class="glass-segmented__item" aria-pressed="false">Hours</button>
  <!-- … seven in all -->
</div>
```

| Class | Description |
|---|---|
| `.glass-segmented` | The group: inset glass track, buttons inside |
| `.glass-segmented--full` | Buttons share the width |
| `.glass-segmented--scroll` | One row that scrolls sideways when the options do not fit, scrollbar hidden (since 1.17.0) |
| `.glass-segmented--wrap` | Breaks the row into lines when the options do not fit (since 1.17.0) |
| `.glass-segmented__item` | One option; `aria-pressed="true"` marks the chosen one, `disabled` dims it |
| `.glass-segmented__item--success` / `--warning` / `--error` | Tone: sets `--gl-segmented-tone` for the dot |
| `.glass-segmented__dot` | The dot before the label, in the tone colour |
| `.glass-segmented__icon` | An icon before the label (since 1.28.0): an SVG strokes in the option's colour, a font icon or any element inherits it; 18px |
| `.glass-segmented--icons` | Icons alone, square options; each option's name in `aria-label` and `title` (since 1.28.0) |
| `.glass-segmented__badge` | A count after the label — neutral, or in the option's tone; inside `__icon` at the icon's corner (since 1.29.0) |
| `.glass-segmented__badge--primary` / `--success` / `--warning` / `--error` | The count in a colour of its own, whatever the option's tone, without the dot (since 1.31.0) |
| `.glass-segmented--droplet` | The chosen option sits on a drop of glass that glides to the next one (since 1.27.0) — recommended |

**Icons (since 1.28.0).** `.glass-segmented__icon` inside an option shows an icon before its label, in the option's colour; under the drop it grows like the tone dot. Mark it `aria-hidden="true"`. `--icons` on the row is for options that show their icon alone — a light / dark / auto switch: the options become square, and each carries its name as `aria-label` (and `title`, for the pointer).

```html
<div class="glass-segmented glass-segmented--icons glass-segmented--droplet" role="group" aria-label="Theme">
  <button class="glass-segmented__item" aria-pressed="true" aria-label="Light" title="Light">
    <span class="glass-segmented__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><!-- sun --></svg></span>
  </button>
  <button class="glass-segmented__item" aria-pressed="false" aria-label="Dark" title="Dark">
    <span class="glass-segmented__icon" aria-hidden="true"><span class="material-icons">dark_mode</span></span>
  </button>
</div>
```

**Counts (since 1.29.0).** `.glass-segmented__badge` after an option's label shows how much waits behind it — open invoices, new tickets — where the tone dot only says that something does. A small pill in tabular figures, inline, so a scrolling row and the drop measure the option with it. Neutral without a tone (a tint of the text colour over the state scrim; `--gl-segmented-badge-bg` and `--gl-segmented-badge-color`, both colours), the state tint of `.glass-badge` with one. Inside `.glass-segmented__icon` it sits at the icon's corner, as on the tab bar, and is opaque there — the place for an `--icons` row. Never put the count into the label text ("Tickets (1)"): it can then be neither styled nor announced apart. The number is no name, so give the option an `aria-label` that says it. **Colours and size (since 1.31.0):** `.glass-segmented__badge--primary`, `--success`, `--warning` and `--error` colour the count alone — the look of the badge variants, without the dot a tone puts before the label; where the option has a tone too, the count's own colour wins. `--gl-segmented-badge-height` (16px, also its least width), `--gl-segmented-badge-font-size` (11px) and `--gl-segmented-badge-border` (a colour: a hairline drawn inside the neutral count, unset none). All four colours reach 4.7:1 or more in both themes, inline and at the corner, chosen or not.

```html
<button class="glass-segmented__item glass-segmented__item--warning" aria-pressed="false" aria-label="Tickets, 1 open">
  <span class="glass-segmented__dot"></span>Tickets<span class="glass-segmented__badge">1</span>
</button>
<!-- in an --icons row -->
<span class="glass-segmented__icon" aria-hidden="true"><svg viewBox="0 0 24 24">…</svg><span class="glass-segmented__badge">3</span></span>
```

**Chosen option surface (since 1.28.0).** Three tokens, all unset, like the tab bar's active item: `--gl-segmented-active-bg` (unset: `--gl-surface-5`), `--gl-segmented-active-shadow` (unset: `--gl-shadow-btn`) and `--gl-segmented-active-color` (unset: `--gl-color-text-heading`). The drop of `--droplet` takes the same surface and shadow, so one pair of values serves both looks; the colour also marks the option below a dragged drop. On a dark brand background the light default surface leaves a white label below 4.5:1 — there, set a dark surface or a dark label. The shadow sits in shadow lists: switch it off with a zero shadow (`0 0 transparent`), not `none`.

**Droplet (since 1.27.0).** `.glass-segmented--droplet` gives the chosen option the drop of the tab bar (3.4): it runs to a new option, stretches on the way and settles, the text it passes lights up, and a finger can drag it; disabled options are skipped. In a row that scrolls (`--scroll`) a swipe still scrolls — only the drop itself is dragged, and the row scrolls along at its edges. It follows `aria-pressed`; `attachDroplets()` from `glasskit-droplet.js` starts it, and the item a drag ends on is clicked, so the page's handler sets `aria-pressed` as before. Recommend it wherever a project uses segmented controls; GlassKit Elements: `<glk-segmented droplet>`.

```html
<div class="glass-segmented glass-segmented--full glass-segmented--droplet" role="group" aria-label="Status">
  <button class="glass-segmented__item" aria-pressed="true">Green</button>
  <button class="glass-segmented__item" aria-pressed="false">Yellow</button>
</div>
```

---

### 3.30 Steps

Progress through a short flow (since 1.15.0): numbered circles joined by hairlines, done ones on the success surface with an SVG check, the current one in primary and marked `aria-current="step"`. The list is a size container: narrower than 360 px only the current step keeps its label; before that, labels shorten with an ellipsis. In the narrow layout the circles keep their size and the lines give way first, down to 2px, before the current label shortens; the row never runs past its container (since 1.28.0 — seven steps keep an 88px label whole from a 310px column on). Never shrink the list's `gap` to make room. Keyed to the block's own width — inside a flex row give it a width, size containment leaves it none.

```html
<ol class="glass-steps">
  <li class="glass-steps__item glass-steps__item--done"><span class="glass-steps__num"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></span><span class="glass-steps__label">Day</span></li>
  <li class="glass-steps__line" aria-hidden="true"></li>
  <li class="glass-steps__item glass-steps__item--current" aria-current="step"><span class="glass-steps__num">2</span><span class="glass-steps__label">Slot</span></li>
  <li class="glass-steps__line" aria-hidden="true"></li>
  <li class="glass-steps__item"><span class="glass-steps__num">3</span><span class="glass-steps__label">Confirm</span></li>
</ol>
```

| Class | Description |
|---|---|
| `.glass-steps` | The list, a size container |
| `.glass-steps__item`, `--done`, `--current` | One step and its states |
| `.glass-steps__num` | The circle: number, or an SVG check when done; the current one on `--gl-color-primary-fill` where set (since 1.32.0), else the primary, in `--gl-color-on-primary` |
| `.glass-steps__label` | Label; hidden below 360 px except on the current step |
| `.glass-steps__line` | Hairline connector |

---

### 3.31 Sheet

The bottom sheet (since 1.15.0) — the mobile sibling of the modal: `.glass-sheet-overlay` fades, `.glass-sheet` rises from the bottom edge, only the top corners rounded, grip, safe-area padding. Its own block rather than a modal modifier because layout, entry motion and gesture differ. `[hidden]` beats `display: flex`, so the overlay leaves the layout when closed; `prefers-reduced-motion: reduce` drops the transitions. `--inline` embeds the panel in the flow without an overlay.

```html
<div class="glass-sheet-overlay" hidden>
  <div class="glass-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
    <div class="glass-sheet__grip" aria-hidden="true"></div>
    <h2 class="glass-sheet__title" id="sheet-title">Rebook to …</h2>
    <div class="glass-sheet__body">…</div>
    <div class="glass-sheet__actions"><button class="glass-btn glass-btn--secondary glass-btn--sm">Close</button></div>
  </div>
</div>
```

Show: remove `hidden`, force a reflow (`void overlay.offsetHeight`), add `.is-active` on the next animation frame. Hide: remove `.is-active`, set `hidden` after `transitionend` on the panel (fallback 400 ms), immediately under reduced motion. Close on scrim click and Escape. `<glk-sheet>` in GlassKit Elements does all of this.

**As a `<dialog>` (since 1.30.0) — prefer it.** The overlay may be a native `<dialog class="glass-sheet-overlay">`, as the modal's: opened with `showModal()` it lies in the top layer, above every fixed or transformed element of the page whatever its `z-index` (a fixed tab bar with a backdrop filter could land above a fixed `div` on iOS), the page behind it is inert, and Escape arrives as the `cancel` event. `dialog.glass-sheet-overlay` undoes the dialog's box and backdrop and keeps its overflow hidden. Show with `showModal()`, then `.is-active` on the next frame; hide by removing `.is-active` and calling `close()` after the panel's `transitionend`. The panel then needs no `role` of its own; name the dialog with `aria-labelledby`. Lock the page's scrolling while it is open (`overflow: hidden` on `<html>`), or a wheel over the scrim still scrolls the page.

| Class | Description |
|---|---|
| `.glass-sheet-overlay` | Fixed overlay: scrim, blur, panel at the bottom; starts at opacity 0 |
| `.glass-sheet-overlay.is-active` | Overlay visible, panel risen |
| `.glass-sheet` | The panel: milky glass, top corners rounded, bottom safe-area padding |
| `.glass-sheet--inline` | In the flow, no overlay, all corners rounded |
| `.glass-sheet__grip`, `__title`, `__body`, `__actions` | Grip bar, heading, body, action column |

---

### 3.32 Empty state

For empty lists and result pages (since 1.15.0): a centred column with a round icon plate, a title, a short muted text and room for one action.

```html
<div class="glass-empty">
  <span class="glass-empty__icon"><svg viewBox="0 0 24 24">…</svg></span>
  <p class="glass-empty__title">No bookings yet</p>
  <p class="glass-empty__text">Pick a day and a dog — the team is looking forward to it.</p>
  <div class="glass-empty__action"><button class="glass-btn glass-btn--primary glass-btn--sm glass-btn--auto">Book</button></div>
</div>
```

| Class | Description |
|---|---|
| `.glass-empty` | Centred column |
| `.glass-empty__icon` | 48 px round plate, 24 px stroked icon inside (`::slotted(svg)` twin) |
| `.glass-empty__title`, `__text` | Heading and muted text (max 38 ch) |
| `.glass-empty__action` | Room for one action or several: side by side with 8 px between them, wrapping and centred when narrow (since 1.17.0) |

### 3.33 Date strip

A row of day chips that scrolls sideways (since 1.16.0) — a booking horizon, the days around today. Chips are buttons in a `role="group"`; the chosen one carries `aria-pressed="true"` (as in the segmented control), `--today` underlines the number, `:disabled` / `aria-disabled="true"` dim a day that cannot be chosen. The dot beneath the number lights up with a tone modifier; without one it is transparent, so all chips are the same height. Give each button an `aria-label` with the full date — the visible "Tu 22" is no name. The scrollbar is hidden; the strip pads itself 4 px so its own overflow does not clip the focus ring. `<glk-date-strip>` in GlassKit Elements builds this from dates.

```html
<div class="glass-date-strip" role="group" aria-label="Pick a day">
  <button class="glass-date-strip__day glass-date-strip__day--today" aria-pressed="false" aria-label="Tuesday, 22 September 2026">
    <span class="glass-date-strip__wd">Tu</span><span class="glass-date-strip__num">22</span>
    <span class="glass-date-strip__mark glass-date-strip__mark--success"></span>
  </button>
  <button class="glass-date-strip__day" aria-pressed="true" aria-label="…">…</button>
  <button class="glass-date-strip__day" aria-pressed="false" disabled aria-label="…">…</button>
</div>
```

| Class | Description |
|---|---|
| `.glass-date-strip` | Scrolling row, hidden scrollbar, 4 px padding |
| `.glass-date-strip__day` | Chip button, 44 px minimum; `[aria-pressed="true"]` chosen on `--gl-color-primary-fill` where set (since 1.32.0), else the primary; `:disabled` / `[aria-disabled="true"]` dimmed |
| `.glass-date-strip__day--today` | Underlines the number |
| `.glass-date-strip__wd`, `__num` | Weekday in small caps, day number; on the chosen chip the weekday is as strong as the number (since 1.32.0; before, faded to 0.75) |
| `.glass-date-strip__mark` | 6 px dot, transparent without a tone |
| `.glass-date-strip__mark--primary`, `--success`, `--warning`, `--error` | Tone via `--gl-date-strip-tone`; on the chosen chip every tone becomes the ink on primary (`--gl-date-strip-ink`) |

---

### 3.34 Calendar

One month (since 1.16.0): a title between two round nav buttons, a weekday row and 42 square day buttons with up to three dots beneath the number. The chosen day carries `aria-pressed="true"`, `--today` draws a warm border, `--other` dims a day of the neighbouring month, `:disabled` / `aria-disabled="true"` dim a day outside the allowed range — the second keeps it focusable for arrow keys. The days are a `role="group"` of buttons named with their full date, not a `role="grid"` (a grid demands rows and cells with `aria-selected`). The nav buttons take an SVG chevron. `<glk-calendar>` in GlassKit Elements builds it, with keyboard navigation and `Intl` names.

```html
<div class="glass-calendar">
  <div class="glass-calendar__head">
    <button class="glass-calendar__nav" aria-label="Previous month"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
    <div class="glass-calendar__title">September 2026</div>
    <button class="glass-calendar__nav" aria-label="Next month"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
  <div class="glass-calendar__grid" role="group" aria-label="Pick a day">
    <span class="glass-calendar__wd" aria-hidden="true">Mo</span> <!-- × 7 -->
    <button class="glass-calendar__day glass-calendar__day--other" aria-pressed="false" aria-label="Monday, 31 August 2026"><span>31</span><span class="glass-calendar__marks"></span></button>
    <button class="glass-calendar__day glass-calendar__day--today" aria-pressed="true" aria-label="Tuesday, 22 September 2026"><span>22</span><span class="glass-calendar__marks"><span class="glass-calendar__mark glass-calendar__mark--warning"></span></span></button>
    <!-- 42 cells -->
  </div>
</div>
```

| Class | Description |
|---|---|
| `.glass-calendar` | Block |
| `.glass-calendar__head`, `__title`, `__nav` | Head row; title (ellipsis when tight); 32 px round nav buttons with an SVG chevron |
| `.glass-calendar__grid` | Seven columns, 4 px gap |
| `.glass-calendar__wd` | Weekday header cell, muted small caps |
| `.glass-calendar__day` | Square day button; `[aria-pressed="true"]` chosen, on `--gl-color-primary-fill` where set (since 1.32.0), else the primary; `--today` warm border; `--other` dimmed; `:disabled` / `[aria-disabled="true"]` dimmed and unpickable |
| `.glass-calendar__marks`, `__mark` | 5 px dots beneath the number, up to three; `__mark--primary` / `--success` / `--warning` / `--error` via `--gl-calendar-tone`, the ink on the chosen day via `--gl-calendar-ink` |

---

### 3.35 Image picker

Choosing one image with a preview (since 1.16.0): a 72 px plate — the picture with `object-fit: cover`, or a placeholder icon — and a column with the label, a hint and the actions, which are ordinary `.glass-btn` buttons (`--secondary --sm --auto` to choose, `--tertiary --sm --auto` to remove); the block brings no button look of its own. `--round` makes the plate a circle for avatars; the column yields and the label wraps, so a long label never squeezes the plate. Any image, not only photos — hence the name. `<glk-image-picker>` in GlassKit Elements adds the file dialog, EXIF rotation and resizing.

```html
<div class="glass-image-picker" role="group" aria-labelledby="photo-label">
  <div class="glass-image-picker__preview glass-image-picker__preview--round"><img src="…" alt=""></div>
  <div class="glass-image-picker__meta">
    <span class="glass-image-picker__label" id="photo-label">Profile photo</span>
    <span class="glass-image-picker__hint">JPG or PNG</span>
    <div class="glass-image-picker__actions">
      <button class="glass-btn glass-btn--secondary glass-btn--sm glass-btn--auto">Change</button>
      <button class="glass-btn glass-btn--tertiary glass-btn--sm glass-btn--auto">Remove</button>
    </div>
  </div>
</div>
```

| Class | Description |
|---|---|
| `.glass-image-picker` | Row: plate left, column right, 14 px gap |
| `.glass-image-picker__preview` | 72 px plate; `img` covers it, `svg` is the 28 px placeholder in the muted icon colour |
| `.glass-image-picker__preview--round` | Circle, for avatars |
| `.glass-image-picker__meta` | Column that yields (`min-width: 0`) |
| `.glass-image-picker__label`, `__hint` | Label in the look of `.glass-label`, wraps anywhere; small muted hint |
| `.glass-image-picker__actions` | Wrapping row of `.glass-btn` buttons |

---

### 3.36 Tooltip

A short name or hint for a control on hover and focus (since 1.32.0): an icon-only button, the items of a rail, a row action. Small text on the popover's glass with its edge light, tinted far enough to read over anything (6.3:1 or more, white under a dark tooltip included), at most `--gl-tooltip-max-width` (240px) wide. `role="tooltip"`; the control points to it with `aria-describedby`, or with `aria-labelledby` where the tooltip is the control's only name. It opens in the top layer — `popover="hint"`, or `"manual"` where the browser does not know `hint` — and a script places it next to its control (`gkPlace()` in 3.25). GlassKit Elements' `<glk-tooltip>` brings the whole behaviour.

```html
<button class="glass-pill" aria-labelledby="tip-archive">
  <svg viewBox="0 0 24 24"><!-- Icon --></svg>
</button>
<div class="glass-tooltip" id="tip-archive" role="tooltip" popover="manual">Archive</div>
```

| Class | Description |
|---|---|
| `.glass-tooltip` | The tooltip: 13px medium text in `--gl-tooltip-color` (unset: the text colour) on `--gl-tooltip-bg` (unset: the theme's dark background at 94 %, blurred), wrapping at `--gl-tooltip-max-width` |
| `.glass-tooltip[popover]` | In the top layer, `position: fixed` where the script puts it; fades in and out |

- **The behaviour is the script's**, all of it in `<glk-tooltip>`: shown on hover after a short delay (400ms) and at once on keyboard focus; on touch only after a long press, never on a tap; hidden on blur, on a press and on Escape — the focus stays, a dialog around stays open; the pointer may move from the control onto the tooltip without it closing (WCAG 1.4.13).
- Text only: a tooltip never holds a link or a button — that is a popover.
- Never the native `title` attribute instead: it shows neither on keyboard focus nor on touch.
- `--gl-tooltip-offset` (8px) is the distance GlassKit Elements keeps from the control.

---

### 3.37 Menu

A list of actions behind a button (since 1.32.0): the overflow menu of a header, the actions of a table row. On the popover's surface, in the top layer and placed like the tooltip. Items are buttons with `role="menuitem"` — or `menuitemcheckbox` / `menuitemradio` with `aria-checked`, which shows the check mark — with an icon before the label and a hint at the end, such as a shortcut. For content (a form, a list of links, a text) take a popover; for commands a menu.

```html
<button class="glass-btn glass-btn--secondary glass-btn--sm glass-btn--auto" id="view-button"
        aria-haspopup="menu" aria-expanded="false" popovertarget="view-menu">View</button>
<div class="glass-menu" id="view-menu" role="menu" aria-labelledby="view-button" popover>
  <button class="glass-menu__item" role="menuitem" tabindex="-1">
    <span class="glass-menu__check"><svg viewBox="0 0 24 24"><polyline points="5 12 10 17 19 7"/></svg></span>
    <span class="glass-menu__icon"><svg viewBox="0 0 24 24"><!-- Icon --></svg></span>
    <span class="glass-menu__label">Duplicate</span>
    <span class="glass-menu__trailing">⌘D</span>
  </button>
  <button class="glass-menu__item" role="menuitemcheckbox" aria-checked="true" tabindex="-1">
    <span class="glass-menu__check"><svg viewBox="0 0 24 24"><polyline points="5 12 10 17 19 7"/></svg></span>
    <span class="glass-menu__label">Show archived</span>
  </button>
  <hr class="glass-menu__separator">
  <div role="group" aria-label="Sort by">
    <div class="glass-menu__group-label" aria-hidden="true">Sort by</div>
    <button class="glass-menu__item" role="menuitemradio" aria-checked="true" tabindex="-1">
      <span class="glass-menu__check"><svg viewBox="0 0 24 24"><polyline points="5 12 10 17 19 7"/></svg></span>
      <span class="glass-menu__label">Date</span>
    </button>
  </div>
  <hr class="glass-menu__separator">
  <button class="glass-menu__item glass-menu__item--danger" role="menuitem" tabindex="-1">
    <span class="glass-menu__check"><svg viewBox="0 0 24 24"><polyline points="5 12 10 17 19 7"/></svg></span>
    <span class="glass-menu__label">Delete</span>
  </button>
</div>
```

| Class | Description |
|---|---|
| `.glass-menu` | The panel, `role="menu"`, named by its button; 180–320px wide, scrolls past `min(70vh, 480px)` |
| `.glass-menu[popover]` | In the top layer, `position: fixed` where the script puts it; scales and fades in |
| `.glass-menu__item` | An item, 40px high: tinted on hover and `:focus`, a ring on `:focus-visible` — `.is-focused` / `.is-focus-visible` for a script that marks the focus itself |
| `.glass-menu__item--danger` | Destructive: the error colour |
| `.glass-menu__item[aria-disabled="true"]` / `.is-disabled` | Announced and reachable with the arrow keys, but dimmed and inert — use `aria-disabled`, not `disabled` |
| `.glass-menu__check` | The check mark's room; shows on `[aria-checked="true"]` / `.is-checked` |
| `.glass-menu__icon` | 18px icon before the label; empty or `hidden` takes no room |
| `.glass-menu__label` | The label, one line with an ellipsis |
| `.glass-menu__trailing` | A muted hint at the end, e.g. a shortcut |
| `.glass-menu__separator` | A hairline between groups — an `<hr>`, or `role="separator"` |
| `.glass-menu__group-label` | A small muted heading above a group (`role="group"` named the same) |

- **Line the labels up.** In a menu with checkable items every item carries a `.glass-menu__check`; it shows on the checked ones only. A menu without checkable items leaves it out.
- **The keyboard is the script's** — the WAI-ARIA menu button, all of it in `<glk-menu>`: Enter, Space and Down on the button open the menu at its first item, Up at its last; Down and Up move and wrap, Home and End go to the ends, typing jumps to the next item that starts with the letters, Enter and Space choose, Escape closes and gives the focus back to the button, Tab closes and moves on. One tab stop: the items carry `tabindex="-1"`. The button's `aria-expanded` follows the menu.

---

### 3.38 Tree

Levels that open and close (since 1.32.0): the structure of an app, menus with submenus. A row per item — a twisty that turns when the item opens, an icon, the label, something at the end (a badge, a status, an action) — indented by `--gl-tree-indent` (20px) per level, with the item's children in a `__group` below it. No surface of its own: put it in a card or a sidebar.

```html
<ul class="glass-tree" role="tree" aria-label="App structure">
  <li role="treeitem" aria-level="1" aria-expanded="true" aria-selected="false" aria-labelledby="node-menu" tabindex="-1">
    <div class="glass-tree__row is-expanded" style="--gl-tree-level: 1">
      <span class="glass-tree__twisty" aria-hidden="true"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></span>
      <span class="glass-tree__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><!-- Icon --></svg></span>
      <span class="glass-tree__label" id="node-menu">Main menu</span>
      <span class="glass-tree__trailing"><span class="glass-badge">2</span></span>
    </div>
    <ul class="glass-tree__group" role="group">
      <li role="treeitem" aria-level="2" aria-selected="true" aria-labelledby="node-services" tabindex="0">
        <div class="glass-tree__row is-leaf is-selected" style="--gl-tree-level: 2">
          <span class="glass-tree__twisty" aria-hidden="true"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></span>
          <span class="glass-tree__label" id="node-services">Services</span>
        </div>
      </li>
    </ul>
  </li>
</ul>
```

| Class | Description |
|---|---|
| `.glass-tree` | The container, `role="tree"` with a name |
| `.glass-tree__row` | An item's row, at least `--gl-tree-row-height` (36px) high, indented by (`--gl-tree-level` − 1) × `--gl-tree-indent`; set the level per row, 1 at the top |
| `.glass-tree__row.is-expanded` | Open: the twisty turns down |
| `.glass-tree__row.is-selected` | Chosen: raised glass like the active row of a sidebar, semibold, its icon in the accent |
| `.glass-tree__row.is-leaf` | Without children: the twisty keeps its room, hidden |
| `.glass-tree__row.is-loading` | Children on their way: the twisty turns into a small spinner (`aria-busy="true"` on the item) |
| `.glass-tree__row.is-error` | Children that could not load: a "!" in the error colour in place of the twisty (since 1.32.0). Close the item, put the reason into its description (`aria-description`) and announce it; opening the item again tries once more |
| `.glass-tree__row.is-disabled` | Dimmed, not-allowed cursor (`aria-disabled="true"` on the item) |
| `.glass-tree__row.is-flash` | A 1.2s flash for an item that changed elsewhere, in `--gl-flash-color`, as on list items (since 1.32.0) |
| `.glass-tree__row.is-focus-visible` | The focus ring, for a script that marks the focus itself. Where the `treeitem` takes the focus, `:focus-visible` on it already draws the ring on its row, not the browser's outline around the whole item (since 1.32.0); `:focus-visible` on the row itself works as well |
| `.glass-tree__twisty` | The chevron; mirrored right to left |
| `.glass-tree__icon` | 18px icon; empty or `hidden` takes no room |
| `.glass-tree__label` | One line with an ellipsis |
| `.glass-tree__trailing` | Muted, at the row's end |
| `.glass-tree__group` | The children, `role="group"`; `hidden` while the item is closed |

- **ARIA on the items:** `role="treeitem"` with `aria-level`, `aria-expanded` only on items with children, `aria-selected`. Name each item by its label (`aria-labelledby`), or its children's text becomes part of its name.
- **The keyboard is the script's**, the WAI-ARIA tree view, all of it in `<glk-tree>`: one tab stop (the selected item, else the first), Down and Up to the next and previous visible item, Right opens an item or moves to its first child, Left closes it or moves to its parent (mirrored right to left), Home and End, Enter and Space select — selection does not follow the focus — `*` opens every sibling, typing jumps.
- **Children that load** when their item opens: `aria-expanded="false"` and the twisty before any child exists, `.is-loading` with `aria-busy="true"` while they come, `.is-error` where they did not. `<glk-tree>` brings it as `has-children`, `glk-tree-load` and `load-error`.
- Reordering the items by drag and drop: 3.40.

---

### 3.39 Breadcrumbs

The path through nested levels (since 1.32.0): My app › Main menu › Services › Online booking. A `<nav aria-label="Breadcrumb">` around an `<ol>`; each crumb a link (or a button), the current level plain text with `aria-current="page"`. The separators are drawn by CSS between the items — hidden from assistive technology, mirrored right to left; never type `›` or `/` into the markup. A crumb wider than `--gl-breadcrumbs-crumb-width` (200px) ends in an ellipsis.

```html
<nav class="glass-breadcrumbs" aria-label="Breadcrumb">
  <ol class="glass-breadcrumbs__list">
    <li class="glass-breadcrumbs__item"><a class="glass-breadcrumbs__crumb" href="/app">My app</a></li>
    <li class="glass-breadcrumbs__item glass-breadcrumbs__item--overflow"><button class="glass-breadcrumbs__crumb glass-breadcrumbs__overflow" type="button" aria-label="1 more level" aria-haspopup="menu" aria-expanded="false">…</button></li>
    <li class="glass-breadcrumbs__item"><a class="glass-breadcrumbs__crumb" href="/app/menu/services">Services</a></li>
    <li class="glass-breadcrumbs__item"><span class="glass-breadcrumbs__current" aria-current="page">Online booking</span></li>
  </ol>
</nav>
```

| Class | Description |
|---|---|
| `.glass-breadcrumbs` | The `<nav>`, named "Breadcrumb" |
| `.glass-breadcrumbs__list` | The `<ol>`: one line, no wrapping |
| `.glass-breadcrumbs__item` | A level; from the second on a CSS chevron before it |
| `.glass-breadcrumbs__crumb` | A link or button to its level: muted, tinted on hover, a focus ring |
| `.glass-breadcrumbs__current` | The level shown: plain text in the heading colour, semibold |
| `.glass-breadcrumbs__overflow` | With `__crumb`: the "…" that stands for folded middle levels — a menu button (3.37) that lists them, named with the count ("2 more levels") |
| `.glass-breadcrumbs__item--overflow` | On the `<li>` of the "…": it keeps its width where the path still does not fit (since 1.32.0) |
| `.is-drop-target` / `.is-drop-refused` | On a crumb or the current level while a dragged item is over it: it takes the item into its level, or refuses it (3.40) |

GlassKit draws the path; `<glk-breadcrumbs>` in GlassKit Elements measures it, folds the middle levels into the "…" crumb where the path does not fit (the first crumb and the last two stay), shows a cut label in full in a tooltip, and makes the crumbs drop targets for a sortable list or tree.

---

### 3.40 Sorting (drag states)

The states of a drag that reorders a list or a tree (since 1.32.0). The dragged item stays where it was, faded; a raised copy follows the pointer in the top layer; a line shows where it lands, indented to the level it lands on; an item that takes it inside lights up, one that refuses it shows the error colour. The classes go on the rows — `.glass-list__item`, `.glass-tree__row`. The pointer, touch and keyboard handling, the announcements and the motion of the rows making room are GlassKit Elements' (`<glk-list sortable>`, `<glk-tree sortable>`).

```html
<ul class="glass-list">
  <li class="glass-list__item is-sort-source">…</li>
  <li class="glass-list__item is-sort-before">
    <div class="glass-list__content"><div class="glass-list__title">Services</div></div>
    <span class="glass-sort__handle" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 9h14M5 15h14"/></svg></span>
  </li>
</ul>
<div class="glass-sort__ghost" popover="manual" aria-hidden="true">Pricing</div>
```

| Class | Description |
|---|---|
| `.is-sort-source` | The dragged item where it was: faded to 0.4 |
| `.glass-sort__ghost` | The raised copy that follows the pointer, in the top layer (`popover="manual"`); never takes the pointer, and is hidden while closed |
| `.is-sort-before` / `.is-sort-after` | On the target row: a primary line above or below it, indented by `--gl-tree-level` |
| `.is-sort-inside` | On a row that takes the item inside it — a tree item, a submenu: tint and ring |
| `.is-sort-refused` | With one of the above: the target refuses the item — the error colour |
| `.glass-sort__handle` | A grip: with one, only the handle starts a drag, so a tap on the row still chooses it, and a finger on it drags at once (`touch-action: none`) |

`--gl-sort-duration` (180ms) and `--gl-sort-easing` (`ease-out`) time the rows that make room and the drop gliding into place; nothing moves under `prefers-reduced-motion`. Never make dragging the only way: a keyboard path (Space picks up, the arrows move, Space drops, Escape cancels) and announcements in a live region belong to it — `<glk-list sortable>` and `<glk-tree sortable>` have both.

---

## 4. Utility Classes

### Stack (Vertical)

Flexbox column with gap.

```html
<div class="gl-stack gl-stack--md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

| Class | Gap |
|---|---|
| `.gl-stack` | Default |
| `.gl-stack--2xs` | 4px |
| `.gl-stack--xs` | 8px |
| `.gl-stack--sm` | 12px |
| `.gl-stack--md` | 16px |
| `.gl-stack--lg` | 20px |
| `.gl-stack--xl` | 24px |

### Row (Horizontal)

Flexbox row with gap.

```html
<div class="gl-row gl-row--sm">
  <span class="glass-badge">Tag 1</span>
  <span class="glass-badge">Tag 2</span>
</div>
```

| Class | Gap |
|---|---|
| `.gl-row` | Default |
| `.gl-row--xs` | 8px |
| `.gl-row--sm` | 12px |
| `.gl-row--md` | 16px |

### Margin

| Class | Value |
|---|---|
| `.gl-mt-sm` | margin-top: 12px |
| `.gl-mt-md` | margin-top: 16px |
| `.gl-mt-lg` | margin-top: 20px |
| `.gl-mt-xl` | margin-top: 24px |
| `.gl-mb-sm` | margin-bottom: 12px |
| `.gl-mb-md` | margin-bottom: 16px |
| `.gl-mb-lg` | margin-bottom: 20px |
| `.gl-mb-xl` | margin-bottom: 24px |

### Text

| Class | Description |
|---|---|
| `.gl-text-center` | text-align: center |
| `.gl-text-muted` | Muted text color |
| `.gl-text-sm` | Smaller font size |

### Layout

| Class | Description |
|---|---|
| `.gl-px` | Horizontal padding |
| `.gl-w-full` | width: 100% |
| `.gl-flex-1` | flex: 1 |

---

## 5. State Classes Overview

| State Class | Used on | Description |
|---|---|---|
| `.is-active` | `.glass-modal-overlay`, `.glass-tab-bar__item` | Element is active/visible |
| `.is-open` | `.glass-accordion__item`, `.glass-popover` | Accordion item expanded / popover visible |
| `.is-visible` | `.glass-toast` | Toast is visible |
| `.is-under-droplet` | `.glass-tab-bar__item`, `.glass-segmented__item` | The item below the drop of a `--droplet` row; set by `glasskit-droplet.js` only (since 1.27.0) |
| `:checked` | Toggle, Checkbox, Radio (on the input) | Native checked state |
| `:focus` | Input, Textarea, Select, Range | Focus ring |
| `:disabled` | Input, Select, Textarea, Range (0.4); Button, Pill, Tab Bar Accessory, Modal action, list row, calendar arrow, Toggle, Checkbox, Radio (0.45) | Dimmed, not-allowed cursor, no hover (most since 1.21.2) |
| `[aria-disabled="true"]` | `a.glass-btn` and the other buttons; date strip and calendar days; `.glass-menu__item` | As `:disabled`, for elements that cannot be disabled — a link still navigates; a menu item stays reachable with the arrow keys |
| `:popover-open` | `.glass-popover[popover]`, `.glass-tooltip[popover]`, `.glass-menu[popover]`, `.glass-sort__ghost` | Shown in the top layer, by `showPopover()` or a `popovertarget` button (since 1.32.0) |
| `.is-checked` / `[aria-checked="true"]` | `.glass-menu__item` | Shows the check mark (since 1.32.0) |
| `.is-focused` / `.is-focus-visible` | `.glass-menu__item`; `.is-focus-visible` also `.glass-tree__row` | Focus tint / ring, for a script that marks the focus itself (since 1.32.0) |
| `.is-disabled` | `.glass-menu__item`, `.glass-tree__row` | Dimmed and inert, still announced (since 1.32.0) |
| `.is-expanded`, `.is-selected`, `.is-leaf`, `.is-loading`, `.is-error` | `.glass-tree__row` | Open, chosen, without children, children loading, children that could not load (since 1.32.0) |
| `.is-flash` | `.glass-list__item`, `.glass-tree__row` | A 1.2s flash for an item that changed elsewhere, in `--gl-flash-color` (since 1.32.0) |
| `.is-drop-target` / `.is-drop-refused` | `.glass-breadcrumbs__crumb`, `.glass-breadcrumbs__current` | A dragged item over the crumb: taken into its level / refused (since 1.32.0) |
| `.is-sort-source`, `-before`, `-after`, `-inside`, `-refused` | `.glass-list__item`, `.glass-tree__row` | The states of a drag that reorders (since 1.32.0, 3.40) |
| `[aria-sort]` | `th` of `.glass-table` | The sorted column and its direction: the arrow of `__sort-icon` (since 1.32.0) |

---

## 6. Composition Patterns

### Login Screen

```html
<div class="glass-bg">
  <nav class="glass-nav">
    <button class="glass-pill">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="glass-theme-toggle" onclick="toggleTheme()">
      <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/></svg>
    </button>
  </nav>

  <h1 class="glass-title">Sign In</h1>

  <div class="gl-stack gl-stack--md">
    <div class="glass-input-group">
      <label class="glass-label">Email</label>
      <input class="glass-input" type="email" placeholder="name@example.com">
    </div>
    <div class="glass-input-group">
      <label class="glass-label">Password</label>
      <input class="glass-input" type="password" placeholder="••••••••">
    </div>
  </div>

  <div class="gl-stack gl-stack--sm gl-mt-lg">
    <button class="glass-btn glass-btn--primary">Log In</button>
    <button class="glass-btn glass-btn--tertiary">Forgot password?</button>
  </div>
</div>
```

### Dashboard with Cards

```html
<div class="glass-bg glass-bg--has-tab-bar">
  <nav class="glass-nav">
    <h1 class="glass-title">Dashboard</h1>
    <button class="glass-pill">
      <svg viewBox="0 0 24 24"><!-- Settings Icon --></svg>
    </button>
  </nav>

  <div class="gl-stack gl-stack--md">
    <div class="glass-card glass-card--glow">
      <div class="glass-card__icon">
        <svg viewBox="0 0 64 64"><!-- Icon --></svg>
      </div>
      <p class="glass-card__text">Capture and upload documents.</p>
    </div>

    <div class="glass-card glass-card--glow">
      <div class="glass-card__icon">
        <svg viewBox="0 0 64 64"><!-- Icon --></svg>
      </div>
      <p class="glass-card__text">Manage and archive contracts.</p>
    </div>
  </div>

  <nav class="glass-tab-bar">
    <button class="glass-tab-bar__item is-active">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Home --></svg></span>
      <span class="glass-tab-bar__label">Home</span>
    </button>
    <button class="glass-tab-bar__item">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Docs --></svg></span>
      <span class="glass-tab-bar__label">Contracts</span>
    </button>
    <button class="glass-tab-bar__item">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Profile --></svg></span>
      <span class="glass-tab-bar__label">Profile</span>
    </button>
  </nav>
</div>
```

### Form Page

```html
<div class="glass-bg">
  <nav class="glass-nav">
    <button class="glass-pill">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
  </nav>

  <h1 class="glass-title">New Contract</h1>

  <div class="gl-stack gl-stack--md">
    <div class="glass-input-group">
      <label class="glass-label">Contract Name</label>
      <input class="glass-input" type="text" placeholder="e.g. Rental Agreement">
    </div>

    <div class="glass-input-group">
      <label class="glass-label">Category</label>
      <select class="glass-select">
        <option>Please select…</option>
        <option>Insurance</option>
        <option>Rental Agreement</option>
        <option>Employment Contract</option>
      </select>
    </div>

    <div class="glass-input-group">
      <label class="glass-label">Notes</label>
      <textarea class="glass-textarea" placeholder="Optional notes…"></textarea>
    </div>

    <label class="glass-toggle">
      <input class="glass-toggle__input" type="checkbox">
      <span class="glass-toggle__track"><span class="glass-toggle__thumb"></span></span>
      <span class="glass-toggle__label">Enable reminder</span>
    </label>

    <hr class="glass-divider">

    <button class="glass-btn glass-btn--primary">Save</button>
    <button class="glass-btn glass-btn--tertiary">Cancel</button>
  </div>
</div>
```

### Delete Confirmation (Modal)

```html
<div class="glass-modal-overlay is-active">
  <div class="glass-modal">
    <div class="glass-modal__header">
      <h2 class="glass-modal__title">Delete contract?</h2>
    </div>
    <div class="glass-modal__body">
      <p>Do you want to permanently delete this contract? This action cannot be undone.</p>
    </div>
    <div class="glass-modal__footer">
      <button class="glass-modal__action" onclick="closeModal()">Cancel</button>
      <button class="glass-modal__action glass-modal__action--danger" onclick="deleteContract()">Delete</button>
    </div>
  </div>
</div>
```

### Settings Page

```html
<div class="glass-bg">
  <nav class="glass-nav">
    <button class="glass-pill">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
  </nav>

  <h1 class="glass-title">Settings</h1>

  <div class="gl-stack gl-stack--md">
    <label class="glass-toggle">
      <input class="glass-toggle__input" type="checkbox" checked>
      <span class="glass-toggle__track"><span class="glass-toggle__thumb"></span></span>
      <span class="glass-toggle__label">Push Notifications</span>
    </label>

    <hr class="glass-divider">

    <label class="glass-toggle">
      <input class="glass-toggle__input" type="checkbox">
      <span class="glass-toggle__track"><span class="glass-toggle__thumb"></span></span>
      <span class="glass-toggle__label">Dark Mode</span>
    </label>

    <hr class="glass-divider">

    <div class="glass-range-group">
      <div class="glass-range-header">
        <label class="glass-label">Font Size</label>
        <span class="glass-range-value">100%</span>
      </div>
      <input class="glass-range" type="range" min="80" max="150" value="100">
    </div>

    <hr class="glass-divider">

    <div class="glass-accordion">
      <div class="glass-accordion__item">
        <button class="glass-accordion__trigger" onclick="this.parentElement.classList.toggle('is-open')">
          <span>Advanced Settings</span>
          <span class="glass-accordion__trigger-icon">
            <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div class="glass-accordion__content">
          <div class="glass-accordion__body">
            Advanced options go here…
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### iOS-style Settings Screen (List + Popover)

A grouped settings screen using `glass-list` for the rows and `glass-popover` for an inline action menu. Reproduces the layout of native iOS Settings screens.

```html
<div class="glass-bg">
  <nav class="glass-nav">
    <button class="glass-pill">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <h1 class="glass-title">Settings</h1>

    <!-- Inline action menu (popover) -->
    <div class="glass-popover-anchor">
      <button class="glass-pill" onclick="gkTogglePopover(this, event)" aria-label="More">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
        </svg>
      </button>
      <div class="glass-popover glass-popover--end">
        <ul class="glass-list glass-list--bare">
          <li class="glass-list__item glass-list__item--interactive">
            <div class="glass-list__content"><div class="glass-list__title">Edit profile</div></div>
          </li>
          <li class="glass-list__item glass-list__item--interactive">
            <div class="glass-list__content"><div class="glass-list__title">Sign out</div></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Account section -->
  <div class="glass-list__section-header">Account</div>
  <ul class="glass-list gl-mb-lg">
    <li class="glass-list__item glass-list__item--interactive">
      <span class="glass-list__leading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </span>
      <div class="glass-list__content">
        <div class="glass-list__title">Marcel Jungherz</div>
        <div class="glass-list__subtitle">marcel@jungherz.com</div>
      </div>
      <div class="glass-list__trailing">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </li>
    <li class="glass-list__item glass-list__item--interactive">
      <span class="glass-list__leading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      </span>
      <div class="glass-list__content">
        <div class="glass-list__title">Subscriptions</div>
      </div>
      <div class="glass-list__trailing">
        $34.94
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </li>
  </ul>

  <!-- Notifications section -->
  <div class="glass-list__section-header">Notifications</div>
  <ul class="glass-list gl-mb-lg">
    <li class="glass-list__item glass-list__item--interactive">
      <span class="glass-list__leading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </span>
      <div class="glass-list__content"><div class="glass-list__title">Push notifications</div></div>
      <div class="glass-list__trailing">On</div>
    </li>
    <li class="glass-list__item glass-list__item--interactive">
      <span class="glass-list__leading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22 6 12 13 2 6"/>
        </svg>
      </span>
      <div class="glass-list__content"><div class="glass-list__title">Email digest</div></div>
      <div class="glass-list__trailing">Weekly</div>
    </li>
    <li class="glass-list__item glass-list__item--center glass-list__item--interactive">
      Reset to defaults
    </li>
  </ul>
</div>
```

Key points in this composition:

- **Two grouped sections** — labeled by `.glass-list__section-header` above each list, matching iOS settings.
- **Auto-dividers** — no `<hr>` between rows; the `::after` pseudo-element handles them.
- **Mixed trailing types** — chevron, value text, value + chevron, all in the same list.
- **Centered destructive action** — last item uses `--center` for a "Reset to defaults" style row, gets a full-width divider above (no leading icon → standard padding inset).
- **Popover in nav** — `glass-popover--end` aligns the menu to the right edge of the trigger so it doesn't overflow the viewport.
- **Bare list inside popover** — `glass-list--bare` strips the inner glass surface so the popover stays the only glass layer.

---

### Progress + Toast

```html
<!-- Progress -->
<div class="glass-progress glass-progress--success">
  <div class="glass-progress__header">
    <span class="glass-progress__label">Upload</span>
    <span class="glass-progress__value">100%</span>
  </div>
  <div class="glass-progress__track">
    <div class="glass-progress__fill" style="width: 100%"></div>
  </div>
</div>

<!-- Toast (shown via JS) -->
<div class="glass-toast glass-toast--success is-visible">
  <svg class="glass-toast__icon" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
  <span class="glass-toast__text">Upload successful!</span>
</div>
```

### Back office (Sidebar + Breadcrumbs + Table + Menu)

Since 1.32.0: the navigation as a sidebar, the path above the content, a table with a sticky header and a menu per row.

```html
<div class="glass-bg" style="display: grid; grid-template-columns: auto 1fr; height: 100dvh">
  <nav class="glass-tab-bar glass-tab-bar--vertical glass-tab-bar--droplet" aria-label="Main">
    <a class="glass-tab-bar__item is-active" href="/invoices" aria-current="page">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Icon --></svg></span>
      <span class="glass-tab-bar__label">Invoices</span>
    </a>
    <a class="glass-tab-bar__item" href="/customers" aria-label="Customers, 3 new">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Icon --></svg><span class="glass-tab-bar__badge">3</span></span>
      <span class="glass-tab-bar__label">Customers</span>
    </a>
  </nav>

  <main class="gl-stack gl-stack--md gl-px" style="overflow-y: auto; padding-block: 24px">
    <nav class="glass-breadcrumbs" aria-label="Breadcrumb">
      <ol class="glass-breadcrumbs__list">
        <li class="glass-breadcrumbs__item"><a class="glass-breadcrumbs__crumb" href="/">Back office</a></li>
        <li class="glass-breadcrumbs__item"><span class="glass-breadcrumbs__current" aria-current="page">Invoices</span></li>
      </ol>
    </nav>
    <h1 class="glass-title">Invoices</h1>
    <div class="glass-table-frame">
      <div class="glass-table-wrap glass-table-wrap--sticky" style="--gl-table-max-height: calc(100dvh - 180px)">
        <table class="glass-table glass-table--sticky">
          <thead>
            <tr>
              <th aria-sort="descending"><button class="glass-table__sort" type="button">Date<svg class="glass-table__sort-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></th>
              <th>Customer</th>
              <th class="glass-table__num">Amount</th>
              <th class="glass-table__actions" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Date">2026-10-27</td>
              <td data-label="Customer">Jungherz GmbH</td>
              <td class="glass-table__num" data-label="Amount">1,240.00</td>
              <td class="glass-table__actions">
                <button class="glass-btn glass-btn--tertiary glass-btn--sm glass-btn--auto" id="act-1042"
                        aria-label="Actions for invoice 1042" aria-haspopup="menu" aria-expanded="false" popovertarget="menu-1042">…</button>
                <div class="glass-menu" id="menu-1042" role="menu" aria-labelledby="act-1042" popover>
                  <button class="glass-menu__item" role="menuitem" tabindex="-1"><span class="glass-menu__label">Send again</span></button>
                  <hr class="glass-menu__separator">
                  <button class="glass-menu__item glass-menu__item--danger" role="menuitem" tabindex="-1"><span class="glass-menu__label">Cancel invoice</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>
```

Key points:
- One set of items for every layout: between two widths the `<nav>` takes `--rail`; on a phone the page drops its grid and the same `<nav>` drops `--vertical` for the bottom edge (with `.glass-bg--has-tab-bar`), or takes `--end` on a phone held open.
- The header sticks to the wrap, which is as high as the page leaves (`--gl-table-max-height`).
- The row's menu opens in the top layer, so the wrap's overflow does not cut it off; `gkPlace()` (3.25) puts it at its button, the keyboard is the page's script — or GlassKit Elements: `<glk-tab-bar orientation="vertical">`, `<glk-breadcrumbs>`, `<glk-table sticky-header>`, `<glk-menu>`.

---

## 7. Rules & Common Mistakes

### ✅ Always follow

1. **`glass-bg` as outermost container** – Without the background wrapper, the aurora background is missing and glass effects won't render correctly.
2. **`glass-bg--has-tab-bar`** – When a tab bar is present, this modifier must be set on `glass-bg`, otherwise the tab bar covers the bottom content.
3. **Buttons are full-width** – `glass-btn` has `width: 100%`. Always add `glass-btn--auto` for inline buttons.
4. **Wrap inputs in `glass-input-group`** – For correct label/hint spacing.
5. **Place state classes correctly:**
   - `is-active` → on `.glass-modal-overlay` (not on `.glass-modal`)
   - `is-active` → on `.glass-tab-bar__item`
   - `is-open` → on `.glass-accordion__item`
   - `is-open` → on `.glass-popover` (not on the trigger or anchor)
   - `is-visible` → on `.glass-toast`
6. **SVG icons** – GlassKit uses inline SVGs (stroke-based, not fill). Typical attributes: `viewBox="0 0 24 24"`, stroke via `currentColor`.
7. **`data-theme`** – Always set on `<html>`, never on `<body>` or deeper elements.
8. **List dividers are automatic** – Never add a `<hr>` or divider element between `.glass-list__item`s. The divider is rendered via `::after` and respects `:has(.glass-list__leading)` for the inset.
9. **Popover toggle naming** – Never name your popover toggle JS function `togglePopover`. It collides with the native `HTMLElement.togglePopover()` method. Use a prefix like `gkTogglePopover`.
10. **`data-density`** – Like `data-theme`, on `<html>`: `compact` or absent. For a denser UI set the attribute or a density token, never `height` on the components.
11. **Droplet needs its module** – `--droplet` on a tab bar or segmented row does nothing until `glasskit-droplet.js` attaches (`attachDroplets()`); recommend both together, and leave the `data-droplet*` attributes and the `--gl-droplet-left/-right/-top/-bottom` properties to the module. The timing tokens (`--gl-droplet-duration` and the rest, since 1.32.0) are the project's to set.
12. **One navigation, every layout** – a sidebar, an icon rail and a top bar are the tab bar with `--vertical`, `--rail` and `--top` (since 1.32.0). Keep one set of items and switch the modifiers; mark the open view with `aria-current="page"` and name the `<nav>`.
13. **Top-layer panels need a script** – `.glass-popover[popover]`, `.glass-tooltip` and `.glass-menu` are drawn by GlassKit and placed by script (`gkPlace()` in 3.25); the keyboard of menu and tree is script as well (since 1.32.0). GlassKit Elements brings both.

### ❌ Common Mistakes

| Mistake | Correction |
|---|---|
| `is-active` on `.glass-modal` instead of `.glass-modal-overlay` | Set `is-active` on the overlay |
| `glass-btn` without variant (`--primary` etc.) | Always specify a variant |
| Inputs without `glass-input-group` wrapper | Wrap in `glass-input-group` |
| `glass-tab-bar` without `glass-bg--has-tab-bar` | Add modifier to the background container |
| `data-theme` on `<body>` | Set on `<html>` |
| Progress width via class instead of inline style | Use `style="width: X%"` on `.glass-progress__fill` |
| Toggle without `__track > __thumb` nesting | Follow correct BEM hierarchy |
| Manually adding `<hr>` or divider element between `.glass-list__item`s | Remove it — dividers are automatic via `::after` |
| Putting `glass-list` inside `glass-popover` without `--bare` | Add `.glass-list--bare` to strip the double glass surface |
| JS function named `togglePopover()` | Rename to `gkTogglePopover()` or similar to avoid native API clash |
| Putting `.is-open` on the trigger button instead of `.glass-popover` | The state class belongs on the popover element |
| Animating the selection of a tab bar or segmented row with your own script | `--droplet` plus `glasskit-droplet.js` (since 1.27.0) |
| Setting `data-droplet*` or `--gl-droplet-left` / `-right` / `-top` / `-bottom` by hand | Let `attachDroplet()` set them; only the timing tokens are the project's (since 1.32.0) |
| Copying the tab bar's state rules onto a font icon, or overriding `stroke` on `.glass-tab-bar__icon svg` | Put the icon into `.glass-tab-bar__icon` as it is; set `--gl-tab-bar-color` / `--gl-tab-bar-hover-color` (since 1.28.0) |
| Overriding the tab label's `font-size` or the bar's `z-index` | `--gl-tab-bar-label-size`, `--gl-tab-bar-z-index` (since 1.28.0) |
| Restyling the chosen segmented option for a dark brand | `--gl-segmented-active-bg`, `-color`, `-shadow` (since 1.28.0) |
| A count in a segmented label, "Tickets (1)" | `.glass-segmented__badge` after the label, the count in the option's `aria-label` (since 1.29.0) |
| A tone on the option only to colour its count, or `--gl-segmented-badge-bg` / `-color` set to a state colour | `.glass-segmented__badge--error` (or `--primary`, `--success`, `--warning`) — no dot (since 1.31.0) |
| `--gl-radius-btn` set for pill-shaped buttons | `--gl-btn-radius: 9999px` — lists, toasts and the segmented control keep theirs (since 1.31.0) |
| `--gl-color-primary` darkened until white text on the primary button passes | `--gl-btn-primary-bg` and `--gl-color-primary-fill` darken the fills alone, or switch the ink with `--gl-color-on-primary` (since 1.32.0, section 2) |
| A rule on `.glass-radio__dot` to turn it dark with a dark ink | Nothing to do: the dot follows `--gl-color-on-primary` (since 1.32.0) |
| A sidebar from `.glass-tab-bar` with its own `flex-direction`, `position` and `height` | `.glass-tab-bar--vertical`, with `--start` / `--end` for a fixed side, `--rail` for icons alone; `--top` for a top bar (since 1.32.0) |
| `.glass-bg--has-tab-bar` next to a side bar | It pads the bottom edge only; pad the content on the bar's side yourself |
| Overriding the drop's `transition` or `transform` | The `--gl-droplet-*` timing tokens (since 1.32.0) |
| The native `title` attribute as the tooltip of an icon button | `.glass-tooltip` (3.36) — `title` shows neither on keyboard focus nor on touch |
| Commands behind a button as plain buttons in a popover, without menu roles | `.glass-menu` with `role="menu"` / `menuitem` (3.37), the keyboard from `<glk-menu>` |
| `›` or `/` typed between breadcrumbs | Leave them out — `.glass-breadcrumbs__item` draws the chevron, hidden from screen readers and mirrored right to left |
| `position: sticky` on `th` inside `.glass-table-wrap` | `.glass-table-wrap--sticky` + `.glass-table--sticky` (since 1.32.0) — a wrap that scrolls sideways is a scroll container in both directions |
| `.glass-popover` without `[popover]` inside a card or a scrolling box that clips | Open it in the top layer with the `popover` attribute (since 1.32.0) |
| Overriding `height` of `.glass-btn`, `.glass-input` etc. for a denser UI | `data-density="compact"` on `<html>`, or set a density token — toggle thumb and label alignment follow the tokens, not a hand-set `height` |

---

## 8. Quick Class Reference

| Component | Base Class | Modifiers / States |
|---|---|---|
| Background | `.glass-bg` | `--has-tab-bar` |
| Navigation | `.glass-nav` | – |
| Pill Button | `.glass-pill` | `:disabled` |
| Theme Toggle | `.glass-theme-toggle` | – |
| Title | `.glass-title` | – |
| Card | `.glass-card` | `--glow` |
| Button | `.glass-btn` | `--primary`, `--secondary`, `--tertiary`, `--sm`, `--lg`, `--auto`, `:disabled` |
| Badge | `.glass-badge` | `--primary`, `--success`, `--warning`, `--error`, `--interactive`, `--selected` |
| Avatar | `.glass-avatar` | `--sm`, `--lg` |
| Divider | `.glass-divider` | – |
| Status | `.glass-status` | – |
| Input | `.glass-input` | `--error`, `:disabled`; `.glass-input-wrap` with `__prefix` / `__suffix`, `--prefix` / `--suffix` |
| Input Group | `.glass-input-group` | – |
| Label | `.glass-label` | – |
| Hint | `.glass-hint` | `--error` |
| Textarea | `.glass-textarea` | `:disabled` |
| Select | `.glass-select` | `:disabled` |
| Search | `.glass-search` | – |
| Toggle | `.glass-toggle` | `:checked`, `:disabled` |
| Checkbox | `.glass-checkbox` | `:checked`, `:disabled` |
| Radio | `.glass-radio` | `:checked`, `:disabled` |
| Range | `.glass-range` | `:disabled` |
| Progress | `.glass-progress` | `--sm`, `--lg`, `--success`, `--error` |
| Modal | `.glass-modal-overlay` | `.is-active` |
| Toast | `.glass-toast` | `--success`, `--error`, `--warning`, `.is-visible`, `__action`, `__close` |
| Tab Bar | `.glass-tab-bar` | `.is-active` on items, `__icon`, `__label`, `__badge`, `--floating`, `--droplet`, `--vertical`, `--start`, `--end`, `--rail`, `--top`; `.glass-tab-bar-dock--vertical`, `-dock--start` / `--end` |
| Accordion | `.glass-accordion` | `.is-open` on items |
| List | `.glass-list` | `--flush`, `--bare`, `__item--interactive`, `__item--center`, `__item--danger`, `__item--accent`, `__leading--lg`, `__subtitle--wrap`, `__value`, `__section-header`, `.is-flash` on items |
| Popover | `.glass-popover` | `--top`, `--start`, `--end`, `.is-open`, `[popover]`, `[data-side]` |
| Tooltip | `.glass-tooltip` | `[popover]` |
| Menu | `.glass-menu` | `[popover]`, `__item`, `__item--danger`, `__check`, `__icon`, `__label`, `__trailing`, `__separator`, `__group-label`, `[aria-checked]` / `.is-checked`, `[aria-disabled]` / `.is-disabled`, `.is-focused`, `.is-focus-visible` |
| Tree | `.glass-tree` | `__row`, `__twisty`, `__icon`, `__label`, `__trailing`, `__group`, `.is-expanded`, `.is-selected`, `.is-leaf`, `.is-loading`, `.is-error`, `.is-disabled`, `.is-flash`, `.is-focus-visible` |
| Breadcrumbs | `.glass-breadcrumbs` | `__list`, `__item`, `__item--overflow`, `__crumb`, `__current`, `__overflow`, `.is-drop-target`, `.is-drop-refused` |
| Sorting | `.is-sort-source` | `.is-sort-before`, `-after`, `-inside`, `-refused`; `.glass-sort__ghost`, `.glass-sort__handle` |
| Skeleton | `.glass-skeleton` | `__line`, `__line--title` |
| Table | `.glass-table` | `-wrap`, `-wrap--sticky`, `-frame`, `__num`, `__muted`, `__sort`, `__sort-icon`, `__actions`, `__empty`, `--sticky`, `--scrolls`, `--list`, `[aria-sort]` |
| Prose | `.glass-prose` | – |
| Segmented | `.glass-segmented` | `--full`, `--scroll`, `--wrap`, `--icons`, `--droplet`, `__item`, `__item--success`/`--warning`/`--error`, `__dot`, `__icon`, `__badge`, `[aria-pressed]` |
| Steps | `.glass-steps` | `__item`, `__item--done`, `__item--current`, `__num`, `__label`, `__line` |
| Sheet | `.glass-sheet-overlay` + `.glass-sheet` | `.is-active`, `--inline`, `__grip`, `__title`, `__body`, `__actions` |
| Empty state | `.glass-empty` | `__icon`, `__title`, `__text`, `__action` |
| Date strip | `.glass-date-strip` | `__day`, `__day--today`, `__wd`, `__num`, `__mark`, `__mark--primary`/`--success`/`--warning`/`--error`, `[aria-pressed]`, `:disabled` |
| Calendar | `.glass-calendar` | `__head`, `__title`, `__nav`, `__grid`, `__wd`, `__day`, `__day--today`, `__day--other`, `__marks`, `__mark--primary`/`--success`/`--warning`/`--error`, `[aria-pressed]`, `[aria-disabled]` |
| Image picker | `.glass-image-picker` | `__preview`, `__preview--round`, `__meta`, `__label`, `__hint`, `__actions` |

---

## 9. Web Components / Shadow DOM

GlassKit ships a Constructable Stylesheet for Shadow DOM usage:

```js
import { glassSheet } from '@jungherz-de/glasskit/glasskit-styles.js';

class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [glassSheet];
    shadow.innerHTML = `
      <div class="glass-card glass-card--glow">
        <p class="glass-card__text"><slot></slot></p>
      </div>
    `;
  }
}
customElements.define('my-card', MyCard);
```

| Export | Type | Description |
|---|---|---|
| `glassSheet` | `CSSStyleSheet` | Full sheet — rules **and** token declarations |
| `css` | `string` | The same, as a string |
| `componentsSheet` | `CSSStyleSheet` | Component rules only, no token declarations (since 1.9.0) |
| `componentsCss` | `string` | The same, as a string |
| `tokensSheet` | `CSSStyleSheet` | Only the blocks that declare `--gl-*`: the two `[data-theme]` blocks (since 1.9.0) and the `[data-density="compact"]` preset (since 1.21.0) |
| `tokensCss` | `string` | The same, as a string |

CSS Custom Properties (`--gl-*`) cross the shadow boundary by inheritance, so the example
above picks up whatever the document defines and theme switching works globally.

> **Pitfall: do not put `data-theme` inside the shadow root while adopting `glassSheet`.** The full sheet contains `:root, [data-theme="dark"] { … }`. If your shadow root holds an element carrying `data-theme`, that selector matches it and re-declares every token locally — and a matching rule always beats an inherited value. A project's `:root { --gl-color-primary: … }` then silently stops arriving inside your component. The dark block declares the default control sizes too, so `<html data-density="compact">` stops arriving as well — unless that element carries `data-density` mirrored from `<html>`, which lets the compact preset (also in the full sheet) match it.
>
> If you need a themed element inside the shadow root, adopt `componentsSheet` instead
> and make sure the tokens are present on the document:
>
> ```js
> shadow.adoptedStyleSheets = [componentsSheet];
>
> // once per page, if the document does not already link glasskit.css:
> const defaults = new CSSStyleSheet();
> defaults.replaceSync(`@layer glasskit-defaults { ${tokensCss} }`);
> document.adoptedStyleSheets = [...document.adoptedStyleSheets, defaults];
> ```
>
> The cascade layer keeps an ordinary brand stylesheet winning over the defaults. This is
> what GlassKit Elements does since 1.9.0.

> **Pitfall: a descendant selector cannot reach a slotted icon.** `.glass-btn svg` only
> matches real descendants. An icon passed in from outside stays in the light DOM, so the
> rule never applies to it. Since 1.10.0 every icon rule that sits above a slot has a
> `::slotted()` twin, so passing an icon in works:
>
> ```html
> <glk-button><svg viewBox="0 0 24 24">…</svg>Save</glk-button>
> ```
>
> `::slotted()` matches only the assigned node, never inside it — an icon wrapped in a
> container (`<span slot="leading"><svg …></span>`) stays unstyled and has to be sized by
> the project. Pass the `<svg>` directly.

---

## 10. Custom Theming

Load custom brand colors via `theme-override.css` after the base library:

```css
:root {
  --gl-color-primary:      #007AFF;
  --gl-color-primary-dark: #0055CC;
}
```

Since 1.11.0 those two declarations are the whole job. The gradient midpoint, the warm
rim (`--gl-border-warm`), the focus ring (`--gl-border-focus`, `--gl-shadow-focus`), the
glow under the primary button and the range slider thumb are all mixed from them. Before
1.11.0 they held fixed amber values, so a re-branded button came with an orange halo and
an amber focus ring.

Two things worth knowing:

- **Declare the brand on `:root`.** A custom property is substituted where it is
  *declared*, so the derived tokens read the primary of the element they sit on. Setting
  `--gl-color-primary` on a subtree re-colors what that subtree paints directly, but does
  not re-derive the tokens inherited from `:root`.
- **Override any derived token individually** if you want to bend one — the derivations
  are plain defaults and lose to a later declaration.

```css
:root {
  /* only if you want a different midpoint than the mix */
  --gl-color-primary-mid:  #0066E0;

  /* Ink on the primary fill – defaults to #ffffff. Set a dark ink here if your
     brand color is light and you need WCAG AA on filled surfaces. */
  --gl-color-on-primary:   #ffffff;
}
```

The opposite case — a primary dark enough for white button text, too dark for text on a dark background — is `--gl-color-primary-text` (since 1.26.0, section 2). It colours prose links, the active tab, the primary modal action, accent list rows, the range value and the accordion, and defaults to the primary. Set it per theme, the light rule after the dark one:

```css
:root, [data-theme="dark"] {
  --gl-color-primary-text:   color-mix(in srgb, var(--gl-color-primary) 18%, #ffffff);
  --gl-tab-bar-active-color: #ffffff;   /* optional: icon and label of the active tab alone */
}
[data-theme="light"] {
  --gl-color-primary-text:   var(--gl-color-primary);
  --gl-tab-bar-active-color: var(--gl-color-primary-text);
}
```

White on the filled accents — the primary button, the chosen day, the current step — reaches AA without a new brand colour since 1.32.0: `--gl-btn-primary-bg` and `--gl-color-primary-fill` darken the fills alone, and `--gl-color-on-primary` switches the ink, which the radio's dot follows now as well. The recipes, with the measured ratios, are in section 2 (Role Colors).

The drop of `--droplet` rows is timed by tokens too (since 1.32.0, 3.4): `--gl-droplet-duration`, `-easing`, `-trail-duration`, `-trail-delay`, `-trail-easing`, `-lift`, `-lift-duration`, `-settle-duration`, `-settle-easing`, `-lens-duration`, `-lens-easing`.

Overriding `--gl-color-success` / `--gl-color-error` is enough on its own: fill, border,
text and glow of every state component are derived from those tokens. Only if you want
a different ink than the derived one do you need to touch `--gl-color-{state}-on-surface`.

The density tokens (section 2) are overridden the same way, for both densities or for compact only:

```css
:root                    { --gl-btn-height: 48px; }
[data-density='compact'] { --gl-btn-height: 36px; }
```

Included theme templates in `theme-override.css`:
- 🔵 Ocean Blue
- 🟢 Emerald Green
- 🌹 Rose
- 🎨 Custom (empty, ready to fill)
