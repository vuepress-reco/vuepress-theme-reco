import type { Plugin, App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { PagePluginOption } from '../types'
import Classifiable from './node/Classifiable'

export type PagePluginOptions = Record<string, any>

const pagePlugin: Plugin<PagePluginOptions> = (
  options: PagePluginOption[],
  app: App
) => {
  const classifiable = new Classifiable(options, app)
  return {
    name: '@vuepress-reco/vuepress-plugin-page',

    // define 需要在 onInitialized 生命周期执行后执行，需要使用函数表达式，而不是对象
    define: () => ({
      PAGE_DATA_OF_EXTEND_PAGES: classifiable.pageDataOfExtendedPages,
    }),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      './client/clientAppEnhance.js'
    ),

    async onInitialized() {
      classifiable.resolveKeyValue()
      const resolvePages = await Promise.all(classifiable.extendPages)
      app.pages = [...resolvePages, ...app.pages]
    },
  }
}

export default pagePlugin
