<template>
  <main class="home-blog-wrapper">
    <div
      class="hero"
      :style="{ background: `url(${bgImage}) center/cover no-repeat` }"
    >
      <div class="hero-content">
        <img
          v-if="heroImage"
          :src="heroImage"
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
    <Footer />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageFrontmatter, withBase } from '@vuepress/client'
import Footer from "./Footer.vue";

export default defineComponent({
  name: 'HomeBlog',

  components: { Footer },

  setup() {
    const frontmatter = usePageFrontmatter()

    const bgImage = computed(() => {
      return frontmatter.value.bgImage
        ? withBase(frontmatter.value.bgImage)
        : null
    })

    const heroImage = computed(() => {
      return frontmatter.value.heroImage
        ? withBase(frontmatter.value.heroImage)
        : null
    })

    const heroImageStyle = computed(
      () => frontmatter.value.heroImageStyle || {}
    )

    return { frontmatter, bgImage, heroImage, heroImageStyle }
  },
})
</script>
