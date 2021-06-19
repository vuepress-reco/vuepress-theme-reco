<template>
  <main class="page-container">
    <h1 class="page-title" v-if="!!title">{{ title }}</h1>
    <PageInfo />
    <Content class="theme-reco-default-content" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageData } from '@vuepress/client'
import PageInfo from './PageInfo'

export default defineComponent({
  name: 'Page',

  components: { PageInfo },

  setup() {
    const pageData = usePageData()

    const title = computed(
      () => pageData?.value?.frontmatter?.title || pageData?.value?.title || ''
    )

    return { title }
  },
})
</script>
