<template>
  <Common>
    <Posts />
  </Common>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Common from '../components/Common/index.vue'
import Posts from '../components/Posts.vue'
import { useMagicCard } from '../composables'

const { initMagicCard } = useMagicCard()
onMounted(() => {
  initMagicCard()
})
const route = useRoute()
watch(route, () => {
  initMagicCard()
})
</script>
