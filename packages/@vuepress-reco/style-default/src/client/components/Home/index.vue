<template>
  <div class="home-wrapper">
    <component
      v-for="key in (frontmatter.modules || ['Banner', 'Blog', 'Footer'])"
      :is="elementsMap[key]"
      :key="key"
    />
  </div>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { useThemeLocaleData } from '../../composables'
import Banner from './Banner.vue'
import BannerBrand from './BannerBrand.vue'
import Blog from './Blog.vue'
import MdContent from './MdContent.vue'
import Footer from './Footer.vue'

const elementsMap = {
  Banner,
  BannerBrand,
  Blog,
  MdContent,
  Footer
}

const frontmatter = usePageFrontmatter()
</script>
