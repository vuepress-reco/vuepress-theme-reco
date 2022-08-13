export const throttle = (func, wait = 500) => {
  let timer;

  return (...args) => {
      if (timer) {
          return
      }
      timer = setTimeout(() => {
          func.apply(func, args);
          timer = null
      }, wait)
  }
}
