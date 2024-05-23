import { path } from 'vuepress/utils'

// The official plugins for vuepress
import {
  docsearchPlugin,
  DocsearchPluginOptions,
} from '@vuepress/plugin-docsearch'
import { gitPlugin } from '@vuepress/plugin-git'
import { searchPlugin } from '@vuepress/plugin-search'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { palettePlugin } from '@vuepress/plugin-palette'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { containerPlugin } from '@vuepress/plugin-container'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

// The official plugins for vuepress-reco
import { pagePlugin } from '@vuepress-reco/vuepress-plugin-page'
import { commentsPlugin } from '@vuepress-reco/vuepress-plugin-comments'
import { codeCopyPlugin } from '@vuepress-reco/vuepress-plugin-code-copy'
import { vuePreviewPlugin } from '@vuepress-reco/vuepress-plugin-vue-preview'
import { markdownTaskPlugin } from '@vuepress-reco/vuepress-plugin-markdown-task'
import { bulletinPopoverPlugin } from '@vuepress-reco/vuepress-plugin-bulletin-popover'

import { pages } from './pages.js'
import { resolveContainerOptions } from './resolveContainer.js'

import type { Plugin } from 'vuepress/core'

export const resolveBuildInPlugins = (themeConfig): Array<Plugin> => {
  const plugins = [
    gitPlugin(),
    palettePlugin(),
    prismjsPlugin(),
    codeCopyPlugin(),
    commentsPlugin(themeConfig),
    nprogressPlugin(),
    backToTopPlugin(),
    vuePreviewPlugin(),
    markdownTaskPlugin(),
    bulletinPopoverPlugin(themeConfig),
    externalLinkIconPlugin(),
    registerComponentsPlugin({
      componentsDir: path.join(
        process.cwd(),
        themeConfig?.docsDir || '/',
        './.vuepress/components'
      ),
    }),
    themeDataPlugin({ themeData: themeConfig }),
    pagePlugin(pages || [], themeConfig),
    searchPlugin({ hotKeys: [{ key: 's', ctrl: true }] }),
    mediumZoomPlugin({ zoomOptions: { background: 'inherit' } }),
    activeHeaderLinksPlugin({ headerLinkSelector: 'a.page-catalog-item' }),
    containerPlugin(resolveContainerOptions('tip')),
    containerPlugin(resolveContainerOptions('info')),
    containerPlugin(resolveContainerOptions('warning')),
    containerPlugin(resolveContainerOptions('danger')),
    containerPlugin(resolveContainerOptions('details')),
    containerPlugin(resolveContainerOptions('code-group')),
    containerPlugin(resolveContainerOptions('code-group-item')),
  ]

  if (themeConfig?.algolia) {
    plugins.push(
      docsearchPlugin(
        (themeConfig.algolia as unknown) as DocsearchPluginOptions
      )
    )
  }

  return plugins
}
