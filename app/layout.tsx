import type { Metadata } from "next";
import { Newsreader, Atkinson_Hyperlegible } from "next/font/google";
import { MotionProvider } from "@/components/primitives";
import { SmoothScroll } from "@/components/smooth-scroll";
import { institute } from "@/lib/institute";
import "./globals.css";

/*
  Atkinson Hyperlegible was originally picked here for the wrong reason — an
  assumption that this site's readers were themselves visually impaired. They
  are not: this is a site about the institute, for donors, partners and
  families.

  It is kept for a reason that survives that correction: it is the typeface the
  Braille Institute commissioned, which ties the page to its subject rather than
  to a generic institutional default. That is a thematic choice, not an
  accessibility one, and it is easy to swap if a warmer face suits better.

  Newsreader carries the display voice: an editorial serif, dignified enough for
  a 58-year-old state institution without tipping into ceremony.
*/
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${institute.name} — ${institute.city}, ${institute.country}`,
  description: `${institute.standfirst} ${institute.mandate}`,
  openGraph: {
    title: `${institute.name}, ${institute.city}`,
    description: institute.standfirst,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas">
        {/* Standard skip link, first in the DOM. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:inline-flex focus:min-h-12 focus:items-center focus:rounded-pill focus:bg-accent focus:px-6 focus:text-base focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <MotionProvider>{children}</MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
