import { defineClientAppEnhance } from '@vuepress/client'

declare const CLASSIFICATION_PAGINATION_POSTS: Record<string, any[]>

const classificationPaginationPosts = CLASSIFICATION_PAGINATION_POSTS

export default defineClientAppEnhance(async ({ app }) => {
  app.provide('classificationPaginationPosts', classificationPaginationPosts)
})
