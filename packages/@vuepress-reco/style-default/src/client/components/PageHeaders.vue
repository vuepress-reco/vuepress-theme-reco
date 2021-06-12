<template>
  <aside class="pageHeader-container">
    <template v-for="item in pageHeaders" :key="item.link || item.text">
      <HeaderChild :item="item" />
    </template>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageHeaders } from '../composables/'
import { HeaderChild } from './HeaderChild'

export default defineComponent({
  components: { HeaderChild },
  setup() {
    const pageHeaders = usePageHeaders()
    return {
      pageHeaders,
    }
  },
})
</script>
