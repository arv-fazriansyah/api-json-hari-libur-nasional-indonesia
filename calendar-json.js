addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const params = url.searchParams
  const yearParam = params.get('year')
  const monthParam = params.get('month')

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  const year = yearParam ? parseInt(yearParam) : currentYear
  const month = monthParam ? parseInt(monthParam) - 1 : null

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const calendar = {}

  for (let m = 0; m < 12; m++) {
    const monthDate = new Date(year, m, 1)
    const monthName = months[monthDate.getMonth()] + ' ' + monthDate.getFullYear()

    if (month !== null && m !== month) {
      continue
    }

    const daysInMonth = new Date(year, m + 1, 0).getDate()

    const days = []
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, m, d)
      days.push(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`)
    }

    calendar[monthName] = days.join(', ')
  }

  const response = new Response(JSON.stringify([calendar]), {
    headers: { 'Content-Type': 'application/json' },
  })

  return response
}
