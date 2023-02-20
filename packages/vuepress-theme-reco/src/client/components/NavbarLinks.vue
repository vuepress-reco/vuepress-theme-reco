<template>
  <nav v-if="navbarLinks.length" class="navbar-links">
    <div v-for="item in navbarLinks" :key="item.link" class="navbar-links__item">
      <template v-if="item.children">
        <DropdownLink :item="item" />
      </template>

      <template v-else>
        <Link :item="item" />
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client'
import { isString } from '@vuepress/shared'
import type { NavbarItem, NavbarGroup, ResolvedNavbarItem } from '../../types'
import { useNavLink } from '../composables/index'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import { convertToPinyin } from '@vuepress-reco/shared'
import { resolveRepoType } from '../utils'
import DropdownLink from './DropdownLink.vue'
import Link from './Link.vue'

/**
 * Get navbar config of select language dropdown
 */
const useNavbarSelectLanguage = (): ComputedRef<ResolvedNavbarItem[]> => {
  const router = useRouter()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocal = useThemeLocaleData()

  return computed<ResolvedNavbarItem[]>(() => {
    const localePaths = Object.keys(siteLocale.value.locales)
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = router.currentRoute.value.path
    const currentFullPath = router.currentRoute.value.fullPath

    const selectLanguageText = computed(() => {
      return themeLocal.value.selectLanguageText || '选择语言'
    })

    const languageDropdown: ResolvedNavbarItem = {
      icon: 'EarthFilled',
      text: selectLanguageText.value,
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this langauge link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {}
        const targetThemeLocale =
          themeLocal.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang
        let link

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          )
          if (
            router.getRoutes().some((item) => item.path === targetLocalePage)
          ) {
            link = targetLocalePage
          } else {
            link = targetThemeLocale.home ?? targetLocalePath
          }
        }

        return {
          text,
          link,
        }
      }),
    }

    return [languageDropdown]
  })
}

/**
 * Get navbar config of repository link
 */
const useNavbarRepo = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocal = useThemeLocaleData()

  const repo = computed(() => themeLocal.value.repo)
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  )

  const repoLink = computed(() => {
    if (repoType.value === 'GitHub') {
      return `https://github.com/${repo.value}`
    }
    return repo.value
  })

  const repoLabel = computed(() => {
    if (!repoLink.value) return null
    if (themeLocal.value.repoLabel) return themeLocal.value.repoLabel
    if (repoType.value === null) return 'Source'
    return repoType.value
  })

  return computed(() => {
    if (!repoLink.value || !repoLabel.value) {
      return []
    }

    return [
      {
        text: repoLabel.value,
        link: repoLink.value,
      },
    ]
  })
}

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) {
    return useNavLink(item)
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    }
  }
  return item as ResolvedNavbarItem
}

const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocal = useThemeLocaleData()
  const { categorySummary } = usePageData()

  const parseCategories = computed(() => {
    return [
      {
        text: 'Categories',
        children: Object.values(categorySummary?.categories?.items || {}).map((c) => ({
          // @ts-ignore
          text: c.label,
          // @ts-ignore
          link: `/categories/${convertToPinyin(c.label)}/1/`,
        }))
      },
      {
        text: 'Tags',
        children: Object.values(categorySummary?.tags?.items || {}).map(t => ({
          // @ts-ignore
          text: t.label,
          // @ts-ignore
          link: `/tags/${convertToPinyin(t.label)}/1/`,
        }))
      },
    ]
  })

  return computed(() => {
    let navItems = themeLocal.value.navbar || []
    if (themeLocal.value.autoAddCategoryToNavbar === true) {
      navItems = [
        ...parseCategories.value,
        ...navItems
      ]
    }
    return navItems.map(resolveNavbarItem)
  })
}

export default defineComponent({
  name: 'NavbarLinks',

  components: {
    Link,
    DropdownLink,
  },

  setup() {
    const navbarConfig = useNavbarConfig()
    const navbarSelectLanguage = useNavbarSelectLanguage()
    const navbarRepo = useNavbarRepo()

    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value,
    ])

    return {
      navbarLinks,
    }
  },
})
</script>
