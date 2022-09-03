import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'

declare const __VUEPRESS_DEV__: boolean

export const categoryPaginationPostsSymbol = Symbol('categoryPaginationPostsSymbol')
export const categorySummarySymbol = Symbol('categorySummarySymbol')
export const postsSymbol = Symbol('postsSymbol')

export function usePageData(): Record<string, any> {
  const categorySummary = inject(categorySummarySymbol) || {}
  const posts = inject(postsSymbol) || []
  const categoryPaginationPosts = inject(categoryPaginationPostsSymbol) || {}

  if (!postsSymbol) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }

  const { currentRoute } = useRouter()


  const categoryPosts = computed(() => {
    return (
      (categoryPaginationPosts as Record<string, any>)[
        currentRoute.value.path
      ] || {}
    )
  })

  return { categoryPosts, categorySummary, posts }
}
