# RIB Buea — reported outage

Joseph reported the site was down. First session since 2026-08-26.

## What we set out to do

Find out why the site is down and fix it.

## What we found

**`rib-buea.vercel.app` is not down.** Checked end to end:

| Check | Result |
|---|---|
| HTTP status | 200, `x-vercel-cache: HIT`, served by Vercel |
| HTML payload | 81,873 bytes, complete |
| Content markers | name, "dignity", Buea, phone, email all present |
| JS chunks | 8 of 8 return 200 |
| CSS | 1 of 1 returns 200 |
| Hero image | 200 both raw webp and through `/_next/image` |
| Rendered DOM | 10 sections, `readyState: complete`, React mounted |
| Hero `h1` | visible, opacity 1, 500x105 |
| Page height | 17,432px |

The 9% of elements sitting at opacity 0 are below-the-fold `whileInView`
reveals that have not entered the viewport yet. Expected, not a fault.

`rib-buea-web.vercel.app` and `rib-buea-site.vercel.app` also return 200, so
the two surplus projects from the August deploy were never deleted.

**The GitHub repo is intact**: public, `main`, last pushed 2026-08-26T17:48:34Z,
matching local `b55f3a8`. Working tree clean. Nothing changed since August.

**The Vercel API connection still cannot see the project.** `list_projects`
returns only `shortlist-app` and `blue-horizon`. This is the same blind spot
hit in August, when Joseph could see `rib-buea` in his dashboard while the API
insisted it did not exist. Not a new symptom and not evidence of deletion.

## The actual cause: the domain was suspended, not the site

The domain is `rib-buea.com`, registered at Namecheap. Its nameservers are:

```
verify-contact-details.namecheap.com
failed-whois-verification.namecheap.com
```

Those are not real nameservers. Namecheap substitutes them when it suspends a
domain for failed ICANN registrant verification. The apex A record resolves to
`198.54.117.242`, which reverses to `registrar-servers.com`, Namecheap's
parking host, and both apex and `www` refuse connections on 443.

RDAP confirms the timeline exactly:

| Event | Date |
|---|---|
| Registered | 2026-08-26 |
| Last changed | 2026-09-10 |
| Expires | 2027-08-26 |

ICANN requires the registrant's email to be verified within **15 days** of
registration. The domain was registered on the day we deployed, and was changed
15 days later, which is when the nameservers were swapped for the suspension
pair. So the site was reachable from 26 August to about 10 September, then went
dark, and nobody noticed for a month.

**The domain is not expired.** It is paid until 2027-08-26. Nothing was lost,
and no money is owed. It only needs the verification email clicked.

## Still open

- **Joseph must verify the registrant email at Namecheap.** Resend from the
  Namecheap dashboard, click the link, and the nameservers are restored.
- **DNS must then be re-pointed at Vercel.** The suspension replaced the
  nameservers, so whatever records were set in August are not in effect. The
  exact A/CNAME values should be read from Vercel's own Domains panel for the
  project rather than assumed, since Vercel has changed its recommended apex IP
  over time.
- **Nothing to fix in the code.** The deployment and repo are healthy.

## Worth not repeating

A domain registered for a client should have its verification email confirmed
the same day, and the live URL checked a fortnight later. The failure mode here
is silent: the site serves perfectly on its `.vercel.app` host the entire time,
so every check short of hitting the real domain passes.

## Noticed in passing, unrelated to the outage

**The wordmark is invisible at the top of the page on desktop.** The nav is
transparent until scrolled, and "RIB" is `text-ink` over the dark hero
photograph, so it disappears until the lifted state kicks in at 12px of scroll.
"Buea" beneath it is `text-ink-muted` and only slightly more legible. The nav
needs light type while it is over the hero.

Not raised as the cause of anything; recorded so it is not lost.
