import { ref, onMounted } from 'vue'
import { throttle } from '../utils'

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
      'touchmove',
      throttle((e) => {
        const touch = e.touches[0]
        endY = touch.pageY
        if (endY - startY < 0) {
          direction.value = 'top'
        } else if (endY - startY > 0) {
          direction.value = 'bottom'
        } else {
          direction.value = ''
        }

        startY = endY
      }, 300)
    )

    // window.addEventListener('touchend', e => {
    //   const touch = e.touches[0]
    //   endY = Number(touch.pageY)

    //   if (endY - startY < 0) {
    //     direction.value = 'top'
    //   } else if (endY - startY > 0) {
    //     direction.value = 'bottom'
    //   } else {
    //     direction.value = ''
    //   }
    // })
  })

  return { direction }
}
