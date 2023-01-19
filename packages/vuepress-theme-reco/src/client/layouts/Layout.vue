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
            'show-series': isShowSeries,
            'show-catalog': isShowCatalog,
          }"
        />
      </Transition>
    </Common>
  </div>
</template>

<script lang="ts" setup>
import { usePageFrontmatter, usePageData } from '@vuepress/client'
import { useSeriesData, useScrollPromise } from '../composables'
import Common from '../components/Common/index.vue'
import HomeBlog from '../components/HomeBlog.vue'
import Home from '../components/Home/index.vue'
import Page from '../components/Page.vue'

const page = usePageData()
const frontmatter = usePageFrontmatter()
const { isShowSeries, isShowCatalog } = useSeriesData()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>
