import { computed, provide } from 'vue'
import {
  categoryPaginationPostsSymbol,
  categorySummarySymbol,
  postsSymbol,
} from './composable'

declare const CATEGORY_PAGINATION_POSTS: Record<string, any[]>
declare const POSTS: Record<string, any[]>
declare const CLASSIFICATION_SUMMARY: Record<string, any>

export async function applyClientSetup () {
  const posts = computed(() => POSTS)
  const categorySummary = computed(() => CLASSIFICATION_SUMMARY)
  const categoryPosts = computed(() => CATEGORY_PAGINATION_POSTS)

  provide(postsSymbol, posts)
  provide(categoryPaginationPostsSymbol, categoryPosts)
  provide(categorySummarySymbol, categorySummary)
}
