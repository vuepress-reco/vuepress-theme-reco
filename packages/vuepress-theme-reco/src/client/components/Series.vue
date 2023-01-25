<template>
  <aside class="series-container">
    <SiteBrand />
    <SeriesItem v-for="item in seriesItems" :item="item" :key="item.link || item.text" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSeriesItems } from '../composables'
import { SeriesItem } from './SeriesItem'
import SiteBrand from './SiteBrand.vue'

export default defineComponent({
  components: { SeriesItem, SiteBrand },
  setup() {
    const seriesItems = useSeriesItems()
    return {
      seriesItems,
    }
  },
})
</script>
