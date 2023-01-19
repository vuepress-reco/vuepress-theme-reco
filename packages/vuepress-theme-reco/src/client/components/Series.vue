<template>
  <aside class="series-container">
    <SeriesItem v-for="item in seriesItems" :item="item" :key="item.link || item.text" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSeriesItems } from '../composables'
import { SeriesItem } from './SeriesItem'

export default defineComponent({
  components: { SeriesItem },
  setup() {
    const seriesItems = useSeriesItems()
    return {
      seriesItems,
    }
  },
})
</script>
