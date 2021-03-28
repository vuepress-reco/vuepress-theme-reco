import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type BlogPluginOptions = Record<string, any>

const blogPlugin: Plugin<BlogPluginOptions> = {
  name: '@vuepress-reco/vuepress-plugin-blog',

  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js')
}

export default blogPlugin
