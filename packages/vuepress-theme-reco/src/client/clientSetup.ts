import { computed, provide } from 'vue'
import { useRoute } from 'vuepress/client'
import {
  usePageData,
  catalogSymbol,
  headersToCatalog,
  useThemeLocaleData,
  usePageFrontmatter,
} from '@composables/index.js'

export function applyClientSetup() {
  // we need to access series items in multiple components
  // so we make it global computed
  const themeLocal = useThemeLocaleData()
  const frontmatter = usePageFrontmatter()
  const route = useRoute()

  const page = usePageData()
  const catalog = computed(() => headersToCatalog(page.value.headers))

  provide(catalogSymbol, catalog)
}
