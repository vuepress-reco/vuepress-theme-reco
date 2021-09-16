<template>
  <div class="page-header-container">
    <h5 class="tip">ON THIS PAGE</h5>
    <ul>
      <template v-for="item in pageHeaders" :key="item.link || item.text">
        <HeaderChild :item="item" />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageHeaders } from '../composables/'
import { HeaderChild } from './HeaderChild'

export default defineComponent({
  components: { HeaderChild },
  setup() {
    const pageHeaders = usePageHeaders()
    // console.log(888, pageHeaders.value)
    return {
      pageHeaders,
    }
  },
})
</script>
