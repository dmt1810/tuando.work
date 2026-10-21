import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
async function pages(dir = 'dist'): Promise<string[]> {
  const result: string[] = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) result.push(...(await pages(path)));
    else if (item.name.endsWith('.html')) result.push(path);
  }
  return result;
}
for (const path of [
  '/',
  '/vi/',
  '/career/igloo/',
  '/projects/',
  '/projects/catsa/',
  '/projects/cenhomes/',
  '/projects/dichung/',
  '/projects/hanoicc/',
  '/vi/projects/hanoicc/',
  '/services/marketing-consulting/',
  '/work/igloo/',
  '/cv/',
]) {
  test(`HTML, metadata and accessibility: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    expect((await page.goto(path))?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.title()).toContain('Tuan Do');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      `https://tuando.work${path}`,
    );
    expect(await page.locator('link[hreflang]').count()).toBe(3);
    const ld = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(
      (ld['@graph'] || [ld]).some(
        (item: { '@type': string }) => item['@type'] === 'Person',
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test('legacy experience language and theme persist', async ({ page }) => {
  await page.goto('/work/igloo/');
  await page.locator('.language').click();
  await expect(page).toHaveURL(/\/vi\/work\/igloo\/$/);
  await page.locator('[data-theme-toggle]').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
});
test('stations, branch, collapse and skill filters work', async ({ page }) => {
  await page.goto('/');
  const mobile = page.viewportSize()!.width <= 600;
  const surface = page.locator(mobile ? '.mobile-panorama' : '.map');
  await expect(page.locator('.metro')).toHaveAttribute(
    'data-motion-ready',
    'true',
  );
  await expect(page.locator('[name=station]')).toHaveCount(6);
  await surface.locator('label[for=b]').click();
  await expect(page.locator('#b')).toBeChecked();
  await expect(page.locator('.pb')).toBeVisible();
  await surface.locator('label[for=b]').click();
  await expect(page.locator('.pb')).toBeHidden();
  await surface.locator('label[for=f]').click();
  await expect(page.locator('.pf')).toBeVisible();
  await page.waitForTimeout(1200);
  await expect(surface.locator('.metro-vehicle')).toBeVisible();
  await page.locator('.chip[for=k4]').click();
  await expect(page.locator('#k4')).toBeChecked();
  await expect
    .poll(async () =>
      Number(
        await surface
          .locator('.l1')
          .first()
          .evaluate((e) => getComputedStyle(e).opacity),
      ),
    )
    .toBeLessThan(0.3);
  await page.locator('.chip[for=k0]').click();
  await page.locator('.pf a[href="/projects/catsa/"]').click();
  await expect(page).toHaveURL(/\/projects\/catsa\/$/);
});
test('mobile panorama fits narrow screens with projects branch', async ({
  page,
}) => {
  for (const width of [320, 390, 600]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator('.mobile-panorama')).toBeVisible();
    const map = await page.locator('.mobile-panorama').boundingBox();
    for (const stop of await page.locator('.mobile-stop').all()) {
      const box = await stop.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(map!.x - 1);
      expect(box!.x + box!.width).toBeLessThanOrEqual(map!.x + map!.width + 1);
    }
  }
});
test('native station navigation works without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.locator('.mobile-stop[for=f]').click();
  await expect(page.locator('.pf')).toBeVisible();
  await page.locator('.pf a[href="/projects/hanoicc/"]').click();
  await expect(page.locator('.metric-card')).toHaveCount(2);
  await context.close();
});
test('reduced motion and dark preference remain accessible', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test('old project URLs show the updated case studies', async ({ page }) => {
  for (const [old, canonical] of [
    ['/work/hncc/', '/projects/hanoicc/'],
    ['/Project-cenhomes.dc.html', '/projects/cenhomes/'],
  ]) {
    await page.goto(old);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      `https://tuando.work${canonical}`,
    );
    await expect(page.locator('.metric-card')).toHaveCount(
      old.includes('hncc') ? 2 : 4,
    );
  }
});
test('every built page and internal resource resolves, drafts stay private', async ({
  request,
}) => {
  test.setTimeout(120000);
  const resolved = new Set<string>();
  for (const file of await pages()) {
    const path =
      '/' +
      file
        .replace(/^dist[\\/]/, '')
        .replace(/\\/g, '/')
        .replace(/index\.html$/, '');
    resolved.add(path);
    const html = await readFile(file, 'utf8');
    expect((html.match(/<h1(?:\s|>)/g) ?? []).length, path).toBe(1);
    const structured = html.match(
      /<script type="application\/ld\+json">(.*?)<\/script>/,
    )?.[1];
    expect(JSON.parse(structured!)['@context']).toBe('https://schema.org');
    const og = html.match(
      /property="og:image" content="https:\/\/tuando.work([^\"]+)"/,
    )?.[1];
    expect(og, path).toBeTruthy();
    resolved.add(og!);
    const links = [...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)].map((m) =>
      m[1].replace(/&amp;/g, '&'),
    );
    for (const link of links) if (!link.startsWith('//')) resolved.add(link);
  }
  const resources = [...resolved];
  for (let i = 0; i < resources.length; i += 8) {
    await Promise.all(
      resources.slice(i, i + 8).map(async (link) => {
        expect((await request.get(link)).status(), link).toBe(200);
      }),
    );
  }
  expect((await request.get('/lab/lead-routing/')).status()).toBe(404);
  expect((await request.get('/not-a-page/')).status()).toBe(404);
  expect((await request.get('/Tuan_Do_CV.pdf')).headers()['content-type']).toBe(
    'application/pdf',
  );
});
test('first load makes no third-party requests', async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith(baseURL!) && !r.url().startsWith('data:'))
      external.push(r.url());
  });
  await page.goto('/');
  await page.locator('.metro').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  expect(external).toEqual([]);
});
