<template>
  <main class="page-container">
    <h1 v-if="!!title" class="page-title">{{ title }}</h1>
    <PageInfo :page-data="pageData" />
    <div class="theme-reco-default-content">
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
import { usePageData } from '@vuepress/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import PageInfo from '../PageInfo.vue'
import PageNav from '../PageNav.vue'
import PageMeta from '../PageMeta.vue'
import Password from '../PagePassword/index.vue'
import { usePassword } from './hook'

const pageData = usePageData()
const { options } = useComment()
const { pageLoaded, pagePasswordPass, handlePass } = usePassword()

const title = computed(
  () => pageData?.value?.frontmatter?.title
    || pageData?.value?.title
    || ''
)

// 是否显示评论
const shouldHideComments = computed(() => {
  const { hideComments: hideCommentsInSinglePage } = pageData?.value?.frontmatter
  const { hideComments: hideCommentsInAllPage } = options.value

  return hideCommentsInSinglePage === true
    || (hideCommentsInSinglePage !== false && hideCommentsInAllPage === true)
})
</script>
