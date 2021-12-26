import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'

export const commentsPlugin: Plugin<Record<string, any>> = () => {
  return {
    name: '@vuepress-reco/vuepress-plugin-comments',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    )
  }
}
