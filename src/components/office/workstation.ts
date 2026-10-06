export function workstation(frontDesk = false) {
  const desk = frontDesk
    ? `<path d="M4 23h62v17H4z" fill="#b59164"/><path d="M4 23h62v4H4" fill="#ddbd90"/><path d="M8 39h54v5H8" fill="#8c704e"/><rect x="23" y="28" width="26" height="8" fill="#ede5d4"/><path d="M27 31h18m-18 2h14" stroke="#697566"/>`
    : `<path d="M5 21h60v15H5z" fill="#9a7854"/><path d="M5 21h60v10H5z" fill="#d5b588"/><path d="M7 34h3v10H7m50-10h3v10h-3" fill="#786b57"/><path d="M24 35h23v10H24z" fill="#78886e"/><path d="M28 44h15v5H28" fill="#606d59"/><path d="M32 47v4m-7 0h19" stroke="#545d52" stroke-width="2"/><path d="M21 4h27v19H21z" fill="#596059"/><path d="M23 6h23v13H23z" class="screen-glass"/><path d="M26 10h5m3 0h7m-15 3h12m-12 3h6" class="screen-code" stroke-width="1"/><path d="M32 23v3m-5 0h15" stroke="#596059" stroke-width="2"/><path d="M23 28h21v3H23" fill="#e5e2d5"/><path d="M48 28h4v3h-4" fill="#e5e2d5"/><path d="M10 17h5v5h-5" fill="#f2eadc"/><path d="M15 18h2v3h-2" stroke="#f2eadc"/>`;
  return `<svg class="workstation" xmlns="http://www.w3.org/2000/svg" width="140" height="104" viewBox="0 0 70 52" shape-rendering="crispEdges" aria-hidden="true">${desk}</svg>`;
}
