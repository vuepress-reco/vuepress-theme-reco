import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { RecoThemePageData } from '../../../types'

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
  const themeLocal = useThemeLocaleData<RecoThemePageData>()
  const sitePasswordPass = ref(true)
  onMounted(() => {
    let sitePasswordPassCache = 'true'

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      sitePasswordPassCache = sessionStorage.getItem(SITE_PASSWORD_PASS) as string
    }

    if (themeLocal.value.password && sitePasswordPassCache !== 'true') {
      sitePasswordPass.value = false
    }
  })



  const handlePass = () => {
    sitePasswordPass.value = true

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      sessionStorage.setItem(SITE_PASSWORD_PASS, 'true')
    }
  }

  return { sitePasswordPass, handlePass }
}
