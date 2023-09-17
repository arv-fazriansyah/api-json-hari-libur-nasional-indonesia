# ★ API JSON Hari Libur Nasional di Indonesia.
Free API JSON Hari Libur Nasioanal Sesuai Kalender Indonesia, Otomatis Update Setiap Menit Jika Ada Perubahan Data. API ini dibuat untuk memudahkan guru dalam membuat kalender Pendidikan.

## ★ Demo Website

- [Demo](https://arv-fazriansyah.github.io/api-json-hari-libur-nasional-indonesia/)

# ★ API Hari Libur Nasional Indonesia
## Source Code

- Deploy Code di Worker Cloudflare: [Disini](https://dash.cloudflare.com)
- Source Code [harilibur.js](https://raw.githubusercontent.com/arv-fazriansyah/api-json-hari-libur-nasional-indonesia/main/harilibur.js)

## Cara Menggunakan API

- `https://api.fazriansyah.eu.org/` => mendapatkan daftar hari libur tahun sekarang

- `https://api.fazriansyah.eu.org/?year=2023` => mendapatkan daftar hari libur di tahun 2023

- Jika mengakses data API dengan isian array kosong maka (`Data tidak tersedia`)!

## Format Respon
```
{
  Keterangan: "Hari Kemerdekaan Indonesia",
  Tanggal: "2023-08-17"
}
```

# ★ API Calender Table
## Source Code

- Deploy Code di Worker Cloudflare: [Disini](https://dash.cloudflare.com)
- Source Code [calendar-table.js](https://raw.githubusercontent.com/arv-fazriansyah/api-json-hari-libur-nasional-indonesia/main/calendar-table.js)

## Cara Menggunakan API

- `https://api2.fazriansyah.eu.org/` => mendapatkan calender tahun sekarang

- `https://api2.fazriansyah.eu.org/?year=2023` => mendapatkan calender di tahun 2023

- `https://api2.fazriansyah.eu.org/?month=8` => mendapatkan calender bulan 8 tahun sekarang

- `https://api2.fazriansyah.eu.org/?year=2025&month=12` => mendapatkan calender bulan 12 tahun 2025

## ★ Sumber Data

- [Google Calender](https://calendar.google.com/calendar/u/0/r)

- [API Hari Libur](https://api-harilibur.vercel.app/)

## ★ Thanks To

- Github @[kresnasatya](https://github.com/kresnasatya)
