<template>
  <div class="post-item-container">
    <div class="title">
      <RouterLink :to="data.path">{{ data.title }}</RouterLink>
    </div>
    <div class="abstract" v-html="data.excerpt"></div>
    <PageInfo :page-data="data" :hide-valine-views="true"> </PageInfo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    return {}
  },
})
</script>
