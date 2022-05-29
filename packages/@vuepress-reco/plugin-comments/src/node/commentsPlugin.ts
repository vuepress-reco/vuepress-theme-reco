import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'

export const commentsPlugin = (): Plugin => {
  return {
    name: '@vuepress-reco/vuepress-plugin-comments',

    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),
  }
}
