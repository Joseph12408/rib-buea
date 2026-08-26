import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stakes } from "@/components/stakes";
import { Origin } from "@/components/story";
import { Programme } from "@/components/programme";
import { DailyLife, Place, People } from "@/components/campus";
import {
  Admission,
  Support,
  Visit,
  Footer,
} from "@/components/admission-support";
import { BackToTop } from "@/components/back-to-top";

/*
  Story order, not document order.

  The technical file is an inventory — structure, activities, challenges. Read
  top to bottom it argues nothing. These ten beats argue something:

    1  Hero        who and where                    full-bleed, centred
    2  Stakes      what happens without it          centred
    3  Origin      how it began, and its mandate    centred
    4  Programme   what it does to a person         left, long-form
    5  A day       what that looks like as a clock  centred
    6  The place   where it happens                 centred
    7  The people  who does it, and the numbers     centred
    8  Admission   how a family joins               left
    9  Support     what is missing                  centred
   10  Visit       come and see                     left

  The numbers moved out of the hero and into beat 7 on purpose. Statistics are
  an answer to a question the reader has not asked in the first two seconds;
  by beat 7 they have.

  Alignment alternates deliberately — the four left-aligned beats are the ones
  with long or procedural content, where a centred measure would fight the
  reading.
*/
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div id="top" />
        <Hero />
        <Stakes />
        <Origin />
        <Programme />
        <DailyLife />
        <Place />
        <People />
        <Admission />
        <Support />
        <Visit />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
