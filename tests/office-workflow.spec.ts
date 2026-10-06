import { test, expect } from '@playwright/test';

test('a handoff moves the character while the desk stays put, and can be paused', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.office-scene').scrollIntoViewIfNeeded();
  const office = page.locator('[data-office]');
  await expect(office).toHaveAttribute('data-office-active', 'mgr');
  const desk = page.locator('[data-agent=mgr] .station-art');
  const sprite = page.locator('[data-agent=mgr] .sprite');
  const deskStart = await desk.boundingBox();
  const spriteStart = await sprite.boundingBox();
  await expect
    .poll(async () => {
      const box = await sprite.boundingBox();
      return (
        Math.abs(box!.x - spriteStart!.x) + Math.abs(box!.y - spriteStart!.y)
      );
    })
    .toBeGreaterThan(15);
  expect(await desk.boundingBox()).toEqual(deskStart);
  await page.locator('[data-office-toggle]').click();
  await expect(office).toHaveAttribute('data-office-playing', 'false');
  const paused = await sprite.boundingBox();
  await page.waitForTimeout(400);
  expect(await sprite.boundingBox()).toEqual(paused);
  await page.locator('[data-office-toggle]').click();
  await expect(office).toHaveAttribute('data-office-playing', 'true');
});

test('workflow choices expose the feedback loop even with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/vi/');
  await page.locator('.workflow').scrollIntoViewIfNeeded();
  const last = page.locator('[data-workflow-step="4"]');
  await expect(last).toBeEnabled();
  await last.click();
  await expect(last).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-workflow-title]')).toHaveText(
    'Kết quả quay lại thay đổi kế hoạch.',
  );
  await expect(page.locator('[data-workflow-output]')).toContainText(
    'điểm rơi trong funnel',
  );
  await expect(page.locator('[data-office]')).toHaveAttribute(
    'data-office-playing',
    'false',
  );
  await expect(page.locator('.office-fallback')).toBeVisible();
});

test('portrait keeps its original proportions and breadcrumb items share a baseline', async ({
  page,
}) => {
  await page.goto('/');
  const photo = page.locator('.about-photo');
  await photo.scrollIntoViewIfNeeded();
  expect(await photo.evaluate((el) => getComputedStyle(el).filter)).toBe(
    'none',
  );
  const photoBox = await photo.boundingBox();
  expect(photoBox!.height).toBeGreaterThan(photoBox!.width);
  await page.goto('/services/');
  const centers = await page.locator('.breadcrumbs > *').evaluateAll((items) =>
    items.map((el) => {
      const box = el.getBoundingClientRect();
      return box.y + box.height / 2;
    }),
  );
  expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(1);
});
