<template>
  <div class="categories-container">
    <Common>
      <ul class="category-list">
        <li
          v-for="({ label, length }, index) in classificationList"
          :key="index"
          :class="[
            'category-item',
            {
              active: classificationPosts.currentClassificationValue === convertToPinyin(label),
            },
          ]"
        >
          <RouterLink
            class="category-link"
            :to="`/${classificationPosts.currentClassificationKey}/${convertToPinyin(label)}/1/`"
          >
            <span class="text">{{ label }}</span>
            <span class="num">{{ length }}</span>
          </RouterLink>
        </li>
      </ul>

      <PostList
        :data="classificationPosts.pages"
        :total="classificationPosts.total"
        :page-size="classificationPosts.pageSize"
        :current-page="classificationPosts.currentPage"
      />

      <Pagation
        v-if="classificationPosts.total > 10"
        :currentPage="classificationPosts.currentPage"
        :total="classificationPosts.total"
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
      classificationPosts,
      classificationSummary
    } = usePageData()
    const router = useRouter()

    const classificationList = computed(() => {
      let list = []
      const currentClassificationKey = classificationPosts.value.currentClassificationKey

      if (currentClassificationKey) {
        const { items = [] } =
          classificationSummary.value[currentClassificationKey]

        list = Object.values(items)
      }

      return list
    })

    const handlePagation = (page) => {
      const {
        currentClassificationKey,
        currentClassificationValue
      } = classificationPosts.value

      router.push(`/${currentClassificationKey}/${currentClassificationValue}/${page}/`)
    }

    return {
      classificationList,
      classificationPosts,
      handlePagation,
      convertToPinyin
    }
  },
})
</script>
