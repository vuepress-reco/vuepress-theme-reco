import { path, fs, getDirname } from 'vuepress/utils'

import { getPlugins } from './resolvePlugins.js'
import { injectiBuilderOptionsOfRecoTheme } from './resolveBundlerConfig.js'

import type { Theme, Page } from 'vuepress/core'
import type { RecoThemePageData } from '../types/page'

const __dirname = getDirname(import.meta.url)

export const recoTheme = (themeConfig: Record<string, unknown>): Theme => {
  const plugins = getPlugins(themeConfig)

  return {
    name: 'vuepress-theme-reco',

    onInitialized(app) {
      injectiBuilderOptionsOfRecoTheme(app, themeConfig)
    },

    onWatched(app) {
      injectiBuilderOptionsOfRecoTheme(app, themeConfig)
    },

    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),
    templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    alias: Object.fromEntries(
      fs
        .readdirSync(path.resolve(__dirname, '../client/components'))
        .filter((file) => file.endsWith('.vue'))
        .map((file) => [
          `@theme/${file}`,
          path.resolve(__dirname, '../client/components', file),
        ])
    ),

    extendsPage: (page: Page<Partial<RecoThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and series
      page.routeMeta.title = page.title
    },

    plugins,
  }
}
