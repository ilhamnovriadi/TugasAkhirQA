import { test, expect } from '../support/helpers';

test.describe('BB — Cek reservasi (black box)', () => {
  test('TC-BB-20 Cek reservasi dengan kode kosong tidak memproses permintaan', async ({ page }) => {
    await page.goto('/');
    const before = page.url();
    await page.getByRole('button', { name: /Cek Reservasi/i }).first().click();
    await page.waitForTimeout(1500);
    expect(page.url()).toBe(before);
    const hasFeedback = await page
      .getByText(/wajib|masukkan|tidak valid|kosong/i)
      .first()
      .isVisible()
      .catch(() => false);
    expect(hasFeedback, 'kode kosong seharusnya memunculkan pesan validasi').toBe(true);
  });

  test('TC-BB-21 Cek reservasi dengan kode tidak valid menampilkan pesan, bukan error server', async ({ page }) => {
    await page.goto('/');
    const box = page.locator('input[placeholder*="TQW-2025-001234"]:visible').first();
    await expect(box).toBeVisible();
    await box.fill('TQW-9999-999999');
    await page.getByRole('button', { name: /Cek Reservasi/i }).first().click();
    await page.waitForTimeout(3000);
    const body = (await page.locator('body').innerText()).toLowerCase();
    expect(body).not.toContain('internal server error');
    expect(body).not.toContain('unhandled');
    const feedback = await page
      .getByText(/tidak ditemukan|belum terdaftar|gagal|tidak valid|error|periksa/i)
      .first()
      .isVisible()
      .catch(() => false);
    expect(feedback, 'kode tidak valid harus menghasilkan umpan balik ke pengguna').toBe(true);
  });

  test('TC-BB-22 Kolom kode reservasi menerima input dan mempertahankan nilainya', async ({ page }) => {
    await page.goto('/');
    const box = page.locator('input[placeholder*="TQW-2025-001234"]:visible').first();
    await box.fill('TQW-2025-001234');
    await expect(box).toHaveValue('TQW-2025-001234');
  });
});
