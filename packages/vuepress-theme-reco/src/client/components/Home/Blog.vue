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
    <section class="info-wrapper">
      <PersonalInfo />

      <h4 class="module-title">
        <Xicons icon="Folder" text="Categories" />
      </h4>

      <ul class="category-wrapper">
        <li
          class="category-item"
          v-for="(value, key, index) in categories"
          :key="index">
          <router-link
            class="category-link"
            :to="`/categories/${key}/1/`"
          >
            <span class="text">{{ value.label }}</span>
            <span class="num">{{ value.length }}</span>
          </router-link>
        </li>
      </ul>

      <h4 class="module-title">
        <Xicons icon="Tag" text="Tags" />
      </h4>

      <ul class="tag-wrapper">
        <li
          class="tag-item"
          v-for="(value, key, index) in tags"
          :key="index"
          :style="{ borderColor: createOneColor() }"
        >
          <router-link
            class="tag-link"
            :to="`/tags/${key}/1/`"
          >{{ value.label }}</router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import { createOneColor } from '../../utils'
import PostList from '../PostList.vue'
import Pagation from '../Pagation.vue'
import PersonalInfo from '../PersonalInfo.vue'

const { posts, categorySummary } = usePageData()

const currentPage = ref(1)
const blogContentTop = ref(0)
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

// @ts-ignore
if (!__VUEPRESS_SSR__) {
  handlePagation = (page) => {
    currentPage.value = page

    setTimeout(() => {
      if (blogContentTop.value === 0) {
        const blogContent = document.querySelector('.home-blog-content')
        if (blogContent) blogContentTop.value = blogContent.getBoundingClientRect().top
      }

      window.scrollTo({ left: 0, top: -blogContentTop.value - 250, behavior: 'smooth' })
    }, 100)
  }
}
</script>
