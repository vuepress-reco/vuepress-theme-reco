export function toISODate(d: number | string | Date) {
  const ISODate = new Date(d)
  ISODate.setHours(ISODate.getHours(), ISODate.getMinutes() - ISODate.getTimezoneOffset())

  const dateStr = ISODate.toISOString().replace("T", " ").replace("Z", "").split(".")[0]
  const formatDateStr = dateStr.replace(/(\s00:00:00)$/, '')

  return formatDateStr
}
