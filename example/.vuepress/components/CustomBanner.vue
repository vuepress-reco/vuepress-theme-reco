<template>
  <section class="banner-brand-wrapper" :style="{ ...bgImageStyle }">
    <div class="hero-content">
      <img
        v-if="heroImage"
        :src="heroImage"
        :style="{
          heroImageStyle,
        }"
        alt="heroImage"
      />

      <div class="hero-text">
        <h1 v-if="frontmatter?.bannerBrand?.heroText">{{ frontmatter?.bannerBrand?.heroText }}</h1>
        <p v-if="frontmatter?.bannerBrand?.tagline">{{ frontmatter?.bannerBrand?.tagline }}</p>

        <ul class="btn-group" v-if="buttons.length > 0">
          <li v-for="(btn, index) in buttons" :class="btn.type" :key="index">
            <Xicons
              :icon="btn.icon"
              :text="btn.text"
              :link="btn.link"
              icon-size="20"
              text-size="14"
            />
          </li>
        </ul>

        <ul class="social-links" v-if="socialLinks.length > 0">
          <li
            class="social-item"
            v-for="(item, index) in socialLinks"
            :key="index"
          >
            <Xicons :icon="item.icon" :link="item.link" :style="{ color: item.color }" />
          </li>
        </ul>
      </div>
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
