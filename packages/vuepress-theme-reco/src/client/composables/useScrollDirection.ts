import { ref, onMounted } from 'vue'
import { throttle } from '@utils/index.js'

const scrollY = ref(0)
const direction = ref('')

export function useScrollDirection() {
  let startY = 0,
      endY = 0

  onMounted(() => {
    window.addEventListener('touchstart', (e) => {
      const touch = e.touches[0]
      startY = Number(touch.pageY)
    })

    window.addEventListener(
      'scroll',
      throttle((e) => {
        endY = window.scrollY

        if (endY - startY < 0) {
          direction.value = 'top'
        } else if (endY - startY > 0) {
          direction.value = 'bottom'
        } else {
          direction.value = ''
        }

        startY = endY
        scrollY.value = endY
      }, 300)
    )
  })

  return { direction, scrollY }
}
