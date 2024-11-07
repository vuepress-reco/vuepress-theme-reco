<template>
  <div class="post-list-container">
    <PostItem v-for="(item, index) in data" :key="index" :data="item" />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import PostItem from './PostItem.vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const { data } = toRefs(props)
</script>
