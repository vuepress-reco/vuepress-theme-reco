<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <Xicons class="meta-item-label" :icon="editNavLink.icon" :text="editNavLink.text" :link="editNavLink.link"
        target="_blank" icon-size="20" text-size="14" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated">
      <Xicons class="meta-item-label" :icon="IconCalendar"
        :text="`${themeLocal.lastUpdatedText || 'Last Updated'} ${lastUpdated}`" icon-size="20" text-size="14" />
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageData } from 'vuepress/client'
import { IconEdit, IconCalendar } from '@components/icons/index.js'

import { resolveEditLink } from '@utils/index.js'
import { useThemeLocaleData, usePageFrontmatter } from '@composables/index.js'


import type { ComputedRef } from 'vue'
import type { RecoThemePageData, MenuLink } from '../../types'

const useEditNavLink = (): ComputedRef<null | MenuLink> => {
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
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocal.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocal.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
      icon: IconEdit,
      hideExternalLinkIcon: true
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
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

const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const themeLocal = useThemeLocaleData()
</script>
