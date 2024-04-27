<template>
  <Common>
    <div class="categories-container">
      <ul class="category-list">
        <li
          v-for="({ label, categoryValue }, index) in categoryList"
          :key="index"
          :class="[
            'category-item',
            {
              active: categoryPosts.currentCategoryValue === categoryValue,
            },
          ]"
        >
          <RouterLink
            class="category-link"
            :to="`/${categoryPosts.currentCategoryKey}/${categoryValue}/1.html`"
          >
            <span class="text">{{ label }}</span>
          </RouterLink>
        </li>
      </ul>

      <PostList :data="categoryPosts.pages" />

      <Pagation
        v-if="categoryPosts.totalPage > 10"
        :currentPage="categoryPosts.currentPage"
        :total="categoryPosts.totalPage"
        @change="handlePagation"
      />
    </div>
  </Common>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import PostList from '@components/PostList.vue'
import Pagation from '@components/Pagation.vue'
import Common from '@components/Common/index.vue'
import { useMagicCard } from '@composables/index.js'


const {
  categoryPosts,
  categorySummary
} = useExtendPageData()
const route = useRoute()
const router = useRouter()

const categoryList = computed(() => {
  let list = []
  const currentCategoryKey = categoryPosts.value.currentCategoryKey

  if (currentCategoryKey) {
    const { items = [] } =
      categorySummary[currentCategoryKey]

    list = Object.values(items)
  }

  return list
})

const handlePagation = (page) => {
  const {
    currentCategoryKey,
    currentCategoryValue
  } = categoryPosts.value

  router.push(`/${currentCategoryKey}/${currentCategoryValue}/${page}.html`)
}

const { initMagicCard } = useMagicCard()

onMounted(() => {
  initMagicCard()
})

watch(route, () => {
  initMagicCard()
})
</script>
