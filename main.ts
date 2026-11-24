// Two-Sentence Horror — entry program.
// Writes one horror story, told in exactly two sentences, to
// <MAKEFUN_OUTPUT_DIR>/entry.txt. The grader runs the repo read-only,
// so the program writes only to the output directory, never a
// relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The story: a neighbour's kind routine, then the reveal that
// unmakes it. Sentence one is entirely mundane — plants watered,
// a note left. Sentence two takes away, one clause at a time,
// everything that made it mundane: no fern, no neighbour, no
// fourth floor. On a second read, sentence one is no longer a
// kindness; it is proof that someone has been inside the flat
// every time the narrator travels, tending plants that were
// never theirs, and will be again.
const STORY =
  "Every time I travel, the man in flat 4B waters my plants and leaves a note about how the fern is doing. " +
  "I have never owned a fern, I have never met the man in 4B, and my building has no fourth floor.";

// The gate the house runs is 1-400 characters of UTF-8 text, and
// the judge weighs whether the entry is really a horror story in
// exactly two sentences, so refuse to write anything that is not
// both before touching the output.
const SENTENCES = STORY.trim().split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (SENTENCES.length !== 2) {
  console.error(`story must be exactly two sentences, got ${SENTENCES.length}`);
  process.exit(1);
}
if (STORY.length < 1 || STORY.length > 400) {
  console.error(`story must be 1-400 characters, got ${STORY.length}`);
  process.exit(1);
}
// A stray newline or trailing space would count toward the 400
// characters and blur the two-sentence shape, so require clean
// single-line text that ends on terminal punctuation.
if (STORY !== STORY.trim() || STORY.includes("\n") || !/[.!?]$/.test(STORY)) {
  console.error("story must be clean single-line text ending in terminal punctuation");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), STORY, "utf8");
console.log(`wrote entry.txt (${STORY.length} chars, ${SENTENCES.length} sentences) to ${OUTPUT_DIR}`);
