// Swappable, deterministic 8 × 12 pixel artwork. No downloaded sprite assets.
export const colors: Record<string, string> = {
  mgr: '#7F77DD',
  per: '#D85A30',
  crm: '#D4537E',
  dat: '#378ADD',
  aut: '#1D9E75',
  cre: '#BA7517',
  seo: '#639922',
  ops: '#888780',
  fd: '#185FA5',
};
const map = [
  '..hhhh..',
  '.hhhhhh.',
  '.hssss h.'.replace(' ', ''),
  '.hseksh.',
  '..ssss..',
  '...ss...',
  '..bbbb..',
  '.bbbbbb.',
  '.bsbb sb'.replace(' ', ''),
  '..bbbb..',
  '..l..l..',
  '..l..l..',
];
export function sprite(id: string) {
  const palette: Record<string, string> = {
    h: ['cre', 'dat', 'fd'].includes(id) ? '#543d2a' : '#292a2c',
    s: '#dab08a',
    e: '#242420',
    k: '#dab08a',
    b: colors[id],
    l: '#454542',
  };
  const paths: Record<string, string> = {};
  for (let frame = 0; frame < 3; frame++)
    map.forEach((row, y) => {
      const pixels = Array.from(row.padEnd(8, '.').slice(0, 8));
      // Horizontal runs make the inline sheet small while preserving exact pixels.
      for (let x = 0; x < 8;) {
        const pixel = pixels[x];
        let end = x + 1;
        while (end < 8 && pixels[end] === pixel) end++;
        if (pixel !== '.') {
          const fill = palette[pixel];
          const offset = frame === 1 && y === 8 ? 1 : 0;
          paths[fill] =
            (paths[fill] ?? '') +
            `M${frame * 8 + x} ${y - offset}h${end - x}v1h-${end - x}Z`;
        }
        x = end;
      }
    });
  const frames = Object.entries(paths)
    .map(([fill, d]) => `<path fill="${fill}" d="${d}"/>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="48" viewBox="0 0 24 12" shape-rendering="crispEdges" aria-hidden="true">${frames}</svg>`;
}
