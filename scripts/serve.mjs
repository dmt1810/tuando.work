import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
export function serve(root = 'dist', port = 0) {
  const base = resolve(root),
    types = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.woff2': 'font/woff2',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.xml': 'application/xml',
    };
  const server = createServer(async (req, res) => {
    try {
      let path = resolve(
        base,
        '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
      );
      if (path !== base && !path.startsWith(base + sep))
        throw new Error('Outside root');
      try {
        if ((await stat(path)).isDirectory())
          path = resolve(path, 'index.html');
      } catch {}
      let body;
      try {
        body = await readFile(path);
      } catch {
        res.statusCode = 404;
        body = await readFile(resolve(base, '404.html'));
        path = '404.html';
      }
      const extension = extname(path);
      res.setHeader(
        'Content-Type',
        types[extension] || 'application/octet-stream',
      );
      res.setHeader(
        'Cache-Control',
        path.includes(`${sep}_astro${sep}`)
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=300',
      );
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'",
      );
      if (
        body.length > 512 &&
        /gzip/.test(req.headers['accept-encoding'] ?? '') &&
        ['.html', '.css', '.js', '.svg', '.json', '.txt', '.xml'].includes(
          extension,
        )
      ) {
        body = gzipSync(body);
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Vary', 'Accept-Encoding');
      }
      res.end(body);
    } catch {
      res.statusCode = 400;
      res.end('Bad request');
    }
  });
  return new Promise((done) =>
    server.listen(port, '127.0.0.1', () =>
      done({ server, url: `http://127.0.0.1:${server.address().port}` }),
    ),
  );
}
if (process.argv[1]?.endsWith('serve.mjs')) {
  const { url } = await serve('dist', Number(process.env.PORT || 4321));
  console.log(url);
}
