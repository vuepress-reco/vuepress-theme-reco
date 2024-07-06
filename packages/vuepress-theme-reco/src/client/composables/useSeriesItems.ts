import { computed, type ComputedRef } from 'vue'
import { isPlainObject, isString, resolveLocalePath } from 'vuepress/shared'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'
import { useRoute, usePageFrontmatter, type RouteLocationNormalizedLoaded } from 'vuepress/client'


import { useThemeLocaleData } from '@composables/index.js'

import type {
  RecoThemeData,
  RecoThemeNormalPageFrontmatter,
  SeriesConfigArray,
  SeriesConfigObject,
  SeriesGroup,
  MenuLink,
  ResolvedSeriesItem
} from '../../types'

import { getNavLink } from './getNavLink.js'

export type SeriesItemsRef = ComputedRef<ResolvedSeriesItem[]>

export const useSeriesItems = (): SeriesItemsRef => {
  const route = useRoute()
  const { series } = useExtendPageData()
  const themeLocal = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<RecoThemeNormalPageFrontmatter>()
  const seriesItems = computed(() =>
    resolveSeriesItems(frontmatter.value, themeLocal.value, route, series)
  )

  if (!seriesItems) {
    throw new Error('useSeriesItems() is called without provider.')
  }
  return seriesItems
}

const resolveSeriesItems = (
  frontmatter: RecoThemeNormalPageFrontmatter,
  themeLocal: RecoThemeData,
  route: RouteLocationNormalizedLoaded,
  autoSeries
): ResolvedSeriesItem[] => {
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
const resolveArraySeriesItems = (seriesPath: string, seriesConfig: SeriesConfigArray): ResolvedSeriesItem[] => {
  const handleChildItem = (
    item: ResolvedSeriesItem | SeriesGroup | MenuLink | string,
  ): ResolvedSeriesItem => {
    let childItem: ResolvedSeriesItem
    if (isString(item)) {
      const link = item.includes(seriesPath) ? item : `${seriesPath}${item}`
      childItem = getNavLink(link)
    } else {
      childItem = item as ResolvedSeriesItem
    }

    return childItem
  }

  return seriesConfig.map(
    (item): ResolvedSeriesItem => {
      if (isString(item)) {
        const link = item.includes(seriesPath) ? item : `${seriesPath}${item}`
        return getNavLink(link)
      }

      return {
        ...item,
        // @ts-ignore
        children: item.children.map(subItem => handleChildItem(subItem)),
      }
    }
  )
}

/**
 * Resolve series items if the config is a key -> value (path-prefix -> array) object
 */
const resolveMultiSeriesItems = (
  seriesConfig: SeriesConfigObject,
  route: RouteLocationNormalizedLoaded
): ResolvedSeriesItem[] => {
  const seriesPath = resolveLocalePath(
    seriesConfig,
    decodeURIComponent(route.path)
  )
  const matchedSeriesConfig = seriesConfig[seriesPath] ?? []

  return resolveArraySeriesItems(seriesPath, matchedSeriesConfig)
}
