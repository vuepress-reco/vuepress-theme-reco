<template>
  <div class="theme-container">
    <Navbar />
    <Sidebar />
    <HomeBlog v-if="frontmatter.home === true" />
    <Page v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import HomeBlog from '../components/HomeBlog'
import Page from '../components/Page'

export default defineComponent({
  components: { Navbar, Sidebar, HomeBlog, Page },

  setup() {
    const frontmatter = usePageFrontmatter()
    const { classificationPosts } = usePageData()
    console.log(111, classificationPosts)
    return { frontmatter }
  },
})
</script>
