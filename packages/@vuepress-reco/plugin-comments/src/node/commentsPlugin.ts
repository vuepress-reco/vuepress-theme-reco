import { path, getDirname } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'

const __dirname = getDirname(import.meta.url);

export const commentsPlugin = (): Plugin => {
  return {
    name: '@vuepress-reco/vuepress-plugin-comments',

    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),
  }
}
