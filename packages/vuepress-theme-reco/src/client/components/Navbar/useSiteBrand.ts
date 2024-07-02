import { computed } from 'vue'
import {
  withBase,
  useRouteLocale,
  useSiteLocaleData,
} from 'vuepress/client'

import { useThemeLocaleData } from '@composables/index.js'

export function useSiteBrand() {
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocal = useThemeLocaleData()

  const customTitle = computed(
    () => siteLocale.value.title
  )
  const customLink = computed(
    () => themeLocal.value.home || routeLocale.value
  )
  const customIcon = computed(
    () => themeLocal.value.logo
      ? withBase(themeLocal.value.logo)
      : ''
  )

  return { customTitle, customLink, customIcon }
}
