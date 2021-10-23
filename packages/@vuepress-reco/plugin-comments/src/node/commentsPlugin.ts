import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

const commentsPlugin: Plugin<Record<string, any>> = () => {
  return {
    name: '@vuepress-reco/vuepress-plugin-comments',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}

export default commentsPlugin
