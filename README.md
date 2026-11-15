# radinkhayyam.github.io

Personal site of Radin Khayyam. Static [Astro](https://astro.build) site, deployed to [https://radinkhayyam.github.io/](https://radinkhayyam.github.io/) by GitHub Actions on every push to `main`.

## Local development

```bash
npm install
npm run dev
```

`npm run build` writes the site to `dist/`. `npm run preview` serves that build.

## Add a blog post

Create `src/content/writing/<slug>.md` or `.mdx`.

```yaml
---
title: A precise title
description: One or two sentences for the index, RSS, and the social card.
date: 2026-11-15
draft: false
placeholder: false
---
```

- `draft: true` hides the post from the index, the RSS feed, and the production build. Drafts still show while you run `npm run dev`.
- `placeholder: true` prints a deletion note on the post. The welcome post uses it. Delete `src/content/writing/welcome.md` when a real note replaces it.
- The URL is `/writing/<slug>`, where `<slug>` is the filename without the extension.

## Add photos

1. Put the file in `src/assets/photos/`. JPEG or PNG, about 1600px on the long edge, sRGB.
2. Import it in `src/data/photos.ts` and append an entry:

| Field | Meaning |
| --- | --- |
| `src` | The imported file. Astro resizes it. |
| `album` | `Table tennis` or `Life & travel`. Add a new name to the `albums` array to open another album. |
| `caption` | The line under the frame. |
| `date` | ISO date (`2024-06-01`), or `null` if you do not want one. |
| `alt` | What the picture shows, for someone who cannot see it. |

The current frames are drawn placeholders. Replace the file and the caption and alt text. Do not use the headshot here. It belongs on About.

## Update the CV

The public PDF is `public/cv/Radin_Khayyam_CV.pdf`. The source is `cv/Radin_Khayyam_CV.tex`.

Edit the tex, then compile with [Tectonic](https://tectonic-typesetting.github.io/) (or another engine that provides `moderncv` and `fontawesome5`) and replace the PDF:

```bash
tectonic cv/Radin_Khayyam_CV.tex --outdir public/cv
```

Do not put a phone number back into the tex or anywhere else on the site. The contact line keeps the email only. Leave the supporting Drive links as they are.

The sports CV is not in this repo. About links to the existing Drive file. Do not promote the athletic record into a headline or the home page. It belongs in Photos, in the reserved Story page, and in that one line on About.

## Story

`/story` is reserved for a later timeline from the national teams to the lab. It is built, marked `noindex`, and left out of the nav and the sitemap.

`src/data/story.ts` exports `storyInNav`. Set it to `true` when the timeline should be linked and indexed, and replace the copy in `src/pages/story.astro`.

The home network reads `src/data/network.ts`. A node may carry `milestone.title`, `milestone.when`, `milestone.href`, and `milestone.note`. The canvas does not show those fields yet. They are there so the same graph can open the timeline later.
