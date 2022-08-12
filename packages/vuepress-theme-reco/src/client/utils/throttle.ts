export const throttle = (func, wait = 500) => {
  let timer;

  return () => {
      if (timer) {
          return
      }
      timer = setTimeout(() => {
          func();
          timer = null
      }, wait)
  }
}
