# 04 — Hasil Pengujian Manual

Eksekusi manual dilakukan pada peramban Chromium (panel Local browser) terhadap situs produksi
`https://taqwatravel.com`, tanggal **20 November 2026** dan diverifikasi ulang **26 November 2026**,
viewport 1280×800 (desktop) dan 390×844 (mobile). Bukti tangkapan layar dan pengukuran tersimpan di `qa-evidence/`.

Bukti visual dihasilkan dari sesi pengujian manual yang sama dan disimpan otomatis oleh
`scripts/capture-manual-evidence.mjs` agar dapat direproduksi; nilai terukur dicatat pada
`qa-evidence/measurements.json`.

## 4.1 Ringkasan

| Kategori | Jumlah kasus | Lulus | Gagal | Catatan |
|---|---:|---:|---:|---|
| White box (MT-WB) | 2 | 0 | 2 | `lang`, `<title>` ganda, label tidak terasosiasi |
| Black box (MT-BB) | 7 | 5 | 2 | Harga tidak tampil di daftar paket; H1 ganda; tanpa validasi atribut |
| Grey box (MT-GB) | 2 | 2 | 0 | Temuan: tanpa `noindex` pada area admin & 404 |
| Non-fungsional (MT-NF) | 2 | 2 | 0 | TTFB 366 ms, LCP 664 ms, tanpa overflow |

## 4.2 White box (MT-WB)

| ID | Langkah | Hasil terukur | Verdict |
|---|---|---|---|
| MT-WB-01 | Inspeksi `<head>` beranda: jumlah `<title>`, `<h1>`, `lang`, canonical | `title` = **2 elemen**; `h1` = **2 elemen** dengan teks identik “Haji & Umroh Terpercaya”; `lang="en"`; canonical = `https://taqwatravel.com` | **Gagal** (INC-01, INC-02, INC-03) |
| MT-WB-02 | Inspeksi kontrol formulir: label `for`, `aria-label`, `required`, `alt` | Beranda: 2 input kode reservasi tanpa `label[for]`/`aria-label`; `/daftar-agen`: 11 kontrol tanpa label terasosiasi dan **0 field `required`**; gambar memiliki `alt` | **Gagal** (INC-05, INC-17) |

Bukti pendukung: `qa-evidence/measurements.json` (objek `MT-BB-01`) dan hasil otomatis
TC-WB-01/02/05/06/07 pada `reports/results.json`.

## 4.3 Black box (MT-BB)

| ID | Skenario | Hasil terukur | Verdict |
|---|---|---|---|
| MT-BB-01 | Muat beranda desktop 1280×800 | `<title>` “Taqwa Travel - Haji & Umroh Terpercaya”; CTA “Lihat Paket” & “Konsultasi Gratis” tampil; 4 kartu paket dengan harga | **Lulus** dengan catatan H1 ganda |
| MT-BB-02 | Buka menu mobile 390×844 | Menu memuat Beranda, Profil, Galeri, Artikel, Agen Resmi, Daftar Agen; `scrollWidth − innerWidth = 0 px` | **Lulus** |
| MT-BB-03 | Buka dropdown kategori lalu pilih | `listbox` muncul dengan opsi `Umroh`, `Haji`, `Tour`; nilai terpilih diterapkan | **Lulus** |
| MT-BB-04 | Cek reservasi `TQW-9999-999999` | Muncul pesan “Reservasi dengan kode tersebut tidak ditemukan”; tetap di `/`; tanpa error server | **Lulus** |
| MT-BB-05 | Akses `/halaman-tidak-ada-qa-2026` | Status **404**, H1 “Halaman Tidak Ditemukan”; `meta[name=robots]` **tidak ada** | **Lulus** perilaku; **gagal** pada kontrol indeks (INC-10) |
| MT-BB-06 | Submit formulir agen kosong | Tetap di `/daftar-agen`; `input:invalid` = 0; field `required` = 0 | **Gagal sebagian** (INC-17) |
| MT-BB-07 | Buka `/products` | 5 kartu paket tampil, **tidak ada teks harga** (`Rp`/`$` = 0 kemunculan) | **Gagal** (INC-13) |

Bukti: `qa-evidence/MT-BB-01/beranda-desktop-1280x800.png`,
`MT-BB-02/menu-mobile-terbuka-390x844.png`, `MT-BB-03/dropdown-kategori-terbuka-1280x800.png`,
`MT-BB-04/cek-reservasi-kode-tidak-valid-1280x800.png`, `MT-BB-05/halaman-404.png`,
`MT-BB-06/form-agen-submit-kosong-1280x800.png`,
`MT-BB-07/daftar-paket-tanpa-harga-1280x800.png`.

## 4.4 Grey box (MT-GB)

| ID | Pemeriksaan | Hasil terukur | Verdict |
|---|---|---|---|
| MT-GB-01 | Header HTTP, `robots.txt`, `sitemap.xml` | HTTP/2 200, `server: cloudflare`, `x-sveltekit-page: true`; **tidak ada** `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`; `content-type: text/html` tanpa charset; robots memuat `Disallow: /dashboard/`, `/api/`, `/admin/`; sitemap 3.3 KB, seluruh URL `https://taqwatravel.com` | **Lulus** keterbacaan; **gagal** pada header keamanan & charset (INC-07, INC-12) |
| MT-GB-02 | Akses `/dashboard` tanpa login | Halaman “Admin Login” dengan field email & password, status 200, **tanpa** `noindex` maupun `X-Robots-Tag` | **Lulus** kontrol akses; **gagal** pada noindex (INC-09) |

Bukti: `qa-evidence/MT-GB-02/dashboard-login-admin-1280x800.png` dan hasil otomatis
TC-GB-02/03/06 pada `reports/results.json`.

## 4.5 Non-fungsional (MT-NF)

| ID | Pengukuran | Hasil | Verdict |
|---|---|---|---|
| MT-NF-01 | Layout 375 px & 1280 px | `scrollWidth = innerWidth` (0 px overflow); menu mobile berfungsi; H1 mobile ≥ 24 px | **Lulus** |
| MT-NF-02 | Performance API beranda | `ttfb = 366 ms`, `lcp = 664 ms`, `domContentLoaded = 443 ms`, `load = 621 ms`; 92 request; 376 KB transfer; 58 berkas skrip | **Lulus** |

## 4.6 Catatan metodologis

- Pengujian bersifat **read-only**: tidak ada lead, reservasi, atau pembayaran yang dibuat.
- Pemindaian keamanan terbatas pada konfigurasi yang dapat diamati publik (header, robots,
  perilaku autentikasi), sesuai kelas *vulnerability assessment* ISO/IEC 18045:2026.
- Elemen pihak ketiga (iframe YouTube) dikeluarkan dari penilaian aksesibilitas karena bukan
  artefak yang dikembangkan pemilik situs.
- Setiap kegagalan direproduksi minimal dua kali sebelum dicatat sebagai insiden.
