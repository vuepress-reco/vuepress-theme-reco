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
  return h(
    'li',
    {
      ...props,
    },
    h(Link, {
      class: 'page-header-item',
      item,
    })
  )
}

const renderChildren = (item: ResolvedSidebarItem): Array<VNode | null> => {
  if (!item.children?.length) {
    return [null]
  }

  return item.children.map((child) =>
    h(HeaderChild, {
      item: child,
    })
  )
}

export const HeaderChild: FunctionalComponent<{
  item: ResolvedSidebarItem
}> = ({ item }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  if (item.children && item.children.length > 0) {
    return [
      renderItem(item, {
        class: {
          [`page-header-menu-depth_${item.level || 2}`]: true,
          active,
        },
      }),
      ...renderChildren(item),
    ]
  }

  return [
    renderItem(item, {
      class: {
        [`page-header-menu-depth_${item.level || 2}`]: true,
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
}
