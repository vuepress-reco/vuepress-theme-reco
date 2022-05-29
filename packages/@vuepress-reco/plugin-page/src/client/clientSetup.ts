import { computed, provide } from 'vue'
import {
  classificationPostsSymbol,
  classificationSummarySymbol,
  postsSymbol,
} from './composable'

declare const CLASSIFICATION_PAGINATION_POSTS: Record<string, any[]>
declare const POSTS: Record<string, any[]>
declare const CLASSIFICATION_SUMMARY: Record<string, any>

const a = CLASSIFICATION_PAGINATION_POSTS
const b = POSTS
const c = CLASSIFICATION_SUMMARY

export async function applyClientSetup () {
  const classificationPosts = computed(() => a)

  const posts = computed(() => b)

  const classificationSummary = computed(() => c)

  provide(classificationPostsSymbol, classificationPosts)
  provide(classificationSummarySymbol, classificationSummary)
  provide(postsSymbol, posts)
}
