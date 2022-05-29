import { path } from '@vuepress/utils'
import type { Theme} from '@vuepress/core'
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

import { tailwindConfig } from './tailwind'
import { resolveContainerOptions } from './resolveContainer'

export const recoTheme = (themeConfig: Record<string, unknown>): Theme => {
  const { style = '@vuepress-reco/style-default' } = themeConfig
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const styleConfig = require(path.resolve(
    `${stylePath}/lib/node/index.js`
  )).default

  styleConfig.plugins = [
    gitPlugin(),
    themeDataPlugin({ themeData: themeConfig }),
    searchPlugin(),
    palettePlugin(),
    nprogressPlugin(), // todo 在 vuepress-vite 下出现异常
    prismjsPlugin(),
    activeHeaderLinksPlugin({
      headerLinkSelector: 'a.page-header-item',
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
    ...styleConfig.plugins,
  ]

  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(
      process.cwd(),
      `node_modules/${style}/lib/client/layouts`
    ),
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
                  require('tailwindcss')(tailwindConfig),
                  require('autoprefixer')({}),
                  require('postcss-nested'),
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
                ['tailwindcss', tailwindConfig],
                ['autoprefixer', {}],
                ['postcss-nested'],
                ['postcss-each']
              ]
            },
          },
        })
      }

      styleConfig.onInitialized && styleConfig.onInitialized(app)
    },
    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),
    templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),
    ...styleConfig,
  }
}

