import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'


export function useSidebar(toggleSidebar) {

  // close sidebar after navigation
  let unregisterRouterHook

  onMounted(() => {
    const router = useRouter()
    unregisterRouterHook = router.afterEach(() => {
      toggleSidebar(false)
    })
  })

  onUnmounted(() => {
    unregisterRouterHook()
  })
}

const SITE_PASSWORD_PASS = 'SITE_PASSWORD_PASS'
export function usePassword() {
  const sitePasswordPass = ref(false)
  const sitePasswordPassCache = sessionStorage.getItem(SITE_PASSWORD_PASS)
  if (sitePasswordPassCache === 'true') sitePasswordPass.value = true

  const handlePass = () => {
    sitePasswordPass.value = true
    sessionStorage.setItem(SITE_PASSWORD_PASS, 'true')
  }

  return { sitePasswordPass, handlePass }
}
