# AuraNet

A tiny offline-first **activity logger + aura map** (static site). Everything is saved locally in your browser (`localStorage`).

## Features

- Activity logger: enter what you’re doing, each activity deterministically generates a unique hex color.
- Long-term aura: blends your history using repetition/recency weighting + donut chart breakdown.
- Paper sketch map: paper texture + simulated street activity.
- Privacy by default: auras are blurred/quantized for sharing; `My location` centers you precisely (local-only view).
- Visibility modes: `Everyone`, `Specific area` (10–500m), `Approved aura` (allowlist + room join UI).
- Task marketplace demo: post tasks with time + distance limits; verified workers accept; a tether line connects auras until completion.
- Google login (optional): sign in with Google Identity Services when `web/firebase-config.js` is configured.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://127.0.0.1:5173`.

### Enable Google Login (minimum setup)

1. In Google Cloud Console, create an OAuth 2.0 **Web application** client ID.
2. Add your origins in the client settings:
   - local dev: `http://127.0.0.1:5173`
   - production: `https://okok147.github.io`
3. Copy `web/firebase-config.example.js` to `web/firebase-config.js` and fill `googleClientId`.

`web/firebase-config.js` is gitignored and should stay local-only.

## Deploy (GitHub Pages)

Pushing to `main` triggers the GitHub Pages workflow (deploys the `web/` folder).

Expected URL:
- `https://okok147.github.io/AuraNet/`
