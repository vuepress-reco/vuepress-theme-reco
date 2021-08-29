<template>
  <aside class="pageHeader-container">
    <template v-for="item in pageHeaders" :key="item.link || item.text">
      <SeriesItem :item="item" />
    </template>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageHeaders } from '../composables/'
import { SeriesItem } from './SeriesItem'

export default defineComponent({
  components: { SeriesItem },
  setup() {
    const pageHeaders = usePageHeaders()
    return {
      pageHeaders,
    }
  },
})
</script>
