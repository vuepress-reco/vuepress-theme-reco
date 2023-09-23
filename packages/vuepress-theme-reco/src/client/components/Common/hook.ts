import { useRouter, useRoute } from 'vue-router'
import { watch, ref, onMounted, onUnmounted, toRefs } from 'vue'
import { useInitCopyBtn } from '@vuepress-reco/vuepress-plugin-code-copy/lib/client/composables/initCopyBtn'
import { useScrollDirection, useThemeLocaleData } from '../../composables'

export function useSeries(toggleSeries, toggleMobileMenus) {
  // close series after navigation
  let unregisterRouterHook

  onMounted(() => {
    const router = useRouter()
    const { direction } = useScrollDirection()
    unregisterRouterHook = router.afterEach((to, from) => {
      if (to.path !== from.path) {
        toggleSeries(false)
        toggleMobileMenus(false)

        direction.value = ''
      }
    })
  })

  onUnmounted(() => {
    unregisterRouterHook()
  })
}

const SITE_PASSWORD_PASS = 'SITE_PASSWORD_PASS'
export function usePassword() {
  const themeLocal = useThemeLocaleData()

  const setedSitePassword = ref(!!themeLocal.value.password)
  const siteLoaded = ref(false)
  const sitePasswordPass = ref(true)

  onMounted(() => {
    let sitePasswordPassCache = 'true'

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      sitePasswordPassCache = sessionStorage.getItem(
        SITE_PASSWORD_PASS
      ) as string
    }

    if (themeLocal.value.password && sitePasswordPassCache !== 'true') {
      sitePasswordPass.value = false
    }

    siteLoaded.value = true
  })

  const handlePass = () => {
    sitePasswordPass.value = true

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      sessionStorage.setItem(SITE_PASSWORD_PASS, 'true')
    }
  }

  return { siteLoaded, sitePasswordPass, setedSitePassword, handlePass }
}

export function useInitCodeCopy() {
  const route = useRoute()
  const { path } = toRefs(route)
  const { initCopyBtn } = useInitCopyBtn()

  watch(path, () => {
    setTimeout(() => {
      initCopyBtn()
    }, 1000)
  })
}
