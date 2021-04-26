<template>
  <div>categories</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'

export default defineComponent({
  setup() {
    const { classificationPosts } = usePageData()
    console.log(111, classificationPosts)
  },
})
</script>
