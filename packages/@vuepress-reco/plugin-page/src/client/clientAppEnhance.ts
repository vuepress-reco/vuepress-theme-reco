import { defineClientAppEnhance } from '@vuepress/client'
import { classificationPostsSymbol, postsSymbol } from './constants'

declare const CLASSIFICATION_PAGINATION_POSTS: Record<string, any[]>
declare const POSTS: Record<string, any[]>

const classificationPaginationPosts = CLASSIFICATION_PAGINATION_POSTS
const posts = POSTS

export default defineClientAppEnhance(async ({ app }) => {
  app.provide(classificationPostsSymbol, classificationPaginationPosts)
  app.provide(postsSymbol, posts)
})
