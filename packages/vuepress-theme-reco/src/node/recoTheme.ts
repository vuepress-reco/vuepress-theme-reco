import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { resolveContainerOptions } from './resolveContainer'
import { tailwindConfig } from './tailwind'

export const recoTheme: Theme<ThemeConfig> = (themeConfig: ThemeConfig) => {
  const { style = '@vuepress-reco/style-default' } = themeConfig
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const getStyleConfig = require(path.resolve(
    `${stylePath}/lib/node/index.js`
  )).default

  const styleConfig = getStyleConfig(themeConfig)

  styleConfig.plugins = [
    '@vuepress/plugin-git',
    ['@vuepress/plugin-theme-data', { themeData: themeConfig }],
    '@vuepress/plugin-search',
    '@vuepress/plugin-palette',
    '@vuepress/plugin-nprogress',
    '@vuepress/plugin-prismjs',
    ['@vuepress/active-header-links', {
        headerLinkSelector: 'a.page-header-item',
    }],
    ['@vuepress/plugin-container', resolveContainerOptions('tip')],
    ['@vuepress/plugin-container', resolveContainerOptions('info')],
    ['@vuepress/plugin-container', resolveContainerOptions('warning')],
    ['@vuepress/plugin-container', resolveContainerOptions('danger')],
    ['@vuepress/plugin-container', resolveContainerOptions('details')],
    ['@vuepress/plugin-container', resolveContainerOptions('code-group')],
    ['@vuepress/plugin-container', resolveContainerOptions('code-group-item')],
    ['@vuepress/plugin-external-link-icon'],
    ['@vuepress-reco/vuepress-plugin-vue-preview'],
    ['@vuepress/register-components',
      {
        componentsDir: path.resolve(process.cwd(), themeConfig.vuePreviewsDir || './.vuepress/vue-previews'),
      },
    ],
    ['@vuepress/register-components',
      {
        componentsDir: path.resolve(process.cwd(), themeConfig.componentsDir || './.vuepress/components'),
      },
    ],
    ...styleConfig.plugins,
  ]

  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(
      process.cwd(),
      `node_modules/${style}/lib/client/layouts`
    ),
    onInitialized(app) {
      // todo @vuepress/bundler-vite 适配问题
      app.options.bundler = '@vuepress/bundler-webpack'

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
            },
            optimizeDeps: {
              exclude: ['vue']
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

      styleConfig.onInitialized && styleConfig.onInitialized(app)
    },
    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),
    templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),
    ...styleConfig,
  }
}

