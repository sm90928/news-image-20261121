// News-image entry for 21 November 2026: the image is entry.png beside
// this file (a JPEG by its bytes, named entry.png as the rules allow), and
// this program copies it to /output/entry.png. Node 22, standard library
// only. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(new URL('./entry.png', import.meta.url));
if (bytes.length === 0) throw new Error('entry.png is empty');
// The entry is a JPEG: its first three bytes must be FF D8 FF, so a
// wrongly saved file is caught here instead of scoring 0 at the gate.
if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
  throw new Error('entry.png is not a JPEG');
}
// A whole JPEG ends with the FF D9 end marker; a truncated file must not
// reach the grader.
if (bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
  throw new Error('entry.png is truncated: missing JPEG end marker');
}
const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, bytes);
// Verify the copy landed intact: a truncated output would score 0, so
// fail loudly instead of silently handing the grader a broken file.
const back = readFileSync(outPath);
if (!back.equals(bytes)) throw new Error('entry.png did not copy intact');
