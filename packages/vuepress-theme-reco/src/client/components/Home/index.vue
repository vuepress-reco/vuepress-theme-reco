<template>
  <div class="home-wrapper">
    <component
      v-for="key in (frontmatter.modules || ['Banner', 'Blog', 'Footer'])"
      :is="key"
      :key="key"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './Banner.vue'
import BannerBrand from './BannerBrand.vue'
import Blog from './Blog.vue'
import MdContent from './MdContent.vue'
import Footer from './Footer.vue'

export default defineComponent({
  name: 'HomeWrapper',

  components: {
    Banner,
    BannerBrand,
    Blog,
    MdContent,
    Footer
  }
})
</script>

<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'

const frontmatter = usePageFrontmatter()
</script>
