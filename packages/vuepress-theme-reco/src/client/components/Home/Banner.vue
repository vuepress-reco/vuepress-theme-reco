<template>
  <section class="banner-wrapper" :style="{ ...bgImageStyle }">
    <div class="banner-brand__content">
      <img
        v-if="heroImage"
        :src="heroImage"
        :style="{
          heroImageStyle,
        }"
        alt="heroImage"
      />
      <h1 v-if="frontmatter?.banner?.heroText">{{ frontmatter?.banner?.heroText }}</h1>
      <p v-if="frontmatter?.banner?.tagline">{{ frontmatter?.banner?.tagline }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter, withBase } from '@vuepress/client'

const frontmatter = usePageFrontmatter()

const heroImage = computed(() => {
  return frontmatter.value?.banner?.heroImage
    ? withBase(frontmatter.value?.banner?.heroImage)
    : null
})

const heroImageStyle = computed(
  () => frontmatter.value.banner.heroImageStyle || {}
)

const bgImageStyle = computed(() => {
  const { bgImageStyle, bgImage } = frontmatter.value?.banner || {}

  const initBgImageStyle = bgImage ? {
    textAlign: 'center',
    overflow: 'hidden',
    background: `url(${withBase(bgImage)}) center/cover no-repeat`
  } : {}

  return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
})
</script>
