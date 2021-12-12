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
import Banner from './Banner'
import Blog from './Blog'
import MdContent from './MdContent'
import Footer from './Footer'

const elementsMap = {
  Banner,
  Blog,
  MdContent,
  Footer
}

const frontmatter = usePageFrontmatter()
</script>
