export function formatISODate(ISODate: string = '') {
  const dateStr = ISODate.replace('T', ' ').replace('Z', '').split('.')[0]
  const formatDateStr = dateStr.replace(/(\s00:00:00)$/, '')

  return formatDateStr
}
