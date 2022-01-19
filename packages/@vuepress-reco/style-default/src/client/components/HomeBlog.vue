<template>
  <main class="home-blog-wrapper">
    <!-- hero -->
    <section class="hero" :style="{ ...bgImageStyle }">
      <div class="hero-content">
        <img
          v-if="heroImage"
          :src="heroImage"
          :style="{
            heroImageStyle,
          }"
          alt="heroImage"
        />
        <h1>{{ frontmatter.heroText }}</h1>
        <p>{{ frontmatter.tagline }}</p>
      </div>
    </section>

    <!-- blog -->
    <section class="home-blog-content">
      <section class="blog-list">
        <PostList
          :data="postsOfCurrentPage"
          :total="posts.length"
          :page-size="10"
          :current-page="currentPage"
        />
        <Pagation
          :currentPage="currentPage"
          :total="posts.length"
          @change="handlePagation"
        />
      </section>
      <section class="info-wrapper">
        <PersonalInfo />

        <h4 class="module-title"><Xicons icon="Folder" text="Categories" /></h4>
        <ul class="category-wrapper">
          <li class="category-item" v-for="(value, key, index) in categories" :key="index">
            <router-link class="category-link" :to="`/categories/${key}/1/`">
              <span class="text">{{ key }}</span>
              <span class="num">{{ value.length }}</span>
            </router-link>
          </li>
        </ul>

        <h4 class="module-title"><Xicons icon="Tag" text="Tags" /></h4>
        <ul class="tag-wrapper">
          <li class="tag-item" v-for="(value, key, index) in categories" :key="index" :style="{ borderColor: createOneColor() }">
            <router-link class="tag-link" :to="`/tags/${key}/1/`">{{ key }}</router-link>
          </li>
        </ul>
      </section>
    </section>

    <!-- content -->
    <section class="theme-reco-default-content">
      <Content />
    </section>
    <Footer />
  </main>
</template>

<script lang="ts">
import Footer from './Home/index.vue'
import PostList from './PostList.vue'
import { defineComponent, computed, ref, onMounted } from 'vue'
import { usePageFrontmatter, withBase } from '@vuepress/client'
import PersonalInfo from './PersonalInfo.vue'
import Pagation from './Pagation.vue'
import { createOneColor } from '../utils'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'

export default defineComponent({
  name: 'HomeBlog',

  components: { Footer, PostList, PersonalInfo, Pagation },

  setup() {
    const { posts, classificationSummary } = usePageData()
    const currentPage = ref(1)
    const perPage = 10
    const heroHeight = ref(0)

    const postsOfCurrentPage = computed(() => {
      const start = (currentPage.value - 1) * perPage
      const end = currentPage.value * perPage

      return posts.value.slice(start, end)
    })

    const categories = computed(() => {
      return classificationSummary.value.categories.items
    })

    const tags = computed(() => {
      return classificationSummary.value.tags.items
    })

    const frontmatter = usePageFrontmatter()

    const bgImageStyle = computed(() => {
      const { bgImageStyle, bgImage } = frontmatter.value
      const url = bgImage ? withBase(bgImage) : null
      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `url(${url}) center/cover no-repeat`
      }

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    })

    const heroImage = computed(() => {
      return frontmatter.value.heroImage
        ? withBase(frontmatter.value.heroImage)
        : null
    })

    const heroImageStyle = computed(
      () => frontmatter.value.heroImageStyle || {}
    )

    const handlePagation = (page) => {
      currentPage.value = page
      setTimeout(() => {
        window.scrollTo(0, heroHeight.value)
      }, 100)
    }

    onMounted(() => {
      heroHeight.value = document.querySelector('.hero').clientHeight
    })

    return { frontmatter, bgImageStyle, heroImage, heroImageStyle, posts, postsOfCurrentPage, createOneColor, categories, tags, currentPage, handlePagation }
  },
})
</script>
