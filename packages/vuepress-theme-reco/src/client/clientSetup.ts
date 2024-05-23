import { computed, provide } from 'vue'
import {
  usePageData,
  catalogSymbol,
  headersToCatalog,
} from '@composables/index.js'

export function applyClientSetup() {
  const page = usePageData()
  const catalog = computed(() => headersToCatalog(page.value.headers))

  provide(catalogSymbol, catalog)
}
