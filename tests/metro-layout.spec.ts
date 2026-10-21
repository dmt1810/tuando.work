import { test, expect } from '@playwright/test';
test('portrait remains large and project breadcrumb follows the shared menu', async ({
  page,
}) => {
  await page.goto('/');
  const photo = page.locator('.portrait');
  const box = await photo.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(160);
  expect(box!.height).toBeGreaterThan(box!.width);
  await page.goto('/projects/hanoicc/');
  const header = await page.locator('.header').boundingBox();
  const crumb = await page.locator('.breadcrumb').boundingBox();
  expect(crumb!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  await expect(page.locator('.header nav a[href="/projects/"]')).toBeVisible();
});
test('the train reaches the Projects branch and can return to a career station', async ({
  page,
}) => {
  await page.goto('/');
  const mobile = page.viewportSize()!.width <= 600;
  const map = page.locator(mobile ? '.mobile-panorama' : '.map');
  for (const station of ['f', 'd']) {
    await map.locator(`label[for=${station}]`).click();
    await expect
      .poll(async () => {
        const train = await map.locator('.metro-vehicle').boundingBox();
        const stop = await map
          .locator(`label[for=${station}] > svg`)
          .boundingBox();
        return Math.abs(train!.x + train!.width - stop!.x);
      })
      .toBeLessThan(8);
  }
});
