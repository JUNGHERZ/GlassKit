# Changelog

All notable changes to **GlassKit** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
GlassKit uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.9.0] – 2026-08-17

Version numbers of GlassKit and GlassKit Elements are realigned with this release;
1.8.0 is deliberately skipped on this side.

### Added

- **`glasskit-styles.js` now also exports the stylesheet split in two**, so a consumer
  can adopt the component rules without dragging the token declarations along:

  | Export | Contents |
  |---|---|
  | `tokensCss` / `tokensSheet` | the two `[data-theme]` blocks that declare every `--gl-*` |
  | `componentsCss` / `componentsSheet` | everything else |
  | `css` / `glassSheet` | unchanged — the full sheet |

  **Why this exists.** A shadow root that adopts the *full* sheet also adopts
  `:root, [data-theme="dark"] { … }`. Inside that shadow root the selector matches the
  consumer's own theme wrapper, so every token is re-declared locally — and a matching
  rule always beats an inherited value. A project's `:root { --gl-color-primary: … }`
  then never arrives. That is exactly what happened in GlassKit Elements ≤1.8.0, where
  `--gl-*` overrides had no effect inside any `<glk-*>` element.

  The fix belongs on the consuming side (adopt `componentsSheet`, put `tokensCss` on the
  document), but the split has to be produced here, where the CSS is built.

  `css` and `glassSheet` are byte-identical to before — the build asserts
  `componentsHead + tokensCss + componentsTail === css` and fails otherwise. Nothing
  changes for anyone importing them.

### Changed

- **`build-styles-js.mjs`** locates the two token blocks by brace matching and verifies
  the split before writing: tokens must carry `--gl-color-primary` and `--gl-state-scrim`,
  components must carry `.glass-btn--primary` and `.glass-theme-toggle` and must *not*
  declare tokens, and the two halves must account for every byte. A silently wrong split
  would ship unstyled components or unbrandable tokens, so it fails the build instead.

  The module embeds the CSS only once and re-joins the parts at load time, so
  `glasskit-styles.js` grows by about 0.5 KB rather than doubling.

### Note

No CSS rule and no token value changed in this release. `glasskit.css` and
`glasskit.min.css` differ from 1.7.1 only in the version comment.

---

## [1.7.1] – 2026-08-16

### Fixed

- **`color-scheme` is now declared, so browser-drawn controls follow the theme.**
  `data-theme` told GlassKit which palette to use but never told the *browser*. Parts of
  a form are painted by the browser itself and follow no CSS of the design system: the
  calendar glyph in `<input type="date">` and `datetime-local`, the clock in `type="time"`,
  the spinners in `type="number"`, the `<select>` popup, scrollbars, and the autofill
  background. All of them rendered in the light default, so in dark mode the calendar
  icon sat near-black on dark glass.

  ```css
  :root, [data-theme="dark"] { color-scheme: dark; }
  [data-theme="light"]       { color-scheme: light; }
  ```

  Measured on the date field in dark mode: the glyph goes from dark-on-dark to white.
  No GlassKit token or rule changed value.

  This also reaches **GlassKit Elements**: the selector `[data-theme="dark"]` matches the
  `.glk-wrapper` inside every component's shadow root, so `<glk-input type="date">` picks
  the dark scheme up without any change on that side.

  `.glass-checkbox`, `.glass-radio` and `.glass-toggle` are unaffected — they hide the
  native input and draw their own control.

### Note for pages without `.glass-bg`

`color-scheme` also governs the browser's default canvas. A page that loads
`glasskit.css` but does **not** wrap its content in `.glass-bg` changes from a white
canvas with black default text to `#121212` with white text. Such a page was already
inconsistent — the dark theme's `--gl-color-text` is `#ffffff`, so its own text was white
on white — but the change is visible, so it is recorded here. To keep the old canvas:

```css
:root { color-scheme: normal; }
```

---

## [1.7.0] – 2026-08-16

Accessibility release for **tinted state surfaces**. Badges now meet **WCAG 2.1 AA
(4.5:1)** in both themes, out of the box, and re-branding a state color finally moves
the whole component instead of only its text.

**Filled** surfaces – the primary button, the checkbox tick, the filled accessory
capsules – deliberately keep their white ink and therefore keep their old contrast.
That is a conscious decision, not an oversight; see "Knowingly left as is".

This **changes visible colors on badges** – see "Restoring the previous look" for a
one-block revert.

No class was renamed or removed, no DOM structure changed, and no existing token
changed its meaning. Everything new is additive and falls back to the old value via
`var(--new, <old>)`.

### Added

- **Role tokens for ink on filled and tinted surfaces.** `--gl-color-primary` used to
  serve two conflicting jobs – the *fill* of the primary button and the *text* of the
  primary chip. These are now separate roles. The `-on-surface` tokens are derived from
  the state color with `color-mix()`, so re-branding a state token carries through to
  its text automatically.

  | Token | Dark | Light | Used by |
  |---|---|---|---|
  | `--gl-color-on-primary` | `#ffffff` | `#ffffff` | `.glass-btn--primary` text/icons, checkbox tick, accent accessory |
  | `--gl-color-on-success` | `#ffffff` | `#ffffff` | filled success accessory |
  | `--gl-color-on-error` | `#ffffff` | `#ffffff` | filled error accessory |
  | `--gl-color-primary-on-surface` | `… primary 50%, #fff` | `… 60%, #000` | `.glass-badge--primary` text |
  | `--gl-color-success-on-surface` | `… success 62%, #fff` | `… 68%, #000` | `.glass-badge--success` text |
  | `--gl-color-error-on-surface` | `… error 50%, #fff` | `… 82%, #000` | `.glass-badge--error` text |

  The three `on-*` tokens keep the previous hardcoded `white` as their value – nothing
  changes visually. They exist so that a project *can* switch to a dark ink without
  patching `glasskit.css`; see "Opting into an accessible primary button".

- **Tokens for state surfaces and borders.** Badge fills and borders used to be
  hardcoded `rgba()` literals, so re-coloring `--gl-color-success` changed only the
  text and left the fill green. They are now derived from the state token and resolve
  to exactly the previous values:

  | Token | Value | Previously hardcoded as |
  |---|---|---|
  | `--gl-color-primary-surface` | `color-mix(… primary 25%, transparent)` | `rgba(245,166,35,0.25)` |
  | `--gl-color-primary-border` | `var(--gl-border-warm)` | `var(--gl-border-warm)` |
  | `--gl-color-success-surface` | `color-mix(… success 15%, transparent)` | `rgba(52,199,89,0.15)` |
  | `--gl-color-success-border` | `color-mix(… success 30%, transparent)` | `rgba(52,199,89,0.30)` |
  | `--gl-color-error-surface` | `color-mix(… error 15%, transparent)` | `rgba(255,59,48,0.15)` |
  | `--gl-color-error-border` | `color-mix(… error 30%, transparent)` | `rgba(255,59,48,0.30)` |

- **`--gl-state-scrim`** – `rgba(0,0,0,0.30)` dark, `rgba(255,255,255,0.30)` light. Sits
  *behind* the colored tint of a badge. A translucent chip over an unknown backdrop has
  no guaranteed contrast; the scrim makes the surface predictable so the label stays
  readable wherever the chip lands.

  The value is a deliberate compromise. Scrim and ink are the only two ways to reach
  4.5:1, and they trade against each other – more scrim buys a more saturated label but
  costs transparency, less scrim keeps the glass but washes the label out. Every row
  below reaches AA:

  | Scrim | Chip opacity | Label keeps of its state color |
  |---|---|---|
  | `0` (1.6.x) | 15 % / 25 % | 8–25 % – green and red become indistinguishable pastels |
  | `0.20` | 32 % / 40 % | 38–49 % |
  | **`0.30`** | **41 % / 48 %** | **52–65 %** |
  | `0.45` | 53 % / 59 % | 66–90 % – barely translucent any more |

  `0.30` keeps the chip clearly see-through while the three states stay tellable apart
  by color. Set it to `transparent` for the fully-translucent 1.6.x chip.

- **`--gl-color-success-dark`** (`#2da44e` / `#1e7e34`) and **`--gl-color-error-dark`**
  (`#d63027` / `#b02a37`) – the gradient end stops of `.glass-progress--success` /
  `--error`, previously hardcoded hex literals. Same values as before.

### Changed

Visible color changes, with the previous value in each case:

- **Badge variants** got the scrim behind the tint and lightened (dark) / darkened
  (light) text. Was, for example, `background: rgba(52,199,89,0.15); border-color:
  rgba(52,199,89,0.30); color: var(--gl-color-success)`.
- **`.glass-tab-bar__badge`** fill changed from `var(--gl-color-error)` to
  `var(--gl-color-error-dark)`. Its 10px white text stays white and now passes. Was
  `background: var(--gl-color-error); color: white` at **3,55:1** in dark mode.
- **`--gl-icon-on-primary`** now defaults to `var(--gl-color-on-primary, #ffffff)`
  instead of a literal `#ffffff`, so it follows when a project switches the primary ink.
  Same value, and setting it explicitly still wins.
- **Light-mode primary chip** now tints with the light primary `#e8852d`; it previously
  used the dark-theme `#f5a623` in both themes.

Measured worst case across the page gradient × aurora position × card surface, WCAG 2.1
formula on the alpha-composited stack:

| | dark before | dark after | light before | light after |
|---|---|---|---|---|
| `.glass-badge--success` | 2,38 | **4,64** | 2,49 | **4,78** |
| `.glass-badge--error` | 1,79 | **4,64** | 3,31 | **4,65** |
| `.glass-badge--primary` | 2,36 | **4,61** | 2,04 | **4,75** |
| `.glass-tab-bar__badge` | 3,55 | **4,87** | 4,53 | **6,50** |
| `.glass-btn--primary` | 2,03 | 2,03 *(unverändert)* | 2,68 | 2,68 *(unverändert)* |

### Fixed

- **Re-branding a state color now moves fill, border, text and glow together.** Setting
  `--gl-color-success` to a brand teal previously produced teal text on a green pill –
  worse contrast than the default, and not fixable through tokens. The remaining
  rule-level literals were replaced by `color-mix()` on the owning token, at identical
  resolved values: the progress-bar glows, the tab-bar spotlight and its drop shadow,
  and the `.glass-input--error` focus ring.

### Compatibility

- `color-mix(in srgb, …)` is now used more widely. GlassKit already required it since
  1.6.0 (`.glass-tab-bar__accessory--*`), so the browser baseline is unchanged.
- **`.glass-toast--*` was already fully tokenized** and is untouched – those variants
  only set `stroke` on the icon from `--gl-color-success` / `--error` / `--warning`.
  The toast body uses `--gl-surface-*` and `--gl-color-text` like every other panel.

### Knowingly left as is

White ink on a filled brand surface is part of GlassKit's look and stays the default,
even though it does not reach AA on the light orange. The numbers are recorded here so
the decision is visible rather than accidental:

| Element | Contrast | Requirement |
|---|---|---|
| `.glass-btn--primary` text (lightest gradient stop) | 2,03:1 dark · 2,68:1 light | 4,5:1 (1.4.3) |
| `.glass-checkbox__box` tick | 2,03:1 dark · 2,68:1 light | 3:1 (1.4.11) |
| `.glass-tab-bar__accessory--accent` icon | 2,03:1 dark · 2,68:1 light | 3:1 (1.4.11) |
| `.glass-tab-bar__accessory--success` icon | 2,22:1 dark · 3,13:1 light | 3:1 (1.4.11) |

Darkening `--gl-color-primary` until white passes would require roughly `#b06312` – a
rust brown that is no longer the brand color – so the fill was left alone. Each of these
is now switchable through a token instead of requiring a patch to `glasskit.css`.

The `.glass-toggle` knob likewise stays white on the checked track: it is a
physical-metaphor handle with its own dark drop shadow, and the state is also carried by
its position.

### Opting into an accessible primary button

Projects that need AA on filled surfaces – public sector, tenders, VPAT – can switch the
ink without touching the brand color. This reaches **4,62:1** dark / **4,67:1** light:

```css
:root, [data-theme="dark"], [data-theme="light"] {
  --gl-color-on-primary: color-mix(in srgb, var(--gl-color-primary) 17%, #000);
  --gl-color-on-success: color-mix(in srgb, var(--gl-color-success) 17%, #000);
  --gl-color-on-error:   color-mix(in srgb, var(--gl-color-error)   22%, #000);
}
```

### Restoring the previous look

Badges are the only visible change. A project that prefers the 1.6.x chips puts this in
its brand file – no other change is needed:

```css
:root, [data-theme="dark"], [data-theme="light"] {
  --gl-state-scrim: transparent;
  --gl-color-primary-on-surface: var(--gl-color-primary);
  --gl-color-success-on-surface: var(--gl-color-success);
  --gl-color-error-on-surface: var(--gl-color-error);
  --gl-color-error-dark: var(--gl-color-error);   /* tab-bar badge fill */
}
```

### Build

- **`prepublishOnly`** now runs `npm run build`, so a manual `npm publish` cannot ship
  stale artifacts. `glasskit.min.css` and `glasskit-styles.js` are `.gitignore`d and
  have always been generated by the release workflow – published packages were never
  affected.
- **New `verify-build.yml` workflow** builds on every push/PR to `main` and checks that
  both artifacts are produced and carry the `package.json` version. A CSS syntax error
  used to surface only at tag time.
- **npm publishing switched to Trusted Publishing (OIDC).** `release.yml` now requests
  `id-token: write` and publishes without `NODE_AUTH_TOKEN`; provenance is generated
  automatically. The workflow filename must stay `release.yml` to match the trusted
  publisher registered on npm.

---

## [1.6.5] – 2026-07-19

### Added

- **GlassKit family cross-linking** – GlassKit Web (https://glasskit-web.jungherz.com), the official Astro website template, joins GlassKit and GlassKit Elements as the third member of the family. Modeled on the family section of glasskit-web.jungherz.com:
  - **Landing page (EN + DE)** – new "The GlassKit family" section ("Three layers, one design language") with three cards – GlassKit marked as "you are here", GlassKit Elements (app layer), and GlassKit Web (website layer) – plus footer links to both sister products
  - **docs.html (EN + DE)** – new "The GlassKit Family" section with sidebar link; points to GlassKit Web as the intended path for building complete websites and to GlassKit Elements for app UIs

### Changed

- **README** – sister links in the header, a layering sentence in the intro, and the companion section expanded to "The GlassKit Family" now covering GlassKit Web

_No changes to `glasskit.css` – this is a documentation/website-only release._

---

## [1.6.4] – 2026-07-10

### Fixed

- **Silent native form validation on `required` controls** – the visually hidden inputs of Checkbox, Radio, and Toggle were sized `0×0`, which made Chrome suppress the native validation bubble: submitting a form with an unchecked `required` control was blocked without any feedback. The inputs now keep their control's area (24×24, toggle 52×30) while staying invisible (`opacity: 0`, plus `pointer-events: none` and `margin: 0`), so the bubble appears anchored to the visible control. Interaction, keyboard focus, and visuals are unchanged.

---

## [1.6.3] – 2026-07-08

### Fixed

- **`.glass-btn` on `<a>` elements** – anchors now render as `inline-flex` with `text-decoration: none`. Previously, an anchor styled as a button filled the full line even with `--auto` (block-level flex has no shrink-to-fit) and kept the link underline. The full-width default (`width: 100%`) is unchanged.

---

## [1.6.2] – 2026-07-08

### Fixed

- **Default icon styling for `.glass-btn`** – the base rule now sets outline defaults (`fill: none; stroke: currentColor; stroke-width: 2`, round caps/joins). Previously, SVGs in a `.glass-btn` **without** a variant modifier rendered with the browser default (black fill, no stroke). The variant rules (`--primary` filled, `--secondary`/`--tertiary` outline via icon tokens) are unchanged and still take precedence — existing buttons look exactly the same.
- Version labels on all pages (EN + DE), the README badge, and the `glasskit.css` header were stuck at v1.6.0

### Added

- **`.glass-icon--fill`** – escape hatch on the `<svg>` for deliberately filled icons (e.g. brand logos) inside components with outline icon defaults

### Changed

- SKILL.md CDN embeds now use `@latest` instead of a pinned version, so generated markup always loads the newest release
- README CDN examples updated from `@1.5` to `@1.6`

---

## [1.6.1] – 2026-05-03

### Added

- **`robots.txt`** – allows all crawlers and points to the sitemap
- **`sitemap.xml`** – lists all 6 URLs (EN + DE) with `lastmod`, `priority`, and per-entry `xhtml:link` `hreflang` annotations for proper bilingual indexing

---

## [1.6.0] – 2026-04-27

### Added

- **Tab-Bar – Floating variant** – iOS 26 Liquid Glass-style pill bar that sits next to an optional standalone accessory capsule (e.g. search, compose). Additive — does not change the existing `.glass-tab-bar` API.
  - **`.glass-tab-bar-dock`** – fixed bottom-center wrapper that holds the bar and the accessory side-by-side
  - **`.glass-tab-bar-dock--accessory-left`** – modifier to flip the accessory to the left side
  - **`.glass-tab-bar--floating`** – modifier on `.glass-tab-bar`; switches to a centered, pill-shaped, max-content layout
  - **`.glass-tab-bar__accessory`** – standalone glass capsule (default 56×56) with its own backdrop-blur and shadow
  - **`.glass-tab-bar__accessory--accent` / `--success` / `--error`** – filled colored variants (white icon) using `color-mix()` for tinted shadows
  - **Spotlight active state** – the active item in the floating variant shows a soft radial halo (using `--gl-tab-bar-spotlight-color`) instead of the underline dot
  - **`.glass-bg--has-tab-bar-floating`** – background padding helper for the floating variant
- New design tokens: `--gl-tab-bar-floating-bottom`, `--gl-tab-bar-floating-gap`, `--gl-tab-bar-floating-padding`, `--gl-tab-bar-floating-radius`, `--gl-tab-bar-accessory-size`, `--gl-tab-bar-spotlight-color`

### Changed

- Showcase and docs (EN + DE) now include live demos and a dedicated `#tab-bar-floating` section with class reference and accent-variant preview

---

## [1.5.0] – 2026-04-12

### Added

- **Six new List sub-classes** extending the `.glass-list` component for iOS 26 grouped-section patterns:
  - **`.glass-list__section-header`** – uppercase section label placed above a `.glass-list`, matching iOS grouped-list section headers (e.g. "Recommendations", "Audiobooks")
  - **`.glass-list__leading--lg`** – large 40×40 leading slot with rounded-square corners and `<img>` support for app icons
  - **`.glass-list__subtitle--wrap`** – multi-line subtitle (up to 3 lines with `-webkit-line-clamp`)
  - **`.glass-list__value`** – muted trailing text for values like file sizes alongside a chevron
  - **`.glass-list__item--danger`** – red text for destructive actions (title + leading icon inherit color)
  - **`.glass-list__item--accent`** – primary-colored text for accent actions like "View all"
- Auto-divider inset adjusts automatically for `--lg` leading via `:has()` selector

### Fixed

- **Range Slider thumb off-center on Chrome / Safari** – added explicit `box-sizing: border-box` to `::-webkit-slider-thumb` (normalizes Chrome vs Safari UA defaults) and corrected `margin-top` to `-2px`. Firefox was never affected (`::-moz-range-thumb` auto-centers).

### Changed

- SKILL.md iOS Settings Screen composition now uses `.glass-list__section-header` instead of manual utility-class labels
- Docs and showcase updated with live demos for all new list variants

---

## [1.4.0] – 2026-04-11

### Added

- **Two new components – `List` and `Popover`** – inspired by iOS 26 settings screens
  - **`.glass-list`** – grouped settings-style container, visually based on `.glass-status` (`--gl-surface-1`, `--gl-blur-light`, `--gl-radius-btn`, subtle shadow)
  - **`.glass-list__item`** – flexible row layout that scales from a single centered text (with ellipsis truncation) to a full settings row with leading icon, title + subtitle, and trailing element
  - **List sub-elements**: `__leading` (28×28 icon slot), `__content` (flexible middle), `__title`, `__subtitle`, `__trailing` (chevron / value / button / badge)
  - **List modifiers**: `--flush` (edge-to-edge variant), `--bare` (strips own glass surface for embedding inside `glass-popover` / `glass-card`), `__item--interactive` (hover / focus / active states), `__item--center` (centered single-text fallback)
  - **Auto-rendered dividers** between list items via `::after` &mdash; no extra HTML markup required, last item automatically has no divider, and items without a leading icon get a standard horizontal padding inset (handled via `:has(.glass-list__leading)`)
  - **`.glass-popover`** – anchored dropdown / menu container with fade + scale animation on `.is-open`
  - **`.glass-popover-anchor`** – positioning context that wraps trigger + popover
  - **Popover placement modifiers**: `--top` (opens upward), `--start` (left-aligned), `--end` (right-aligned); default placement is centered below the trigger
- **Modal preview section** in `docs.html` and `de/docs.html` – previously the Modal section only had a class reference table; now it includes a live inline preview, full HTML code snippet with JS toggle functions, and an explicit note about putting `.is-active` on the overlay (not on `.glass-modal`)
- **SKILL.md (AI reference) extensions**:
  - New section **3.24 List** with copy-paste examples for both settings-style and compact-menu variants, full sub-element table, and SVG icon convention notes
  - New section **3.25 Popover** with HTML + toggle JS, placement modifier reference, and explicit warning about the native API name collision
  - New composition pattern **"iOS-style Settings Screen (List + Popover)"** – full example reproducing iOS settings layout with two grouped lists and an inline action menu
  - State Classes Overview extended (`.is-open` now also for `.glass-popover`)
  - Common Mistakes table extended with 4 new entries (manual divider markup, missing `--bare`, `togglePopover` naming clash, `.is-open` on the wrong element)
  - "Always follow" rules extended with list-divider and popover-naming guidance
  - Quick Class Reference table extended with List and Popover rows
- **File size details** in `index.html` and `de/index.html` – the project file list now shows raw + gzipped sizes for `glasskit.css`, plus a dedicated row for `glasskit.min.css` (production build) with its own raw + gzipped sizes
- **README.md "Lightweight" bullet** – now reports precise sizes (49 KB raw / 37 KB minified / 6.2 KB gzipped) instead of an approximate single number

### Changed

- **`bg-switcher` migration** in `showcase.html` and `de/showcase.html` – the ad-hoc popover originally embedded as inline CSS in the showcase has been removed and replaced with the new `.glass-popover` framework component, proving the new API works for the existing use case
- **Component count** updated from **22 → 24** across all user-facing files: `index.html`, `docs.html`, `de/index.html`, `de/docs.html`, `package.json`, `README.md`, `SKILL.md`, and the `glasskit.css` header
- **Sidebar navigation** in `docs.html` and `de/docs.html` extended with the new "List" link (under Content) and "Popover" link (under Actions)
- **CDN version pinning** in `README.md` and `SKILL.md` updated from `@1.3` to `@1.4` for jsDelivr (minified + unminified) and unpkg
- **English consistency in `glasskit.css`** – the remaining German comments in the source file have been translated to English (`Farben`, `Glas-Oberflächen`, `Icon-Farben`, `Hintergrund-Effekte`, `Toggle (inaktiv)`, `Größen`, `22 Komponenten`, plus the multi-line comments in the new List section)
- **Showcase title** in `showcase.html` and `de/showcase.html` bumped to `v1.4.0`
- **Version stamps** updated to `1.4.0` in `package.json`, README badges, `glasskit.css` header, sidebar versions, and hero badges (English + German)

### Fixed

- **List divider inset for icon-less items** – when a `.glass-list__item` has no leading icon, the auto-divider now uses the standard horizontal padding (`var(--gl-space-lg)` left + right) instead of blindly inheriting the icon-aligned 60px inset. Detected via `:has(.glass-list__leading)`.
- **List divider right-edge alignment** – the divider used to extend all the way to the right edge of the item (`right: 0`), past where the trailing element ends. It now stops at `var(--gl-space-lg)` so it lines up flush with the trailing slot.
- **`togglePopover` naming clash** – discovered during showcase migration: a custom JS function named `togglePopover` collides with the native `HTMLElement.togglePopover()` method (HTML Popover API) and inline `onclick` handlers throw `NotSupportedError`. The showcase / docs JS toggles were renamed to `gkTogglePopover` / `docsTogglePopover`, and the gotcha is documented in `SKILL.md`, the docs Popover section, and this changelog.

### Notes

- **No breaking changes.** All additions are additive; existing markup continues to work unchanged.
- **`glass-divider` is unchanged.** The new list dividers are scoped to `.glass-list__item::after` and do not affect or replace the global `.glass-divider` element (which keeps its gradient-fade visual style).
- **`:has()` selector requirement** – the icon-aware divider rule uses CSS `:has()`, which is supported in all modern evergreen browsers (Chrome 105+, Safari 15.4+, Firefox 121+, ~95% global as of 2026). Lists with mixed-icon items will fall back gracefully (icon-less items get the icon-aligned inset, which is visually fine, just slightly more right-shifted than ideal).

---

## [1.3.5] – 2026-04-04

### Added

- **`SKILL.md` – AI-optimized component reference** – a structured, machine-readable reference document designed for LLMs, AI copilots, and code-generation tools
  - Copy-paste-ready HTML for all 22 components with exact nesting and BEM hierarchy
  - Complete design token tables (colors, surfaces, borders, blur, radii, spacing, shadows, typography)
  - State class reference – clear mapping of `is-active`, `is-open`, `is-visible`, `:checked`, `:focus`, `:disabled` to their components
  - 6 composition patterns – full page layouts: Login, Dashboard, Form, Modal confirmation, Settings, Progress + Toast
  - Common mistakes & corrections table – prevents frequent AI-generated errors
  - Quick reference table – all components with modifiers at a glance
  - Utility class reference with exact gap/margin values
  - Web Components / Shadow DOM usage guide
  - Custom theming instructions
- **Visual preview for Tab-Bar** in `docs.html` and `de/docs.html` – live rendered tab bar with 4 tabs (Home, Documents with badge, Upload, Settings)
- **Visual preview for Toast** in `docs.html` and `de/docs.html` – static success toast rendered inline
- **HTML code example for Status Notice** in `docs.html` and `de/docs.html` – was previously preview-only without code snippet

### Changed

- **README.md** – new “AI / LLM Reference” section documenting `SKILL.md` purpose and usage, “AI-ready” added to “Why GlassKit?”
- **Project structure** in README updated to include `SKILL.md`
- **docs.html & de/docs.html** – new “AI Reference” / “KI-Referenz” section with sidebar link
- **index.html & de/index.html** – SKILL.md added to project file list
- Version references updated to 1.3.5 across all files

---

## [1.3.3] – 2026-03-21

### Added

- **Language switcher** in `index.html` and `docs.html` (and their German counterparts in `de/`) – toggle between English and German versions via a pill button in the header/toolbar
- **German translations** (`de/` directory) – full German versions of `index.html`, `docs.html`, and `showcase.html` with correct relative asset paths

### Changed

- **Full English translation** of `README.md`, `CHANGELOG.md`, `index.html`, `docs.html`, and `showcase.html` – all user-facing text, labels, placeholders, code comments, and demo content
- README screenshot now links to [glasskit.jungherz.com](https://glasskit.jungherz.com)
- Version references updated to 1.3.3 across all files

---

## [1.3.2] – 2026-03-21

### Added

- **Background Switcher** in `showcase.html` – interactive background picker with 6 color presets (Default, Ocean, Sunset, Forest, Rose, Monochrome) to test glassmorphism effects on different backgrounds
  - Each preset has its own color values for Dark and Light Mode
  - Pure CSS gradients, no external images
  - Popover UI with animated color swatches, consistent with GlassKit styling
  - Overrides only Custom Properties via `data-bg` attribute – no changes to `glasskit.css`

### Changed

- Footer in `index.html` updated: "Built by Jungherz with 🧊 and lots of ❤️ for detail."
- Version references updated to 1.3.2 across all files (`package.json`, `glasskit.css`, `README.md`, `index.html`, `showcase.html`)

---

## [1.3.1] – 2026-03-21

### Fixed

- Intro screenshot: PNG replaced with optimized JPEG (1.3 MB → 287 KB)
- README image: absolute GitHub URL for correct display on npmjs.com
- Release pipeline: tag push now automatically triggers Release + Build + npm Publish (no manual release needed)

---

## [1.3.0] – 2026-03-21

### 🎉 Initial Public Release

GlassKit originated from a real client project (MeineFinanzCloud /
Jungherz GmbH) and evolved into a complete, reusable component library
during development. Version 1.3 is the first public open-source release.

---

### Added

#### Core Library (`glasskit.css`)
- **Design Tokens** – complete system of CSS Custom Properties
  (`--gl-color-*`, `--gl-surface-*`, `--gl-border-*`, `--gl-blur-*`,
  `--gl-radius-*`, `--gl-shadow-*`, `--gl-space-*`, `--gl-font-*`)
- **Scoped Reset** – `box-sizing: border-box` for all `[class*="glass-"]`
  elements, prevents layout conflicts with existing projects
- **Dark Mode** (default) via `:root` / `[data-theme="dark"]`
- **Light Mode** via `[data-theme="light"]` – fully separate token values

#### Components (22 total)

| # | Component | Class |
|---|---|---|
| 1 | Background | `.glass-bg` |
| 2 | Navigation Bar | `.glass-nav` |
| 3 | Pill Button | `.glass-pill` |
| 4 | Tab Bar | `.glass-tab-bar` |
| 5 | Page Title | `.glass-title` |
| 6 | Card | `.glass-card` |
| 7 | Button | `.glass-btn` |
| 8 | Badge | `.glass-badge` |
| 9 | Avatar | `.glass-avatar` |
| 10 | Divider | `.glass-divider` |
| 11 | Status Notice | `.glass-status` |
| 12 | Input | `.glass-input` |
| 13 | Textarea | `.glass-textarea` |
| 14 | Select | `.glass-select` |
| 15 | Search | `.glass-search` |
| 16 | Toggle Switch | `.glass-toggle` |
| 17 | Checkbox | `.glass-checkbox` |
| 18 | Radio Button | `.glass-radio` |
| 19 | Range Slider | `.glass-range` |
| 20 | Progress Bar | `.glass-progress` |
| 21 | Modal | `.glass-modal` |
| 22 | Toast | `.glass-toast` |

#### Modifiers & States
- Button variants: `--primary`, `--secondary`, `--tertiary`, `--sm`, `--lg`, `--auto`
- Card variant: `--glow` (light-to-milky gradient with light streak)
- Progress variants: `--sm`, `--lg`, `--success`, `--error`
- Badge variants: `--primary`, `--success`, `--error`
- Avatar sizes: `--sm`, `--lg`
- Toast variants: `--success`, `--error`, `--warning`
- Modal actions: `--primary`, `--danger`
- Interactive states: `.is-active`, `.is-open`, `.is-visible`

#### Utility Classes
- Layout: `.gl-stack`, `.gl-row` (each with gap variants `--xs` to `--xl`)
- Spacing: `.gl-mt-*`, `.gl-mb-*`, `.gl-px`
- Text: `.gl-text-center`, `.gl-text-muted`, `.gl-text-sm`
- Other: `.gl-w-full`, `.gl-flex-1`

#### Files
- `glasskit.css` – Core library
- `glasskit.min.css` – Minified version (auto-generated on release)
- `glasskit-styles.js` – Constructable Stylesheet for Shadow DOM (auto-generated)
- `theme-override.css` – Template for custom themes (4 example themes:
  Ocean Blue, Emerald Green, Rose, Custom)
- `build-styles-js.mjs` – Build script for glasskit-styles.js
- `package.json` – npm package definition
- `index.html` – Landing page with iPhone wireframe & embedded showcase
- `showcase.html` – Interactive showcase of all 22 components
- `docs.html` – Full documentation with live previews,
  code blocks, and class tables
- `README.md` – Project documentation
- `CHANGELOG.md` – This file
- `LICENSE` – MIT License

#### Build & Distribution
- **GitHub Actions Release Pipeline** – automatic minification,
  Constructable Stylesheet generation, and npm publishing on
  every GitHub Release
- **npm package** `@jungherz-de/glasskit` – installable via npm, yarn, pnpm
- **CDN availability** – immediately available via jsDelivr and unpkg
- **Shadow DOM support** – `glasskit-styles.js` exports a ready-made
  Constructable Stylesheet for Web Components (Vanilla, Hybrids, Lit, etc.)

---

### Fixed

- `box-sizing: border-box` was missing on `.glass-input` and `.glass-textarea`,
  which caused fields to extend beyond the screen edge in certain projects
  → resolved globally via Scoped Reset
- Search icon (`.glass-search__icon`) was not visible in some browsers
  → added `!important` on `stroke`, `fill`, `stroke-width` and `z-index: 2`
- Button icons were missing in the showcase → SVGs re-added to all buttons,
  icon colors consistently controlled via `--gl-icon-*` tokens
- Modal and Toast were placed outside `.glass-bg` and therefore did not inherit
  `font-family` → `font-family: var(--gl-font-family)` set directly on
  `.glass-modal-overlay` and `.glass-toast`
- iPhone frame: iframe content was showing through rounded corners on scroll
  → fixed via `isolation: isolate`, `-webkit-mask-image`, and
  `transform: translateZ(0)` on `.phone-frame`

---

### Design Decisions

- **Glassmorphism inspired by iOS 26 Liquid Glass** – Apple fundamentally
  redefined glass design with iOS 26. GlassKit translates this look
  into pure CSS for web and apps.
- **No JavaScript dependencies** – All animations and transitions
  run purely via CSS Transitions. Only Modal, Toast, and Accordion require
  minimal `classList.toggle()` without any framework.
- **BEM-like naming convention** – `glass-*` prefix prevents conflicts
  with existing CSS in the target project.
- **Token-first** – Every visual value is a token. Theming requires
  no changes to the core library.

---

### Project

- Repository: [github.com/JUNGHERZ/GlassKit](https://github.com/JUNGHERZ/GlassKit)
- npm: [@jungherz-de/glasskit](https://www.npmjs.com/package/@jungherz-de/glasskit)
- CDN: [cdn.jsdelivr.net/npm/@jungherz-de/glasskit](https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit/)
- License: MIT
- Developed by: [Jungherz GmbH](https://www.jungherz.com)

---

## [Unreleased]

> Planned additions for future versions:

- [ ] Additional themes (Purple, Midnight, Sand)
- [ ] Animated backgrounds (Aurora Motion)
- [ ] Figma component set

---

[1.6.5]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.6.5
[1.6.4]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.6.4
[1.6.3]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.6.3
[1.6.2]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.6.2
[1.6.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.6.0
[1.5.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.5.0
[1.4.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.4.0
[1.3.5]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.5
[1.3.4]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.4
[1.3.3]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.3
[1.3.2]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.2
[1.3.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.1
[1.3.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.0
[Unreleased]: https://github.com/JUNGHERZ/GlassKit/compare/v1.6.5...HEAD
