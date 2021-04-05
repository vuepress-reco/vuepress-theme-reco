import { defineClientAppEnhance } from '@vuepress/client'

declare const PAGE_DATA_OF_EXTEND_PAGES: Record<string, any>

const pageDataOfExtendedPages = PAGE_DATA_OF_EXTEND_PAGES

export default defineClientAppEnhance(async ({ app }) => {
  app.provide('classificationPosts', pageDataOfExtendedPages)
})
