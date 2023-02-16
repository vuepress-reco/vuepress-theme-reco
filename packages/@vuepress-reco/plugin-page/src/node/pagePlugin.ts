import type { Plugin, App } from '@vuepress/core'
import { path, getDirname } from '@vuepress/utils'
import type { PagePluginOptions } from '../types'
import PageCreater from './PageCreater.js'

const __dirname = getDirname(import.meta.url)

export const pagePlugin = (
  options: PagePluginOptions,
  themeConfig: Record<string, unknown>
): ((app: App) => Plugin) => {
  return (app: App): Plugin => {
    const pageCreater = new PageCreater(options, app, themeConfig)
    return {
      name: '@vuepress-reco/vuepress-plugin-page',

      // define 需要在 onInitialized 生命周期执行后执行，需要使用函数表达式，而不是对象
      define: (app) => {
        return {
          __SERIES__: pageCreater.series,
          __POSTS__: pageCreater.posts,
          __CATEGORY_SUMMARY__: pageCreater.categorySummary,
          __CATEGORY_PAGINATION_POSTS__: pageCreater.categoryPaginationPosts,
        }
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      async onInitialized(app) {
        pageCreater.parse()

        const resolvePages = await Promise.all(pageCreater.extendedPages)
        app.pages = [...resolvePages, ...app.pages]
      },
    }
  }
}
