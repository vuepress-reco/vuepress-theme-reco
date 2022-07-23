import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInitCopyBtn } from './composables/initCopyBtn'

export async function applyClientSetup () {
  const route = useRoute()

  const { initCopyBtn } = useInitCopyBtn()

  onMounted(() => {
    setTimeout(() => {
      initCopyBtn()
    }, 500);
  })
}
