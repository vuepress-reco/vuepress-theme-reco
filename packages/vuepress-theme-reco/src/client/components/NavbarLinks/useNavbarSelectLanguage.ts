import { Translate } from '@vicons/carbon'
import { computed, ComputedRef } from 'vue'
import { useRoutePaths } from '@vuepress/helper/client'
import { useRouteLocale, useSiteData, useSiteLocaleData, useRoute } from 'vuepress/client'

import { useThemeData, useThemeLocaleData } from '@composables/index.js'

import type {
  MenuLink,
  MenuGroup,
  MenuLinkGroup,
} from '../../../types'

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarSelectLanguage = (): ComputedRef<MenuGroup<MenuLinkGroup>[]> => {
  const route = useRoute()
  const site = useSiteData()
  const theme = useThemeData()
  const routePaths = useRoutePaths()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocal = useThemeLocaleData()

  const result = computed(() => {
    const localePaths = Object.keys(site.value.locales || {})
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = route?.path
    const currentFullPath = route?.fullPath

    const languageDropdown: MenuGroup<MenuLink> = {
      icon: Translate,
      text: themeLocal.value.selectLanguageText || 'Languages',
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this langauge link
        const targetSiteLocale = site.value.locales?.[targetLocalePath] ?? {}
        const targetThemeLocale = theme.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang
        let link

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath?.replace(
            routeLocale.value,
            targetLocalePath
          )
          if (
            routePaths.value.some((item) => item === targetLocalePage)
          ) {
            link = targetLocalePage
          } else {
            link = targetThemeLocale.home ?? targetLocalePath
          }
        }

        return {
          text,
          link,
          language: true
        }
      }),
    }

    return [languageDropdown]
  })

  return result
}
