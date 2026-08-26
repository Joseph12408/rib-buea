"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Lenis, with the three obligations that come with taking over scrolling.
 *
 * Taking over the scroll means taking on three obligations that apply to any
 * site. Breaking the keyboard or anchor navigation to buy a nicer scroll feel
 * is a straight downgrade. So:
 *
 *  1. Not mounted at all under prefers-reduced-motion. Smooth scroll is a
 *     vestibular trigger, and disabling it after mount is not the same thing.
 *  2. Anchor links routed through lenis.scrollTo, or they simply stop working.
 *  3. Keyboard scrolling left to Lenis's own handling, which covers Space,
 *     PageUp/Down, Home and End.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduce, setReduce] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Undecided on first paint: render plain rather than briefly hijacking
  // scroll for someone who asked us not to.
  if (reduce === null || reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1 }}>
      <AnchorBridge />
      {children}
    </ReactLenis>
  );
}

/**
 * Lenis owns the scroll position, so a plain `href="#id"` jump is swallowed.
 * This delegates in-page anchors back to it, and still moves focus to the
 * target so keyboard and screen-reader users land where sighted users do.
 */
function AnchorBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });

      /*
        Move focus as well as the viewport. Scrolling alone leaves a keyboard
        user's focus back at the link, so their next Tab returns them to the
        top of the page — a classic skip-link failure.
      */
      const el = target as HTMLElement;
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}
