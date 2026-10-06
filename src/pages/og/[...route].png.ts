import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { publicPages } from '../../data/pages';
export async function getStaticPaths() {
  return [
    ...(await publicPages()),
    { path: '/404/', title: 'Page not found' },
    { path: '/vi/404/', title: 'Không tìm thấy trang' },
  ].map((page) => ({
    params: { route: page.path.replace(/^\/|\/$/g, '') || 'home' },
    props: { title: page.title },
  }));
}
const esc = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  );
export const GET: APIRoute = async ({ props }) => {
  const words = String(props.title).split(' '),
    lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).length > 29) {
      lines.push(line);
      line = word;
    } else line += (line ? ' ' : '') + word;
  }
  if (line) lines.push(line);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FAF8F4"/><path d="M64 100h1072M64 530h1072" stroke="#E4E0D8"/><text x="64" y="72" fill="#0E7C66" font-family="sans-serif" font-size="24">TUAN DO / GROWTH · CRM · AUTOMATION</text>${lines
    .slice(0, 4)
    .map(
      (l, i) =>
        `<text x="64" y="${210 + i * 78}" fill="#1A1A18" font-family="serif" font-size="68">${esc(l)}</text>`,
    )
    .join(
      '',
    )}<text x="64" y="580" fill="#6B6A64" font-family="sans-serif" font-size="24">tuando.work</text><text x="950" y="580" fill="#0E7C66" font-family="sans-serif" font-size="24">Let’s talk ↗</text></svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
