import { path } from '@vuepress/utils'

import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { pagePlugin } from '@vuepress-reco/vuepress-plugin-page'
import { commentsPlugin } from '@vuepress-reco/vuepress-plugin-comments'
import { bulletinPopoverPlugin } from '@vuepress-reco/vuepress-plugin-bulletin-popover'

import { pages } from './pages'

type StyleDefault = () => any

// @ts-ignore
export const styleDefault: StyleDefault = () => {
  return {
    pages,
  
    layout: path.resolve(
      __dirname,
      '../client/layouts'
    ),
  
    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),
  
    extendsPage: (page) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },
  
    plugins: [
      backToTopPlugin(),
      bulletinPopoverPlugin(),
      commentsPlugin(),
      pagePlugin(pages || []),
    ],
  }
}
