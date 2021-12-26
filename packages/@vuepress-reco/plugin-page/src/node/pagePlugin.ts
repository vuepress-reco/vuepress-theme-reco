import type { Plugin, App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { PagePluginOptions } from '../types'
import Classifiable from './Classifiable'

export const pagePlugin: Plugin<Record<string, any>> = (
  options: PagePluginOptions,
  app: App
) => {
  const classifiable = new Classifiable(options, app)
  return {
    name: '@vuepress-reco/vuepress-plugin-page',

    // define 需要在 onInitialized 生命周期执行后执行，需要使用函数表达式，而不是对象
    define: (app) => {
      return {
        CLASSIFICATION_PAGINATION_POSTS:
          classifiable.classificationPaginationPosts,
        CLASSIFICATION_SUMMARY: classifiable.classificationSummary,
        POSTS: classifiable.posts,
      }
    },

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    async onInitialized(app) {
      classifiable.resolveKeyValue()
      const resolvePages = await Promise.all(classifiable.extendedPages)
      app.pages = [...app.pages, ...resolvePages]
    },
  }
}
