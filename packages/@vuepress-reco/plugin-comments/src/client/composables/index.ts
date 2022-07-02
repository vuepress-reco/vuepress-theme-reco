import { computed } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'

export function useComment() {
  const themeLocal = useThemeLocaleData()

  const solution = computed(() => {
    // @ts-ignore
    switch (themeLocal.value.commentConfig?.type) {
      case 'valine':
        return 'valine'
      case 'waline':
        return 'waline'
      default:
        return ''
    }
  })

  const options = computed(() => {
    // @ts-ignore
    return themeLocal.value.commentConfig.options || {}
  })

  return { solution, options }
}
