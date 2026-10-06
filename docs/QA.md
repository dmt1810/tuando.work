# Local verification

Verified on 2026-10-06 using the bundled Node 24.19.0 runtime and Playwright Chromium on Windows. The project requires Node 22.12 or newer and CI is configured for Node 22.

The complete build, type check and PDF generation also pass on Node 22.22.1.

- `npm run build`: passed. Strict type check reports no errors, warnings or hints. Astro generated 30 HTML pages, social preview images, sitemap, RSS, crawler files and the CV PDF.
- `npm test`: 34 checks passed across desktop and mobile. Includes every built page's H1, JSON-LD, OG image and internal resources, light/dark accessibility, mobile menu navigation, the active office, reduced motion, Save-Data, JavaScript-disabled content and private-profile validation. Office character and label bounds also pass at 320, 640 and 768 pixels.
- Mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100. Simulated LCP 1.81 seconds and CLS 0. These are local lab measurements, not production field data. The preview uses gzip, cache headers and CSP matching nginx's configuration.
- All client JavaScript: 3,130 bytes gzip, including theme initialization. Office plus lazy loader: 2,554 bytes gzip. Inline character and workstation artwork plus both room assets: 32,592 bytes before compression.
- CV PDF: two A4 pages. Extracted text contains the approved public email, website and LinkedIn, no phone number and no excluded employer.
- `npm run dev`: starts and serves the local Astro project.
- Visual review: desktop, mobile, narrow phone, tablet, Vietnamese and dark theme screenshots. Mobile expanded office bubbles remain inside the scene. The original pixel office artwork follows the owner's new visual reference; see `OFFICE_REFERENCE.md`.

The installed Astro 7/MDX build emits a bundler warning about `use astro:head-inject` in generated MDX modules. Content renders and all resource checks pass. No custom script depends on that directive.

## Remaining release checks

Docker and GHCR publishing were not executed locally. The workflow builds and tests before publishing an arm64 image when main is updated. Confirm the actual cloudflared network and route, review the owner backlog and perform the staging checks in `CUTOVER.md` before release.

Original plan and seed are stored in `docs/`. Local implementation was delivered as coherent milestones. Nothing has been pushed or deployed.
