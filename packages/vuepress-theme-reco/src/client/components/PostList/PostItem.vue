<template>
  <MagicCard class="post-item-container">
    <div class="title">
      <RouterLink :to="data.path">
        <Xicons v-if="data.frontmatter?.sticky" :icon="IconStar" />
        <span>{{ data.title }}</span>
      </RouterLink>
    </div>
    <PageInfo :page-data="data" :hide-views="solution==='valine'"> </PageInfo>
  </MagicCard>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
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
