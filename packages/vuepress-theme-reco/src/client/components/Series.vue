<template>
  <aside class="series-container">
    <SiteBrand :custom-title="customTitle"  />
    <SeriesItem
      v-for="item in sortedSeries"
      :item="item"
      :key="item.link || item.text"
    />
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import {
  useMobile,
  useSortSeries,
  useSeriesItems,
  useThemeLocaleData,
} from '@composables/index.js'
import SiteBrand from './SiteBrand.vue'
import { SeriesItem } from './SeriesItem.js'

const { isMobile } = useMobile()
const themeLocal = useThemeLocaleData()
const { sortSeries } = useSortSeries()
const seriesItems = useSeriesItems()

const sortedSeries = computed(() => {
  if (!themeLocal.value.autoSetSeries) {
    return seriesItems.value
  }

  const series = sortSeries(seriesItems.value)
  return series
})

const customTitle = computed(() => {
  return isMobile.value ? 'Series' : ''
})
</script>
