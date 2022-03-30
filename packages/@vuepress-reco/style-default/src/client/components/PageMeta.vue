<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <Link class="meta-item-label" :item="editNavLink" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated">
      <Xicons
        class="meta-item-label"
        icon="CalendarTime"
        :text="`${themeLocale.lastUpdatedText || 'Last Updated'} ${lastUpdated}`"
        icon-size="20"
        text-size="14"
      />
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from '@vuepress/client'
import type {
  DefaultThemePageData,
  DefaultThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
} from '../../types'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { resolveEditLink } from '../utils'
import Link from './Link.vue'
import {toISODate} from "../utils/other";

const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true

    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      path: page.value.path,
      editLinkPattern: themeLocale.value.editLinkPattern,
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
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return toISODate(updatedDate)
  })
}

export default defineComponent({
  name: 'PageMeta',

  components: { Link },

  setup() {
    const themeLocale = useThemeLocaleData()
    const editNavLink = useEditNavLink()
    const lastUpdated = useLastUpdated()

    return {
      themeLocale,
      editNavLink,
      lastUpdated,
    }
  },
})
</script>
