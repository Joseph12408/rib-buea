"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Back to top.
 *
 * Routed through Lenis so the return is smoothly scrolled like everything else
 * — a raw window.scrollTo would jump, and would look broken next to the rest of
 * the page. Falls back to native smooth scrolling when Lenis is not mounted,
 * which is the case under prefers-reduced-motion.
 *
 * Focus is moved to the top of the document as well as the viewport, so a
 * keyboard user's next Tab starts from the top rather than from wherever the
 * button happened to be.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  /*
    Subscribe to Lenis's own scroll rather than assuming a native scroll event
    fires. Lenis drives the scroll position from its rAF loop, and relying on
    the window event alone leaves this button dependent on an implementation
    detail of how that propagates. When Lenis is absent (reduced motion) the
    hook is inert and the window listener below does the work.
  */
  const lenis = useLenis(({ scroll }) => {
    setShow(scroll > window.innerHeight * 0.9);
  });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      // Lenis absent means reduced motion is on, so do not animate.
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    const main = document.getElementById("main");
    if (main) {
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={toTop}
          className="fixed right-5 bottom-5 z-40 grid size-13 place-items-center rounded-pill border border-border-strong bg-canvas text-ink shadow-none transition-colors hover:border-ink hover:bg-surface sm:right-8 sm:bottom-8"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">Back to top</span>
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
