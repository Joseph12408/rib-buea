# RIB Buea — first build

**Status: parked in good shape.** Joseph's call — the site is "pretty cool as it
is", to be revisited when we return for updates. Nothing is mid-refactor.

## What we set out to do

Build a website for the Rehabilitation Institute for the Blind, Buea, from seven
photographed pages of the institute's internal technical file. The photographs
arrived out of order; step one was reconstructing the sequence.

Page order established: **5 → 6 → 7 → 8 → 9 → 10 → 11**.

| Page | Content |
|---|---|
| 5 | Presentation, background, history, localisation (start) |
| 6 | Localisation (cont.), missions, organisation |
| 7 | §1 Special Education, §2 School |
| 8 | §3 Health Care, §4 Post-Cure, §5 Vocational, lodging, utilities |
| 9 | Capacity, infrastructure, human resources |
| 10 | Admission modalities, daily activities (Mon–Fri) |
| 11 | Daily activities (cont.), weekends |

## What changed

**Content.** Whole document transcribed into `lib/institute.ts` as the single
source of truth. Editorial decisions left visible in comments rather than made
silently: typo corrections (Fako not "Fake", Daily, Resources), and the file's
"CHALLENGES" lists reframed as fundable asks — which is the document's own stated
purpose ("a clarion call to stakeholders, policymakers and partners to invest").

**Structure, rebuilt once.** The first version followed the document's order,
which is an inventory and argues nothing. Restructured into a ten-beat narrative:
hero → stakes → origin → programme → a day → the place → the people → admission →
support → visit. Headings centred on 2, 3, 5, 6, 7, 9; left on the long or
procedural beats where a centred measure fights the reading.

**Stats moved out of the hero** into beat 7. Statistics answer a question the
reader has not asked in the first two seconds.

**Imagery.** Eight placeholder photographs, one shared grade so eight
photographers read as one set, 560 KB total. `art/fetch-photos.mjs` carries a
`replaceWith` line per image — the photographer's brief for the institute is
already written.

**Motion.** Lenis smooth scroll (not mounted under reduced motion, anchors routed
through it, focus moved with the viewport), framer-motion reveals and parallax,
one GSAP `scrub` on the history rail. Back-to-top routed through Lenis.

## Bugs found, and why

**Built for the wrong audience.** The biggest error of the session. I designed as
though the readers were themselves blind — 18px base size, Atkinson Hyperlegible
justified as a low-vision face, skip link and focus ring described as
load-bearing. The site is *about* an institute for the blind; its readers are
donors, partners, the Ministry and families. Every decision that assumption
touched was revisited. Base size went to 17px as an editorial choice. Atkinson
was kept for a reason that survives — it is the Braille Institute's typeface, a
thematic tie to the subject — and flagged as easy to swap.

Root cause worth remembering: I inferred the audience from the subject matter
instead of asking who the page has to persuade.

**Source document contradicts itself on staff count.** Page 9 states "eighteen
permanent staff"; the roles it then lists sum to nineteen. Printed as 18 (the
institution's own figure) with a visible footnote giving both. A donor may count.
Not ours to silently reconcile.

**Weekend timetable out of sequence.** The source lists "4:00 Nap time" above
"3:00–4:00 Leisure". Shown chronologically with a note on the page.

**Back-to-top listened to the wrong scroll.** It used a `window` scroll listener
while Lenis drives position from its own rAF loop. Now subscribes to Lenis's
scroll, with the window listener as the reduced-motion fallback.

## Still open

- **Mobile has not been done.** Explicitly deferred until the desktop version
  passed the eye test, which it now has. This is the next task.
- **All eight images are placeholders.** Real photographs of the institute would
  be substantially more persuasive; briefs are in `art/fetch-photos.mjs`.
- **No phone or email exists** in the source document. A visible placeholder says
  so rather than inventing one.
- **Fails Gate 1b of the updated design system.** The page uses the full-bleed
  alternating-bands archetype but also puts a `border-t` hairline on every
  section. That archetype's defining move is that the colour shift *alone*
  separates sections. Removing the borders is a one-line change.

## Decisions not to reverse quietly

- **Story order over document order.** The document's sequence was tried and
  rejected for a reason.
- **Editorial notes stay visible.** Source contradictions are surfaced on the
  page, not smoothed away.
- **Palette is grounded in the building** — the technical file's black-and-white
  perimeter wall is the ink and the canvas; one green accent, counted.
- **Nothing invented.** Where the source is silent, the site says so.
