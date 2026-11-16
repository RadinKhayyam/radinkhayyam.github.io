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

Photos in `public/images/` are WebP at up to 1600px with 600px alternatives. The About portrait has 600, 900, 1200 and 1600px variants at WebP quality 82. These come from the full-resolution `casual.jpg`, with EXIF orientation applied before a 1980×2640 crop at left 398 / top 180 (about 1.4×). The 3:4 image includes the full seated pose, steps, grass and part of the lit fence; CSS displays the complete crop at the existing size. The university SVG logos are the supplied originals. Wix Madefor Display and Text are self-hosted. `src/styles/dusk-tokens.css` holds the shared theme.

All JavaScript motion shares one visibility-aware requestAnimationFrame scheduler in `src/scripts/motion.js`. The home canvases pause offscreen and in hidden tabs, and respect both the visible pause control and reduced-motion changes. Reduced motion shows a completed race. The race has arrow-key and Enter controls, plus a restart button. All copy, native mobile navigation, project cards and a finished-race image remain available without JavaScript.

## Motion and navigation

Astro ClientRouter uses soft page fades. `src/scripts/site.js` mounts each page on `astro:page-load` and disposes its observers, listeners, animations and Lenis instance on `astro:before-swap`. The race and backdrop return explicit cleanup functions. Lenis is enabled for fine-pointer devices outside Sport; Sport keeps native scrolling and its desktop proximity snap, and touch devices keep native scrolling. Astro owns native anchor navigation and history, retaining hash targets, scroll offsets and focus behavior.

`src/scripts/page-effects.js` handles staggered IntersectionObserver reveals, the scroll-drawn timeline and persistent pins, desktop sticky dates, and counters. Chapter photos translate as complete frames by at most 4px inside 4px of padding; there is no scale or image crop. Counter final text is server-rendered and reserves its own width, while the temporary animated text is hidden from assistive technology. Reduced motion removes all of these effects and shows final values, a full timeline and lit pins. JavaScript-disabled pages remain visible.

## Verification

Run `npm run build`, then `npm run preview`. Check all six routes at 1440px and 390px for horizontal overflow and browser console errors. Confirm the About portrait shows its full 3:4 crop, timeline progress and desktop sticky dates track the chapters, and the shared background stays subtle. Navigate Home → Research → Sport → Home through links and confirm both canvases restart without errors or accumulating animation loops. Also check mobile navigation, project filters, keyboard controls and reduced motion.

Normal installs and builds use the optimized assets already in this repository. One-off preparation and review scripts are not required.
