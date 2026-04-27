# Changelog

All notable changes to **GlassKit** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
GlassKit uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.6.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.6.0
[1.5.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.5.0
[1.4.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.4.0
[1.3.5]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.5
[1.3.4]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.4
[1.3.3]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.3
[1.3.2]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.2
[1.3.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.1
[1.3.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.0
[Unreleased]: https://github.com/JUNGHERZ/GlassKit/compare/v1.6.0...HEAD
