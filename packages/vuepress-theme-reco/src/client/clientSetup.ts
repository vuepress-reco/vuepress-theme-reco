import { computed, provide } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import {
  resolveSeriesItems,
  seriesItemsSymbol,
  resolveCatalog,
  catalogSymbol,
  useThemeLocaleData,
} from './composables'

import type { DefaultThemeNormalPageFrontmatter } from '../types'

export function applyClientSetup() {
  // we need to access series items in multiple components
  // so we make it global computed
  const themeLocal = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const seriesItems = computed(() =>
    resolveSeriesItems(frontmatter.value, themeLocal.value)
  )
  provide(seriesItemsSymbol, seriesItems)

  const catalog = computed(() => resolveCatalog())

  provide(catalogSymbol, catalog)
}
