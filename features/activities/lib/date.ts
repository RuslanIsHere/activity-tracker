export function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function parseStoredActivityDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`)
}

export function getTodayUtcDate() {
  const now = new Date()

  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

export function addUtcDays(date: Date, days: number) {
  const nextDate = new Date(date)
  nextDate.setUTCDate(nextDate.getUTCDate() + days)

  return nextDate
}

export function getStartOfUtcWeek(date: Date) {
  const day = date.getUTCDay()
  const daysSinceMonday = day === 0 ? 6 : day - 1

  return addUtcDays(date, -daysSinceMonday)
}

