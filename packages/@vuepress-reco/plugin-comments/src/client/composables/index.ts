import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { resolveLocalePath } from '@vuepress/shared'
import { useThemeData, resolveThemeLocaleData } from '@vuepress/plugin-theme-data/client'

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
  const themeData = useThemeData()
  const router = useRouter()
  const routePath = computed(() => router.currentRoute.value.path)
  const routeLocale = computed(() =>
    resolveLocalePath(themeData.value.locales || {}, routePath.value),
  )

  const themeLocaleData = computed(() =>
    resolveThemeLocaleData(themeData.value, routeLocale.value),
  )

  return themeLocaleData
}
