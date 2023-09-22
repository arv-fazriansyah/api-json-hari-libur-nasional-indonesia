# API JSON Hari Libur Nasional di Indonesia
![GitHub stars](https://img.shields.io/github/stars/arv-fazriansyah/api-json-hari-libur-nasional-indonesia?style=social)
![GitHub forks](https://img.shields.io/github/forks/arv-fazriansyah/api-json-hari-libur-nasional-indonesia?style=social)

API JSON Hari Libur Nasional Sesuai Kalender Indonesia yang Otomatis Diperbarui Setiap Menit Jika Ada Perubahan Data. API ini dibuat untuk memudahkan guru dalam membuat kalender Pendidikan.

## API Hari Libur Nasional Indonesia
### Source Code

- Deploy Code di [Worker Cloudflare](https://dash.cloudflare.com)
- Source Code [harilibur.js](https://raw.githubusercontent.com/arv-fazriansyah/api-json-hari-libur-nasional-indonesia/main/harilibur.js)

### Cara Menggunakan API

- `https://api.fazriansyah.eu.org/` => Mendapatkan daftar hari libur tahun sekarang.
- `https://api.fazriansyah.eu.org/?year=2023` => Mendapatkan daftar hari libur di tahun 2023.
- Jika mengakses data API dengan isian array kosong maka (`Data tidak tersedia`)!

### Format Respon
```
[{
  Keterangan: "Hari Kemerdekaan Indonesia",
  Tanggal: "2023-08-17"
}]
```

## API Calendar Format Table
### Source Code

- Deploy Code di [Worker Cloudflare](https://dash.cloudflare.com)
- Source Code [calendar-table.js](https://raw.githubusercontent.com/arv-fazriansyah/api-json-hari-libur-nasional-indonesia/main/calendar-table.js)

### Cara Menggunakan API

- `https://api2.fazriansyah.eu.org/` => Mendapatkan kalender tahun sekarang.
- `https://api2.fazriansyah.eu.org/?year=2023` => Mendapatkan kalender di tahun 2023.
- `https://api2.fazriansyah.eu.org/?month=8` => Mendapatkan kalender bulan 8 tahun sekarang.
- `https://api2.fazriansyah.eu.org/?year=2025&month=12` => Mendapatkan kalender bulan 12 tahun 2025.

## Sumber Data
- [Google Calendar](https://calendar.google.com/calendar/u/0/r)
- [API Hari Libur](https://api-harilibur.vercel.app/)

## Thanks To

- GitHub @[kresnasatya](https://github.com/kresnasatya)
