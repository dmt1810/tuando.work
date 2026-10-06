// Original 16 × 24 pixel characters; generated locally without downloaded assets.
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
const identities: Record<string, [string, string, string]> = {
  mgr: ['#36343a', '#c99471', 'short'],
  cre: ['#90633d', '#e2b891', 'curly'],
  per: ['#333337', '#bd8767', 'short'],
  crm: ['#473c35', '#e0b294', 'bob'],
  dat: ['#a18c76', '#d4a481', 'short'],
  aut: ['#3a352e', '#b47f5d', 'curly'],
  seo: ['#645041', '#ddb08c', 'bun'],
  ops: ['#b0a79b', '#b98768', 'short'],
  fd: ['#433731', '#e1b697', 'bob'],
};
export function sprite(id: string) {
  const [hair, skin, style] = identities[id];
  const palette: Record<string, string> = {
    h: hair,
    s: skin,
    e: '#302e2b',
    c: '#eee5d4',
    b: colors[id],
    l: '#47524c',
    f: '#343b36',
  };
  const paths: Record<string, string> = {};
  for (let frame = 0; frame < 3; frame++) {
    const pixels = Array.from({ length: 24 }, () =>
      Array<string>(16).fill('.'),
    );
    const paint = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: string,
    ) => {
      for (let row = y; row < y + h; row++)
        for (let col = x; col < x + w; col++) pixels[row][col] = color;
    };
    paint(5, 1, 6, 1, 'h');
    paint(4, 2, 8, 8, 'h');
    paint(3, 3, 1, 5, 'h');
    paint(12, 3, 1, 5, 'h');
    paint(5, 6, 6, 5, 's');
    paint(4, 7, 1, 3, 's');
    paint(11, 7, 1, 3, 's');
    paint(6, 8, 1, 1, 'e');
    paint(9, 8, 1, 1, 'e');
    paint(7, 10, 2, 1, 'e');
    paint(7, 11, 2, 2, 's');
    paint(4, 13, 8, 6, 'b');
    paint(5, 12, 6, 2, 'b');
    paint(7, 12, 2, 2, 'c');
    paint(3, 14, 2, 3, 'b');
    paint(11, 14, 2, 3, 'b');
    paint(3, 17 - (frame === 1 ? 1 : 0), 2, 2, 's');
    paint(11, 17 - (frame === 0 ? 1 : 0), 2, 2, 's');
    paint(5, 19, 6, 1, 'l');
    paint(5, 20, 2, 3, 'l');
    paint(9, 20, 2, 3, 'l');
    paint(frame === 2 ? 3 : 4, 23, 3, 1, 'f');
    paint(frame === 2 ? 10 : 9, 23, 3, 1, 'f');
    if (style === 'bob') {
      paint(3, 5, 2, 7, 'h');
      paint(11, 5, 2, 7, 'h');
    }
    if (style === 'curly') {
      paint(3, 2, 2, 2, 'h');
      paint(11, 2, 2, 2, 'h');
      paint(4, 0, 3, 2, 'h');
      paint(9, 0, 3, 2, 'h');
      paint(5, 5, 2, 2, 'h');
    }
    if (style === 'bun') {
      paint(10, 0, 3, 3, 'h');
      paint(5, 5, 5, 2, 'h');
    }
    if (style === 'short') {
      paint(5, 5, 3, 2, 'h');
      paint(10, 5, 1, 2, 'h');
    }
    pixels.forEach((row, y) => {
      // Merge horizontal runs to keep each inline sprite sheet compact.
      for (let x = 0; x < 16;) {
        const pixel = row[x];
        let end = x + 1;
        while (end < 16 && row[end] === pixel) end++;
        if (pixel !== '.') {
          const fill = palette[pixel];
          paths[fill] =
            (paths[fill] ?? '') +
            `M${frame * 16 + x} ${y}h${end - x}v1h-${end - x}Z`;
        }
        x = end;
      }
    });
  }
  const frames = Object.entries(paths)
    .map(([fill, d]) => `<path fill="${fill}" d="${d}"/>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="72" viewBox="0 0 48 24" shape-rendering="crispEdges" aria-hidden="true">${frames}</svg>`;
}
