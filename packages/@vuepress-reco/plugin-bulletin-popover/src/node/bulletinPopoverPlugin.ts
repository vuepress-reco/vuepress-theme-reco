import { path, getDirname } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'

const __dirname = getDirname(import.meta.url);

export const bulletinPopoverPlugin = (): Plugin => {
  return {
    name: '@vuepress-reco/vuepress-plugin-bulletin-popover',

    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),
  }
}
