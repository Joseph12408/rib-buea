/**
 * Rehabilitation Institute for the Blind (RIB), Buea — content.
 *
 * Transcribed from the institute's technical file, pages 5-11, reordered into
 * document sequence (the supplied photographs were out of order).
 *
 * Editorial decisions, so they are visible rather than silent:
 *  - Obvious typos corrected for public copy: "Fake Divison" -> Fako Division,
 *    "DAYLY" -> Daily, "RESSOURCES" -> Resources, "distingue" -> distinct.
 *  - The file's "CHALLENGES" lists are reframed as fundable asks. Page 5 states
 *    the document is "a clarion call to stakeholders, policymakers and partners
 *    to invest", so this is the document's own intent, not spin.
 *  - Nothing here is invented. Where the source is ambiguous it is marked with
 *    a `sourceNote` rather than resolved by guesswork.
 */

export const institute = {
  name: "Rehabilitation Institute for the Blind",
  shortName: "RIB",
  localName: "Bulu Blind Centre",
  city: "Buea",
  country: "Cameroon",

  /** Page 5, opening paragraph. */
  standfirst:
    "A beacon of hope and transformation for visually impaired individuals across Cameroon.",

  mandate:
    "Established with a core mandate to restore dignity and autonomy, RIB has over the decades evolved into a pivotal institution that embodies inclusion, resilience and empowerment.",

  /**
   * Opens the narrative. Drawn from page 5 ("restore dignity and autonomy",
   * "the increasing phenomenon of blindness") and page 7 ("from dependence to
   * a state of independence"). Nothing invented.
   */
  stakes: {
    kicker: "Why this place exists",
    heading: "Losing your sight should not mean losing your independence.",
    body: "In 1967 the phenomenon of blindness was rising around Bavenga and there was nowhere for a blind Cameroonian to learn to live independently. Sight loss meant being led everywhere, taught nothing, and counted out. The institute was founded to break that sequence — and it still is the country's answer to it.",
    pull: "This section transforms the blind trainee from dependence to a state of independence.",
    pullSource: "Special Education Section, technical file",
  },

  /** Page 6. Decree 80/380 of 13 September 1980. */
  missions: [
    {
      id: "educate",
      title: "Educational support and vocational training",
      body: "Provide formal education and practical trades to visually impaired individuals, so that learning does not stop at the point of sight loss.",
    },
    {
      id: "integrate",
      title: "Socio-economic integration",
      body: "Enable trainees to participate actively in the development of their communities, ensuring independence and inclusion in mainstream society.",
    },
    {
      id: "autonomy",
      title: "Holistic rehabilitation",
      body: "Inculcate living skills alongside vocational training, with a view to facilitating autonomy and self-dependence.",
    },
  ],

  /** Page 5. */
  history: [
    {
      year: "1967",
      title: "Founded at Bavenga",
      body: "Created by Protestant missionaries as the centre for the blind in Bavenga, Muyuka — a vocational training facility for males with visual impairment, established to tackle the increasing phenomenon of blindness in the area.",
    },
    {
      year: "1968",
      title: "Relocated to Bulu, Buea",
      body: "The centre moved to Bulu village, from which the local name Bulu Blind Centre derives, and was handed to the government under the joint supervision of the Ministries of Primary Education and Social Affairs.",
    },
    {
      year: "1980",
      title: "Cameroon's first state-run institute",
      body: "By Presidential Decree no. 80/380 of 13 September, the government assumed official ownership. The centre was renamed the Rehabilitation Institute for the Blind, admission modalities were changed to wipe out gender discrimination, and it became the country's first state-run institution for visually impaired individuals, under the technical supervision of the Ministry of Social Affairs.",
    },
  ],

  /** Pages 7-8. The five sections, each with its stated needs. */
  sections: [
    {
      id: "special-education",
      n: "01",
      name: "Special Education",
      role: "The core section of technical rehabilitation",
      body: "Transforms the blind trainee from dependence to a state of independence. Personalities are rebuilt, so that trainees accept their situation and live with the disability.",
      groups: [
        {
          label: "Socio-educative",
          items: [
            "Personal hygiene, toileting and dressing",
            "Making beds and keeping the environment clean",
          ],
        },
        {
          label: "Socio-cultural",
          items: ["Music", "Sports", "Dance"],
        },
        {
          label: "Psycho-pedagogic",
          items: [
            "Educative talk and bible studies",
            "Excursions",
            "Mobility and orientation",
            "Meetings with educators",
            "Auto judge — a meeting held exclusively by the trainees",
          ],
        },
      ],
      needs: [
        "Modernisation of the boys' toilets, to prevent accident and infection",
        "Replacement beds and lockers in both dormitories",
        "A reliable water supply — the borehole is the only source, and electricity cuts leave trainees walking to a roadside stream",
        "Rehabilitation of the administrative building, where water seeps through a roof weighted with stones",
      ],
    },
    {
      id: "school",
      n: "02",
      name: "School",
      role: "Formal education",
      body: "A bilingual programme prepares trainees for the FSLC and the CEPI. Here they are drilled on braille, which is the essence and core activity of their rehabilitation.",
      groups: [],
      needs: [
        "Trained special education teachers proficient in braille — both current braille teachers are temporary staff",
        "Inclusive learning materials",
        "A braille embosser",
        "White canes for trainees whose parents cannot afford them",
        "Assistive technology: braille printers and screen readers",
      ],
    },
    {
      id: "health",
      n: "03",
      name: "Health Care",
      role: "Health needs of trainees and staff",
      body: "The unit attends to the day-to-day health of everyone on campus, trainees and staff alike.",
      groups: [],
      needs: [
        "Ophthalmology services",
        "A laboratory technician, and laboratory equipment",
        "Repairs to the roof of the health unit",
      ],
    },
    {
      id: "post-cure",
      n: "04",
      name: "Post-Cure",
      role: "After core training ends",
      body: "The phase after trainees have completed mobility and orientation, braille literacy, vocational skills or basic education — the point at which rehabilitation either holds or unravels.",
      groups: [],
      needs: [
        "Start-up funding for commercial activities",
        "Employer engagement — graduates face discrimination in hiring",
        "Skills matched to actual market demand",
      ],
    },
    {
      id: "vocational",
      n: "05",
      name: "Vocational Training",
      role: "Basic skills for economic independence",
      body: "Handicraft and agriculture, taught as a route to earning rather than as occupation therapy.",
      groups: [],
      needs: [
        "Modern, lucrative skills — traditional crafts may lack market demand",
        "Market linkage for the skills taught",
        "Raw materials",
        "Trained instructors",
        "Access to ICT and digital skills",
      ],
    },
  ],

  /** Page 9. */
  capacity: { places: "60+", enrolled: "27", offCampus: "3" },

  stats: [
    { value: "1967", label: "Founded", note: "As the centre for the blind, Bavenga" },
    { value: "60+", label: "Places", note: "27 trainees currently enrolled" },
    { value: "18", label: "Permanent staff", note: "Across teaching, care and trades" },
    { value: "7", label: "Classrooms", note: "Plus library and vocational workshop" },
  ],

  /** Page 9. */
  infrastructure: {
    intro:
      "A perimeter wall painted black and white runs the boundary of the property, for privacy and security.",
    administrative: [
      "Administration",
      "Health unit",
      "IT and vocational workshop",
      "Head teacher's office",
      "Library",
      "Seven classrooms",
    ],
    campus: [
      "Kitchen and refectory",
      "Boys' dormitory, four toilets, four bathrooms",
      "Girls' dormitory",
      "Transit room and pit toilet",
      "Hen house",
      "Laundry room",
    ],
    donorNote:
      "The hen house, and the IT and vocational workshop, are donations from Orange Cameroon.",
    residences:
      "Five staff residences sit on campus — one for the Director, four for educators — equipped with water, electricity and sanitation.",
  },

  /*
    Page 9 states "eighteen permanent staff", but the roles it then lists sum to
    NINETEEN. Both figures are printed as given rather than silently reconciled:
    a donor may well count, and quietly changing an institution's own published
    number is not ours to do. Confirm with the institute and drop `statedTotal`
    once it is resolved.
  */
  staffStatedTotal: 18,
  staff: [
    { role: "Director", count: 1 },
    { role: "Chief educator and educator", count: 2 },
    { role: "Head teacher and teachers", count: 3 },
    { role: "Braille instructors, English and French", count: 2 },
    { role: "Vocational instructors", count: 2 },
    { role: "Sports instructor", count: 1 },
    { role: "Health personnel", count: 2 },
    { role: "Livestock technician", count: 1 },
    { role: "Secretary", count: 1 },
    { role: "Bursar", count: 1 },
    { role: "Cook", count: 1 },
    { role: "Electrician", count: 1 },
    { role: "Cleaner", count: 1 },
  ],

  /** Page 10. */
  admission: {
    fee: "30,000",
    currency: "FCFA",
    documents: [
      "A stamped handwritten application addressed to the Director of RIB",
      "A social inquiry from the Social Centre of the trainee's place of residence",
      "A parent or guardian engagement letter",
      "A copy of the birth certificate",
      "A copy of the school report card from the previous school, if available",
      "A copy of the National Disability Card",
      "Two passport photographs, and one full photograph with a white cane",
      "A special medical certificate from a government or specialised eye hospital",
      "A stamped certificate of residence",
      "Registration fee",
    ],
  },

  /** Pages 10-11. Article 12 of the internal rules and regulations. */
  schedule: {
    note: "Meals are taken strictly in the refectory except in cases of illness. Bed time is 10pm, lights out. On public holidays activities begin at 7:30am and end at 2:30pm.",
    weekday: {
      label: "Monday to Friday",
      rows: [
        { time: "5:00 – 7:00", activity: "Wake up, morning chores, bath", by: "Educators", obs: "The timekeeper rings the bell" },
        { time: "7:00 – 7:30", activity: "Morning devotion, national anthem, prayers, news bulletin, announcements", by: "Educators and teachers", obs: "" },
        { time: "7:30 – 8:00", activity: "Breakfast", by: "Cook", obs: "Assisted by female staff when needed" },
        { time: "8:00", activity: "Classes and workshops begin", by: "Teachers, vocational instructors", obs: "" },
        { time: "10:00 – 10:15", activity: "Short break", by: "", obs: "" },
        { time: "12:00 – 12:30", activity: "Lunch", by: "Cook", obs: "" },
        { time: "12:30 – 2:30", activity: "Classes and workshops resume", by: "Teachers, vocational instructors", obs: "Supervised" },
        { time: "2:30 – 3:30", activity: "Nap time", by: "Chief educator, educators", obs: "" },
        { time: "3:30 – 6:30", activity: "Leisure and sport, educative talk, health sensitisation", by: "Sports instructor, educators, music director", obs: "Sports on Tuesdays and Fridays" },
        { time: "6:30 – 7:00", activity: "Supper", by: "Cook", obs: "" },
        { time: "7:00 – 10:00", activity: "Choir practice, interdisciplinary meeting, studies", by: "Trainees, educators, music director", obs: "" },
        { time: "10:00", activity: "Bed time", by: "Chief educator, educators", obs: "Lights out" },
      ],
    },
    weekend: {
      label: "Saturday, Sunday and public holidays",
      rows: [
        { time: "7:00 – 8:30", activity: "Wake up, morning chores, toileting", by: "", obs: "" },
        { time: "8:30", activity: "Breakfast", by: "Cook", obs: "" },
        { time: "8:30 – 12:30", activity: "Manual labour and prayers", by: "Chief educator, educators, vocational instructors", obs: "Church service on Sundays, on campus" },
        { time: "12:30", activity: "Dinner", by: "Cook", obs: "" },
        { time: "3:00 – 4:00", activity: "Leisure: choir practice, drama, brainstorming", by: "Chief educator, educators, music director, trainees", obs: "" },
        { time: "4:00", activity: "Nap time", by: "Chief educator, educators, trainees", obs: "" },
        { time: "7:00", activity: "Supper", by: "Cook", obs: "" },
        { time: "10:00", activity: "Bed time", by: "Chief educator, educators", obs: "Lights out" },
      ],
      /*
        The source table lists "4:00 Nap time" ABOVE "3:00-4:00 Leisure
        activities", which cannot both be right. Presented here in chronological
        order. Worth confirming with the institute before publishing.
      */
      sourceNote:
        "Weekend nap and leisure times appear out of sequence in the source document; shown here in chronological order pending confirmation.",
    },
  },

  /** Priority asks, drawn from the challenges across pages 7-8. */
  appeals: [
    {
      id: "solar",
      title: "Solar power",
      body: "One installation resolves three failures at once: water pumping, lighting, and campus security. Currently the borehole stops whenever the power does.",
      urgency: "Urgent",
    },
    {
      id: "braille",
      title: "A braille embosser",
      body: "Braille is the core of rehabilitation here, and every sheet is currently produced by hand. An embosser multiplies what two temporary teachers can do.",
      urgency: "Urgent",
    },
    {
      id: "canes",
      title: "White canes",
      body: "For trainees whose families cannot afford one. A cane is the difference between being led and going somewhere alone.",
      urgency: "Ongoing",
    },
    {
      id: "dormitory",
      title: "Beds and lockers",
      body: "Many beds and lockers in both the girls' and boys' dormitories are beyond repair.",
      urgency: "Ongoing",
    },
    {
      id: "staff",
      title: "Specialised teaching staff",
      body: "Both braille instructors are temporary workers. The institute also needs a cook, a sports instructor and security personnel.",
      urgency: "Urgent",
    },
    {
      id: "roofs",
      title: "Roof repairs",
      body: "Water seeps through the administrative building's roof, which is weighted with stones to stop the zinc lifting in storms. The health unit's roof also needs work.",
      urgency: "Urgent",
    },
  ],

  /** Pages 5-6. */
  location: {
    street: "Bulu Blind Street",
    village: "Bulu village",
    town: "Buea",
    division: "Fako Division",
    landmark: "Bulu Blind Junction",
    between: "Between the Mile 17 corridor and the road leading to Mutengene",
    distance: "About 700m from the main highway",
    land: "Archives indicate the land originally allocated measured more than 7,000m². Part has since been lost to trespass, in the absence of a complete fence and a land title.",
  },

  /*
    Not from the technical file, which carries no contact details at all.
    Supplied separately by Joseph and to be confirmed with the institute.
    The phone is stored in two forms deliberately: `tel` is the E.164 value a
    dialler needs, `phone` is the grouping a Cameroonian reader expects to see.
  */
  contact: {
    phone: "+237 676 27 60 99",
    tel: "+237676276099",
    email: "alobwedececilia@gmail.com",
  },

  governance: [
    {
      role: "Board of Directors",
      body: "Provides overall governance, strategic direction and policy oversight.",
    },
    {
      role: "Director",
      body: "Head of the institution — daily operations, implementation of policy, staff supervision, institutional representation, discipline and security.",
    },
  ],

  supervisor: "Ministry of Social Affairs",
  decree: "Presidential Decree no. 80/380 of 13 September 1980",
} as const;

export type Section = (typeof institute.sections)[number];
