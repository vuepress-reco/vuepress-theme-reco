import { computed } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'

export function useComment() {
  const themeLocal = useThemeLocaleData()

  const solution = computed(() => {
    // @ts-ignore
    return themeLocal.value.valineConfig
      ? 'valine'
      : ''
  })

  const options = computed(() => {
    // @ts-ignore
    return themeLocal.value.valineConfig
      || {}
  })

  return { solution, options }
}
