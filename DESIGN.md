# Design

The visual system for isaacmartinez.space, called "Informe de análisis". The site reads like a printed analysis report: a light paper ground, serif headings, ruled tables and numbered figures with a source line. The project charts are drawn from each project's real data, so the data does the decorating.

## Tokens (`css/site.css`, `:root`)

| Role | Token | Value |
| --- | --- | --- |
| Ground | `--paper` | `#f5f4f0` |
| Deep ground (scrollbar track) | `--paper-deep` | `#ebe9e2` |
| Text | `--ink` | `#1a1c22` |
| Secondary text | `--ink-2` | `#474b57` |
| Tertiary text, axes | `--ink-3` | `#626674` |
| Hairline rules | `--rule` | `#d4d1c8` |
| Section rules | `--rule-strong` | `#1a1c22` |
| Accent, primary series, links | `--indigo` | `#3d3a9e` (matches the live dashboards) |
| Contrast series | `--ochre` | `#b27a1e`, for data marks only, never for text |
| Reference series | `--series-ref` | `#a19f97` |

Color strategy: restrained. The neutrals do the work. Indigo marks the thing that matters (the model, the cheapest chain, the primary action), and ochre is the counter-series in charts.

## Type

- **Source Serif 4**: headings, lede, figure numbers, and the large contact email.
- **Source Sans 3**: body text, UI and chart labels. `tabular-nums` is on everywhere.
- Scale: `--step--1` through `--step-4`. Display is capped at 4.75rem. Tracking is −0.015 to −0.025em on headings.

## Layout

- `.wrap` caps the page at 1240px, with a fluid gutter.
- Report grid: a margin column (3fr) for metadata, plus a main column (8fr). It collapses to one column below 900px.
- Rules carry the structure; there are no cards. A strong ink rule opens each case and section, and hairlines divide rows.

## Components

- **Figure** (`.fig`): a plate, a readout line (`aria-live`), then a figcaption with "Figura N." and a source line. Charts are SVG drawn by `js/site.js` from `data/figures.json`, at the container's real width.
- **Case entry** (`.case`): a metadata `dl`, title, italic question, summary, links, and a figure.
- **Buttons**: `.btn` is outlined ink and `.btn--primary` is indigo, with a 3px radius.
- **Language toggle** (`.lang`): a segmented ES/EN control with `aria-pressed`.

## Bilingual content

Every visible string appears twice, as `lang="es"` and `lang="en"` siblings. CSS hides whichever doesn't match `<html lang>`. An inline script in `<head>` picks the language before first paint: the saved choice in `localStorage`, otherwise the browser language. The `<html data-title-*>` and `data-desc-*` attributes hold the page title and description for each language.

## Motion

There is one authored moment: chart lines draw in and map dots resolve when a figure first scrolls into view. Elements start visible, and the effect is disabled under `prefers-reduced-motion`.
