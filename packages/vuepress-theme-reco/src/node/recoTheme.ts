import { path, fs, getDirname } from 'vuepress/utils'

import { resolveBuildInPlugins } from './resolvePlugins.js'
import { extendsBundlerOptions } from './extendsBundlerOptions.js'
import { injectiBuilderOptionsOfRecoTheme } from './resolveBundlerConfig.js'

import type { Theme, Page } from 'vuepress/core'
import type { RecoThemePageData } from '../types/page'

const __dirname = getDirname(import.meta.url)

export const recoTheme = (themeConfig: Record<string, unknown> = {}): Theme => {
  const plugins = resolveBuildInPlugins(themeConfig)

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

    extendsBundlerOptions,

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    alias: {
      '@types': path.resolve(__dirname, '../types'),
      '@client': path.resolve(__dirname, '../client'),
      '@utils': path.resolve(__dirname, '../client/utils'),
      '@components': path.resolve(__dirname, '../client/components'),
      '@composables': path.resolve(__dirname, '../client/composables'),
    },

    extendsPage: (page: Page<Partial<RecoThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and series
      page.routeMeta.title = page.title
    },

    plugins,
  }
}
