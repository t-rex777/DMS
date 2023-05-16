export const getDateFromFormattedString = (date: string) => {
  if (date.includes('-')) {
    const year = Number(date.slice(0, 4))
    const day = Number(date.slice(5, 7))
    const month = Number(date.slice(8, 10))

    return { day, month, year }
  }
  const day = Number(date.slice(0, 2))
  const month = Number(date.slice(3, 5))
  const year = Number(date.slice(6, 10))

  return { day, month, year }
}
