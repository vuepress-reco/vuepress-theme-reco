<template>
  <section class="posts-container">
    <PostList :data="postsOfCurrentPage" />
    <Pagation
      :currentPage="currentPage"
      :total="posts.length"
      @change="handlePagation"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouteLocale, withBase, useRoute, useRouter } from 'vuepress/client';
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import PostList from '@components/PostList/index.vue'
import Pagation from './Pagation.vue'

import { useThemeLocaleData } from '@composables/index.js';

const { posts } = useExtendPageData()

const currentPage = ref(1)
const blogContentTop = ref(0)
const perPage = 10

const postsOfCurrentPage = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = currentPage.value * perPage

  return (posts || []).slice(start, end)
})

let handlePagation = (page) => {}
const route = useRoute()
const router = useRouter()
const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()

const queryPage = computed(() => route.query.page)

// @ts-ignore
if (!__VUEPRESS_SSR__) {
  handlePagation = (page) => {
    currentPage.value = page

    const homeHref = withBase('/posts')
    router.push(page > 1 ? `${homeHref}/${page}.html` : `${homeHref}.html`)

    setTimeout(() => {
      if (blogContentTop.value === 0) {
        const blogContent = document.querySelector('.home-blog-content')
        if (blogContent) blogContentTop.value = blogContent.getBoundingClientRect().top
      }

      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }, 100)
  }

  onMounted(() => {
  // @ts-ignore
    watch(queryPage, (newVal) => {
      if (newVal) {
        currentPage.value = Number(newVal)
      }
    })
  })
}
</script>
