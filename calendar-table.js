addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const year = parseInt(searchParams.get('year')) || new Date().getFullYear()
  const month = parseInt(searchParams.get('month')) || null
  const timeZone = 'Asia/Jakarta'

  const html = await generateCalendar(year, month, timeZone)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

async function generateCalendar(year, month, timeZone) {
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
    const daysInMonth = lastDay.getDate()

    for (let j = 0; j < 6; j++) {
      calendar += '<tr>'

      for (let k = 0; k < 7; k++) {
        if (j === 0 && k < firstDay.getDay()) {
          calendar += '<td></td>'
        } else if (dayCount <= daysInMonth) {
          const isToday = dayCount === new Date().getDate() && currentMonth === new Date().getMonth() + 1 && currentYear === new Date().getFullYear()
          calendar += `<td ${isToday ? 'class="today"' : ''}>${dayCount}</td>`
          dayCount++
        } else {
          calendar += '<td></td>'
        }
      }

      calendar += '</tr>'
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

  return html
}
