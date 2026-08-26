#!/usr/bin/env node
/**
 * Imagery for the RIB site.
 *
 * IMPORTANT: these are PLACEHOLDERS. Every one should be replaced with a real
 * photograph of the institute before this site goes live — a donor can tell
 * stock from the real thing, and for a 58-year-old institution the real thing
 * is far more persuasive. Each entry names the shot the institute should take
 * to replace it (`replaceWith`), so the brief for a photographer is already
 * written.
 *
 * Source: Pexels. Pexels License, free for commercial use, attribution not
 * required. Ids recorded so provenance survives a handover.
 *
 *   node art/fetch-photos.mjs
 */

import { mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW = path.join(root, "art", "raw");
const OUT = path.join(root, "public", "img");

const PHOTOS = [
  {
    id: "hero",
    pexels: 7695373,
    w: 2000,
    h: 1125,
    replaceWith: "Wide shot of trainees in a classroom, or hands on a braille slate, shot at RIB.",
  },
  {
    id: "stakes",
    pexels: 7188965,
    w: 1200,
    h: 900,
    replaceWith: "A trainee reading braille, close on the hands.",
  },
  {
    id: "special-education",
    pexels: 5905554,
    w: 1200,
    h: 900,
    replaceWith: "An educator working one-to-one with a new trainee.",
  },
  {
    id: "school",
    pexels: 36467885,
    w: 1200,
    h: 900,
    replaceWith: "A braille lesson in one of the seven classrooms.",
  },
  {
    id: "vocational",
    pexels: 32007065,
    w: 1200,
    h: 900,
    replaceWith: "Handicraft or agriculture work in the vocational workshop.",
  },
  {
    id: "day",
    pexels: 25457343,
    w: 1600,
    h: 900,
    replaceWith: "Morning assembly, the anthem, or the refectory at breakfast.",
  },
  {
    id: "people",
    pexels: 34211747,
    w: 1200,
    h: 900,
    replaceWith: "The staff, together, on campus.",
  },
  {
    id: "support",
    pexels: 7488088,
    w: 1200,
    h: 900,
    replaceWith: "A braille slate in use, or the workshop donated by Orange Cameroon.",
  },
];

const url = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

async function download(entry) {
  const raw = path.join(RAW, `${entry.id}.jpg`);
  if (existsSync(raw)) return raw;
  const res = await fetch(url(entry.pexels), {
    headers: { "user-agent": "Mozilla/5.0 (rib-buea build)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await writeFile(raw, Buffer.from(await res.arrayBuffer()));
  return raw;
}

async function main() {
  await mkdir(RAW, { recursive: true });
  await mkdir(OUT, { recursive: true });

  let inBytes = 0;
  let outBytes = 0;
  const failed = [];

  for (const entry of PHOTOS) {
    try {
      const raw = await download(entry);
      inBytes += (await stat(raw)).size;
      const to = path.join(OUT, `${entry.id}.webp`);

      await sharp(raw)
        // Attention crop: these are arbitrary stock framings, and a geometric
        // centre crop repeatedly put the subject against an edge.
        .resize(entry.w, entry.h, {
          fit: "cover",
          position: sharp.strategy.attention,
        })
        /*
          One shared grade so eight photographers read as one set. Slight
          desaturation and a warm channel lift pull them toward the site's
          warm-neutral palette. NOTE: sharp's .tint() greyscales before
          tinting, so warmth is done with a per-channel linear ramp instead.
        */
        .modulate({ saturation: 0.82, brightness: 1.02 })
        .linear([1.03, 1.0, 0.95], [0, 0, 3])
        .webp({ quality: 80, effort: 5 })
        .toFile(to);

      outBytes += (await stat(to)).size;
      console.log(`  ok   ${entry.id.padEnd(18)} pexels/${entry.pexels}`);
    } catch (err) {
      failed.push(`${entry.id}: ${err.message}`);
      console.log(`  FAIL ${entry.id.padEnd(18)} ${err.message}`);
    }
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(2);
  console.log("");
  console.log(`images:   ${PHOTOS.length - failed.length}/${PHOTOS.length}`);
  console.log(`jpeg in:  ${mb(inBytes)} MB`);
  console.log(`webp out: ${mb(outBytes)} MB`);
  console.log(`staged:   public/img/`);
  if (failed.length) {
    console.log("\nFAILED:");
    failed.forEach((f) => console.log(`  ${f}`));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
