addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  let year = new Date().getFullYear()
  let month = null

  if (searchParams.has('year')) {
    year = parseInt(searchParams.get('year'))
  }

  if (searchParams.has('month')) {
    month = parseInt(searchParams.get('month'))
  }

  // tambahan kode untuk mendapatkan waktu dalam zona waktu Indonesia
  const timeZone = 'Asia/Jakarta'
  const currentTime = new Date().toLocaleString('en-US', { timeZone })
  const currentDate = new Date(currentTime)

  let calendar = ''
  for (let i = 0; i < 12; i++) {
    const currentYear = year
    const currentMonth = i + 1

    if (month && month !== currentMonth) {
      continue
    }

    const date = new Date(currentYear, currentMonth - 1, 1)

    const monthName = date.toLocaleString('id-ID', { month: 'long' })
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const isFirstDayFridayOrSaturday = firstDay.getDay() === 5 || firstDay.getDay() === 6
    const isLongMonth = lastDay.getDate() >= 30

    calendar += `
      <table>
        <thead>
          <tr>
            <th colspan="7">${monthName} ${currentYear}</th>
          </tr>
          <tr>
            <th scope="col" style="color: red;">Minggu</th>
            <th scope="col">Senin</th>
            <th scope="col">Selasa</th>
            <th scope="col">Rabu</th>
            <th scope="col">Kamis</th>
            <th scope="col">Jumat</th>
            <th scope="col">Sabtu</th>
          </tr>
        </thead>
        <tbody>
    `

   let dayCount = 1
    for (let j = 0; j < 6; j++) {
      calendar += '<tr>'

      for (let k = 0; k < 7; k++) {
        if (j === 0 && k < firstDay.getDay()) {
          calendar += '<td></td>'
        } else if (dayCount > lastDay.getDate()) {
          calendar += '<td></td>'
        } else {
          const isToday = dayCount === new Date().getDate() && currentMonth === new Date().getMonth() + 1 && currentYear === new Date().getFullYear()
          calendar += `<td ${isToday ? 'class="today"' : ''}>${dayCount}</td>`
          dayCount++
        }
      }

      calendar += '</tr>'
    }

    // add empty row for date range that starts on Friday or Saturday and ends on Sunday or Monday
    if (firstDay.getDay() >= 5 && lastDay.getDay() <= 1) {
      calendar += `
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      `
    }

    calendar += '</tbody></table>'
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Kalender ${year}</title>
        <style>
          table {
            margin-bottom: 50px;
            border-collapse: collapse;
            width: 100%;
            max-width: 700px;
          }
          table td:first-of-type {
            color: red;
          }
          th {
            background-color: #eee;
            font-weight: normal;
            padding: 10px;
            text-align: center;
            border: 1px solid #ccc;
          }
          td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ccc;
          }
          td.today {
            background-color: #ff0;
            font-weight: bold;
          }
          tr.hidden {
            display: none;
          }
    </style>
  </head>
  <body>
    ${calendar}
    <script>
      const rows = document.querySelectorAll('tbody tr')
      rows.forEach((row) => {
        const cells = Array.from(row.children)
        const emptyCellsCount = cells.filter(cell => cell.textContent === '').length
        if (emptyCellsCount === 7) {
          row.classList.add('hidden')
        }
      })
    </script>
  </body>
</html>
`

return new Response(html, {
headers: {
'Content-Type': 'text/html',
},
})
}
