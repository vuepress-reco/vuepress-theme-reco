import { computed, provide } from 'vue'
import { usePageFrontmatter, useRoute } from 'vuepress/client'
import {
  resolveSeriesItems,
  seriesItemsSymbol,
  resolveCatalog,
  catalogSymbol,
  useThemeLocaleData,
} from './composables/index.js'

import type { RecoThemeNormalPageFrontmatter } from '../types'

export function applyClientSetup() {
  // we need to access series items in multiple components
  // so we make it global computed
  const themeLocal = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<RecoThemeNormalPageFrontmatter>()
  const route =  useRoute()
  const seriesItems = computed(() =>{
    return resolveSeriesItems(frontmatter.value, themeLocal.value, route)
  })
  provide(seriesItemsSymbol, seriesItems)

  const catalog = computed(() => resolveCatalog())

  provide(catalogSymbol, catalog)
}
