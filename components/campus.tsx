"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { EASE, Reveal } from "@/components/primitives";
import { SectionHeading } from "@/components/section-heading";
import { institute } from "@/lib/institute";

/**
 * Section five — a day here.
 *
 * Placed immediately after the programme because it makes the abstract concrete:
 * having just read what the five sections do, the reader sees it as a clock.
 * The timetable is the most human artefact in the source document and most sites
 * would bury it in a PDF.
 */
export function DailyLife() {
  const [tab, setTab] = useState<"weekday" | "weekend">("weekday");
  const active = institute.schedule[tab];

  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section
      id="day"
      className="scroll-mt-28 border-t border-border py-section"
      aria-labelledby="day-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="day-heading"
          kicker="A day here"
          title="Five in the morning to ten at night."
          lead={institute.schedule.note}
        />

        <div ref={ref} className="mt-10 sm:mt-14">
          <Reveal>
            <div className="relative aspect-[16/7] overflow-hidden rounded-panel bg-surface">
              <motion.div
                className="absolute inset-[-8%]"
                style={reduce ? undefined : { y: imgY }}
              >
                <Image
                  src="/img/day.webp"
                  alt="Trainees gathered for a lesson"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="mt-12 flex justify-center">
            <div
              className="inline-flex rounded-pill border border-border-strong bg-canvas p-1"
              role="group"
              aria-label="Choose a schedule"
            >
              {(["weekday", "weekend"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  aria-pressed={tab === k}
                  className={`inline-flex min-h-12 items-center rounded-pill px-6 text-[0.95rem] font-bold transition-colors ${
                    tab === k ? "bg-ink text-canvas" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {k === "weekday" ? "Monday to Friday" : "Weekends"}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-panel border border-border bg-canvas"
        >
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{active.label} schedule</caption>
            <thead>
              <tr className="border-b border-border-strong bg-surface-2">
                <th scope="col" className="px-5 py-4 text-sm font-bold text-ink sm:px-7">
                  Time
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold text-ink sm:px-7">
                  Activity
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-4 text-sm font-bold text-ink sm:px-7 md:table-cell"
                >
                  Led by
                </th>
              </tr>
            </thead>
            <tbody>
              {active.rows.map((r) => (
                <tr
                  key={`${r.time}-${r.activity}`}
                  className="border-b border-border last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top text-[0.95rem] font-bold tabular-nums whitespace-nowrap text-ink sm:px-7"
                  >
                    {r.time}
                  </th>
                  <td className="px-5 py-4 align-top leading-relaxed text-ink-muted sm:px-7">
                    {r.activity}
                    {r.obs && (
                      <span className="mt-1 block text-sm text-ink-faint">{r.obs}</span>
                    )}
                    {r.by && (
                      <span className="mt-1 block text-sm text-ink-faint md:hidden">
                        {r.by}
                      </span>
                    )}
                  </td>
                  <td className="hidden px-5 py-4 align-top text-[0.95rem] leading-relaxed text-ink-muted sm:px-7 md:table-cell">
                    {r.by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {tab === "weekend" && (
          <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-ink-faint">
            Note: {institute.schedule.weekend.sourceNote}
          </p>
        )}
      </div>
    </section>
  );
}

/** Section six — the place. */
export function Place() {
  const inf = institute.infrastructure;

  return (
    <section
      id="campus"
      className="scroll-mt-28 border-t border-border bg-surface py-section"
      aria-labelledby="campus-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="campus-heading"
          kicker="The place"
          title="A walled compound, 700m off the highway."
          lead={`${inf.intro} ${institute.location.land}`}
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-panel border border-border bg-canvas p-7 lg:p-9">
              <h3 className="font-display text-xl font-semibold text-ink">
                The administrative building
              </h3>
              <ul className="mt-5 space-y-2.5">
                {inf.administrative.map((x) => (
                  <li
                    key={x}
                    className="border-b border-border pb-2.5 leading-relaxed text-ink-muted last:border-b-0 last:pb-0"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-panel border border-border bg-canvas p-7 lg:p-9">
              <h3 className="font-display text-xl font-semibold text-ink">
                Across the campus
              </h3>
              <ul className="mt-5 space-y-2.5">
                {inf.campus.map((x) => (
                  <li
                    key={x}
                    className="border-b border-border pb-2.5 leading-relaxed text-ink-muted last:border-b-0 last:pb-0"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl rounded-panel border border-accent/25 bg-accent-wash p-6 text-center leading-relaxed text-ink">
            {inf.donorNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Section seven — the people, and the numbers, now that the reader cares. */
export function People() {
  const { staff, stats } = institute;
  // Listed roles sum to 19; the document's prose says eighteen. See institute.ts.
  const listed = staff.reduce((n, s) => n + s.count, 0);
  const stated = institute.staffStatedTotal;
  const mismatch = listed !== stated;

  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="people"
      className="scroll-mt-28 border-t border-border py-section"
      aria-labelledby="people-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="people-heading"
          kicker="The people"
          title={`${stated} permanent staff, for 27 trainees.`}
          lead="The whole institution, listed. Both braille instructors are temporary workers, which is the single most fragile point in the programme."
        />

        {/* The numbers, moved here from the hero — they land once the reader has
            a reason to weigh them. */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-border bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-canvas px-6 py-8 text-center lg:px-8 lg:py-10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
            >
              <p className="font-display text-[clamp(1.9rem,4vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums text-ink">
                {s.value}
              </p>
              <p className="mt-3 text-sm font-bold text-ink">{s.label}</p>
              <p className="mt-1 text-sm leading-snug text-ink-muted">{s.note}</p>
            </motion.div>
          ))}
        </div>

        <div ref={ref} className="mt-10 sm:mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface">
              <motion.div
                className="absolute inset-[-8%]"
                style={reduce ? undefined : { y: imgY }}
              >
                <Image
                  src="/img/people.webp"
                  alt="Trainees together in a classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {staff.map((s) => (
                <li
                  key={s.role}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3.5"
                >
                  <span className="leading-snug text-ink-muted">{s.role}</span>
                  <span
                    className="font-display text-lg font-semibold tabular-nums text-ink"
                    aria-label={`${s.count} ${s.count === 1 ? "person" : "people"}`}
                  >
                    {s.count}
                  </span>
                </li>
              ))}
            </ul>

            {mismatch && (
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                The technical file states {stated} permanent staff; the roles it
                lists total {listed}. Both are shown as published, pending
                confirmation from the institute.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
