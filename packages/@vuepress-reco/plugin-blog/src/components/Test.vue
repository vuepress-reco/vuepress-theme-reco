<template>
  <div>{{ b }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'test',
  setup () {
    const b = 'reco'
    return { b }
  }
})
</script>
