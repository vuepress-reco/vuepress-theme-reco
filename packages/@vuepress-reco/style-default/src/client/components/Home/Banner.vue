<template>
  <section class="banner-wrapper" :style="{ ...bgImageStyle }">
    <div class="hero-content icon-blue">
      <img
        v-if="heroImage"
        :src="heroImage"
        :style="{
          heroImageStyle,
        }"
        alt="heroImage"
      />
      <h1>{{ frontmatter.banner.heroText }}</h1>
      <p>{{ frontmatter.banner.tagline }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter, withBase } from '@vuepress/client'

const frontmatter = usePageFrontmatter()

const bgImageStyle = computed(() => {
  const { bgImageStyle, bgImage } = frontmatter.value
  const url = bgImage ? withBase(bgImage) : require('../../images/bg.svg')
  const initBgImageStyle = {
    textAlign: 'center',
    overflow: 'hidden',
    background: `url(${url}) center/cover no-repeat`
  }

  return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
})
</script>
