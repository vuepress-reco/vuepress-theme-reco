<template>
  <div v-if="showPageInfo" class="page-info">
    <Icon v-if="!!author" icon="solid user" :text="author" />
    <Icon v-if="!!date" icon="solid calendar-alt" :text="date" />
    <Icon v-if="showValineViews" icon="solid mask">
      <ValineViews :num-style="{}" />
    </Icon>
    <Icon v-if="!!categories && categories.length > 0" icon="solid th-list">
      <RouterLink
        v-for="(category, index) in categories"
        :key="index"
        :class="['category', { active: currentCategory === category }]"
        :to="`/categories/${category}/1/`"
        >{{ category }}</RouterLink
      >
    </Icon>
    <Icon v-if="!!tags && tags.length > 0" icon="solid tags">
      <RouterLink
        v-for="(tag, index) in tags"
        :key="index"
        :class="['tag', { active: currentTag === tag }]"
        :to="`/tags/${tag}/1/`"
        >{{ tag }}</RouterLink
      >
    </Icon>
  </div>
</template>

<script lang="ts">
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { defineComponent, computed, toRefs } from 'vue'
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
    hideValineViews: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { pageData, hideValineViews } = toRefs(props)
    const { solution, options } = useComment()
    console.log(solution.value, '-', options.value)
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

    const showValineViews = computed(() => {
      return (
        solution.value === 'valine' &&
        options.value.visitor !== false &&
        !hideValineViews.value
      )
    })

    return {
      author,
      date,
      categories,
      tags,
      showPageInfo,
      solution,
      showValineViews,
    }
  },
})
</script>
