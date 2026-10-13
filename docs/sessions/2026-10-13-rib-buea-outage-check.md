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

## The route back, when the dashboard offers no banner

Joseph could find no verification prompt in the Namecheap dashboard, and the
Advanced DNS tab was locked. Both are expected: Namecheap disables DNS
management while a domain is suspended, because the nameservers have been
taken over.

The way through is the suspension page itself, which is served **over plain
HTTP, not HTTPS**. `https://rib-buea.com` refuses the connection, which is why
the first check looked like a dead domain; `http://rib-buea.com` returns 200
and is Namecheap's "ICANN Verification Needed" page. It carries a
**Resend My Verification Email** button that sends to the registrant address on
file, with no login required.

Namecheap's own copy on that page: the suspension lifts once the email is
verified, and the site reactivates automatically, usually within 24 to 48
hours.

## How it was actually fixed

Joseph switched the domain from Custom DNS to **Namecheap BasicDNS** in the
domain settings, and the site came straight back.

That works because the suspension was never a registry-level hold. RDAP showed
only `client transfer prohibited` throughout, never `clientHold` or
`serverHold`. Namecheap enforced it purely by replacing the domain's
nameservers with their two verification hosts. The DNS records Joseph set in
August were still sitting in BasicDNS untouched; they were simply not in effect
while the nameservers pointed elsewhere. Switching back put the real
nameservers, and therefore those records, back in play.

Verified after the change:

| Check | Result |
|---|---|
| Nameservers | `dns1`/`dns2.registrar-servers.com` |
| Apex A | `216.198.79.1` (Vercel apex) |
| `www` CNAME | `38979d076cd7c0a8.vercel-dns-017.com` |
| Apex | 308 to `https://www.rib-buea.com` |
| Payload | 81,873 bytes, identical to the `.vercel.app` build |
| TLS | `ssl_verify=0`, valid |
| Registry status | `client transfer prohibited` only, no hold |
| Nameservers changed | 2026-10-13T18:40:50Z |

## Still open

- **The ICANN verification may still be outstanding.** Nothing observable from
  outside says whether Namecheap now considers the registrant email verified.
  The registry shows no hold, and the nameserver change stuck rather than being
  reverted, which is mildly reassuring. But if it is still pending, Namecheap
  can swap the nameservers out again and the site will die the same way. The
  cheap insurance is to confirm the verification in the Namecheap account.
- **DNS must then be re-pointed at Vercel.** The suspension replaced the
  nameservers, so whatever records were set in August are not in effect. The
  exact A/CNAME values should be read from Vercel's own Domains panel for the
  project rather than assumed, since Vercel has changed its recommended apex IP
  over time.
- **Nothing to fix in the code.** The deployment and repo are healthy.

## Closed out this session

- **The two surplus Vercel projects are gone.** `rib-buea-web.vercel.app` and
  `rib-buea-site.vercel.app` both return 404; `rib-buea.vercel.app` and
  `www.rib-buea.com` still return 200. The right one was kept.
- **The invisible wordmark is parked at Joseph's call.** Not forgotten, not to
  be fixed unasked.
- **Real photographs are being shot**, so the eight placeholders are on their
  way out. The briefs in `art/fetch-photos.mjs` are what they were shot against.

Next session is a batch: the client's proposed changes, collected and applied
in one pass rather than piecemeal.

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
