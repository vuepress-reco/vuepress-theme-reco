import { path, fs } from '@vuepress/utils'
import type { Theme, Page } from '@vuepress/core'
import { gitPlugin } from '@vuepress/plugin-git'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { searchPlugin } from '@vuepress/plugin-search'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { containerPlugin } from '@vuepress/plugin-container'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { vuePreviewPlugin } from '@vuepress-reco/vuepress-plugin-vue-preview'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { pagePlugin } from '@vuepress-reco/vuepress-plugin-page'
import { commentsPlugin } from '@vuepress-reco/vuepress-plugin-comments'
import { bulletinPopoverPlugin } from '@vuepress-reco/vuepress-plugin-bulletin-popover'

import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'
import { resolveContainerOptions } from './resolveContainer'

import type { RecoThemePageData } from '../types/page'

import { pages } from './pages'

export const recoTheme = (themeConfig: Record<string, unknown>): Theme => {
  return {
    name: 'vuepress-theme-reco',
    onInitialized(app) {
      // todo @vuepress/bundler-webpack 适配问题
      // app.options.bundler.name = '@vuepress/bundler-webpack'

      // todo 兼容用户的自定义 bundler
      // @ts-ignore
      if (app.options.bundler.name === '@vuepress/bundler-vite') {
        // @ts-ignore
        app.options.bundler = viteBundler({
          viteOptions: {
            css: {
              postcss: {
                plugins: [
                  require('postcss-import'),
                  require('tailwindcss/nesting'),
                  require('tailwindcss')(tailwindcssConfig),
                  require('autoprefixer')({}),
                  require('postcss-each')
                ]
              }
            },
            optimizeDeps: {
              exclude: ['vue']
            }
          },
        })
      } else {
        // @ts-ignore
        app.options.bundler = webpackBundler({
          postcss: {
            postcssOptions: {
              plugins: [
                ['tailwindcss', tailwindcssConfig],
                ['autoprefixer', {}],
                [require('tailwindcss/nesting')],
                ['postcss-each']
              ]
            },
          },
        })
      }
    },
    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),
    templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),

    layouts: path.resolve(__dirname, '../client/layouts'),

    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),

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
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },

    plugins: [
      bulletinPopoverPlugin(),
      commentsPlugin(),
      pagePlugin(pages || []),
      gitPlugin(),
      themeDataPlugin({ themeData: themeConfig }),
      searchPlugin({
        hotKeys: [{ key: 's', ctrl: true }]
      }),
      palettePlugin(),
      nprogressPlugin(), // todo 在 vuepress-vite 下出现异常
      prismjsPlugin(),
      activeHeaderLinksPlugin({
        headerLinkSelector: 'a.page-catalog-item',
      }),
      containerPlugin(resolveContainerOptions('tip')),
      containerPlugin(resolveContainerOptions('info')),
      containerPlugin(resolveContainerOptions('warning')),
      containerPlugin(resolveContainerOptions('danger')),
      containerPlugin(resolveContainerOptions('details')),
      containerPlugin(resolveContainerOptions('code-group')),
      containerPlugin(resolveContainerOptions('code-group-item')),
      externalLinkIconPlugin(),
      vuePreviewPlugin(),
      registerComponentsPlugin({
        componentsDir: path.resolve(process.cwd(), themeConfig.vuePreviewsDir || './.vuepress/vue-previews'),
      }),
      registerComponentsPlugin({
        componentsDir: path.resolve(process.cwd(), themeConfig.componentsDir || './.vuepress/components'),
      }),
      backToTopPlugin()
    ],
  }
}

