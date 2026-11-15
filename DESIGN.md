---
name: Radin Khayyam
description: A dark research notebook with one frosted window over a neural field.
colors:
  paper: "oklch(16% 0.012 250)"
  paper-2: "oklch(20.5% 0.013 250)"
  paper-3: "oklch(25% 0.014 250)"
  ink: "oklch(95.5% 0.014 95)"
  ink-2: "oklch(88% 0.016 95)"
  muted: "oklch(78% 0.02 95)"
  rule: "oklch(34% 0.016 250)"
  rule-strong: "oklch(52% 0.022 250)"
  accent: "oklch(82% 0.1 168)"
  accent-ink: "oklch(22% 0.04 168)"
  accent-hi: "oklch(88% 0.07 168)"
  focus: "oklch(86% 0.09 168)"
  glass: "oklch(16% 0.014 250 / 0.86)"
  glass-edge: "oklch(96% 0.012 95 / 0.28)"
  network: "oklch(82% 0.1 168)"
  network-dim: "oklch(58% 0.03 230)"
  scrim: "oklch(10% 0.014 250 / 0.72)"
typography:
  display:
    fontFamily: "Newsreader Variable, Iowan Old Style, Palatino, serif"
    fontSize: "clamp(2.5rem, 4vw + 0.5rem, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader Variable, Iowan Old Style, Palatino, serif"
    fontSize: "clamp(2rem, 2vw + 1rem, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader Variable, Iowan Old Style, Palatino, serif"
    fontSize: "clamp(1.25rem, 0.6vw + 1rem, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Figtree Variable, Avenir Next, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Figtree Variable, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  window: "18px"
  control: "8px"
spacing:
  3xs: "2px"
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
  4xl: "144px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hi}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  window:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
    padding: "24px"
---

# Design System: Radin Khayyam

## Overview

**Creative North Star: "The night lab window"**

The site is a research record that happens to have a living diagram on the first screen. The diagram is a feedforward network. One frosted window sits on it and says who he is. Everything after that window is a notebook: hairline rules, a long measure, no spectacle.

The palette is graphite with a warm bone ink and a single celadon signal. Newsreader carries the name and the headings. Figtree carries the reading. Dark is the only theme.

The athletic record is not a visual theme. It does not get a hero, a medal wall, or a second accent.

**Key Characteristics:**

- One dark ground. No light theme and no toggle.
- One frosted window, on Home only. Inner pages are flat and ruled.
- One accent, used for the primary action, focus, and the network’s activation.
- Research copy leads. The network is the picture, not a caption.
- Motion lives on Home, pauses offscreen, and stops when reduced motion is requested.

## Colors

Graphite ground, bone ink, one celadon signal. The signal is the person at work, not a brand gradient.

### Primary

- **Celadon signal** (`oklch(82% 0.1 168)`): the filled button, the focus ring’s cousin, and the lit nodes and traveling activations. Text on the button uses **signal ink** (`oklch(22% 0.04 168)`). Hover lifts the fill to `oklch(88% 0.07 168)`.

### Neutral

- **Graphite** (`oklch(16% 0.012 250)`): the page ground and the nav.
- **Graphite raised** (`oklch(20.5% 0.013 250)`): the open mobile menu, the note, and code blocks.
- **Graphite well** (`oklch(25% 0.014 250)`): a further step, rarely needed.
- **Bone** (`oklch(95.5% 0.014 95)`): headings and body.
- **Bone dim** (`oklch(88% 0.016 95)`): ledes and secondary sentences.
- **Dust** (`oklch(78% 0.02 95)`): dates and captions. It still clears body contrast on graphite.
- **Hairline** (`oklch(34% 0.016 250)`): section rules.
- **Hairline strong** (`oklch(52% 0.022 250)`): portrait edge, menu edge, current-link underline.

### Named Rules

**The one signal rule.** Celadon is the button, the focus color, and the network. It is not a wash behind text and not a second theme.

**The research-first rule.** Do not introduce a sports color, a medal mark, or a hero built from the athletic record.

## Typography

**Display Font:** Newsreader Variable (with Iowan Old Style, Palatino)
**Body Font:** Figtree Variable (with Avenir Next, Segoe UI)

Self-hosted from Fontsource. Two families. No mono costume on labels.

**Character:** Newsreader gives the name a literary weight without a fashion serif. Figtree keeps the notebook readable at 17px.

### Hierarchy

- **Display** (500, clamp 2.5rem to 4.25rem, 1.08): the name on Home, and page titles.
- **Headline** (500, clamp 2rem to 3.25rem, 1.12): section headings.
- **Title** (500, clamp 1.25rem to 1.5rem, 1.25): entry titles inside a section, including the two featured items.
- **Body** (400, 1.0625rem, 1.55): prose, max 65ch.
- **Label** (400, 0.9375rem): dates, captions, the button. Sentence case. No tracking, no small caps.

### Named Rules

**The sentence-case rule.** Nav, buttons, captions, and headings are sentence case. Do not track capitals.

## Layout

The container is 1440px, centered, with 64px gutters (24px below 960px, 16px below 640px). Prose stays at 65ch inside that width, left aligned.

Home is a `100dvh` stage. The nav is a solid graphite strip over the top. The frosted window is left, at most 38rem wide, so the network stays visible to the right. On a narrow screen the window stacks under the nav and the network uses fewer nodes.

Inner sections separate by 144px, and a following section by 176px, with a 1px rule where a list starts. Below 960px those gaps step down with the spacing scale.

## Elevation & Depth

Inner pages are flat. Depth is a change of lightness and a hairline, not a shadow. The home window is the exception: a translucent graphite fill, an 18px blur, and a 1px lit top edge. It does not sit on another glass surface. The lightbox uses a scrim, not a glow.

### Shadow Vocabulary

- **Lit edge** (`inset 0 1px 0 oklch(96% 0.012 95 / 0.28)`): the top edge of the home window only.

### Named Rules

**The flat notebook rule.** Do not add drop shadows to lists, portraits, or sections. The window is the only elevated surface.

## Shapes

The window is 18px. Controls, the menu panel, and photo frames are 8px. Rules are 1px. The portrait is square with a hairline and no radius. The network is circles and straight connections, not an illustration of a brain.

## Components

### Buttons

- **Shape:** 8px radius, 48px tall, 24px horizontal padding.
- **Primary:** celadon fill, signal ink, no underline. One primary style. Home uses it for Email. CV uses it for the download.
- **Hover / Focus:** hover moves to the lighter celadon. Focus is the global 2px focus ring, instant, not animated in.
- **Secondary:** a text link, underlined, not a second filled button.

### Cards / Containers

There is no card system. The home window is the only container. Featured items inside it are separated by a hairline, with no nested panel.

- **Corner style:** 18px on the window only.
- **Background:** glass token.
- **Shadow strategy:** lit top edge only.
- **Border:** 1px hairline.
- **Internal padding:** 24px.

### Navigation

A wordmark and a row of links. No action button in the nav. Current page is an underline in the accent color. Below 960px the links sit in a `details` menu on graphite raised. Sentence case, nowrap.

### Neural field

Full-viewport canvas on Home. Nodes and edges come from `src/data/network.ts`. The cursor lights nearby nodes and a pulse travels toward later layers. Fewer nodes and a tap or ambient pulse on a coarse pointer. Hidden and offscreen canvases stop. Reduced motion shows the static SVG and does not run the loop. Nodes may carry milestone data for a later Story timeline. The canvas does not draw those labels.

### Lightbox

A native dialog. Celadon Close button. Image and caption. Escape closes it.

## Do's and Don'ts

### Do

- **Do** lead with Sharif, then Koç, then learning theory, then applications.
- **Do** keep Solico Group as the full name, inside the applications track.
- **Do** keep the athletic record to Photos, the reserved Story page, and one line on About.
- **Do** use the tokens in `src/styles/tokens.css` for every color and both font families.
- **Do** leave photo placeholders until real photographs are added.

### Don't

- **Don't** add a light theme, a theme toggle, or a purple-to-blue gradient.
- **Don't** put glass on glass, cards inside cards, skill bars, icon grids, or testimonials.
- **Don't** publish a phone number, the PhD offers, or an invented research result.
- **Don't** make table tennis, medals, or Olympia a headline or a home-page element.
- **Don't** name an advisor for the MSc other than Prof. Zafer Doğan.
