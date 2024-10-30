<template>
  <div v-if="showPageInfo" class="page-info">
    <Xicons v-if="!!author" :icon="IconUser" :text="author" />

    <Xicons v-if="!!date" :icon="IconCalendar" :text="date" />

    <Xicons v-if="categories.length > 0" :icon="IconFolder">
      <router-link
        v-for="({ label, pathValue }) in categories"
        :to="`/categories/${pathValue}/1.html`"
        :key="pathValue"
      >{{ label }}</router-link>
    </Xicons>

    <Xicons v-if="tags.length > 0" :icon="IconTag">
      <router-link
        v-for="({ label, pathValue }) in tags"
        :to="`/tags/${pathValue}/1.html`"
        :key="pathValue"
      >{{ label }}</router-link>
    </Xicons>

    <Xicons v-if="showValineViews || showWalineViews" :icon="IconEye">
      <ValineViews v-if="showValineViews" :idVal="path" />
      <WalineViews v-if="showWalineViews" :path="path" />
    </Xicons>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { convertToPinyin, removeEmptyString } from '@vuepress-reco/shared'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/composables'
import { IconUser, IconCalendar, IconFolder, IconTag, IconEye } from '@components/icons/index.js'

import { formatISODate } from '@utils/other'
import { useThemeLocaleData } from '@composables/index.js'

function formatCategory(category: string) {
  return convertToPinyin(removeEmptyString(category))
}

const props = defineProps({
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
})
const { pageData, hideViews } = toRefs(props)

const themeData = useThemeLocaleData()
const { solution, options } = useComment()

const author = computed(
  () => pageData?.value?.frontmatter?.author || themeData.value.author || ''
)

const path = computed(
  () => pageData?.value?.path || '/'
)

const date = computed(() => {
  const d = pageData?.value?.frontmatter?.date
  return d ? formatISODate(d) : ''
})

const categories = computed(() => {
  return (pageData?.value?.frontmatter?.categories || []).map(category => {
    return {
      label: category,
      pathValue: formatCategory((category))
    }
  })
})

const tags = computed(() => {
  return (pageData?.value?.frontmatter?.tags || []).map(category => {
    return {
      label: category,
      pathValue: formatCategory((category))
    }
  })
})

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
</script>
