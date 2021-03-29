import type { Plugin } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type BlogPluginOptions = Record<string, any>

const blogPlugin: Plugin<BlogPluginOptions> = (options, config) => {
  return {
    name: '@vuepress-reco/vuepress-plugin-blog',

    clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

    async onInitialized() {
      config.pages.unshift(
        await createPage(config, {
          path: '/category.html',
          frontmatter: {
            layout: 'Category',
          },
        })
      )
    },
  }
}

export default blogPlugin
