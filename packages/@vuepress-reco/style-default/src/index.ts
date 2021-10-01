import { defineStyle, StyleOptions } from '@vuepress-reco/core'
import { path } from '@vuepress/utils'
import { pages, tailwindConfig } from './node'

export default defineStyle(
  (themeConfig): StyleOptions => ({
    pages,

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      './client/clientAppEnhance.js'
    ),

    clientAppSetupFiles: path.resolve(__dirname, './client/clientAppSetup.js'),

    onInitialized(app): void {
      app.options.bundlerConfig = {
        postcss: {
          postcssOptions: {
            plugins: {
              tailwindcss: tailwindConfig,
              autoprefixer: {},
            },
          },
        },
        ...app.options.bundlerConfig,
      }
    },

    plugins: [
      ['@vuepress/theme-data', { themeData: themeConfig }],
      ['@vuepress/prismjs', themeConfig.prismjs !== false],
      ['@vuepress/back-to-top', themeConfig.backToTop !== false],
    ],
  })
)
