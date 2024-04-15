import { useRouter } from 'vue-router'
import { resolveRoute } from 'vuepress/client'
import type { NavLink } from '../../types'
import { useResolveRouteWithRedirect } from './useResolveRouteWithRedirect.js'

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (config: string): NavLink => {
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
