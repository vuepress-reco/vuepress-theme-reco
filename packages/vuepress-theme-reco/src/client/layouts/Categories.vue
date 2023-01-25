<template>
  <div class="categories-container">
    <Common>
      <ul class="category-list">
        <li
          v-for="({ label, length }, index) in categoryList"
          :key="index"
          :class="[
            'category-item',
            {
              active: categoryPosts.currentCategoryValue === convertToPinyin(label),
            },
          ]"
        >
          <RouterLink
            class="category-link"
            :to="`/${categoryPosts.currentCategoryKey}/${convertToPinyin(label)}/1/`"
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
    </Common>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import { convertToPinyin } from '@vuepress-reco/shared'
import PostList from '../components/PostList.vue'
import Common from '../components/Common/index.vue'
import Pagation from '../components/Pagation.vue'

export default defineComponent({
  components: { Common, PostList, Pagation },

  setup() {
    const {
      categoryPosts,
      categorySummary
    } = usePageData()
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

      router.push(`/${currentCategoryKey}/${currentCategoryValue}/${page}/`)
    }

    return {
      categoryList,
      categoryPosts,
      handlePagation,
      convertToPinyin
    }
  },
})
</script>
