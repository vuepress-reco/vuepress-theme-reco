import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { isFunction, isString } from 'vuepress/shared'

/**
 * Resolve a route with redirection
 */
export const useResolveRouteWithRedirect = (
  router,
  ...args: Parameters<Router['resolve']>
): ReturnType<Router['resolve']> => {
  const router1 = useRouter()
  const route = router1.resolve(...args)

  const lastMatched = route.matched[route.matched.length - 1]

  if (!lastMatched?.redirect) {
    return route
  }
  const { redirect } = lastMatched
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect
  const resolvedRedirectObj = isString(resolvedRedirect)
    ? { path: resolvedRedirect }
    : resolvedRedirect
  return useResolveRouteWithRedirect(router, {
    hash: route.hash,
    query: route.query,
    // @ts-ignore
    params: route.params,
    ...resolvedRedirectObj,
  })
}
