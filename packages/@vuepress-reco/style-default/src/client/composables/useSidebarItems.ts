import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { useRoute } from 'vue-router'
// import { usePageData } from '@vuepress/client'
import {
  isArray,
  isPlainObject,
  isString,
  resolveLocalePath,
} from '@vuepress/shared'
import type {
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  SidebarConfigArray,
  SidebarConfigObject,
  SidebarGroup,
  SidebarItem,
} from '../../types'
import { useNavLink } from './useNavLink'

export interface NavItem {
  text: string
  ariaLabel?: string
}

export interface NavGroup<T> extends NavItem {
  children: T[]
}

export interface NavLink extends NavItem {
  link: string
  rel?: string
  target?: string
}

export interface ResolvedSidebarItem extends Partial<NavLink> {
  isGroup?: boolean
  children?: ResolvedSidebarItem[]
}

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> = Symbol(
  'sidebarItems'
)

export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol)
  if (!sidebarItems) {
    throw new Error('useSidebarItems() is called without provider.')
  }
  return sidebarItems
}

export const resolveSidebarItems = (
  frontmatter: DefaultThemeNormalPageFrontmatter,
  themeLocale: DefaultThemeData
): ResolvedSidebarItem[] => {
  // get sidebar config from frontmatter > themeConfig
  const sidebarConfig = frontmatter.sidebar ?? themeLocale.sidebar ?? 'auto'
  const sidebarDepth = frontmatter.sidebarDepth ?? themeLocale.sidebarDepth ?? 2

  // resolve sidebar items according to the config
  if (frontmatter.home || sidebarConfig === false) {
    return []
  }

  if (isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, sidebarDepth)
  }

  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, sidebarDepth)
  }

  return []
}

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarConfigArray,
  sidebarDepth: number
): ResolvedSidebarItem[] => {
  // const route = useRoute()
  // const page = usePageData()

  const handleChildItem = (
    item: ResolvedSidebarItem | SidebarGroup | SidebarItem | string
  ): ResolvedSidebarItem => {
    let childItem: ResolvedSidebarItem
    if (isString(item)) {
      childItem = useNavLink(item)
    } else {
      childItem = item as ResolvedSidebarItem
    }

    if (childItem.isGroup && childItem.children) {
      return {
        ...childItem,
        children: childItem.children.map(handleChildItem),
      }
    }

    // if the sidebar item is current page and children is not set
    // use headers of current page as children
    // if (childItem.link === route.path && childItem.children === undefined) {
    //   return {
    //     ...childItem,
    //     children: headersToSidebarItemChildren(
    //       page.value.headers,
    //       sidebarDepth
    //     ),
    //   }
    // }

    return childItem
  }

  return sidebarConfig.map(
    (item): ResolvedSidebarItem => {
      if (isString(item)) {
        return useNavLink(item)
      }
      if (!item.isGroup) {
        return item as ResolvedSidebarItem
      }

      return {
        ...item,
        children: item.children.map(handleChildItem),
      }
    }
  )
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarConfigObject,
  sidebarDepth: number
): ResolvedSidebarItem[] => {
  const route = useRoute()
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path)
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? []

  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth)
}
