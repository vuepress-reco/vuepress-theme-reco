<template>
  <div
    :class="{
      'common-wrapper': true,
      'show-sidebar': isShowSidebar,
      'show-page-headers': isShowHeaders,
    }"
  >
    <Navbar />
    <Series v-if="isShowSidebar" />
    <slot />
    <PageHeaders v-if="isShowHeaders" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import Navbar from '../components/Navbar'
import Series from '../components/Series'
import PageHeaders from '../components/PageHeaders.vue'
import { useSidebarData } from '../composables'

export default defineComponent({
  name: 'Common',

  components: { Navbar, Series, PageHeaders },

  setup() {
    const frontmatter = usePageFrontmatter()
    const { isShowSidebar, isShowHeaders } = useSidebarData()
    const { classificationPosts } = usePageData()
    console.log(111, classificationPosts)

    return { frontmatter, isShowSidebar, isShowHeaders }
  },
})
</script>
