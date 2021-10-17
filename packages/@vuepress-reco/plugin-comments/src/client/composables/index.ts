import { computed } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'

export function useComment() {
  const themeLocal = useThemeLocaleData()

  const solution = computed(() => {
    return themeLocal.value.valineConfig
      ? 'valine'
      : themeLocal.value.vssueConfig
      ? 'vssue'
      : ''
  })

  const options = computed(() => {
    return themeLocal.value.valineConfig
      || themeLocal.value.vssueConfig
      || {}
  })

  return { solution, options }
}
