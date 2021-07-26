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
              active: classificationPosts.currentClassificationValue === label,
            },
          ]"
        >
          <RouterLink
            class="category-link"
            :to="`/${classificationPosts.currentClassificationKey}/${label}/1/`"
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
    </Common>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import PostList from '../components/PostList'
import Common from '../components/Common'

export default defineComponent({
  components: { Common, PostList },

  setup() {
    const { classificationPosts, classificationSummary } = usePageData()
    console.log('classificationPosts', classificationPosts.value)
    console.log('classificationSummary', classificationSummary.value)

    const classificationList = computed(() => {
      const { items } =
        classificationSummary.value[
          classificationPosts.value.currentClassificationKey
        ]

      const list = Object.keys(items).map((item) => {
        return { label: item, length: items[item].length }
      })

      return list
    })

    console.log('classificationList', classificationList.value)

    return {
      classificationList,
      classificationPosts,
    }
  },
})
</script>
