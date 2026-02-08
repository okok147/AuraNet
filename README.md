# AuraNet Paper Map

A static map-focused web app that fetches marker data and presents the map with a paper-like texture treatment.

## Features

- Interactive map rendering with Leaflet + OpenStreetMap tiles
- Runtime fetch of location data from `data/locations.json`
- Parchment-inspired UI with grain overlay, vignette, and muted cartography
- GitHub Pages workflow for automated hosting from `main`

## Local preview

Run any static server from this directory, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy on GitHub Pages

1. Push `main` to a GitHub repository.
2. In repo settings, set `Pages` source to `GitHub Actions`.
3. The included workflow (`.github/workflows/deploy.yml`) deploys automatically on each push to `main`.
