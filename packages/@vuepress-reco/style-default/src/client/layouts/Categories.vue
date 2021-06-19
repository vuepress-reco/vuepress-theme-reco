<template>
  <div class="categories-container">
    <ul class="category-list">
      <li
        v-for="({ label, length }, index) in classificationList"
        :key="index"
        :class="[
          'category-item',
          { active: currentClassificationValue === label },
        ]"
      >
        {{ label }} ({{ length }})
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'

export default defineComponent({
  setup() {
    const { classificationPosts, classificationSummary } = usePageData()
    const { currentClassificationKey, currentClassificationValue } =
      classificationPosts

    const classificationList = computed(() => {
      const { items } = classificationSummary[currentClassificationKey]

      const list = Object.keys(items).map((item) => {
        return { label: item, length: items[item].length }
      })

      return list
    })
    console.log(111, classificationPosts, classificationSummary)

    return { classificationList, currentClassificationValue }
  },
})
</script>
