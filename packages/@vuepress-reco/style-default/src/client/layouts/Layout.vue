<template>
  <div class="theme-container">
    <Common>
      <HomeBlog v-if="frontmatter.home === true" />

      <Transition
        v-else
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <Page
          :key="page.path"
          :class="{
            'show-sidebar': isShowSidebar,
            'show-page-headers': isShowHeaders,
          }"
        />
      </Transition>
    </Common>
  </div>
</template>

<script lang="ts">
import { usePageFrontmatter, usePageData } from '@vuepress/client'
import { defineComponent } from 'vue'
import Common from '../components/Common'
import HomeBlog from '../components/HomeBlog'
import Page from '../components/Page'
import { useSidebarData, useScrollPromise } from '../composables'

export default defineComponent({
  components: { HomeBlog, Page, Common },

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter()
    const { isShowSidebar, isShowHeaders } = useSidebarData()

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise()
    const onBeforeEnter = scrollPromise.resolve
    const onBeforeLeave = scrollPromise.pending

    return {
      page,
      frontmatter,
      isShowSidebar,
      isShowHeaders,
      onBeforeEnter,
      onBeforeLeave,
    }
  },
})
</script>
