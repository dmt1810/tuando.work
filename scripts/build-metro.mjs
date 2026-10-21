import { spawnSync } from 'node:child_process';
import {
  readFile,
  writeFile,
  mkdir,
  copyFile,
  readdir,
} from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';

import ts from 'typescript';
const source = resolve('scripts/metro');
const output = resolve('.metro-build');
await mkdir(output, { recursive: true });
const typescript = await readFile(join(source, 'metro-geometry.ts'), 'utf8');
await writeFile(
  join(source, 'geometry.mjs'),
  ts.transpileModule(typescript, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
    },
  }).outputText,
);
const geometry = await import(new URL('./metro/geometry.mjs', import.meta.url));
await writeFile(
  join(source, 'geometry.json'),
  JSON.stringify({
    trunk: geometry.trunkPath,
    lines: geometry.linePaths(),
    stations: geometry.STATIONS,
    distances: geometry.stationOffsetDistances(),
  }),
);
const python =
  process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const result = spawnSync(python, [join(source, 'build.py'), '--production'], {
  stdio: 'inherit',
  env: { ...process.env, PYTHONUTF8: '1' },
});
if (result.error)
  throw new Error(
    `Python 3.10+ is required to build the metro pages: ${result.error.message}`,
  );
if (result.status !== 0) process.exit(result.status ?? 1);

// Keep the existing strict CSP: move all generated style attributes into a stylesheet.
const rules = new Map();
async function normalize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await normalize(file);
    else if (entry.name.endsWith('.html')) {
      let document = (await readFile(file, 'utf8')).replaceAll(
        'href="/cv.pdf"',
        'href="/Tuan_Do_CV.pdf"',
      );
      document = document.replace(
        /<([a-z][^<>]*?)\sstyle="([^"]*)"([^<>]*?)>/gi,
        (_, before, encoded, after) => {
          const css = encoded
            .replaceAll('&quot;', '"')
            .replaceAll('&amp;', '&')
            .replaceAll('&#x27;', "'");
          const name =
            'ml-' + createHash('sha256').update(css).digest('hex').slice(0, 12);
          rules.set(name, css);
          let tag = before + after;
          const selfClosing = /\/\s*$/.test(tag);
          if (selfClosing) tag = tag.replace(/\/\s*$/, '');
          tag = /\bclass="/.test(tag)
            ? tag.replace(/\bclass="([^"]*)"/, `class="$1 ${name}"`)
            : tag + ` class="${name}"`;
          return '<' + tag + (selfClosing ? '/>' : '>');
        },
      );
      document = document.replace(
        '</head>',
        '<link rel="stylesheet" href="/assets/metro-layout.css"></head>',
      );
      await writeFile(file, document);
    }
  }
}
await normalize(output);
await mkdir('public/assets', { recursive: true });
await writeFile(
  'public/assets/metro-layout.css',
  [...rules].map(([name, css]) => `.${name}{${css}}`).join('\n'),
);
for (const name of ['metro-v2.css', 'metro-motion.js']) {
  await copyFile(join(output, 'assets', name), join('public/assets', name));
}
// Stable asset URLs can combine new HTML with cached code from an older release.
const assetVersions = new Map();
for (const name of ['metro-v2.css', 'metro-layout.css', 'metro-motion.js']) {
  const hash = createHash('sha256')
    .update(await readFile(join('public/assets', name)))
    .digest('hex')
    .slice(0, 16);
  assetVersions.set(`/assets/${name}`, hash);
}
async function versionAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await versionAssets(file);
    else if (entry.name.endsWith('.html')) {
      let document = await readFile(file, 'utf8');
      for (const [path, hash] of assetVersions)
        document = document.replaceAll(`"${path}"`, `"${path}?v=${hash}"`);
      await writeFile(file, document);
    }
  }
}
await versionAssets(output);
for (const name of await readdir(output)) {
  if (name.endsWith('.dc.html'))
    await copyFile(join(output, name), join('public', name));
}
console.log(
  'Metro pages prepared for Astro; generated styles retain the strict CSP.',
);
