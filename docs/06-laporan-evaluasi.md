# 06 — Laporan Evaluasi Kualitas

Fase **“menyimpulkan evaluasi”** (ISO/IEC 25040:2024 §7.6) dengan model kualitas
ISO/IEC 25010:2023 dan model kualitas dalam penggunaan ISO/IEC 25019:2023.

## 6.1 Ringkasan eksekusi

| Item | Nilai |
|---|---|
| Objek evaluasi | https://taqwatravel.com (produksi, 20 November 2026) |
| Test case otomatis | 86 dijalankan, **71 lulus**, **15 gagal** → tingkat kelulusan **82,6%** |
| Test case manual | 13 kasus (2 white box, 7 black box, 2 grey box, 2 non-fungsional) |
| Insiden tercatat | 18 (0 Critical, 7 High, 7 Medium, 4 Low) |
| Cakupan modul | 10 halaman publik + halaman detail paket/artikel + panel login admin |
| Instrumen | Playwright 1.65.1, axe-core 4.10 (WCAG 2.0/2.1 A–AA), V8 code coverage, `curl` |

Rincian tiap test case: `docs/05-hasil-otomasi.md` (dihasilkan otomatis). Insiden dan
rekomendasi: `docs/07-daftar-insiden.md`.

## 6.2 Hasil per karakteristik ISO/IEC 25010:2023

Skala 1–5 (1 = tidak memenuhi, 3 = memenuhi sebagian, 5 = memenuhi penuh) dengan bobot sama.

| # | Karakteristik | Skor | Bukti terukur | Justifikasi |
|---|---|---:|---|---|
| 1 | Functional suitability | **3** | 33/35 TC fungsional lulus (94,3%); harga hilang di `/products`; 2 tautan internal 404 | Fungsi inti berjalan, namun dua fungsi bernilai bisnis tinggi tidak lengkap (INC-13, INC-14, INC-16) |
| 2 | Performance efficiency | **4** | TTFB 366 ms; LCP 664 ms; DCL 443 ms; 92 request; 376 KB transfer; CSS 11 KB; 58 chunk JS (473 KB) | Sangat baik; dikurangi karena `base.js` YouTube dimuat dua kali (±3,4 MB) (INC-18) |
| 3 | Compatibility | **4** | 0 mixed content; seluruh gambar termuat; layout 375/768/1280/1920 px tanpa overflow | Baik; `www.taqwatravel.com` tidak memiliki DNS record (INC-08) |
| 4 | Interaction capability | **2** | axe: 2 tombol tanpa nama (critical), 1 kontras gagal (serious), zoom dinonaktifkan (moderate); 17 kontrol tanpa label | Hambatan nyata bagi pengguna pembaca layar dan pengguna low-vision (INC-05, INC-06) |
| 5 | Reliability | **5** | 0 error JavaScript pada 3 halaman utama; 0 aset 4xx/5xx; 404 berstatus benar; tanpa stack trace | Perilaku sistem konsisten dan pulih dengan baik |
| 6 | Security | **2** | 0 dari 5 header keamanan wajib; HTTP tidak dialihkan; admin tanpa `noindex`; 0 cookie tanpa `Secure` (tidak ada cookie) | Kontrol pertahanan dasar belum diterapkan (INC-07, INC-08, INC-09, INC-10) |
| 7 | Maintainability | **3** | 2 `<h1>`; 2 `<title>`; `lang="en"`; heading melompat `h1→h3`; 0 `id` duplikat; cakupan fungsi 69,2% | Struktur dapat dianalisis, tetapi metadata dan semantik tidak konsisten (INC-01…04) |
| 8 | Flexibility | **5** | 4 viewport tanpa overflow; menu mobile berfungsi; target sentuh ≥ 40 px; font H1 mobile ≥ 24 px | Adaptasi tata letak berhasil |
| 9 | Safety | **4** | Cek reservasi menolak kode tidak valid dengan pesan jelas; tidak ada aksi destruktif tanpa konfirmasi | Aman untuk operasi baca; validasi formulir agen lemah (INC-17) |
| — | **Rata-rata produk** | **3,6** | | **Memenuhi sebagian — perlu perbaikan terarah** |

**Quality-in-use (ISO/IEC 25019:2023):** skor **3/5**. Efektivitas tugas utama baik (5 dari 6
skenario manual selesai tanpa hambatan), efisiensi baik (LCP < 1 s), namun kepuasan terhambat oleh
hilangnya harga pada daftar paket dan tautan footer yang tidak berfungsi.

## 6.3 Metrik teknis terukur

| Metrik | Nilai | Ambang | Status |
|---|---:|---|---|
| TTFB beranda | 366 ms | < 1.500 ms | Lulus |
| Largest Contentful Paint | 664 ms | < 4.000 ms | Lulus |
| DOMContentLoaded | 443 ms | < 4.000 ms | Lulus |
| Jumlah request beranda | 92 | < 150 | Lulus |
| Transfer beranda | 376 KB | < 6.000 KB | Lulus |
| Bundel CSS | 10,7 KB (3 berkas) | < 600 KB | Lulus |
| Bundel JS milik sendiri | 473 KB (58 berkas) | < 1.500 KB | Lulus |
| Cakupan fungsi JS (V8) | 1.341/1.937 = **69,2%** | > 0 | Terukur |
| Node DOM beranda | < 2.500 | < 2.500 | Lulus |
| Ukuran HTML beranda | 61 KB | < 200 KB | Lulus |
| Pelanggaran axe (beranda) | 1 critical, 1 serious, 1 moderate | 0 critical/serious | **Gagal** |
| Overflow horizontal (375–1920 px) | 0 px | 0 px | Lulus |
| Header keamanan wajib | 0/5 | 5/5 | **Gagal** |
| Canonical per halaman | 1/3 halaman | 3/3 | **Gagal** |

## 6.4 Pemenuhan kriteria keluar

| Kriteria (dok. 02 §2.8) | Status |
|---|---|
| 100% test case prioritas tinggi dieksekusi | Terpenuhi (35/35 P1 dieksekusi) |
| Semua temuan High/Critical terdokumentasi | Terpenuhi (18 insiden, 7 High) |
| Laporan evaluasi & daftar insiden selesai | Terpenuhi (dok. 06 dan 07) |
| Setiap kegagalan dipetakan ke insiden | Terpenuhi |

## 6.5 Kesimpulan

1. **Fungsi utama situs berjalan baik.** Navigasi, pencarian paket, filter, detail paket, detail
   artikel, cek reservasi, galeri, dan testimoni bekerja tanpa error JavaScript; kinerja muat
   sangat baik (LCP 664 ms, 376 KB) dan tata letak responsif pada 375–1920 px.
2. **Tiga area perlu perbaikan mendesak:** (a) kelengkapan fungsi komersial — harga tidak tampil
   pada daftar paket dan 11 tautan footer tidak mengarah ke mana pun; (b) keamanan dasar — tidak
   ada header keamanan, HTTPS tidak dipaksakan, `www` tidak resolve; (c) aksesibilitas — kontrol
   tanpa label, tombol tanpa nama, kontras gagal, dan zoom dinonaktifkan.
3. **Kualitas metadata lemah** (dua `<title>`, dua `<h1>`, `lang="en"`) sehingga merugikan SEO dan
   pembaca layar meski tidak terlihat oleh pengguna umum.
4. Secara keseluruhan skor produk **3,6/5** (memenuhi sebagian). Dengan menutup 7 insiden
   berkategori High, skor dapat naik ke sekitar **4,4/5**.

## 6.6 Keterbatasan evaluasi

- Objek uji adalah sistem produksi tanpa akses kode sumber server, sehingga white box terbatas pada
  artefak yang dikirim ke peramban (HTML/CSS/JS) dan cakupan eksekusi V8.
- Panel admin hanya diuji pada batas autentikasi (tanpa kredensial uji).
- Pengujian beban, uji penetrasi, dan evaluasi kepuasan pengguna lewat kuesioner tidak dilakukan
  karena di luar lingkup dan izin.
- Metrik kinerja diukur pada satu titik jaringan penguji; variasi jaringan pengguna akhir dapat
  berbeda.
