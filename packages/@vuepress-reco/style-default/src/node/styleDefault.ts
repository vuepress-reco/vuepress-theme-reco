import { defineStyle, StyleOptions } from '@vuepress-reco/shared'
import { path } from '@vuepress/utils'
import { pages } from './pages'

export default defineStyle(
  (themeConfig): StyleOptions => ({
    pages,

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    clientAppSetupFiles: path.resolve(
      __dirname,
      '../client/clientAppSetup.js'
    ),

    extendsPage: (page) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },

    plugins: [
      ['@vuepress/back-to-top'],
      ['@vuepress-reco/vuepress-plugin-comments'],
      ['@vuepress-reco/vuepress-plugin-bulletin-popover'],
    ],
  })
)
