// News-image entry for 21 November 2026: the image is entry.png beside
// this file (a JPEG by its bytes, named entry.png as the rules allow), and
// this program copies it to /output/entry.png. Node 22, standard library
// only. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), readFileSync(new URL('./entry.png', import.meta.url)));
