<template>
  <section class="custom-banner-wrapper" :style="{ ...bgImageStyle }">
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter, withBase } from '@vuepress/client'
import Link from '../Link.vue'

const frontmatter = usePageFrontmatter()

const heroImage = computed(() => {
  return frontmatter.value?.customBanner?.heroImage
    ? withBase(frontmatter.value?.customBanner?.heroImage)
    : null
})

const buttons = computed(() => {
  return frontmatter.value?.customBanner?.buttons || []
})

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

<style>
.custom-banner-wrapper {
  @apply w-screen flex justify-center items-center;
  @apply md:h-screen;
  .hero-content {
    @apply block;
    @apply md:max-w-3xl md:flex md:flex-row-reverse md:items-start;
    .hero-text {
      @apply box-border mb-16 px-6;
      h1 {
        @apply mb-6 text-4xl text-center;
        @apply md:text-6xl md:text-left;
      }
      .btn-group {
        @apply list-none mt-8 pl-0 text-center;
        @apply md:text-left;
        li {
          @apply inline-block;
          @apply hover:border-reco-brand;
          .icon-container {
            @apply inline-block px-6 py-2 border-2 border-solid border-reco-brand rounded-md bg-reco-brand-lighter cursor-pointer font-semibold text-white;
            @apply dark:text-reco-text-darkmode;
          }
          &.plain .icon-container {
            @apply bg-block;
          }
          &:not(:first-child) {
            @apply ml-4;
          }
        }
      }
    }
    img {
      @apply block mx-auto mt-32 mb-16 w-40;
      @apply md:mt-0 sm:w-40 md:w-60 md:ml-16;
    }
  }
}

/* 兼容 */
.custom-banner-wrapper .hero-content .hero-text .btn-group li > a .icon-container {
  @apply text-white dark:text-reco-text-darkmode;
}
</style>
