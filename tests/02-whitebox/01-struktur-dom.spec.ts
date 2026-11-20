import { test, expect, SCOPE_PAGES, headings, duplicateIds, unlabeledFormControls, imagesWithoutAlt } from '../support/helpers';

test.describe('WB — Struktur markup & kode klien (white box)', () => {
  test('TC-WB-01 Setiap halaman memiliki tepat satu H1', async ({ page }) => {
    const offenders: string[] = [];
    for (const target of SCOPE_PAGES) {
      await page.goto(target.path);
      const count = await page.locator('h1').count();
      if (count !== 1) offenders.push(`${target.path} = ${count} H1`);
    }
    expect(offenders, `jumlah H1 tidak tepat: ${offenders.join(', ')}`).toEqual([]);
  });

  test('TC-WB-02 Hierarki heading tidak melompati level', async ({ page }) => {
    const offenders: string[] = [];
    for (const target of ['/', '/products', '/artikel', '/faq-tidak-ada'].slice(0, 3)) {
      await page.goto(target);
      const list = await headings(page);
      let prev = 0;
      for (const h of list) {
        if (prev > 0 && h.level > prev + 1) {
          offenders.push(`${target}: h${prev} -> h${h.level} ("${h.text}")`);
          break;
        }
        prev = h.level;
      }
    }
    expect(offenders, offenders.join(' | ')).toEqual([]);
  });

  test('TC-WB-03 Tidak ada atribut id duplikat di DOM', async ({ page }) => {
    const offenders: string[] = [];
    for (const target of SCOPE_PAGES) {
      await page.goto(target.path);
      const dups = await duplicateIds(page);
      if (dups.length) offenders.push(`${target.path}: ${dups.map((d) => `${d.id} x${d.count}`).join(', ')}`);
    }
    expect(offenders, offenders.join(' | ')).toEqual([]);
  });

  test('TC-WB-04 Semua elemen img memiliki atribut alt', async ({ page }) => {
    const offenders: string[] = [];
    for (const target of SCOPE_PAGES) {
      await page.goto(target.path);
      const missing = await imagesWithoutAlt(page);
      if (missing.length) offenders.push(`${target.path}: ${missing.slice(0, 3).join(', ')}`);
    }
    expect(offenders, offenders.join(' | ')).toEqual([]);
  });

  test('TC-WB-05 Semua kontrol formulir memiliki label yang terasosiasi', async ({ page }) => {
    const offenders: string[] = [];
    for (const target of ['/', '/daftar-agen', '/dashboard', '/products', '/artikel', '/agen-resmi']) {
      await page.goto(target);
      const missing = await unlabeledFormControls(page);
      if (missing.length) offenders.push(`${target}: ${missing.join(', ')}`);
    }
    expect(offenders, offenders.join(' | ')).toEqual([]);
  });

  test('TC-WB-06 Dokumen hanya memiliki satu elemen title', async ({ page }) => {
    await page.goto('/');
    const titles = await page.locator('head title').count();
    const all = await page.evaluate(() => document.querySelectorAll('title').length);
    expect(Math.max(titles, all), 'ditemukan lebih dari satu <title>').toBe(1);
  });

  test('TC-WB-07 Atribut lang dokumen terisi dengan kode bahasa valid', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
    expect(lang?.toLowerCase()).toMatch(/^id(-|$)/);
  });

  test('TC-WB-08 Jumlah node DOM dalam anggaran performa', async ({ page }) => {
    await page.goto('/');
    const nodes = await page.evaluate(() => document.getElementsByTagName('*').length);
    expect(nodes, `node DOM = ${nodes}`).toBeLessThan(2500);
  });

  test('TC-WB-09 Bundel CSS dan JS tidak memuat berkas yang gagal (4xx/5xx)', async ({ page }) => {
    const failures: string[] = [];
    page.on('response', (res) => {
      const url = res.url();
      if (/\.(js|css|woff2?|png|jpe?g|webp|svg)(\?|$)/i.test(url) && res.status() >= 400) {
        failures.push(`${res.status()} ${url}`);
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(failures, failures.join(' | ')).toEqual([]);
  });
});
