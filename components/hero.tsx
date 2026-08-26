"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useRef } from "react";
import { BrailleWord, EASE } from "@/components/primitives";
import { institute } from "@/lib/institute";

/**
 * Hero — full-bleed photograph, centred type.
 *
 * The "at a glance" panel is gone. Statistics are an answer to a question the
 * visitor has not asked yet; opening with them turns a story into a datasheet.
 * The numbers now live further down, once the reader cares.
 *
 * Motion: a slow parallax drift on the image tied to scroll, so the picture
 * settles as the page moves rather than sliding at the same rate as the text.
 * Under reduced motion the image simply sits still.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Image drifts slower than the page. Type lifts and fades as it leaves.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: EASE, delay },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
      >
        <Image
          src="/img/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/*
        Scrim. Two layers: a flat wash for overall contrast, and a vertical
        gradient that deepens at the top and bottom so the fixed nav and the
        scroll cue both stay legible over a bright photograph.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/62"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,24,26,0.55) 0%, rgba(20,24,26,0.15) 38%, rgba(20,24,26,0.15) 62%, rgba(20,24,26,0.7) 100%)",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-4xl px-6 py-32 text-center"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="text-[0.74rem] font-bold tracking-[0.24em] uppercase text-white/75"
          {...line(0.1)}
        >
          {institute.city}, {institute.country} &middot; since 1967
        </motion.p>

        <motion.h1
          className="mx-auto mt-7 max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-balance text-white"
          {...line(0.18)}
        >
          {institute.name}
        </motion.h1>

        {/* Signature: the institute's own alphabet, spelling its purpose. */}
        <motion.div
          className="mt-9 flex justify-center text-white"
          {...line(0.28)}
        >
          <BrailleWord word="dignity" />
        </motion.div>

        <motion.p
          className="mx-auto mt-9 max-w-xl text-[1.15rem] leading-relaxed text-white/85"
          {...line(0.36)}
        >
          {institute.standfirst}
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row"
          {...line(0.44)}
        >
          <motion.a
            href="#support"
            className="inline-flex h-14 min-h-12 items-center justify-center gap-2 rounded-pill bg-accent px-9 text-base font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            Support the institute
            <ArrowRight className="size-4" aria-hidden="true" />
          </motion.a>

          <motion.a
            href="#stakes"
            className="inline-flex h-14 min-h-12 items-center justify-center rounded-pill border border-white/40 px-9 text-base font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/10"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            Read our story
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#stakes"
        aria-label="Scroll to the story"
        className="absolute bottom-8 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-pill border border-white/35 text-white/80 transition-colors hover:border-white hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ArrowDown className="size-5" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
