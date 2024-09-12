
import { isString } from 'vuepress/shared'
import { convertToPinyin } from '@vuepress-reco/shared'
import { getNavLink, useThemeLocaleData } from '@composables/index.js'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import type {
  MenuLink,
  MenuGroup,
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

export const useNavbarConfig = (): Array<MenuLink | MenuGroup<MenuLinkGroup>> => {
  const themeLocal = useThemeLocaleData()
  const autoAddCategoryToNavbar = themeLocal.value.autoAddCategoryToNavbar

  let navItems = [...themeLocal.value.navbar || []]

  if (autoAddCategoryToNavbar) {
    const { categorySummary } = useExtendPageData()
    const parsedData: any[] = []

    const categoriesData =  Object.values(categorySummary?.categories?.items || {})
    if (categoriesData.length > 0) {
      const parsedCategoriesData: MenuLink | MenuGroup<MenuLinkGroup> = {
        text: themeLocal.value.categoriesText || 'Categories',
        children: Object.values(categorySummary?.categories?.items || {}).map((c) => ({
          // @ts-ignore
          text: c.label,
          // @ts-ignore
          link: `/categories/${convertToPinyin(c.categoryValue)}/1.html`,
        }))
      }

      if ((autoAddCategoryToNavbar as AutoAddCategoryToNavbarOptions)?.showIcon) {
        parsedCategoriesData.icon = 'Folder'
      }

      parsedData.push(parsedCategoriesData)
    }

    const tagsData =  Object.values(categorySummary?.categories?.items || {})
    if (tagsData.length > 0) {
      const parsedTagsData: MenuLink | MenuGroup<MenuLinkGroup> = {
        text: themeLocal.value.tagsText || 'Tags',
        children: Object.values(categorySummary?.tags?.items || {}).map(t => ({
          // @ts-ignore
          text: t.label,
          // @ts-ignore
          link: `/tags/${convertToPinyin(t.categoryValue)}/1.html`,
        }))
      }

      if ((autoAddCategoryToNavbar as AutoAddCategoryToNavbarOptions)?.showIcon) {
        parsedTagsData.icon = 'Tag'
      }

      parsedData.push(parsedTagsData)
    }

    navItems.splice(
      (autoAddCategoryToNavbar as AutoAddCategoryToNavbarOptions)?.location || 0,
      0,
      ...parsedData
    )
  }

  return navItems.map((item) => resolveNavbarItem(item as MenuLink | MenuLinkGroup))
}
