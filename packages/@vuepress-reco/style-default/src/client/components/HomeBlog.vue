<template>
  <main class="home-blog-wrapper">
    <div
      class="hero"
      :style="{ background: `url(${bgImage}) center/cover no-repeat` }"
    >
      <div class="hero-content">
        <img
          :src="frontmatter.heroImage"
          :style="{
            heroImageStyle,
          }"
          alt="heroImage"
        />
        <h1>{{ frontmatter.heroText }}</h1>
        <p>{{ frontmatter.tagline }}</p>
      </div>
    </div>
    <div class="theme-reco-default-content">
      <Content />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

export default defineComponent({
  name: 'HomeBlog',
  setup() {
    const frontmatter = usePageFrontmatter()

    const bgImage = computed(() => {
      return frontmatter.value.bgImage
        ? frontmatter.value.bgImage
        : require('../images/bg.svg').default
    })

    const heroImageStyle = computed(
      () => frontmatter.value.heroImageStyle || {}
    )

    return { frontmatter, bgImage, heroImageStyle }
  },
})
</script>
