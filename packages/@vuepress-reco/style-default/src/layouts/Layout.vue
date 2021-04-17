<template>
  <div class="prose">
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
