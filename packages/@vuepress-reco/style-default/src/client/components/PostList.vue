<template>
  <div class="post-list-container">
    <PostItem v-for="(item, index) in data" :key="index" :data="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostItem from './PostItem.vue'

export default defineComponent({
  components: { PostItem },

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },

  setup() {
    return {}
  },
})
</script>
