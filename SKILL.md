---
name: glasskit-css
description: GlassKit is a pure CSS glassmorphism component library (v1.6.4) with 24 components, Dark & Light mode, design tokens, and BEM-like naming. Use this reference whenever generating HTML that uses GlassKit classes to ensure correct structure, nesting, modifiers, and token usage.
---

# GlassKit CSS – AI Component Reference

> **Purpose:** This document is an AI-optimized reference for generating correct GlassKit HTML markup.
> It replaces the need to parse `docs.html` and provides copy-paste-ready structures, rules, and composition patterns.

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

Toggle theme via JavaScript:

```js
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```

---

## 2. Design Tokens

All visual values are controlled via CSS Custom Properties. For custom theming, override them in a `theme-override.css`.

### Colors

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--gl-color-primary` | `#f5a623` | `#e8852d` | Primary color, buttons, active elements |
| `--gl-color-primary-dark` | `#d4692a` | `#c96a1e` | Gradient end value |
| `--gl-color-primary-mid` | `#e07a24` | `#d97826` | Gradient midpoint |
| `--gl-color-text` | `#ffffff` | `#1a2a36` | Default text color |
| `--gl-color-text-muted` | `rgba(255,255,255,0.60)` | `rgba(26,42,54,0.55)` | Secondary text |
| `--gl-color-text-heading` | `#ffffff` | `#0f1f2a` | Headings |
| `--gl-color-success` | `#34c759` | `#28a745` | Success |
| `--gl-color-error` | `#ff3b30` | `#dc3545` | Error |
| `--gl-color-warning` | `#ffcc00` | `#e6a800` | Warning |

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
| `--gl-border-warm` | `rgba(255,200,100, 0.35)` |
| `--gl-border-focus` | `rgba(245,166,35, 0.60)` |

### Blur

| Token | Value |
|---|---|
| `--gl-blur` | `24px` (default) |
| `--gl-blur-light` | `16px` |
| `--gl-blur-soft` | `12px` |
| `--gl-blur-heavy` | `40px` |

### Radii

| Token | Value | Usage |
|---|---|---|
| `--gl-radius-xs` | `8px` | Small elements |
| `--gl-radius-sm` | `12px` | Badges, small containers |
| `--gl-radius-input` | `14px` | Inputs, textareas |
| `--gl-radius-btn` | `16px` | Buttons |
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

Fixed bottom navigation with glass background. Requires `glass-bg--has-tab-bar` on the background container.

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
| `.glass-tab-bar__item` | Individual tab |
| `.glass-tab-bar__item.is-active` | Active tab (primary color) |
| `.glass-tab-bar__icon` | Icon wrapper |
| `.glass-tab-bar__badge` | Numeric badge inside icon |
| `.glass-tab-bar__label` | Text label below icon |

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
| `.glass-tab-bar--floating` | Pill shape, max-content width, spotlight active state |
| `.glass-tab-bar__accessory` | Standalone glass capsule next to the bar |
| `.glass-tab-bar__accessory--accent` / `--success` / `--error` | Filled colored accessory (white icon) |
| `.glass-bg--has-tab-bar-floating` | Background padding for the floating variant |

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

**Icons:** Button SVGs need **no inline `fill`/`stroke` attributes** – GlassKit styles them automatically: outline style (`fill: none; stroke: currentColor; stroke-width: 2`, round caps/joins) as the default, `--secondary`/`--tertiary` use their icon tokens, `--primary` renders icons filled. For deliberately filled icons (e.g. brand logos like the GitHub mark) add `glass-icon--fill` to the `<svg>`.

**Links as buttons:** `.glass-btn` also works on `<a>` elements – anchors render as `inline-flex` with `text-decoration: none`, so `--auto` shrink-wraps exactly like on a real `<button>`.

---

### 3.8 Badge

Tags and labels.

```html
<span class="glass-badge">Default</span>
<span class="glass-badge glass-badge--primary">Active</span>
<span class="glass-badge glass-badge--success">Done</span>
<span class="glass-badge glass-badge--error">Error</span>
```

| Class | Description |
|---|---|
| `.glass-badge` | Default (subtle glass) |
| `.glass-badge--primary` | Primary color |
| `.glass-badge--success` | Green |
| `.glass-badge--error` | Red |

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
| `.glass-modal` | Dialog box |
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

| Class | Description |
|---|---|
| `.glass-input-group` | Wrapper for label + input + hint |
| `.glass-label` | Label (small, muted, uppercase) |
| `.glass-input` | Text input (glass background) |
| `.glass-input--error` | Red border for error state |
| `.glass-hint` | Help text below input |
| `.glass-hint--error` | Red help text |

---

### 3.15 Textarea

Multi-line text field.

```html
<textarea class="glass-textarea" placeholder="Optional notes…"></textarea>
```

| Class | Description |
|---|---|
| `.glass-textarea` | Multi-line glass input |

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
| `.glass-search__icon` | Positioned search icon (left) |

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
| `.glass-accordion__content` | Wrapper for animated height |
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
| `.glass-list--flush` | Edge-to-edge variant (no side margin / radius). Assumes parent has `--gl-space-lg` horizontal padding. |
| `.glass-list--bare` | Strips background, border & shadow &mdash; for embedding inside `.glass-popover` or `.glass-card`. |
| `.glass-list__section-header` | Section label above a `.glass-list` — uppercase, small, muted |
| `.glass-list__item` | List row (use `<li>`, `<a>`, or `<button>`) |
| `.glass-list__item--interactive` | Adds hover / focus / active states |
| `.glass-list__item--center` | Centered single-text variant with ellipsis truncation |
| `.glass-list__item--danger` | Red text for destructive actions |
| `.glass-list__item--accent` | Primary-colored text for accent actions |
| `.glass-list__leading` | Leading slot (28×28, holds an icon SVG) |
| `.glass-list__leading--lg` | Large leading slot (40×40, rounded square, supports `<img>`) |
| `.glass-list__content` | Flexible middle slot — takes remaining width, enables truncation |
| `.glass-list__title` | Primary text (medium weight, ellipsis) |
| `.glass-list__subtitle` | Secondary text (small, muted, ellipsis) |
| `.glass-list__subtitle--wrap` | Multi-line subtitle (up to 3 lines, clamped with ellipsis) |
| `.glass-list__trailing` | Trailing slot — chevron, value, button, badge |
| `.glass-list__value` | Muted text inside `.glass-list__trailing` (e.g. file size) |

**Notes:**
- Dividers are auto-rendered via `::after`. The last item never has a divider.
- Items **with** a `__leading` slot get an icon-aligned divider inset; items **without** a leading slot get a standard left/right padding inset (handled via `:has()`). Large leading (`--lg`) adjusts the divider inset automatically.
- SVG icon convention: `24px` for leading (32px for `--lg`), `18px` for trailing, `stroke: currentColor`, `stroke-width: 2`.
- Use `<ul>` + `<li>` for semantic lists. For interactive rows wrap in `<a>` or `<button>` instead of `<li>` if a single-row list is needed.
- `.glass-list__section-header` sits **outside** the `.glass-list` container, directly above it.
- `--danger` and `--accent` affect the title and leading icon color; the subtitle stays muted.

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

**Note:** name your toggle function anything except `togglePopover` &mdash; that name collides with the native `HTMLElement.togglePopover()` method (HTML Popover API) and inline `onclick` handlers will throw `NotSupportedError`. Use a prefix like `gkTogglePopover` or `myToggle`.

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
| `:checked` | Toggle, Checkbox, Radio (on the input) | Native checked state |
| `:focus` | Input, Textarea, Select, Range | Focus ring |
| `:disabled` | `.glass-input` | Disabled input |

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

---

## 8. Quick Class Reference

| Component | Base Class | Modifiers / States |
|---|---|---|
| Background | `.glass-bg` | `--has-tab-bar` |
| Navigation | `.glass-nav` | – |
| Pill Button | `.glass-pill` | – |
| Theme Toggle | `.glass-theme-toggle` | – |
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
| Tab Bar | `.glass-tab-bar` | `.is-active` on items |
| Accordion | `.glass-accordion` | `.is-open` on items |
| List | `.glass-list` | `--flush`, `--bare`, `__item--interactive`, `__item--center`, `__item--danger`, `__item--accent`, `__leading--lg`, `__subtitle--wrap`, `__value`, `__section-header` |
| Popover | `.glass-popover` | `--top`, `--start`, `--end`, `.is-open` |

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
| `glassSheet` | `CSSStyleSheet` | Constructable Stylesheet for `adoptedStyleSheets` |
| `css` | `string` | CSS as string (fallback) |

**Note:** CSS Custom Properties (`--gl-*`) penetrate the shadow boundary automatically. Theme switching works globally.

---

## 10. Custom Theming

Load custom brand colors via `theme-override.css` after the base library:

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

Included theme templates in `theme-override.css`:
- 🔵 Ocean Blue
- 🟢 Emerald Green
- 🌹 Rose
- 🎨 Custom (empty, ready to fill)
