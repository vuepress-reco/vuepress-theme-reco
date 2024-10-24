import { resolveRoute } from 'vuepress/client'

import type { MenuLink } from '../../types'

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const getNavLink = (config: string): MenuLink => {
  const { notFound, meta, path } = resolveRoute<{
    title?: string
  }>(config)

  return notFound
    ? { text: path, link: path }
    : {
        text: meta.title || path,
        link: path,
      }
}
