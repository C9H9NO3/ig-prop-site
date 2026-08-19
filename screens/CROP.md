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

Content’s first row opens a separate screen (`#s-reel`), not the main Insights Overview/Content/Audience chrome. Header + top body come from folder `(11)` `1.png`; everything below the Summary cards comes from folder `(15)` (Views over time shot `504982A7-…png` + How-long shot `ADE59549-…png`). Scale non-1290 shots to width 1290. Paint the top **177 px** of each shot. Always cut in empty black, never through text or icons, and never include the same row twice.

1. Header is folder `(11)` `1.png`, `y = 0 … 360` (through Insights title, before thumbnails) → `insights_reel_header.png`.
2. Body:
   - folder `(11)` `1.png` `y = 360 … 1988` (thumbnails + Summary cards) → live `0 … 1628`
   - folder `(15)` `504982A7-…png` `y = 321 … 2714` (Views over time heading, pills, graph 3,579,456 / 3,577,241 / 2,215, What impacts + Skip 27.2% / Share 8.0% / Like 22.1% / Save 0.5%; cut below the Save circle at 2634, above its off-screen rows)
   - folder `(15)` `ADE59549-…png` `y = 318 … 2782` (Comment rate 0.0% row — its circle starts at 336, back-button ends 307 — through How long, Top sources 72/17/8/3, Ad, complete Boost row; stop before the shot’s bottom-edge vignette at ~2783; no home indicator)
   - Append the same shot’s empty bg `y = 2660 … 2782` once more so Boost gets ~274 px of scroll clearance
   - Seams need no feather: label-top pitch Save→Comment locked to 217 px (A cut minus B cut = 2396); all bg tones match within 0.2
   - The How-long shot’s sticky header covers the top 25 px of its Comment-rate circle. Complete it by pasting the Save disk’s top slice (live rows 3797…3831 → 4014…4048); disks share identical x-extents so the graft is seamless
   → `insights_reel_full.png` (1290×6607)
3. Back returns to Insights Content. Do not use the spinner overlay.

### Reel Audience tab (Meow meow)

The reel body’s baked-in tabs row (y 750–890 of `insights_reel_full.png`) switches to `#r-audience` via hotspot; scroll position is kept so the tab row stays put (both bodies share identical thumbnail/stats/tab layout, ±1 px). Sources: folder `(16)` `age1.png` / `age2.png` / `country.png`, scaled to 1290, top 177 px painted. Note their stats row reads 151K/14 while Overview reads 160K/12K (user-supplied data).

1. `insights_reelaud_top.png` (1290×1509) = `age1` `y = 360 … 1869` — thumbnails, stats, tabs (Audience underlined), Who viewed, Audience details heading. Cut 40 px above the pills.
2. `insights_reelaud_age.png` (1290×1409) = `age2` `y = 1369 … 2778` — pills (Age selected) + all seven age rows + natural bottom (trim the bottom-edge dim rows past 2778). `age2` is `age1` scrolled by exactly 500 px.
3. `insights_reelaud_cty.png` (1290×1116) = `country` `y = 1869 … 2790` + that shot’s empty bg `y = 2725 … 2790` tiled ×3 for scroll clearance.
4. Age/Country pill hotspots: bubbles at swap-image y 40–155; Age x 48–213, Country x 237–476. Gender is inert. Swap is instant (`raSel`), no shimmer.

### Reel 2 — Riding with the bro (`#s-reel2`)

Opened from the second Content row (`#reelHot2`, one 172 px row pitch below Meow meow’s hotspot). Same screen pattern as `#s-reel`; header is the shared `insights_reel_header.png`. Sources: folder `(17)`, scaled to 1290, top 177 px painted.

1. `insights_reel2_full.png` (1290×2420) = `Overview.png` `y = 360 … 2780` — one non-scrolling Overview page (stats 57K/144/2.6K/33K/13K, Summary 1,679,719 / 326,576 / 21s / 1694, Views-over-time top). Content ≈ 807 CSS px < the 812 px scroller, so it cannot scroll; the graph cut sits below the fold.
2. `insights_reel2aud_top.png` (1290×1511) = `audence_age_1.png` `y = 360 … 1871` (cut 40 px above the pills at 1911).
3. `insights_reel2aud_age.png` (1290×1416) = `audence_age_2.png` `y = 1464 … 2780` (pills at 1504; full 13-17→65+ list) + that shot’s bg `y = 2680 … 2780` once for clearance.
4. `insights_reel2aud_cty.png` (1290×1149) = `Country.png` `y = 1871 … 2780` (US 45.2 / UK 14.2 / Canada 4.7 / Brazil 2.3 / Australia 1.4) + its bg `y = 2732 … 2780` ×5.
5. Same tab/pill hotspots as reel 1 (`reel2Tab`, `ra2Sel`); Audience-tab cell on the Overview body at y 750–890 of 2420.
