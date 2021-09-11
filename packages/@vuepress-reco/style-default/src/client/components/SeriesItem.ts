import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../types'
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
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }

  return false
}

const renderItem = (
  item: ResolvedSidebarItem,
  props: VNode['props']
): VNode => {
  // if the item has link, render it as `<Link>`
  if (item.link) {
    return h(Link, {
      ...props,
      item,
    })
  }

  // if the item only has text, render it as `<p>`
  return h('h5', props, item.text)
}

const renderChildren = (item: ResolvedSidebarItem): VNode | null => {
  if (!item.children?.length) {
    return null
  }

  return h(
    'ul',
    item.children.map((child) =>
      h(
        'li',
        h(SeriesItem, {
          item: child,
        })
      )
    )
  )
}

export const SeriesItem: FunctionalComponent<{
  item: ResolvedSidebarItem
}> = ({ item }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  if (item.children) {
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
          renderChildren(item),
        ]
      ),
    ]
  }

  return [
    renderItem(item, {
      class: {
        'series-item': true,
        active,
      },
    }),
  ]
}

SeriesItem.displayName = 'SeriesItem'

SeriesItem.props = {
  item: {
    type: Object,
    required: true,
  },
}
