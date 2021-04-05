<template>
  <div>categories</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassifiable } from '@vuepress-reco/vuepress-plugin-page/lib/client'

export default defineComponent({
  setup() {
    const a = useClassifiable()
    console.log(111, a)
  },
})
</script>
