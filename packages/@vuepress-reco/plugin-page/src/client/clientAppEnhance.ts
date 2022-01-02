import { computed } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
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

export default defineClientAppEnhance(async ({ app }) => {
  const classificationPosts = computed(() => a)

  const posts = computed(() => b)

  const classificationSummary = computed(() => c)

  app.provide(classificationPostsSymbol, classificationPosts)
  app.provide(classificationSummarySymbol, classificationSummary)
  app.provide(postsSymbol, posts)
})
