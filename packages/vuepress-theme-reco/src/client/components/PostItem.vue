<template>
  <MagicCard class="post-item-container">
    <div class="title">
      <RouterLink :to="data.path">{{ data.title }}</RouterLink>
    </div>
    <PageInfo :page-data="data" :hide-views="solution==='valine'"> </PageInfo>
  </MagicCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import PageInfo from './PageInfo.vue'

export default defineComponent({
  components: { PageInfo },

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  setup() {
    const { solution } = useComment()
    return { solution }
  },
})
</script>
