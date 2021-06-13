<template>
  <div class="theme-container">
    <Navbar />
    <Sidebar v-if="isShowSidebar" />
    <Component
      :is="frontmatter.home === true ? 'HomeBlog' : 'Page'"
      :class="{
        'show-sidebar': isShowSidebar,
        'show-page-headers': isShowHeaders,
      }"
    />
    <PageHeaders v-if="isShowHeaders" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageFrontmatter, useSiteLocaleData } from '@vuepress/client'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PageHeaders from '../components/PageHeaders.vue'
import HomeBlog from '../components/HomeBlog'
import Page from '../components/Page'
import { useSidebarItems, usePageHeaders } from '../composables'

export default defineComponent({
  components: { Navbar, Sidebar, PageHeaders, HomeBlog, Page },

  setup() {
    const frontmatter = usePageFrontmatter()
    const { classificationPosts } = usePageData()
    console.log(111, classificationPosts)

    const sidebarItems = useSidebarItems()
    const pageHeaders = usePageHeaders()

    const isShowSidebar = computed(() => sidebarItems.value.length > 0)
    const isShowHeaders = computed(
      () => pageHeaders.value.length > 0 && frontmatter.value.home !== true
    )
    return { frontmatter, isShowSidebar, isShowHeaders }
  },
})
</script>
