# Metro portfolio

The homepage uses the approved cream panorama design in both languages. Mobile fits the map to the viewport; Projects branches downward from the career route. Native radio controls provide station selection, skill filters and readable details without JavaScript. Optional JavaScript adds continuous train movement, including interrupted journeys and branch travel. Reduced-motion preferences disable travel animation.

## Sources and build

- `scripts/metro/content.en.json` and `content.vi.json`: hero, about, career stations and skills.
- `scripts/metro/projects.json`: public case study copy, channels, dates and metric cards.
- `scripts/metro/metro-geometry.ts`, `reference-map.svg`, `panorama.py`: desktop reference geometry, curved mobile rails and skyline.
- `scripts/metro/train.svg`: original speed train vector.
- `scripts/metro/*.css` and `metro-motion.js`: presentation and optional movement.
- `public/assets/` and `public/logos/`: self-hosted fonts, portrait and company logos.

Run `npm run build:metro` after editing these sources. Node compiles the geometry, then Python renders the HTML using only its standard library. The build moves generated inline styles into an external stylesheet to preserve the existing strict Content Security Policy. `.metro-build/`, generated geometry, public styles, motion script and legacy HTML aliases are regenerated and ignored by Git. Python is required only on the build machine, not in the nginx runtime container.

The arrival update retains the approved station positions, zones, skyline and Projects branch. Skill rails have wider concentric spacing. The first visible map plays a shared train/line reveal and docks at Tastech; subsequent journeys support interruption and branch travel. Stop distances and junction positions are prepared at build time. Desktop company descriptions appear automatically after arrival and on hover or keyboard focus; mobile panels use a native information disclosure. `arrival.css` owns the arrival halo, express train dimensions and impact cards. Resume copy and `impact_metrics` live in the language JSON files. Metrics count once on entry, retain final values without scripting and respect reduced motion.

When updating public project facts or the hero, run `node scripts/sync-project-content.mjs` to synchronize the existing Work index and printable CV, then review the diff. This is an explicit content-editing step; normal builds do not rewrite tracked editorial files.

## Routes

English `/` and Vietnamese `/vi/` share equivalent `/career/{slug}/`, `/projects/` and `/projects/{slug}/` routes. The original `/work/` project URLs and prototype `.dc.html` aliases display the new case studies with canonical links to `/projects/`. Existing service, CV, Lab and experience URLs remain available. Download links use the existing generated `/Tuan_Do_CV.pdf`.

## Public metrics

- CATSA: TikTok Ads, 7–31 March 2022. Reconciled daily spend, impressions, clicks and average CPC. No conversion or ROAS claim is published because source breakdowns disagree.
- Dichung: Google Ads Search, 14 July–12 October 2018. Thirteen unique weekly summaries; repeated historical rows and device breakdowns are excluded. Email marketing is listed as a channel without invented results. Platform conversions are not described as bookings.
- Cenhomes.vn: 2021, confirmed by the owner. Google Ads spend, impressions, clicks and CTR. Platform conversions are not presented as qualified leads or sales.
- Hanoi Community College: seasonal enrollment campaigns in 2020 and 2021, Google Ads and Meta Ads, VND 250 million annual budget and VND 80–120 thousand CPA. No lead count is published.

Raw reports, uploaded workbooks, slides, screenshots, private notes and account exports are not included in this repository or the public build. The JSON files contain only the reviewed public summary.

## Verification

`npm run build`, `npm test` and `npm run audit` verify static routes, metadata, internal resources, accessibility, CSP, no-JavaScript behavior, narrow-screen fit, station controls, project aliases, download and performance budgets. For local Edge testing set `BROWSER_CHANNEL=msedge`; CI uses Playwright Chromium. `PORT` selects an isolated test server when needed.
