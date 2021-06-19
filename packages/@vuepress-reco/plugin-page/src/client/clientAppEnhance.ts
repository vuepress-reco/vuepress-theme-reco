import { defineClientAppEnhance } from '@vuepress/client'
import {
  classificationPostsSymbol,
  classificationSummarySymbol,
  postsSymbol,
} from './constants'

declare const CLASSIFICATION_PAGINATION_POSTS: Record<string, any[]>
declare const POSTS: Record<string, any[]>
declare const CLASSIFICATION_SUMMARY: Record<string, any>

const classificationPaginationPosts = CLASSIFICATION_PAGINATION_POSTS
const posts = POSTS
const classificationSummary = CLASSIFICATION_SUMMARY

export default defineClientAppEnhance(async ({ app }) => {
  app.provide(classificationPostsSymbol, classificationPaginationPosts)
  app.provide(classificationSummarySymbol, classificationSummary)
  app.provide(postsSymbol, posts)
})
