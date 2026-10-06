import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height, lang, dark] of [
    ['desktop', 1440, 1100, 'en', false],
    ['mobile', 390, 844, 'en', false],
    ['vietnamese', 1440, 1100, 'vi', false],
    ['dark', 1440, 1100, 'en', true],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      colorScheme: dark ? 'dark' : 'light',
    });
    await page.goto(`http://127.0.0.1:4321/${lang === 'vi' ? 'vi/' : ''}`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.office-scene').scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      document
        .querySelector('[data-office]')
        ?.getAttribute('data-office-active'),
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
    if (name === 'desktop' || name === 'mobile') {
      await page.locator('.office-scene').scrollIntoViewIfNeeded();
      await page.waitForTimeout(2000);
      await page
        .locator('.office')
        .screenshot({ path: `artifacts/office-${name}.png` });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
