<template>
  <div class="theme-container">
    <Common>
      <Home v-if="frontmatter.home === true" />

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
            'show-series': isShowSidebar,
            'show-catalog': isShowCatalog,
          }"
        />
      </Transition>
    </Common>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { usePageFrontmatter, usePageData } from '@vuepress/client'
import { useSidebarData, useScrollPromise } from '../composables'
import Common from '../components/Common/index.vue'
import HomeBlog from '../components/HomeBlog.vue'
import Home from '../components/Home/index.vue'
import Page from '../components/Page.vue'

const page = usePageData()
const frontmatter = usePageFrontmatter()
const { isShowSidebar, isShowCatalog } = useSidebarData()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>
