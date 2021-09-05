<template>
  <div
    :class="{
      'common-wrapper': true,
      'sidebar-open': isOpenSidebar,
      'no-sidebar': !isShowSidebar,
      'show-page-headers': isShowHeaders,
    }"
  >
    <Navbar @toggleSidebar="toggleSidebar" />
    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <Series />
    <slot />
    <PageHeaders v-if="isShowHeaders" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
// import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import Navbar from '../components/Navbar'
import Series from '../components/Series'
import PageHeaders from '../components/PageHeaders.vue'
import { useSidebarData } from '../composables'

export default defineComponent({
  name: 'Common',

  components: { Navbar, Series, PageHeaders },

  setup() {
    const frontmatter = usePageFrontmatter()
    const { isOpenSidebar, isShowSidebar, isShowHeaders, toggleSidebar } =
      useSidebarData()
    // const { classificationPosts } = usePageData()
    // console.log(111, classificationPosts)

    return {
      frontmatter,
      isOpenSidebar,
      isShowSidebar,
      isShowHeaders,
      toggleSidebar,
    }
  },
})
</script>
