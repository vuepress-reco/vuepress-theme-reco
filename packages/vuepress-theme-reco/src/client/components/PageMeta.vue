<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <Xicons class="meta-item-label" :icon="editNavLink.icon" :text="editNavLink.text" :link="editNavLink.link"
        target="_blank" icon-size="20" text-size="14" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated">
      <Xicons class="meta-item-label" icon="Calendar"
        :text="`${themeLocal.lastUpdatedText || 'Last Updated'} ${lastUpdated}`" icon-size="20" text-size="14" />
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  usePageData,
  useSiteLocaleData,
} from 'vuepress/client'
import { useThemeLocaleData, usePageFrontmatter } from '@composables/index.js'

import Link from './Link.vue'
import { resolveEditLink } from '@utils/index.js'

import type { ComputedRef } from 'vue'
import type {
  RecoThemePageData,
  NavLink as NavLinkType,
} from '../../types'

const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocal = useThemeLocaleData()
  const page = usePageData<RecoThemePageData>()
  const frontmatter = usePageFrontmatter()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocal.value.editLink ?? true

    if (!showEditLink) {
      return null
    }

    const {
      repo,
      gitRepo = repo,
      gitBranch = 'main',
      sourceDir = '',
      editLinkText,
    } = themeLocal.value

    if (!gitRepo) return null

    const editLink = resolveEditLink({
      gitRepo,
      gitBranch,
      sourceDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocal.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
      icon: 'Edit',
      hideExternalLinkIcon: true
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  const siteLocale = useSiteLocaleData()
  const themeLocal = useThemeLocaleData()
  const page = usePageData<RecoThemePageData>()
  const frontmatter = usePageFrontmatter()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocal.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString()
  })
}

export default defineComponent({
  name: 'PageMeta',

  components: { Link },

  setup() {
    const themeLocal = useThemeLocaleData()
    const editNavLink = useEditNavLink()
    const lastUpdated = useLastUpdated()

    return {
      themeLocal,
      editNavLink,
      lastUpdated,
    }
  },
})
</script>
