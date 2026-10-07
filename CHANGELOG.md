# Changelog

All notable changes to **GlassKit** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
GlassKit uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.22.1] – 2026-10-08

### Fixed

- **Date and time inputs fit narrow columns again inside `.glass-input-wrap`.** The wrapper that 1.22.0 introduced for prefix and suffix is a one-cell grid, and its column was `auto`: it held the input at its content-based minimum width, which Chromium measures for date and time inputs as their whole intrinsic width, picker icon included. In a narrow column they ran out of the wrapper — two date fields side by side in a 300 px row ended at x = 339 where the row ended at 320, two time fields in a 200 px row were 138 px wide in 95 px columns; GlassKit Elements' `<glk-input>` always renders the wrapper, so its date and time fields overlapped on phones in Chrome and Edge. Safari was not affected. The column is `minmax(0, 1fr)` now and shrinks like the field did before 1.22.0. Measured in Chromium and WebKit: every date, time and text field ends at its column, 145 / 145 and 95 / 95 px; a field with a suffix keeps its padding; docs, showcase and landing pages render pixel-identical to 1.22.0. ([#8](https://github.com/JUNGHERZ/GlassKit/issues/8))

---

## [1.22.0] – 2026-10-07

### Added

- **Prefix and suffix inside an input: `.glass-input-wrap`.** A currency, a unit, an icon or a button inside the field's box had no place: an app laid its element over the field from outside and pushed the text clear of it through the field's padding by hand. Wrap the input in `.glass-input-wrap` and put `.glass-input-wrap__prefix` and `__suffix` next to it. The wrapper is a one-cell grid, so the affixes lie on the field, centred on it, at its inline start and end — right to left they swap sides. The field's padding grows by their width, `--gl-input-prefix-size` and `--gl-input-suffix-size`: 18px, an icon, unless set — set it for a wider unit. The padding follows the `--prefix` / `--suffix` modifier, or a visible affix where `:has()` is supported; it changes at once, not animated, so text does not slide while a page loads. Icons take the search icon's size and colour, text the muted colour. A click on text or an icon passes through to the field; a button or link inside takes its own click. Without an affix nothing changes. Measured in Chromium and WebKit: an icon prefix gives 42px padding, "EUR" with `--gl-input-suffix-size: 30px` 54px; a click on the icon or on "EUR" focuses the field, a button in the suffix gets its click. GlassKit Elements 1.22.0 puts `prefix` and `suffix` slots on it in `<glk-input>`. (GlassKit Elements [#12](https://github.com/JUNGHERZ/GlassKit-Elements/issues/12))

### Documentation

- The input section shows a field with a unit (English and German); README, SKILL.md and the quick references list the wrapper and its tokens.

---

## [1.21.2] – 2026-10-05

### Fixed

- **Disabled buttons look disabled.** `.glass-btn` had no rule for `:disabled` or `[aria-disabled="true"]`: a disabled button rendered exactly like an enabled one, kept the pointer cursor, and primary, secondary and tertiary still lifted by 1 px on hover — the tertiary one brightened as well. A Save button waiting for a change invited a tap that did nothing. It is now dimmed to 0.45, the value of the segmented control and the date chips, shows the not-allowed cursor and stays put; the tertiary keeps its surface and its muted label on hover. `[aria-disabled="true"]` covers `a.glass-btn`, which cannot be disabled; the link still navigates unless the page stops it — no `pointer-events: none`, which would take the cursor and tooltips along. Measured as in the issue, 280 × 56 px with a tolerance of 24: enabled and disabled differed in 0 of 15,680 pixels for every variant in both themes; now in 15,409 / 814 / 234 (light) and 15,518 / 15,365 / 15,473 (dark) for primary / secondary / tertiary in Chromium, WebKit within 15. In the light theme secondary and tertiary differ mainly in the label, which turns grey. ([#7](https://github.com/JUNGHERZ/GlassKit/issues/7))
- **The same for every other control that can be disabled.** The issue took them for covered; only the input, the segmented control and the date chips were. Pill, tab-bar accessory, modal actions, interactive list rows and the calendar's month arrows dim to 0.45 with the not-allowed cursor and drop their hover effects. Toggle, checkbox and radio dim their control and their label — sibling selectors, so it holds without `:has()`; the cursor over the gap between follows where `:has()` is supported. Select, textarea and range dim to 0.4 like the input, and the slider thumb no longer grows on hover. The accessory's hover rules now leave a disabled one out through `:where(:not(:disabled, [aria-disabled="true"]))`, which keeps their specificity — a reset could not have restored the icon colour that each tone variant sets on its own. GlassKit Elements' `disabled` reaches all of these. GlassKit's own showcase had a "Disabled toggle" that looked enabled.
- Enabled controls render and hover exactly as before: docs, showcase and landing pages are pixel-identical in Chromium and WebKit, and the hover states of pill, accessory (plain and accent), modal action and calendar arrow were compared property by property.

### Documentation

- The buttons section shows a disabled button (English and German); the quick references, the README cheat sheet and SKILL.md list the disabled state of each control.

### Compatibility

- A page that faked a disabled look with its own `opacity` on these classes now dims twice; drop the own rule.

---

## [1.21.1] – 2026-10-05

### Fixed

- **Printed pages keep the state of checkboxes, radios, toggles, progress bars and steps.** Print dialogs leave out background graphics by default, and these states were drawn with a background only: the checked box with its white tick, the chosen radio and its dot, the toggle's on track, the progress fill, the current step's circle. On paper a checked box printed like an empty one, told apart only by a faint orange ring, and the progress bar printed empty. The parts that carry the state now print as on screen (`print-color-adjust: exact`, in both spellings, inside `@media print`); everything else keeps the economical print mode. Beyond the issue, the same holds for the slider thumb, for the chosen day of date strip and calendar — which printed paler than the other days — and for the tone dots of calendar, date strip and segmented control, which did not print at all. Whole day buttons and step numbers are not included, only the chosen and the current ones: the setting also stops the browser from darkening light text for paper, which keeps the other days readable on a dark page. Measured in Chromium with `page.pdf()` without background graphics, counting the inked pixels inside each indicator, on / off: toggle 231 / 222 → 1025 / 226, checkbox 87 / 79 → 511 / 79, radio 75 / 67 → 383 / 67; the chosen calendar day 28 → 1632 against 63 for another day; progress fill, marks and dots from nothing to printed. On screen nothing changes — docs and showcase render pixel-identical in Chromium and WebKit. WebKit cannot print to PDF under Playwright; Safari reads the same properties. ([#6](https://github.com/JUNGHERZ/GlassKit/issues/6))

### Documentation

- README, SKILL.md and the docs (English and German) describe printing, with a `beforeprint` / `afterprint` snippet that prints a dark page in the light theme — it keeps its light text and surfaces otherwise, on white paper.

---

## [1.21.0] – 2026-10-05

Contributed as pull request [#5](https://github.com/JUNGHERZ/GlassKit/pull/5) by the product that is adopting GlassKit at full depth; GlassKit Elements 1.21.0 follows the attribute.

### Added

- **Density tokens for the control sizes, and a compact preset: `data-density="compact"`.** The heights of fields, buttons, toggles, checkboxes, radios, list rows and modal actions were px literals in the component rules, so a denser layout — an admin screen, a desktop form, a narrow column — had to override a dozen selectors and keep the toggle's thumb, its travel and the first-line alignment of the labels in step by hand. They are tokens now, declared next to the spacing tokens with the values GlassKit has always drawn and read with that value as fallback, as `--gl-modal-max-width` is; `data-density="compact"` on `<html>`, next to `data-theme`, swaps in a denser set, at load or at runtime:

  | Token | Default | Compact |
  |---|---|---|
  | `--gl-control-height` (input, select, search) | `52px` | `40px` |
  | `--gl-control-padding-x` (input, select, textarea) | unset → `var(--gl-space-md)` | `var(--gl-space-sm)` |
  | `--gl-btn-height` / `-sm` / `-lg` | `56px` / `44px` / `64px` | `40px` / `32px` / `48px` |
  | `--gl-textarea-min-height` | `120px` | `88px` |
  | `--gl-list-item-min-height` | `56px` | `48px` |
  | `--gl-list-item-padding-y` | unset → `var(--gl-space-md)` | `10px` |
  | `--gl-toggle-width` × `--gl-toggle-height` | `52px` × `30px` | `44px` × `26px` |
  | `--gl-toggle-thumb-size` | `22px` | `18px` |
  | `--gl-check-size` (checkbox, radio) | `24px` | `20px` |
  | `--gl-modal-action-height` | `52px` | `44px` |

  Only these tokens change; colours, type and spacing stay, so nothing outside the controls moves. The toggle's thumb sits `(height − thumb) / 2 − 1px` inside the track — 3 px at 52 × 30, where it has always sat — and travels `width − height`, from the right and to the left under `dir="rtl"`; the invisible inputs that lie on top of the controls since 1.20.0 take the same sizes, and the first-line offsets of toggle, checkbox and radio are computed from them. Any value a project sets therefore stays aligned. Two paddings join the heights because the heights alone would not have shown: a list row's 16 px top and bottom padding already makes a plain row 50 px tall, so a 48 px minimum needs `--gl-list-item-padding-y`; and a 40 px field reads better with 12 px inside (`--gl-control-padding-x`, which the textarea follows too, so stacked fields keep one text edge). Both are left unset by default, like `--gl-toast-top`: the rules fall back to `--gl-space-md` as before, so a spacing override still reaches them wherever it is declared. The select keeps its padding pair under `:dir(rtl)`: the token takes the text side, left to right on the left and right to left on the right, and the chevron's room stays with the chevron. The chevron, the search icon and the check and radio glyphs keep their sizes.

  The preset is a bare attribute selector, like `[data-theme="light"]`, placed after the theme blocks, and the build puts it into `tokensCss` / `tokensSheet` with them. GlassKit Elements adopts only `componentsSheet` in its shadow roots and places the tokens on the document, so the compact values reach every element by inheritance — and so does a project's own `[data-density="compact"] { --gl-btn-height: 36px; }`, which a preset inside `componentsSheet` would have overridden in every shadow root. A `glassSheet` consumer whose shadow root holds an element with `data-theme` has to mirror `data-density` onto it as well, as GlassKit Elements does with its theme wrapper.

  Measured in Chromium and WebKit (Playwright 1.63) against 1.20.0: without the attribute every one of these controls has the same size, padding, thumb position, input box, label offset and first-line centre as before, left to right and right to left, and full-page screenshots — a test page in both themes, this repository's index, showcase and docs in English and German — are pixel-identical, apart from regions that also differ between two renders of 1.20.0. With `data-density="compact"` on `<html>`, at load and switched at runtime: input, select and search 40 px with 12 px inner padding, buttons 40 / 32 / 48 px, the textarea 88 px, list rows 48 px with or without a 28 px icon (about 56 px with title and subtitle), the toggle 44 × 26 px with an 18 px thumb and the same gap at either end in both directions, checkbox and radio 20 px with their inputs on top, modal actions 44 px, every label still centred on its first line; under `dir="rtl"` the select's 12 px move to the right with the chevron on the left. Removing the attribute restores every value.

### Changed

- `build-styles-js.mjs` splits three token blocks off instead of two — `:root, [data-theme="dark"]`, `[data-theme="light"]` and `[data-density="compact"]` — and fails if `tokensCss` lacks the preset or `componentsCss` declares a density token.

### Compatibility

- Without `data-density` nothing changes, and a stylesheet that lacks the new tokens — an older `tokensCss` next to this `componentsSheet` — gets the old sizes from the fallbacks.
- Like every token of the dark block, the size defaults are declared again by an element below `<html>` that carries `data-theme="dark"`; keep `data-density` on `<html>`, next to `data-theme`.

---

## [1.20.0] – 2026-10-05

The first batch of findings filed as GitHub issues, from a product that is adopting GlassKit at full depth; GlassKit Elements 1.20.0 ships the matching element changes.

### Fixed

- **The select's chevron shows in the light theme.** It was an SVG with a fixed white stroke (`rgba(255,255,255,0.6)`) in both themes, so on light glass the arrow all but disappeared and the select no longer read as one. It is now the token `--gl-select-chevron`, set per theme: the dark theme keeps the same white stroke, the light theme draws it in its muted text colour, `rgba(26,42,54,0.55)`. The rule reads `var(--gl-select-chevron, …)` with the old image as fallback; a page replaces the arrow by setting the token to its own `url(…)`. Measured: docs and showcase render pixel-identical in the dark theme; in the light theme the chevron's 28 pixels are all that changes. ([#1](https://github.com/JUNGHERZ/GlassKit/issues/1))
- **A hidden list slot takes no room.** `.glass-list__leading { display: flex }` beat the user-agent rule for `[hidden]`, so a `<glk-list-item>` without an icon, which hides its empty leading slot, kept the 28 px box and its gap: title at 60 px instead of 20, row 60 px instead of 56. `.glass-list__leading[hidden]` and `.glass-list__trailing[hidden]` are now `display: none` — the same fix 1.16.0 made for `.glass-btn[hidden]` — and the divider rules look for a *visible* leading slot, so such a row's divider starts at 20 px like that of a row built without the slot. Measured in Chromium and WebKit: title 20 px, row 56 px, divider from 20 px. ([#4](https://github.com/JUNGHERZ/GlassKit/issues/4))
- **Toggle, checkbox and radio: the invisible input lies on top of its control.** With `pointer-events: none`, and painted below the track, box or circle, the input was covered — a test tool that clicks the control by its role (`getByRole('switch').click()`, `check()` in Playwright) found something else at the spot and timed out, and a pointer reached the input only by way of the label. It now has `z-index: 1` and takes the click itself. It covers exactly the track (52 × 30) or the box and circle (24 × 24), left to right, right to left and next to large text alike (measured offset: 0 px in Chromium and WebKit), and lines up with their first-line offset through the same `lh` margin; without `lh` support it keeps `margin: 0`, as the visuals do. The label text — a link in a consent label included — stays the label's: the link follows and the box stays unticked. Nothing changes visually; docs and showcase render pixel-identical. Found while moving `<glk-toggle>`'s switch role onto its input. (GlassKit Elements [#6](https://github.com/JUNGHERZ/glasskit-elements/issues/6))
- **An empty control label takes no room.** `.glass-toggle__label`, `.glass-checkbox__label` and `.glass-radio__label` are `display: none` while `:empty`, so a switch without text keeps no 12 px gap for one: 52 px wide instead of 64. (GlassKit Elements [#8](https://github.com/JUNGHERZ/glasskit-elements/issues/8))

### Added

- **Right to left.** With `dir="rtl"` on `<html>` or a container, the components mirror. Paddings, insets and borders are logical properties now: label and hint padding, the search icon and the room kept for it, the toast's ×, the tab bar badge, the list dividers, the popover's `--start` and `--end` anchors, the line between modal actions, and the prose list indent and blockquote rule; accordion triggers, list rows, table headers and prose align to the start, `.glass-table__num` to the end. Pairs that must move together sit under `:dir(rtl)` — the select's chevron and its 40 px padding, the toggle's thumb and its travel, the popover's transform origin, the progress fill's gradient (turned with `scale: -1 1`, so its darker end still leads) — so a browser without `:dir()` (Chrome before 120) keeps them left to right instead of splitting them. Left to right nothing moves: docs and showcase render pixel-identical in both themes, apart from the light chevron above. Checked under `dir="rtl"` in Chromium and WebKit: chevron at 16 px from the left with the padding on its side, label and hint padding on the right, search icon on the right, thumb starting right and travelling left, rows without icon with title and divider at 20 px from the right, fill growing from the right. ([#2](https://github.com/JUNGHERZ/GlassKit/issues/2))
- **`--gl-modal-max-width`.** `.glass-modal` was capped by a literal 340 px, so a dialog with a form or a table could not grow on tablet or desktop without overriding the component rule. It reads `var(--gl-modal-max-width, 340px)` now, with the token in the `:root` block: `.settings-dialog { --gl-modal-max-width: 560px; }`. ([#3](https://github.com/JUNGHERZ/GlassKit/issues/3))
- **The modal overlay may be a native `<dialog>`.** Opened with `showModal()`, it lies in the top layer, the page behind it is inert for pointer, keyboard and screen readers, focus moves in and goes back to where it came from, and Escape closes it. `dialog.glass-modal-overlay` undoes the dialog's own box — size, margin, border, colour — keeps a closed dialog hidden (the overlay's `display: flex` would beat the user-agent rule) and makes its `::backdrop` transparent, because the overlay paints the dimmed, blurred layer itself; the `.is-active` fade works as before. While such a dialog is open, everything outside it is inert, a toast included: it is neither clickable nor announced. GlassKit Elements 1.20.0 builds `<glk-modal>` on it. (GlassKit Elements [#5](https://github.com/JUNGHERZ/glasskit-elements/issues/5))

### Documentation

- **Browser support in the README.** It still named Firefox 103 and "full" support elsewhere, but the token derivations use `color-mix()` since 1.11.0: the floor is Chrome and Edge 111, Safari 16.4, Firefox 113, Samsung Internet 22. Three refinements come later and fall back quietly — first-line alignment of toggle, checkbox and radio (`lh`, Firefox 120), the divider of rows without icon (`:has()`, Firefox 121), the right-to-left pairs (`:dir()`, Chrome 120). (GlassKit Elements [#9](https://github.com/JUNGHERZ/glasskit-elements/issues/9) asked for the check.)
- The docs pages counted 31 components and the package description 24; README, SKILL.md and the landing pages say 34, and now all of them do. Docs (English and German) and SKILL.md describe right to left, the dialog overlay, both tokens and the control inputs; `theme-override.css` has an example for the two tokens.

### Compatibility

- Pages under `dir="rtl"` that mirrored GlassKit with their own rules can drop them.
- A pointer click on a toggle, checkbox or radio now targets the input: listeners above it see one `click` (from the input) where they saw two (one from the track, box or circle, one from the input that the label then activated).
- A page that gave the select its own chevron through `background-image` keeps it; setting `--gl-select-chevron` is the simpler way now.

---

## [1.19.1] – 2026-09-26

### Fixed

- **The package ships `glasskit.min.css.map`.** `glasskit.min.css` ends with a `sourceMappingURL` comment, but `files` in package.json did not list the map, so no release had it: jsDelivr and unpkg answered `@jungherz-de/glasskit@1.19.0/glasskit.min.css.map` with a 404, and a browser's developer tools reported a source map they could not load for every page that used the minified sheet from npm or a CDN.
- **`glasskit-styles.js` no longer carries that comment inside its CSS.** The build embedded `glasskit.min.css` as it was, comment included — meaningless in a constructed stylesheet, which has no URL to resolve a map against, and from there it travelled into every GlassKit Elements bundle. The build now cuts it off and fails if it is still there.

### Added

- **`npm run check:package`, in CI and before every publish.** The release workflow runs it before it publishes, so a package that misses a file it points to no longer goes out; it reads the output of npm 10 and npm 12 alike (npm 12, which the release workflow installs, prints an object keyed by package name instead of a list). It packs the package without publishing and fails when an entry point of package.json, `README.md`, `LICENSE`, `CHANGELOG.md`, `SKILL.md`, a stylesheet or a source map named by a shipped file is missing. `SKILL.md` and `CHANGELOG.md` have been in the GlassKit package all along — the check keeps it that way; GlassKit Elements was missing both. The same check as NotionKit's, where the question came up.

---

## [1.19.0] – 2026-09-26

### Added

- **A toast can carry one action and a close button: `.glass-toast__action` and `.glass-toast__close`.** `.glass-toast` knew an icon and a text, so an offer that waits for the user — "A new version · Reload" — had nowhere to go but a banner in the page. `__action` is a small pill in the toast's own tone: primary on a plain toast, the state colour on `--success`, `--error` and `--warning`, drawn from the same `-surface`, `-border` and `-on-surface` tokens as the badges. It lies on a doubled `--gl-state-scrim`, because the toast's glass is lighter than the page — on a single scrim the label sat at the AA threshold (4.43–4.71:1 in the dark theme); on two it reads at 5.46–6.49:1 dark and 4.95–5.18:1 light, measured against the rendered toast on the glass background in every tone. A filled primary button was tried and set aside: white on the default orange reads at 2.3–2.9:1. `__close` is the × at the end (the page supplies its `aria-label`); its icon reads at 5:1 or better. Both keep a 44 px hit area without making the toast taller. A toast with an action may grow wider than 340 px — up to 480 px, on a phone the viewport minus 16 px on each side: the text wraps, the buttons never shrink (measured at 390 px: toast 358 px, action and × inside). (EhrenPfoten, finding 6.)

- **`--gl-toast-top` for the toast's distance from the top.** The toast sat at `var(--gl-space-4xl)` with no hook of its own, so a page with a header had to redefine a spacing token to move it below. `top` now reads `var(--gl-toast-top, var(--gl-space-4xl))` — the same 56 px unless a page sets it; with `viewport-fit=cover` add `env(safe-area-inset-top)`. The toast stays at the top also with an action, which the finding left to GlassKit to decide: one place for every toast, so a short confirmation that briefly replaces a standing offer does not jump from one edge to the other, and at the top it covers neither the tab bar nor a form's last button.

### Changed

- `.glass-toast__icon` sets `stroke: currentColor` as a default the variants override, and has a `::slotted(svg)` twin — so GlassKit Elements' built-in icons take the variant colour and a slotted icon fits. `.glass-toast__text` takes the remaining width and may shrink (`flex: 1 1 auto; min-width: 0`); a toast without an action looks as before.

---

## [1.18.0] – 2026-09-23

### Added

- **A warning tone for badges, and the warning tokens that were missing.** `.glass-badge` came as `--primary`, `--success` and `--error`, while segmented control, date strip, calendar and toast already knew `warning` — and unlike success and error, warning had no tinted-surface tokens at all. A state that waits for someone (a booking to assign, an open item) had to use the neutral badge and looked like a cancelled one. New, in both themes and derived from `--gl-color-warning` like their siblings, so re-colouring the warning colour moves them along:

  | Token | Dark | Light |
  |---|---|---|
  | `--gl-color-warning-surface` | `color-mix(… warning 15%, transparent)` | same |
  | `--gl-color-warning-border` | `color-mix(… warning 30%, transparent)` | same |
  | `--gl-color-warning-on-surface` | `color-mix(… warning 80%, #fff)` | `color-mix(… warning 56%, #000)` |

  `.glass-badge--warning` uses them exactly as `--success` uses its own, and points `--gl-badge-accent` at the warning colour, so an interactive or selected warning chip stays yellow. The ink mixes differ from the siblings' because yellow is light to begin with: it takes less white in the dark theme and more black in the light one. They were measured, not guessed — text against the rendered chip, at four places on the glass background, bare and on a glass card, plain, selected and selected-with-hover, in Chromium. A plain warning badge reads at 6.42:1 (dark) / 4.74:1 (light) on the page background and 4.50:1 / 5.22:1 on a glass card; in every state and place it reads at least as well as `--success`. The dark ink stays saturated enough to tell the warning badge from the primary one, whose text is a pale orange. Compatibility: the tokens and the modifier are new; a page that already referenced the token names — EhrenPfoten's week plan does — now gets them filled, and a brand file that defines its own values still wins. (EhrenPfoten, finding 5.)

---

## [1.17.0] – 2026-09-22

### Added

- **`.glass-segmented--scroll` and `.glass-segmented--wrap` for more options than fit.** The items carry `white-space: nowrap` and the group only `max-width: 100%`, so seven areas as a full-width group on a phone ran past the edge of the group and the last ones could not be reached. `--scroll` keeps one row and lets it scroll sideways — `overflow-x: auto`, the scrollbar hidden, `overscroll-behavior-x: contain`, as on the date strip; `--wrap` breaks it into lines with the same 4 px gap. Both combine with `--full`; without either the row stays one line, as before. The group's 4 px padding keeps the focus ring inside the scroll box at both ends. Measured with seven items in a 320 px frame, Chromium and WebKit: `--full --scroll` scrolls 666 / 318 px with 4 px left at either end, `--wrap` gives three rows inside the frame, the unmodified group is unchanged. `<glk-segmented overflow="scroll" | "wrap">` in GlassKit Elements 1.17.0 sets them. (EhrenPfoten, finding 4.)

### Fixed

- **Date and time fields ran out of their column on iOS.** iOS draws `input[type="date"]` as a native control with a width of its own: `.glass-input` sets `width: 100%`, yet a date field came out wider than its column — alone past the card's edge, two in a row overlapping — an empty one narrower than a filled one, and the value centred where every other field starts at the left. `.glass-input` of type `date`, `time`, `datetime-local` and `month` now drops the native appearance (`appearance: none`), which gives it the column width like any other field; `::-webkit-date-and-time-value` aligns the value to the start, in a rule of its own so a browser that does not know the pseudo-element drops only that. Measured in the iOS 26.3 and 27.0 simulators at 402 px: before, 35 px past the column and 55 px high, two fields in a row overlapping by 23 px; after, flush with the column and 52 px high like a text field. Chromium and WebKit on the desktop render the fields pixel for pixel as before; the picker opens as before. (EhrenPfoten, finding 3, reported from an iPhone.)

- **Several actions in an empty state stuck together.** `.glass-empty__action` had only a top margin, so two buttons — "My bookings" and "Book again" after a booking — sat without a gap, and stacked without one when the width ran out. It is now a centred, wrapping flex row with an 8 px gap; a single action sits exactly where it did (same position and size, measured). (EhrenPfoten, finding 2.)

---

## [1.16.0] – 2026-09-22

### Added

- **Three more blocks from EhrenPfoten: `.glass-date-strip`, `.glass-calendar`, `.glass-image-picker`.** The blocks that waited until real data had settled their shape — the strip and the calendar run in booking (29-day horizon), in the team's day view and for schedule exceptions, the picker in the dog and profile photo upload. Built there in GlassKit style and reviewed here block by block; each arrives as a copy with the deviations named below, and every token they reference is one this sheet declares.

  `.glass-date-strip` is a row of day chips that scrolls sideways: weekday, number and a dot beneath, the chosen chip on the primary surface via `aria-pressed="true"`, `--today` underlined, the scrollbar hidden. Deviations from the project block: the dot's modifiers are tones — `__mark--primary/--success/--warning/--error` — not the project's `--booked/--open/--closed`, so a project decides what a colour means; there is no `--none`, a dot without a tone is transparent (and flex stretch keeps the chips level either way); the chosen chip turns every tone into the ink on primary through `--gl-date-strip-ink`, where the project block painted a white dot even on a chip without a mark; the chip's `--closed` is gone — a day that cannot be chosen is `:disabled` or `aria-disabled="true"`, dimmed like `.glass-segmented__item:disabled`; focus is `--gl-shadow-focus`, not a primary outline, and the strip pads itself 4 px so its own overflow does not clip that ring; `-webkit-overflow-scrolling: touch` is dropped, it has done nothing since iOS 13.

  `.glass-calendar` is one month: title between two round nav buttons, weekday row, 42 square day buttons with up to three dots. Deviations: tones as above (`--gl-calendar-tone` / `--gl-calendar-ink`) instead of `--closed/--override/--booked` — the project's own schedule view had already moved to `error` / `warning` while its block still knew the old names, so those marks rendered green; a day outside the allowed range is `:disabled` or `aria-disabled="true"` rather than a `__day--disabled` class, the second form keeps it focusable for arrow keys; the block is a `role="group"` of buttons named with their full date, not `role="grid"` — a grid demands rows and cells with `aria-selected`, which is not what the styling hangs on; the nav buttons take an SVG chevron (`__nav svg`), like the steps check, so the arrow does not depend on the font; `__title` ellipsises instead of pushing the buttons out.

  `.glass-image-picker` — the project's `.glass-photo-picker`, renamed as proposed because it takes any image, a shelter's logo as much as a dog photo: a 72 px preview plate with the picture or a placeholder icon, `--round` for avatars, a column with `__label`, `__hint` and `__actions`. The actions are ordinary `.glass-btn` buttons; the block brings no button look of its own. Deviations: `__label` is a class of its own, in the look of `.glass-label`; the column has `flex: 1 1 auto` and the label wraps (`overflow-wrap: anywhere`), so a long label never squeezes the plate; the `object-fit` on the plate itself is gone, it did nothing on a `<div>`.

  Checked in Chromium and WebKit, dark and light, with a re-coloured primary: 29 chips in a 320 px frame scroll inside the strip while the page does not; 42 cells in 320 px, 37 px each, no number wraps; a long picker label wraps into three lines and the plate stays 72 px. The blocks sit outside the `[data-theme]` blocks, so `componentsSheet` carries them into every shadow root.

### Fixed

- **A hidden `.glass-btn` stayed visible.** The `hidden` attribute is only a user-agent rule, and the button's `display: flex` beat it, so a button hidden by script stayed on screen; `.glass-btn[hidden] { display: none }` now wins. Found through the image picker's remove button.

---

## [1.15.1] – 2026-09-21

### Fixed

- **`.glass-sheet` read white on white-grey in dark mode.** The panel used `--gl-surface-milk-strong`, which is a *light* plate in both themes — GlassKit pairs the milk surfaces with dark ink (`--gl-color-text-on-light`, the secondary button) — while the sheet set `--gl-color-text`, white in dark mode. The sheet now has the modal's material: the card-glow gradient over heavy blur with `--gl-border-medium`, which the text tokens are made for. Light mode looks as before; dark mode is dark glass with white text. Reported from the showcase phone frames.

- **Overlays inside `.glass-bg` painted below the tab bar.** `.glass-bg > *` carried `z-index: 1`, so every direct child became a stacking context of its own; a modal or sheet overlay inside one of them (`z-index: 1000`) was trapped at level 1 and lost against a tab bar (`900`) that came later in the DOM — visible in the showcase, and the same in any app whose views and tab bar are siblings under `.glass-bg`. `.glass-bg` is now one isolated stacking context (`isolation: isolate`) with the aurora decorations at `z-index: -1`; the children keep `position: relative` without a `z-index`, so they stay above the decorations and no longer form contexts. Overlays now compete by their own `z-index` — sheet and modal (1000) above the tab bar (900), toast (1100) above both. Compatibility: a child that relied on being a stacking context — say a descendant with a negative `z-index` meant to sit behind that child's own background — now resolves against `.glass-bg` instead. No GlassKit component does this.

---

## [1.15.0] – 2026-09-21

### Added

- **Four more blocks from EhrenPfoten: `.glass-segmented`, `.glass-steps`, `.glass-sheet`, `.glass-empty`.** Built there "CSS first, element after" in GlassKit style — BEM, tokens only, checked in both themes — and reviewed here block by block. Each arrives as a copy with the deviations named below; every token they reference is one this sheet declares.

  `.glass-segmented` is a small exclusive choice as one control (traffic light, morning / afternoon, mode): buttons in a `role="group"`, the chosen one marked `aria-pressed="true"` — the styling hangs on that attribute, so state and semantics cannot drift apart. `--full` shares the width. Deviations from the project block: the tone modifiers are `__item--success/--warning/--error` (GlassKit's state names, not `green/yellow/red`), the dot reads a namespaced `--gl-segmented-tone`, and keyboard focus uses `--gl-shadow-focus` like every other GlassKit control instead of a primary outline.

  `.glass-steps` shows progress through a short flow: numbered circles joined by hairlines, done ones on the success surface, the current one in primary. The list is a size container: narrower than 360 px only the current step keeps its label; before that, labels shorten with an ellipsis. That is keyed to the block's width, not the viewport — the thing that made the project's stepper push past the edge of a narrow card. Done steps take an SVG check (`__num svg`), not a text glyph.

  `.glass-sheet` is the bottom sheet — the mobile sibling of `.glass-modal`, and its own block rather than a modifier because layout, entry motion and gesture differ: `.glass-sheet-overlay` fades, the panel rises from the bottom edge, only the top corners are rounded, safe-area padding at the bottom. `[hidden]` beats `display: flex`, so the overlay can leave the layout after `transitionend` instead of idling at opacity 0 with a blur layer; `prefers-reduced-motion: reduce` drops the transitions. `--inline` embeds the panel in the flow. Added over the project block: the `-webkit-backdrop-filter` twin and the font declarations the modal overlay also carries.

  `.glass-empty` is the empty state for lists and result pages: a centred column with a round icon plate (with the `::slotted(svg)` twin), title, short muted text and room for one action.

  Not taken: `.glass-date-strip`, `.glass-calendar` and `.glass-photo-picker` wait for the project's next milestone, when real data has settled their attributes.

---

## [1.14.0] – 2026-09-20

Version numbers realign with GlassKit Elements at 1.14.0 — there is no GlassKit 1.13.0.

### Added

- **Three blocks that came back from a project: `.glass-skeleton`, `.glass-table`, `.glass-prose`.** All three were built in EhrenPfoten in GlassKit style — BEM, tokens only, checked in both themes — and had no counterpart here. Every token they reference is one this sheet declares, so they arrive as copies, not rewrites.

  `.glass-skeleton` stacks shimmer lines standing in for text that has not arrived; the caller sets each line's width, `--title` makes one taller, and the shimmer holds still under `prefers-reduced-motion`.

  `.glass-table` styles a plain `<table>`: hairline rows, a muted header, `__num` for right-aligned tabular figures, `__muted` for secondary cells, and `.glass-table-wrap` to scroll sideways where the columns do not fit. Compared with the project block, the row rules are scoped to `tbody` and the table sets its own text colour, so it reads the same wherever it lands.

  `.glass-prose` gives rendered Markdown the GlassKit voice with one class on the container: `h1`–`h3`, `p`, lists, links, `code`, `blockquote`, tables — plus, beyond the project block, `pre`, `img` and `hr`, `strong` in heading colour, underlined links (colour alone does not mark a link in running text), and no outer margin on the first and last child so the block sits flush inside a card.

  Table and prose are document-level by design. From a shadow root, `::slotted()` matches only the slotted node itself and never its descendants — a wrapper element could not style a table's cells or a Markdown paragraph. So there is no `<glk-table>` or `<glk-prose>`; put the class on the element in the light DOM.

---

## [1.12.0] – 2026-09-20

### Added

- **Badges can be chips now: `--interactive` and `--selected`.** A badge was already being used as a filter chip — a status row where one entry is picked — but the library offered nothing for it. Projects reached for `variant="primary"` to mark the chosen chip and bolted `cursor: pointer` on from outside, which left the row without a focus ring and without any way to say *which* chip was on.

  `--interactive` carries the affordance: pointer cursor, a hover tint, a focus ring and press feedback. `--selected` says which chip is on.

  ```html
  <button class="glass-badge glass-badge--interactive glass-badge--selected"
          aria-pressed="true">Active</button>
  <button class="glass-badge glass-badge--interactive"
          aria-pressed="false">Applied</button>
  ```

  The classes only paint the chip. Use a real `<button>` and carry the state in `aria-pressed`, so the row is operable by keyboard and announced as a toggle.

- **`--selected` deepens the badge's own colour instead of overruling it.** Each variant points a new `--gl-badge-accent` at its own colour, so `glass-badge--success glass-badge--selected` stays green and a plain badge borrows the primary — which is what a neutral filter row wants. Set `--gl-badge-accent` on a single badge to give one chip a colour of its own.

  Both states paint through a full-bleed inset shadow rather than `background`. The variants put a gradient there, and a hover rule that touched `background` would wipe it along with the `--gl-state-scrim` layer that keeps the label readable over any backdrop.

### Fixed

- **The German pages said v1.10.0.** `de/index.html`, `de/docs.html` and `de/showcase.html` were never re-labelled for 1.11.0 — their content had kept up, the version badge had not. `check-versions.mjs` only walks the English pages, which is why nothing caught it.

---

## [1.11.0] – 2026-08-17

### Fixed

- **Re-branding left the warm glow, the warm rim and the focus ring amber.** Four
  tokens named a *role* — the halo under the primary button, the rim of a filled
  control, the keyboard focus ring — but held a fixed amber value. Setting
  `--gl-color-primary: #0f9b8e` produced a teal button with an orange halo and an
  amber focus ring in an otherwise teal interface. The focus ring is not a cosmetic
  detail: it is the only feedback keyboard users get, and it has to belong to the
  action colour.

  All four are now mixed from `--gl-color-primary`, the way
  `--gl-color-primary-surface` already was:

  | Token | pre-1.11.0 (dark) | now |
  |---|---|---|
  | `--gl-border-warm` | `rgba(255, 200, 100, .35)` | `color-mix(… primary 68%, #fff … 35%, transparent)` |
  | `--gl-border-focus` | `rgba(245, 166, 35, .60)` | `color-mix(… primary 60%, transparent)` |
  | `--gl-shadow-btn-primary` | `0 6px 24px rgba(230, 130, 40, .35)` | `… color-mix(… primary-mid 35%, transparent)` |
  | `--gl-shadow-focus` | `0 0 0 3px rgba(245, 166, 35, .3)` | `0 0 0 3px color-mix(… primary 30%, transparent)` |

  Light mode used `rgba(232, 133, 45, …)` for all four; those were already the light
  primary at 30 / 50 / 25 / 25 % alpha, so the light values are reproduced **exactly**.

- **Two more places the report did not name.** `--gl-color-primary-mid` was a fixed
  `#e07a24`, so a re-branded primary button rendered as a teal→**orange**→teal
  gradient. It is now mixed from `--gl-color-primary` and `--gl-color-primary-dark`.
  The range slider thumb carried `rgba(230,130,40,0.35)` inline in
  `::-webkit-slider-thumb` and `::-moz-range-thumb` — not even as a token, so no
  project could override it at all. Both now follow the primary.

  Re-branding is therefore down to **two declarations**:

  ```css
  :root { --gl-color-primary: #0f9b8e; --gl-color-primary-dark: #0a7d72; }
  ```

  Note the derivation happens where the token is *declared*, on `:root`. Brand
  tokens set on a subtree do not reach it — that was true before and is unchanged.

- **Checkbox, radio and toggle centred their control on multi-line labels.** All
  three used `align-items: center`. With a single-line label that is right; with a
  consent label over four lines the box drifted to the middle of the text block.
  Measured at 390 px width, four lines: the box centre sat **27 px** below the
  centre of the first line — level with the third line, reading as a box that
  belongs to nothing.

  They now align on the **first line**. Control and label each carry a
  `max(0px, calc((1lh - 24px) / 2))`-style offset, so whichever of the two is
  shorter gets nudged and exactly one is ever non-zero. Measured after: **0 px**
  deviation for checkbox, radio and toggle across `line-height` `normal`, `1.5`,
  `1.6`, `10px` and `40px`.

  For a **single-line** label this is pixel-identical to before — same 24 px (30 px
  for the toggle) row height, same box position, same text position. Nothing to
  migrate.

### Why no `--gl-checkbox-align` token and no `--multiline` modifier

Both were proposed. Neither is carried: the fix leaves single-line labels
untouched, so there is nothing to opt out of, and a token would only let a project
re-introduce the misalignment. It would also have to come in pairs — the alignment
and the offset would have to be switched together, or the label picks up a stray
3 px. One correct default beats two tokens that must agree.

### Compatibility

No class was renamed or removed, no token changed meaning, and the delivery stays
build-free. With the default palette the derived values reproduce the old ones
**exactly** in light mode, and in dark mode within 4/255 on the worst channel after
compositing (`--gl-color-primary-mid` 4, `--gl-border-warm` 2, both focus tokens 0) —
the shift exists on paper, not on screen. `lh` needs Chrome 109 / Safari 16.4 / Firefox 120;
where it is missing the whole declaration is dropped and the control sits at the top
of the label, still far closer than the old 27 px.

---

## [1.10.0] – 2026-08-17

### Fixed

- **Icon rules never reached icons passed into a web component.** Rules like
  `.glass-btn svg { width: 20px; … }` are descendant selectors. When this sheet is
  adopted into a shadow root — as GlassKit Elements does — an icon handed in from the
  outside stays in the light DOM and is no descendant of anything in the shadow tree.
  The rule cannot match it. Only `::slotted()` can.

  Nothing errors and nothing warns; the component just renders without a usable icon.
  Measured before the fix, icons passed to the elements:

  | | before | after |
  |---|---|---|
  | `glk-button` | **1210×1210** | 20×20 |
  | `glk-tab-accessory` | 54×54 | 22×22 |
  | `glk-list-item` leading | 28×28 | 24×24 |
  | `glk-list-item` leading, `leading-lg` | 28×28 | 32×32 |
  | `glk-list-item` trailing | 0×0 | 18×18 |
  | `glk-status` | 0×0 | 20×20 |
  | `glk-pill` | 32×32 | 20×20 |

  Seventeen rules gained a `::slotted()` twin, listed next to the original so the two
  stay in sync:

  ```css
  .glass-btn svg,
  .glass-btn ::slotted(svg) { … }
  ```

  In the document `::slotted()` matches nothing, so plain `.glass-*` markup is
  unaffected — verified: a light-DOM `.glass-btn` icon still measures 20×20.

  Components that build their icon inside the shadow tree are untouched, because their
  icons were always real descendants: the checkbox tick, the accordion chevron, and
  `glk-tab-item`, which clones the SVG into its shadow root.

### Why the reported fix could not be applied as proposed

The finding suggested adding `::slotted()` rules to the *element* stylesheets, and
described that as sufficient. Two things stood in the way:

1. **`::slotted()` only ever matches the assigned node itself, never inside it.** An icon
   wrapped in a container — `<span slot="leading"><svg …></span>` — cannot be styled from
   the shadow root at all; the assigned node is the `<span>`. This is a limit of the
   platform, not of GlassKit. Measured: wrapped icons stay 0×0 even after the fix.
   Passing the `<svg>` directly, as the documentation shows, works.
2. **The rules belong here, not in the elements.** `.glass-btn--primary`, `--secondary`
   and `--tertiary` each carry their own icon rule, as do the four accessory variants.
   Restating them in a second project would duplicate GlassKit's cascade and let the two
   drift apart. Written as a twin selector next to the original, they cannot.

The proposed rule was also missing `stroke: currentColor`. With `fill: none` and no
stroke, an icon that does not carry its own presentation attributes renders invisible.
The twins inherit the full declaration block instead, so this cannot happen.

### Compatibility

A project that already sizes these icons itself keeps winning: for slotted content, the
outer tree's rules take precedence over `::slotted()` from the shadow tree. Verified —
with a project rule in place, `stroke-width` resolves to the project's `7px` rather than
GlassKit's `2px`.

Note that `.glass-list__leading` is a fixed 28×28 flex container. Enlarging only the icon
shrinks it back on the main axis; size the container too.

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

[1.22.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.22.1
[1.22.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.22.0
[1.21.2]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.21.2
[1.21.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.21.1
[1.21.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.21.0
[1.20.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.20.0
[1.19.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.19.1
[1.19.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.19.0
[1.18.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.18.0
[1.17.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.17.0
[1.16.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.16.0
[1.15.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.15.1
[1.15.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.15.0
[1.14.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.14.0
[1.12.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.12.0
[1.11.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.11.0
[1.10.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.10.0
[1.9.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.9.0
[1.7.1]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.7.1
[1.7.0]: https://github.com/JUNGHERZ/GlassKit/releases/tag/v1.7.0
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
[Unreleased]: https://github.com/JUNGHERZ/GlassKit/compare/v1.22.1...HEAD
