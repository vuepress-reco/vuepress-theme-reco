import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { resolveContainer } from './resolveContainer'

export const recoTheme: Theme<ThemeConfig> = (themeConfig: ThemeConfig) => {
  const { style } = themeConfig
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const getStyleConfig = require(path.resolve(
    `${stylePath}/lib/node/index.js`
  )).default

  const styleConfig = getStyleConfig(themeConfig)
  styleConfig.plugins = [
    '@vuepress/plugin-git',
    '@vuepress/plugin-search',
    '@vuepress/plugin-palette',
    '@vuepress/plugin-prismjs',
    ['@vuepress/active-header-links', {
        headerLinkSelector: 'a.page-header-item',
    }],
    ['@vuepress/plugin-container', { type: 'tip', render: resolveContainer }],
    ['@vuepress/plugin-container', { type: 'info', render: resolveContainer }],
    ['@vuepress/plugin-container', { type: 'warning', render: resolveContainer }],
    ['@vuepress/plugin-container', { type: 'danger', render: resolveContainer }],
    ['@vuepress/plugin-external-link-icon'],
    ...styleConfig.plugins,
  ]

  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(
      process.cwd(),
      `node_modules/${style}/lib/client/layouts`
    ),
    ...styleConfig,
  }
}

