import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'

export const categoryPaginationPostsSymbol = Symbol(
  'categoryPaginationPostsSymbol'
)
export const categorySummarySymbol = Symbol('categorySummarySymbol')
export const postsSymbol = Symbol('postsSymbol')
export const seriesSymbol = Symbol('seriesSymbol')

export function usePageData(): Record<string, any> {
  const categorySummary = inject(categorySummarySymbol, null) || {}
  const posts = inject(postsSymbol, null) || []
  const series = inject(seriesSymbol, null) || {}
  const categoryPaginationPosts = inject(categoryPaginationPostsSymbol, null) || {}

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

  return { categoryPosts, categorySummary, posts, series }
}
