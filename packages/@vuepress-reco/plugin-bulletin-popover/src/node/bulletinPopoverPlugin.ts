import type { Plugin, App } from '@vuepress/core'
import { path } from '@vuepress/utils'

console.log(222, path.resolve(
  __dirname,
  '../client/components/Bulletin.vue'
))

export const bulletinPopoverPlugin: Plugin<Record<string, any>> = (
  options,
  app: App
) => {
  return {
    name: '@vuepress-reco/vuepress-plugin-bulletin-popover',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/Bulletin.vue'
    ),
  }
}
