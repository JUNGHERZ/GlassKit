# Changelog

All notable changes to **GlassKit** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
GlassKit uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.4] – 2026-03-29

### Added

- **Visual preview for Tab-Bar** in `docs.html` and `de/docs.html` – live rendered tab bar with 4 tabs (Home, Documents with badge, Upload, Settings)
- **Visual preview for Toast** in `docs.html` and `de/docs.html` – static success toast rendered inline
- **HTML code example for Status Notice** in `docs.html` and `de/docs.html` – was previously preview-only without code snippet

### Changed

- Version references updated to 1.3.4 across all files

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

[1.3.4]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.4
[1.3.3]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.3
[1.3.2]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.2
[1.3.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.1
[1.3.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.0
[Unreleased]: https://github.com/JUNGHERZ/GlassKit/compare/v1.3.4...HEAD
