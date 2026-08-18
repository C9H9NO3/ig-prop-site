# `/new` screenshot crop (last working version)

Use this whenever replacing `n_home.png`, `n_profile.png`, or `n_dash.png`.

## Source files

Full iPhone screenshots, **not** Cursor chat attachments.

- Size: **1290 × 2796** (iPhone 15/16 Pro Max @3x, 430 × 932 points)
- Chat uploads get resized to ~472 × 1024 and keep the clock/battery. Always pull from a folder of the original PNGs instead.

## What the last working set did

Do **not** slice height or shift the IG chrome.

The live PWA uses `black-translucent` status bar, so iOS draws the real time/battery on top of the image. If the screenshot still has the clock and battery baked in, you get a double status bar.

1. Keep the full 1290 × 2796 frame.
2. Paint the top **177 px** (59pt × 3, Dynamic Island `safe-area-inset-top`) with the dark gap color sampled from row ~150 of that same screenshot.
3. Leave everything below that alone (IG header, nav, home indicator).
4. Save as RGB PNG to:
   - `screens/n_home.png`
   - `screens/n_profile.png`
   - `screens/n_dash.png`

After swapping images, bump `?v=` in `new.html` and `CACHE` in `sw.js`.

## Insights Overview + Audience stitch

Dashboard **Views** opens Insights (`goInsights()`). Tabs swap header+body PNGs. Keep the live Overview SVG (`#viewsGraph`); punch a hole in the Overview body so the baked-in line is gone. Do not edit the Audience growth graph.

Sources are scaled to width **1290** (folder shots are not always 1290×2796). Filename order is scroll order: `overview1` top → `overview3` bottom, `audience1` top → `audience4` bottom. Paint the top **177 px** of each shot before cropping.

### Overview

1. Header is `overview1`, `y = 0 … 430` (through the Overview tab underline) → `insights_overview_header2.png`.
2. Body, sticky chrome skipped on later shots:
   - `overview1` `y = 430 … 2448` (through the Stories label)
   - cloned Posts `0`-bar `y = 2321 … 2412` (Stories bar is clipped off the bottom of overview1)
   - `overview2` `y = 480 … 2260`
   - `overview3` `y = 1820 … height-8` (keep the empty pad under Profile activity)
   → `insights_overview_full.png` (1290×4856)
3. Paint the line-chart hole at body `y = 766 … 1296` (matches SVG viewBox 1290×530). Overlay CSS: `top:15.7743%; height:10.9143%`.

### Audience

1. Header is `audience1`, `y = 0 … 462` (through the Audience tab underline) → `insights_audience_header2.png`.
2. Body:
   - `audience1` `y = 462 … 2320` (through top content by follows)
   - `audience2` `y = 462 … 2210` (Gender + age, stop before Top locations)
   - `audience3` `y = 500 … 1575` (Top locations / countries)
   - `audience4` `y = 1020 … content end` (Follower active times)
   → `insights_audience_full.png` (1290×6371)
