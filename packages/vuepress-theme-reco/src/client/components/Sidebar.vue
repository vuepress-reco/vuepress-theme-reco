<template>
  <aside class="series-container">
    <template v-for="item in seriesItems" :key="item.link || item.text">
      <SeriesChild :item="item" />
    </template>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSeriesItems } from '../composables/'
import { SeriesChild } from './SeriesChild.vue'

export default defineComponent({
  components: { SeriesChild },
  setup() {
    const seriesItems = useSeriesItems()
    return {
      seriesItems,
    }
  },
})
</script>
