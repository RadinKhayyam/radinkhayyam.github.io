# Product

<!-- impeccable:product-schema 1 -->

The interview for this record was not held live. This run is unattended, and the commissioning brief already answered the product questions. Facts below are from that brief and from `cv/Radin_Khayyam_CV.tex`. Nothing here is an invented metric, quote, or result.

## Platform

web

## Stack

Astro, static output, TypeScript. Deployed to GitHub Pages from GitHub Actions on every push to `main`, at the site root (`https://radinkhayyam.github.io/`).

## Users

Researchers, collaborators, and people considering him for academic work. They arrive to see whether the research is serious, then to find the paper, the projects, and a way to write. A smaller audience wants the notes and, later, the photographs.

## Product Purpose

A personal site whose main direction is AI research. Success is that a visitor leaves thinking of learning theory first, with applications of AI as the second track, and can reach the CV, the ICBME paper, and email without a pitch.

## Positioning

Sharif University of Technology, then Koç University. Primary research is learning theory with Prof. Zafer Doğan in the MLIP group: generalization, classical theory beside modern deep models, and learning from structured data rather than idealized i.i.d. samples. That work is ongoing. There is no paper, result, or title to invent for it.

The second track is applications of AI: recommender systems and personalized AI, and biomedical signal processing, which connects to the EEG and brain-computer interface work. Solico Group is applied machine learning and language-model systems on this track, not the centre of the site.

The athletic past is supporting life context only. It is not a headline and not a hero. It appears in the reserved Story page, in the Photos gallery, and in one short line on About.

## Operating Context

He is an MSc student in artificial intelligence at Koç University, Istanbul (October 2026 to present), on the Koç University Presidential Fellowship. BSc in electrical engineering at Sharif University of Technology, Tehran (2020 to 2025), GPA 18.08/20. Former AI engineer at Solico Group (August 2025 to September 2026). The public CV PDF is compiled from `cv/Radin_Khayyam_CV.tex`.

## Capabilities and Constraints

Pages: Home, About, Research, Projects, Writing (Markdown and MDX, with RSS), Photos, CV, and a reserved Story route. Story is built, `noindex`, and out of the nav and the sitemap until `storyInNav` in `src/data/story.ts` is set true.

Dark is the only theme. No phone number anywhere, including the public PDF. Do not list the 2025 PhD offers. Do not feature high-school details. Always write Solico Group, never Solico alone. No politics. No invented achievements, metrics, testimonials, or quotes. A Greece (Young Olympic Ambassadors) note and a real photo set are expected later; do not block on them, and keep the designed photo placeholders until those files arrive.

Contact: radinkhayyam@gmail.com, GitHub, LinkedIn, X, Google Scholar. No phone.

## Brand Commitments

Voice is semi-formal, a little technical, first person allowed, tight and honest. Research leads. The home screen is a neural field with one frosted panel of identity, not an animation by itself. Inner pages read like a lab notebook: hairline rules, no spectacle.

## Evidence on Hand

- Academic CV source: `cv/Radin_Khayyam_CV.tex`
- Public PDF, phone removed: `public/cv/Radin_Khayyam_CV.pdf`
- Headshot, approved: `src/assets/portrait/radin-khayyam.png`
- ICBME 2024 paper and public slides, linked from the CV
- Solico Group work, as described in the CV
- Sports CV, external Drive file, linked from the one About line, not hosted here
- Photo frames in `src/assets/photos/` are designed placeholders, not photographs

Absent, and not to be fabricated: advisor quotes, testimonials, research results for the MSc, PhD-offer copy, a phone number, real photographs beyond the headshot.

## Product Principles

- Research is the page. Learning theory is the primary track and is described as current work.
- Applications stay in balance. Recommender systems are one named interest, not the subject of the site.
- Say only what the CV or the brief supports.
- The athletic record shows range. It does not lead.
- The home network is data, so a later timeline can hang milestones on the same nodes.

## Accessibility & Inclusion

Readable contrast on the dark ground, keyboard access, visible focus, alt text, and a static network when motion is reduced.
