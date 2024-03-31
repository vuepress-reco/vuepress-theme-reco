import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vuepress/client'
import { isPlainObject, isString, resolveLocalePath } from 'vuepress/shared'

import type {
  RecoThemeData,
  RecoThemeNormalPageFrontmatter,
  SeriesConfigArray,
  SeriesConfigObject,
  SeriesGroup,
  SeriesItem,
} from '../../types'

import { useNavLink } from './useNavLink.js'

import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable/index.js'

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

export interface ResolvedSeriesItem extends Partial<NavLink> {
  text?: string
  children?: ResolvedSeriesItem[]
  collapsible?: boolean
}

export type SeriesItemsRef = ComputedRef<ResolvedSeriesItem[]>

export const seriesItemsSymbol: InjectionKey<SeriesItemsRef> = Symbol(
  'seriesItems'
)

export const useSeriesItems = (): SeriesItemsRef => {
  const seriesItems = inject(seriesItemsSymbol)
  if (!seriesItems) {
    throw new Error('useSeriesItems() is called without provider.')
  }
  return seriesItems
}

export const resolveSeriesItems = (
  frontmatter: RecoThemeNormalPageFrontmatter,
  themeLocal: RecoThemeData,
  route: RouteLocationNormalizedLoaded
): ResolvedSeriesItem[] => {
  const { series: autoSeries } = usePageData()
  // get series config from frontmatter > themeConfig
  let seriesConfig = themeLocal.series ?? {}

  seriesConfig = {
    ...autoSeries,
    ...seriesConfig,
  }

  // 解决

  // resolve series items according to the config
  if (frontmatter.home) {
    return []
  }

  if (isPlainObject(seriesConfig)) {
    return resolveMultiSeriesItems(seriesConfig, route)
  }

  return []
}

/**
 * Resolve series items if the config is an array
 */
export const resolveArraySeriesItems = (
  seriesConfig: SeriesConfigArray,
  router
): ResolvedSeriesItem[] => {
  const handleChildItem = (
    item: ResolvedSeriesItem | SeriesGroup | SeriesItem | string
  ): ResolvedSeriesItem => {
    let childItem: ResolvedSeriesItem
    if (isString(item)) {
      childItem = useNavLink(item, router)
    } else {
      childItem = item as ResolvedSeriesItem
    }

    return childItem
  }

  return seriesConfig.map(
    (item): ResolvedSeriesItem => {
      if (isString(item)) {
        return useNavLink(item, router)
      }

      return {
        ...item,
        // @ts-ignore
        children: item.children.map(handleChildItem),
      }
    }
  )
}

/**
 * Resolve series items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSeriesItems = (
  seriesConfig: SeriesConfigObject,
  route: RouteLocationNormalizedLoaded
): ResolvedSeriesItem[] => {
  const seriesPath = resolveLocalePath(
    seriesConfig,
    decodeURIComponent(route.path)
  )
  const matchedSeriesConfig = seriesConfig[seriesPath] ?? []

  return resolveArraySeriesItems(matchedSeriesConfig, route)
}
