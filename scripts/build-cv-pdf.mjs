import { chromium } from '@playwright/test';
import { serve } from './serve.mjs';
const { server, url } = await serve();
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${url}/cv/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: 'dist/Tuan_Do_CV.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  });
  console.log('CV generated: dist/Tuan_Do_CV.pdf');
} finally {
  await browser?.close();
  server.close();
}
