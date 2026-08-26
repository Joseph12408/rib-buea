# RIB Buea — deployment

Continues `2026-08-22-rib-buea-first-build.md`. Desktop build shipped to GitHub;
Vercel project creation blocked on a Vercel-side fault.

## What we set out to do

Put the desktop site live today. Client pressure. Mobile explicitly deferred
again, to be done straight after.

## What actually changed

**Repository.** Public repo created at
`https://github.com/Joseph12408/rib-buea`, default branch `main`. Everything
from the first build is committed and pushed: the ten-beat page, the whole
technical file transcribed in `lib/institute.ts`, the eight graded placeholder
photographs, and the first session log.

`art/raw/` added to `.gitignore` — 2.6 MB of ungraded source JPEGs that are
inputs to `art/fetch-photos.mjs`, not shipped assets. The graded webp in
`public/img/` (560 KB total) is what the site serves.

Branch renamed `master` to `main` before the first push, matching the other
projects and Vercel's default production branch.

**Production build verified.** `next build` passes: compiled in 11.1s,
TypeScript clean, `/` and `/_not-found` both prerendered as static content,
exit 0.

## Bugs found, and why

**The build failed locally, and it was the network, not the code.**
`next/font/google` downloads the woff2 files at build time. The first attempt
died with thirteen `Module not found: Can't resolve
'@vercel/turbopack-next/internal/font/google/font'` errors against the generated
Newsreader and Atkinson Hyperlegible CSS.

The cause was one layer down: `fonts.gstatic.com` failed its TLS handshake from
that connection, while `fonts.googleapis.com` returned 200 and npm's registry
reset. A selectively broken link, not a code defect. Confirmed by rebuilding on
a stable connection, which passed first time with no source change.

Worth remembering: a `module-not-found` from `next/font` is usually a failed
*download*, not a missing package. Check reachability of `fonts.gstatic.com`
before touching the code.

**Vercel project creation fails and rolls back.** Three attempts
(`rib-buea`, `rib-buea-site`, `rib-buea-web`) each returned a project id, then
failed to verify the git link with `404 Project not found`. None of them appear
in `list_projects`, and `get_project` 404s on every returned id — yet retrying
the first two names returns `409 Project already exists`.

So the projects are being created into a scope the API connection cannot read
back. Not the GitHub App scope: Joseph confirmed *All repositories* was already
granted and toggled it off and on, and the fourth attempt failed identically.
The repo itself is fine — public, on `main`, fully populated, confirmed through
the GitHub API.

Left for Joseph to import through the Vercel dashboard rather than creating a
fourth phantom project.

## Still open

- **Vercel project not created.** Import `Joseph12408/rib-buea` from the
  dashboard. The names `rib-buea`, `rib-buea-site` and `rib-buea-web` may be
  reserved by the failed attempts; use another if they conflict.
- **Custom domain** to be attached after the project exists.
- **Mobile has not been done.** Still the next real task, now deferred twice.
- **All eight images are placeholders**, now published publicly. Briefs for the
  real photographs are in `art/fetch-photos.mjs`.
- **No phone or email** in the source document; the page says so rather than
  inventing one. This is live on a public site now, so it is worth chasing.
- **Fails Gate 1b** — alternating bands archetype plus `border-t` hairlines.

## Decisions not to reverse quietly

- **`art/raw/` stays out of the repo.** It is regenerable input, not an asset.
- **Fonts stay on `next/font/google`.** The local failure was environmental.
  Self-hosting is the fallback if Vercel's builders ever fail the same way.
