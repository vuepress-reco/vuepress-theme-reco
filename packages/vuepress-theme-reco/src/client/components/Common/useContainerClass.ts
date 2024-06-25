
import { computed } from 'vue'

import {
  useSeriesData,
  usePageCatalog,
  useMobileMenus,
  usePageFrontmatter
} from '@composables/index.js'

export function useContainerClass() {
  const {
    isOpenSeries,
    isShowSeries,
  } = useSeriesData()
  const { isShowCatalog } = usePageCatalog()
  const frontmatter = usePageFrontmatter()
  const { isOpenMobileMenus } = useMobileMenus()

  const containerClass = computed(() => [
    {
      'series--open': isOpenSeries.value,
      'series--no': !isShowSeries.value,
      'show-series': isShowSeries.value,
      'show-catalog': isShowCatalog.value,
      'mobile-menus--active': isOpenMobileMenus.value,
    },
    frontmatter.value.pageClass,
  ])

  return { containerClass }
}
