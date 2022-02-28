import type { Plugin, App } from '@vuepress/core'
import { path } from '@vuepress/utils'
export const kanBanNiangPlugin: Plugin<Record<string, any>> = (
  options,
  app: App
) => {
  return {
    name: '@vuepress-reco/vuepress-plugin-kan-ban-niang',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/KanBanNiangPlugin.vue'
    ),
  }
}
