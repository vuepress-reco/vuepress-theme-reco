import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { computed, Ref, ComputedRef } from 'vue'

export function useComment(): {
  solution: Ref<string>
  options: ComputedRef<Record<string, unknown>>
} {
  const themeLocal = useThemeLocaleData()

  const solution: Ref<string> = computed(() => {
    return themeLocal.value.valineConfig ? 'valine' : ''
  })

  const options: ComputedRef<Record<string, unknown>> = computed(() => {
    return themeLocal.value.valineConfig || {}
  })

  return { solution, options }
}
