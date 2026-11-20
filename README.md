# Tugas Akhir QA — Pengujian taqwatravel.com

Repositori artefak **penjaminan kualitas (QA) dan pengujian** untuk situs
**https://taqwatravel.com** (Taqwa Travel, travel haji & umroh Palembang).

Seluruh aktivitas disusun mengikuti standar internasional terbitan **2022–2026**:

- ISO/IEC/IEEE **29119-1:2022** — konsep & proses pengujian perangkat lunak
- ISO/IEC/IEEE **29119-5:2024** — pengujian berbasis keyword (dasar otomasi)
- ISO/IEC **25010:2023** — model kualitas produk (9 karakteristik)
- ISO/IEC **25019:2023** — model kualitas dalam penggunaan
- ISO/IEC **25002:2024** — kerangka model kualitas
- ISO/IEC **25040:2024** — kerangka evaluasi kualitas (siklus 5 proses)
- ISO/IEC **15408-1:2026** & **18045:2026** — kriteria & metodologi evaluasi keamanan
  (menggantikan edisi 2022)

## Struktur

```
docs/
  01-standar-qa-2022-2026.md   Studi dokumentasi standar + pemetaan
  02-test-plan.md              Rencana pengujian (ISO/IEC 25040 fase 1)
  03-test-design.md            Desain tes, teknik, data uji, keterlacakan
  04-hasil-manual.md           Eksekusi manual: white box, black box, grey box
  05-hasil-otomasi.md          Hasil otomatis (dihasilkan scripts/summarize.mjs)
  06-laporan-evaluasi.md       Laporan evaluasi kualitas (25010 / 25019)
  07-daftar-insiden.md         Insiden/defect + tingkat keparahan
tests/
  01-blackbox/                 Skenario fungsional dari sudut pengguna
  02-whitebox/                 Struktur DOM, label, cakupan kode klien
  03-greybox/                  Status HTTP, header, robots/sitemap, keamanan dasar
  04-nonfungsional/            Kinerja, responsif, aksesibilitas (axe-core)
  support/helpers.ts           Utilitas bersama
qa-evidence/                   Bukti tangkapan layar pengujian manual
literatur/                     Preview resmi 8 standar acuan + indeks & sitasi
reports/                       results.json, laporan HTML, metrik, artefak
```

Folder `reports/html/`, `reports/artifacts/`, `test-results/`, dan `node_modules/` bersifat
*generated* sehingga tidak ikut di-commit. Yang di-commit sebagai bukti adalah `qa-evidence/`,
`reports/results.json`, `reports/SUMMARY.md`, dan `reports/metrics/`.

## Menjalankan

```bash
npm install
npx playwright install chromium   # sekali saja
npm test                          # seluruh suite (± 2 menit)
npm run test:blackbox             # per kategori
npm run summary                   # regenerasi docs/05-hasil-otomasi.md
npm run report                    # buka laporan HTML Playwright
```

Objek uji adalah situs produksi, sehingga pengujian bersifat **read-only**:
tidak ada data pelanggan dibuat, tidak ada pembayaran/lead yang dikirim, dan
formulir hanya diuji dengan input kosong atau tidak valid.

## Hasil pengujian

Eksekusi terakhir: **86 test case** — 71 lulus, 15 gagal. Lima belas kegagalan tersebut
**sengaja dipertahankan** karena merupakan defect nyata pada situs yang diuji (lihat
`docs/05-hasil-otomasi.md` dan `docs/07-daftar-insiden.md`); karena itu `npm test` berakhir
dengan exit code 1. Kegagalan bukan akibat skrip yang rusak.

Laporan HTML dibuat otomatis saat `npm test` di `reports/html/` dan dapat dibuka dengan
`npm run report`. Folder tersebut bersifat generated dan tidak di-commit.
