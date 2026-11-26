# 02 — Rencana Pengujian (Test Plan)

Fase **“menetapkan kebutuhan evaluasi”** pada ISO/IEC 25040:2024 §7.2, dengan istilah dan
konsep dari ISO/IEC/IEEE 29119-1:2022 serta objektif kualitas dari ISO/IEC 25010:2023.

## 2.1 Identitas

| Item | Keterangan |
|---|---|
| Objek uji (TOE) | Situs publik **https://taqwatravel.com** — Taqwa Travel (PT. Taqwa Cahaya Semesta) |
| Jenis sistem | Aplikasi web SvelteKit (SSR) di Cloudflare, API di `api.taqwatravel.com`, aset di `s3.taqwatravel.com` |
| Versi yang diuji | Deployment produksi per 26 November 2026 (eksekusi awal 20 November 2026) |
| Dokumen acuan | ISO/IEC 25040:2024, ISO/IEC/IEEE 29119-1:2022, 29119-5:2024, ISO/IEC 25010:2023, 25019:2023, 25002:2024, 15408-1:2026, 18045:2026 |
| Penyusun / penguji | QA Tugas Akhir (pengujian independen) |
| Status dokumen | Final untuk siklus pengujian 1 |

## 2.2 Ruang lingkup

**Termasuk:**

1. Beranda: hero, pencarian paket, cek reservasi, nilai jual, slider paket, galeri, testimoni, artikel.
2. Halaman `/profil`, `/products`, `/product/<slug>`, `/artikel`, `/artikel/<slug>`, `/galeri`, `/testimonials`, `/agen-resmi`, `/daftar-agen`, `/privacy`, `/terms`.
3. Halaman `/dashboard` (login admin) — hanya untuk memastikan tidak ada akses tanpa autentikasi.
4. Perilaku non-fungsional: kinerja muat, responsif 375–1920 px, aksesibilitas WCAG 2.0/2.1 A–AA.
5. Konfigurasi server yang teramati: status HTTP, header keamanan, robots.txt, sitemap.xml, canonical, JSON-LD, pengalihan HTTPS/www.
6. Kualitas kode klien yang dikirim ke peramban: struktur DOM, label formulir, atribut `alt`, cakupan eksekusi JavaScript.

**Tidak termasuk (out of scope):**

- Pengujian beban/stress multi-pengguna dan uji penetrasi (memerlukan izin tertulis pemilik sistem).
- Transaksi nyata: pengiriman formulir pendaftaran agen yang valid, pembuatan reservasi, pembayaran.
- Panel admin setelah login (tidak ada kredensial uji).
- Aplikasi mobile native, integrasi WhatsApp/S3/YouTube di luar perilaku tampilan.
- Pengujian keamanan ofensif (SQL injection, brute force) — hanya pemeriksaan konfigurasi defensif.

## 2.3 Peran

| Peran | Tanggung jawab |
|---|---|
| QA engineer (penulis) | Menyusun desain tes, mengeksekusi manual & otomatis, mencatat insiden |
| Pemilik produk (Taqwa Travel) | Menyediakan akses, memvalidasi tingkat keparahan, menerima hasil |
| Penguji independen | Menjalankan skrip otomatis pada lingkungan bersih (Chromium headless) |

## 2.4 Karakteristik kualitas yang diuji (ISO/IEC 25010:2023)

| Karakteristik 25010:2023 | Sub-karakteristik yang diuji | Metrik | Ambang lulus |
|---|---|---|---|
| Functional suitability | Functional completeness, correctness, appropriateness | Test case fungsional lulus | 100% untuk prioritas tinggi; ≥ 90% keseluruhan |
| Performance efficiency | Time behaviour, resource utilisation | TTFB, LCP, DCL, jumlah request, berat transfer | TTFB < 1,5 s; LCP < 4 s; request < 150; transfer < 6 MB |
| Compatibility | Co-existence, interoperability | Tidak ada mixed content; aset lintas domain termuat | 0 pelanggaran |
| Interaction capability | Operability, user error protection, accessibility, self-descriptiveness | Pelanggaran axe critical/serious; label formulir; overflow layout | 0 critical/serious; 0 kontrol tanpa label; 0 overflow |
| Reliability | Faultlessness, availability, recoverability | Status 404 benar; tanpa stack trace; tanpa error JS | 0 kegagalan |
| Security | Confidentiality, integrity, authenticity, resistance | Header keamanan, HTTPS, noindex admin, tidak ada kredensial di HTML | Semua kontrol wajib ada |
| Maintainability | Modularity, analysability, testability | Duplikasi `id`, satu `<title>`, hierarki heading, cakupan kode | 0 duplikasi; 1 title; hierarki tanpa lompatan |
| Flexibility | Adaptability, scalability | Layout 375/768/1280/1920 px | Tidak ada overflow horizontal |
| Safety | Operational constraint | Tidak ada klaim/aksi berisiko tanpa konfirmasi | Tidak ada temuan kritis |
| Quality-in-use (25019:2023) | Effectiveness, efficiency, satisfaction | Penyelesaian tugas pengguna pada skenario utama | Semua tugas utama selesai tanpa hambatan |

## 2.5 Strategi pengujian

**Manual (3 kategori):**

| Kategori | Basis | Contoh aktivitas |
|---|---|---|
| White box | Kode/DOM yang dikirim server | Inspeksi `head`, hierarki heading, `id` duplikat, label–kontrol, coverage bundel |
| Black box | Perilaku teramati | Navigasi, pencarian, filter, cek reservasi, formulir, galeri, 404 |
| Grey box | Sebagian pengetahuan internal | Status HTTP, header, robots/sitemap, routing `/dashboard`, endpoint `/api/` |

**Otomatis:** Playwright + axe-core, 86 test case, dijalankan dua kategori pekerja (2 worker)
dengan pola *keyword-driven* (helper `goto`, `watch`, `assert`) sesuai ISO/IEC/IEEE 29119-5:2024.

**Pendekatan:** risk-based (29119-1:2022) — modul yang berdampak langsung pada konversi jamaah
(pencarian paket, detail paket, cek reservasi, formulir agen) diberi prioritas tertinggi.

## 2.6 Lingkungan uji

| Aspek | Nilai |
|---|---|
| Tanggal eksekusi | 20 November 2026 (eksekusi ulang verifikasi 26 November 2026) |
| Perangkat | macOS, Apple Silicon |
| Peramban otomatis | Chromium 159 (Playwright headless shell), viewport 1280×800 |
| Peramban manual | Chromium (panel Local browser), viewport 1280×800 dan 390×844 |
| Jaringan | Internet publik dari lokasi penguji (Indonesia) |
| Alat | Playwright 1.65.1, @axe-core/playwright 4.10, `curl`, DevTools performance API |
| Data uji | Kode reservasi fiktif `TQW-9999-999999`, kata kunci `thaif`/`haji`/`palembang`, email tidak valid `bukan-email` |

## 2.7 Kriteria masuk (entry criteria)

1. Situs produksi dapat diakses (HTTP 200) dan seluruh halaman cakupan merespons.
2. Peramban otomatis terpasang dan dapat menjalankan skrip terhadap domain uji.
3. Desain tes dan data uji disetujui.

## 2.8 Kriteria keluar (exit criteria)

1. 100% test case prioritas tinggi (P1) dieksekusi.
2. Seluruh temuan `Critical`/`High` terdokumentasi dengan bukti dan langkah reproduksi.
3. Laporan evaluasi (docs/06) dan daftar insiden (docs/07) selesai.
4. Tidak ada kegagalan yang tidak terjelaskan (setiap kegagalan dipetakan ke `INC-xx`).

## 2.9 Risiko pengujian

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Objek uji adalah produksi | Perubahan data nyata | Hanya input kosong/tidak valid; tanpa submit data valid |
| Konten dinamis (slider, API) | Tes rapuh | Menunggu `networkidle`, toleransi timeout, metrik dicatat |
| Jaringan publik bervariasi | Metrik kinerja tidak stabil | Ambang longgar + 3 sampel TTFB, LCP diukur 1 kali dengan buffer |
| Tidak ada akses kode sumber server | White box terbatas | White box dilakukan pada artefak klien (HTML/CSS/JS) dan coverage CDP |
| Tanpa kredensial admin | Panel tidak diuji mendalam | Fokus pada kontrol akses & noindex |

## 2.10 Fase kerja (ISO/IEC 25040:2024)

| Fase | Aktivitas | Keluaran |
|---|---|---|
| 1. Menetapkan kebutuhan evaluasi | Lingkup, karakteristik, ambang | Dokumen ini (02) |
| 2. Menyusun spesifikasi evaluasi | Desain tes, test case, data | Dokumen 03 |
| 3. Merancang evaluasi | Prosedur, suite otomasi, lingkungan | `tests/`, `playwright.config.ts` |
| 4. Melaksanakan evaluasi | Eksekusi manual & otomatis, insiden | Dokumen 04, 05, 07 + `qa-evidence/` |
| 5. Menyimpulkan evaluasi | Analisis, skor kualitas, rekomendasi | Dokumen 06 |

## 2.11 Deliverable

Rencana tes (02), desain tes (03), hasil manual (04), hasil otomatis (05), laporan evaluasi (06),
daftar insiden (07), bukti tangkapan layar (`qa-evidence/`), laporan HTML Playwright
(`reports/html/`), dan metrik mentah (`reports/metrics/`).
