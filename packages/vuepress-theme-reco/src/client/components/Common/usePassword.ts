import { ref, onMounted } from 'vue'
import { useThemeLocaleData } from '@composables/index.js'

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
