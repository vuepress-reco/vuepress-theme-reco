<template>
  <div v-if="showPageInfo" class="page-info">
    <Icon v-if="!!author" icon="solid user" :text="author" />
    <Icon v-if="!!date" icon="solid calendar-alt" :text="date" />
    <Icon v-if="!!categories && categories.length > 0" icon="solid th-list">
      <a
        v-for="(category, index) in categories"
        :key="index"
        :class="['category', { active: currentCategory === category }]"
        :href="`/categories/${category}/1/`"
        >{{ category }}</a
      >
    </Icon>
    <Icon v-if="!!tags && tags.length > 0" icon="solid tags">
      <a
        v-for="(tag, index) in tags"
        :key="index"
        :class="['tag', { active: currentTag === tag }]"
        :href="`/tags/${tag}/1/`"
        >{{ tag }}</a
      >
    </Icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import Icon from './Icon'

export default defineComponent({
  name: 'PageInfo',

  components: { Icon },

  props: {
    pageData: {
      type: Object,
      default: () => ({}),
    },
    currentCategory: {
      type: String,
      default: '',
    },
    currentTag: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { pageData } = toRefs(props)
    const themeData = useThemeLocaleData()

    const author = computed(
      () => pageData?.value?.frontmatter?.author || themeData.value.author || ''
    )

    const date = computed(() => pageData?.value?.frontmatter?.date || '')

    const categories = computed(
      () => pageData?.value?.frontmatter?.categories || []
    )

    const tags = computed(() => pageData?.value?.frontmatter?.tags || [])

    const showPageInfo = computed(
      () =>
        !!author.value ||
        !!date.value ||
        !!(categories.value && categories.value.length > 0) ||
        !!(tags.value && tags.value.length > 0)
    )

    return { author, date, categories, tags, showPageInfo }
  },
})
</script>
