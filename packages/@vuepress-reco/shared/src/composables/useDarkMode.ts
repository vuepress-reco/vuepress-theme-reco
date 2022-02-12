import type { InjectionKey, WritableComputedRef } from 'vue'
import { inject, provide, watch, ref } from 'vue'

export type DarkModeRef = WritableComputedRef<boolean>

export const darkModeSymbol: InjectionKey<DarkModeRef> = Symbol('darkMode')

export function useDarkMode() {
  const isDarkMode = inject(darkModeSymbol)
  if (!isDarkMode) {
    throw new Error('useDarkMode() is called without provider.')
  }

  const toggleMode = () => {
    isDarkMode.value = !isDarkMode.value
  }
  return { isDarkMode, toggleMode }
}

export function setupDarkMode() {
  const isDarkMode = ref(false)

  watch(isDarkMode, (newVal) => {
    localStorage && (localStorage['vuepress-reco-color-scheme'] = newVal ? 'dark' : 'light')

    const htmlEl = window?.document.querySelector('html')
    htmlEl?.classList.toggle('dark', newVal)
  })

  const initMode = () => {
    if (
      localStorage && localStorage['vuepress-reco-color-scheme'] === 'dark' ||
      ((!localStorage || !('vuepress-reco-color-scheme' in localStorage)) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      isDarkMode.value = true
    } else {
      isDarkMode.value = false
    }
  }

  initMode()

  provide(darkModeSymbol, isDarkMode)
}
