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

Sources are scaled to width **1290** (folder shots are not always 1290×2796). Filename order is scroll order: `overview1` top → `overview3` bottom, `audience1` top → `audience4` bottom. Paint the top **177 px** of each shot before cropping. Overview also uses a later full-frame shot of Views by content type (folder `(5)`, `CCAFA001-…png`) so those four rows are not split across `overview1`/`overview2`. Audience Follows tiles come from folder `(8)` `1B631F16-…png`. The Insights header stays pinned by making `#s-insights` a `100dvh` flex column and scrolling `#insScroller` (CSS sticky does not work under `overflow-x:hidden` on `#app`).

### Overview

1. Header is `overview1`, `y = 0 … 430` (through the Overview tab underline) → `insights_overview_header2.png`.
2. Body, sticky chrome skipped on later shots:
   - `overview1` `y = 430 … 2080` (through Viewers + the gap, stop before that shot’s own legend — its Stories bar is clipped)
   - new full-frame shot `CCAFA001-…png` `y = 480 … 2750` (legend + all four content-type rows + Top content + Interactions)
   - `overview3` `y = 1820 … height-8` (keep the empty pad under Profile activity)
   → `insights_overview_full.png` (1290×4887)
3. Paint the line-chart hole at body `y = 766 … 1296` (matches SVG viewBox 1290×530). Overlay CSS: `top:15.6742%; height:10.8451%`.

### Audience

1. Header is `audience1`, `y = 0 … 462` (through the Audience tab underline) → `insights_audience_header2.png`.
2. Body:
   - `audience1` `y = 462 … 1850` (through follower growth; that shot clips the Follows thumbnail row)
   - `1B631F16-…png` (folder `(8)`) `y = 1180 … 1812` (Top content by follows, full tiles, stop before Gender)
   - `audience2` `y = 498 … 2210` (Gender + age, stop before Top locations)
   - `audience3` `y = 500 … 1575` (Top locations / countries)
   - `audience4` `y = 1020 … content end` (Follower active times)
   → `insights_audience_full.png` (1290×6497)

### Content

Header `insights_content_header2.png` (y 0–462 of folder `(9)` list shot). Body `insights_content_full.png`. Tap Content for the 1.8s skeleton, then the Latest list.

### Reel Insights (Meow meow)

Content’s first row opens a separate screen (`#s-reel`), not the main Insights Overview/Content/Audience chrome. Header + opening body still come from folder `(11)` `1.png` / `2.PNG`. **What impacts your views** and **How long people watched your reel** are replaced from folder `(13)` `2.PNG` and folder `(14)` respectively. Scale non-1290 shots to width 1290. Paint the top **177 px** of each shot. Always cut in empty black, never through text or icons, and never include the same row twice.

1. Header is folder `(11)` `1.png`, `y = 0 … 360` (through Insights title, before thumbnails) → `insights_reel_header.png`.
2. Body:
   - folder `(11)` `1.png` `y = 360 … 1988` (thumbnails + Summary cards)
   - folder `(11)` `2.PNG` `y = 320 …` through Views / Instagram / Facebook (stop in empty before What impacts)
   - folder `(13)` `2.PNG` `y = 360 … 1820` (What impacts heading through Comment rate; **do not** include that shot’s leftover How long heading or its short magenta line)
   - folder `(14)` `C5B42B15-…png` `y = 548 … 2610` (full How long people watched — 100% holds nearly to the end — through Boost this reel; skip sticky header and Comment leftover)
   → `insights_reel_full.png` (1290×6677). After Boost this reel, crop off the screenshot’s home-indicator gradient and append Overview’s empty pad (213 px of the same `#0d1115` under Business address taps) so the last row can scroll clear of the home indicator.
3. Back returns to Insights Content. Do not use the spinner overlay.
