import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../types'
import Link from './Link.vue'

const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (route.hash === item.link) {
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
  return h('p', props, item.text)
}

const renderChildren = (
  item: ResolvedSidebarItem,
  depth: number
): VNode | null => {
  if (!item.children?.length) {
    return null
  }

  return h(
    'ul',
    {
      class: {
        'sidebar-sub-headers': depth > 0,
      },
    },
    item.children.map((child) =>
      h(
        'li',
        h(HeaderChild, {
          item: child,
          depth: depth + 1,
        })
      )
    )
  )
}

export const HeaderChild: FunctionalComponent<{
  item: ResolvedSidebarItem
  depth?: number
}> = ({ item, depth = 0 }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  if (item.children) {
    return [
      h(
        'section',
        {
          class: 'sidebar-item',
        },
        [
          renderItem(item, {
            class: {
              'sidebar-link': true,
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
        'sidebar-link': true,
        active,
      },
    }),
  ]
}

HeaderChild.displayName = 'HeaderChild'

HeaderChild.props = {
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
