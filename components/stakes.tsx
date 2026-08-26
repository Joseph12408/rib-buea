"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE, Reveal } from "@/components/primitives";
import { SectionHeading } from "@/components/section-heading";
import { institute } from "@/lib/institute";

/**
 * The stakes. Section two, and the first beat of the story.
 *
 * Before a reader will care what the institute does, they need to know what
 * happens if it does not exist. This section states the problem, then hands
 * the argument to the institute's own words with a pull quote.
 */
export function Stakes() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const s = institute.stakes;

  return (
    <section
      id="stakes"
      className="scroll-mt-28 border-t border-border py-section"
      aria-labelledby="stakes-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="stakes-heading"
          kicker={s.kicker}
          title={s.heading}
          lead={s.body}
        />

        <div ref={ref} className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface">
              <motion.div
                className="absolute inset-[-8%]"
                style={reduce ? undefined : { y: imgY }}
              >
                <Image
                  src="/img/stakes.webp"
                  alt="A hand reading a line of braille"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>

          <motion.blockquote
            className="lg:pl-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <p className="font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.25] font-normal tracking-[-0.015em] text-balance text-ink">
              &ldquo;{s.pull}&rdquo;
            </p>
            <footer className="mt-7 border-t border-border pt-5 text-sm text-ink-muted">
              {s.pullSource}
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
