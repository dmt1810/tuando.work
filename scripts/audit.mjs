import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { serve } from './serve.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const { server, url } = await serve();
let browser;
const port = 9223;
try {
  browser = await chromium.launch({
    headless: true,
    args: [`--remote-debugging-port=${port}`],
  });
  const { lhr, report } = await lighthouse(
    url,
    { port, output: ['html', 'json'], logLevel: 'error' },
    {
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttlingMethod: 'simulate',
      },
    },
  );
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/lighthouse.html', report[0]);
  await writeFile('artifacts/lighthouse.json', report[1]);
  const scores = Object.fromEntries(
    Object.entries(lhr.categories).map(([key, c]) => [
      key,
      Math.round(c.score * 100),
    ]),
  );
  console.log(
    JSON.stringify(
      {
        scores,
        LCP: lhr.audits['largest-contentful-paint'].numericValue,
        CLS: lhr.audits['cumulative-layout-shift'].numericValue,
      },
      null,
      2,
    ),
  );
  const targets = {
    performance: 95,
    accessibility: 95,
    'best-practices': 95,
    seo: 100,
  };
  if (
    Object.entries(targets).some(([key, value]) => scores[key] < value) ||
    lhr.audits['largest-contentful-paint'].numericValue >= 2000 ||
    lhr.audits['cumulative-layout-shift'].numericValue >= 0.05
  )
    process.exitCode = 1;
} finally {
  await browser?.close();
  server.close();
}
