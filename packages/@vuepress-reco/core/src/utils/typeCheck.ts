export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown
): val is T => Object.prototype.toString.call(val) === '[object Object]'

export const isEmptyPlainObject = <
  T extends Record<any, any> = Record<any, any>
>(
  val: unknown
): val is T =>
  Object.prototype.toString.call(val) === '[object Object]' &&
  Object.keys(val as T).length === 0
