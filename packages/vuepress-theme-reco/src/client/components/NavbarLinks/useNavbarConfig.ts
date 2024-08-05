
import { isString } from 'vuepress/shared'
import { convertToPinyin } from '@vuepress-reco/shared'
import { getNavLink, useThemeLocaleData } from '@composables/index.js'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import type {
  MenuLink,
  MenuLinkGroup,
  AutoAddCategoryToNavbarOptions,
} from '../../../types'

function resolveNavbarItem(
  item: MenuLink | MenuLinkGroup | string,
): MenuLink | MenuLinkGroup {
  if (isString(item)) {
    return getNavLink(item)
  }

  if ('children' in item && Array.isArray(item.children)) {
    return {
      ...item,
      children: item.children.map(resolveNavbarItem),
    };
  }

  return item as MenuLink
}

export const useNavbarConfig = (): Array<MenuLinkGroup> => {
  const themeLocal = useThemeLocaleData()
  const { categorySummary } = useExtendPageData()

  const parseCategories = [
    {
      text: (themeLocal.value.autoAddCategoryToNavbar as AutoAddCategoryToNavbarOptions)?.categoryText || 'Categories',
      children: Object.values(categorySummary?.categories?.items || {}).map((c) => ({
        // @ts-ignore
        text: c.label,
        // @ts-ignore
        link: `/categories/${convertToPinyin(c.label)}/1.html`,
      }))
    },
    {
      text: (themeLocal.value.autoAddCategoryToNavbar as AutoAddCategoryToNavbarOptions)?.tagText || 'Tags',
      children: Object.values(categorySummary?.tags?.items || {}).map(t => ({
        // @ts-ignore
        text: t.label,
        // @ts-ignore
        link: `/tags/${convertToPinyin(t.label)}/1.html`,
      }))
    },
  ]

  let navItems = [...themeLocal.value.navbar || []]

  if (themeLocal.value.autoAddCategoryToNavbar) {
    navItems.splice(
      (themeLocal.value.autoAddCategoryToNavbar as AutoAddCategoryToNavbarOptions)?.location || 0,
      0,
      ...parseCategories
    )
  }

  return navItems.map((item) => resolveNavbarItem(item as MenuLink | MenuLinkGroup))
}
