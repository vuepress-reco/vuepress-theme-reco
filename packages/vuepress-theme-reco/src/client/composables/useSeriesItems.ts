import { computed, type ComputedRef } from 'vue'
import { isPlainObject, isString, resolveLocalePath } from 'vuepress/shared'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'
import { useRoute, usePageFrontmatter, type RouteLocationNormalizedLoaded } from 'vuepress/client'


import { useSortSeries, useThemeLocaleData } from '@composables/index.js'

import type {
  RecoThemeData,
  SeriesConfigArray,
  ResolvedSeriesItem,
  SeriesConfigObject,
  RecoThemeNormalPageFrontmatter,
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
  const { sortSeries } = useSortSeries()

  // get series config from frontmatter > themeConfig
  let seriesConfig = themeLocal.series ?? {}

  Object.keys(autoSeries).forEach(key => {
    autoSeries[key] = sortSeries(autoSeries[key])
  })

  seriesConfig = {
    ...seriesConfig,
    ...autoSeries,
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
  return seriesConfig.map((item): ResolvedSeriesItem => {
    if (isString(item)) {
      const link = item.includes(seriesPath) ? item : `${seriesPath}${item}`
      return getNavLink(link)
    }

    const resolvedItem = { ...item }
    // @ts-ignore
    if (item.children) {
      // @ts-ignore
      resolvedItem.children = resolveArraySeriesItems(seriesPath, item.children)
    }

    // @ts-ignore
    return resolvedItem
  })
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
