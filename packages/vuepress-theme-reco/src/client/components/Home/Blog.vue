<template>
  <section class="home-blog-content">
    <section class="blog-list">
      <PostList :data="postsOfCurrentPage" />
      <Pagation
        :currentPage="currentPage"
        :total="posts.length"
        @change="handlePagation"
      />
    </section>
    <MagicCard class="info-wrapper">
      <div class="personal-info-wrapper">
        <img
          class="personal-img"
          v-if="themeLocal.authorAvatar"
          :src="withBase(themeLocal.authorAvatar)"
          alt="author-avatar"
        />
        <p class="name" v-if="themeLocal.author">{{ themeLocal.author }}</p>
        <hr>
      </div>

      <h4 class="module-title">
        <Xicons :icon="IconFolder" :text="themeLocal.categoriesText || 'Categories'" />
      </h4>

      <ul class="category-wrapper">
        <li
          class="category-item"
          v-for="({ label, length, categoryValue }, key, index) in categories"
          :key="index">
          <router-link
            class="category-link"
            :to="`/categories/${categoryValue}/1.html`"
          >
            <span class="text">{{ label }}</span>
            <span class="num">{{ length }}</span>
          </router-link>
        </li>
      </ul>

      <h4 class="module-title">
        <Xicons :icon="IconTag" :text="themeLocal.tagsText || 'Tags'" />
      </h4>

      <ul class="tag-wrapper">
        <li
          class="tag-item"
          v-for="({ label, categoryValue }, key, index) in tags"
          :key="index"
          :style="{ borderColor: createOneColor() }"
        >
          <router-link
            class="tag-link"
            :to="`/tags/${categoryValue}/1.html`"
          >{{ label }}</router-link>
        </li>
      </ul>
    </MagicCard>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouteLocale, useRoute, useRouter, withBase } from 'vuepress/client'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import { createOneColor, throttle } from '@utils/index.js'
import { useThemeLocaleData } from '@composables/index.js';

import PostList from '@components/PostList/index.vue'
import Pagation from '../Pagation.vue'
import { IconFolder, IconTag } from '@components/icons/index.js'

const { posts, categorySummary } = useExtendPageData()

const total = computed(()=>{
  return posts.length
})

const currentPage = ref(1)
const perPage = 10

const categories = computed(() => {
  return categorySummary?.categories?.items || []
})

const tags = computed(() => {
  return categorySummary?.tags?.items || []
})

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

    const homeHref = themeLocal.value.home || routeLocale.value
    router.push(page > 1 ? `${homeHref}?page=${page}` : homeHref)

    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }

  const pageNum = Number(route?.query?.page)

  function refreshPage(page){
    if(page>=total){
      page=total
    }else if(page<=0){
      page=1;
    }
    handlePagation(page);
  }

  onMounted(() => {
    if(typeof pageNum ==='number' && !isNaN(pageNum)){
      refreshPage(pageNum);
    }

  // @ts-ignore
    watch(queryPage, (newVal) => {
      if (newVal) {
        currentPage.value = Number(newVal)
      }
    })
  })

  window.addEventListener(
    'scroll',
    throttle(() => {
      const card = document.querySelector('.info-wrapper')

      if (card) {
        // @ts-ignore
        card.setAttribute('data-x', card.offsetLeft)
        // @ts-ignore
        card.setAttribute('data-y', card.offsetTop)
        // @ts-ignore
        card.setAttribute('data-width', card.clientWidth)
        // @ts-ignore
        card.setAttribute('data-height', card.clientHeight)
      }
    }, 50)
  )
}
</script>
