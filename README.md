# IG prop site

Interactive Instagram-style prop for a music video. Static site (real-pixel screens)
served by a tiny zero-dependency Node server that binds to `PORT`.

## Run locally
```
npm start
```
Then open http://localhost:8080

## Deploy on Railway
Railway auto-detects Node (via `package.json`) and runs `npm start`, binding to `$PORT`.
1. Create a new project on Railway and "Deploy from GitHub repo" -> pick this repo.
2. Railway builds and gives you a public URL. Open it on your phone -> Add to Home Screen -> record.

## Swap the home-feed video
Replace `screens/promo_placeholder.mp4` with your own MP4 (keep the same name), commit, push.
Railway redeploys automatically.

## Flow
Home feed -> tap profile (bottom-right) -> Profile -> tap "Professional dashboard"
-> Dashboard -> tap the arrow on the Insights row -> Insights (Overview / Audience).
