import { writeFile } from 'node:fs/promises';

// Original artwork. Pixel Agents is a visual reference, no upstream assets are copied.
const definitions = `<defs>
  <pattern id="planks" width="64" height="24" patternUnits="userSpaceOnUse"><rect width="64" height="24" fill="#e5dac3"/><path d="M0 0h64M0 12h64M32 0v12M0 12v12" fill="none" stroke="#cbbd9f" stroke-width="1"/><path d="M6 6h18m18 12h14" stroke="#d6c8ab"/></pattern>
  <g id="plant"><path d="M10 20V4h4v16M6 18V8h4v10M14 18V7h4v11M2 13V6h4v7M18 14V4h4v10" fill="#6a855a"/><path d="M6 12H2v4h8M14 10h8v4h-8" fill="#8aa176"/><path d="M5 20h15v4H5zm2 4h11v10H7z" fill="#b79164"/><path d="M7 24h11v3H7" fill="#8a6a48"/></g>
  <g id="shelf"><path d="M0 0h76v26H0z" fill="#8a6b4e"/><path d="M3 3h70v8H3zm0 12h70v8H3" fill="#c6a377"/><path d="M5 4h5v7H5m8-8h4v8h-4m8-6h5v6h-5m8-8h4v8h-4m8-7h6v7h-6m9-9h4v9h-4m8-6h5v6h-5M5 15h5v8H5m9-7h6v7h-6m10-9h4v9h-4m9-7h6v7h-6m10-8h4v8h-4m8-5h6v5h-6" fill="#6d8072"/><path d="M10 4h3v7h-3m23-8h4v8h-4m22 13h4v6h-4" fill="#d8c1a1"/></g>
  <g id="board"><path d="M0 0h112v35H0z" fill="#9b927c"/><path d="M3 3h106v28H3z" fill="#f5f1e8"/><path d="M12 23v-7h4v7m5 0V12h4v11m5 0V8h4v15" fill="#718c78"/><path d="M45 9h24m-24 7h50m-50 7h36" stroke="#aaa99a" stroke-width="2"/><path d="M77 6h9v9h-9" fill="#d5b66e"/></g>
  <g id="coffee"><path d="M0 0h40v32H0z" fill="#9d815c"/><path d="M2 2h36v5H2" fill="#cfb38b"/><path d="M6 9h28v20H6" fill="#bb9b73"/><path d="M19 10v17" stroke="#8b7354"/><path d="M8 -14h15v14H8z" fill="#4d5650"/><path d="M11 -11h9v5h-9" fill="#adc1ad"/><path d="M12 -4h7v4h-7" fill="#e8e4d8"/><path d="M28 -5h6v5h-6" fill="#ece8dc"/></g>
  <g id="clock"><rect width="18" height="18" fill="#959381"/><rect x="2" y="2" width="14" height="14" fill="#f4f0e6"/><path d="M9 4v5h5" fill="none" stroke="#63675d" stroke-width="2"/></g>
</defs>`;

function room(mobile) {
  const width = mobile ? 280 : 560,
    height = mobile ? 350 : 315;
  const decor = mobile
    ? `<use href="#board" x="84" y="12"/><use href="#plant" x="13" y="28"/><use href="#plant" x="243" y="28"/><use href="#coffee" x="16" y="310"/><use href="#plant" x="248" y="306"/>`
    : `<use href="#shelf" x="34" y="13"/><use href="#shelf" x="450" y="13"/><use href="#board" x="224" y="12"/><use href="#clock" x="164" y="17"/><use href="#plant" x="20" y="114"/><use href="#plant" x="516" y="114"/><use href="#coffee" x="30" y="263"/><use href="#plant" x="509" y="270"/>`;
  const carpets = mobile
    ? `<rect x="12" y="76" width="256" height="54" fill="#cad1c0"/><rect x="12" y="163" width="256" height="54" fill="#cad1c0"/><rect x="12" y="250" width="256" height="54" fill="#cad1c0"/>`
    : `<rect x="65" y="74" width="430" height="59" fill="#cad1c0"/><rect x="65" y="178" width="430" height="59" fill="#cad1c0"/><rect x="205" y="259" width="150" height="41" fill="#cad1c0"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width * 2}" height="${height * 2}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" shape-rendering="crispEdges">${definitions}<rect width="${width}" height="${height}" fill="#e5dac3"/><rect x="8" y="48" width="${width - 16}" height="${height - 56}" fill="url(#planks)"/><rect x="8" y="8" width="${width - 16}" height="40" fill="#d9ddcf"/><path d="M8 8h${width - 16}M8 48h${width - 16}M8 8v${height - 16}M${width - 8} 8v${height - 16}M8 ${height - 8}h${width - 16}" fill="none" stroke="#b4b7a4" stroke-width="4"/><path d="M8 48h${width - 16}" stroke="#acaa95" stroke-width="4"/>${carpets}${decor}<path d="M${width / 2 - 17} ${height - 8}h34" stroke="#e5dac3" stroke-width="6"/></svg>`;
}
await writeFile('public/office-floor.svg', room(false));
await writeFile('public/office-floor-mobile.svg', room(true));
console.log('Original desktop and mobile office artwork generated.');
