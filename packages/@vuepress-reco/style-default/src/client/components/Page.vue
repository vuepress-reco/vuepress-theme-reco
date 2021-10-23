<template>
  <main class="page-container">
    <h1 v-if="!!title" class="page-title">{{ title }}</h1>
    <PageInfo :page-data="pageData" />
    <div class="theme-reco-default-content">
      <Content />
    </div>
    <PageMeta />
    <PageNav />

    <Comments :hide-comments="shouldHideComments" />
  </main>
</template>

<script lang="ts">
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import { usePageData } from '@vuepress/client'
import { defineComponent, computed } from 'vue'
import PageInfo from './PageInfo'
import PageMeta from './PageMeta'
import PageNav from './PageNav'

export default defineComponent({
  name: 'Page',

  components: { PageInfo, PageNav, PageMeta },

  setup() {
    const pageData = usePageData()
    const { options } = useComment()

    const title = computed(
      () => pageData?.value?.frontmatter?.title || pageData?.value?.title || ''
    )

    // 是否显示评论
    const shouldHideComments = computed(() => {
      const { hideComments: hideCommentsInSinglePage } =
        pageData?.value?.frontmatter
      const { hideComments: hideCommentsInAllPage } = options.value

      return (
        hideCommentsInSinglePage === true ||
        (hideCommentsInSinglePage !== true && hideCommentsInAllPage === true)
      )
    })

    return { title, pageData, shouldHideComments }
  },
})
</script>
