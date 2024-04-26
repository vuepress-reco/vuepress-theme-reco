export function removeEmptyString(value: string) {
  return !value ? '' : value.trim().replaceAll(' ', '-')
}
