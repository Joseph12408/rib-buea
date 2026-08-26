"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** expo.out. One curve across the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * reducedMotion="user" disables transform and layout animation for anyone with
 * the OS preference set, while leaving opacity intact. On this site in
 * particular, motion must never be the thing carrying meaning.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A braille cell. `dots` are the raised positions, numbered the standard way:
 *
 *   1 4
 *   2 5
 *   3 6
 *
 * Purely visual, so it is hidden from assistive technology — a screen reader
 * user gets the actual word, not a description of its braille rendering.
 */
export function BrailleCell({ dots }: { dots: number[] }) {
  const order = [1, 4, 2, 5, 3, 6];
  return (
    <span className="braille-cell" aria-hidden="true">
      {order.map((d) => (
        <span
          key={d}
          className={`braille-dot ${dots.includes(d) ? "on" : ""}`}
        />
      ))}
    </span>
  );
}

/** Standard braille patterns for the letters used in the wordmark. */
const LETTERS: Record<string, number[]> = {
  r: [1, 2, 3, 5],
  i: [2, 4],
  b: [1, 2],
  a: [1],
  c: [1, 4],
  e: [1, 5],
  l: [1, 2, 3],
  n: [1, 3, 4, 5],
  d: [1, 4, 5],
  u: [1, 3, 6],
  s: [2, 3, 4],
  t: [2, 3, 4, 5],
  h: [1, 2, 5],
  o: [1, 3, 5],
  m: [1, 3, 4],
  f: [1, 2, 4],
  g: [1, 2, 4, 5],
  p: [1, 2, 3, 4],
  y: [1, 3, 4, 5, 6],
};

/**
 * A word rendered in braille. The visible dots are decorative; the word itself
 * is exposed to assistive technology through the sr-only span.
 */
export function BrailleWord({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  const cells = word.toLowerCase().split("").filter((c) => LETTERS[c]);
  return (
    <span className={`inline-flex items-end gap-2 ${className ?? ""}`}>
      <span className="sr-only">{word}</span>
      {cells.map((c, i) => (
        <BrailleCell key={`${c}-${i}`} dots={LETTERS[c]} />
      ))}
    </span>
  );
}
