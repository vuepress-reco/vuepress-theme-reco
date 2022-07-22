import type { Plugin, App } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const codeCopyPlugin = (): (app: App) => Plugin => {
  return (app: App): Plugin => {
    return {
      name: '@vuepress-reco/vuepress-plugin-code-copy',

      clientConfigFile: path.resolve(
        __dirname,
        '../client/config.js'
      ),
    }
  }
}
