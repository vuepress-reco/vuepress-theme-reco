<template>
  <main class="page-container">

    <div class="page-content">
      <h1 v-if="!!title" class="page-title">{{ title }}</h1>

      <PageInfo :key="page.path" :page-data="page" />

      <div v-if="!setedPagePassword" class="theme-reco-md-content">
        <Content />
      </div>

      <div v-else class="theme-reco-md-content">
        <Password v-if="pageLoaded && !pagePasswordPass" @pass="handlePass" />
        <Content v-if="pageLoaded && pagePasswordPass" />
      </div>

      <PageMeta />

      <PageNav />

      <Comments :hide-comments="shouldHideComments" />
    </div>

    <Catalog v-if="isShowCatalog" />
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/composables'
import PageInfo from '../PageInfo.vue'
import PageNav from '../PageNav.vue'
import PageMeta from '../PageMeta.vue'
import Password from '../PagePassword/index.vue'
import { usePassword } from './hook.js'
import Catalog from '../Catalog.vue'

const page = usePageData()
const { options } = useComment()
const { pageLoaded, pagePasswordPass, setedPagePassword, handlePass } = usePassword()

const title = computed(
  () => page?.value?.frontmatter?.title
    || page?.value?.title
    || ''
)

// 是否显示评论
const shouldHideComments = computed(() => {
  const { hideComments: hideCommentsInSinglePage } = page?.value?.frontmatter
  const { hideComments: hideCommentsInAllPage } = options.value

  return hideCommentsInSinglePage === true
    || (hideCommentsInSinglePage !== false && hideCommentsInAllPage === true)
})

import { usePageCatalog } from '@composables/index.js'
const { isShowCatalog } = usePageCatalog()
</script>
