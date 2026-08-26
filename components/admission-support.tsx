"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { EASE, Reveal, Stagger, staggerChild } from "@/components/primitives";
import { SectionHeading } from "@/components/section-heading";
import { institute } from "@/lib/institute";

/**
 * Admission.
 *
 * Ten documents is a genuinely intimidating list for a family that may be
 * navigating a disability diagnosis for the first time. It is presented as a
 * plain numbered checklist rather than dressed up, with the fee stated openly
 * beside it instead of buried at item ten.
 */
export function Admission() {
  const a = institute.admission;

  return (
    <section
      id="admission"
      className="scroll-mt-28 border-t border-border py-section"
      aria-labelledby="admission-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-ink-faint">
              Admission
            </p>
            <h2
              id="admission-heading"
              className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-ink"
            >
              What to bring.
            </h2>
            <p className="mt-6 leading-relaxed text-ink-muted">
              Applications are addressed to the Director. If any document is
              difficult to obtain, come and speak to the office before giving up
              on a place.
            </p>

            <div className="mt-8 rounded-panel border border-border bg-surface p-6">
              <p className="text-sm text-ink-muted">Registration fee</p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                {a.fee}{" "}
                <span className="text-lg font-normal text-ink-muted">
                  {a.currency}
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <ol className="counter-reset-none">
            {a.documents.map((d, i) => (
              <li
                key={d}
                className="flex gap-5 border-b border-border py-5 first:pt-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-display text-lg font-semibold tabular-nums text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-ink-muted">
                  {d}
                  {i === a.documents.length - 1 && (
                    <span className="text-ink">
                      {" "}
                      &mdash; {a.fee} {a.currency}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Support.
 *
 * The document calls itself "a clarion call to stakeholders, policymakers and
 * partners". This section is that call, stated as specific items rather than as
 * a general appeal, because "we need funding" cannot be acted on and "a braille
 * embosser" can.
 */
export function Support() {
  return (
    <section
      id="support"
      className="scroll-mt-28 border-t border-border bg-surface py-section"
      aria-labelledby="support-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="support-heading"
          kicker="Support"
          title="Six things that would change the year."
          lead="Named rather than general, so a partner can fund one item outright and know exactly what it did. Orange Cameroon did this once already: the IT workshop and the hen house are theirs."
        />

        <Stagger className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {institute.appeals.map((ap) => (
            <motion.article
              key={ap.id}
              variants={staggerChild}
              className="flex flex-col rounded-panel border border-border bg-canvas p-7"
            >
              <p
                className={`inline-flex w-fit items-center rounded-pill px-3 py-1 text-[0.7rem] font-bold tracking-[0.12em] uppercase ${
                  ap.urgency === "Urgent"
                    ? "bg-accent-wash text-accent"
                    : "bg-surface-2 text-ink-muted"
                }`}
              >
                {ap.urgency}
              </p>
              <h3 className="mt-5 font-display text-xl leading-snug font-semibold text-ink">
                {ap.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{ap.body}</p>
            </motion.article>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-panel border border-border bg-canvas p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink">
              To discuss a donation, a partnership or a visit, contact the
              Director&rsquo;s office at the institute.
            </p>
            <motion.a
              href="#visit"
              className="inline-flex h-14 min-h-12 shrink-0 items-center justify-center gap-2 rounded-pill bg-accent px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              How to reach us
              <ArrowRight className="size-4" aria-hidden="true" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Visit() {
  const loc = institute.location;

  return (
    <section
      id="visit"
      className="scroll-mt-28 border-t border-border py-section"
      aria-labelledby="visit-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-12 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-ink-faint">
            Visit
          </p>
          <h2
            id="visit-heading"
            className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-ink"
          >
            Finding us.
          </h2>

          <address className="mt-8 not-italic">
            <p className="font-display text-2xl leading-snug text-ink">
              {loc.street}
              <br />
              {loc.village}, {loc.town}
              <br />
              {loc.division}, {institute.country}
            </p>
          </address>

          <dl className="mt-8 space-y-4 border-t border-border pt-7">
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 text-sm text-ink-faint">Landmark</dt>
              <dd className="leading-relaxed text-ink-muted">{loc.landmark}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 text-sm text-ink-faint">Between</dt>
              <dd className="leading-relaxed text-ink-muted">{loc.between}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 text-sm text-ink-faint">Distance</dt>
              <dd className="leading-relaxed text-ink-muted">{loc.distance}</dd>
            </div>
          </dl>

          {/*
            Real links, not text. On a phone the number has to dial and the
            address has to open a mail client; a donor who has to copy either
            one by hand is a donor you can lose. Both sit on their own row so
            the 44px tap target is never in doubt.
          */}
          <dl className="mt-8 space-y-3 border-t border-border pt-7">
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 pt-2.5 text-sm text-ink-faint">
                Telephone
              </dt>
              <dd>
                <a
                  href={`tel:${institute.contact.tel}`}
                  className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-inner px-2 leading-relaxed text-ink transition-colors hover:text-accent"
                >
                  <Phone className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
                  {institute.contact.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 pt-2.5 text-sm text-ink-faint">Email</dt>
              <dd className="min-w-0">
                <a
                  href={`mailto:${institute.contact.email}`}
                  className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-inner px-2 leading-relaxed break-all text-ink transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
                  {institute.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="flex h-full min-h-[22rem] flex-col justify-between rounded-panel border border-border bg-surface p-8 lg:p-10">
            <div>
              <MapPin className="size-6 text-accent" aria-hidden="true" />
              <p className="mt-5 font-display text-xl leading-snug font-semibold text-ink">
                Isolated by design, and by circumstance.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                The decree notes the importance of isolation given the nature of
                our trainees&rsquo; disability. In practice it also means the
                institute sits {loc.distance.toLowerCase()}, which is why
                security and a complete fence matter so much here.
              </p>
            </div>
            <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-ink-muted">
              Known locally as the{" "}
              <span className="text-ink">{institute.localName}</span>, a name
              that has outlived two changes of ownership.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-xl font-semibold">
              {institute.name}
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-canvas/65">
              {institute.standfirst}
            </p>

            {/* Repeated here because the footer is where people go looking for
                it, and a donor should never have to scroll back up. */}
            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href={`tel:${institute.contact.tel}`}
                  className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-inner px-2 text-canvas/65 transition-colors hover:text-canvas"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {institute.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${institute.contact.email}`}
                  className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-inner px-2 break-all text-canvas/65 transition-colors hover:text-canvas"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {institute.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Sections">
            <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase text-canvas/55">
              Explore
            </p>
            <ul className="mt-4 space-y-1">
              {[
                ["The institute", "#institute"],
                ["Programme", "#programme"],
                ["Campus", "#campus"],
                ["Admission", "#admission"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-flex min-h-11 items-center text-canvas/65 transition-colors hover:text-canvas"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase text-canvas/55">
              Oversight
            </p>
            <p className="mt-4 leading-relaxed text-canvas/65">
              {institute.supervisor}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-canvas/50">
              {institute.decree}
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 border-t border-canvas/15 pt-7">
          <p className="text-sm text-canvas/50">
            &copy; {new Date().getFullYear()} {institute.name}, {institute.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
