// News-image entry: publish the bundled illustration as the submission.
//
// The picture itself lives in entry.png next to this file. This program does
// one thing only: drop an exact copy of that picture into the output folder
// as entry.png, so the grader finds the submission where it expects it.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths relative to this file, not the working directory, so the
// program behaves the same no matter where it is launched from.
const folder = dirname(fileURLToPath(import.meta.url));
const picture = join(folder, "entry.png");

// Fail loudly (instead of a cryptic copy error) if the bundled picture is
// missing from the submission folder.
if (!existsSync(picture)) {
  throw new Error(`bundled picture not found next to main.ts: ${picture}`);
}

// The harness tells us where to write via MAKEFUN_OUTPUT_DIR; fall back to
// the conventional "/output" when it is not set.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const destination = join(outDir, "entry.png");
copyFileSync(picture, destination);
console.log(`entry.png -> ${destination}`);
