<template>
  <div v-if="showPageInfo" class="page-info">
    <Xicons v-if="!!author" :icon="User" :text="author" />
    <Xicons v-if="!!date" :icon="Time" :text="date" />
    <Xicons v-if="!!categories && categories.length > 0" :icon="Categories">
      <RouterLink
        v-for="(category, index) in categories"
        :key="index"
        :class="['category', { active: currentCategory === category }]"
        :to="`/categories/${category}/1/`"
        >{{ category }}</RouterLink
      >
    </Xicons>
    <Xicons v-if="!!tags && tags.length > 0" :icon="TagGroup">
      <RouterLink
        v-for="(tag, index) in tags"
        :key="index"
        :class="['tag', { active: currentTag === tag }]"
        :to="`/tags/${tag}/1/`"
        >{{ tag }}</RouterLink
      >
    </Xicons>
    <Xicons v-if="showValineViews" :icon="View">
      <ValineViews :numStyle="{}" />
    </Xicons>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import Icon from './Icon'
import Xicons from "./Xicons";
import { User, Time, View, Categories, TagGroup } from '@vicons/carbon'

export default defineComponent({
  name: 'PageInfo',

  components: { Xicons, Icon },

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
      default: false
    }
  },

  setup(props) {
    const { pageData, hideValineViews } = toRefs(props)
    const { solution, options } = useComment()
    const themeData = useThemeLocaleData()

    const author = computed(
      () => pageData?.value?.frontmatter?.author || themeData.value.author || ''
    )

    const date = computed(() => {
      const d = pageData?.value?.frontmatter?.date
      return d ? new Date(d).toLocaleString() : ''
    })

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
      return (solution.value === 'valine' && options.value.visitor != false) && !hideValineViews.value
    })

    return { author, date, categories, tags, showPageInfo, solution, showValineViews, User, Time, View, Categories, TagGroup }
  },
})
</script>
