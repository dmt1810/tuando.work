# tuando.work revamp: execution plan

Audience: a coding agent (Claude Code) working in github.com/dmt1810/tuando.work. Owner: Tuan (Do Manh Tuan).
Place this file at `docs/REVAMP_PLAN.md` and `profile.seed.json` at `docs/profile.seed.json`. Read both fully, then execute phases in order.

## 0. Agent rules

1. Work phase by phase. After every task run `npm run build` and fix errors before continuing. One commit per task, message format `T1.2: base layout and tokens`.
2. Do not ask the owner questions. When a decision is needed, take the default written here and leave a `TODO(human)` comment or note.
3. Never invent metrics, clients, dates or quotes. Numbers come only from `src/data/profile.json`, seeded from `docs/profile.seed.json`.
4. The repo is public. Never commit secrets, phone numbers, tokens, or any email other than hello@tuando.work.
5. Copy style: sentence case headings, no em dashes, no semicolons in prose, no "successfully", "leverage", "seamless", "unlock". Vietnamese must read naturally, not as literal translation. Mark generated Vietnamese with `needsReview: true`.
6. Never run `npm install` or any build on the TV box. Builds run locally or in GitHub Actions.

## 1. Goal and positioning

A personal brand hub, not only a CV. It must show three things together: Consult (marketing and martech automation consulting), Lab (side projects, automation flows, AI tools for sale), Proof (case studies with real numbers). It also works as a CV for job applications.

- Headline EN: "Growth marketer who builds the systems". VI: "Growth marketer tự xây hệ thống". Subline and stats are in the seed file.
- Primary CTA everywhere: "Let's talk", linking to LinkedIn (https://linkedin.com/in/dmt1810). Secondary: email hello@tuando.work.
- Services (3): `marketing-consulting`, `martech-automation`, `productized` (selling automation flows and AI tools).

## 2. Hard constraints

- Host: Armbian on aarch64 TV box, 1.75 GB RAM, Docker, `cloudflared` already in front. About 3.6 GB disk free. The site must be static files served by nginx:alpine with `mem_limit: 64m`.
- Output must be crawlable without JavaScript (AI crawlers do not run JS). All real content lives in server-rendered HTML.
- Budgets: mobile LCP under 2 s, CLS under 0.05, first-load JS at most 80 KB gzip excluding the lazy-loaded office, office JS at most 30 KB gzip, office sprites at most 100 KB total.
- No third-party requests at runtime. Self-host fonts. No analytics script in v1 (use Cloudflare and Search Console).

## 3. Stack (fixed)

- Astro (latest stable), static output, TypeScript strict, Tailwind CSS via the official Astro integration, `@astrojs/mdx`, `@astrojs/sitemap`, Astro built-in i18n.
- i18n: locales `en` (default, no prefix) and `vi` (prefix `/vi/`). `hreflang` for en, vi, and x-default pointing to en. A language switcher keeps the user on the equivalent page.
- Content collections with zod schemas: `services`, `work`, `lab`. Files at `src/content/<collection>/<lang>/<slug>.mdx`.
- Agent office: vanilla TypeScript island, no React, no animation library.
- Fonts via `@fontsource-variable`: Newsreader (headings), Inter (body). Mono uses the system `ui-monospace` stack. No other font files.
- Remove completely: React, react-router, react-query, shadcn/ui and Radix, framer-motion, lucide-react, the old `src/components`, `src/pages`, Dockerfile build stage. Keep and migrate: `public/tuan-profile.jpg`, `public/favicon.png`, client logos from `src/assets/logos`.

## 4. Repo layout

```
astro.config.mjs
docs/REVAMP_PLAN.md, docs/profile.seed.json
src/data/profile.json            single source of truth (schema in src/data/schema.ts)
src/i18n/en.json, vi.json        UI strings
src/content/{services,work,lab}/{en,vi}/*.mdx
src/layouts/Base.astro
src/components/  Header, Footer, Hero, StatStrip, ServiceCard, CaseCard, LabCard, Seo, JsonLd
src/components/office/  Office.astro, office.ts, scene.css, sprites.ts
src/pages/  index, services/index, services/[slug], work/index, work/[slug], lab/index, cv, 404 (each mirrored under vi/)
src/pages/  rss.xml.ts, robots.txt.ts, llms.txt.ts, llms-full.txt.ts, og/[...route].png.ts
scripts/build-cv-pdf.mjs
tests/  smoke.spec.ts (Playwright)
Dockerfile, nginx.conf, docker-compose.yml, .github/workflows/deploy.yml
```

## 5. Data model (single source of truth)

`src/data/profile.json` starts as a copy of `docs/profile.seed.json` and is validated by zod at build time. Rules:

- Every experience item has `show: { site, cv }`. The site pages, `/cv`, JSON-LD, `llms.txt` and the office all read from this file. No number is typed twice anywhere else.
- Office agents read `officeAgents` from the same file.
- Lifesup AI is intentionally absent. Do not add it. `TODO(human)`: owner decides if it appears on the site. It must never appear on the CV.
- Do not use any "22 to 30% CPA" phrasing. Correct facts: CPA down 22% (Metrixa), CPA down 18% (Mytour), ROI up 30% quarterly (Metrixa).
- No phone number on any public page or in the public PDF.

## 6. Visual design

Direction: editorial minimal with small "operator" details (mono labels, thin rules). Flat, calm, fast. Remove the rainbow bar, gradient text, blurred blobs, glow, parallax, spinning dot, and the 110vh hero.

Tokens (CSS variables, defined once in `src/styles/tokens.css`):

- Light: bg `#FAF8F4`, surface `#FFFFFF`, text `#1A1A18`, muted `#6B6A64`, border `#E4E0D8`, accent `#0E7C66`.
- Dark (auto via `prefers-color-scheme`, plus a manual toggle stored in localStorage): bg `#121210`, surface `#1A1A17`, text `#F2EFE8`, muted `#A5A298`, border `#2B2A26`, accent `#3DD6B0`.
- One accent only. Radius 10px. 1px borders. No shadows, no gradients.
- Layout: max width 1120px, 4px spacing scale, body 17px with line height 1.65, h1 `clamp(2.25rem, 5vw, 4rem)`.
- Motion: CSS only, 200 ms fade and translate, fully disabled under `prefers-reduced-motion`.
- Accessibility: visible focus rings, skip link, contrast AA, all interactive elements keyboard operable, touch targets at least 44px.

## 7. Home page order

1. Header: logo, nav (Services, Work, Lab, CV), language switch, theme toggle, "Let's talk" button.
2. Hero: H1, subline, two CTAs ("Let's talk", "View work"), stat strip (4 stats from the seed).
3. Agent office (section 8).
4. Services: 3 cards linking to service pages.
5. Selected work: 3 cards (Igloo, OneMount, one consulting client) linking to `/work/<slug>`.
6. Lab: up to 3 cards with status badge (live, beta, idea). Entries with `draft: true` are not built in production.
7. About: short text and photo.
8. Contact band: "Let's talk" (LinkedIn) and email.
9. Footer: nav, social links, language, last updated.

Service pages: first paragraph is a 40 to 60 word direct answer to "what is this and who needs it", then H2 sections phrased as questions (What problem does it solve, What do you get, How does it work, What does it cost or how do we start), a deliverables list, a short FAQ, and the "Let's talk" CTA. Draft EN copy from the seed data and the descriptions in section 1, then draft VI.

Case study pages: `Context`, `What I did`, `Result` (only real numbers from the data file), `Tools`. Add "Last updated" and author line.

## 8. Agent office (home page, autoplay)

Purpose: show what a marketing and ops consultant can do. It runs by itself and shows information without any controls. There are no goal chips, no "run" button, no side panel.

**Behavior**

- Roster and text come from `officeAgents` in the data file: Manager, Creative, Performance, CRM, Data, Automation, SEO/GEO, Ops, Front desk.
- A director loop runs every 3500 ms through this order: mgr, cre, per, crm, dat, aut, seo, ops, fd, then repeat. For the active agent: the sprite hops, other agents dim slightly, and a speech bubble appears above it showing `big` (20px) and `caption` (12px). Example: Manager shows "150% YoY" and "growth delivered at Igloo Insurtech".
- A small "brief" token travels from the previous active agent to the next one in 600 ms (CSS transform), to show the campaign handoff.
- Click or tap an agent: the loop pauses on that agent for 6 s and the bubble expands to show `role` plus a "Learn more" link to the agent's `link`. No other panel.
- Front desk is a real `<a>` to LinkedIn (`target="_blank"`, `rel="noopener noreferrer"`), bubble text "Let's talk".
- First tick starts 1200 ms after the scene becomes visible and only after LCP (use `requestIdleCallback`).
- Pause when off screen (IntersectionObserver), when the tab is hidden, and never start under `prefers-reduced-motion` or `Save-Data`. In those cases show the static scene.
- Never show a metric that is not in the data file. Entries with a `todo` field show their text as given.

**Markup and SEO**

- `Office.astro` always renders a semantic fallback `<ul>` of all agents with title, role, `big`, `caption` and link. It is visible when JS is off or motion is reduced, and visually hidden when the animated scene is active.
- Bubble has `aria-live="off"`. Agents are `<button>` elements with `aria-label`. The scene has a reserved `aspect-ratio` to prevent layout shift.

**Rendering**

- DOM based, not canvas. Background is one static WebP or SVG. Each agent is an absolutely positioned element with a CSS sprite animation using `steps()` (typing idle 2 frames, hop 3 frames). Only the active agent animates.
- v1 sprites are generated in code (`sprites.ts`): 8 by 12 pixel map (hair, skin, eyes, body, legs) scaled 4x, with per-agent hair and body colors (use the colors from the prototype: mgr `#7F77DD`, per `#D85A30`, crm `#D4537E`, dat `#378ADD`, aut `#1D9E75`, cre `#BA7517`, seo `#639922`, ops `#888780`, fd `#185FA5`). Keep the sprite module swappable so artwork can later be replaced by a WebP spritesheet.
- Desktop layout: scene ratio 16:9, three rows of 4, 4 and 1 (front desk bottom center). Mobile layout (under 640px): portrait ratio 4:5, 3 by 3 grid, bubble anchored inside the scene edges so it never clips, `touch-action: pan-y` so the scene never blocks scrolling.
- Positions live in a config object in `office.ts` (`desktop` and `mobile`).

## 9. SEO, AIO and GEO

1. Every page: unique title and meta description, one H1, canonical, hreflang, OG and Twitter tags with a generated 1200 by 630 OG image (`og/[...route].png.ts`, build time, title plus brand).
2. `sitemap` with i18n alternates. `rss.xml` for work and notes if present.
3. `robots.txt` (generated): allow Googlebot, Bingbot and AI search or user-triggered fetchers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User). Training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot): default allow, `TODO(human)` owner may block. Verify user-agent names against each vendor's current docs before finalizing. Include the sitemap URL.
4. JSON-LD via `JsonLd.astro`: `Person` (stable `@id` `https://tuando.work/#person`, name, alternateName values, jobTitle, image, `sameAs` with LinkedIn and GitHub, `knowsAbout`), `WebSite`, `ProfessionalService`, `Service` per service page, `Article` per case study, `SoftwareApplication` per live Lab product, `BreadcrumbList`. Validate that output is valid JSON and matches visible page content.
5. Content rules for citability: answer first, question-style H2s, short self-contained paragraphs, lists and tables, dates, author line, real numbers with their source (company and period).
6. `llms.txt` and `llms-full.txt` generated from the data file and page list (low priority, Google ignores them, other AI tools may use them).
7. Performance: `astro:assets` for images (WebP or AVIF, explicit width and height), fonts preloaded with `font-display: swap`.

## 10. CV page

`/cv` and `/vi/cv`: clean HTML with print stylesheet (A4, black on white, no office, no header animation). Only items with `show.cv` true. A button links to `/Tuan_Do_CV.pdf`. `scripts/build-cv-pdf.mjs` uses Playwright to print the built `/cv` to `dist/Tuan_Do_CV.pdf` after `astro build`. Name, email, website and LinkedIn only. `TODO(human)`: owner may want a private version with phone number, which must not be committed.

## 11. Deployment

- Dockerfile: `FROM nginx:alpine`, copy `dist` to `/usr/share/nginx/html`, copy `nginx.conf` to `/etc/nginx/conf.d/default.conf`. No Node stage.
- nginx.conf requirements: `try_files` for clean URLs with fallback to the custom 404 page, gzip on, `/_astro/` assets `Cache-Control: public, max-age=31536000, immutable`, HTML `Cache-Control: public, max-age=300`, headers `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, a conservative CSP (self only, plus `data:` images).
- docker-compose.yml: keep service name `tuando-website` and the existing network so the `cloudflared` route does not change (`TODO(human)`: confirm network name). Add `mem_limit: 64m`, `cpus: 0.25`, `restart: unless-stopped`, a `wget --spider` healthcheck, image `ghcr.io/dmt1810/tuando-site:latest`.
- GitHub Actions `deploy.yml` on push to `main`: checkout, Node 22, `npm ci`, `npm run build` (includes PDF), run Playwright smoke tests, set up QEMU and buildx, log in to GHCR with `GITHUB_TOKEN`, build and push `linux/arm64` with tags `latest` and the commit SHA.
- Box update path (default): owner runs `docker compose pull && docker compose up -d`. Optional later: Watchtower or Arcane auto-pull.
- Cloudflare `TODO(human)`: confirm bot and AI-crawler blocking settings do not block the bots allowed in `robots.txt`. Cache static assets and HTML at the edge. Purge cache on release.

## 12. Tasks and acceptance

**Phase 0: reset**

- T0.1 Create branch `revamp`. Init Astro in the repo root. Migrate assets listed in section 3. Delete the old React code. Done when `npm run dev` and `npm run build` pass.

**Phase 1: foundation**

- T1.1 Install and configure Astro integrations, i18n routing, sitemap, MDX. Done when `/` and `/vi/` render.
- T1.2 `Base.astro`, tokens, self-hosted fonts, Header, Footer, language and theme switch. Done when light and dark both look correct and keyboard navigation works.
- T1.3 `schema.ts` and `profile.json` from the seed. Done when the build fails on an invalid data file.
- T1.4 `Seo.astro` and `JsonLd.astro`. Done when every page has canonical, hreflang, OG and valid JSON-LD.

**Phase 2: pages**

- T2.1 Home without the office (sections 1, 2, 4 to 9). Done when it matches section 7.
- T2.2 Three service pages in EN, then VI with `needsReview`. Done when each has the answer-first paragraph, FAQ and CTA.
- T2.3 Work index and case template. Create case pages for Igloo and OneMount from the data file, and short cards for the four consulting clients (no invented metrics). Done when all `/work/*` pages build.
- T2.4 Lab index with `status` badge and `draft` support. Seed 2 entries as `draft: true` with `TODO(human)`.
- T2.5 CV page, print CSS, PDF script. Done when `dist/Tuan_Do_CV.pdf` exists and has no phone number.

**Phase 3: agent office**

- T3.1 `sprites.ts` and `scene.css`, static scene renders with all agents (desktop and mobile layouts).
- T3.2 Director loop, bubbles, brief token, pause and visibility rules.
- T3.3 Click to pause and expand, front desk link, keyboard support, fallback list.
- T3.4 Mobile pass and performance guards. Done when office JS is at most 30 KB gzip and CLS stays under 0.05.

**Phase 4: SEO and QA**

- T4.1 robots, sitemap, RSS, llms files, OG image generation.
- T4.2 Playwright smoke tests: `/` and `/vi/` return 200, one H1, JSON-LD parses, office config present, under reduced motion the loop never starts, no console errors, internal link check passes.
- T4.3 Lighthouse CI on the home page, mobile profile. Done when Performance is at least 95, Accessibility at least 95, SEO 100, Best Practices at least 95.

**Phase 5: ship**

- T5.1 Dockerfile, nginx.conf, compose file, GitHub Actions workflow. Done when the workflow pushes an arm64 image to GHCR.
- T5.2 Write `docs/CUTOVER.md`: run the new container on a spare port first, verify, swap, purge Cloudflare cache, check the LinkedIn Post Inspector, submit the sitemap to Google Search Console and Bing Webmaster Tools.

## 13. Out of scope for v1

AI chat, live n8n status feed, blog, payments, newsletter. The office may later read a static `status.json` written by n8n on a schedule. Never let the browser call the TV box directly.

## 14. Owner backlog (agent must leave placeholders, not fill these)

1. Decide if Lifesup AI appears on the site (never on the CV).
2. Confirm whether the Tastech role is still current.
3. Provide 1 to 2 real automation case studies (n8n flows) for the Automation agent and the `martech-automation` page.
4. Confirm or correct the Dichung 18% figure and add numbers for CATSA, Cenhomes and HNCC.
5. Add years to certifications, confirm n8n and other tools in skills.
6. Review Vietnamese copy marked `needsReview`.
7. Provide the Docker network name used with `cloudflared`, and choose how the box pulls new images.
8. Decide on training crawlers in `robots.txt`.
