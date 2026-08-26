"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/primitives";

/**
 * Shared section heading.
 *
 * Exists so "centred" is a single decision applied consistently, rather than
 * repeated alignment classes drifting apart across nine sections. Centred
 * headings get a measure cap too — centred text with a long line length is
 * genuinely harder to read than left-aligned, so the cap is part of the
 * treatment, not decoration.
 */
export function SectionHeading({
  kicker,
  title,
  lead,
  align = "center",
  id,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  id?: string;
  children?: ReactNode;
}) {
  const centred = align === "center";

  return (
    <Reveal
      className={
        centred ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"
      }
    >
      {kicker && (
        <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-ink-faint">
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-ink"
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-6 text-[1.1rem] leading-relaxed text-ink-muted ${
            centred ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  );
}
