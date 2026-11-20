import { test, expect } from '../support/helpers';

test.describe('BB — Formulir pendaftaran agen (black box)', () => {
  test('TC-BB-28 Formulir pendaftaran agen menampilkan field wajib', async ({ page }) => {
    await page.goto('/daftar-agen');
    const fields = page.locator('form input, form select, form textarea');
    expect(await fields.count(), 'formulir harus memiliki field input').toBeGreaterThanOrEqual(4);
    await expect(page.getByRole('button', { name: /daftar|kirim|submit/i }).first()).toBeVisible();
  });

  test('TC-BB-29 Submit kosong tidak mengirim data dan menampilkan validasi', async ({ page }) => {
    await page.goto('/daftar-agen');
    const urlBefore = new URL(page.url()).pathname;
    const submit = page.getByRole('button', { name: /daftar|kirim|submit/i }).first();
    await submit.click();
    await page.waitForTimeout(1500);
    expect(new URL(page.url()).pathname).toBe(urlBefore);
    const invalid = await page.locator('input:invalid, [aria-invalid="true"]').count();
    const message = await page
      .getByText(/wajib|harus diisi|diperlukan|required|tidak valid/i)
      .first()
      .isVisible()
      .catch(() => false);
    expect(invalid + (message ? 1 : 0), 'validasi sisi klien harus aktif').toBeGreaterThan(0);
  });

  test('TC-BB-30 Email tidak valid ditolak oleh validasi', async ({ page }) => {
    await page.goto('/daftar-agen');
    const email = page.locator('input[type="email"]').first();
    await email.fill('bukan-email');
    const valid = await email.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(valid, 'input email harus menolak format tidak valid').toBe(false);
  });

  test('TC-BB-31 Field email menggunakan tipe input yang tepat', async ({ page }) => {
    await page.goto('/daftar-agen');
    const email = page.locator('input[type="email"]').first();
    await expect(email).toHaveAttribute('type', 'email');
  });
});
