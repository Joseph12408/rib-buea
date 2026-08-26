"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { EASE } from "@/components/primitives";
import { institute } from "@/lib/institute";

const LINKS = [
  { label: "The institute", href: "#institute" },
  { label: "Programme", href: "#programme" },
  { label: "Campus", href: "#campus" },
  { label: "Admission", href: "#admission" },
  { label: "Support", href: "#support" },
];

export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (v) => setLifted(v > 12));

  /*
    While the panel is open the page behind it must not move. Lenis owns the
    scroll, so stopping it is what actually locks the page; setting
    overflow:hidden on body alone would not, because Lenis keeps driving the
    scroll position from its own rAF loop. The overflow rule is still set for
    the reduced-motion case, where Lenis is never mounted.

    Escape closes, which is the behaviour a keyboard user expects from anything
    that covers the page.
  */
  useEffect(() => {
    if (!open) return;

    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
    >
      <div
        className={`transition-colors duration-300 ${
          lifted || open
            ? "border-b border-border bg-canvas/90 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6"
        >
          <a
            href="#top"
            className="-ml-1 inline-flex min-h-12 items-center gap-3 px-1"
          >
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-inner bg-ink text-canvas"
            >
              {/* The black-and-white perimeter wall, as a mark. */}
              <span className="block h-4 w-4 rounded-[3px] bg-canvas" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-tight text-ink">
                {institute.shortName}
              </span>
              <span className="block text-xs text-ink-muted">
                {institute.city}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative inline-flex min-h-11 items-center text-[0.95rem] text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {l.label}
                  <span className="absolute bottom-2 left-0 h-px w-0 bg-ink transition-[width] duration-300 ease-out group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#support"
              className="hidden h-12 items-center rounded-pill bg-accent px-6 text-[0.95rem] font-bold text-white transition-colors duration-200 hover:bg-accent-hover sm:inline-flex"
            >
              Support the institute
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-12 place-items-center rounded-inner border border-border-strong text-ink lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-border lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <ul className="mx-auto max-w-6xl px-6 py-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center border-b border-border text-lg text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#support"
                  onClick={() => setOpen(false)}
                  className="mt-4 mb-5 flex min-h-14 items-center justify-center rounded-pill bg-accent px-6 text-lg font-bold text-white"
                >
                  Support the institute
                </a>
              </li>
            </ul>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
