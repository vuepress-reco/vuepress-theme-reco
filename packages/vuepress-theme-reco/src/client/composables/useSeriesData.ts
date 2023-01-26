import { ref, computed, watch } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { useSeriesItems, usePageCatalog } from './index'

export const useSeriesData: () => any = () => {
  const isOpenSeries = ref(false)
  const frontmatter = usePageFrontmatter()
  const seriesItems = useSeriesItems()
  const catalog = usePageCatalog()

  const isShowSeries = computed(
    () => seriesItems.value.length > 0 && isOpenSeries
  )

  const isShowCatalog = computed(
    () => catalog.value.length > 0 && frontmatter.value.home !== true
  )

  const toggleSeries = (to: boolean): void => {
    isOpenSeries.value = typeof to === 'boolean' ? to : !isOpenSeries.value
    document.body.style.overflowY = isOpenSeries.value ? 'hidden' : 'auto'
  }

  return { isOpenSeries, isShowSeries, isShowCatalog, toggleSeries }
}
