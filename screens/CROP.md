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

## Insights Overview (Views) stitch

Dashboard **Views** already opens the existing Insights screen (`goInsights()`). Replace the two Overview PNGs; do not rebuild that page.

Source: numbered 1290 × 2796 shots from an iCloud folder (`1.PNG`, `2.PNG`, `3.PNG`). Content order is **3 → 2 → 1** (3 is the top of the page; 1 is the bottom). Do not stitch 1-2-3 by filename.

1. Paint the top **177 px** of shot 3 (status bar), same as home/profile/dash.
2. Header is shot 3, `y = 0 … 462` (through the Overview tab underline) → `insights_overview_header2.png`.
3. Body is overlap-matched on unique rows (not empty gray bars):
   - shot 3 `y = 462 … 2480`
   - shot 2 `y = 540 … 1890`
   - shot 1 `y = 1350 … ~2609`
   → `insights_overview_full.png`
4. Audience tab still uses the existing `insights_audience_*` pair until new Audience shots arrive.
