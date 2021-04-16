<template>
  <div class="text-red-500">
    {{ a }}
    <Content />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const a = 'page'
    return { a }
  },
})
</script>
