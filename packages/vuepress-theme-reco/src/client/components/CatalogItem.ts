import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSeriesItem } from '../../types'
import Link from './Link.vue'

const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSeriesItem
): boolean => {
  if (route.hash === item.link) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }

  return false
}

const renderItem = (item: ResolvedSeriesItem, props: VNode['props']): VNode => {
  return h(
    'li',
    {
      ...props,
    },
    h(Link, {
      class: 'page-catalog-item',
      item,
    })
  )
}

const renderChildren = (item: ResolvedSeriesItem): Array<VNode | null> => {
  if (!item.children?.length) {
    return [null]
  }

  return item.children.map((child) =>
    h(CatalogItem, {
      item: child,
    })
  )
}

export const CatalogItem: FunctionalComponent<{
  item: ResolvedSeriesItem
}> = ({ item }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  if (item.children && item.children.length > 0) {
    return [
      renderItem(item, {
        class: {
          [`page-catalog-menu-depth_${item.level || 2}`]: true,
          active,
        },
      }),
      ...renderChildren(item),
    ]
  }

  return [
    renderItem(item, {
      class: {
        [`page-catalog-menu-depth_${item.level || 2}`]: true,
        active,
      },
    }),
  ]
}

CatalogItem.displayName = 'CatalogItem'

CatalogItem.props = {
  item: {
    type: Object,
    required: true,
  },
}
