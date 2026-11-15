# Radin Khayyam

Static Astro personal site, rebuilt from the approved Hallmark Dusk H1 / D2 mockups and `content/site-copy.md`.

## Run locally

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The build writes `dist/`. The existing GitHub Pages workflow is unchanged. This rebuild has not been pushed or deployed.

## Structure

- `/`: night-sky hero, interactive 3D optimizer race, About, six story chapters, research interests, teasers and contact.
- `/research/`: theory, applied AI, research experience and publications.
- `/experience/`: industry, teaching and projects with working filters.
- `/sport/`: full-screen table tennis and running chapters, photographs, history and honors.
- `/blog/`: approved empty state; `src/content/blog/` is an empty Astro collection for future posts.
- `/404.html`: custom error page.

Old routes have been removed. Header and hero links download `public/cv/Radin_Khayyam_CV.pdf`.

## Content and assets

Approved text is in `content/site-copy.md`; `python3 scripts/import-copy.py` refreshes `src/data/copy.json`. Editorial photo notes and confirmation notes are excluded. Keep the source text verbatim.

Photos in `public/images/` are WebP at up to 1600px with 600px alternatives, generated with Sharp at quality 80. The university SVG logos are the supplied originals. Wix Madefor Display and Text are self-hosted. `src/styles/dusk-tokens.css` holds the shared theme.

The home canvases use one visibility-aware animation loop each, pause offscreen and in hidden tabs, and respect both the visible pause control and reduced-motion changes. Reduced motion shows a completed race. The race has arrow-key and Enter controls, plus a restart button. All copy, native mobile navigation, project cards and a finished-race image remain available without JavaScript.

## Verification

With the dev server running and Chrome installed:

```sh
node scripts/verify.mjs
node scripts/capture-review.mjs
```

Verification covers routes at 1440px, 390px and 320px, accessibility, approved narrative copy, mobile navigation, filters, keyboard interaction, reduced motion, pause and offscreen behavior. `scripts/generate-preview-assets.mjs` captures the finished race and Dusk Open Graph image from the real page, and generates the SVG/PNG favicon pair.

The original photo inputs referenced by `scripts/prepare-images.mjs` are external handoff paths. Normal installs and builds need only the optimized assets already in this repository.
