# RIB Buea — contact details and the mobile pass

Same day as `2026-08-26-rib-buea-deploy.md`, after the site went live on Vercel.

## What we set out to do

Two things: put the institute's real contact details on the page, and do the
mobile pass that had been deferred twice.

## What actually changed

**Contact details, finally real.** Phone `+237 676 27 60 99` and email
`alobwedececilia@gmail.com`, supplied by Joseph and still to be confirmed with
the institute. They replace the visible "to be supplied" placeholder in the
Visit section, and are repeated in the footer where people actually look.

Stored in `lib/institute.ts` under `contact`, with the phone held twice on
purpose: `tel` is the E.164 string a dialler needs, `phone` is the grouping a
Cameroonian reader expects to see. Both are real `tel:` and `mailto:` links, not
text, because a donor who has to copy a number by hand is a donor you can lose.

**Section rhythm on phones.** `--spacing-section` was 7rem at every width, which
is 119px top and bottom. Across ten sections that is about 2,380px, close to
three entire screens of nothing. Overridden to 4.25rem below 768px.

The override is a media query on `:root` rather than a `clamp()`, deliberately.
A fluid value would also have changed the 1024–1440px range, and the desktop
layout was already signed off. This way nothing above 768px moves at all.

**Hero.** It was 836px tall against an 812px screen, so it overflowed slightly
and pushed the scroll cue to the edge. `py-32` became `py-24 sm:py-32`, bringing
it to 768px, comfortably inside the viewport.

The two calls to action stacked at ragged widths on a phone (270px and 196px),
which looked accidental. They are now full width inside a `max-w-xs` column on
mobile and revert to their natural side-by-side widths at `sm`.

**Mobile menu.** It worked, but the page scrolled behind it. Lenis owns the
scroll, so `overflow: hidden` on body does not lock anything by itself; Lenis
keeps driving position from its own rAF loop. The fix stops Lenis on open and
restarts it on close, keeping the overflow rule for the reduced-motion case
where Lenis is never mounted. Escape now closes it, and the panel animates open
and shut through `AnimatePresence` instead of appearing instantly.

**Vertical gaps.** `mt-14`, `mt-16` and `mt-24` were unconditional. Now
`mt-10 sm:mt-14`, `mt-12 sm:mt-16` and `mt-14 sm:mt-24`. Desktop values verified
unchanged at 1440px: 59.5px, 68px and 102px respectively.

Net effect at 375px: 21,574px down to 20,486px.

## Verified, not assumed

At 375px and 390px: no horizontal overflow, zero tap targets under 44px (the
only sub-44px element is the skip link, which is `sr-only` until focused), the
schedule table fits and correctly drops its "Led by" column, the stats grid
holds two columns, and both contact links resolve to the right `tel:`/`mailto:`
targets. Production build passes.

At 1440px: section padding back to 119px, hero padding 136px, calls to action
270px and 196px side by side, desktop nav visible and hamburger hidden.

## Bugs found, and why

**A measurement that looked like a bug and was not.** The open menu measured 1px
tall. The cause was the Browser pane not being displayed, which sets
`document.hidden` and freezes `requestAnimationFrame` — zero frames in 600ms,
confirmed directly. framer-motion animates height on rAF, so the animation never
advanced past its first frame. Layout metrics were unaffected throughout, and
the panel's real resolved height is 412px.

Worth remembering, because it has now cost time twice: when the pane is hidden,
anything driven by rAF reads as frozen. Trust `offsetWidth`, `scrollHeight` and
computed styles; distrust animated transforms and heights. Check
`document.hidden` before believing an animation is broken.

**A stale console error.** The dev overlay kept reporting a JSX parse error in
`nav.tsx` from before an edit landed, on a page that was rendering all ten
sections perfectly. `read_console_messages` returns accumulated history, not
current state. Settled with a production build, which passed.

## Still open

- **All eight images are placeholders**, live on a public site. Briefs are in
  `art/fetch-photos.mjs`.
- **Contact details unconfirmed.** Joseph flagged the email as uncertain.
- **Two phantom Vercel projects**, `rib-buea-site` and `rib-buea-web`, to be
  deleted from the dashboard. The connector has no delete tool.
- **Fails Gate 1b** — alternating bands archetype plus `border-t` hairlines on
  every section. Still a one-line change per section.
- **The page is 25 screens on a phone.** Inherent to the content rather than to
  the spacing now, but a jump-to-section affordance would help a donor who wants
  one specific thing.

## Decisions not to reverse quietly

- **Mobile spacing is a media-query override, not a clamp.** Chosen so the
  signed-off desktop layout is untouched. Making it fluid later would silently
  change the 1024–1440px range.
- **Contact details live in `lib/institute.ts`**, not in the components, even
  though they are not from the source document. One place to correct them.
