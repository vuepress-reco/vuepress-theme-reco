import { h } from 'vue'
import { useRoute } from 'vuepress/client'

import Link from '../Link.vue'

import type { FunctionalComponent, VNode } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vuepress/client'
import type { MenuLinkGroup, ResolvedSeriesItem } from '../../../types'
import Xicons from '../global/Xicons.vue'

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
  item: MenuLinkGroup
): boolean => {
  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }


  if (isActiveLink(route, item.link)) {
    return true
  }

  return false
}

const togglecollapsible = (e, item, level) => {
  if (level !== 1) return

  item.collapsible = !!!item.collapsible

  const currentNode = e.target.closest('.series-heading')
  const arrowNode = currentNode.querySelector('.arrow')
  const nextNode = currentNode.nextElementSibling

  if (item.collapsible) {
    arrowNode.classList.remove('down')
    arrowNode.classList.add('right')
    nextNode.style.display = 'none'
  } else {
    arrowNode.classList.remove('right')
    arrowNode.classList.add('down')
    nextNode.style.display = 'block'
  }
}

const renderItem = (item: ResolvedSeriesItem, level: number, props: VNode['props']): VNode => {
  if (item.link) {
    return h(Link, {
      ...props,
      item,
    })
  }

  const titleTag = level === 1 ? 'h5' : 'h6'

  // if the item only has text, render it as `<p>`
  return h(titleTag, { ...props, onClick: (e) => togglecollapsible(e, item, level) }, [
    h(Xicons, {
      icon: level === 1 ? 'Folder' : '',
      text: item.text,
      textSize: level === 1 ? 16 : 14
    }),
    level !== 1 ? null : h('span', {
      class: !!item.collapsible ? 'arrow right' : 'arrow down',
    }),
  ])
}

const renderChildren = (item: ResolvedSeriesItem, level: number): VNode | null => {
  if (!item.children?.length) {
    return null
  }

  return h(
    'ul',
    {
      style: {
        display: !!item.collapsible ? 'none' : 'block',
      },
    },
    item.children.map((child) =>
      h(
        'li',
        h(SeriesItem, {
          item: child,
          level
        })
      )
    )
  )
}

export const SeriesItem: FunctionalComponent<{
  item: MenuLinkGroup
  level: number
}> = ({ item, level }) => {
  const route = useRoute()
  const active = level === 1 ? isActiveItem(route, item) : false

  if (item.children) {
    return [
      h(
        'section',
        {
          class: 'series-group series-item',
        },
        [
          renderItem(item, level, {
            class: {
              'series-heading': true,
              [`series-level-${level}`]: true,
              active,
            },
          }),
          renderChildren(item, ++level),
        ]
      ),
    ]
  }

  return [
    renderItem(item, ++level, {
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
  level: {
    type: Number,
    required: true,
  },
}
