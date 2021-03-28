<template>
  <div>
    {{ a }}
    <Test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const a = 123
    return { a }
  }
})
</script>
