import type { NavLink } from '../../types'
import { useResolveRouteWithRedirect } from './useResolveRouteWithRedirect.js'

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (item: string, router): NavLink => {
  console.log(1234, item)
  const resolved = useResolveRouteWithRedirect(router, item)

  return {
    text: (resolved.meta.title || item) as string,
    link: resolved.name === '404' ? item : resolved.fullPath,
  }
}
