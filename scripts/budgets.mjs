import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
const assets = await readdir('dist/_astro');
let total = 0,
  office = 0;
for (const name of assets.filter((n) => n.endsWith('.js'))) {
  const bytes = gzipSync(await readFile(join('dist/_astro', name))).length;
  total += bytes;
  if (name.toLowerCase().startsWith('office')) office += bytes;
}
total += gzipSync(await readFile('dist/theme-init.js')).length;
const html = await readFile('dist/index.html', 'utf8');
const sprites =
  (await stat('dist/office-floor.svg')).size +
  [...html.matchAll(/<span class="sprite">(.*?)<\/span>/g)].reduce(
    (sum, match) => sum + Buffer.byteLength(match[1]),
    0,
  );
const result = {
  allClientJsGzip: total,
  officeJsGzip: office,
  officeArtwork: sprites,
};
console.log(JSON.stringify(result, null, 2));
if (total > 80000 || office > 30000 || sprites > 100000)
  throw new Error('Performance budget exceeded');
