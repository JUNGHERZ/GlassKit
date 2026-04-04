---
name: glasskit-css
description: GlassKit is a pure CSS glassmorphism component library (v1.3.5) with 22 components, Dark & Light mode, design tokens, and BEM-like naming. Use this reference whenever generating HTML that uses GlassKit classes to ensure correct structure, nesting, modifiers, and token usage.
---

# GlassKit CSS – AI Component Reference

> **Purpose:** This document is an AI-optimized reference for generating correct GlassKit HTML markup.
> It replaces the need to parse `docs.html` and provides copy-paste-ready structures, rules, and composition patterns.

---

## 1. Setup & Grundgerüst

### Einbindung

```html
<!-- CDN (empfohlen) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit@1.3/glasskit.min.css">

<!-- Lokal -->
<link rel="stylesheet" href="glasskit.css">

<!-- Optional: Custom Theme danach laden -->
<link rel="stylesheet" href="theme-override.css">
```

### Minimal-Template

```html
<!DOCTYPE html>
<html lang="de" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jungherz-de/glasskit@1.3/glasskit.min.css">
</head>
<body>
  <div class="glass-bg">
    <!-- Alle Inhalte hier -->
  </div>
</body>
</html>
```

### Namenskonvention

- **Prefix:** Alle Komponenten nutzen `glass-` (z.B. `glass-card`, `glass-btn`)
- **Utilities:** Nutzen `gl-` (z.B. `gl-stack`, `gl-row`, `gl-mt-md`)
- **BEM-Logik:** `glass-component__element--modifier`
  - Element: `glass-card__text`, `glass-modal__header`
  - Modifier: `glass-btn--primary`, `glass-avatar--lg`
- **State-Klassen:** `is-active`, `is-open`, `is-visible` (nicht BEM, sondern eigenständig)

### Theming

Das Theme wird über `data-theme` auf `<html>` gesteuert:

```html
<!-- Dark Mode (Standard) -->
<html data-theme="dark">

<!-- Light Mode -->
<html data-theme="light">
```

Theme-Wechsel per JavaScript:

```js
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```

---

## 2. Design Tokens

Alle visuellen Werte werden über CSS Custom Properties gesteuert. Für Custom-Theming können diese in einer `theme-override.css` überschrieben werden.

### Farben

| Token | Dark | Light | Verwendung |
|---|---|---|---|
| `--gl-color-primary` | `#f5a623` | `#e8852d` | Primärfarbe, Buttons, aktive Elemente |
| `--gl-color-primary-dark` | `#d4692a` | `#c96a1e` | Gradient-Endwert |
| `--gl-color-primary-mid` | `#e07a24` | `#d97826` | Gradient-Mitte |
| `--gl-color-text` | `#ffffff` | `#1a2a36` | Standard-Textfarbe |
| `--gl-color-text-muted` | `rgba(255,255,255,0.60)` | `rgba(26,42,54,0.55)` | Sekundärer Text |
| `--gl-color-text-heading` | `#ffffff` | `#0f1f2a` | Überschriften |
| `--gl-color-success` | `#34c759` | `#28a745` | Erfolg |
| `--gl-color-error` | `#ff3b30` | `#dc3545` | Fehler |
| `--gl-color-warning` | `#ffcc00` | `#e6a800` | Warnung |

### Glas-Oberflächen

| Token | Dark | Verwendung |
|---|---|---|
| `--gl-surface-1` | `rgba(255,255,255, 0.08)` | Subtilste Oberfläche (Status) |
| `--gl-surface-2` | `rgba(255,255,255, 0.10)` | Standard (Inputs, Cards) |
| `--gl-surface-3` | `rgba(255,255,255, 0.14)` | Nav Pills, Badges |
| `--gl-surface-4` | `rgba(255,255,255, 0.16)` | Hover States |
| `--gl-surface-5` | `rgba(255,255,255, 0.22)` | Starker Hover |
| `--gl-surface-milk` | `rgba(255,255,255, 0.55)` | Milchig |
| `--gl-surface-milk-strong` | `rgba(255,255,255, 0.75)` | Secondary Button |
| `--gl-surface-overlay` | `rgba(0,0,0, 0.50)` | Modal Overlay |

### Borders

| Token | Wert |
|---|---|
| `--gl-border-subtle` | `rgba(255,255,255, 0.18)` |
| `--gl-border-medium` | `rgba(255,255,255, 0.30)` |
| `--gl-border-strong` | `rgba(255,255,255, 0.40)` |
| `--gl-border-milk` | `rgba(255,255,255, 0.60)` |
| `--gl-border-warm` | `rgba(255,200,100, 0.35)` |
| `--gl-border-focus` | `rgba(245,166,35, 0.60)` |

### Blur

| Token | Wert |
|---|---|
| `--gl-blur` | `24px` (Standard) |
| `--gl-blur-light` | `16px` |
| `--gl-blur-soft` | `12px` |
| `--gl-blur-heavy` | `40px` |

### Radii

| Token | Wert | Verwendung |
|---|---|---|
| `--gl-radius-xs` | `8px` | Kleine Elemente |
| `--gl-radius-sm` | `12px` | Badges, kleine Container |
| `--gl-radius-input` | `14px` | Inputs, Textareas |
| `--gl-radius-btn` | `16px` | Buttons |
| `--gl-radius-card` | `24px` | Cards |
| `--gl-radius-full` | `9999px` | Komplett rund |
| `--gl-radius-pill` | `50%` | Kreisform |

### Spacing

| Token | Wert |
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

### Shadows

| Token | Verwendung |
|---|---|
| `--gl-shadow-card` | Cards |
| `--gl-shadow-btn` | Standard-Buttons |
| `--gl-shadow-btn-primary` | Primary Button (orange glow) |
| `--gl-shadow-glow` | Glow-Effekt |
| `--gl-shadow-modal` | Modal-Dialog |
| `--gl-shadow-toast` | Toast-Benachrichtigungen |
| `--gl-shadow-focus` | Focus-Ring |

### Typography

| Token | Wert |
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

## 3. Komponenten-Katalog

### 3.1 Background

Das äußerste Container-Element. Erzeugt den Aurora-Hintergrund mit Lichteffekten. **Muss immer als Wrapper für alle Inhalte verwendet werden.**

```html
<div class="glass-bg">
  <!-- Alle Inhalte hier -->
</div>
```

Mit Tab-Bar (fügt unten Padding hinzu):

```html
<div class="glass-bg glass-bg--has-tab-bar">
  <!-- Inhalte -->
  <nav class="glass-tab-bar">...</nav>
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-bg` | Vollflächiger Hintergrund mit Aurora-Lichteffekten |
| `.glass-bg--has-tab-bar` | Modifier: Bottom-Padding für Tab-Bar (82px) |

---

### 3.2 Navigation Bar

Transparente Navigationsleiste. Enthält typischerweise `glass-pill` Buttons.

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

| Klasse | Beschreibung |
|---|---|
| `.glass-nav` | Flex-Container mit `space-between`, Padding |

---

### 3.3 Pill-Button

Runde Glas-Icon-Buttons (46×46px). Werden in Nav-Bars und als eigenständige Aktions-Buttons verwendet.

```html
<button class="glass-pill">
  <svg viewBox="0 0 24 24"><!-- Icon SVG --></svg>
</button>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-pill` | Runder Glas-Button (46×46px) |
| `.glass-theme-toggle` | Spezieller Pill mit automatischem Moon/Sun-Switch |

Theme-Toggle (spezialisierter Pill):

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

### 3.4 Tab-Bar

Fixierte Bottom-Navigation mit Glas-Hintergrund. Benötigt `glass-bg--has-tab-bar` auf dem Background-Container.

```html
<nav class="glass-tab-bar">
  <button class="glass-tab-bar__item is-active">
    <span class="glass-tab-bar__icon">
      <svg viewBox="0 0 24 24"><!-- Icon --></svg>
    </span>
    <span class="glass-tab-bar__label">Start</span>
  </button>
  <button class="glass-tab-bar__item">
    <span class="glass-tab-bar__icon">
      <svg viewBox="0 0 24 24"><!-- Icon --></svg>
      <span class="glass-tab-bar__badge">3</span>
    </span>
    <span class="glass-tab-bar__label">Verträge</span>
  </button>
  <button class="glass-tab-bar__item">
    <span class="glass-tab-bar__icon">
      <svg viewBox="0 0 24 24"><!-- Icon --></svg>
    </span>
    <span class="glass-tab-bar__label">Profil</span>
  </button>
</nav>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-tab-bar` | Container: fixed bottom, Glas-Blur |
| `.glass-tab-bar__item` | Einzelner Tab |
| `.glass-tab-bar__item.is-active` | Aktiver Tab (Primary-Farbe) |
| `.glass-tab-bar__icon` | Icon-Wrapper |
| `.glass-tab-bar__badge` | Numerisches Badge im Icon |
| `.glass-tab-bar__label` | Text-Label unter dem Icon |

---

### 3.5 Title

Seitentitel mit Text-Shadow-Effekt.

```html
<h1 class="glass-title">Seitentitel</h1>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-title` | Großer Titel (24px, bold, text-shadow) |

---

### 3.6 Card

Glasmorphismus-Container für Inhalte. Optional mit Glow-Effekt (Milchglas-Gradient + Lichtstreifen).

```html
<!-- Standard Card -->
<div class="glass-card">
  <p class="glass-card__text">Inhalt</p>
</div>

<!-- Glow Card mit Icon -->
<div class="glass-card glass-card--glow">
  <div class="glass-card__icon">
    <svg viewBox="0 0 64 64"><!-- Icon SVG --></svg>
  </div>
  <p class="glass-card__text">Beschreibungstext</p>
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-card` | Basis-Glas-Container (border-radius: 24px) |
| `.glass-card--glow` | Milchglas-Gradient mit Lichtstreifen-Effekt |
| `.glass-card__icon` | Zentrierter Icon-Wrapper (SVG, 48×48px) |
| `.glass-card__text` | Beschreibungstext (muted) |

---

### 3.7 Buttons

Full-Width-Buttons (56px Höhe) mit drei Varianten und Größen-Modifiern.

```html
<!-- Primary: Farbgradient, Hauptaktion -->
<button class="glass-btn glass-btn--primary">
  <svg viewBox="0 0 24 24"><!-- Optional: Icon --></svg>
  Primäre Aktion
</button>

<!-- Secondary: Milchig-weiß -->
<button class="glass-btn glass-btn--secondary">Sekundäre Aktion</button>

<!-- Tertiary: Subtiles Glas -->
<button class="glass-btn glass-btn--tertiary">Tertiäre Aktion</button>

<!-- Größen -->
<button class="glass-btn glass-btn--primary glass-btn--sm">Klein (44px)</button>
<button class="glass-btn glass-btn--primary glass-btn--lg">Groß (64px)</button>

<!-- Auto-Width (statt full-width) -->
<button class="glass-btn glass-btn--primary glass-btn--auto">Auto</button>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-btn` | Basis (56px Höhe, width: 100%) |
| `.glass-btn--primary` | Farbgradient (orange) |
| `.glass-btn--secondary` | Milchig-weiß, dunkler Text |
| `.glass-btn--tertiary` | Subtiles Glas, transparenter |
| `.glass-btn--sm` | 44px Höhe |
| `.glass-btn--lg` | 64px Höhe |
| `.glass-btn--auto` | Width: auto statt 100% |

**Wichtig:** Buttons sind standardmäßig `width: 100%`. Für inline/auto-breite Buttons `--auto` verwenden.

---

### 3.8 Badge

Tags und Labels.

```html
<span class="glass-badge">Standard</span>
<span class="glass-badge glass-badge--primary">Aktiv</span>
<span class="glass-badge glass-badge--success">Fertig</span>
<span class="glass-badge glass-badge--error">Fehler</span>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-badge` | Standard (subtiles Glas) |
| `.glass-badge--primary` | Primary-Farbe |
| `.glass-badge--success` | Grün |
| `.glass-badge--error` | Rot |

---

### 3.9 Avatar

Glas-Kreise in drei Größen. Für Initialen, Icons oder Bilder.

```html
<div class="glass-avatar glass-avatar--sm">S</div>
<div class="glass-avatar">M</div>
<div class="glass-avatar glass-avatar--lg">L</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-avatar` | Standard-Größe (Medium) |
| `.glass-avatar--sm` | Klein |
| `.glass-avatar--lg` | Groß |

---

### 3.10 Divider

Horizontale Trennlinie mit Fade-Effekt.

```html
<hr class="glass-divider">
```

---

### 3.11 Status Notice

Info-/Hinweis-Card mit Icon und Text.

```html
<div class="glass-status">
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="8"/>
  </svg>
  <p>Noch keine Dokumente erfasst.</p>
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-status` | Container mit subtiler Glas-Oberfläche |

---

### 3.12 Modal

Zentrierter Dialog mit Blur-Overlay. Wird über die State-Klasse `is-active` auf dem Overlay gesteuert.

```html
<div class="glass-modal-overlay is-active">
  <div class="glass-modal">
    <div class="glass-modal__header">
      <h2 class="glass-modal__title">Vertrag löschen?</h2>
    </div>
    <div class="glass-modal__body">
      <p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
    </div>
    <div class="glass-modal__footer">
      <button class="glass-modal__action">Abbrechen</button>
      <button class="glass-modal__action glass-modal__action--primary">Bestätigen</button>
    </div>
  </div>
</div>
```

Danger-Variante:

```html
<button class="glass-modal__action glass-modal__action--danger">Löschen</button>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-modal-overlay` | Fullscreen-Container mit Blur |
| `.glass-modal-overlay.is-active` | Sichtbar + animiert |
| `.glass-modal` | Dialog-Box |
| `.glass-modal__header` | Kopfbereich |
| `.glass-modal__title` | Titel (20px, bold) |
| `.glass-modal__body` | Inhaltsbereich |
| `.glass-modal__footer` | Aktionsleiste |
| `.glass-modal__action` | Action-Button im Footer |
| `.glass-modal__action--primary` | Primäre Aktion (farbig) |
| `.glass-modal__action--danger` | Gefährliche Aktion (rot) |

**Wichtig:** `is-active` kommt auf `.glass-modal-overlay`, **nicht** auf `.glass-modal`.

JavaScript zum Öffnen/Schließen:

```js
// Öffnen
document.querySelector('.glass-modal-overlay').classList.add('is-active');
// Schließen
document.querySelector('.glass-modal-overlay').classList.remove('is-active');
```

---

### 3.13 Toast

Temporäre Benachrichtigung. Sichtbar über `is-visible`. Drei Varianten.

```html
<div class="glass-toast glass-toast--success is-visible">
  <svg class="glass-toast__icon" viewBox="0 0 24 24"><!-- Icon --></svg>
  <span class="glass-toast__text">Erfolgreich gespeichert!</span>
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-toast` | Basis-Container |
| `.glass-toast--success` | Grüner Akzent |
| `.glass-toast--error` | Roter Akzent |
| `.glass-toast--warning` | Gelber Akzent |
| `.glass-toast.is-visible` | Sichtbar + eingeblendet |
| `.glass-toast__icon` | Icon (SVG) |
| `.glass-toast__text` | Nachrichtentext |

---

### 3.14 Input

Textfelder mit Glas-Hintergrund. Werden in einer `glass-input-group` mit Label und optionalem Hint gewrappt.

```html
<div class="glass-input-group">
  <label class="glass-label">Vertragsname</label>
  <input class="glass-input" type="text" placeholder="z.B. Mietvertrag">
  <span class="glass-hint">Optionaler Hilfetext</span>
</div>
```

Error-State:

```html
<div class="glass-input-group">
  <label class="glass-label">E-Mail</label>
  <input class="glass-input glass-input--error" type="email" value="invalid@">
  <span class="glass-hint glass-hint--error">Bitte gültige E-Mail eingeben</span>
</div>
```

Disabled:

```html
<input class="glass-input" type="text" disabled>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-input-group` | Wrapper für Label + Input + Hint |
| `.glass-label` | Label (klein, muted, uppercase) |
| `.glass-input` | Text-Input (Glas-Hintergrund) |
| `.glass-input--error` | Roter Border für Fehlerzustand |
| `.glass-hint` | Hilfetext unter dem Input |
| `.glass-hint--error` | Roter Hilfetext |

---

### 3.15 Textarea

Mehrzeiliges Textfeld.

```html
<textarea class="glass-textarea" placeholder="Optionale Anmerkungen…"></textarea>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-textarea` | Mehrzeiliges Glas-Input |

---

### 3.16 Select

Dropdown mit Glas-Styling und Custom-Chevron.

```html
<select class="glass-select">
  <option>Bitte wählen…</option>
  <option>Versicherung</option>
  <option>Mietvertrag</option>
</select>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-select` | Styled Dropdown |

---

### 3.17 Search

Suchfeld mit eingebettetem Such-Icon.

```html
<div class="glass-search">
  <svg class="glass-search__icon" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
  <input class="glass-input" type="search" placeholder="Verträge durchsuchen…">
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-search` | Wrapper (position: relative) |
| `.glass-search__icon` | Positioniertes Such-Icon (links) |

**Wichtig:** Das Input innerhalb von `.glass-search` nutzt die reguläre `.glass-input` Klasse.

---

### 3.18 Toggle Switch

iOS-artiger Schalter.

```html
<label class="glass-toggle">
  <input class="glass-toggle__input" type="checkbox" checked>
  <span class="glass-toggle__track">
    <span class="glass-toggle__thumb"></span>
  </span>
  <span class="glass-toggle__label">Benachrichtigungen</span>
</label>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-toggle` | Äußeres Label (Flex-Container) |
| `.glass-toggle__input` | Verstecktes Checkbox-Input |
| `.glass-toggle__track` | Sichtbare Schiene |
| `.glass-toggle__thumb` | Beweglicher Knopf |
| `.glass-toggle__label` | Text-Label |

**State:** `:checked` auf dem Input aktiviert den Toggle visuell.

---

### 3.19 Checkbox

Animierte Checkbox mit Checkmark-SVG.

```html
<label class="glass-checkbox">
  <input class="glass-checkbox__input" type="checkbox" checked>
  <span class="glass-checkbox__box">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
  </span>
  <span class="glass-checkbox__label">AGB akzeptieren</span>
</label>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-checkbox` | Äußeres Label |
| `.glass-checkbox__input` | Verstecktes Checkbox-Input |
| `.glass-checkbox__box` | Sichtbare Box mit Checkmark-SVG |
| `.glass-checkbox__label` | Text-Label |

---

### 3.20 Radio Button

Animierter Radio-Button mit Dot.

```html
<label class="glass-radio">
  <input class="glass-radio__input" type="radio" name="gruppe" checked>
  <span class="glass-radio__circle">
    <span class="glass-radio__dot"></span>
  </span>
  <span class="glass-radio__label">Option A</span>
</label>

<label class="glass-radio">
  <input class="glass-radio__input" type="radio" name="gruppe">
  <span class="glass-radio__circle">
    <span class="glass-radio__dot"></span>
  </span>
  <span class="glass-radio__label">Option B</span>
</label>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-radio` | Äußeres Label |
| `.glass-radio__input` | Verstecktes Radio-Input |
| `.glass-radio__circle` | Sichtbarer Kreis |
| `.glass-radio__dot` | Innerer Punkt (sichtbar bei :checked) |
| `.glass-radio__label` | Text-Label |

**Wichtig:** Radio-Buttons der gleichen Gruppe brauchen denselben `name`-Attributwert.

---

### 3.21 Range Slider

Slider mit Gradient-Thumb. Wird in einer Gruppe mit Header und Wertanzeige verwendet.

```html
<div class="glass-range-group">
  <div class="glass-range-header">
    <label class="glass-label">Bildqualität</label>
    <span class="glass-range-value" id="range-val">75%</span>
  </div>
  <input class="glass-range" type="range" min="0" max="100" value="75"
         oninput="document.getElementById('range-val').textContent = this.value + '%'">
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-range-group` | Wrapper |
| `.glass-range-header` | Flex-Container für Label + Wert |
| `.glass-range-value` | Wertanzeige (rechts) |
| `.glass-range` | Der eigentliche Slider |

---

### 3.22 Progress Bar

Fortschrittsbalken mit optionalem Shimmer-Effekt.

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

| Klasse | Beschreibung |
|---|---|
| `.glass-progress` | Basis-Container |
| `.glass-progress--sm` | Schmaler Track (4px) |
| `.glass-progress--lg` | Breiter Track (12px) |
| `.glass-progress--success` | Grüner Balken |
| `.glass-progress--error` | Roter Balken |
| `.glass-progress__header` | Flex-Container für Label + Wert |
| `.glass-progress__label` | Bezeichnung (links) |
| `.glass-progress__value` | Prozentwert (rechts) |
| `.glass-progress__track` | Hintergrund-Schiene |
| `.glass-progress__fill` | Gefüllter Bereich (Breite via `style="width: X%"`) |

**Wichtig:** Die Fortschrittsbreite wird über inline `style="width: X%"` auf `.glass-progress__fill` gesteuert.

---

### 3.23 Accordion

Auf-/zuklappbare Inhaltsbereiche. Gesteuert über `is-open` auf den Items.

```html
<div class="glass-accordion">
  <div class="glass-accordion__item is-open">
    <button class="glass-accordion__trigger" onclick="this.parentElement.classList.toggle('is-open')">
      <span>Frage eins?</span>
      <span class="glass-accordion__trigger-icon">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </button>
    <div class="glass-accordion__content">
      <div class="glass-accordion__body">
        Die Antwort auf Frage eins.
      </div>
    </div>
  </div>

  <div class="glass-accordion__item">
    <button class="glass-accordion__trigger" onclick="this.parentElement.classList.toggle('is-open')">
      <span>Frage zwei?</span>
      <span class="glass-accordion__trigger-icon">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </button>
    <div class="glass-accordion__content">
      <div class="glass-accordion__body">
        Die Antwort auf Frage zwei.
      </div>
    </div>
  </div>
</div>
```

| Klasse | Beschreibung |
|---|---|
| `.glass-accordion` | Container |
| `.glass-accordion__item` | Einzelnes Item |
| `.glass-accordion__item.is-open` | Geöffnetes Item |
| `.glass-accordion__trigger` | Klickbarer Header-Button |
| `.glass-accordion__trigger-icon` | Chevron-Icon (rotiert bei open) |
| `.glass-accordion__content` | Wrapper für animierte Höhe |
| `.glass-accordion__body` | Eigentlicher Inhalt |

---

## 4. Utility-Klassen

### Stack (Vertikal)

Flexbox-Column mit Gap.

```html
<div class="gl-stack gl-stack--md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

| Klasse | Gap |
|---|---|
| `.gl-stack` | Standard |
| `.gl-stack--2xs` | 4px |
| `.gl-stack--xs` | 8px |
| `.gl-stack--sm` | 12px |
| `.gl-stack--md` | 16px |
| `.gl-stack--lg` | 20px |
| `.gl-stack--xl` | 24px |

### Row (Horizontal)

Flexbox-Row mit Gap.

```html
<div class="gl-row gl-row--sm">
  <span class="glass-badge">Tag 1</span>
  <span class="glass-badge">Tag 2</span>
</div>
```

| Klasse | Gap |
|---|---|
| `.gl-row` | Standard |
| `.gl-row--xs` | 8px |
| `.gl-row--sm` | 12px |
| `.gl-row--md` | 16px |

### Margin

| Klasse | Wert |
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

| Klasse | Beschreibung |
|---|---|
| `.gl-text-center` | text-align: center |
| `.gl-text-muted` | Gedämpfte Textfarbe |
| `.gl-text-sm` | Kleinere Schrift |

### Layout

| Klasse | Beschreibung |
|---|---|
| `.gl-px` | Horizontales Padding |
| `.gl-w-full` | width: 100% |
| `.gl-flex-1` | flex: 1 |

---

## 5. State-Klassen Übersicht

| State-Klasse | Verwendet bei | Beschreibung |
|---|---|---|
| `.is-active` | `.glass-modal-overlay`, `.glass-tab-bar__item` | Element ist aktiv/sichtbar |
| `.is-open` | `.glass-accordion__item` | Accordion-Item ist ausgeklappt |
| `.is-visible` | `.glass-toast` | Toast ist sichtbar |
| `:checked` | Toggle, Checkbox, Radio (auf dem Input) | Nativer checked-State |
| `:focus` | Input, Textarea, Select, Range | Focus-Ring |
| `:disabled` | `.glass-input` | Deaktiviertes Input |

---

## 6. Composition Patterns

### Login-Screen

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

  <h1 class="glass-title">Anmelden</h1>

  <div class="gl-stack gl-stack--md">
    <div class="glass-input-group">
      <label class="glass-label">E-Mail</label>
      <input class="glass-input" type="email" placeholder="name@beispiel.de">
    </div>
    <div class="glass-input-group">
      <label class="glass-label">Passwort</label>
      <input class="glass-input" type="password" placeholder="••••••••">
    </div>
  </div>

  <div class="gl-stack gl-stack--sm gl-mt-lg">
    <button class="glass-btn glass-btn--primary">Einloggen</button>
    <button class="glass-btn glass-btn--tertiary">Passwort vergessen?</button>
  </div>
</div>
```

### Dashboard mit Cards

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
      <p class="glass-card__text">Dokumente erfassen und hochladen.</p>
    </div>

    <div class="glass-card glass-card--glow">
      <div class="glass-card__icon">
        <svg viewBox="0 0 64 64"><!-- Icon --></svg>
      </div>
      <p class="glass-card__text">Verträge verwalten und archivieren.</p>
    </div>
  </div>

  <nav class="glass-tab-bar">
    <button class="glass-tab-bar__item is-active">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Home --></svg></span>
      <span class="glass-tab-bar__label">Start</span>
    </button>
    <button class="glass-tab-bar__item">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Docs --></svg></span>
      <span class="glass-tab-bar__label">Verträge</span>
    </button>
    <button class="glass-tab-bar__item">
      <span class="glass-tab-bar__icon"><svg viewBox="0 0 24 24"><!-- Profile --></svg></span>
      <span class="glass-tab-bar__label">Profil</span>
    </button>
  </nav>
</div>
```

### Formular-Seite

```html
<div class="glass-bg">
  <nav class="glass-nav">
    <button class="glass-pill">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
  </nav>

  <h1 class="glass-title">Neuer Vertrag</h1>

  <div class="gl-stack gl-stack--md">
    <div class="glass-input-group">
      <label class="glass-label">Vertragsname</label>
      <input class="glass-input" type="text" placeholder="z.B. Mietvertrag">
    </div>

    <div class="glass-input-group">
      <label class="glass-label">Kategorie</label>
      <select class="glass-select">
        <option>Bitte wählen…</option>
        <option>Versicherung</option>
        <option>Mietvertrag</option>
        <option>Arbeitsvertrag</option>
      </select>
    </div>

    <div class="glass-input-group">
      <label class="glass-label">Anmerkungen</label>
      <textarea class="glass-textarea" placeholder="Optionale Anmerkungen…"></textarea>
    </div>

    <label class="glass-toggle">
      <input class="glass-toggle__input" type="checkbox">
      <span class="glass-toggle__track"><span class="glass-toggle__thumb"></span></span>
      <span class="glass-toggle__label">Erinnerung aktivieren</span>
    </label>

    <hr class="glass-divider">

    <button class="glass-btn glass-btn--primary">Speichern</button>
    <button class="glass-btn glass-btn--tertiary">Abbrechen</button>
  </div>
</div>
```

### Lösch-Bestätigung (Modal)

```html
<div class="glass-modal-overlay is-active">
  <div class="glass-modal">
    <div class="glass-modal__header">
      <h2 class="glass-modal__title">Vertrag löschen?</h2>
    </div>
    <div class="glass-modal__body">
      <p>Möchtest du diesen Vertrag endgültig löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
    </div>
    <div class="glass-modal__footer">
      <button class="glass-modal__action" onclick="closeModal()">Abbrechen</button>
      <button class="glass-modal__action glass-modal__action--danger" onclick="deleteContract()">Löschen</button>
    </div>
  </div>
</div>
```

### Settings-Seite

```html
<div class="glass-bg">
  <nav class="glass-nav">
    <button class="glass-pill">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
  </nav>

  <h1 class="glass-title">Einstellungen</h1>

  <div class="gl-stack gl-stack--md">
    <label class="glass-toggle">
      <input class="glass-toggle__input" type="checkbox" checked>
      <span class="glass-toggle__track"><span class="glass-toggle__thumb"></span></span>
      <span class="glass-toggle__label">Push-Benachrichtigungen</span>
    </label>

    <hr class="glass-divider">

    <label class="glass-toggle">
      <input class="glass-toggle__input" type="checkbox">
      <span class="glass-toggle__track"><span class="glass-toggle__thumb"></span></span>
      <span class="glass-toggle__label">Dunkelmodus</span>
    </label>

    <hr class="glass-divider">

    <div class="glass-range-group">
      <div class="glass-range-header">
        <label class="glass-label">Schriftgröße</label>
        <span class="glass-range-value">100%</span>
      </div>
      <input class="glass-range" type="range" min="80" max="150" value="100">
    </div>

    <hr class="glass-divider">

    <div class="glass-accordion">
      <div class="glass-accordion__item">
        <button class="glass-accordion__trigger" onclick="this.parentElement.classList.toggle('is-open')">
          <span>Erweiterte Einstellungen</span>
          <span class="glass-accordion__trigger-icon">
            <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div class="glass-accordion__content">
          <div class="glass-accordion__body">
            Erweiterte Optionen hier…
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Fortschritt + Toast

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

<!-- Toast (wird per JS eingeblendet) -->
<div class="glass-toast glass-toast--success is-visible">
  <svg class="glass-toast__icon" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
  <span class="glass-toast__text">Upload erfolgreich!</span>
</div>
```

---

## 7. Regeln & häufige Fehler

### ✅ Immer beachten

1. **`glass-bg` als äußerster Container** – Ohne den Background-Wrapper fehlt der Aurora-Hintergrund, und Glaseffekte sehen nicht korrekt aus.
2. **`glass-bg--has-tab-bar`** – Wenn eine Tab-Bar vorhanden ist, muss dieser Modifier auf `glass-bg` gesetzt werden, sonst verdeckt die Tab-Bar den unteren Inhalt.
3. **Buttons sind full-width** – `glass-btn` hat `width: 100%`. Für inline-Buttons immer `glass-btn--auto` ergänzen.
4. **Inputs in `glass-input-group` wrappen** – Für korrektes Label/Hint-Spacing.
5. **State-Klassen richtig platzieren:**
   - `is-active` → auf `.glass-modal-overlay` (nicht auf `.glass-modal`)
   - `is-active` → auf `.glass-tab-bar__item`
   - `is-open` → auf `.glass-accordion__item`
   - `is-visible` → auf `.glass-toast`
6. **SVG-Icons** – GlassKit nutzt inline SVGs (stroke-based, nicht fill). Typische Attribute: `viewBox="0 0 24 24"`, stroke via `currentColor`.
7. **`data-theme`** – Immer auf `<html>` setzen, nie auf `<body>` oder tiefere Elemente.

### ❌ Häufige Fehler

| Fehler | Korrektur |
|---|---|
| `is-active` auf `.glass-modal` statt `.glass-modal-overlay` | `is-active` auf den Overlay setzen |
| `glass-btn` ohne Variante (`--primary` etc.) | Immer eine Variante angeben |
| Inputs ohne `glass-input-group` Wrapper | In `glass-input-group` einbetten |
| `glass-tab-bar` ohne `glass-bg--has-tab-bar` | Modifier auf den Background-Container |
| `data-theme` auf `<body>` | Auf `<html>` setzen |
| Progress-Breite per Klasse statt inline-Style | `style="width: X%"` auf `.glass-progress__fill` |
| Toggle ohne `__track > __thumb` Verschachtelung | Korrekte BEM-Hierarchie beachten |

---

## 8. Klassen-Schnellreferenz

| Komponente | Basis-Klasse | Modifier / States |
|---|---|---|
| Background | `.glass-bg` | `--has-tab-bar` |
| Navigation | `.glass-nav` | – |
| Pill-Button | `.glass-pill` | – |
| Theme-Toggle | `.glass-theme-toggle` | – |
| Title | `.glass-title` | – |
| Card | `.glass-card` | `--glow` |
| Button | `.glass-btn` | `--primary`, `--secondary`, `--tertiary`, `--sm`, `--lg`, `--auto` |
| Badge | `.glass-badge` | `--primary`, `--success`, `--error` |
| Avatar | `.glass-avatar` | `--sm`, `--lg` |
| Divider | `.glass-divider` | – |
| Status | `.glass-status` | – |
| Input | `.glass-input` | `--error`, `:disabled` |
| Input Group | `.glass-input-group` | – |
| Label | `.glass-label` | – |
| Hint | `.glass-hint` | `--error` |
| Textarea | `.glass-textarea` | – |
| Select | `.glass-select` | – |
| Search | `.glass-search` | – |
| Toggle | `.glass-toggle` | `:checked` |
| Checkbox | `.glass-checkbox` | `:checked` |
| Radio | `.glass-radio` | `:checked` |
| Range | `.glass-range` | – |
| Progress | `.glass-progress` | `--sm`, `--lg`, `--success`, `--error` |
| Modal | `.glass-modal-overlay` | `.is-active` |
| Toast | `.glass-toast` | `--success`, `--error`, `--warning`, `.is-visible` |
| Tab-Bar | `.glass-tab-bar` | `.is-active` auf Items |
| Accordion | `.glass-accordion` | `.is-open` auf Items |

---

## 9. Web Components / Shadow DOM

GlassKit liefert ein Constructable Stylesheet für Shadow DOM-Nutzung:

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

| Export | Typ | Beschreibung |
|---|---|---|
| `glassSheet` | `CSSStyleSheet` | Constructable Stylesheet für `adoptedStyleSheets` |
| `css` | `string` | CSS als String (Fallback) |

**Hinweis:** CSS Custom Properties (`--gl-*`) durchdringen die Shadow-Boundary automatisch. Theme-Switching funktioniert global.

---

## 10. Custom Theming

Eigene Markenfarben über `theme-override.css` nach der Basis-Library laden:

```css
:root {
  --gl-color-primary:      #007AFF;
  --gl-color-primary-dark:  #0055CC;
  --gl-color-primary-mid:   #0066E0;

  --gl-border-warm:         rgba(0, 122, 255, 0.35);
  --gl-border-focus:        rgba(0, 122, 255, 0.60);

  --gl-shadow-btn-primary:  0 6px 24px rgba(0, 100, 220, 0.35),
                            0 2px 8px rgba(0, 0, 0, 0.15);
  --gl-shadow-focus:        0 0 0 3px rgba(0, 122, 255, 0.3);
}
```

Mitgelieferte Theme-Vorlagen in `theme-override.css`:
- 🔵 Ocean Blue
- 🟢 Emerald Green
- 🌹 Rose
- 🎨 Custom (leer, zum Befüllen)
