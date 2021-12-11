<template>
  <div class="home-wrapper">
    <component
      v-for="key in (themeLocal.homeElements || [])"
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
import Footer from './Footer'

const elementsMap = {
  Banner,
  Blog,
  Footer
}

const frontmatter = usePageFrontmatter()
const themeLocal = useThemeLocaleData()

console.log(frontmatter.value, themeLocal.value)
</script>
