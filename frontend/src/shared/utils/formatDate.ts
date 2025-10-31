/**
 * Formats a date string to Russian format (e.g., "15 марта 2025")
 */
export const formatDateToRussian = (dateString: string): string => {
  const date = new Date(dateString)
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}

/**
 * Formats a date range to Russian format (e.g., "15 марта — 30 апреля 2025")
 */
export const formatDateRangeToRussian = (
  startDate: string,
  endDate: string
): string => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const startDay = start.getDate()
  const startMonth = months[start.getMonth()]
  const startYear = start.getFullYear()

  const endDay = end.getDate()
  const endMonth = months[end.getMonth()]
  const endYear = end.getFullYear()

  // If same year, only show it once at the end
  if (startYear === endYear) {
    return `${startDay} ${startMonth} — ${endDay} ${endMonth} ${endYear}`
  }

  return `${startDay} ${startMonth} ${startYear} — ${endDay} ${endMonth} ${endYear}`
}

