<template>
  <div class="features__container">
    <MagicCard
      class="features__item"
      v-for="(item, index) in data"
      :key="index"
    >
      <h4>{{ item.title }}</h4>
      <p>{{ item.details }}</p>
    </MagicCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { usePageFrontmatter } from 'vuepress/client'

const frontmatter = usePageFrontmatter()

// @ts-ignore
const data: ComputedRef<Array<{ title: string, details: string }>> = computed(() => frontmatter.value.features || [])
</script>
