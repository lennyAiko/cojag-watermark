# Watermark Bench

Stamp a logo across a batch of photos, preview it live, and export everything as a ZIP — entirely in your browser. No uploads, no server, no tracking. All image processing happens client-side on an HTML canvas.

Built with React 19, Rsbuild, and Tailwind CSS v4. Installable as a Progressive Web App and works offline.

## Features

- **Batch watermarking** — drop in a mix of portrait and landscape photos at once.
- **Live canvas preview** — every setting applies instantly to the active image.
- **Flexible placement** — 9-point position grid or a repeating tiled pattern.
- **Fine controls** — logo size (% of width), edge padding, opacity, and rotation.
- **Color presets** — Lightroom-style looks (Vivid, Matte, B&W, Noir, Vintage, Teal & Orange, Golden, Arctic, and more) with a per-image intensity slider, plus one-click "Apply look to all".
- **Manual adjustments** — per-image temperature, tint, brightness, contrast, highlights, shadows, vibrance, and saturation, stacked on top of the chosen preset.
- **One-click export** — renders each photo to PNG and packs them into a ZIP with a dependency-free writer.
- **100% local** — images never leave the device.
- **Installable & offline** — PWA with a service worker that caches the app shell.

## Getting started

Install dependencies:

```bash
npm install
```

Start the dev server (available at http://localhost:3000):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

> The service worker is only active in a production build (`npm run build` + `npm run preview`), not in dev.

## Usage

1. **Add a logo** in the left rail (PNG with transparency works best).
2. **Add images** by dropping them onto the preview or the "Add images" zone.
3. **Adjust** layout, size, padding, opacity, and rotation — the preview updates live.
4. **Pick a preset** and set its intensity, then fine-tune with manual adjustments (temperature, tint, brightness, contrast, highlights, shadows, vibrance, saturation) — all per image. Use **Apply look to all** to copy the full look across the batch.
5. **Download all** to export a ZIP of watermarked PNGs (each image keeps its own look; the logo is never color-graded).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Project structure

```
src/
  App.jsx                      # Renders <WatermarkStudio/>
  App.css                      # Tailwind v4 theme tokens + global styles
  registerServiceWorker.js     # PWA service worker registration
  lib/
    zip.js                     # Dependency-free ZIP writer (STORE)
    watermark.js               # Positions, image loading, canvas compositing
    presets.js                 # Lightroom-style color presets + filter builder
    adjustments.js             # Manual per-image adjustments (temp, tint, tone, etc.)
  hooks/
    useWatermarkStudio.js      # State + upload/remove/download logic
  components/
    WatermarkStudio.jsx        # Top-level composition
    layout/Header.jsx
    ui/                        # Label, Button, Slider, Dropzone
    controls/                  # WatermarkRail, EffectsRail, LogoPanel, PositionPicker, PresetPicker, AdjustmentSliders
    preview/                   # PreviewStage, BatchBar, ThumbnailStrip, NavButton
public/
  manifest.webmanifest         # PWA manifest
  sw.js                        # Service worker (app-shell cache)
  favicon.png                  # App icon
```

## Tech stack

- [React 19](https://react.dev) with the React Compiler
- [Rsbuild](https://rsbuild.rs) (Rspack-based bundler)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) icons

## License

[MIT](./LICENSE) © 2026 Lennox Charles
