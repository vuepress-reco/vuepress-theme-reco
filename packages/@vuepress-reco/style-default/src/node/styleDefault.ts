import { defineStyle, StyleOptions } from '@vuepress-reco/core'
import { path } from '@vuepress/utils'
import { pages } from './pages'
import { tailwindConfig } from './tailwind'

export default defineStyle(
  (themeConfig): StyleOptions => ({
    pages,

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

    onInitialized(app): void {
      const { bundler, bundlerConfig } = app.options || {}
      if (bundler === '@vuepress/bundler-vite') {
        app.options.bundlerConfig = {
          viteOptions: {
            ...(bundlerConfig?.viteOptions || {}),
            css: {
              postcss: {
                plugins: [
                  require('postcss-import'),
                  require('tailwindcss')(tailwindConfig),
                  require('autoprefixer')({}),
                  require('postcss-nested'),
                  require('postcss-each')
                ]
              }
            }
          },
        }
      } else {
        app.options.bundlerConfig = {
          postcss: {
            postcssOptions: {
              plugins: [
                ['tailwindcss', tailwindConfig],
                ['autoprefixer', {}],
                ['postcss-nested'],
                ['postcss-each']
              ]
            },
          },
          ...bundlerConfig,
        }
      }
    },

    plugins: [
      ['@vuepress/theme-data', { themeData: themeConfig }],
      ['@vuepress/back-to-top', themeConfig.backToTop !== false],
      ['@vuepress/nprogress', themeConfig.nprogress !== false],
      ['@vuepress-reco/vuepress-plugin-comments', themeConfig.comments !== false]
    ],
  })
)
