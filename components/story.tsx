"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { EASE, Reveal, Stagger, staggerChild } from "@/components/primitives";
import { SectionHeading } from "@/components/section-heading";
import { institute } from "@/lib/institute";

/**
 * Section three — origin, then mandate.
 *
 * Narrative order matters here: how it began, THEN what the state told it to
 * do. Reversing those reads as a mission statement with a history appendix,
 * which is how institutional sites usually get written and why they are usually
 * skipped.
 *
 * The history rail uses GSAP ScrollTrigger `scrub`, the one thing framer-motion
 * genuinely cannot do well: tie a continuous value to scroll position across a
 * multi-stage range. GSAP owns scaleY on the rail; framer-motion owns the entry
 * reveals. Never the same element.
 */
export function Origin() {
  const railRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rail = railRef.current;
    if (!wrap || !rail) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(rail, { scaleY: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        }
      );
    }, wrap);

    // Fonts settling moves every measured trigger position.
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="institute"
      className="scroll-mt-28 border-t border-border bg-surface py-section"
      aria-labelledby="origin-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="origin-heading"
          kicker="How it began"
          title="Fifty-eight years, three turning points."
          lead="A mission station in Bavenga became a government institute in Buea, and then became the first of its kind in Cameroon."
        />

        <div ref={wrapRef} className="mx-auto mt-12 sm:mt-16 max-w-3xl">
          <ol className="relative pl-10 sm:pl-14">
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-border-strong sm:left-[11px]"
            >
              <div
                ref={railRef}
                className="h-full w-full origin-top bg-accent"
                style={{ transform: "scaleY(0)" }}
              />
            </div>

            {institute.history.map((h, i) => (
              <motion.li
                key={h.year}
                className="relative pb-12 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-10 grid size-4 place-items-center rounded-full border-2 border-accent bg-surface sm:-left-14"
                />
                <p className="font-display text-2xl font-semibold tracking-tight text-accent">
                  {h.year}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug font-semibold text-ink sm:text-2xl">
                  {h.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{h.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* The mandate the 1980 decree handed it. */}
        <Reveal className="mx-auto mt-14 sm:mt-24 max-w-3xl text-center">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-semibold tracking-[-0.02em] text-ink">
            And with it, three standing instructions.
          </h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-muted">
            {institute.decree} set out what this institution exists to do.
            Unchanged since.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-border bg-border md:grid-cols-3">
          {institute.missions.map((m) => (
            <motion.article
              key={m.id}
              variants={staggerChild}
              className="bg-canvas p-7 lg:p-9"
            >
              <h4 className="font-display text-xl leading-snug font-semibold text-ink">
                {m.title}
              </h4>
              <p className="mt-4 leading-relaxed text-ink-muted">{m.body}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
