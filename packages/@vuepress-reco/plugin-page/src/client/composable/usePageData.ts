import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'

declare const __VUEPRESS_DEV__: boolean

export const categoryPaginationPostsSymbol = Symbol(__VUEPRESS_DEV__ ? 'categoryPaginationPostsSymbol' : '')
export const categorySummarySymbol = Symbol(__VUEPRESS_DEV__ ? 'categorySummarySymbol' : '')
export const postsSymbol = Symbol(__VUEPRESS_DEV__ ? 'postsSymbol' : '')

export function usePageData(): Record<string, any> {
  const categorySummary = inject(categorySummarySymbol) || {}
  const posts = inject(postsSymbol) || {}
  const categoryPaginationPosts = inject(categoryPaginationPostsSymbol) || {}

  if (!postsSymbol) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }

  const { currentRoute } = useRouter()


  const categoryPosts = computed(() => {
    return (
      ((categoryPaginationPosts as { value: any }).value as Record<string, any>)[
        currentRoute.value.path
      ] || {}
    )
  })

  return { categoryPosts, categorySummary, posts }
}
