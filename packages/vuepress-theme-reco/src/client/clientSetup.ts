import { computed, provide } from 'vue'
import { useRoute } from 'vuepress/client'
import {
  usePageData,
  catalogSymbol,
  headersToCatalog,
  seriesItemsSymbol,
  resolveSeriesItems,
  useThemeLocaleData,
  usePageFrontmatter,
} from '@composables/index.js'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable/index.js'

import type { RecoThemeNormalPageFrontmatter } from '../types'

export function applyClientSetup() {
  // we need to access series items in multiple components
  // so we make it global computed
  const themeLocal = useThemeLocaleData()
  const frontmatter = usePageFrontmatter()
  const route = useRoute()
  const { series } = useExtendPageData()
  const seriesItems = computed(() =>
    resolveSeriesItems(frontmatter.value, themeLocal.value, route, series)
  )
  provide(seriesItemsSymbol, seriesItems)

  const page = usePageData()
  const catalog = computed(() => headersToCatalog(page.value.headers))

  provide(catalogSymbol, catalog)
}
