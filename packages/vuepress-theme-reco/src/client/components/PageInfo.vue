<template>
  <div v-if="showPageInfo" class="page-info">
    <Xicons v-if="!!author" icon="User" :text="author" />

    <Xicons v-if="!!date" icon="Calendar" :text="date" />

    <Xicons v-if="!!categories && categories.length > 0" icon="Folder">
      {{ categories.join(' ') }}
    </Xicons>

    <Xicons v-if="!!tags && tags.length > 0" icon="Tag">
      {{ tags.join(' ') }}
    </Xicons>

    <Xicons v-if="showValineViews || showWalineViews">
      <template #icon>
        <svg
          class="xicon-icon"
          style="width: 18px; height: 18px; font-size: 18px; color: inherit"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 12 12"
        >
          <g fill="none">
            <path
              d="M1.974 6.659a.5.5 0 0 1-.948-.317c-.01.03 0-.001 0-.001a1.633 1.633 0 0 1 .062-.162c.04-.095.099-.226.18-.381c.165-.31.422-.723.801-1.136C2.834 3.827 4.087 3 6 3c1.913 0 3.166.827 3.931 1.662a5.479 5.479 0 0 1 .98 1.517l.046.113c.003.008.013.06.023.11L11 6.5s.084.333-.342.474a.5.5 0 0 1-.632-.314v-.003l-.006-.016a3.678 3.678 0 0 0-.172-.376a4.477 4.477 0 0 0-.654-.927C8.584 4.673 7.587 4 6 4s-2.584.673-3.194 1.338a4.477 4.477 0 0 0-.795 1.225a2.209 2.209 0 0 0-.03.078l-.007.018zM6 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4zM5 7a1 1 0 1 1 2 0a1 1 0 0 1-2 0z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </template>
      <ValineViews v-if="showValineViews" />
      <WalineViews v-if="showWalineViews" :path="pageData.path" />
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
    hideViews: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { pageData, hideViews } = toRefs(props)
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
        !hideViews.value
      )
    })

    const showWalineViews = computed(() => {
      return (
        solution.value === 'waline' &&
        options.value.pageview != false &&
        !hideViews.value
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
      showWalineViews,
      convertToPinyin,
    }
  },
})
</script>
