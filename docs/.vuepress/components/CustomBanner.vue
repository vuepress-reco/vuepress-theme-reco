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
        <h1 v-if="frontmatter?.customBanner?.heroText">{{ frontmatter?.customBanner?.heroText }}</h1>
        <p v-if="frontmatter?.customBanner?.tagline">{{ frontmatter?.customBanner?.tagline }}</p>

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

        <div class="shields-wrapper">
          <img alt="GitHub license" src="https://img.shields.io/github/license/vuepress-reco/vuepress-theme-reco?style=flat-square&logo=github&color=616ae5">
          <img alt="GitHub stars" src="https://img.shields.io/github/stars/vuepress-reco/vuepress-theme-reco?style=flat-square&logo=github&color=616ae5">
          <img alt="GitHub forks" src="https://img.shields.io/github/forks/vuepress-reco/vuepress-theme-reco?style=flat-square&logo=github&color=616ae5">
          <img alt="Npm downloads" src="https://img.shields.io/npm/dt/vuepress-theme-reco?style=flat-square&logo=npm&color=616ae5">
          <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/vuepress-reco/vuepress-theme-reco?filename=packages%2Fvuepress-theme-reco%2Fpackage.json&style=flat-square&color=616ae5&logo=npm">
          <img alt="Npm version" src="https://img.shields.io/badge/tailwindcss-3.1.6-616ae5?style=flat-square&logo=tailwindcss"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter, withBase } from '@vuepress/client'
import Link from 'vuepress-theme-reco/lib/client/components/Link.vue'
import { createOneColor } from 'vuepress-theme-reco/lib/client/utils'

const frontmatter = usePageFrontmatter()

const heroImage = computed(() => {
  return frontmatter.value?.customBanner?.heroImage
    ? withBase(frontmatter.value?.customBanner?.heroImage)
    : null
})

const buttons = computed(() => {
  return frontmatter.value?.customBanner?.buttons || []
})

const socialLinks = computed(() =>
  (frontmatter.value?.customBanner?.socialLinks || []).map(item => {
    if (!item.color) item.color = createOneColor()
    return item
  }))

const heroImageStyle = computed(
  () => frontmatter.value.customBanner.heroImageStyle || {}
)

const bgImageStyle = computed(() => {
  const { bgImageStyle, bgImage } = frontmatter.value?.customBanner || {}

  const initBgImageStyle = bgImage ? {
    overflow: 'hidden',
    background: `url(${withBase(bgImage)}) center/cover no-repeat`
  } : {}

  return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
})
</script>

<style scoped>
.shields-wrapper {
  @apply mt-20 text-center;
  @apply md:text-left;
  img {
    @apply inline-block ml-0 mr-1 my-1 w-auto h-6;
  }
}
</style>
