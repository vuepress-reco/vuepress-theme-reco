<template>
  <main class="home-blog-wrapper pt-14">
    <div
      class="hero w-screen h-screen-3/5 md:h-screen flex justify-center items-center"
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
        <h1 class="text-center mb-6">
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
  </main>
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
