import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { useRoute } from 'vue-router'
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

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> =
  Symbol('sidebarItems')

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
  const sidebarConfig = frontmatter.series ?? themeLocale.series ?? 'auto'

  // resolve sidebar items according to the config
  if (frontmatter.home || sidebarConfig === false) {
    return []
  }

  if (isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig)
  }

  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig)
  }

  return []
}

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarConfigArray
): ResolvedSidebarItem[] => {
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

    return childItem
  }

  return sidebarConfig.map((item): ResolvedSidebarItem => {
    if (isString(item)) {
      return useNavLink(item)
    }

    return {
      ...item,
      children: item.children.map(handleChildItem),
    }
  })
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarConfigObject
): ResolvedSidebarItem[] => {
  const route = useRoute()
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path)
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? []

  return resolveArraySidebarItems(matchedSidebarConfig)
}
