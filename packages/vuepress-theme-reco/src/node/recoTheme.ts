import type { Theme, Page } from 'vuepress/core'
import { path, fs, getDirname } from 'vuepress/utils'

// The bundlers for vuepress
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

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

// About tailwindcss
import tailwindcss from 'tailwindcss'
import postcssEach from 'postcss-each'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'

import {
  getViteBundlerOptions,
  getWebpackBundlerOptions,
} from './resolveBundlerConfig.js'
import { pages } from './pages.js'
import type { RecoThemePageData } from '../types/page'
import { resolveContainerOptions } from './resolveContainer.js'

const __dirname = getDirname(import.meta.url)

export const recoTheme = (themeConfig: Record<string, unknown>): Theme => {
  const plugins = [
    gitPlugin(),
    palettePlugin(),
    prismjsPlugin(),
    codeCopyPlugin(),
    commentsPlugin(),
    nprogressPlugin(),
    backToTopPlugin(),
    vuePreviewPlugin(),
    markdownTaskPlugin(),
    bulletinPopoverPlugin(),
    externalLinkIconPlugin(),
    registerComponentsPlugin({
      componentsDir: path.join(
        process.cwd(),
        themeConfig.sourceDir || '/',
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

  if (themeConfig.algolia) {
    plugins.push(
      docsearchPlugin(
        (themeConfig.algolia as unknown) as DocsearchPluginOptions
      )
    )
  }

  return {
    name: 'vuepress-theme-reco',

    onInitialized(app) {
      _injectiBuilderOptionsOfRecoTheme(app, themeConfig)
    },

    onWatched(app) {
      _injectiBuilderOptionsOfRecoTheme(app, themeConfig)
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

function _injectiBuilderOptionsOfRecoTheme(app, themeConfig) {
  if (themeConfig.primaryColor) {
    tailwindcssConfig.theme.extend.colors.reco.primary = themeConfig.primaryColor as string
  }

  tailwindcssConfig.content.push(
    path.join(
      themeConfig.sourceDir || '/',
      './.vuepress/components/*.(vue|html|js)'
    )
  )

  if (app.options.bundler.name === '@vuepress/bundler-vite') {
    const viteBundlerOptions = getViteBundlerOptions(themeConfig)
    app.options.bundler = viteBundler(viteBundlerOptions)
  } else {
    const viteBundlerOptions = getWebpackBundlerOptions(themeConfig)
    app.options.bundler = webpackBundler(viteBundlerOptions)
  }
}
