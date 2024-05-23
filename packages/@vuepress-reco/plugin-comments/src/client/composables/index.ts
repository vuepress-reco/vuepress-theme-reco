import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { resolveLocalePath } from 'vuepress/shared'
import { resolveThemeLocaleData } from '@vuepress/plugin-theme-data/client'

export function useComment() {
  const themeLocal = useThemeLocaleData()

  const solution = computed(() => {
    // @ts-ignore
    switch (themeLocal.value.commentConfig?.type) {
      case 'valine':
        return 'valine'
      case 'waline':
        return 'waline'
      case 'giscus':
        return 'giscus'
      default:
        return ''
    }
  })

  const options = computed(() => {
    // @ts-ignore
    return themeLocal.value?.commentConfig?.options || {}
  })

  return { solution, options }
}

function useThemeLocaleData() {
  // @ts-ignore
  const themeConfig = __THEME_CONFIG__
  const route = useRoute()
  const routeLocale = computed(() =>
    resolveLocalePath(themeConfig.locales || {}, route?.path || '/'),
  )

  const themeLocaleData = computed(() =>
    resolveThemeLocaleData(themeConfig, routeLocale.value),
  )

  return themeLocaleData
}
