<template>
  <main class="page-container">
    <h1 class="page-title" v-if="!!title">{{ title }}</h1>
    <PageInfo :page-data="pageData" />
    <Content class="theme-reco-default-content" />
    <PageMeta />
    <PageNav />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageData } from '@vuepress/client'
import PageInfo from './PageInfo'
import PageNav from './PageNav'
import PageMeta from './PageMeta'

export default defineComponent({
  name: 'Page',

  components: { PageInfo, PageNav, PageMeta },

  setup() {
    const pageData = usePageData()

    const title = computed(
      () => pageData?.value?.frontmatter?.title || pageData?.value?.title || ''
    )

    return { title, pageData }
  },
})
</script>
