import { test, expect, writeMetric } from '../support/helpers';

test.describe('NF — Responsif & kompatibilitas tampilan', () => {
  for (const size of [
    { w: 375, h: 812, label: 'mobile' },
    { w: 768, h: 1024, label: 'tablet' },
    { w: 1280, h: 800, label: 'desktop' },
    { w: 1920, h: 1080, label: 'wide' },
  ]) {
    test(`TC-NF-04 Tidak ada overflow horizontal pada ${size.label} (${size.w}px)`, async ({ page }) => {
      await page.setViewportSize({ width: size.w, height: size.h });
      await page.goto('/');
      await page.waitForTimeout(800);
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        offenders: Array.from(document.querySelectorAll('body *'))
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > window.innerWidth + 2;
          })
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`),
      }));
      await writeMetric(`overflow-${size.w}`, overflow);
      expect(overflow.scrollWidth, `scrollWidth ${overflow.scrollWidth} vs ${overflow.innerWidth}; ${overflow.offenders.join(', ')}`).toBeLessThanOrEqual(size.w + 2);
    });
  }

  test('TC-NF-05 Tombol menu mobile memiliki target sentuh memadai', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /toggle menu|menu/i }).first();
    const box = await toggle.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width, `lebar ${box!.width}px`).toBeGreaterThanOrEqual(40);
    expect(box!.height, `tinggi ${box!.height}px`).toBeGreaterThanOrEqual(40);
  });

  test('TC-NF-06 Judul hero tetap terbaca pada layar mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const h1 = page.locator('h1').first();
    const fontSize = await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize, `font-size ${fontSize}px`).toBeGreaterThanOrEqual(24);
    await expect(h1).toBeVisible();
  });

  test('TC-NF-07 Tata letak tidak rusak saat zoom 200% (viewport 640px)', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 800 });
    await page.goto('/');
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(overflowing).toBe(false);
  });
});
