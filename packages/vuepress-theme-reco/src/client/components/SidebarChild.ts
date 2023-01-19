import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSeriesItem } from '../../types'
import Link from './Link.vue'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActiveLink = (
  route: RouteLocationNormalizedLoaded,
  link?: string
): boolean => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSeriesItem
): boolean => {
  if (isActiveLink(route, item.link)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }

  return false
}

const renderItem = (item: ResolvedSeriesItem, props: VNode['props']): VNode => {
  // if the item has link, render it as `<Link>`
  if (item.link) {
    return h(Link, {
      ...props,
      item,
    })
  }

  // if the item only has text, render it as `<p>`
  return h('p', props, item.text)
}

const renderChildren = (
  item: ResolvedSeriesItem,
  depth: number
): VNode | null => {
  if (!item.children?.length) {
    return null
  }

  return h(
    'ul',
    {
      class: {
        'series-sub-headers': depth > 0,
      },
    },
    item.children.map((child) =>
      h(
        'li',
        h(SeriesChild, {
          item: child,
          depth: depth + 1,
        })
      )
    )
  )
}

export const SeriesChild: FunctionalComponent<{
  item: ResolvedSeriesItem
  depth?: number
}> = ({ item, depth = 0 }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  if (item.isGroup) {
    return [
      h(
        'section',
        {
          class: 'series-group series-item',
        },
        [
          renderItem(item, {
            class: {
              'series-heading': true,
              active,
            },
          }),
          renderChildren(item, depth),
        ]
      ),
    ]
  }

  if (item.children) {
    return [
      h(
        'section',
        {
          class: 'series-item',
        },
        [
          renderItem(item, {
            class: {
              'series-heading': true,
              active,
            },
          }),
          renderChildren(item, depth),
        ]
      ),
    ]
  }

  return [
    renderItem(item, {
      class: {
        'series-item': true,
        'series-link': true,
        active,
      },
    }),
  ]
}

SeriesChild.displayName = 'SeriesChild'

SeriesChild.props = {
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
}
