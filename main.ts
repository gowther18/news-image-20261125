// Entry program for make.fun's "news-image-20261125" bounty.
//
// This repository ships the finished front page for Wednesday 25 November
// 2026 as entry.png. All the news work — research, layout, illustration
// panels, typesetting — is already baked into that one file.
//
// What this program does when the harness runs it: it looks up the
// output directory from MAKEFUN_OUTPUT_DIR (falling back to /output),
// makes sure the directory exists, and copies entry.png there byte for
// byte. It never touches the network and never changes the image, so
// running it twice, ten times, or a hundred times always writes exactly
// the same bytes.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const bundledImage = join(repoRoot, "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.png");
mkdirSync(outputDir, { recursive: true });

copyFileSync(bundledImage, outputFile);
