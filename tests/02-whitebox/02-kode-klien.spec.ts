import { test, expect, writeMetric } from '../support/helpers';

/**
 * White box pada sisi klien: cakupan eksekusi kode (coverage) dan
 * perilaku runtime bundel JavaScript yang dikirim server.
 */
test.describe('WB — Cakupan kode klien & runtime (white box)', () => {
  test('TC-WB-10 Cakupan eksekusi bundel JavaScript terukur', async ({ page }) => {
    await page.coverage.startJSCoverage({ resetOnNavigation: false, reportAnonymousScripts: false });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByText(/^Lihat Detail$/i).first().click().catch(() => {});
    await page.waitForTimeout(2000);
    type CovEntry = {
      url: string;
      source: string;
      functions: { ranges: { startOffset: number; endOffset: number; count: number }[] }[];
    };
    const entries = (await page.coverage.stopJSCoverage()) as unknown as CovEntry[];

    const mergeUsed = (ranges: { startOffset: number; endOffset: number }[]) => {
      const sorted = [...ranges].sort((a, b) => a.startOffset - b.startOffset);
      let used = 0;
      let start = -1;
      let end = -1;
      for (const r of sorted) {
        if (r.startOffset > end) {
          if (end > start && start >= 0) used += end - start;
          start = r.startOffset;
          end = r.endOffset;
        } else {
          end = Math.max(end, r.endOffset);
        }
      }
      if (end > start && start >= 0) used += end - start;
      return used;
    };

    const own = entries.filter((e) => e.url.includes('taqwatravel.com') && e.url.includes('/_app/'));
    const perEntry = own.map((e) => {
      const total = (e.source || '').length;
      const fns = e.functions || [];
      const called = fns.filter((f) => (f.ranges || []).some((r) => r.count > 0)).length;
      const used = mergeUsed(fns.flatMap((f) => (f.ranges || []).filter((r) => r.count > 0)));
      return {
        url: e.url.replace('https://taqwatravel.com', ''),
        bytes: total,
        functions: fns.length,
        functionsCalled: called,
        functionCoveragePercent: fns.length ? Number(((called / fns.length) * 100).toFixed(1)) : 0,
        byteRangesExecuted: used,
      };
    });
    const totalBytes = perEntry.reduce((a, b) => a + b.bytes, 0);
    const totalFns = perEntry.reduce((a, b) => a + b.functions, 0);
    const calledFns = perEntry.reduce((a, b) => a + b.functionsCalled, 0);
    await writeMetric('js-coverage', {
      filesTotal: entries.length,
      filesOwn: perEntry.length,
      ownTotalBytes: totalBytes,
      ownTotalFunctions: totalFns,
      ownFunctionsCalled: calledFns,
      ownFunctionCoveragePercent: totalFns ? Number(((calledFns / totalFns) * 100).toFixed(2)) : 0,
      top: perEntry.sort((a, b) => b.bytes - a.bytes).slice(0, 15),
    });

    expect(perEntry.length, 'bundel _app harus termuat').toBeGreaterThan(0);
    expect(totalBytes, `total JS milik sendiri ${(totalBytes / 1024).toFixed(0)} KB`).toBeLessThan(1_500_000);
    expect(calledFns, 'tidak ada fungsi yang tereksekusi (coverage kosong)').toBeGreaterThan(0);
  });

  test('TC-WB-11 Bundel CSS yang dikirim berada di bawah anggaran', async ({ page }) => {
    await page.goto('/');
    const sizes = await page.evaluate(() =>
      performance
        .getEntriesByType('resource')
        .filter((r) => (r as PerformanceResourceTiming).initiatorType === 'link' || r.name.endsWith('.css'))
        .map((r) => ({ url: r.name, bytes: (r as PerformanceResourceTiming).transferSize || 0 })),
    );
    const totalCss = sizes.filter((s) => s.url.endsWith('.css')).reduce((a, b) => a + b.bytes, 0);
    await writeMetric('css-size', { files: sizes.filter((s) => s.url.endsWith('.css')).length, totalBytes: totalCss });
    expect(totalCss, `total CSS ${(totalCss / 1024).toFixed(0)} KB`).toBeLessThan(600_000);
  });

  test('TC-WB-12 Tidak ada error konsol pada tiga halaman utama', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => {
      // kegagalan resource jaringan diuji terpisah pada TC-WB-09, di sini fokus pada error JavaScript
      if (m.type() === 'error' && !/failed to load resource|favicon|third-party cookie|net::ERR_/i.test(m.text())) {
        errors.push(m.text());
      }
    });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    for (const path of ['/', '/products', '/artikel']) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }
    expect(errors, errors.join(' | ')).toEqual([]);
  });

  test('TC-WB-13 Hidrasi SvelteKit selesai dan interaksi berjalan', async ({ page }) => {
    await page.goto('/');
    const boot = await page.evaluate(() => {
      const res = performance.getEntriesByType('resource').map((r) => r.name);
      return {
        entryLoaded: res.some((n) => /_app\/immutable\/entry\/start/.test(n)),
        globals: Object.keys(window).filter((k) => k.startsWith('__sveltekit')).length,
      };
    });
    expect(boot.entryLoaded, 'entry/start.js SvelteKit tidak dimuat').toBe(true);
    expect(boot.globals, 'state hasil hidrasi SvelteKit tidak ditemukan').toBeGreaterThan(0);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: /toggle menu/i }).first().click();
    await expect(page.locator('header').getByRole('link', { name: /^Profil$/i }).first()).toBeVisible();
  });
});
