import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'

export const bulletinPopoverPlugin = (): Plugin => {
  return {
    name: '@vuepress-reco/vuepress-plugin-bulletin-popover',

    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),
  }
}
