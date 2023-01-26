<template>
  <section class="banner-brand__wrapper" :style="{ ...bgImageStyle }">
    <div class="banner-brand__content">
      <h1 class="title" v-if="frontmatter?.bannerBrand?.title">{{ frontmatter?.bannerBrand?.title }}</h1>

      <p class="description" v-if="frontmatter?.bannerBrand?.description">{{ frontmatter?.bannerBrand?.description }}</p>

      <p class="tagline" v-if="frontmatter?.bannerBrand?.tagline">{{ frontmatter?.bannerBrand?.tagline }}</p>

      <div class="btn-group" v-if="buttons.length > 0">
        <Xicons
          v-for="(btn, index) in buttons" :class="btn.type" :key="index"
          :icon="btn.icon"
          :text="btn.text"
          :link="btn.link"
          icon-size="18"
          text-size="14"
        />
      </div>

      <ul class="social-links" v-if="socialLinks.length > 0">
        <li
          class="social-item"
          v-for="(item, index) in socialLinks"
          :key="index"
        >
          <Xicons :icon="item.icon" :link="item.link" :style="{ color: item.color }" target="_blank" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter, withBase } from '@vuepress/client'
import Link from '../Link.vue'
import { createOneColor } from '../../utils'

const frontmatter = usePageFrontmatter()

const heroImage = computed(() => {
  return frontmatter.value?.bannerBrand?.heroImage
    ? withBase(frontmatter.value?.bannerBrand?.heroImage)
    : null
})

const buttons = computed(() => {
  return frontmatter.value?.bannerBrand?.buttons || []
})

const socialLinks = computed(() =>
  (frontmatter.value?.bannerBrand?.socialLinks || []).map(item => {
    if (!item.color) item.color = createOneColor()
    return item
  }))

const heroImageStyle = computed(
  () => frontmatter.value.bannerBrand.heroImageStyle || {}
)

const bgImageStyle = computed(() => {
  const { bgImageStyle, bgImage } = frontmatter.value?.bannerBrand || {}

  const initBgImageStyle = bgImage ? {
    overflow: 'hidden',
    background: `url(${withBase(bgImage)}) center/cover no-repeat`
  } : {}

  return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
})
</script>
