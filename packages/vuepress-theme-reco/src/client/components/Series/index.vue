<template>
  <aside class="series-container">
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
  useSortSeries,
  useSeriesItems,
  useThemeLocaleData,
} from '@composables/index.js'
import { SeriesItem } from '../SeriesItem.js'

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
</script>
