"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { EASE, Reveal } from "@/components/primitives";
import { institute } from "@/lib/institute";

/**
 * The five sections.
 *
 * Structure deliberately differs from the mission grid above it: a sticky index
 * on the left, long-form entries on the right. Needs are stated inline with the
 * section they belong to, rather than quarantined in a "challenges" appendix,
 * because a reader deciding whether to fund something should see the gap next
 * to the work it affects.
 */
/**
 * Not every section gets a photograph. Three of the five have imagery because
 * they are the ones a reader can picture; giving all five a stock image would
 * pad the page and dilute the three that carry weight.
 */
const SECTION_IMAGE: Record<string, { src: string; alt: string }> = {
  "special-education": {
    src: "/img/special-education.webp",
    alt: "An educator working with a trainee",
  },
  school: {
    src: "/img/school.webp",
    alt: "A classroom lesson in progress",
  },
  vocational: {
    src: "/img/vocational.webp",
    alt: "Hands weaving, in the vocational workshop",
  },
};

export function Programme() {
  return (
    <section
      id="programme"
      className="scroll-mt-28 border-t border-border bg-surface py-section"
      aria-labelledby="programme-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-12 px-6 lg:grid-cols-[0.65fr_1.35fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-ink-faint">
              Programme
            </p>
            <h2
              id="programme-heading"
              className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-ink"
            >
              Five sections, one arc.
            </h2>
            <p className="mt-6 leading-relaxed text-ink-muted">
              A trainee arrives dependent and leaves able to live, learn and earn.
              Each section carries one stretch of that journey.
            </p>

            <ol className="mt-8 hidden space-y-1 lg:block">
              {institute.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex min-h-11 items-center gap-3 text-[0.95rem] text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="font-display text-sm tabular-nums text-accent">
                      {s.n}
                    </span>
                    {s.name}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div>
          {institute.sections.map((s, i) => (
            <SectionEntry key={s.id} section={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionEntry({
  section: s,
  index,
}: {
  section: (typeof institute.sections)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const image = SECTION_IMAGE[s.id];

  return (
    <motion.article
      id={s.id}
      className="scroll-mt-28 border-t border-border-strong py-9 first:border-t-0 first:pt-0 lg:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 2) * 0.05 }}
    >
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="font-display text-lg font-semibold tabular-nums text-accent"
        >
          {s.n}
        </span>
        <div>
          <h3 className="font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.015em] text-ink sm:text-[1.85rem]">
            {s.name}
          </h3>
          <p className="mt-1 text-sm text-ink-faint">{s.role}</p>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted">
        {s.body}
      </p>

      {image && (
        <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-panel bg-surface-2">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      )}

      {s.groups.length > 0 && (
        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {s.groups.map((g) => (
            <div key={g.label}>
              <h4 className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-ink-faint">
                {g.label}
              </h4>
              <ul className="mt-3 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-[0.95rem] leading-relaxed text-ink-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/*
        A real <button> with aria-expanded, not a div. The panel is toggled by
        conditional rendering with a height animation on the wrapper, so the
        content is genuinely removed from the accessibility tree when closed.
      */}
      <div className="mt-7">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${s.id}-needs`}
          className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-border-strong bg-canvas px-5 text-[0.95rem] font-bold text-ink transition-colors hover:border-ink"
        >
          <span
            aria-hidden="true"
            className={`inline-block text-accent transition-transform duration-200 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
          {open ? "Hide what this section needs" : `What this section needs (${s.needs.length})`}
        </button>

        <motion.div
          id={`${s.id}-needs`}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden"
        >
          <ul className="mt-5 space-y-3 border-l-2 border-accent pl-5">
            {s.needs.map((n) => (
              <li key={n} className="max-w-2xl leading-relaxed text-ink-muted">
                {n}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.article>
  );
}
