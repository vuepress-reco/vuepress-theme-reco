import { computed, provide } from 'vue'
import {
  categoryPaginationPostsSymbol,
  categorySummarySymbol,
  postsSymbol,
} from './composable'

declare const __POSTS__: Record<string, any[]>
declare const __CATEGORY_SUMMARY__: Record<string, any>
declare const __CATEGORY_PAGINATION_POSTS__: Record<string, any[]>

export async function applyClientSetup() {
  const posts = __POSTS__
  const categorySummary = __CATEGORY_SUMMARY__
  const categoryPosts = __CATEGORY_PAGINATION_POSTS__

  provide(postsSymbol, posts)
  provide(categorySummarySymbol, categorySummary)
  provide(categoryPaginationPostsSymbol, categoryPosts)
}
