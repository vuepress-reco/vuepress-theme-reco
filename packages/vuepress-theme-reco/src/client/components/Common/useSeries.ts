import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useScrollDirection } from '@composables/index.js'

export function useSeries() {
  let unregisterRouterHook

  const initSeriesStatus = (cb) => {
    onMounted(() => {
      const router = useRouter()
      const { direction } = useScrollDirection()
      unregisterRouterHook = router.afterEach((to, from) => {
        // close series after navigation
        if (to.path !== from.path) {
          cb()

          direction.value = ''
        }
      })
    })

    onUnmounted(() => {
      unregisterRouterHook()
    })
  }

  return { initSeriesStatus }
}
