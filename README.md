# Radin Khayyam

Static Astro personal site, rebuilt from the approved Hallmark Dusk H1 / D2 mockups and `src/data/copy.json`.

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

Pages import approved text directly from `src/data/copy.json`. Editorial photo notes and confirmation notes are excluded. Keep the source text verbatim.

Photos in `public/images/` are WebP at up to 1600px with 600px alternatives. The full About portrait has 600, 900, 1200 and 1600px variants, generated with EXIF orientation applied at quality 82; its responsive sizing preserves the uncropped image. The university SVG logos are the supplied originals. Wix Madefor Display and Text are self-hosted. `src/styles/dusk-tokens.css` holds the shared theme.

The home canvases use one visibility-aware animation loop each, pause offscreen and in hidden tabs, and respect both the visible pause control and reduced-motion changes. Reduced motion shows a completed race. The race has arrow-key and Enter controls, plus a restart button. All copy, native mobile navigation, project cards and a finished-race image remain available without JavaScript.

## Verification

Run `npm run build`, then `npm run preview`. Check all six routes at 1440px and 390px for horizontal overflow and browser console errors. Confirm the About portrait remains uncropped, timeline dates and pins remain visible, and the shared background stays subtle. Also check mobile navigation, project filters, keyboard controls and reduced motion.

Normal installs and builds use the optimized assets already in this repository. One-off preparation and review scripts are not required.
