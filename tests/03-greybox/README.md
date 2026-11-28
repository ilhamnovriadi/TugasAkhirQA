# Verifikasi Ulang Grey Box

Diverifikasi ulang pada 28 November 2026 oleh Nurul Azizah Lonek.

Metode: header HTTP dicek lewat securityheaders.com (scan https://taqwatravel.com/), pengalihan http ke https dicek lewat httpstatus.io.

| Temuan | Eksekusi 20 Nov | Verifikasi ulang 28 Nov | Status |
|---|---|---|---|
| INC-07: header keamanan | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS tidak ada | Kelima header tetap tidak ada; Permissions-Policy juga tidak ada; nilai F; HTTP/2 200 | Masih sama |
| INC-08: http tidak dialihkan ke https | `http://taqwatravel.com` merespons 200 tanpa pengalihan | `http://taqwatravel.com` merespons 200, tanpa baris pengalihan (301/302) | Masih sama |

Catatan: pada INC-08, yang diverifikasi ulang hanya bagian pengalihan http ke https. Bagian DNS record `www.taqwatravel.com` belum dicek ulang.

Hasil lengkap ada di docs/04-hasil-manual.md (MT-GB-01) dan docs/07-daftar-insiden.md.
