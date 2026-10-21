# Tuan Do — Growth Marketing Portfolio

Growth marketing across Southeast Asia: paid acquisition, CRM, analytics and the workflows that connect them.

[Live portfolio](https://tuando.work) · [LinkedIn](https://linkedin.com/in/dmt1810) · [Email](mailto:hello@tuando.work)

Bilingual portfolio with an interactive career metro map, freelance case studies and printable CV. Astro generates static pages with self-hosted fonts and no runtime third-party requests.

## Selected outcomes

These outcomes come from `src/data/profile.json` and refer to distinct roles and projects.

| Result                                                     | Scope                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------- |
| **150% YoY growth**                                        | Igloo Insurtech, 2021–2024                                          |
| **10,000+ agent signups**                                  | Launch across four Southeast Asian markets in the first year, Igloo |
| **$50K+ monthly Google Ads budgets**                       | Metrixa                                                             |
| **22% lower CPA**                                          | Automated bidding and A/B testing, Metrixa                          |
| **20% higher email open rates and 15% higher conversions** | Segmentation and A/B testing, OneMount                              |

## Growth capabilities

- Paid acquisition, campaign optimization and experimentation
- CRM segmentation, onboarding, retention and lifecycle marketing
- Tracking, reporting and funnel measurement
- B2B partnerships and Southeast Asia market expansion
- Martech integrations, automation and lead routing

## Local development

Use Node 22.12 or newer and Python 3.10+ (standard library only):

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open `http://localhost:4321`. English at `/`, Vietnamese at `/vi/`.

```sh
npm run build
npm test
npm run audit
npm run preview
```

Build generates the metro pages, validates types and profile data, generates social images, prints `dist/Tuan_Do_CV.pdf`, then verifies bundle budgets. Install Playwright Chromium before building.

## Editing content

Metro copy and case studies are maintained in `scripts/metro/content.en.json`, `content.vi.json` and `projects.json`. See [docs/METRO.md](docs/METRO.md) for routes, geometry and content synchronization.

`src/data/profile.json` retains the data for the existing Work index and printable CV. Experience visibility uses `show.site` and `show.cv`.

Collections: `src/content/{services,work,lab}/{en,vi}/`. Add matching slugs in both languages. Vietnamese drafts use `needsReview: true`. Lab items with `draft: true` have no public route. Templates share language-aware components.

Only `hello@tuando.work` may appear as a public email. Do not add phone numbers or secrets. Review `docs/OWNER_BACKLOG.md` before launch.

Office artwork and its Pixel Agents visual reference are documented in [docs/OFFICE_REFERENCE.md](docs/OFFICE_REFERENCE.md). Regenerate the original room SVGs with `node scripts/build-office-art.mjs` after editing their generator.

## Deployment

The image contains nginx and prebuilt `dist/`. The TV box only pulls the arm64 image. Memory is limited to 64 MB. See `docs/CUTOVER.md` for verification, tunnel networking and rollback.

For the existing Armbian website container, follow [docs/DEPLOY_ARMBIAN_VI.md](docs/DEPLOY_ARMBIAN_VI.md). Updates use `main` and pull the GitHub Docker image into the existing stack.
