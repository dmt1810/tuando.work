import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';

test('new pages request matching versioned metro assets instead of cached release code', async ({
  page,
  request,
}) => {
  await page.route(/\/assets\/metro-motion\.js$/, (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: '// stale cached release',
    }),
  );
  const response = await page.goto('/');
  expect(response!.headers()['cache-control']).toBe('no-cache');
  const assets = await page
    .locator('script[src*="metro-motion"],link[href*="metro-"]')
    .evaluateAll((elements) =>
      elements.map((el) => el.getAttribute('src') || el.getAttribute('href')!),
    );
  expect(assets).toHaveLength(3);
  for (const path of assets) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    const hash = createHash('sha256')
      .update(await response.body())
      .digest('hex')
      .slice(0, 16);
    expect(new URL(path, 'https://tuando.work').searchParams.get('v')).toBe(
      hash,
    );
  }
  await page.locator('.metro').scrollIntoViewIfNeeded();
  await expect(page.locator('.metro')).toHaveAttribute(
    'data-motion-state',
    'arrived',
  );
  if (page.viewportSize()!.width >= 900)
    await expect(page.locator('.station-tooltip')).toBeVisible();
});

test('intro reveals skill lines with the train and docks at the latest station', async ({
  page,
}) => {
  await page.goto('/');
  const metro = page.locator('.metro');
  await metro.scrollIntoViewIfNeeded();
  await expect(metro).toHaveAttribute('data-motion-state', 'intro');
  const mobile = page.viewportSize()!.width < 900;
  const scene = page.locator(mobile ? '.mobile-map' : '.cv');
  await expect
    .poll(async () =>
      scene.evaluate((el) => {
        const vehicle = el.querySelector('.metro-vehicle')!;
        const x =
          el.getAttribute('data-panorama') === 'mobile'
            ? Number(
                vehicle
                  .getAttribute('transform')!
                  .match(/translate\(([^ ]+)/)![1],
              )
            : parseFloat((vehicle as SVGElement).style.left);
        return x;
      }),
    )
    .toBeGreaterThan(mobile ? 20 : 70);
  const front = await scene.evaluate((el) => {
    const vehicle = el.querySelector('.metro-vehicle')!;
    const x =
      el.getAttribute('data-panorama') === 'mobile'
        ? Number(
            vehicle.getAttribute('transform')!.match(/translate\(([^ ]+)/)![1],
          )
        : parseFloat((vehicle as SVGElement).style.left);
    return Number(el.querySelector('clipPath rect')!.getAttribute('width')) - x;
  });
  // SVG attributes and CSS positions can round the same coordinate differently.
  expect(front).toBeGreaterThanOrEqual(4 - 0.01);
  expect(front).toBeLessThan(8);
  await expect(metro).toHaveAttribute('data-motion-state', 'arrived');
  await expect(scene.locator('[for=e]')).toHaveClass(/at-station/);
  await expect(page.locator('#e')).toBeChecked();

  const stop = scene.locator('[for=d]');
  await stop.click();
  await expect(page.locator('.station-tooltip')).toBeHidden();
  await expect(metro).toHaveAttribute('data-motion-state', 'arrived');
  await expect(stop).toHaveClass(/at-station/);
  if (mobile) {
    await expect(page.locator('.station-tooltip')).toBeHidden();
    await page.locator('.pd .company-info summary').click();
    await expect(page.locator('.pd .company-info p')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.pd .company-info')).not.toHaveAttribute('open');
  } else {
    await expect(page.locator('.station-tooltip')).toBeVisible();
    await expect(page.locator('.station-tooltip strong')).toHaveText(
      'Igloo Insurtech',
    );
    const tooltip = await page.locator('.station-tooltip').boundingBox();
    for (const label of await page.locator('.st .nm').all()) {
      const box = await label.boundingBox();
      expect(
        tooltip!.x < box!.x + box!.width &&
          tooltip!.x + tooltip!.width > box!.x &&
          tooltip!.y < box!.y + box!.height &&
          tooltip!.y + tooltip!.height > box!.y,
      ).toBe(false);
    }
  }
});

test('resume metrics finish their count-up and fit narrow screens', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.hero h1')).toHaveText(
    'Growth & Digital Marketing.',
  );
  await expect(page.locator('.about-copy h2')).toHaveText(
    'Professional summary',
  );
  await page.locator('.stats').scrollIntoViewIfNeeded();
  await expect(page.locator('.stats')).toHaveAttribute('data-counting', 'true');
  await expect(page.locator('[data-count-to="150"]')).toHaveText('150%');
  await expect(page.locator('[data-count-to="10000"]')).toHaveText('10,000+');
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page
        .locator('.impact-card .g')
        .evaluateAll((items) =>
          items.every((el) => el.scrollWidth <= el.clientWidth + 1),
        ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
