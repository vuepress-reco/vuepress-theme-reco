<template>
  <main class="home-wrapper">
    <component
      v-for="key in (frontmatter.modules || ['Banner', 'Blog', 'Footer'])"
      :is="key"
      :key="key"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Blog from './Blog.vue'
import Banner from './Banner.vue'
import Footer from './Footer.vue'
import Comment from './Comment.vue'
import Features from './Features.vue'
import MdContent from './MdContent.vue'
import BannerBrand from './BannerBrand.vue'

import { RecoThemeHomePageFrontmatter } from '../../../types'

export default defineComponent({
  name: 'HomeWrapper',

  components: {
    Banner,
    BannerBrand,
    Blog,
    MdContent,
    Comment,
    Footer,
    Features,
  }
})
</script>

<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client'

const frontmatter = usePageFrontmatter<RecoThemeHomePageFrontmatter>()
</script>
