addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  const year = parseInt(urlParams.get('year')) || new Date().getFullYear();

  let holidays = await fetchHolidays(year);
  holidays = holidays.filter(holiday => holiday.Tanggal);

  // Menggunakan metode localeCompare untuk mengurutkan berdasarkan tanggal
  holidays.sort((a, b) => a.Tanggal.localeCompare(b.Tanggal));

  return new Response(JSON.stringify(holidays, null, 2), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}

async function fetchHolidays(year) {
  if (year <= 2021) {
    return fetchApiHolidays(year);
  } else {
    return fetchGoogleCalendarHolidays(year);
  }
}

async function fetchApiHolidays(year) {
  const url = `https://api-harilibur.vercel.app/api?year=${year}`;
  const response = await fetch(url);
  const data = await response.json();

  return data
    .filter(holiday => holiday.is_national_holiday)
    .map(holiday => ({
      Keterangan: holiday.holiday_name,
      Tanggal: holiday.holiday_date,
    }));
}

async function fetchGoogleCalendarHolidays(year) {
  const apiKey = 'AIzaSyCw_DVFWHp1fLdzr9plPvy7rqoiIPFWVi0';
  const url = `https://www.googleapis.com/calendar/v3/calendars/id.indonesian%23holiday%40group.v.calendar.google.com/events?key=${apiKey}&timeMin=${year}-01-01T00:00:00Z&timeMax=${year}-12-31T23:59:59Z`;

  const response = await fetch(url);
  const data = await response.json();

  const keywords = {
    'Hari Tahun Baru': `Tahun Baru ${year}`,
    'Satu Muharam / Tahun Baru Hijriah': `Tahun Baru Islam ${year - 578} Hijriyah`,
    'Tahun Baru Imlek': `Tahun Baru Imlek ${year + 551}`,
    'Hari Raya Waisak': `Hari Raya Waisak ${year + 544}`,
    'Cuti Bersama Tahun Baru Imlek': 'Cuti Imlek',
    'Isra Mikraj Nabi Muhammad': 'Isra Mikraj',
    'Hari Suci Nyepi (Tahun Baru Saka)': 'Nyepi',
    'Cuti Bersama Hari Suci Nyepi (Tahun Baru Saka)': 'Cuti Nyepi',
    'Ramadan Start': 'Awal Ramadan',
    'Cuti Bersama Idul Fitri': 'Cuti Idul Fitri',
    'Hari Idul Fitri': `Hari Raya Idul Fitri ${year - 579} Hijriyah`,
    'Hari Buruh Internasional / Pekerja': 'Hari Buruh',
    'Hari Lahir Pancasila': 'Hari Pancasila',
    'Cuti Bersama Waisak': 'Cuti Waisak',
    'Idul Adha (Lebaran Haji)': `Hari Raya Idul Adha ${year - 579} Hijriyah`,
    'Hari Proklamasi Kemerdekaan R.I.': 'Proklamasi Kemerdekaan',
    'Hari Raya Natal': 'Natal',
    'Cuti Bersama Natal (Hari Tinju)': 'Cuti Natal',
  };

  return data.items
    .filter(item => Object.keys(keywords).some(keyword => item.summary.includes(keyword)))
    .map(item => ({
      Keterangan: keywords[item.summary] || item.summary,
      Tanggal: item.start.dateTime || item.start.date,
    }));
}
