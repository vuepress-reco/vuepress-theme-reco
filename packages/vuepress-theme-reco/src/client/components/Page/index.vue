<template>
  <main class="page-container">
    <h1 v-if="!!title" class="page-title">{{ title }}</h1>

    <PageInfo :key="page.path" :page-data="page" />

    <div v-if="!setedPagePassword" class="theme-reco-default-content">
      <Content />
    </div>

    <div v-else class="theme-reco-default-content">
      <Password v-if="pageLoaded && !pagePasswordPass" @pass="handlePass" />
      <Content v-if="pageLoaded && pagePasswordPass" />
    </div>

    <PageMeta />

    <PageNav />

    <Comments :hide-comments="shouldHideComments" />
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
</script>
