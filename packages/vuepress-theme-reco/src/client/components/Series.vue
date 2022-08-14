<template>
  <aside class="series-container">
    <SeriesItem v-for="item in sidebarItems" :item="item" :key="item.link || item.text" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSidebarItems } from '../composables'
import { SeriesItem } from './SeriesItem'

export default defineComponent({
  components: { SeriesItem },
  setup() {
    const sidebarItems = useSidebarItems()
    return {
      sidebarItems,
    }
  },
})
</script>
