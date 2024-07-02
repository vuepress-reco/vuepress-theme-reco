import { computed } from 'vue'
import {
  withBase,
  useRouteLocale,
  useSiteLocaleData,
} from 'vuepress/client'

import {
  useMobile,
  useThemeLocaleData
} from '@composables/index.js'

export function useSiteBrand() {
  const { isMobile } = useMobile()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocal = useThemeLocaleData()

  const customTitle = computed(
    () => isMobile.value ? 'Series' : siteLocale.value.title
  )
  const customLink = computed(
    () => isMobile.value ? '' : (themeLocal.value.home || routeLocale.value)
  )
  const customIcon = computed(() => {
    if (isMobile) return ''

    const icon = themeLocal.value.logo
      ? withBase(themeLocal.value.logo)
      : ''

    return icon
  })

  return { customTitle, customLink, customIcon }
}
