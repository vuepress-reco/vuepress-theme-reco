<template>
  <aside class="series-container">
    <SeriesItem
      v-for="item in seriesItems"
      :item="item"
      :level="1"
      :key="item.link || item.text"
    />
  </aside>
</template>

<script lang="ts" setup>
import { useSeriesItems } from '@composables/index.js'
import { SeriesItem } from './SeriesItem.js'

const seriesItems = useSeriesItems()
</script>
