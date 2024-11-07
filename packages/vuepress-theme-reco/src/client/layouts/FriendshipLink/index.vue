<template>
  <GenericContainer>
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
  </GenericContainer>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

import { MagicCard } from '@components/global/index.js';
import GenericContainer from '@components/GenericContainer/index.vue'

import { useMagicCard } from '@composables/index.js'
import { useFriendshipLink } from './useFriendshipLink';

const { friendshipLinks, handlClick } = useFriendshipLink()

const { initMagicCard } = useMagicCard()
onMounted(() => {
  initMagicCard()
})

const route = useRoute()
watch(route, () => {
  initMagicCard()
})
</script>
