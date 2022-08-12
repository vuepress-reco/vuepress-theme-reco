import { ref, onMounted } from 'vue'
import { throttle } from '../utils'

export function useScrollDirection() {
  let prev = 0, next = 0, time

  const direction = ref('')

  onMounted(() => {
    window.addEventListener('scroll', throttle((e: Event) => {
      prev = next
      next = window.scrollY

      if (next - prev < 0) {
        direction.value = 'top'
      } else if (next - prev > 0) {
        direction.value = 'bottom'
      } else {
        direction.value = ''
      }
      console.log(direction.value)
    }, 300))
  })

  return { direction }
}
