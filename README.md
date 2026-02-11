# AuraNet

A tiny offline-first **activity logger + aura map** (static site). Everything is saved locally in your browser (`localStorage`).

## Features

- Activity logger: enter what you’re doing, each activity deterministically generates a unique hex color.
- Long-term aura: blends your history using repetition/recency weighting + donut chart breakdown.
- Paper sketch map: paper texture + simulated street activity.
- Privacy by default: auras are blurred/quantized for sharing; `My location` centers you precisely (local-only view).
- Visibility modes: `Everyone`, `Specific area` (10–500m), `Approved aura` (allowlist + room join UI).
- Task marketplace demo: post tasks with time + distance limits; verified workers accept; a tether line connects auras until completion.
- Firebase login (optional): sign in with Google via Firebase Auth when `web/firebase-config.js` is configured.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://127.0.0.1:5173`.

### Enable Firebase Google Login (minimum setup)

1. In [Firebase Console](https://console.firebase.google.com), create/select a project.
2. In `Authentication` -> `Sign-in method`, enable `Google`.
3. In `Project settings` -> `Your apps`, create a `Web app` and copy the Firebase config values.
4. Add authorized domains:
   - local dev: `127.0.0.1`
   - production: `okok147.github.io`
5. Copy `web/firebase-config.example.js` to `web/firebase-config.js` and fill the values (`apiKey`, `authDomain`, `projectId`, `appId`).

`web/firebase-config.js` is gitignored and should stay local-only.

## Deploy (GitHub Pages)

Pushing to `main` triggers the GitHub Pages workflow (deploys the `web/` folder).

Expected URL:
- `https://okok147.github.io/AuraNet/`
