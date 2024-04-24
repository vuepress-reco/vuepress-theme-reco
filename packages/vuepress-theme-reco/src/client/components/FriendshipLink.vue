<template>
  <div class="friendship-link-container">
    <MagicCard
      class="friendship-link-item"
      v-for="(item, index) in friendshipLinks"
      :key="index"
      @click="() => handlClick(item.link)"
    >
      <div class="logo">
        <img :src="item.logo" />
      </div>
      <span class="title">{{ item.title }}</span>
    </MagicCard>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useThemeLocaleData } from '@composables/index.js'
import { MagicCard } from './global/index.js';

const themeLocal = useThemeLocaleData()

const friendshipLinks = computed(() => {
  return themeLocal.value.friendshipLinks || []
})

const handlClick = (link: string) => {
  window.open(link, '_blank')
}
</script>
