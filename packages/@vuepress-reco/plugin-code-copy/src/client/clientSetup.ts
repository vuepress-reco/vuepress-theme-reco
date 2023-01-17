import { onMounted } from 'vue'
import { useInitCopyBtn } from './composables/initCopyBtn'

export async function applyClientSetup() {
  const { initCopyBtn } = useInitCopyBtn()

  onMounted(() => {
    setTimeout(() => {
      initCopyBtn()
    }, 500)
  })
}
