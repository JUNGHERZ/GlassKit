# Changelog

All notable changes to **GlassKit** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
GlassKit uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.1] – 2026-03-21

### Fixed

- Intro-Screenshot: PNG durch optimiertes JPEG ersetzt (1.3 MB → 287 KB)
- README-Bild: absolute GitHub-URL für korrekte Anzeige auf npmjs.com
- Release-Pipeline: Tag-Push triggert jetzt automatisch Release + Build + npm Publish (kein manuelles Release mehr nötig)

---

## [1.3.0] – 2026-03-21

### 🎉 Initial Public Release

GlassKit entstand aus einem konkreten Kundenprojekt (MeineFinanzCloud /
Jungherz GmbH) und wurde im Laufe des Projekts zu einer vollständigen,
wiederverwendbaren Komponentenbibliothek ausgebaut. Version 1.3 ist die
erste öffentliche Veröffentlichung als Open-Source-Projekt.

---

### Added

#### Kern-Library (`glasskit.css`)
- **Design Tokens** – vollständiges System aus CSS Custom Properties
  (`--gl-color-*`, `--gl-surface-*`, `--gl-border-*`, `--gl-blur-*`,
  `--gl-radius-*`, `--gl-shadow-*`, `--gl-space-*`, `--gl-font-*`)
- **Scoped Reset** – `box-sizing: border-box` für alle `[class*="glass-"]`
  Elemente, verhindert Layout-Konflikte mit bestehenden Projekten
- **Dark Mode** (Standard) via `:root` / `[data-theme="dark"]`
- **Light Mode** via `[data-theme="light"]` – vollständig eigene Token-Werte

#### Komponenten (22 gesamt)

| # | Komponente | Klasse |
|---|---|---|
| 1 | Hintergrund | `.glass-bg` |
| 2 | Navigation Bar | `.glass-nav` |
| 3 | Pill-Button | `.glass-pill` |
| 4 | Tab-Bar | `.glass-tab-bar` |
| 5 | Seitentitel | `.glass-title` |
| 6 | Card | `.glass-card` |
| 7 | Button | `.glass-btn` |
| 8 | Badge | `.glass-badge` |
| 9 | Avatar | `.glass-avatar` |
| 10 | Divider | `.glass-divider` |
| 11 | Status-Hinweis | `.glass-status` |
| 12 | Input | `.glass-input` |
| 13 | Textarea | `.glass-textarea` |
| 14 | Select | `.glass-select` |
| 15 | Suchfeld | `.glass-search` |
| 16 | Toggle Switch | `.glass-toggle` |
| 17 | Checkbox | `.glass-checkbox` |
| 18 | Radio Button | `.glass-radio` |
| 19 | Range Slider | `.glass-range` |
| 20 | Progress Bar | `.glass-progress` |
| 21 | Modal | `.glass-modal` |
| 22 | Toast | `.glass-toast` |

#### Modifier & States
- Button-Varianten: `--primary`, `--secondary`, `--tertiary`, `--sm`, `--lg`, `--auto`
- Card-Variante: `--glow` (Hell→Milchig-Verlauf mit Lichtstreifen)
- Progress-Varianten: `--sm`, `--lg`, `--success`, `--error`
- Badge-Varianten: `--primary`, `--success`, `--error`
- Avatar-Größen: `--sm`, `--lg`
- Toast-Varianten: `--success`, `--error`, `--warning`
- Modal-Actions: `--primary`, `--danger`
- Interaktive States: `.is-active`, `.is-open`, `.is-visible`

#### Utility-Klassen
- Layout: `.gl-stack`, `.gl-row` (je mit Gap-Varianten `--xs` bis `--xl`)
- Spacing: `.gl-mt-*`, `.gl-mb-*`, `.gl-px`
- Text: `.gl-text-center`, `.gl-text-muted`, `.gl-text-sm`
- Sonstige: `.gl-w-full`, `.gl-flex-1`

#### Dateien
- `glasskit.css` – Kern-Library
- `glasskit.min.css` – Minifizierte Version (auto-generated bei Release)
- `glasskit-styles.js` – Constructable Stylesheet für Shadow DOM (auto-generated)
- `theme-override.css` – Template für eigene Themes (4 Beispiel-Themes:
  Ocean Blue, Emerald Green, Rose, Custom)
- `build-styles-js.mjs` – Build-Script für glasskit-styles.js
- `package.json` – npm-Paketdefinition
- `index.html` – Landingpage mit iPhone-Wireframe & eingebettetem Showcase
- `showcase.html` – Interaktiver Showcase aller 22 Komponenten
- `docs.html` – Vollständige Dokumentation mit Live-Previews,
  Code-Blocks und Klassen-Tabellen
- `README.md` – Projektdokumentation
- `CHANGELOG.md` – Diese Datei
- `LICENSE` – MIT License

#### Build & Distribution
- **GitHub Actions Release Pipeline** – automatische Minifizierung,
  Constructable Stylesheet Generierung und npm-Veröffentlichung bei
  jedem GitHub Release
- **npm-Paket** `@jungherz-de/glasskit` – installierbar via npm, yarn, pnpm
- **CDN-Verfügbarkeit** – sofort über jsDelivr und unpkg nutzbar
- **Shadow-DOM-Support** – `glasskit-styles.js` exportiert ein fertiges
  Constructable Stylesheet für Web Components (Vanilla, Hybrids, Lit etc.)

---

### Fixed

- `box-sizing: border-box` fehlte bei `.glass-input` und `.glass-textarea`,
  was bei bestimmten Projekten dazu führte, dass sich Felder über den
  Bildschirmrand hinaus ausdehnten → durch Scoped Reset global gelöst
- Suchfeld-Icon (`.glass-search__icon`) war in einigen Browsern nicht
  sichtbar → `!important` auf `stroke`, `fill`, `stroke-width` gesetzt
  sowie `z-index: 2` ergänzt
- Button-Icons fehlten im Showcase → SVGs zurück in alle Buttons eingefügt,
  Icon-Farben konsistent über `--gl-icon-*` Tokens gesteuert
- Modal und Toast lagen außerhalb von `.glass-bg` und erbten dadurch keine
  `font-family` → `font-family: var(--gl-font-family)` direkt auf
  `.glass-modal-overlay` und `.glass-toast` gesetzt
- iPhone-Frame: iFrame-Inhalt schien beim Scrollen an den abgerundeten Ecken
  durch → Fix via `isolation: isolate`, `-webkit-mask-image` und
  `transform: translateZ(0)` auf `.phone-frame`

---

### Design Decisions

- **Glassmorphism inspiriert von iOS 26 Liquid Glass** – Apple hat mit iOS 26
  das Glasdesign grundlegend neu definiert. GlassKit übersetzt diesen Look
  in reines CSS für Web und App.
- **Keine JavaScript-Abhängigkeiten** – Alle Animationen und Übergänge
  laufen rein über CSS Transitions. Nur Modal, Toast und Accordion benötigen
  minimales `classList.toggle()` ohne Framework.
- **BEM-artige Namenskonvention** – `glass-*` Prefix verhindert Konflikte
  mit bestehendem CSS im Zielprojekt.
- **Token-First** – Jeder visuelle Wert ist ein Token. Theming erfordert
  keine Änderungen an der Kern-Library.

---

### Project

- Repository: [github.com/JUNGHERZ/GlassKit](https://github.com/JUNGHERZ/GlassKit)
- npm: [@jungherz-de/glasskit](https://www.npmjs.com/package/@jungherz-de/glasskit)
- CDN: [cdn.jsdelivr.net/npm/@jungherz-de/glasskit](https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit/)
- Lizenz: MIT
- Entwickelt von: [Jungherz GmbH](https://www.jungherz.com)

---

## [Unreleased]

> Geplante Erweiterungen für kommende Versionen:

- [ ] Weitere Themes (Purple, Midnight, Sand)
- [ ] Animierte Hintergründe (Aurora-Motion)
- [ ] Figma-Komponentenset

---

[1.3.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.1
[1.3.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.3.0
[Unreleased]: https://github.com/JUNGHERZ/GlassKit/compare/v1.3.1...HEAD
