import { inject, computed } from 'vue'
import { useRoute } from 'vuepress/client'

export const categoryPaginationPostsSymbol = Symbol(
  'categoryPaginationPostsSymbol'
)
export const categorySummarySymbol = Symbol('categorySummarySymbol')
export const postsSymbol = Symbol('postsSymbol')
export const seriesSymbol = Symbol('seriesSymbol')

export function useExtendPageData(): {
  [key: string]: Record<string, any>
} {
  const posts = inject(postsSymbol, null) || []
  const series = inject(seriesSymbol, null) || {}
  const categorySummary = inject(categorySummarySymbol, null) || {}
  const categoryPaginationPosts = inject(categoryPaginationPostsSymbol, null) || {}

  if (!postsSymbol) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }

  const route = useRoute()

  const categoryPosts = computed(() => {
    return (
      (categoryPaginationPosts as Record<string, any>)[
        route?.path
      ] || {}
    )
  })

  return { categoryPosts, categorySummary, posts, series }
}
