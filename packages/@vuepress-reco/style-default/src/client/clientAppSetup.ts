import { computed, provide } from 'vue'
import { defineClientAppSetup, usePageFrontmatter } from '@vuepress/client'
import {
  resolveSidebarItems,
  sidebarItemsSymbol,
  resolvePageHeaders,
  pageHeadersSymbol,
} from './composables'

import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'

import type { DefaultThemeNormalPageFrontmatter } from '../types'

export default defineClientAppSetup(() => {
  // we need to access sidebar items in multiple components
  // so we make it global computed
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const sidebarItems = computed(() =>
    resolveSidebarItems(frontmatter.value, themeLocale.value)
  )
  provide(sidebarItemsSymbol, sidebarItems)

  const pageHeaders = computed(() => resolvePageHeaders())

  provide(pageHeadersSymbol, pageHeaders)
})
