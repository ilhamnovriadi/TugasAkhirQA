import { test, expect, writeMetric } from '../support/helpers';

test.describe('NF — Kinerja (ISO/IEC 25010:2023 performance efficiency)', () => {
  test('TC-NF-01 LCP dan TTFB beranda dalam anggaran', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const metrics = await page.evaluate(
      () =>
        new Promise<{ lcp: number; ttfb: number; dcl: number; load: number }>((resolve) => {
          let lcp = 0;
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1] as PerformanceEntry;
            if (last) lcp = last.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          setTimeout(() => {
            const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            resolve({
              lcp: Math.round(lcp),
              ttfb: Math.round(nav.responseStart),
              dcl: Math.round(nav.domContentLoadedEventEnd),
              load: Math.round(nav.loadEventEnd),
            });
          }, 1500);
        }),
    );
    await writeMetric('kinerja-beranda', metrics);
    expect(metrics.ttfb, `TTFB ${metrics.ttfb} ms`).toBeLessThan(1500);
    expect(metrics.lcp, `LCP ${metrics.lcp} ms`).toBeLessThan(4000);
    expect(metrics.dcl, `DCL ${metrics.dcl} ms`).toBeLessThan(4000);
  });

  test('TC-NF-02 Berat halaman dan jumlah request dalam anggaran', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const stats = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return {
        requests: resources.length,
        transferKB: Math.round(resources.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024),
        images: resources.filter((r) => /\.(png|jpe?g|webp|svg)/.test(r.name)).length,
        scripts: resources.filter((r) => /\.js/.test(r.name)).length,
      };
    });
    await writeMetric('berat-beranda', stats);
    expect(stats.requests, `requests = ${stats.requests}`).toBeLessThan(150);
    expect(stats.transferKB, `transfer = ${stats.transferKB} KB`).toBeLessThan(6000);
  });

  test('TC-NF-03 Halaman paket dan artikel termuat di bawah 5 detik', async ({ page }) => {
    for (const path of ['/products', '/artikel']) {
      const started = Date.now();
      await page.goto(path, { waitUntil: 'load' });
      const elapsed = Date.now() - started;
      expect(elapsed, `${path} butuh ${elapsed} ms`).toBeLessThan(5000);
    }
  });
});
