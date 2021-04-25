<template>
  <div class="home-blog-wrapper">
    <div
      class="hero w-screen hhhhh md:h-screen flex justify-center items-center"
      :style="{ background: `url(${bgImage}) center/cover no-repeat` }"
    >
      <div class="hero-content bg-topaz">
        <img
          class="block mx-auto w-32 sm:w-40 md:w-60 mb-16"
          :src="frontmatter.heroImage"
          :style="{
            heroImageStyle,
          }"
          alt="heroImage"
        />
        <h1 class="text-center mb-6 text-gray-900 dark:text-white">
          {{ frontmatter.heroText }}
        </h1>
        <p class="text-center">
          {{ frontmatter.tagline }}
        </p>
      </div>
    </div>
    <div class="btn-red">btn</div>
    <div class="prose">
      <Content />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

export default defineComponent({
  setup() {
    const frontmatter = usePageFrontmatter()

    const bgImage = computed(() => {
      return frontmatter.value.bgImage
        ? frontmatter.value.bgImage
        : require('../../images/bg.svg').default
    })

    const heroImageStyle = computed(
      () => frontmatter.value.heroImageStyle || {}
    )

    return { frontmatter, bgImage, heroImageStyle }
  },
})
</script>
