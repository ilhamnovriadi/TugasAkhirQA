import { test, expect, writeMetric } from '../support/helpers';
import AxeBuilder from '@axe-core/playwright';

test.describe('NF — Aksesibilitas (ISO/IEC 25010:2023 interaction capability)', () => {
  const pages = [
    { path: '/', name: 'beranda' },
    { path: '/products', name: 'products' },
    { path: '/daftar-agen', name: 'daftar-agen' },
  ];

  for (const p of pages) {
    test(`TC-NF-08 Pemindaian axe ${p.name}: tidak ada pelanggaran critical`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');
      // iframe pihak ketiga (YouTube) tidak termasuk tanggung jawab pengembang situs
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('iframe[src*="youtube"]')
        .exclude('iframe[src*="youtu.be"]')
        .analyze();
      await writeMetric(`axe-${p.name}`, {
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
          sample: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
        })),
        passes: results.passes.length,
        incomplete: results.incomplete.length,
      });
      const critical = results.violations.filter((v) => v.impact === 'critical');
      const serious = results.violations.filter((v) => v.impact === 'serious');
      expect(
        critical.map((v) => `${v.id} (${v.nodes.length})`),
        `critical: ${critical.map((v) => v.id).join(', ')} | serious: ${serious.map((v) => v.id).join(', ')}`,
      ).toEqual([]);
      expect(
        serious.map((v) => `${v.id} (${v.nodes.length})`),
        `serious: ${serious.map((v) => v.id).join(', ')}`,
      ).toEqual([]);
    });
  }

  test('TC-NF-09 Skip link tersedia dan berfungsi', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /skip to main content/i });
    await expect(skip).toBeVisible();
    await skip.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#|main/i);
  });

  test('TC-NF-10 Fokus keyboard terlihat pada elemen interaktif', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return null;
      const s = getComputedStyle(el);
      return { tag: el.tagName, outline: s.outlineStyle, width: s.outlineWidth, boxShadow: s.boxShadow };
    });
    expect(outline).not.toBeNull();
    const visible = (outline!.outline !== 'none' && outline!.width !== '0px') || outline!.boxShadow !== 'none';
    expect(visible, `fokus tidak terlihat: ${JSON.stringify(outline)}`).toBe(true);
  });
});
