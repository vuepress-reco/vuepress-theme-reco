<template>
  <!-- 使用v-memo来避免不必要的重新渲染 -->
  <MagicCard class="post-item-container" v-memo="[data.path, data.title, data.frontmatter?.sticky, solution]">
    <div class="title">
      <SafeRouterLink :to="data.path">
        <Xicons v-if="data.frontmatter?.sticky" :icon="IconStar" />
        <span>{{ data.title }}</span>
      </SafeRouterLink>
    </div>
    <PageInfo :page-data="data" :hide-views="solution==='valine'"> </PageInfo>
  </MagicCard>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import SafeRouterLink from '@components/SafeRouterLink.vue'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/composables'

import PageInfo from '@components/PageInfo.vue'
import { IconStar } from '@components/icons/index.js'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const { data } = toRefs(props)

const { solution } = useComment()
</script>
