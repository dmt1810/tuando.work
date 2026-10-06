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
  '/services/marketing-consulting/',
  '/work/igloo/',
  '/cv/',
]) {
  test(`HTML, metadata and accessibility: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
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
      ld['@graph'].some(
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
test('equivalent language page and persisted theme', async ({ page }) => {
  await page.goto('/work/igloo/');
  await page.locator('.language').click();
  await expect(page).toHaveURL(/\/vi\/work\/igloo\/$/);
  await page.locator('[data-theme-toggle]').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
});

test('responsive navigation can be opened with the keyboard', async ({
  page,
}) => {
  await page.goto('/');
  if (page.viewportSize()!.width <= 600) {
    const menu = page.locator('[data-menu]');
    await expect(menu).toBeVisible();
    await expect(page.locator('.nav')).toBeHidden();
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.nav')).toBeVisible();
  }
  await page.locator('.nav a[href="/work/"]').click();
  await expect(page).toHaveURL(/\/work\/$/);
});
test('office cycle, click hold, keyboard link and offscreen pause', async ({
  page,
}) => {
  await page.goto('/');
  const office = page.locator('[data-office]');
  await page.locator('.office-scene').scrollIntoViewIfNeeded();
  expect(
    JSON.parse(
      (await page
        .locator('[data-office-config]')
        .getAttribute('data-office-config'))!,
    ),
  ).toHaveLength(9);
  await expect(office).toHaveAttribute('data-office-active', 'mgr', {
    timeout: 7000,
  });
  await page.locator('[data-agent=crm]').click();
  await expect(page.locator('.bubble-detail')).toBeVisible();
  await expect(office).toHaveAttribute('data-office-active', 'crm');
  await page.waitForTimeout(3700);
  await expect(office).toHaveAttribute('data-office-active', 'crm');
  const link = page.locator('.bubble-detail a');
  await expect(link).toHaveAttribute('href', '/services/marketing-consulting/');
  await link.focus();
  await expect(link).toBeFocused();
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await expect(office).toHaveAttribute('data-office-playing', 'false');
});
test('reduced motion never starts and fallback stays readable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('[data-office]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-office]')).toHaveAttribute(
    'data-office-playing',
    'false',
  );
  await expect(page.locator('.office-fallback')).toBeVisible();
  await expect(page.locator('.office-bubble')).toBeHidden();
  expect(await page.locator('.office-fallback li').count()).toBe(9);
  expect(
    await page.locator('[data-office]').getAttribute('data-office-active'),
  ).toBeNull();
});
test('Save-Data keeps the office static', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: true },
    }),
  );
  await page.goto('/');
  await page.locator('[data-office]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await expect(page.locator('[data-office]')).toHaveAttribute(
    'data-office-playing',
    'false',
  );
  await expect(page.locator('.office-fallback')).toBeVisible();
});
test('content is usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.office-fallback')).toBeVisible();
  expect(await page.locator('.office-fallback li').count()).toBe(9);
  await expect(page.locator('.nav')).toBeVisible();
  await context.close();
});
test('every built page and internal resource resolves, drafts stay private', async ({
  request,
}) => {
  for (const file of await pages()) {
    const path =
      '/' +
      file
        .replace(/^dist[\\/]/, '')
        .replace(/\\/g, '/')
        .replace(/index\.html$/, '');
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
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
    expect((await request.get(og!)).status(), `${path} OG image`).toBe(200);
    const links = [...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)].map((m) =>
      m[1].replace(/&amp;/g, '&'),
    );
    for (const link of new Set(links)) {
      if (link.startsWith('//')) continue;
      const resource = await request.get(link);
      expect(resource.status(), `${path} → ${link}`).toBe(200);
    }
  }
  expect((await request.get('/lab/lead-routing/')).status()).toBe(404);
  expect((await request.get('/not-a-page/')).status()).toBe(404);
  expect((await request.get('/Tuan_Do_CV.pdf')).headers()['content-type']).toBe(
    'application/pdf',
  );
});
test('first load makes no third-party requests', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    if (
      !r.url().startsWith('http://127.0.0.1:4321') &&
      !r.url().startsWith('data:')
    )
      external.push(r.url());
  });
  await page.goto('/');
  await page.locator('[data-office]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  expect(external).toEqual([]);
});
test('dark theme remains accessible', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test('active mobile office stays accessible and expanded bubbles fit the scene', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.office-scene').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-office]')).toHaveAttribute(
    'data-office-active',
    'mgr',
    { timeout: 7000 },
  );
  for (const id of ['mgr', 'per', 'seo', 'ops']) {
    await page.locator(`[data-agent=${id}]`).click();
    const bubble = await page.locator('.office-bubble').boundingBox();
    const scene = await page.locator('.office-scene').boundingBox();
    expect(bubble!.x).toBeGreaterThanOrEqual(scene!.x);
    expect(bubble!.x + bubble!.width).toBeLessThanOrEqual(
      scene!.x + scene!.width,
    );
    expect(bubble!.y).toBeGreaterThanOrEqual(scene!.y);
  }
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});
