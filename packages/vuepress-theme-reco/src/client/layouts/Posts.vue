<template>
  <GenericContainer>
    <Posts />
  </GenericContainer>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GenericContainer from '@components/GenericContainer/index.vue'
import Posts from '@components/Posts.vue'
import { useMagicCard } from '@composables/index.js'

const { initMagicCard } = useMagicCard()
onMounted(() => {
  initMagicCard()
})
const route = useRoute()
watch(route, () => {
  initMagicCard()
})
</script>
@client/components/GenericContainer/index.vue
