// metro-geometry.ts  (pure functions, run at build time, outputs SVG path strings)
export type Pt = [number, number];
export const TRUNK: Pt[] = [
  [50, 280],
  [165, 280],
  [255, 190],
  [365, 190],
  [455, 280],
  [565, 280],
  [655, 190],
  [765, 190],
  [855, 280],
  [965, 280],
  [1055, 190],
  [1140, 190],
];
export const STATIONS = [
  // id, x, y  (every station sits on a horizontal segment)
  { id: 'a', x: 110, y: 280 },
  { id: 'b', x: 310, y: 190 },
  { id: 'c', x: 510, y: 280 },
  { id: 'd', x: 710, y: 190 },
  { id: 'e', x: 910, y: 280 },
];
export const FUTURE: Pt = [1085, 190];
export const R0 = 36; // corner radius of the trunk
export const EXT = 32; // px a line extends beyond its first/last stop
export const LINES = [
  // offset > 0 draws toward the top on horizontal runs
  { n: 1, key: 'perf', color: '#C8361A', offset: 15, stops: [0, 1, 3, 4] },
  { n: 2, key: 'crm', color: '#2347D6', offset: 5, stops: [0, 2] },
  { n: 3, key: 'data', color: '#17794A', offset: -5, stops: [1, 2, 4] },
  { n: 4, key: 'b2b', color: '#E0A100', offset: -15, stops: [3, 4] },
];

const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const unit = (v: Pt): Pt => {
  const l = Math.hypot(v[0], v[1]);
  return [v[0] / l, v[1] / l];
};
const normal = (d: Pt): Pt => [d[1], -d[0]];
const cum = [0];
TRUNK.slice(1).forEach((p, i) => cum.push(cum[i] + dist(TRUNK[i], p)));

export function arcOf(x: number, y: number) {
  // arc length of a point lying on the trunk
  for (let i = 0; i < TRUNK.length - 1; i++) {
    const [x0, y0] = TRUNK[i],
      [x1, y1] = TRUNK[i + 1];
    const on =
      Math.min(x0, x1) - 1e-6 <= x &&
      x <= Math.max(x0, x1) + 1e-6 &&
      Math.abs((y1 - y0) * (x - x0) - (x1 - x0) * (y - y0)) <
        1e-6 * Math.max(1, Math.abs(x1 - x0) + Math.abs(y1 - y0));
    if (on) return cum[i] + dist([x0, y0], [x, y]);
  }
  throw new Error('point not on trunk');
}
function at(s: number): Pt {
  for (let i = 0; i < TRUNK.length - 1; i++)
    if (s <= cum[i + 1] + 1e-9) {
      const t = (s - cum[i]) / (cum[i + 1] - cum[i]);
      const [x0, y0] = TRUNK[i],
        [x1, y1] = TRUNK[i + 1];
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
    }
  throw new Error('s out of range');
}
function subPoly(s0: number, s1: number): Pt[] {
  const pts: Pt[] = [at(s0)];
  TRUNK.forEach((p, k) => {
    if (s0 + 1e-6 < cum[k] && cum[k] < s1 - 1e-6) pts.push(p);
  });
  pts.push(at(s1));
  return pts;
}
function offsetPoly(pts: Pt[], off: number): Pt[] {
  // parallel copy with mitred corners
  return pts.map((p, i) => {
    let n: Pt;
    if (i === 0) n = normal(unit([pts[1][0] - p[0], pts[1][1] - p[1]]));
    else if (i === pts.length - 1)
      n = normal(unit([p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]]));
    else {
      const n1 = normal(unit([p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]]));
      const n2 = normal(unit([pts[i + 1][0] - p[0], pts[i + 1][1] - p[1]]));
      const k = 1 / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
      n = [(n1[0] + n2[0]) * k, (n1[1] + n2[1]) * k];
    }
    return [p[0] + n[0] * off, p[1] + n[1] * off] as Pt;
  });
}
const f = (n: number) => n.toFixed(1);
function rounded(pts: Pt[], r0: number, off = 0, base?: Pt[]): string {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1],
      p = pts[i],
      b = pts[i + 1];
    const d1 = unit([p[0] - a[0], p[1] - a[1]]),
      d2 = unit([b[0] - p[0], b[1] - p[1]]);
    const ang = Math.acos(
      Math.max(-1, Math.min(1, d1[0] * d2[0] + d1[1] * d2[1])),
    );
    const w: Pt = base ? [p[0] - base[i][0], p[1] - base[i][1]] : [0, 0];
    const inside = w[0] * (d2[0] - d1[0]) + w[1] * (d2[1] - d1[1]) > 0; // keeps parallel lines concentric
    const r = inside ? r0 - Math.abs(off) : r0 + Math.abs(off);
    const t = r * Math.tan(ang / 2);
    d += ` L${f(p[0] - d1[0] * t)} ${f(p[1] - d1[1] * t)} Q${f(p[0])} ${f(p[1])} ${f(p[0] + d2[0] * t)} ${f(p[1] + d2[1] * t)}`;
  }
  return d + ` L${f(pts[pts.length - 1][0])} ${f(pts[pts.length - 1][1])}`;
}
export const trunkPath = rounded(TRUNK, R0); // the train rides this path (CSS offset-path)

export function linePaths() {
  return LINES.map((l) => {
    const first = STATIONS[l.stops[0]],
      last = STATIONS[l.stops[l.stops.length - 1]];
    const base = subPoly(
      arcOf(first.x, first.y) - EXT,
      arcOf(last.x, last.y) + EXT,
    );
    return { ...l, d: rounded(offsetPoly(base, l.offset), R0, l.offset, base) };
  });
}
// station position along the ROUNDED trunk, as a percentage for CSS offset-distance
function sample(d: string, n = 60): Pt[] {
  const tok = d.match(/[MLQ]|-?\d+\.?\d*/g)!;
  let i = 0,
    cur: Pt = [0, 0];
  const out: Pt[] = [];
  while (i < tok.length) {
    const c = tok[i++];
    if (c === 'M' || c === 'L') {
      cur = [+tok[i], +tok[i + 1]];
      i += 2;
      out.push(cur);
    } else {
      const [cx, cy, x, y] = tok.slice(i, i + 4).map(Number);
      i += 4;
      for (let k = 1; k <= n; k++) {
        const t = k / n;
        out.push([
          (1 - t) ** 2 * cur[0] + 2 * (1 - t) * t * cx + t * t * x,
          (1 - t) ** 2 * cur[1] + 2 * (1 - t) * t * cy + t * t * y,
        ]);
      }
      cur = [x, y];
    }
  }
  return out;
}
export function stationOffsetDistances(): Record<string, number> {
  const pts = sample(trunkPath),
    c = [0];
  for (let i = 1; i < pts.length; i++)
    c.push(c[i - 1] + dist(pts[i - 1], pts[i]));
  const total = c[c.length - 1],
    res: Record<string, number> = {};
  for (const s of STATIONS) {
    let j = 0,
      best = Infinity;
    pts.forEach((p, i) => {
      const dd = (p[0] - s.x) ** 2 + (p[1] - s.y) ** 2;
      if (dd < best) {
        best = dd;
        j = i;
      }
    });
    res[s.id] = +((c[j] / total) * 100).toFixed(2);
  }
  return res;
}
