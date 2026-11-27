# 07 - Daftar Insiden (Defect Register)

Setiap insiden dipetakan ke karakteristik ISO/IEC 25010:2023 yang terdampak dan ke test case
yang gagal. Tingkat keparahan: **Critical** (menghambat tujuan utama/pengguna luas),
**High** (mengganggu fungsi atau keamanan penting), **Medium** (kualitas/SEO/aksesibilitas),
**Low** (kosmetik/teknis).

| ID | Judul | Keparahan | Karakteristik 25010 | Bukti / test case |
|---|---|---|---|---|
| INC-01 | Dua elemen `<h1>` identik pada beranda | Medium | Maintainability, Interaction capability | TC-WB-01, MT-WB-01, MT-BB-01 (`h1` = 2) |
| INC-02 | Dua elemen `<title>` pada setiap halaman; judul pertama generik sehingga semua halaman tampak berjudul sama | Medium | Maintainability, Functional suitability (SEO) | TC-WB-06, TC-GB-17, MT-WB-01 |
| INC-03 | Atribut `lang="en"` pada konten berbahasa Indonesia | Medium | Interaction capability | TC-WB-07, MT-WB-01 |
| INC-04 | Hierarki heading melompat `h1 → h3` pada `/artikel` | Low | Maintainability | TC-WB-02 |
| INC-05 | Kontrol formulir tanpa label terasosiasi (`label[for]`/`aria-label`): 2 input reservasi, 11 kontrol formulir agen, 3 kolom pencarian, 1 `select` | High | Interaction capability (WCAG 1.3.1, 4.1.2) | TC-WB-05, MT-WB-02 |
| INC-06 | Pelanggaran axe: `button-name` (critical, 2 tombol ikon tanpa nama), `color-contrast` (serious), `meta-viewport` (moderate, zoom dinonaktifkan) | High | Interaction capability | TC-NF-08, [`reports/metrics/axe-*.json`](reports/metrics) |
| INC-07 | Header keamanan tidak ada: CSP, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, HSTS | High | Security | TC-GB-02, MT-GB-01 |
| INC-08 | `http://taqwatravel.com` merespons 200 tanpa pengalihan ke HTTPS; `www.taqwatravel.com` tidak memiliki DNS record | High | Security, Compatibility | TC-GB-06 |
| INC-09 | Halaman login admin `/dashboard` dapat diindeks mesin pencari (tanpa `noindex`/`X-Robots-Tag`) | Medium | Security | TC-GB-07, MT-GB-02 |
| INC-10 | Halaman 404 tidak memakai `noindex` | Low | Security (SEO) | TC-GB-18, MT-BB-05 |
| INC-11 | `link rel="canonical"` hilang pada `/products` dan `/artikel` | Medium | Functional suitability (SEO) | TC-GB-13 |
| INC-12 | `Content-Type: text/html` tanpa `charset=utf-8` (hanya mengandalkan `<meta charset>`) | Low | Compatibility | TC-GB-03 |
| INC-13 | Harga tidak ditampilkan pada kartu daftar paket `/products` (0 kemunculan `Rp`/`$`), padahal tampil di beranda dan halaman detail | High | Functional suitability, Quality-in-use | TC-BB-23, MT-BB-07 |
| INC-14 | Tautan internal rusak: `/paket-umroh` → 404, `/kontak` → 404 | High | Functional suitability, Reliability | TC-BB-27 |
| INC-15 | Kartu paket bukan elemen `<a href>` (0 tautan `/product/` di DOM), hanya `<div>` + `<button>` sehingga tidak dapat dibuka di tab baru/di-crawl | Medium | Functional suitability, Maintainability | Observasi `productLinks: 0` |
| INC-16 | Tautan “Layanan Kami” di footer (Paket Umroh, Paket Haji, Haji Khusus VIP, Tour Internasional, Visa & Dokumen, Konsultasi, Tentang Kami, Testimoni, Berita & Artikel, FAQ, Kontak) semuanya `href="#"` - tidak menuju halaman mana pun | High | Functional suitability | Observasi DOM footer |
| INC-17 | Formulir pendaftaran agen tidak memiliki atribut `required`, `aria-invalid`, atau pesan error yang terasosiasi (0 field `required`, 0 `input:invalid`) | Medium | Interaction capability, Security (integritas data) | MT-BB-06 ,MT-WB-02, TC-WB-05 |
| INC-18 | Bundel `base.js` pemutar YouTube dimuat dua kali (masing-masing ±1,7 MB) pada beranda karena dua embed video | Low | Performance efficiency | [`reports/metrics/js-coverage.json`](reports/metrics/js-coverage.json) |

## 7.1 Rekomendasi perbaikan (prioritas)

1. **INC-14, INC-13, INC-16 (High, dampak bisnis langsung).** Perbaiki rute `/paket-umroh` dan
   `/kontak` (atau arahkan ke `/products` dan halaman kontak yang ada), tampilkan harga pada kartu
   paket, dan ganti seluruh `href="#"` dengan URL nyata.
2. **INC-07, INC-08 (High, keamanan).** Aktifkan *Always Use HTTPS* dan HSTS di Cloudflare, tambahkan
   header CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, dan `frame-ancestors`;
   tambahkan record DNS `www`.
3. **INC-05, INC-06 (High, aksesibilitas).** Tambahkan `for`/`aria-label` pada semua kontrol,
   beri `aria-label` pada tombol navigasi slider, perbaiki kontras, dan hapus
   `user-scalable=no`/`maximum-scale=1` dari meta viewport.
4. **INC-01, INC-02, INC-03 (Medium).** Jadikan satu `<h1>` per halaman, hapus `<title>` statis di
   `app.html`, dan set `lang="id"`.
5. **INC-09, INC-11 (Medium).** Tambahkan `noindex` pada area `/dashboard`, dan canonical dinamis
   pada setiap halaman.
6. **INC-04, INC-10, INC-12, INC-17, INC-18 (Low).** Perbaikan bertahap pada struktur heading,
   noindex 404, charset header, validasi klien, dan jumlah embed video.

## 7.2 Insiden yang tidak dapat diuji (blocked)

| Area | Alasan |
|---|---|
| Panel admin setelah login (CRUD paket, reservasi) | Tidak ada kredensial uji; pengujian hanya pada kontrol akses |
| Submit pendaftaran agen yang valid | Menghindari pembuatan data nyata pada sistem produksi |
| Pengujian beban, uji penetrasi, brute force login | Di luar izin dan lingkup tugas akhir |

## 7.3 Verifikasi ulang (26 November 2026)

Seluruh suite dijalankan ulang (`npm test`: 86 test, 71 lulus, 15 gagal, 163,7 detik) dan insiden
yang tidak tercakup test otomatis diukur langsung pada peramban. Daftar kegagalan identik dengan
eksekusi 20 November 2026, sehingga **tidak ada insiden yang berubah status**: ke-18 insiden masih
terjadi pada deployment produksi per 26 November 2026.

| Insiden | Status | Bukti verifikasi ulang |
|---|---|---|
| INC-01 | Masih terjadi | TC-WB-01 gagal; `MT-BB-01.h1` = 2 elemen (`qa-evidence/measurements.json`) |
| INC-02 | Masih terjadi | TC-WB-06 dan TC-GB-17 gagal |
| INC-03 | Masih terjadi | TC-WB-07 gagal (`lang` bukan `id`) |
| INC-04 | Masih terjadi | TC-WB-02 gagal (heading melompat `h1 → h3`) |
| INC-05 | Masih terjadi | TC-WB-05 gagal; `MT-BB-06.requiredFields` = 0 |
| INC-06 | Masih terjadi | TC-NF-08 gagal; `reports/metrics/axe-*.json` |
| INC-07 | Masih terjadi | TC-GB-02 gagal; `MT-GB-01` (header keamanan tidak ada) |
| INC-08 | Masih terjadi | TC-GB-06 gagal (HTTP tanpa pengalihan ke HTTPS) |
| INC-09 | Masih terjadi | TC-GB-07 gagal; `MT-GB-02.robots` = `null` |
| INC-10 | Masih terjadi | TC-GB-18 gagal; `MT-BB-05.robotsMeta` = `null` |
| INC-11 | Masih terjadi | TC-GB-13 gagal (canonical hilang pada `/products`, `/artikel`) |
| INC-12 | Masih terjadi | TC-GB-03 gagal (`charset` tidak ada di header) |
| INC-13 | Masih terjadi | TC-BB-23 gagal; `MT-BB-07.hasHargaText` = `false` untuk 5 kartu |
| INC-14 | Masih terjadi | TC-BB-27 gagal (`/paket-umroh`, `/kontak` → 404) |
| INC-15 | Masih terjadi | Pengukuran DOM `/products`: 0 tautan `a[href^="/product/"]`, 11 `<button>` |
| INC-16 | Masih terjadi | Pengukuran DOM footer: 20 tautan, 11 di antaranya `href="#"` |
| INC-17 | Masih terjadi | `MT-BB-06.invalidFields` = 0, `requiredFields` = 0 |
| INC-18 | Masih terjadi | 2 permintaan `base.js` YouTube pada beranda (pengamatan jaringan 26 Nov 2026) |

Catatan: INC-18 sebelumnya dirujuk ke [`reports/metrics/js-coverage.json`](reports/metrics/js-coverage.json); berkas itu dihasilkan
ulang pada eksekusi 26 November dan tidak lagi memuat entri `base.js`, sehingga buktinya diganti
dengan pengamatan jaringan langsung.
