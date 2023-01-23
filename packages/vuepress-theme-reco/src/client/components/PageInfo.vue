<template>
  <div v-if="showPageInfo" class="page-info">
    <Xicons v-if="!!author" icon="tabler.User" :text="author" />

    <Xicons v-if="!!date" icon="tabler.Clock" :text="date" />

    <Xicons v-if="!!categories && categories.length > 0" icon="tabler.Folder">
      {{categories.join(' ')}}
    </Xicons>

    <Xicons v-if="!!tags && tags.length > 0" icon="tabler.Tag">
      {{tags.join(' ')}}
    </Xicons>

    <Xicons v-if="showValineViews" icon="fluent.Eye12Regular">
      <ValineViews />
    </Xicons>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import { formatISODate } from '../utils/other'
import { convertToPinyin } from '@vuepress-reco/shared'

export default defineComponent({
  name: 'PageInfo',

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
    const themeData = useThemeLocaleData()

    const author = computed(
      () => pageData?.value?.frontmatter?.author || themeData.value.author || ''
    )

    const date = computed(() => {
      const d = pageData?.value?.frontmatter?.date
      return d ? formatISODate(d) : ''
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
      return (
        solution.value === 'valine' &&
        options.value.visitor != false &&
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
      convertToPinyin,
    }
  },
})
</script>
