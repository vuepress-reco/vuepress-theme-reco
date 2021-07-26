<template>
  <div class="theme-container">
    <Common>
      <Component
        :is="frontmatter.home === true ? 'HomeBlog' : 'Page'"
        :class="{
          'show-sidebar': isShowSidebar,
          'show-page-headers': isShowHeaders,
        }"
      />
    </Common>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { useSidebarData } from '../composables'
import Common from '../components/Common'
import HomeBlog from '../components/HomeBlog'
import Page from '../components/Page'

export default defineComponent({
  components: { HomeBlog, Page, Common },

  setup() {
    const frontmatter = usePageFrontmatter()
    const { isShowSidebar, isShowHeaders } = useSidebarData()

    return { frontmatter, isShowSidebar, isShowHeaders }
  },
})
</script>
